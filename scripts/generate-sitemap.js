/* eslint-disable no-console */
const fg = require('fast-glob');
const fs = require('fs');
const { create } = require('xmlbuilder2');
const slugify = require('slugify');

slugify.extend({ đ: 'd', Đ: 'd' });
const toSlug = (s) => slugify(s, { lower: true, strict: true, locale: 'vi' });

const BASE = 'https://elearningneu.com';

(async () => {
  // quét mọi *.json dưới src/resources
  const files = await fg(['src/resources/**/*.json']);

  const urls = new Set();
  urls.add(`${BASE}/`); // homepage
  urls.add(`${BASE}/donate`); // trang donate

  files.forEach((path) => {
    // path: src/resources/<folder>/<file>.json
    const [, folder, file] = path.match(/src\/resources\/([^/]+)\/(.+)\.json$/);
    urls.add(`${BASE}/${toSlug(folder)}/${toSlug(file)}`);
  });

  // build XML
  const root = create({ version: '1.0', encoding: 'UTF-8' }).ele('urlset', {
    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
  });

  [...urls].forEach((loc) => {
    root.ele('url').ele('loc').txt(loc);
  });

  const xml = root.end({ prettyPrint: true });

  // ghi ra public/
  fs.writeFileSync('public/sitemap.xml', xml);
  console.log(`✅ sitemap.xml generated with ${urls.size} URLs`);
})();
