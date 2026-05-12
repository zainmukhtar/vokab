import sharp from "sharp"
import { mkdirSync } from "fs"

// Make sure the icons folder exists
mkdirSync("public/icons", { recursive: true })

// SVG source for our icon
const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#1e293b"/>
  <text
    x="256"
    y="340"
    font-family="Arial Black, sans-serif"
    font-size="260"
    font-weight="900"
    fill="white"
    text-anchor="middle"
  >V</text>
</svg>
`

const sizes = [72, 96, 128, 144, 152, 192, 384, 512]

for (const size of sizes) {
  await sharp(Buffer.from(svg))
    .resize(size, size)
    .png()
    .toFile(`public/icons/icon-${size}x${size}.png`)

  console.log(`✓ Generated ${size}x${size}`)
}

console.log("All icons generated!")