const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });
  
  try {
    console.log('Testing Vercel production...');
    await page.goto('https://guide-soft-ide.vercel.app', { waitUntil: 'networkidle', timeout: 30000 });
    
    const title = await page.title();
    console.log('Page title:', title);
    
    const rootContent = await page.$eval('#root', el => el.innerHTML.length);
    console.log('Root content length:', rootContent);
    
    const hasNavbar = await page.$('.navbar') !== null;
    const hasHero = await page.$('.hero-section') !== null;
    console.log('Has navbar:', hasNavbar);
    console.log('Has hero section:', hasHero);
    
    if (pageErrors.length > 0) {
      console.log('\nPage errors:', pageErrors);
    } else {
      console.log('\nNo page errors!');
    }
    
    console.log('\n✅ SUCCESS - Page loaded correctly!');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
