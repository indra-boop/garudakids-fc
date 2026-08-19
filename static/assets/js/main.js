/* GarudaKids FC — site scripts (vanilla, no dependencies) */
(function () {
  'use strict';

  var d = document;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };

  /* ---------- Language switch (ID / EN) ---------- */
  function store(key, val) { try { localStorage.setItem(key, val); } catch (e) {} }
  function read(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }

  function setLang(lang) {
    d.documentElement.setAttribute('data-lang', lang);
    d.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'id');
    $$('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
    });
    store('gk-lang', lang);
  }
  var saved = read('gk-lang');
  if (saved === 'id' || saved === 'en') setLang(saved);
  $$('.lang-switch button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.lang); });
  });

  /* ---------- Mobile nav ---------- */
  var toggle = $('.nav-toggle');
  var menu = $('#nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      d.body.style.overflow = open ? 'hidden' : '';
    });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        d.body.style.overflow = '';
      });
    });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) toggle.click();
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = $('.site-header');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = $$('[data-reveal]');
  if (reveals.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      reveals.forEach(function (el, i) {
        el.style.transitionDelay = Math.min(i % 6, 5) * 60 + 'ms';
        io.observe(el);
      });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    }
  }

  /* ---------- Animated counters ---------- */
  var counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseInt(el.dataset.count, 10) || 0, t0 = null;
        var step = function (ts) {
          if (!t0) t0 = ts;
          var p = Math.min((ts - t0) / 1400, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))).toLocaleString('id-ID');
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Gallery filter + lightbox ---------- */
  var galItems = $$('.gal-item');
  $$('.gal-filters button').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var cat = btn.dataset.cat;
      $$('.gal-filters button').forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      galItems.forEach(function (it) {
        var show = cat === 'all' || it.dataset.cat === cat;
        it.parentElement.style.display = show ? '' : 'none';
      });
    });
  });

  var lb = $('#lightbox');
  if (lb && galItems.length) {
    var lbFig = $('.lb-slot', lb), lbCap = $('figcaption', lb), idx = 0;
    var visible = function () { return galItems.filter(function (i) { return i.parentElement.style.display !== 'none'; }); };
    var render = function () {
      var list = visible(); if (!list.length) return;
      idx = (idx + list.length) % list.length;
      var it = list[idx];
      var img = $('img', it);
      lbFig.innerHTML = img
        ? '<img src="' + img.getAttribute('src') + '" alt="' + (img.getAttribute('alt') || '') + '">'
        : '<div class="lb-ph" role="img" aria-label="' + (it.dataset.caption || '') + '"></div>';
      lbCap.textContent = it.dataset.caption || '';
    };
    var open = function (i) { idx = i; render(); lb.classList.add('is-open'); d.body.style.overflow = 'hidden'; $('.lightbox__close', lb).focus(); };
    var close = function () { lb.classList.remove('is-open'); d.body.style.overflow = ''; };
    galItems.forEach(function (it) {
      it.addEventListener('click', function () { open(visible().indexOf(it)); });
    });
    $('.lightbox__close', lb).addEventListener('click', close);
    $('.lightbox__nav.prev', lb).addEventListener('click', function () { idx--; render(); });
    $('.lightbox__nav.next', lb).addEventListener('click', function () { idx++; render(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    d.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') { idx--; render(); }
      if (e.key === 'ArrowRight') { idx++; render(); }
    });
  }

  /* ---------- Registration form -> WhatsApp ---------- */
  var form = $('#registration-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var f = new FormData(form);
      var lang = d.documentElement.getAttribute('data-lang') || 'id';
      var L = lang === 'en'
        ? { h: 'GARUDAKIDS FC — REGISTRATION', p: 'Player Name', a: 'Age', g: 'Parent / Guardian', w: 'WhatsApp', pr: 'Preferred Program', x: 'Football Experience', n: 'Notes' }
        : { h: 'GARUDAKIDS FC — PENDAFTARAN', p: 'Nama Pemain', a: 'Usia', g: 'Nama Orang Tua / Wali', w: 'WhatsApp', pr: 'Program Pilihan', x: 'Pengalaman Sepak Bola', n: 'Catatan' };
      var lines = [
        '*' + L.h + '*', '',
        L.p + ': ' + (f.get('player_name') || '-'),
        L.a + ': ' + (f.get('age') || '-'),
        L.g + ': ' + (f.get('guardian_name') || '-'),
        L.w + ': ' + (f.get('whatsapp') || '-'),
        L.pr + ': ' + (f.get('program') || '-'),
        L.x + ': ' + (f.get('experience') || '-'),
        L.n + ': ' + (f.get('notes') || '-')
      ];
      var wa = form.dataset.wa || '';
      var url = 'https://wa.me/' + wa + '?text=' + encodeURIComponent(lines.join('\n'));
      var ok = $('#form-success');
      if (ok) { ok.classList.add('is-visible'); ok.setAttribute('tabindex', '-1'); ok.focus(); }
      var link = $('#wa-continue');
      if (link) link.setAttribute('href', url);
      window.open(url, '_blank', 'noopener');
    });
  }

  /* ---------- Current year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
