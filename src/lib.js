'use strict';
/* GarudaKids FC — shared template helpers, icons, layout & components */

const fs = require('fs');
const path = require('path');

const DATA = {};
for (const f of fs.readdirSync(path.join(__dirname, '..', 'data'))) {
  if (f.endsWith('.json')) DATA[f.replace('.json', '')] = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', f), 'utf8'));
}

/* ---------- helpers ---------- */
const esc = (s) => String(s == null ? '' : s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Bilingual value -> markup. Accepts string or {id,en}. */
function bi(v, tag = 'span') {
  if (v == null) return '';
  if (typeof v === 'string' || typeof v === 'number') return esc(v);
  return `<${tag} data-id>${esc(v.id)}</${tag}><${tag} data-en>${esc(v.en)}</${tag}>`;
}
/** Plain text of a bilingual value (for attributes / meta). */
const pt = (v, lang = 'id') => (v == null ? '' : (typeof v === 'object' ? (v[lang] || v.id || '') : String(v)));
const attr = (v, lang = 'id') => esc(pt(v, lang));

const MONTHS = {
  id: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};
const DAYS = {
  id: ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'],
  en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};
function fmtDate(iso, lang, opts = {}) {
  const d = new Date(iso + 'T00:00:00Z');
  const day = d.getUTCDate(), m = d.getUTCMonth(), y = d.getUTCFullYear();
  const dow = DAYS[lang][d.getUTCDay()];
  const mon = opts.short ? MONTHS[lang][m].slice(0, 3) : MONTHS[lang][m];
  return (opts.dow ? dow + ', ' : '') + day + ' ' + mon + ' ' + y;
}
const dateBi = (iso, opts) => `<span data-id>${esc(fmtDate(iso, 'id', opts))}</span><span data-en>${esc(fmtDate(iso, 'en', opts))}</span>`;

const coachById = (id) => DATA.coaches.find((c) => c.id === id);
const programBySlug = (s) => DATA.programs.find((p) => p.slug === s);

const rel = (depth) => (depth === 0 ? './' : '../'.repeat(depth));

/* ---------- icons ---------- */
const I = {
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 20 5v6c0 5-3.4 8.6-8 11-4.6-2.4-8-6-8-11V5Z"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20"/><circle cx="9" cy="7" r="3.2"/><path d="M22 20v-1.5a4 4 0 0 0-3-3.87"/><path d="M16.5 4.2a3.2 3.2 0 0 1 0 5.6"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M2 12h4M18 12h4M4.9 4.9l2.9 2.9M16.2 16.2l2.9 2.9M19.1 4.9l-2.9 2.9M7.8 16.2l-2.9 2.9"/><circle cx="12" cy="12" r="3.2"/></svg>',
  handshake: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 0 0 1.4 0l2.6-2.6"/><path d="M2 12.5 6.5 8l3.5 3 2-2 5.5 5.5"/><path d="M14 6.5 17 4l5 5-3 3"/><path d="M2 12.5 5 15.5"/></svg>',
  pulse: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h4l2.5-7 5 14L16.5 12H22"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4h10v5a5 5 0 0 1-10 0Z"/><path d="M7 6H4v1a4 4 0 0 0 3 3.9M17 6h3v1a4 4 0 0 1-3 3.9"/><path d="M12 14v3M9 21h6M10 17h4l.5 2h-5Z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-5.3 7-11a7 7 0 1 0-14 0c0 5.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4 5.2 2 2 0 0 1 6 3Z"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.53 3.68 1.46 5.2L2 22l5.1-1.62a9.8 9.8 0 0 0 4.94 1.33h.01c5.43 0 9.85-4.4 9.85-9.84C21.9 6.4 17.48 2 12.04 2Zm0 17.9a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.03.96.98-2.95-.2-.3a8.13 8.13 0 0 1-1.25-4.34 8.19 8.19 0 1 1 8.19 8.19Zm4.5-6.13c-.25-.13-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.16.25-.63.8-.77.96-.14.17-.28.19-.53.06-.24-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.09-.17.04-.31-.02-.44-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.17 1.69 2.58 4.1 3.62.57.25 1.02.39 1.37.5.57.19 1.1.16 1.51.1.46-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 2h-3v13.1a2.6 2.6 0 1 1-2.1-2.55V9.4a5.7 5.7 0 1 0 5.1 5.67V8.9a6.6 6.6 0 0 0 3.9 1.27V7.1a3.7 3.7 0 0 1-3.9-3.6V2Z"/></svg>',
  yt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 0 0 1.76-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15.2V8.8l5.2 3.2Z"/></svg>',
  fb: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.18 2.1.18v2.3h-1.2c-1.2 0-1.5.72-1.5 1.46v1.8h2.6l-.42 2.9h-2.2v7A10 10 0 0 0 22 12Z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12.5 5 5L20 6.5"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
  ball: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9.2"/><path d="m12 6.2 4.2 3-1.6 5h-5.2l-1.6-5Z"/><path d="M12 2.8v3.4M20.8 9.6l-4.6.6M17.9 19.6l-3.3-4.4M6.1 19.6l3.3-4.4M3.2 9.6l4.6.6"/></svg>',
  whistle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 8h7a2 2 0 0 1 2 2v2a6 6 0 1 1-9-5.2Z"/><circle cx="8" cy="13" r="2.4"/><path d="M13 8 11 3"/></svg>'
};

/* ---------- navigation ---------- */
const NAV = [
  { href: '', label: { id: 'Beranda', en: 'Home' }, key: 'home' },
  { href: 'about/', label: { id: 'Tentang', en: 'About' }, key: 'about' },
  { href: 'programs/', label: { id: 'Program', en: 'Programs' }, key: 'programs' },
  { href: 'teams/', label: { id: 'Tim', en: 'Teams' }, key: 'teams' },
  { href: 'fixtures/', label: { id: 'Jadwal', en: 'Fixtures' }, key: 'fixtures' },
  { href: 'gallery/', label: { id: 'Galeri', en: 'Gallery' }, key: 'gallery' },
  { href: 'news/', label: { id: 'Berita', en: 'News' }, key: 'news' },
  { href: 'contact/', label: { id: 'Kontak', en: 'Contact' }, key: 'contact' }
];

/* ---------- layout ---------- */
const site = DATA.site;
const WA_TEXT = encodeURIComponent('Halo GarudaKids FC, saya ingin bertanya tentang pendaftaran akademi.');
const waLink = `https://wa.me/${site.contact.whatsapp}?text=${WA_TEXT}`;

/** Shield-only mark (no wordmark) — used where the logo renders small or inside a circle. */
function logoMark(cls, size) {
  return `<img src="{{REL}}assets/img/logo-mark.png" width="${size}" height="${size}" alt="Logo GarudaKids FC"${cls ? ` class="${cls}"` : ''}>`;
}
function logoImg(cls, size) {
  return `<img src="{{REL}}assets/img/logo.png" width="${size}" height="${size}" alt="Logo GarudaKids FC"${cls ? ` class="${cls}"` : ''} onerror="this.onerror=null;this.src='{{REL}}assets/img/logo-placeholder.svg'">`;
}

function header(active) {
  return `<header class="site-header">
  <nav class="wrap nav" aria-label="${attr({ id: 'Navigasi utama', en: 'Main navigation' })}">
    <a class="brand" href="{{REL}}index.html" aria-label="GarudaKids FC — Home">
      ${logoMark('', 46)}
      <span class="brand-text">
        <span class="brand-name">GarudaKids FC</span>
        <span class="brand-sub">${bi(site.tagline)}</span>
      </span>
    </a>
    <ul class="nav-menu" id="nav-menu">
      ${NAV.map((n) => `<li><a href="{{REL}}${n.href}${n.href === '' ? 'index.html' : ''}"${active === n.key ? ' aria-current="page"' : ''}>${bi(n.label)}</a></li>`).join('\n      ')}
      <li class="only-mobile"><a class="btn btn--gold btn--block" href="{{REL}}registration/"><span data-id>Daftar Sekarang</span><span data-en>Join Now</span></a></li>
    </ul>
    <div class="nav-actions">
      <div class="lang-switch" role="group" aria-label="Language">
        <button type="button" data-lang="id" aria-pressed="true">ID</button>
        <button type="button" data-lang="en" aria-pressed="false">EN</button>
      </div>
      <a class="btn btn--gold btn--sm hide-mobile" href="{{REL}}registration/"><span data-id>Daftar</span><span data-en>Join Now</span></a>
    </div>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-menu" aria-label="${attr({ id: 'Buka menu', en: 'Open menu' })}">
      <span></span><span></span><span></span>
    </button>
  </nav>
</header>`;
}

function ctaBand() {
  return `<section class="sec cta-band" id="join">
  <div class="wrap">
    <span class="eyebrow"><span data-id>Pendaftaran Dibuka</span><span data-en>Registration Open</span></span>
    <h2 class="mt-2">Ready to Join the Team?</h2>
    <p><span data-id>Mulai perjalanan sepak bola bersama GarudaKids FC. Kuota per kelompok usia terbatas.</span><span data-en>Start your football journey with GarudaKids FC. Places per age group are limited.</span></p>
    <div class="btns">
      <a class="btn btn--gold" href="{{REL}}registration/">Register Now</a>
      <a class="btn btn--outline-light" href="${waLink}" target="_blank" rel="noopener"><span data-id>Tanya via WhatsApp</span><span data-en>Ask via WhatsApp</span></a>
    </div>
  </div>
</section>`;
}

function socialLinks() {
  const s = site.social;
  const out = [];
  if (s.instagram) out.push(`<a href="${esc(s.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${I.ig}</a>`);
  if (s.tiktok) out.push(`<a href="${esc(s.tiktok)}" target="_blank" rel="noopener" aria-label="TikTok">${I.tiktok}</a>`);
  if (s.youtube) out.push(`<a href="${esc(s.youtube)}" target="_blank" rel="noopener" aria-label="YouTube">${I.yt}</a>`);
  if (s.facebook) out.push(`<a href="${esc(s.facebook)}" target="_blank" rel="noopener" aria-label="Facebook">${I.fb}</a>`);
  return out.join('\n        ');
}

function footer() {
  return `<footer class="site-footer">
  <div class="wrap footer-top">
    <div>
      <div class="footer-brand">
        ${logoMark('', 62)}
        <span class="brand-text">
          <span class="brand-name">GarudaKids FC</span>
          <span class="brand-sub">${bi(site.tagline)}</span>
        </span>
      </div>
      <p class="footer-about">${bi(site.meta.description, 'span')}</p>
      <div class="socials">
        ${socialLinks()}
      </div>
    </div>
    <div class="footer-col">
      <h4><span data-id>Navigasi</span><span data-en>Navigate</span></h4>
      <ul>${NAV.slice(0, 5).map((n) => `<li><a href="{{REL}}${n.href}${n.href === '' ? 'index.html' : ''}">${bi(n.label)}</a></li>`).join('')}</ul>
    </div>
    <div class="footer-col">
      <h4><span data-id>Akademi</span><span data-en>Academy</span></h4>
      <ul>
        <li><a href="{{REL}}coaches/"><span data-id>Pelatih</span><span data-en>Coaches</span></a></li>
        <li><a href="{{REL}}results/"><span data-id>Hasil Pertandingan</span><span data-en>Results</span></a></li>
        <li><a href="{{REL}}gallery/"><span data-id>Galeri</span><span data-en>Gallery</span></a></li>
        <li><a href="{{REL}}news/"><span data-id>Berita</span><span data-en>News</span></a></li>
        <li><a href="{{REL}}registration/"><span data-id>Pendaftaran</span><span data-en>Registration</span></a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4><span data-id>Kontak</span><span data-en>Contact</span></h4>
      <ul>
        <li><a href="${esc(site.contact.mapsLink)}" target="_blank" rel="noopener">${esc(site.contact.venueName)}</a></li>
        <li><a href="${waLink}" target="_blank" rel="noopener">${esc(site.contact.whatsappDisplay)}</a></li>
        <li><a href="mailto:${esc(site.contact.email)}">${esc(site.contact.email)}</a></li>
        <li>${bi(site.contact.officeHours)}</li>
      </ul>
    </div>
  </div>
  <div class="wrap footer-bottom">
    <span>&copy; <span data-year>2026</span> GarudaKids FC. All Rights Reserved.</span>
    <span><span data-id>Dibuat untuk pembinaan sepak bola usia muda.</span><span data-en>Built for youth football development.</span></span>
  </div>
</footer>
<a class="wa-float" href="${waLink}" target="_blank" rel="noopener">${I.wa}<span data-id>Chat WhatsApp</span><span data-en>Chat via WhatsApp</span></a>`;
}

function jsonLd(page) {
  const org = {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    name: site.name,
    alternateName: 'GarudaKids Football Academy',
    url: site.url,
    logo: site.url + '/assets/img/logo.png',
    sport: 'Football',
    foundingDate: String(site.founded),
    email: site.contact.email,
    telephone: site.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.contact.address,
      addressLocality: site.contact.city || '',
      addressRegion: site.contact.region || '',
      postalCode: site.contact.postalCode || '',
      addressCountry: 'ID'
    },
    areaServed: [site.contact.city, site.contact.region].filter(Boolean).join(', '),
    hasMap: site.contact.mapsLink,
    location: {
      '@type': 'Place',
      name: site.contact.venueName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.contact.address,
        addressLocality: site.contact.city || '',
        addressRegion: site.contact.region || '',
        addressCountry: 'ID'
      },
      geo: site.contact.lat ? { '@type': 'GeoCoordinates', latitude: site.contact.lat, longitude: site.contact.lng } : undefined
    },
    sameAs: Object.values(site.social).filter(Boolean)
  };
  const blocks = [org];
  if (page.breadcrumb && page.breadcrumb.length) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: page.breadcrumb.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: site.url + '/' + b.path }))
    });
  }
  if (page.extraLd) blocks.push(page.extraLd);
  return blocks.map((b) => `<script type="application/ld+json">${JSON.stringify(b)}</script>`).join('\n');
}

