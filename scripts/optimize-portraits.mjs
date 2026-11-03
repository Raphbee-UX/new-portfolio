import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public", "images", "portraits");
const portraits = ["profile_main.png"];

await fs.mkdir(outputDir, { recursive: true });

for (const filename of portraits) {
  const input = path.join(root, filename);
  const output = path.join(outputDir, filename.replace(/\.png$/i, ".webp"));
  await sharp(input)
    .webp({ quality: 88, effort: 5 })
    .resize({ width: 1200, withoutEnlargement: true })
    .toFile(output);
  console.log(`Optimized ${filename} -> ${path.relative(root, output)}`);
}
