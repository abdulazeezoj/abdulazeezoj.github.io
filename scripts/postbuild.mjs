// GitHub Pages serves /404.html for unknown URLs. React Router prerenders the
// not-found page to /404/index.html, so copy it to the filename Pages expects.
import { copyFileSync, existsSync } from "node:fs";

const out = "build/client";
if (existsSync(`${out}/404/index.html`)) {
  copyFileSync(`${out}/404/index.html`, `${out}/404.html`);
  console.log("postbuild: wrote 404.html");
} else {
  console.error("postbuild: missing 404/index.html");
  process.exit(1);
}
