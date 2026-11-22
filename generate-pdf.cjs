const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, 'awm-pitch.html');
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for Google Fonts to load
  await new Promise(r => setTimeout(r, 2500));

  await page.pdf({
    path: path.join(__dirname, 'AWM-Redesign-Pitch-Deck.pdf'),
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    preferCSSPageSize: false,
  });

  await browser.close();
  console.log('✓ PDF generated: AWM-Redesign-Pitch-Deck.pdf');
})();
