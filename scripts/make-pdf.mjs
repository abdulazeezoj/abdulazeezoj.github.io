// Prints the built /about page (the résumé) to a PDF, so the download is the
// same content and fonts as the page. Runs after `react-router build`.
import { createReadStream, existsSync, statSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { chromium } from "playwright";

const root = path.resolve("build/client");
const out = path.join(root, "Abdulazeez-Jimoh-Resume.pdf");
const types = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".png": "image/png",
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://localhost").pathname;
  let file = path.join(root, decodeURIComponent(url));
  if (!file.startsWith(root)) return res.writeHead(403).end();
  if (existsSync(file) && statSync(file).isDirectory()) file = path.join(file, "index.html");
  if (!existsSync(file)) return res.writeHead(404).end("not found");
  res.writeHead(200, { "Content-Type": types[path.extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const { port } = server.address();

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${port}/about`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.title = "Abdulazeez Jimoh — Resume";
  });
  await page.emulateMedia({ media: "print" });
  await mkdir(root, { recursive: true });
  await page.pdf({ path: out, preferCSSPageSize: true, printBackground: true });
} finally {
  await browser.close();
  server.close();
}

const pdf = await readFile(out, "latin1");
const pages = (pdf.match(/\/Type\s*\/Page[^s]/g) ?? []).length;
console.log(`make-pdf: wrote ${path.relative(".", out)} (${pages} page${pages === 1 ? "" : "s"})`);
if (pages > 2) {
  console.error("make-pdf: résumé is longer than 2 pages; check print styles");
  process.exit(1);
}