/**
 * page = { path, title, description, active, body, breadcrumb, extraLd }
 */
function layout(page) {
  const depth = page.path.split('/').length - 1;
  const R = rel(depth);
  const canonical = site.url + '/' + page.path.replace(/index\.html$/, '');
  const html = `<!DOCTYPE html>
<html lang="id" data-lang="${site.defaultLang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<meta name="keywords" content="${esc(site.meta.keywords)}">
<meta name="theme-color" content="#5C0D17">
<link rel="canonical" href="${esc(canonical)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="GarudaKids FC">
<meta property="og:locale" content="id_ID">
<meta property="og:locale:alternate" content="en_US">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${esc(canonical)}">
<meta property="og:image" content="${site.url}/assets/img/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${site.url}/assets/img/og-image.png">
<link rel="icon" type="image/png" href="{{REL}}assets/img/favicon.png">
<link rel="apple-touch-icon" href="{{REL}}assets/img/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;600;700;800&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700&family=Inter:wght@400;600;700;800&display=swap"></noscript>
<link rel="stylesheet" href="{{REL}}assets/css/main.css">
<style>.only-mobile{display:none}@media(max-width:960px){.only-mobile{display:block}.hide-mobile{display:none}}</style>
${jsonLd(page)}
</head>
<body>
<a class="skip-link" href="#main"><span data-id>Lompat ke konten</span><span data-en>Skip to content</span></a>
${header(page.active)}
<main id="main">
${page.body}
</main>
${footer()}
<script src="{{REL}}assets/js/main.js" defer></script>
</body>
</html>
`;
  return html.replace(/\{\{REL\}\}/g, R);
}

