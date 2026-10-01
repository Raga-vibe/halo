const puppeteer = require("puppeteer-core");
const path = require("path");

const ARTIFACT_DIR = "C:\\Users\\QEEB\\.gemini\\antigravity\\brain\\32ec0c43-1897-40ef-906e-547d81692fc3";
const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

async function capture() {
  const url = process.argv[2] || "http://localhost:3005";
  const name = process.argv[3] || "hero";

  console.log(`Connecting to Chrome and capturing: ${url} (${name})...`);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ["--no-sandbox", "--disable-gpu", "--disable-dev-shm-usage"],
  });

  try {
    const page = await browser.newPage();

    // 1440px desktop
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
    await new Promise((r) => setTimeout(r, 2500));
    const path1440 = path.join(ARTIFACT_DIR, `${name}_1440.png`);
    await page.screenshot({ path: path1440, fullPage: false });
    console.log(`Saved 1440px screenshot to ${path1440}`);

    const path1440Full = path.join(ARTIFACT_DIR, `${name}_1440_full.png`);
    await page.screenshot({ path: path1440Full, fullPage: true });
    console.log(`Saved 1440px full screenshot to ${path1440Full}`);

    // 390px mobile
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 15000 });
    await new Promise((r) => setTimeout(r, 2000));
    const path390 = path.join(ARTIFACT_DIR, `${name}_390.png`);
    await page.screenshot({ path: path390, fullPage: false });
    console.log(`Saved 390px screenshot to ${path390}`);

    const path390Full = path.join(ARTIFACT_DIR, `${name}_390_full.png`);
    await page.screenshot({ path: path390Full, fullPage: true });
    console.log(`Saved 390px full screenshot to ${path390Full}`);
  } catch (err) {
    console.error("Screenshot error:", err);
  } finally {
    await browser.close();
  }
}

capture();
