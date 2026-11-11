// Builds the downloadable résumé PDF from content/resume.md with pdfmake
// (pure JavaScript, no browser). Runs after `react-router build`.
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import fm from "front-matter";
import pdfmake from "pdfmake";
import remarkParse from "remark-parse";
import { unified } from "unified";

const out = path.resolve("build/client/Abdulazeez-Jimoh-Resume.pdf");
const fontDir = path.resolve("node_modules/@fontsource/eb-garamond/files");
const font = (name) => path.join(fontDir, `eb-garamond-latin-${name}.woff`);

pdfmake.setFonts({
  EBGaramond: {
    normal: font("400-normal"),
    bold: font("700-normal"),
    italics: font("400-italic"),
    bolditalics: font("700-italic"),
  },
});

const { attributes: meta, body } = fm(await readFile("content/resume.md", "utf8"));
const tree = unified().use(remarkParse).parse(body);

const MARGIN_X = 43.2;

// Inline markdown (text, **bold**, *italic*, links) -> pdfmake text runs.
function inline(nodes, style = {}) {
  return nodes.flatMap((n) => {
    switch (n.type) {
      case "text":
        return [{ text: n.value, ...style }];
      case "strong":
        return inline(n.children, { ...style, bold: true });
      case "emphasis":
        return inline(n.children, { ...style, italics: true });
      case "link":
        return inline(n.children, { ...style, link: n.url });
      case "inlineCode":
        return [{ text: n.value, ...style }];
      default:
        throw new Error(`resume.md: unsupported inline markdown "${n.type}"`);
    }
  });
}

const plain = (n) => n.value ?? (n.children ?? []).map(plain).join("");

const content = [
  { text: meta.name.toUpperCase(), style: "name", alignment: "center" },
  { text: meta.headline.toUpperCase(), style: "headline", alignment: "center" },
  {
    alignment: "center",
    style: "contact",
    text: [
      `${meta.location} | `,
      { text: meta.email, link: `mailto:${meta.email}` },
      " | ",
      { text: meta.linkedin, link: `https://${meta.linkedin}` },
      " | ",
      { text: meta.github, link: `https://${meta.github}` },
    ],
  },
];

for (const node of tree.children) {
  if (node.type === "heading" && node.depth === 2) {
    content.push({ text: plain(node).toUpperCase(), style: "h2", keepWithNext: true });
  } else if (node.type === "heading" && node.depth === 3) {
    const [left, right = ""] = plain(node).split(" ::: ");
    content.push({
      columns: [
        { text: left, bold: true, width: "*" },
        { text: right, bold: true, width: "auto" },
      ],
      margin: [0, 5, 0, 0],
      keepWithNext: true,
    });
  } else if (node.type === "paragraph") {
    content.push({ text: inline(node.children), margin: [0, 2, 0, 0] });
  } else if (node.type === "list") {
    content.push({
      ul: node.children.map((li) => ({
        text: li.children.flatMap((p) => inline(p.children)),
      })),
      margin: [0, 2, 0, 0],
    });
  } else {
    throw new Error(`resume.md: unsupported markdown block "${node.type}"`);
  }
}

const doc = {
  info: { title: `${meta.name} — Resume`, author: meta.name },
  pageSize: "LETTER",
  pageMargins: [MARGIN_X, 36, MARGIN_X, 36],
  defaultStyle: { font: "EBGaramond", fontSize: 10, lineHeight: 1.1 },
  styles: {
    name: { fontSize: 20, bold: true, characterSpacing: 0.4 },
    headline: { fontSize: 10, bold: true, characterSpacing: 0.3, margin: [0, 1, 0, 0] },
    contact: { fontSize: 9, margin: [0, 2, 0, 0] },
    h2: { fontSize: 11.5, bold: true, characterSpacing: 0.4, margin: [0, 9, 0, 0] },
  },
  content,
};

await mkdir(path.dirname(out), { recursive: true });
await pdfmake.createPdf(doc).write(out);

const pdf = await readFile(out, "latin1");
const pages = (pdf.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
console.log(`make-pdf: wrote ${path.relative(".", out)} (${pages} page${pages === 1 ? "" : "s"})`);
if (pages > 2) {
  console.error("make-pdf: résumé is longer than 2 pages; check layout");
  process.exit(1);
}
