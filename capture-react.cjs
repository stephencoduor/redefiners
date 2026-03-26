const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--ignore-certificate-errors'] });
  const page = await browser.newPage();
  const client = await page.createCDPSession();
  await client.send('Network.setCacheDisabled', { cacheDisabled: true });
  await page.setViewport({ width: 1440, height: 900 });

  // Login via Canvas first
  try {
    await page.goto('https://fineract.us/login/canvas', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('#pseudonym_session_unique_id', { timeout: 15000 });
    await page.type('#pseudonym_session_unique_id', 'admin@redefiners.org');
    await page.type('#pseudonym_session_password', 'ReDefiners2024!');
    await page.click('[type="submit"]');
    await new Promise(r => setTimeout(r, 5000));
    console.log('Logged in via Canvas');
  } catch (e) {
    console.log('Login skipped:', e.message.substring(0, 60));
  }

  const pages = [
    // Batch 1: Core Shell
    ['B1-01-login', '/app/login'],
    ['B1-02-dashboard', '/app/dashboard'],
    // Batch 2: Course pages
    ['B2-01-courses', '/app/courses'],
    ['B2-02-course-home', '/app/courses/1'],
    ['B2-03-assignments', '/app/courses/1/assignments'],
    ['B2-04-assignment-detail', '/app/courses/1/assignments/1'],
    ['B2-05-modules', '/app/courses/1/modules'],
    ['B2-06-grades', '/app/courses/1/grades'],
    ['B2-07-pages', '/app/courses/1/pages'],
    ['B2-08-files', '/app/courses/1/files'],
    ['B2-09-syllabus', '/app/courses/1/syllabus'],
    // Also test with different course
    ['B2-10-course2-home', '/app/courses/2'],
    ['B2-11-course2-assignments', '/app/courses/2/assignments'],
    // Batch 3: Communication & Assessment
    ['B3-01-discussions', '/app/courses/1/discussions'],
    ['B3-02-quizzes', '/app/courses/1/quizzes'],
    ['B3-03-people', '/app/courses/1/people'],
    ['B3-04-groups', '/app/courses/1/groups'],
    ['B3-05-conferences', '/app/courses/1/conferences'],
    ['B3-06-inbox', '/app/inbox'],
    ['B3-07-profile', '/app/profile'],
    // Test 404
    ['B1-03-404', '/app/nonexistent-page'],
  ];

  const outDir = 'react-screenshots';
  let success = 0;
  for (const [name, url] of pages) {
    try {
      await page.goto('https://fineract.us' + url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise(r => setTimeout(r, 4000)); // Wait for React to render + API calls
      await page.screenshot({ path: path.join(outDir, name + '.png'), fullPage: false });
      console.log('ok ' + name);
      success++;
    } catch (e) {
      console.log('fail ' + name + ': ' + e.message.substring(0, 50));
    }
  }

  await browser.close();
  console.log('Done ' + success + '/' + pages.length);
})();