/* ---------- shared components ---------- */
function pageHero({ eyebrow, title, text, crumbs }) {
  return `<section class="phero">
  <div class="phero__pattern" aria-hidden="true"></div>
  <div class="wrap">
    ${crumbs ? `<nav class="crumbs" aria-label="Breadcrumb">${crumbs}</nav>` : ''}
    ${eyebrow ? `<span class="eyebrow mt-2">${bi(eyebrow)}</span>` : ''}
    <h1>${typeof title === 'string' ? esc(title) : bi(title)}</h1>
    ${text ? `<p>${bi(text)}</p>` : ''}
  </div>
</section>`;
}

function crumbs(items) {
  return items.map((it, i) => (it.href
    ? `<a href="{{REL}}${it.href}">${bi(it.label)}</a><span aria-hidden="true">/</span>`
    : `<span>${bi(it.label)}</span>`)).join(' ');
}

function statsGrid(onDark = true) {
  return `<div class="grid grid--4">
  ${site.stats.map((s) => `<div class="stat" data-reveal>
    <div class="stat__value"><span data-count="${s.value}">${s.value.toLocaleString('id-ID')}</span>${esc(s.suffix)}</div>
    <div class="stat__label">${bi(s.label)}</div>
  </div>`).join('\n  ')}
</div>`;
}

