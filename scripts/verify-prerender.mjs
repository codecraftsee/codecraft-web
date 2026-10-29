// Fails the build if a prerendered page is missing its content or SEO tags, so a
// regression can't silently ship an empty page to crawlers and link previews.
// Usage: node scripts/verify-prerender.mjs   (after `ng build`)
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist/codecraft-web/browser';
const SITE = 'https://www.codecraftsolutions.rs';

const pages = [
  { file: 'index.html', url: `${SITE}/`, text: ['We engineer software systems', 'Ominimo'] },
  { file: 'services/index.html', url: `${SITE}/services/`, text: ['SERVICE CATALOGUE', 'Performance Engineering'] },
  { file: 'team/index.html', url: `${SITE}/team/`, text: ['PERSONNEL ROSTER', 'Miodrag Pavkovic'] },
  { file: 'contact/index.html', url: `${SITE}/contact/`, text: ['PROJECT INTAKE FORM'] },
];

const failures = [];

for (const page of pages) {
  let html;
  try {
    html = readFileSync(join(DIST, page.file), 'utf8');
  } catch {
    failures.push(`${page.file}: not generated`);
    continue;
  }

  for (const text of page.text) {
    if (!html.includes(text)) failures.push(`${page.file}: missing text "${text}"`);
  }

  const checks = {
    'meta description': /<meta name="description" content="[^"]{50,}"/,
    'og:title': /<meta property="og:title" content="[^"]+"/,
    'og:image': /<meta property="og:image" content="https:\/\/[^"]+\.png"/,
    canonical: new RegExp(`<link rel="canonical" href="${page.url.replace(/[.]/g, '\\.')}"`),
  };
  for (const [name, pattern] of Object.entries(checks)) {
    if (!pattern.test(html)) failures.push(`${page.file}: missing or wrong ${name}`);
  }
}

if (!existsSync(join(DIST, 'og-image.png'))) failures.push('og-image.png: missing');

// index.csr.html becomes 404.html; it must be the empty client shell, not a prerendered page.
try {
  const shell = readFileSync(join(DIST, 'index.csr.html'), 'utf8');
  if (shell.includes('We engineer software systems')) {
    failures.push('index.csr.html: contains prerendered content (would be served as 404.html)');
  }
} catch {
  failures.push('index.csr.html: not generated (needed for 404.html)');
}

if (failures.length) {
  console.error(`Prerender check failed:\n  - ${failures.join('\n  - ')}`);
  process.exit(1);
}
console.log(`Prerender check passed for ${pages.length} pages.`);
