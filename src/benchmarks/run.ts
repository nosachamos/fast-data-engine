import * as puppeteer from 'puppeteer';

const pageContent = `
    <head><title>Benchmark</title></head>
    <body>
    <h1 id="title">test</h1>
    <script>
        console.log(document.getElementById('title').textContent);
    </script>    
</body>

`;

export const run = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--disable-web-security'],
  });

  const page = await browser.newPage();
  page.on('console', (msg: puppeteer.ConsoleMessage) => {
    console.log('PAGE LOG: ' + msg.type() + ' - ' + msg.text());
  });
  await page.setContent(pageContent);
};

run().then(() => void 0);