function programCard(p) {
  return `<article class="program program--${p.accent}" data-reveal>
  <div class="program__head">
    <h3 class="program__name">${esc(p.name)}</h3>
    <div class="program__tag">${bi(p.tagline)}</div>
    <div class="chips mt-2">${p.ageGroups.map((a) => `<span class="chip">${esc(a)}</span>`).join('')}</div>
  </div>
  <div class="program__body">
    <p>${bi(p.short, 'span')}</p>
    <ul class="program__list">
      ${(p.focus.id).map((_, i) => `<li><span data-id>${esc(p.focus.id[i])}</span><span data-en>${esc(p.focus.en[i])}</span></li>`).slice(0, 4).join('\n      ')}
    </ul>
    <div class="program__foot">
      <a class="btn btn--ghost btn--sm" href="{{REL}}programs/${p.slug}/"><span data-id>Detail Program</span><span data-en>View Program</span></a>
      <a class="link-arrow" href="{{REL}}registration/?program=${p.slug}"><span data-id>Daftar</span><span data-en>Register</span> &rarr;</a>
    </div>
  </div>
</article>`;
}

function coachCard(c) {
  const initials = c.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return `<article class="coach" data-reveal>
  <div class="coach__photo">
    ${c.photo ? `<img src="{{REL}}${esc(c.photo)}" alt="${esc(c.name)}" loading="lazy" width="400" height="500">` : `<div class="coach__ph" aria-hidden="true">${initials}</div>`}
    <span class="coach__cert">${bi(c.certification)}</span>
  </div>
  <div class="coach__body">
    <div class="coach__role">${bi(c.role)}</div>
    <h3 class="coach__name">${esc(c.name)}</h3>
    <div class="coach__spec">${bi(c.specialization)}</div>
    <p class="coach__bio">${bi(c.bio, 'span')}</p>
  </div>
</article>`;
}

