// Workaround for https://github.com/opennextjs/opennextjs-cloudflare/issues
// esbuild 0.25+ rejects alias keys that contain path separators (e.g. "next/dist/compiled/node-fetch").
// This patch replaces those path-like aliases in @opennextjs/cloudflare's bundle-server.js
// with equivalent onResolve plugins, which are the correct esbuild 0.25+ replacement.
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = resolve(
  __dirname,
  "../node_modules/@opennextjs/cloudflare/dist/cli/build/bundle-server.js"
);

if (!existsSync(filePath)) {
  console.log("patch-bundle-server: file not found, skipping");
  process.exit(0);
}

let code = readFileSync(filePath, "utf8");

if (code.includes("opennext-path-aliases")) {
  console.log("patch-bundle-server: already applied, skipping");
  process.exit(0);
}

// ── 1. Remove path-like entries from alias: {} ────────────────────────────
// Keep only "@next/env" (valid package-name key). Replace the whole alias
// block up to (but not including) the define block.
const OLD_ALIAS = `        alias: {
            // When @vercel/og is not used, alias the edge entry to a throwing shim so the
            // dynamic \`import("next/dist/compiled/@vercel/og/index.edge.js")\` call site
            // emitted by Next.js does not drag the library (~800 KiB) and its
            // \`resvg.wasm\` (~1.4 MiB) into the Worker bundle.
            ...(useOg
                ? {}
                : {
                    "next/dist/compiled/@vercel/og/index.edge.js": path.join(buildOpts.outputDir, "cloudflare-templates/shims/throw.js"),
                }),
            // Workers have \`fetch\` so the \`node-fetch\` polyfill is not needed
            "next/dist/compiled/node-fetch": path.join(buildOpts.outputDir, "cloudflare-templates/shims/fetch.js"),
            // Workers have builtin Web Sockets
            "next/dist/compiled/ws": path.join(buildOpts.outputDir, "cloudflare-templates/shims/empty.js"),
            // The toolbox optimizer pulls severals MB of dependencies (\`caniuse-lite\`, \`terser\`, \`acorn\`, ...)
            // Drop it to optimize the code size
            // See https://github.com/vercel/next.js/blob/6eb235c/packages/next/src/server/optimize-amp.ts
            "next/dist/compiled/@ampproject/toolbox-optimizer": path.join(buildOpts.outputDir, "cloudflare-templates/shims/throw.js"),
            // The edge runtime is not supported
            "next/dist/compiled/edge-runtime": path.join(buildOpts.outputDir, "cloudflare-templates/shims/empty.js"),
            // \`@next/env\` is used by Next to load environment variables from files.
            // OpenNext inlines the values at build time so this is not needed.
            "@next/env": path.join(buildOpts.outputDir, "cloudflare-templates/shims/env.js"),
        },`;

const NEW_ALIAS = `        alias: {
            // \`@next/env\` is used by Next to load environment variables from files.
            // OpenNext inlines the values at build time so this is not needed.
            "@next/env": path.join(buildOpts.outputDir, "cloudflare-templates/shims/env.js"),
        },`;

// ── 2. Insert onResolve plugin before the final updater.plugin ────────────
const PLUGIN_ANCHOR = `            // Apply updater updates, must be the last plugin
            updater.plugin,`;

const NEW_PLUGIN = `            // opennext-path-aliases: esbuild 0.25+ forbids path-like alias keys.
            // These onResolve hooks replicate the removed alias entries.
            {
                name: "opennext-path-aliases",
                setup(build) {
                    const shimDir = path.join(buildOpts.outputDir, "cloudflare-templates/shims");
                    const entries = [
                        [/^next\\/dist\\/compiled\\/node-fetch$/, "fetch.js"],
                        [/^next\\/dist\\/compiled\\/ws$/, "empty.js"],
                        [/^next\\/dist\\/compiled\\/@ampproject\\/toolbox-optimizer$/, "throw.js"],
                        [/^next\\/dist\\/compiled\\/edge-runtime$/, "empty.js"],
                        ...(useOg ? [] : [[/^next\\/dist\\/compiled\\/@vercel\\/og\\/index\\.edge\\.js$/, "throw.js"]]),
                    ];
                    for (const [filter, shim] of entries) {
                        const shimPath = path.join(shimDir, shim);
                        build.onResolve({ filter }, () => ({ path: shimPath }));
                    }
                },
            },
            // Apply updater updates, must be the last plugin
            updater.plugin,`;

if (!code.includes(OLD_ALIAS)) {
  console.error(
    "patch-bundle-server: alias block not found — @opennextjs/cloudflare may have changed. Skipping patch."
  );
  process.exit(0);
}
if (!code.includes(PLUGIN_ANCHOR)) {
  console.error(
    "patch-bundle-server: plugin anchor not found — @opennextjs/cloudflare may have changed. Skipping patch."
  );
  process.exit(0);
}

code = code.replace(OLD_ALIAS, NEW_ALIAS);
code = code.replace(PLUGIN_ANCHOR, NEW_PLUGIN);

writeFileSync(filePath, code);
console.log("patch-bundle-server: patched successfully");
