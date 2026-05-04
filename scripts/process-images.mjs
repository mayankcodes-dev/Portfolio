import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, "../public/images");

/* ── 1. Process hero image: high quality WebP + sharpening ── */
async function processHero() {
  const heroJpeg = path.join(imagesDir, "mayank-hero.png");
  const heroWebP = path.join(imagesDir, "mayank-hero.webp");

  if (!fs.existsSync(heroJpeg)) {
    console.error("✗ mayank-hero.png not found");
    return;
  }

  await sharp(heroJpeg)
    // Sharpen aggressively for premium look
    .sharpen({ sigma: 1.8, m1: 2.0, m2: 0.8 })
    // Slightly boost contrast + saturation
    .modulate({ brightness: 1.02, saturation: 1.15 })
    // Levels: lift shadows a tiny bit, darken highlights
    .linear(1.05, -0.02 * 255)
    .webp({ quality: 95, effort: 6 })
    .toFile(heroWebP);

  const stat = fs.statSync(heroWebP);
  console.log(`✓ Hero → mayank-hero.webp (${(stat.size / 1024).toFixed(0)} KB)`);
}

/* ── 2. Download YelpCamp screenshot via Microlink ── */
async function processYelp() {
  const yelpOut = path.join(imagesDir, "yelp.webp");
  const yelpUrl = "https://yelpcamp-1-wcof.onrender.com/";

  console.log("  Fetching YelpCamp screenshot from Microlink...");
  try {
    const apiUrl = `https://api.microlink.io?url=${encodeURIComponent(yelpUrl)}&screenshot=true&meta=false&waitFor=6000`;
    const apiResp = await fetch(apiUrl, { signal: AbortSignal.timeout(30000) });
    const apiData = await apiResp.json();
    const screenshotUrl = apiData?.data?.screenshot?.url;

    if (!screenshotUrl) throw new Error("No screenshot URL returned");

    const imgResp = await fetch(screenshotUrl, { signal: AbortSignal.timeout(30000) });
    const imgBuffer = await imgResp.arrayBuffer();

    await sharp(Buffer.from(imgBuffer))
      .resize(1280, 800, { fit: "cover", position: "top" })
      .sharpen({ sigma: 1.2 })
      .webp({ quality: 90 })
      .toFile(yelpOut);

    const stat = fs.statSync(yelpOut);
    console.log(`✓ YelpCamp → yelp.webp (${(stat.size / 1024).toFixed(0)} KB)`);
  } catch (err) {
    console.error("✗ YelpCamp screenshot failed:", err.message);
  }
}

(async () => {
  await Promise.all([processHero(), processYelp()]);
  console.log("Done.");
})();
