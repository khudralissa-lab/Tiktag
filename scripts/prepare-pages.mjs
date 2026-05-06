// Prepares .open-next/ for Cloudflare Pages Advanced Mode deployment.
//
// @opennextjs/cloudflare outputs:
//   .open-next/worker.js   — Worker entry point (uses relative imports resolved by wrangler)
//   .open-next/assets/     — Next.js static assets (_next/static/…, BUILD_ID)
//
// Cloudflare Pages Advanced Mode requires:
//   .open-next/_worker.js  — "_worker.js" name triggers Pages bundling via wrangler esbuild
//   .open-next/_next/…     — static assets at root so CDN serves them at /_next/… URLs
//
// This script modifies .open-next/ in-place so wrangler can resolve all
// relative imports in _worker.js from the same directory.
import { cpSync, renameSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const openNext = resolve(root, ".open-next");
const workerSrc = resolve(openNext, "worker.js");
const workerDst = resolve(openNext, "_worker.js");
const assetsSrc = resolve(openNext, "assets");

if (!existsSync(workerSrc)) {
  console.error("prepare-pages: .open-next/worker.js not found — run build:cloudflare first");
  process.exit(1);
}

// worker.js → _worker.js (Cloudflare Pages requires underscore prefix)
renameSync(workerSrc, workerDst);
console.log("prepare-pages: renamed worker.js → _worker.js");

// assets/* → .open-next/* so /_next/… URLs are served directly by the CDN
// (Pages Advanced Mode still serves static files before passing requests to _worker.js)
if (existsSync(assetsSrc)) {
  cpSync(assetsSrc, openNext, { recursive: true });
  console.log("prepare-pages: hoisted assets/ → .open-next/ root");
}

console.log("prepare-pages: done — deploy from .open-next/");