function scheduleTable(rows) {
  const th = (idTxt, enTxt) => `<th scope="col"><span data-id>${idTxt}</span><span data-en>${enTxt}</span></th>`;
  const table = `<div class="table-wrap">
  <table class="table">
    <caption class="sr-only">Jadwal latihan mingguan GarudaKids FC</caption>
    <thead><tr>${th('Hari', 'Day')}${th('Waktu', 'Time')}${th('Kelompok Usia', 'Age Group')}${th('Lokasi', 'Venue')}${th('Pelatih', 'Coach')}${th('Jenis Sesi', 'Session Type')}</tr></thead>
    <tbody>
      ${rows.map((r) => {
        const c = coachById(r.coach);
        return `<tr>
        <td class="t-strong">${bi(r.day)}</td>
        <td class="t-time">${bi(r.time)}</td>
        <td>${bi(r.ageGroup)}</td>
        <td>${bi(r.venue)}</td>
        <td>${c ? esc(c.name) : '—'}</td>
        <td>${bi(r.type)}</td>
      </tr>`;
      }).join('\n      ')}
    </tbody>
  </table>
</div>
<div class="sched-cards">
  ${rows.map((r) => {
    const c = coachById(r.coach);
    return `<article class="sched-card">
    <div class="sched-card__top">
      <span class="sched-card__day">${bi(r.day)}</span>
      <span class="sched-card__time">${bi(r.time)}</span>
    </div>
    <dl>
      <dt><span data-id>Kelompok</span><span data-en>Group</span></dt><dd>${bi(r.ageGroup)}</dd>
      <dt><span data-id>Sesi</span><span data-en>Session</span></dt><dd>${bi(r.type)}</dd>
      <dt><span data-id>Lokasi</span><span data-en>Venue</span></dt><dd>${bi(r.venue)}</dd>
      <dt><span data-id>Pelatih</span><span data-en>Coach</span></dt><dd>${c ? esc(c.name) : '—'}</dd>
    </dl>
  </article>`;
  }).join('\n  ')}
</div>`;
  return table;
}

function crest(opponentShort) {
  return `<div class="fixture__crest"><span>${esc(opponentShort)}</span></div>`;
}
function ourCrest() {
  return `<div class="fixture__crest">${logoMark('', 54)}</div>`;
}

