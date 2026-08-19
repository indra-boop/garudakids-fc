const { chromium } = require('playwright');
const http = require('http'); const fs = require('fs'); const path = require('path');
const ROOT = path.join(__dirname, '..', 'dist');
const MIME = {'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.xml':'application/xml','.txt':'text/plain'};
const server = http.createServer((req,res)=>{
  let p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(ROOT, p);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f,'index.html');
  if (!fs.existsSync(f)) { res.writeHead(404); return res.end('nf'); }
  res.writeHead(200,{'Content-Type': MIME[path.extname(f)]||'application/octet-stream'});
  fs.createReadStream(f).pipe(res);
});
(async () => {
  await new Promise(r=>server.listen(4321,r));
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium/chrome-linux/chrome' }).catch(()=>chromium.launch());
  const shots = [['','home'],['about/','about'],['programs/','programs'],['programs/development/','program-detail'],['teams/u13/','team-u13'],['fixtures/','fixtures'],['results/','results'],['coaches/','coaches'],['gallery/','gallery'],['news/','news'],['registration/','registration'],['contact/','contact']];
  fs.mkdirSync(path.join(__dirname,'..','shots'),{recursive:true});
  const pg = await b.newPage({ viewport:{width:1440,height:1000}, deviceScaleFactor:1 });
  for (const [u,n] of shots) {
    await pg.goto('http://localhost:4321/'+u, { waitUntil:'networkidle' });
    await pg.waitForTimeout(700);
    await pg.evaluate(()=>document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-in')));
    await pg.waitForTimeout(300);
    await pg.screenshot({ path: path.join(__dirname,'..','shots',n+'.png'), fullPage: n==='home' });
  }
  const m = await b.newPage({ viewport:{width:390,height:844}, isMobile:true, hasTouch:true, deviceScaleFactor:2 });
  for (const [u,n] of [['','home'],['programs/','programs'],['registration/','registration'],['fixtures/','fixtures']]) {
    await m.goto('http://localhost:4321/'+u,{waitUntil:'networkidle'});
    await m.waitForTimeout(600);
    await m.evaluate(()=>document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-in')));
    await m.screenshot({ path: path.join(__dirname,'..','shots','mobile-'+n+'.png') });
  }
  // OG image
  const og = await b.newPage({ viewport:{width:1200,height:630} });
  await og.goto('file://'+path.join(__dirname,'og.html'),{waitUntil:'networkidle'});
  await og.waitForTimeout(1200);
  await og.screenshot({ path: path.join(__dirname,'..','static','assets','img','og-image.png') });
  await b.close(); server.close();
  console.log('shots done');
})();
