const puppeteer = require('puppeteer');
const path = require('path');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--ignore-certificate-errors'] });
  const page = await browser.newPage();
  const client = await page.createCDPSession();
  await client.send('Network.setCacheDisabled', { cacheDisabled: true });
  await page.setViewport({ width: 1440, height: 900 });
  try {
    await page.goto('https://fineract.us/login/canvas', { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForSelector('#pseudonym_session_unique_id', { timeout: 20000 });
    await page.type('#pseudonym_session_unique_id', 'admin@redefiners.org');
    await page.type('#pseudonym_session_password', 'ReDefiners2024!');
    await page.click('[type="submit"]');
    await new Promise(r => setTimeout(r, 6000));
    console.log('Logged in');
  } catch (e) { console.log('Login skipped:', e.message.substring(0, 60)); }

  // Test previously-404 pages
  const pages = [
    ['F404-01-chat', '/chat'],
    ['F404-02-feedback', '/feedback'],
    ['F404-03-mentoring', '/mentoring'],
    ['F404-04-tutoring', '/tutoring'],
    ['F404-05-message-templates', '/message-templates'],
    ['F404-06-announcements-editor', '/announcements/editor'],
    ['F404-07-certificates', '/certificates'],
    ['F404-08-learning-objectives', '/learning-objectives'],
    ['F404-09-video-studio', '/video-studio'],
    ['F404-10-study-groups', '/study-groups'],
    ['F404-11-attendance', '/attendance'],
    ['F404-12-room-booking', '/room-booking'],
    ['F404-13-analytics-hub', '/analytics-hub'],
    ['F404-14-admin-audit-log', '/admin/audit-log'],
    ['F404-15-admin-system-health', '/admin/system-health'],
    ['F404-16-career-services', '/career-services'],
    ['F404-17-wellness', '/wellness'],
    ['F404-18-office-hours', '/office-hours'],
    ['F404-19-content-library', '/content-library'],
    ['F404-20-academic-calendar', '/academic-calendar'],
  ];

  const outDir = 'react-screenshots/fix-404';
  let s = 0;
  for (const [n, u] of pages) {
    try {
      await page.goto('https://fineract.us' + u, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise(r => setTimeout(r, 3000));
      await page.screenshot({ path: path.join(outDir, n + '.png'), fullPage: false });
      console.log('ok ' + n); s++;
    } catch (e) { console.log('fail ' + n); }
  }
  await browser.close();
  console.log('Done ' + s + '/' + pages.length);
})();
