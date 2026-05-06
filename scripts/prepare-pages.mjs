// Assembles a Cloudflare Pages-compatible output directory from the OpenNext build.
//
// @opennextjs/cloudflare outputs:
//   .open-next/worker.js        ← Cloudflare Worker (bundled)
//   .open-next/assets/**        ← Next.js static files (_next/static, BUILD_ID, …)
//
// Cloudflare Pages requires the deploy directory to contain:
//   _worker.js                  ← worker script (underscore prefix required)
//   _next/static/**, BUILD_ID   ← static assets served directly by the CDN
//
// This script merges both into .open-next/pages-dist/ so wrangler pages deploy
// picks up the correct structure.
import { cpSync, mkdirSync, rmSync, copyFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const openNext = resolve(root, ".open-next");
const dist = resolve(openNext, "pages-dist");

if (!existsSync(resolve(openNext, "worker.js"))) {
  console.error("prepare-pages: .open-next/worker.js not found — run build:cloudflare first");
  process.exit(1);
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// worker.js → _worker.js  (Cloudflare Pages naming requirement)
copyFileSync(resolve(openNext, "worker.js"), resolve(dist, "_worker.js"));
console.log("prepare-pages: copied worker.js → pages-dist/_worker.js");

// assets/* → pages-dist/*  (static files served by CDN edge)
if (existsSync(resolve(openNext, "assets"))) {
  cpSync(resolve(openNext, "assets"), dist, { recursive: true });
  console.log("prepare-pages: copied assets/ → pages-dist/");
}

console.log("prepare-pages: done — deploy from .open-next/pages-dist");
