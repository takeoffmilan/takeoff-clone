const fs = require("fs");
const path = require("path");

const rootDir = path.join(__dirname, "..");
const siteBase = "/takeoff/takeoffmilan.com/";
const inputPath = path.join(rootDir, "takeoff", "takeoffmilan.com", "index.html");
const outputDir = path.join(rootDir, "editor", "blocks");
const outputFile = path.join(outputDir, "generated-blocks.js");

if (!fs.existsSync(inputPath)) {
  console.error("Index non trovato:", inputPath);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });

let html = fs.readFileSync(inputPath, "utf8");

/* Remove scripts that break GrapesJS */
html = html.replace(/<script[\s\S]*?<\/script>/gi, "");

/* Extract CSS links */
const cssLinks = [];
const linkMatches = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*>/gi)];

for (const match of linkMatches) {
  const tag = match[0];
  const hrefMatch = tag.match(/href=["']([^"']+)["']/i);
  if (!hrefMatch) continue;

  let href = hrefMatch[1];

  if (href.startsWith("//")) href = "https:" + href;
  else if (href.startsWith("http")) href = href;
  else if (href.startsWith("/")) href = href;
  else href = siteBase + href;

  if (!cssLinks.includes(href)) cssLinks.push(href);
}

/* Also inject all local CSS files found in clone */
function walk(dir) {
  let files = [];
  if (!fs.existsSync(dir)) return files;

  for (const item of fs.readdirSync(dir)) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);

    if (stat.isDirectory()) files = files.concat(walk(full));
    else files.push(full);
  }

  return files;
}

const localCssFiles = walk(path.join(rootDir, "takeoff"))
  .filter((file) => file.endsWith(".css"))
  .map((file) => {
    const rel = path.relative(rootDir, file).replace(/\\/g, "/");
    return "/" + rel;
  });

for (const css of localCssFiles) {
  if (!cssLinks.includes(css)) cssLinks.push(css);
}

/* Get body only */
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
let body = bodyMatch ? bodyMatch[1] : html;

/* Fix asset paths */
function fixPaths(str) {
  return str
    .replace(/(src|href)=["'](?!https?:|\/\/|data:|#|mailto:|tel:|\/)([^"']+)["']/gi, `$1="${siteBase}$2"`)
    .replace(/(src|href)=["']\/\/([^"']+)["']/gi, `$1="https://$2"`);
}

body = fixPaths(body);

/* Extract main blocks */
const blockRegex =
  /<(header|footer|section|div)[^>]*(id=["'][^"']*shopify-section[^"']*["']|class=["'][^"']*(shopify-section|section|hero|footer|header|banner|slideshow|testimonial|portfolio|service)[^"']*["'])[^>]*>[\s\S]*?<\/\1>/gi;

let matches = [...body.matchAll(blockRegex)].map((m) => m[0]);

/* Fallback: split direct body children */
if (matches.length < 3) {
  matches = [...body.matchAll(/<(header|main|footer|section|div)[^>]*>[\s\S]*?<\/\1>/gi)].map((m) => m[0]);
}

/* Remove duplicates / tiny garbage */
const seen = new Set();
matches = matches
  .map((block) => block.trim())
  .filter((block) => block.length > 300)
  .filter((block) => {
    const key = block.slice(0, 300);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

const blocksJs = matches
  .map((block, index) => {
    const clean = block
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${")
      .replace(/\n\s+/g, "\n")
      .trim();

    return `
editor.BlockManager.add("takeoff-section-${index + 1}", {
  label: "Sezione ${index + 1}",
  category: "TakeOff Clone",
  content: \`${clean}\`
});
`;
  })
  .join("\n");

const output = `
// AUTO-GENERATED.
// Rigenera con: node scripts/generate-grapes-blocks.js

window.takeoffCanvasStyles = ${JSON.stringify(cssLinks, null, 2)};

window.registerTakeoffBlocks = function(editor) {
${blocksJs}
};
`;

fs.writeFileSync(outputFile, output, "utf8");

console.log("Creato:", outputFile);
console.log("CSS trovati:", cssLinks.length);
console.log("Blocchi generati:", matches.length);