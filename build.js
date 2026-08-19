#!/usr/bin/env node
'use strict';
/* GarudaKids FC — static site builder (zero dependencies)
   Usage: node build.js   ->   outputs ./dist */

const fs = require('fs');
const path = require('path');
const { layout, site } = require('./src/lib');
const pages = require('./src/pages');

const ROOT = __dirname;
const OUT = path.join(ROOT, 'dist');

function rmrf(p) { if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true }); }
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

rmrf(OUT);
fs.mkdirSync(OUT, { recursive: true });
copyDir(path.join(ROOT, 'static'), OUT);
// ship the JSON data alongside the build so admins can edit + rebuild
copyDir(path.join(ROOT, 'data'), path.join(OUT, 'data'));

let count = 0;
for (const p of pages) {
  const file = path.join(OUT, p.path);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, layout(p), 'utf8');
  count++;
}

/* sitemap.xml */
const today = new Date().toISOString().slice(0, 10);
const urls = pages.map((p) => {
  const loc = site.url + '/' + p.path.replace(/index\.html$/, '');
  const pri = p.path === 'index.html' ? '1.0' : p.path.split('/').length > 2 ? '0.6' : '0.8';
  return `  <url><loc>${loc}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${pri}</priority></url>`;
}).join('\n');
fs.writeFileSync(path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, 'utf8');

/* .nojekyll — stops GitHub Pages from running Jekyll over the output */
fs.writeFileSync(path.join(OUT, '.nojekyll'), '', 'utf8');

/* robots.txt */
fs.writeFileSync(path.join(OUT, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`, 'utf8');

/* 404 */
const notFound = layout({
  path: '404.html', active: '', title: '404 — Halaman Tidak Ditemukan | GarudaKids FC',
  description: 'Halaman yang Anda cari tidak ditemukan.',
  body: `<section class="sec sec--red" style="min-height:52vh;display:grid;place-items:center;text-align:center">
  <div class="wrap">
    <span class="eyebrow" style="justify-content:center">Error 404</span>
    <h1 class="mt-2" style="font-size:var(--step-5)">404</h1>
    <p class="mt-2" style="color:rgba(255,255,255,.82)"><span data-id>Halaman yang Anda cari tidak ditemukan.</span><span data-en>The page you are looking for was not found.</span></p>
    <div class="flex-btns flex-btns--center mt-4"><a class="btn btn--gold" href="${site.url}/"><span data-id>Kembali ke Beranda</span><span data-en>Back to Home</span></a></div>
  </div>
</section>`
});
fs.writeFileSync(path.join(OUT, '404.html'), notFound, 'utf8');

console.log(`✓ Built ${count} pages + sitemap.xml + robots.txt + 404.html -> dist/`);
