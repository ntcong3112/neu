/* eslint-disable no-console */
const fg = require('fast-glob');
const fs = require('fs');
const path = require('path');
const { create } = require('xmlbuilder2');
const slugify = require('slugify');

slugify.extend({ đ: 'd', Đ: 'd' });
const toSlug = (s) => slugify(s, { lower: true, strict: true, locale: 'vi' });

const BASE = 'https://elearningneu.com'; // 🔸 thay domain nếu cần

(async () => {
  // 1) quét toàn bộ *.json dưới src/resources
  const files = await fg(['src/resources/**/*.json']);

  const urls = new Set();
  urls.add(`${BASE}/`); // homepage
  urls.add(`${BASE}/donate`); // trang donate

  // 2) duyệt từng file – thêm URL cho list + cho từng câu hỏi
  for (const filePath of files) {
    // filePath: src/resources/<folder>/<file>.json
    const [, folder, file] = filePath.match(/src\/resources\/([^/]+)\/(.+)\.json$/);

    // URL trang list (môn học)
    const listUrl = `${BASE}/${toSlug(folder)}/${toSlug(file)}`;
    urls.add(listUrl);

    // 2.1) đọc & parse JSON để lấy id câu hỏi
    try {
      const absPath = path.resolve(filePath);
      const json = JSON.parse(fs.readFileSync(absPath, 'utf8'));

      if (Array.isArray(json)) {
        json.forEach((item) => {
          if (item?.id !== undefined && item?.id !== null) {
            const detailUrl = `${listUrl}/${item.id}`;
            urls.add(detailUrl);
          }
        });
      }
    } catch (err) {
      console.warn(`⚠️  Skip ${filePath}:`, err.message);
    }
  }

  // 3) build XML <urlset>
  const root = create({ version: '1.0', encoding: 'UTF-8' }).ele('urlset', {
    xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
  });

  [...urls].forEach((loc) => {
    root.ele('url').ele('loc').txt(loc);
  });

  const xml = root.end({ prettyPrint: true });

  // 4) ghi ra public/sitemap.xml
  fs.writeFileSync('public/sitemap.xml', xml);
  console.log(`✅  sitemap.xml generated with ${urls.size} URLs`);
})();
