const fs = require("fs");
const path = require("path");

const inputPath = path.join(
  __dirname,
  "..",
  "takeoff",
  "takeoffmilan.com",
  "index.html"
);

const outputDir = path.join(__dirname, "..", "editor", "blocks");
const outputFile = path.join(outputDir, "generated-blocks.js");

if (!fs.existsSync(inputPath)) {
  console.error("File index.html non trovato:", inputPath);
  process.exit(1);
}

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

let html = fs.readFileSync(inputPath, "utf8");

html = html.replace(/<script[\s\S]*?<\/script>/gi, "");

const matches = [
  ...html.matchAll(
    /<(header|footer|section|div)[^>]*(id="[^"]*shopify-section[^"]*"|class="[^"]*shopify-section[^"]*"|class="[^"]*section[^"]*"|class="[^"]*hero[^"]*"|class="[^"]*footer[^"]*"|class="[^"]*header[^"]*")[\s\S]*?<\/\1>/gi
  ),
];

const blocks = matches
  .map((m, index) => {
    let blockHtml = m[0];

    blockHtml = blockHtml
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${")
      .replace(/\n\s+/g, "\n")
      .trim();

    return `
editor.BlockManager.add("takeoff-block-${index + 1}", {
  label: "Sezione ${index + 1}",
  category: "TakeOff Clone",
  content: \`${blockHtml}\`
});
`;
  })
  .join("\n");

const finalJs = `
// AUTO-GENERATED FILE
// Non modificare a mano.
// Rigenera con: node scripts/generate-grapes-blocks.js

window.registerTakeoffBlocks = function(editor) {
${blocks}
};
`;

fs.writeFileSync(outputFile, finalJs, "utf8");

console.log(`Creato: ${outputFile}`);
console.log(`Blocchi generati: ${matches.length}`);