function fixtureCard(f, isResult) {
  const home = f.home;
  const left = home ? 'GARUDAKIDS FC' : esc(f.opponent);
  const right = home ? esc(f.opponent) : 'GARUDAKIDS FC';
  const leftCrest = home ? ourCrest() : crest(f.opponentShort);
  const rightCrest = home ? crest(f.opponentShort) : ourCrest();
  let middle;
  if (isResult) {
    const a = home ? f.scoreUs : f.scoreThem;
    const b = home ? f.scoreThem : f.scoreUs;
    middle = `<div class="fixture__score">${a} &mdash; ${b}</div><div class="fixture__vslabel">${bi({ id: 'Skor Akhir', en: 'Full Time' })}</div>`;
  } else {
    middle = `<div class="fixture__kick">${esc(f.kickoff)}</div><div class="fixture__vslabel">${bi({ id: 'Kick-off WIB', en: 'Kick-off (GMT+7)' })}</div>`;
  }
  let badge = '';
  if (isResult) {
    const r = f.scoreUs > f.scoreThem ? 'w' : f.scoreUs === f.scoreThem ? 'd' : 'l';
    const lbl = { w: { id: 'M', en: 'W' }, d: { id: 'S', en: 'D' }, l: { id: 'K', en: 'L' } }[r];
    badge = `<span class="badge-res ${r}">${bi(lbl)}</span>`;
  }
  return `<article class="fixture ${isResult ? '' : 'fixture--next'}" data-reveal>
  <div class="fixture__top">
    <span class="fixture__comp">${bi(f.competition)}</span>
    <span>${esc(f.ageGroup)} &middot; ${dateBi(f.date, { short: true })}</span>
  </div>
  <div class="fixture__main">
    <div class="fixture__team">${leftCrest}<span class="fixture__tname">${left}</span></div>
    <div class="fixture__vs">${middle}</div>
    <div class="fixture__team">${rightCrest}<span class="fixture__tname">${right}</span></div>
  </div>
  <div class="fixture__foot">
    <span><b>${esc(f.venue)}</b> &middot; ${bi(f.home ? { id: 'Kandang', en: 'Home' } : { id: 'Tandang', en: 'Away' })}</span>
    <span>${isResult && f.scorers ? `${bi({ id: 'Pencetak gol', en: 'Scorers' })}: <b>${esc(f.scorers)}</b> ${badge}` : dateBi(f.date, { dow: true })}</span>
  </div>
</article>`;
}

function newsCard(n) {
  return `<article class="news" data-reveal>
  <div class="news__img">
    ${n.image ? `<img src="{{REL}}${esc(n.image)}" alt="${attr(n.title)}" loading="lazy" width="640" height="400">` : ''}
    <span class="news__cat">${bi(n.category)}</span>
  </div>
  <div class="news__body">
    <div class="news__date">${dateBi(n.date)}</div>
    <h3 class="news__title">${bi(n.title, 'span')}</h3>
    <p class="news__excerpt">${bi(n.excerpt, 'span')}</p>
    <div class="news__more"><a class="link-arrow" href="{{REL}}news/${esc(n.slug)}/"><span data-id>Baca Selengkapnya</span><span data-en>Read More</span> &rarr;</a></div>
  </div>
</article>`;
}

function playerCard(p) {
  return `<article class="player" data-reveal>
  <div class="player__photo">
    <span class="player__no" aria-hidden="true">${p.no}</span>
    <div class="player__silhouette" aria-hidden="true">
      <svg viewBox="0 0 100 120" fill="currentColor" style="color:#F0D488"><path d="M50 14a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm-24 16c5-8 14-12 24-12s19 4 24 12l10 20-9 6-8-13v77H33V43l-8 13-9-6Z" transform="translate(0,10)"/></svg>
    </div>
  </div>
  <div class="player__body">
    <div class="player__name">${esc(p.name)}</div>
    <div class="player__pos">#${p.no} &middot; ${bi(p.position)}</div>
  </div>
</article>`;
}

function privacyNote() {
  return `<div class="privacy-note">
  ${I.lock}
  <p><span data-id><b>Perlindungan data anak.</b> Nama pemain ditampilkan dalam bentuk singkat dan tanpa informasi sensitif. GarudaKids FC tidak menampilkan alamat rumah, alamat sekolah, tanggal lahir lengkap, kontak pribadi orang tua, maupun data medis pemain di halaman publik.</span><span data-en><b>Child data protection.</b> Player names are shown in abbreviated form without sensitive details. GarudaKids FC does not publish home or school addresses, full dates of birth, parents' private contacts, or medical information on public pages.</span></p>
</div>`;
}

function trophyCard(a) {
  const icon = I.trophy;
  return `<article class="trophy" data-reveal>
  <span class="trophy__icon" aria-hidden="true">${icon}</span>
  <div class="trophy__year">${a.year}</div>
  <h3 class="trophy__title">${bi(a.title, 'span')}</h3>
  <div class="trophy__tour">${bi(a.tournament)} &middot; ${bi(a.ageGroup)}</div>
  <p class="trophy__note">${bi(a.note, 'span')}</p>
</article>`;
}

module.exports = {
  DATA, site, esc, bi, pt, attr, fmtDate, dateBi, coachById, programBySlug, rel, I, NAV, waLink,
  layout, pageHero, crumbs, statsGrid, programCard, coachCard, scheduleTable, fixtureCard,
  newsCard, playerCard, privacyNote, trophyCard, ctaBand, logoImg, logoMark
};
