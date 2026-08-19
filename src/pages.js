'use strict';
const L = require('./lib');
const {
  DATA, site, esc, bi, pt, attr, dateBi, coachById, programBySlug, I, waLink,
  pageHero, crumbs, statsGrid, programCard, coachCard, scheduleTable, fixtureCard,
  newsCard, playerCard, privacyNote, trophyCard, ctaBand, logoImg, logoMark
} = L;

const pages = [];
const add = (p) => pages.push(p);
const T = (t) => `${t} | GarudaKids FC`;

/* ======================= HOME ======================= */
add({
  path: 'index.html',
  active: 'home',
  title: 'GarudaKids FC — Akademi Sepak Bola Usia Muda di Sidoarjo, Jawa Timur',
  description: pt(site.meta.description, 'id'),
  breadcrumb: [{ name: 'Home', path: '' }],
  body: `
<section class="hero">
  <div class="hero__media" aria-hidden="true">
    <img src="{{REL}}assets/img/hero-fallback.svg" alt="" width="1600" height="900" fetchpriority="high">
  </div>
  <div class="hero__overlay" aria-hidden="true"></div>
  <div class="hero__pattern" aria-hidden="true"></div>
  <div class="hero__glow" aria-hidden="true"></div>
  <div class="wrap">
    <div class="hero__inner">
      <span class="hero__badge">${logoMark('', 30)}<span data-id>Akademi Sepak Bola Usia Muda</span><span data-en>Youth Football Academy</span></span>
      <h1><span class="ln">Building the</span><span class="ln accent">Next Generation</span></h1>
      <p class="hero__sub">Learn. Train. Compete. Grow.</p>
      <p class="hero__text"><span data-id>GarudaKids FC membina pemain muda melalui pelatihan profesional, program latihan terstruktur, kerja sama tim, disiplin, dan pengalaman bertanding yang nyata.</span><span data-en>GarudaKids FC develops young football players through professional coaching, structured training, teamwork, discipline, and competitive experience.</span></p>
      <div class="hero__cta">
        <a class="btn btn--gold" href="{{REL}}registration/">Join GarudaKids</a>
        <a class="btn btn--outline-light" href="{{REL}}programs/">View Programs</a>
      </div>
    </div>
  </div>
  <div class="hero__scroll" aria-hidden="true"><i></i><span data-id>Gulir</span><span data-en>Scroll</span></div>
</section>

<section class="sec sec--red sec--tight">
  <div class="wrap">${statsGrid()}</div>
</section>

<section class="sec sec--cream">
  <div class="wrap">
    <div class="split">
      <div data-reveal>
        <span class="eyebrow"><span data-id>Tentang Kami</span><span data-en>About Us</span></span>
        <h2 class="mt-2">More Than Football</h2>
        <p class="lead mt-3"><span data-id>GarudaKids FC adalah akademi sepak bola usia muda yang berbasis di Sidoarjo, Jawa Timur — dan bukan sekadar tempat berlatih menendang bola. Kami membentuk kebiasaan, karakter, dan cara berpikir yang terbawa sampai ke luar lapangan.</span><span data-en>GarudaKids FC is a youth football academy based in Sidoarjo, East Java — and not just a place to kick a ball. We build habits, character, and a way of thinking that carries far beyond the pitch.</span></p>
        <p class="mt-3 muted"><span data-id>Setiap kelompok usia memiliki kurikulum latihan sendiri, ditangani pelatih bersertifikat, dan dievaluasi secara berkala. Orang tua mendapat gambaran jelas tentang perkembangan anaknya.</span><span data-en>Every age group has its own training curriculum, is handled by certified coaches, and is reviewed periodically. Parents get a clear picture of their child's development.</span></p>
        <div class="flex-btns mt-4">
          <a class="btn btn--ghost" href="{{REL}}about/"><span data-id>Selengkapnya</span><span data-en>Learn More</span></a>
          <a class="btn btn--ghost" href="{{REL}}coaches/"><span data-id>Tim Pelatih</span><span data-en>Our Coaches</span></a>
        </div>
      </div>
      <div class="split__visual" data-reveal>
        <div class="split__badge"><b>${site.founded}</b><span data-id>Berdiri</span><span data-en>Founded</span></div>
      </div>
    </div>

    <div class="grid grid--3 mt-5">
      ${site.values.map((v) => `<article class="value" data-reveal>
        <div class="value__icon" aria-hidden="true">${I[v.icon] || I.shield}</div>
        <h3>${bi(v.title)}</h3>
        <p>${bi(v.text, 'span')}</p>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec sec--white">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div>
        <span class="eyebrow"><span data-id>Program Latihan</span><span data-en>Training Programs</span></span>
        <h2 class="mt-2"><span data-id>Jalur Pembinaan Bertahap</span><span data-en>A Structured Player Pathway</span></h2>
        <p><span data-id>Tiga tahap pembinaan, dari pengenalan sampai tim kompetitif. Penempatan disesuaikan usia dan hasil observasi teknis.</span><span data-en>Three development stages, from introduction to the competitive squad. Placement follows age and technical observation.</span></p>
      </div>
      <a class="link-arrow" href="{{REL}}programs/"><span data-id>Semua Program</span><span data-en>All Programs</span> &rarr;</a>
    </div>
    <div class="grid grid--3">
      ${DATA.programs.map(programCard).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec sec--soft" id="schedule">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div>
        <span class="eyebrow"><span data-id>Jadwal Mingguan</span><span data-en>Weekly Schedule</span></span>
        <h2 class="mt-2"><span data-id>Jadwal Latihan</span><span data-en>Training Schedule</span></h2>
        <p><span data-id>Perubahan mendadak karena cuaca diinformasikan lewat grup WhatsApp masing-masing kelompok.</span><span data-en>Weather-related changes are announced via each group's WhatsApp channel.</span></p>
      </div>
    </div>
    ${scheduleTable(DATA.schedule)}
  </div>
</section>

<section class="sec sec--white">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div>
        <span class="eyebrow"><span data-id>Pertandingan</span><span data-en>Matches</span></span>
        <h2 class="mt-2"><span data-id>Jadwal & Hasil Terbaru</span><span data-en>Fixtures & Latest Results</span></h2>
      </div>
      <div class="flex-btns">
        <a class="btn btn--ghost btn--sm" href="{{REL}}fixtures/"><span data-id>Semua Jadwal</span><span data-en>All Fixtures</span></a>
        <a class="btn btn--ghost btn--sm" href="{{REL}}results/"><span data-id>Semua Hasil</span><span data-en>All Results</span></a>
      </div>
    </div>
    <div class="grid grid--2">
      ${DATA.fixtures.upcoming.slice(0, 2).map((f) => fixtureCard(f, false)).join('\n      ')}
      ${DATA.fixtures.results.slice(0, 2).map((f) => fixtureCard(f, true)).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec sec--dark">
  <div class="wrap">
    <div class="sec-head sec-head--center">
      <span class="eyebrow"><span data-id>Prestasi</span><span data-en>Achievements</span></span>
      <h2 class="mt-2"><span data-id>Turnamen & Pencapaian</span><span data-en>Tournaments & Milestones</span></h2>
    </div>
    <div class="grid grid--3">
      ${DATA.achievements.slice(0, 3).map(trophyCard).join('\n      ')}
    </div>
    <div class="center mt-4"><a class="link-arrow" href="{{REL}}about/#achievements"><span data-id>Semua Prestasi</span><span data-en>All Achievements</span> &rarr;</a></div>
  </div>
</section>

<section class="sec sec--cream">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div>
        <span class="eyebrow"><span data-id>Berita</span><span data-en>News</span></span>
        <h2 class="mt-2"><span data-id>Kabar Terbaru Akademi</span><span data-en>Latest From the Academy</span></h2>
      </div>
      <a class="link-arrow" href="{{REL}}news/"><span data-id>Semua Berita</span><span data-en>All News</span> &rarr;</a>
    </div>
    <div class="grid grid--3">
      ${DATA.news.slice(0, 3).map(newsCard).join('\n      ')}
    </div>
  </div>
</section>

${ctaBand()}
`
});

/* ======================= ABOUT ======================= */
add({
  path: 'about/index.html',
  active: 'about',
  title: T('Tentang Kami — More Than Football'),
  description: 'Profil GarudaKids FC: filosofi pembinaan, nilai akademi, tim pelatih, dan prestasi turnamen.',
  breadcrumb: [{ name: 'Home', path: '' }, { name: 'About', path: 'about/' }],
  body: `
${pageHero({
    crumbs: crumbs([{ href: 'index.html', label: { id: 'Beranda', en: 'Home' } }, { label: { id: 'Tentang', en: 'About' } }]),
    eyebrow: { id: 'Tentang GarudaKids FC', en: 'About GarudaKids FC' },
    title: 'More Than Football',
    text: { id: 'Kami membina pemain muda bukan hanya pada kemampuan sepak bola, tetapi juga pada disiplin, kerja sama, dan karakter.', en: 'We develop young players not only in football ability, but in discipline, teamwork, and character.' }
  })}

<section class="sec sec--cream">
  <div class="wrap">
    <div class="split">
      <div data-reveal>
        <span class="eyebrow"><span data-id>Filosofi</span><span data-en>Philosophy</span></span>
        <h2 class="mt-2"><span data-id>Proses Dulu, Hasil Menyusul</span><span data-en>Process First, Results Follow</span></h2>
        <p class="mt-3"><span data-id>GarudaKids FC berdiri pada ${site.founded} di Sidoarjo, Jawa Timur, dengan satu prinsip: anak yang dilatih dengan benar akan tumbuh menjadi pemain yang baik — dan lebih penting lagi, menjadi pribadi yang baik.</span><span data-en>GarudaKids FC was founded in ${site.founded} in Sidoarjo, East Java, on one principle: a child coached properly will grow into a good player — and more importantly, a good person.</span></p>
        <p class="mt-2"><span data-id>Kurikulum latihan disusun bertahap sesuai kelompok usia. Tidak ada percepatan beban fisik atau taktik yang belum sesuai tahap perkembangan anak.</span><span data-en>The curriculum is staged by age group. We do not rush physical or tactical load beyond a child's developmental stage.</span></p>
        <p class="mt-2"><span data-id>Evaluasi individu dilakukan berkala dan disampaikan kepada orang tua sebagai gambaran perkembangan, bukan sebagai penilaian menang-kalah.</span><span data-en>Individual reviews are held periodically and shared with parents as a development picture, not a win-lose verdict.</span></p>
      </div>
      <div class="split__visual" data-reveal>
        <div class="split__badge"><b>${site.stats[1].value}</b><span data-id>Pelatih Bersertifikat</span><span data-en>Certified Coaches</span></div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--red sec--tight">
  <div class="wrap">${statsGrid()}</div>
</section>

<section class="sec sec--white">
  <div class="wrap">
    <div class="sec-head sec-head--center">
      <span class="eyebrow"><span data-id>Nilai Akademi</span><span data-en>Academy Values</span></span>
      <h2 class="mt-2"><span data-id>Enam Hal yang Kami Bangun</span><span data-en>Six Things We Build</span></h2>
      <p><span data-id>Sepak bola adalah alatnya. Yang kami bangun jauh lebih luas dari itu.</span><span data-en>Football is the tool. What we build goes far beyond it.</span></p>
    </div>
    <div class="grid grid--3">
      ${site.values.map((v) => `<article class="value" data-reveal>
        <div class="value__icon" aria-hidden="true">${I[v.icon] || I.shield}</div>
        <h3>${bi(v.title)}</h3>
        <p>${bi(v.text, 'span')}</p>
      </article>`).join('\n      ')}
    </div>
  </div>
</section>

<section class="sec sec--soft" id="achievements">
  <div class="wrap">
    <div class="sec-head sec-head--center">
      <span class="eyebrow"><span data-id>Rekam Jejak</span><span data-en>Track Record</span></span>
      <h2 class="mt-2"><span data-id>Turnamen & Pencapaian</span><span data-en>Tournaments & Achievements</span></h2>
    </div>
    <div class="grid grid--3">
      ${DATA.achievements.map(trophyCard).join('\n      ')}
    </div>
  </div>
</section>

${ctaBand()}
`
});

/* ======================= PROGRAMS ======================= */
add({
  path: 'programs/index.html',
  active: 'programs',
  title: T('Program Latihan — Grassroots, Development, Competitive'),
  description: 'Tiga tahap program latihan GarudaKids FC: Grassroots (U-7/U-9), Development (U-11/U-13), dan Competitive Team (U-15/U-17).',
  breadcrumb: [{ name: 'Home', path: '' }, { name: 'Programs', path: 'programs/' }],
  body: `
${pageHero({
    crumbs: crumbs([{ href: 'index.html', label: { id: 'Beranda', en: 'Home' } }, { label: { id: 'Program', en: 'Programs' } }]),
    eyebrow: { id: 'Program Latihan', en: 'Training Programs' },
    title: { id: 'Jalur Pembinaan Pemain', en: 'The Player Pathway' },
    text: { id: 'Dari pengenalan sepak bola sampai tim kompetitif. Setiap tahap punya target, beban latihan, dan cara evaluasi sendiri.', en: 'From an introduction to football through to the competitive squad. Each stage has its own targets, load, and evaluation method.' }
  })}

<section class="sec sec--cream">
  <div class="wrap">
    <div class="grid grid--3">
      ${DATA.programs.map(programCard).join('\n      ')}
    </div>
    <div class="mt-5">
      <div class="sec-head sec-head--split">
        <div>
          <span class="eyebrow"><span data-id>Kelompok Usia</span><span data-en>Age Groups</span></span>
          <h2 class="mt-2"><span data-id>Kelompok Usia yang Tersedia</span><span data-en>Available Age Groups</span></h2>
          <p><span data-id>Penempatan berdasarkan usia dan hasil observasi teknis, bukan sekadar tahun kelahiran.</span><span data-en>Placement is based on age and technical observation, not birth year alone.</span></p>
        </div>
      </div>
      <div class="chips">
        ${['U-7', 'U-9', 'U-11', 'U-13', 'U-15', 'U-17'].map((a) => `<span class="chip chip--gold">${a}</span>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="sec sec--white">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow"><span data-id>Jadwal</span><span data-en>Schedule</span></span>
      <h2 class="mt-2"><span data-id>Jadwal Latihan Mingguan</span><span data-en>Weekly Training Schedule</span></h2>
    </div>
    ${scheduleTable(DATA.schedule)}
  </div>
</section>

${ctaBand()}
`
});

DATA.programs.forEach((p) => {
  const coach = coachById(p.headCoach);
  const rows = DATA.schedule.filter((r) => {
    const ag = pt(r.ageGroup, 'id');
    return p.ageGroups.some((a) => ag.indexOf(a) !== -1);
  });
  add({
    path: `programs/${p.slug}/index.html`,
    active: 'programs',
    title: T(`Program ${p.name} (${p.ageGroups.join(' & ')})`),
    description: pt(p.short, 'id'),
    breadcrumb: [{ name: 'Home', path: '' }, { name: 'Programs', path: 'programs/' }, { name: p.name, path: `programs/${p.slug}/` }],
    extraLd: {
      '@context': 'https://schema.org', '@type': 'Course', name: `${p.name} — GarudaKids FC`,
      description: pt(p.description, 'id'),
      provider: { '@type': 'SportsOrganization', name: site.name, sameAs: site.url }
    },
    body: `
${pageHero({
      crumbs: crumbs([
        { href: 'index.html', label: { id: 'Beranda', en: 'Home' } },
        { href: 'programs/', label: { id: 'Program', en: 'Programs' } },
        { label: p.name }
      ]),
      eyebrow: { id: `Kelompok ${p.ageGroups.join(' & ')}`, en: `${p.ageGroups.join(' & ')} Age Groups` },
      title: p.name,
      text: p.tagline
    })}

<section class="sec sec--cream">
  <div class="wrap">
    <div class="split">
      <div data-reveal>
        <span class="eyebrow"><span data-id>Deskripsi Program</span><span data-en>Programme Overview</span></span>
        <h2 class="mt-2">${bi(p.tagline)}</h2>
        <p class="lead mt-3">${bi(p.description, 'span')}</p>
        <h3 class="mt-4"><span data-id>Fokus Latihan</span><span data-en>Training Focus</span></h3>
        <ul class="program__list mt-2">
          ${p.focus.id.map((_, i) => `<li><span data-id>${esc(p.focus.id[i])}</span><span data-en>${esc(p.focus.en[i])}</span></li>`).join('\n          ')}
        </ul>
      </div>
      <div data-reveal>
        <div class="form-panel">
          <h3><span data-id>Ringkasan</span><span data-en>At a Glance</span></h3>
          <dl class="meta-rows">
            <div><dt><span data-id>Kelompok Usia</span><span data-en>Age Group</span></dt><dd>${p.ageGroups.join(' · ')}</dd></div>
            <div><dt><span data-id>Sesi / Minggu</span><span data-en>Sessions / Week</span></dt><dd>${p.sessionsPerWeek}</dd></div>
            <div><dt><span data-id>Durasi</span><span data-en>Duration</span></dt><dd>${bi(p.duration)}</dd></div>
            <div><dt><span data-id>Lokasi</span><span data-en>Venue</span></dt><dd>${esc(p.venue)}</dd></div>
            <div><dt><span data-id>Pelatih Utama</span><span data-en>Head Coach</span></dt><dd>${coach ? esc(coach.name) : '—'}</dd></div>
          </dl>
          <p class="form-note"><span data-id>Biaya pendaftaran dan iuran bulanan dikonfirmasi langsung melalui WhatsApp karena dapat berbeda per kelompok dan periode.</span><span data-en>Registration and monthly fees are confirmed directly via WhatsApp as they vary by group and period.</span></p>
          <div class="flex-btns mt-3">
            <a class="btn btn--block" href="{{REL}}registration/?program=${p.slug}"><span data-id>Daftar Program Ini</span><span data-en>Register for This Program</span></a>
            <a class="btn btn--ghost btn--block" href="${waLink}" target="_blank" rel="noopener"><span data-id>Tanya via WhatsApp</span><span data-en>Ask via WhatsApp</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--white">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow"><span data-id>Jadwal</span><span data-en>Schedule</span></span>
      <h2 class="mt-2"><span data-id>Jadwal Latihan ${p.name}</span><span data-en>${p.name} Training Schedule</span></h2>
    </div>
    ${scheduleTable(rows.length ? rows : DATA.schedule)}
  </div>
</section>

${ctaBand()}
`
  });
});

/* ======================= TEAMS ======================= */
add({
  path: 'teams/index.html',
  active: 'teams',
  title: T('Tim & Pemain — U-9, U-11, U-13, U-15'),
  description: 'Skuad GarudaKids FC per kelompok usia: U-9, U-11, U-13, dan U-15.',
  breadcrumb: [{ name: 'Home', path: '' }, { name: 'Teams', path: 'teams/' }],
  body: `
${pageHero({
    crumbs: crumbs([{ href: 'index.html', label: { id: 'Beranda', en: 'Home' } }, { label: { id: 'Tim', en: 'Teams' } }]),
    eyebrow: { id: 'Tim & Pemain', en: 'Teams & Players' },
    title: { id: 'Skuad GarudaKids FC', en: 'GarudaKids FC Squads' },
    text: { id: 'Setiap kelompok usia memiliki skuad, pelatih, dan program latihan sendiri.', en: 'Each age group has its own squad, coach, and training programme.' }
  })}

<section class="sec sec--cream">
  <div class="wrap">
    <div class="grid grid--2">
      ${DATA.teams.map((t) => {
        const c = coachById(t.coach);
        const p = programBySlug(t.program);
        return `<article class="card" data-reveal>
        <div class="card__body">
          <div class="card__meta">${esc(t.ageGroup)} &middot; ${p ? esc(p.name) : ''}</div>
          <h2 class="card__title mt-1">${esc(t.name)}</h2>
          <p class="mt-2 muted">${bi(t.description, 'span')}</p>
          <div class="meta-rows">
            <div><span class="k"><span data-id>Pelatih</span><span data-en>Coach</span></span><span class="v">${c ? esc(c.name) : '—'}</span></div>
            <div><span class="k"><span data-id>Jumlah Pemain</span><span data-en>Squad Size</span></span><span class="v">${t.players.length}</span></div>
          </div>
          <a class="btn btn--ghost btn--sm" href="{{REL}}teams/${t.slug}/"><span data-id>Lihat Skuad</span><span data-en>View Squad</span></a>
        </div>
      </article>`;
      }).join('\n      ')}
    </div>
    ${privacyNote()}
  </div>
</section>

${ctaBand()}
`
});

DATA.teams.forEach((t) => {
  const c = coachById(t.coach);
  const p = programBySlug(t.program);
  const teamFixtures = DATA.fixtures.upcoming.filter((f) => f.ageGroup === t.ageGroup);
  const teamResults = DATA.fixtures.results.filter((f) => f.ageGroup === t.ageGroup);
  add({
    path: `teams/${t.slug}/index.html`,
    active: 'teams',
    title: T(`${t.name} — Skuad & Jadwal`),
    description: pt(t.description, 'id'),
    breadcrumb: [{ name: 'Home', path: '' }, { name: 'Teams', path: 'teams/' }, { name: t.name, path: `teams/${t.slug}/` }],
    body: `
${pageHero({
      crumbs: crumbs([
        { href: 'index.html', label: { id: 'Beranda', en: 'Home' } },
        { href: 'teams/', label: { id: 'Tim', en: 'Teams' } },
        { label: t.ageGroup }
      ]),
      eyebrow: { id: `Kelompok ${t.ageGroup}`, en: `${t.ageGroup} Age Group` },
      title: t.name,
      text: t.description
    })}

<section class="sec sec--cream">
  <div class="wrap">
    <div class="sec-head sec-head--split">
      <div>
        <span class="eyebrow"><span data-id>Skuad</span><span data-en>Squad</span></span>
        <h2 class="mt-2"><span data-id>Daftar Pemain</span><span data-en>Player List</span></h2>
        <p><span data-id>Pelatih: <b>${c ? esc(c.name) : '—'}</b> &middot; Program: <b>${p ? esc(p.name) : '—'}</b></span><span data-en>Coach: <b>${c ? esc(c.name) : '—'}</b> &middot; Program: <b>${p ? esc(p.name) : '—'}</b></span></p>
      </div>
    </div>
    <div class="grid grid--4">
      ${t.players.map(playerCard).join('\n      ')}
    </div>
    ${privacyNote()}
  </div>
</section>

${(teamFixtures.length || teamResults.length) ? `<section class="sec sec--white">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow"><span data-id>Pertandingan</span><span data-en>Matches</span></span>
      <h2 class="mt-2"><span data-id>Jadwal & Hasil ${t.ageGroup}</span><span data-en>${t.ageGroup} Fixtures & Results</span></h2>
    </div>
    <div class="grid grid--2">
      ${teamFixtures.map((f) => fixtureCard(f, false)).join('\n      ')}
      ${teamResults.map((f) => fixtureCard(f, true)).join('\n      ')}
    </div>
  </div>
</section>` : ''}

${ctaBand()}
`
  });
});

/* ======================= FIXTURES ======================= */
add({
  path: 'fixtures/index.html',
  active: 'fixtures',
  title: T('Jadwal Pertandingan — Upcoming Matches'),
  description: 'Jadwal pertandingan GarudaKids FC: liga akademi, turnamen, dan laga uji coba per kelompok usia.',
  breadcrumb: [{ name: 'Home', path: '' }, { name: 'Fixtures', path: 'fixtures/' }],
  body: `
${pageHero({
    crumbs: crumbs([{ href: 'index.html', label: { id: 'Beranda', en: 'Home' } }, { label: { id: 'Jadwal', en: 'Fixtures' } }]),
    eyebrow: { id: 'Jadwal Pertandingan', en: 'Fixtures' },
    title: 'Upcoming Matches',
    text: { id: 'Jadwal dapat berubah mengikuti keputusan panitia kompetisi dan kondisi cuaca.', en: 'Schedules may change subject to competition organisers and weather conditions.' }
  })}

<section class="sec sec--cream">
  <div class="wrap">
    <div class="grid grid--2">
      ${DATA.fixtures.upcoming.map((f) => fixtureCard(f, false)).join('\n      ')}
    </div>
    <div class="center mt-5"><a class="btn btn--ghost" href="{{REL}}results/"><span data-id>Lihat Hasil Pertandingan</span><span data-en>View Latest Results</span></a></div>
  </div>
</section>

<section class="sec sec--white">
  <div class="wrap">
    <div class="sec-head">
      <span class="eyebrow"><span data-id>Latihan</span><span data-en>Training</span></span>
      <h2 class="mt-2"><span data-id>Jadwal Latihan Mingguan</span><span data-en>Weekly Training Schedule</span></h2>
    </div>
    ${scheduleTable(DATA.schedule)}
  </div>
</section>

${ctaBand()}
`
});

add({
  path: 'results/index.html',
  active: 'fixtures',
  title: T('Hasil Pertandingan — Latest Results'),
  description: 'Hasil pertandingan terbaru GarudaKids FC per kelompok usia beserta pencetak gol.',
  breadcrumb: [{ name: 'Home', path: '' }, { name: 'Results', path: 'results/' }],
  body: `
${pageHero({
    crumbs: crumbs([{ href: 'index.html', label: { id: 'Beranda', en: 'Home' } }, { label: { id: 'Hasil', en: 'Results' } }]),
    eyebrow: { id: 'Hasil Pertandingan', en: 'Match Results' },
    title: 'Latest Results',
    text: { id: 'Rekap hasil pertandingan resmi dan uji coba seluruh kelompok usia.', en: 'A recap of official and friendly match results across all age groups.' }
  })}

<section class="sec sec--cream">
  <div class="wrap">
    <div class="grid grid--2">
      ${DATA.fixtures.results.map((f) => fixtureCard(f, true)).join('\n      ')}
    </div>
    <div class="center mt-5"><a class="btn btn--ghost" href="{{REL}}fixtures/"><span data-id>Lihat Jadwal Berikutnya</span><span data-en>View Upcoming Fixtures</span></a></div>
  </div>
</section>

${ctaBand()}
`
});

/* ======================= COACHES ======================= */
add({
  path: 'coaches/index.html',
  active: 'about',
  title: T('Tim Pelatih — Certified Coaching Staff'),
  description: 'Profil pelatih GarudaKids FC: lisensi, spesialisasi, dan pengalaman melatih kelompok usia muda.',
  breadcrumb: [{ name: 'Home', path: '' }, { name: 'Coaches', path: 'coaches/' }],
  body: `
${pageHero({
    crumbs: crumbs([{ href: 'index.html', label: { id: 'Beranda', en: 'Home' } }, { label: { id: 'Pelatih', en: 'Coaches' } }]),
    eyebrow: { id: 'Tim Pelatih', en: 'Coaching Staff' },
    title: { id: 'Pelatih Bersertifikat', en: 'Certified Coaches' },
    text: { id: 'Setiap sesi latihan ditangani pelatih dengan lisensi dan spesialisasi yang relevan dengan kelompok usia.', en: 'Every session is led by coaches whose licence and specialisation match the age group.' }
  })}

<section class="sec sec--cream">
  <div class="wrap">
    <div class="grid grid--3">
      ${DATA.coaches.map(coachCard).join('\n      ')}
    </div>
  </div>
</section>

${ctaBand()}
`
});

/* ======================= GALLERY ======================= */
add({
  path: 'gallery/index.html',
  active: 'gallery',
  title: T('Galeri — Latihan, Pertandingan & Turnamen'),
  description: 'Dokumentasi kegiatan GarudaKids FC: sesi latihan, pertandingan, turnamen, foto tim, dan acara akademi.',
  breadcrumb: [{ name: 'Home', path: '' }, { name: 'Gallery', path: 'gallery/' }],
  body: `
${pageHero({
    crumbs: crumbs([{ href: 'index.html', label: { id: 'Beranda', en: 'Home' } }, { label: { id: 'Galeri', en: 'Gallery' } }]),
    eyebrow: { id: 'Galeri', en: 'Gallery' },
    title: { id: 'Dokumentasi Akademi', en: 'Academy Gallery' },
    text: { id: 'Momen latihan, pertandingan, dan kegiatan GarudaKids FC.', en: 'Training, match, and academy moments at GarudaKids FC.' }
  })}

<section class="sec sec--cream">
  <div class="wrap">
    <div class="gal-filters" role="group" aria-label="${attr({ id: 'Filter kategori galeri', en: 'Gallery category filter' })}">
      <button type="button" data-cat="all" aria-pressed="true"><span data-id>Semua</span><span data-en>All</span></button>
      ${DATA.gallery.categories.map((c) => `<button type="button" data-cat="${esc(c.slug)}" aria-pressed="false">${bi(c.label)}</button>`).join('\n      ')}
    </div>
    <div class="masonry">
      ${DATA.gallery.items.map((it) => `<div>
        <button class="gal-item" type="button" data-cat="${esc(it.category)}" data-caption="${attr(it.caption)}">
          ${it.src ? `<img src="{{REL}}${esc(it.src)}" alt="${attr(it.caption)}" loading="lazy">` : `<div class="gal-item__ph" data-ratio="${esc(it.ratio)}" aria-hidden="true"></div>`}
          <span class="gal-item__cap">${bi(it.caption)}</span>
        </button>
      </div>`).join('\n      ')}
    </div>
    <p class="form-note mt-4"><span data-id>Catatan: foto pada halaman ini adalah placeholder. Ganti dengan foto asli GarudaKids FC melalui <code>data/gallery.json</code>.</span><span data-en>Note: images on this page are placeholders. Replace them with authentic GarudaKids FC photos via <code>data/gallery.json</code>.</span></p>
  </div>
</section>

<div class="lightbox" id="lightbox" role="dialog" aria-modal="true" aria-label="Gallery viewer">
  <button class="lightbox__close" type="button" aria-label="Close">&times;</button>
  <button class="lightbox__nav prev" type="button" aria-label="Previous">&#8249;</button>
  <button class="lightbox__nav next" type="button" aria-label="Next">&#8250;</button>
  <figure><div class="lb-slot"></div><figcaption></figcaption></figure>
</div>

${ctaBand()}
`
});

/* ======================= NEWS ======================= */
add({
  path: 'news/index.html',
  active: 'news',
  title: T('Berita Akademi — News & Announcements'),
  description: 'Berita terbaru GarudaKids FC: pengumuman turnamen, hasil pertandingan, update latihan, dan periode pendaftaran.',
  breadcrumb: [{ name: 'Home', path: '' }, { name: 'News', path: 'news/' }],
  body: `
${pageHero({
    crumbs: crumbs([{ href: 'index.html', label: { id: 'Beranda', en: 'Home' } }, { label: { id: 'Berita', en: 'News' } }]),
    eyebrow: { id: 'Berita', en: 'News' },
    title: { id: 'Kabar Akademi', en: 'Academy News' },
    text: { id: 'Pengumuman turnamen, hasil pertandingan, update latihan, dan periode pendaftaran.', en: 'Tournament announcements, match results, training updates, and registration periods.' }
  })}

<section class="sec sec--cream">
  <div class="wrap">
    <div class="grid grid--3">
      ${DATA.news.map(newsCard).join('\n      ')}
    </div>
  </div>
</section>

${ctaBand()}
`
});

DATA.news.forEach((n, i) => {
  const others = DATA.news.filter((x) => x.slug !== n.slug).slice(0, 3);
  add({
    path: `news/${n.slug}/index.html`,
    active: 'news',
    title: T(pt(n.title, 'id')),
    description: pt(n.excerpt, 'id'),
    breadcrumb: [{ name: 'Home', path: '' }, { name: 'News', path: 'news/' }, { name: pt(n.title, 'id'), path: `news/${n.slug}/` }],
    extraLd: {
      '@context': 'https://schema.org', '@type': 'NewsArticle',
      headline: pt(n.title, 'id'), datePublished: n.date, inLanguage: 'id-ID',
      description: pt(n.excerpt, 'id'),
      publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: site.url + '/assets/img/logo.png' } },
      mainEntityOfPage: `${site.url}/news/${n.slug}/`
    },
    body: `
${pageHero({
      crumbs: crumbs([
        { href: 'index.html', label: { id: 'Beranda', en: 'Home' } },
        { href: 'news/', label: { id: 'Berita', en: 'News' } },
        { label: n.category }
      ]),
      eyebrow: n.category,
      title: n.title,
      text: n.excerpt
    })}

<section class="sec sec--cream">
  <div class="wrap wrap--narrow">
    <article class="article">
      <p class="news__date">${dateBi(n.date, { dow: true })}</p>
      <div class="mt-3">
        <div data-id>${n.body.id.map((par) => `<p>${esc(par)}</p>`).join('\n        ')}</div>
        <div data-en>${n.body.en.map((par) => `<p>${esc(par)}</p>`).join('\n        ')}</div>
      </div>
      <div class="flex-btns mt-5">
        <a class="btn btn--ghost btn--sm" href="{{REL}}news/">&larr; <span data-id>Semua Berita</span><span data-en>All News</span></a>
        <a class="btn btn--gold btn--sm" href="{{REL}}registration/"><span data-id>Daftar Sekarang</span><span data-en>Register Now</span></a>
      </div>
    </article>
  </div>
</section>

<section class="sec sec--white">
  <div class="wrap">
    <div class="sec-head"><span class="eyebrow"><span data-id>Berita Lain</span><span data-en>More News</span></span></div>
    <div class="grid grid--3">${others.map(newsCard).join('\n      ')}</div>
  </div>
</section>

${ctaBand()}
`
  });
});

/* ======================= REGISTRATION ======================= */
add({
  path: 'registration/index.html',
  active: 'programs',
  title: T('Pendaftaran — Ready to Join the Team?'),
  description: 'Formulir pendaftaran pemain baru GarudaKids FC. Isi data, lalu lanjutkan konfirmasi via WhatsApp.',
  breadcrumb: [{ name: 'Home', path: '' }, { name: 'Registration', path: 'registration/' }],
  body: `
${pageHero({
    crumbs: crumbs([{ href: 'index.html', label: { id: 'Beranda', en: 'Home' } }, { label: { id: 'Pendaftaran', en: 'Registration' } }]),
    eyebrow: { id: 'Pendaftaran Pemain Baru', en: 'New Player Registration' },
    title: 'Ready to Join the Team?',
    text: { id: 'Mulai perjalanan sepak bola bersama GarudaKids FC. Isi formulir di bawah, lalu lanjutkan konfirmasi melalui WhatsApp.', en: 'Start your football journey with GarudaKids FC. Complete the form below, then continue the confirmation via WhatsApp.' }
  })}

<section class="sec sec--cream">
  <div class="wrap">
    <div class="split" style="align-items:flex-start">
      <div class="form-panel" data-reveal>
        <div class="form-success" id="form-success" role="status">
          ${I.check}
          <div>
            <b><span data-id>Data tersimpan di perangkat Anda.</span><span data-en>Your details are ready.</span></b>
            <p class="form-note mt-1"><span data-id>Jendela WhatsApp seharusnya terbuka otomatis. Jika tidak,</span><span data-en>A WhatsApp window should have opened. If not,</span> <a id="wa-continue" href="${waLink}" target="_blank" rel="noopener"><b><span data-id>lanjutkan via WhatsApp di sini</span><span data-en>continue via WhatsApp here</span></b></a>.</p>
          </div>
        </div>
        <h2><span data-id>Formulir Pendaftaran</span><span data-en>Registration Form</span></h2>
        <p class="form-note mt-2"><span data-id>Kolom bertanda <span class="req">*</span> wajib diisi.</span><span data-en>Fields marked <span class="req">*</span> are required.</span></p>
        <form class="form mt-3" id="registration-form" data-wa="${esc(site.contact.whatsapp)}" novalidate>
          <div class="form-row">
            <div class="field">
              <label for="player_name"><span data-id>Nama Pemain</span><span data-en>Player Name</span> <span class="req">*</span></label>
              <input id="player_name" name="player_name" type="text" required autocomplete="off" placeholder="Nama lengkap pemain">
            </div>
            <div class="field">
              <label for="age"><span data-id>Usia</span><span data-en>Age</span> <span class="req">*</span></label>
              <input id="age" name="age" type="number" min="5" max="18" required placeholder="10">
            </div>
          </div>
          <div class="form-row">
            <div class="field">
              <label for="guardian_name"><span data-id>Nama Orang Tua / Wali</span><span data-en>Parent / Guardian Name</span> <span class="req">*</span></label>
              <input id="guardian_name" name="guardian_name" type="text" required placeholder="Nama orang tua atau wali">
            </div>
            <div class="field">
              <label for="whatsapp"><span data-id>Nomor WhatsApp</span><span data-en>WhatsApp Number</span> <span class="req">*</span></label>
              <input id="whatsapp" name="whatsapp" type="tel" required inputmode="tel" placeholder="08xxxxxxxxxx">
            </div>
          </div>
          <div class="field">
            <label for="program"><span data-id>Program Pilihan</span><span data-en>Preferred Program</span> <span class="req">*</span></label>
            <select id="program" name="program" required>
              <option value="">— Pilih program / Choose program —</option>
              ${DATA.programs.map((p) => `<option value="${esc(p.name)} (${p.ageGroups.join('/')})">${esc(p.name)} — ${p.ageGroups.join(' / ')}</option>`).join('\n              ')}
              <option value="Belum yakin / minta rekomendasi">Belum yakin — minta rekomendasi pelatih</option>
            </select>
          </div>
          <div class="field">
            <label for="experience"><span data-id>Pengalaman Sepak Bola</span><span data-en>Football Experience</span></label>
            <select id="experience" name="experience">
              <option value="Pemula / belum pernah">Pemula — belum pernah ikut akademi</option>
              <option value="Pernah SSB / akademi lain">Pernah ikut SSB / akademi lain</option>
              <option value="Aktif kompetisi">Aktif mengikuti kompetisi</option>
            </select>
          </div>
          <div class="field">
            <label for="notes"><span data-id>Catatan</span><span data-en>Notes</span></label>
            <textarea id="notes" name="notes" placeholder="Riwayat cedera, hari yang tidak bisa hadir, atau pertanyaan lain."></textarea>
            <span class="hint"><span data-id>Jangan mengisi data medis rinci di sini. Sampaikan langsung ke pelatih saat observasi.</span><span data-en>Please avoid detailed medical data here. Share it directly with the coach at the observation session.</span></span>
          </div>
          <button class="btn btn--gold btn--block" type="submit">Register Now</button>
          <p class="form-note"><span data-id>Menekan tombol di atas akan membuka WhatsApp berisi ringkasan data Anda. Tidak ada data yang dikirim ke server pihak ketiga.</span><span data-en>Submitting opens WhatsApp with a summary of your details. No data is sent to any third-party server.</span></p>
        </form>
      </div>

      <div data-reveal>
        <h2><span data-id>Alur Pendaftaran</span><span data-en>How Registration Works</span></h2>
        <ol class="program__list mt-3">
          <li><b><span data-id>1. Isi formulir</span><span data-en>1. Complete the form</span></b> — <span data-id>data dasar pemain dan orang tua.</span><span data-en>basic player and parent details.</span></li>
          <li><b><span data-id>2. Konfirmasi WhatsApp</span><span data-en>2. WhatsApp confirmation</span></b> — <span data-id>tim kami membalas dengan jadwal observasi.</span><span data-en>our team replies with an observation slot.</span></li>
          <li><b><span data-id>3. Sesi observasi</span><span data-en>3. Observation session</span></b> — <span data-id>pemain mengikuti satu sesi latihan.</span><span data-en>the player joins one training session.</span></li>
          <li><b><span data-id>4. Penempatan kelompok</span><span data-en>4. Group placement</span></b> — <span data-id>berdasarkan usia dan hasil observasi.</span><span data-en>based on age and observation results.</span></li>
          <li><b><span data-id>5. Mulai latihan</span><span data-en>5. Start training</span></b> — <span data-id>jadwal dan grup WhatsApp kelompok diberikan.</span><span data-en>schedule and group WhatsApp channel are shared.</span></li>
        </ol>

        <div class="form-panel mt-4">
          <h3><span data-id>Yang Perlu Disiapkan</span><span data-en>What to Prepare</span></h3>
          <ul class="program__list mt-2">
            <li><span data-id>Sepatu bola dan pelindung tulang kering</span><span data-en>Football boots and shin guards</span></li>
            <li><span data-id>Botol minum pribadi</span><span data-en>Personal water bottle</span></li>
            <li><span data-id>Kartu identitas anak (untuk verifikasi usia)</span><span data-en>Child ID (for age verification)</span></li>
          </ul>
          <p class="form-note mt-2"><span data-id>Informasi biaya dikonfirmasi via WhatsApp karena berbeda per kelompok dan periode pendaftaran.</span><span data-en>Fee information is confirmed via WhatsApp as it differs by group and registration period.</span></p>
        </div>

        ${privacyNote()}
      </div>
    </div>
  </div>
</section>
`
});

/* ======================= CONTACT ======================= */
add({
  path: 'contact/index.html',
  active: 'contact',
  title: T('Kontak & Lokasi Latihan'),
  description: 'Lokasi latihan, WhatsApp, telepon, email, dan media sosial resmi GarudaKids FC.',
  breadcrumb: [{ name: 'Home', path: '' }, { name: 'Contact', path: 'contact/' }],
  body: `
${pageHero({
    crumbs: crumbs([{ href: 'index.html', label: { id: 'Beranda', en: 'Home' } }, { label: { id: 'Kontak', en: 'Contact' } }]),
    eyebrow: { id: 'Kontak', en: 'Contact' },
    title: { id: 'Hubungi GarudaKids FC', en: 'Get in Touch' },
    text: { id: 'Cara tercepat menghubungi kami adalah melalui WhatsApp pada jam operasional.', en: 'The fastest way to reach us is via WhatsApp during office hours.' }
  })}

<section class="sec sec--cream">
  <div class="wrap">
    <div class="split" style="align-items:flex-start">
      <div data-reveal>
        <h2><span data-id>Informasi Kontak</span><span data-en>Contact Information</span></h2>
        <div class="mt-3">
          <div class="contact-item">
            <span class="contact-item__icon" aria-hidden="true">${I.pin}</span>
            <div>
              <h4><span data-id>Lokasi Latihan</span><span data-en>Training Location</span></h4>
              <a href="${esc(site.contact.mapsLink)}" target="_blank" rel="noopener">${esc(site.contact.venueName)}<br>${esc(site.contact.address)}</a>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-item__icon" aria-hidden="true">${I.wa}</span>
            <div>
              <h4>WhatsApp</h4>
              <a href="${waLink}" target="_blank" rel="noopener">${esc(site.contact.whatsappDisplay)}</a>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-item__icon" aria-hidden="true">${I.phone}</span>
            <div>
              <h4><span data-id>Telepon</span><span data-en>Phone</span></h4>
              <a href="tel:${esc(site.contact.phone.replace(/\s/g, ''))}">${esc(site.contact.phone)}</a>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-item__icon" aria-hidden="true">${I.mail}</span>
            <div>
              <h4>Email</h4>
              <a href="mailto:${esc(site.contact.email)}">${esc(site.contact.email)}</a>
            </div>
          </div>
          <div class="contact-item">
            <span class="contact-item__icon" aria-hidden="true">${I.clock}</span>
            <div>
              <h4><span data-id>Jam Operasional</span><span data-en>Office Hours</span></h4>
              <p>${bi(site.contact.officeHours)}</p>
            </div>
          </div>
        </div>
        <div class="socials">
          ${(() => {
            const s = site.social, out = [];
            if (s.instagram) out.push(`<a href="${esc(s.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${I.ig}</a>`);
            if (s.tiktok) out.push(`<a href="${esc(s.tiktok)}" target="_blank" rel="noopener" aria-label="TikTok">${I.tiktok}</a>`);
            if (s.youtube) out.push(`<a href="${esc(s.youtube)}" target="_blank" rel="noopener" aria-label="YouTube">${I.yt}</a>`);
            return out.join('\n          ');
          })()}
        </div>
        <div class="flex-btns mt-4">
          <a class="btn btn--gold" href="${waLink}" target="_blank" rel="noopener">${I.wa} <span data-id>Chat via WhatsApp</span><span data-en>Chat via WhatsApp</span></a>
          <a class="btn btn--ghost" href="{{REL}}registration/"><span data-id>Formulir Pendaftaran</span><span data-en>Registration Form</span></a>
        </div>
      </div>

      <div data-reveal>
        <div class="map-frame">
          <iframe src="${esc(site.contact.mapsEmbed)}" title="Peta lokasi latihan GarudaKids FC" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>
        </div>
        <div class="flex-btns mt-3">
          <a class="btn btn--ghost btn--sm" href="${esc(site.contact.mapsLink)}" target="_blank" rel="noopener">${I.pin} <span data-id>Buka di Google Maps</span><span data-en>Open in Google Maps</span></a>
          <a class="btn btn--ghost btn--sm" href="https://www.google.com/maps/dir/?api=1&destination=${site.contact.lat},${site.contact.lng}" target="_blank" rel="noopener"><span data-id>Petunjuk Arah</span><span data-en>Get Directions</span></a>
        </div>
        <div class="form-panel mt-3">
          <h3><span data-id>Sebelum Datang</span><span data-en>Before You Visit</span></h3>
          <ul class="program__list mt-2">
            <li><span data-id>Konfirmasi jadwal terlebih dahulu via WhatsApp — sesi bisa berubah karena cuaca.</span><span data-en>Confirm the schedule via WhatsApp first — sessions can change due to weather.</span></li>
            <li><span data-id>Datang 15 menit sebelum sesi dimulai untuk pemanasan.</span><span data-en>Arrive 15 minutes before the session for warm-up.</span></li>
            <li><span data-id>Orang tua dapat menunggu di area yang disediakan di pinggir lapangan.</span><span data-en>Parents may wait in the designated area beside the pitch.</span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

${ctaBand()}
`
});

module.exports = pages;
