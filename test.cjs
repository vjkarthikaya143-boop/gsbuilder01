const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Collect console messages
  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });
  
  // Collect page errors
  const pageErrors = [];
  page.on('pageerror', error => {
    pageErrors.push(error.message);
  });
  
  try {
    console.log('Navigating to http://localhost:5173...');
    await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
    
    console.log('Page loaded. Checking content...');
    
    // Check page title
    const title = await page.title();
    console.log('Page title:', title);
    
    // Check if #root has content
    const rootContent = await page.$eval('#root', el => el.innerHTML.length);
    console.log('Root content length:', rootContent);
    
    // Check for main elements
    const hasNavbar = await page.$('.navbar') !== null;
    const hasHero = await page.$('.hero-section') !== null;
    console.log('Has navbar:', hasNavbar);
    console.log('Has hero section:', hasHero);
    
    // Print any console errors
    const errors = consoleLogs.filter(log => log.type === 'error');
    if (errors.length > 0) {
      console.log('\nConsole errors:');
      errors.forEach(e => console.log(' -', e.text));
    }
    
    // Print page errors
    if (pageErrors.length > 0) {
      console.log('\nPage errors:');
      pageErrors.forEach(e => console.log(' -', e));
    }
    
    // Take screenshot
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    console.log('\nScreenshot saved to screenshot.png');
    
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await browser.close();
  }
})();
