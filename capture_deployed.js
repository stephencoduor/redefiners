const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--ignore-certificate-errors', '--disable-web-security'] });
  const page = await browser.newPage();
  // Disable cache
  const client = await page.createCDPSession();
  await client.send('Network.setCacheDisabled', { cacheDisabled: true });
  await page.setViewport({ width: 1440, height: 900 });

  try {
    await page.goto('https://fineract.us/login/canvas', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('#pseudonym_session_unique_id', { timeout: 15000 });
    await page.type('#pseudonym_session_unique_id', 'admin@redefiners.org');
    await page.type('#pseudonym_session_password', 'ReDefiners2024!');
    await page.click('[type="submit"]');
    await new Promise(r => setTimeout(r, 5000));
    console.log('Logged in');
  } catch (e) {
    console.log('Login skipped:', e.message.substring(0, 60));
  }

  const pages = [
    ['01-login', '/login.html'], ['02-dashboard', '/dashboard.html'], ['03-courses', '/courses.html'],
    ['04-calendar', '/calendar.html'], ['05-inbox', '/inbox.html'], ['06-profile', '/profile.html'],
    ['07-assignments', '/assignments.html'], ['08-modules', '/modules.html'], ['09-grades', '/grades.html'],
    ['10-files', '/files.html'], ['11-syllabus', '/syllabus.html'], ['12-quizzes', '/quizzes.html'],
    ['13-gradebook', '/gradebook.html'], ['14-rubrics', '/rubrics.html'], ['15-discussions', '/discussions.html'],
    ['16-people', '/people.html'], ['17-speed-grader', '/speed-grader.html'], ['18-announcements', '/announcement.html'],
    ['19-conferences', '/conferences.html'], ['20-groups', '/groups.html'], ['21-outcomes', '/outcomes.html'],
    ['22-pages', '/pages.html'], ['23-mentoring', '/mentoring.html'], ['24-system-health', '/system-health.html'],
    ['25-help-center', '/help-center.html'], ['26-score-analytics', '/score-analytics.html'],
    ['27-certificates', '/certificates.html'], ['28-tutoring', '/tutoring.html'],
    ['29-career-services', '/career-services.html'], ['30-student-dashboard', '/student-dashboard.html'],
  ];

  const outDir = process.argv[2] || 'screenshots/deployed';
  let success = 0;
  for (const [name, url] of pages) {
    try {
      await page.goto('https://fineract.us' + url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise(r => setTimeout(r, 3000));
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
