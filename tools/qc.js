const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..','dist');
const MIME={'.html':'text/html','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.json':'application/json'};
const s=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);let f=path.join(ROOT,p);
 if(fs.existsSync(f)&&fs.statSync(f).isDirectory())f=path.join(f,'index.html');
 if(!fs.existsSync(f)){r.writeHead(404);return r.end('nf');}
 r.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r);});
(async()=>{await new Promise(r=>s.listen(4321,r));
const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1440,height:1000}});
const errs=[];pg.on('console',m=>{if(m.type()==='error')errs.push(m.text())});pg.on('pageerror',e=>errs.push('PAGEERROR '+e.message));
const urls=['','about/','programs/','programs/development/','teams/u13/','fixtures/','results/','coaches/','gallery/','news/','news/open-house-akademi/','registration/','contact/'];
for(const u of urls){await pg.goto('http://localhost:4321/'+u,{waitUntil:'networkidle'});await pg.waitForTimeout(250);}
await pg.goto('http://localhost:4321/',{waitUntil:'networkidle'});
await pg.click('.lang-switch button[data-lang="en"]');await pg.waitForTimeout(400);
await pg.evaluate(()=>document.querySelectorAll('[data-reveal]').forEach(e=>e.classList.add('is-in')));
await pg.screenshot({path:path.join(__dirname,'..','shots','home-en.png')});
const heroTxt=await pg.textContent('.hero__text');
await pg.goto('http://localhost:4321/gallery/',{waitUntil:'networkidle'});
await pg.click('.gal-item');await pg.waitForTimeout(400);
const lbOpen=await pg.isVisible('#lightbox.is-open');
await pg.screenshot({path:path.join(__dirname,'..','shots','lightbox.png')});
const m=await b.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});
await m.goto('http://localhost:4321/',{waitUntil:'networkidle'});
await m.tap('.nav-toggle');await m.waitForTimeout(400);
await m.screenshot({path:path.join(__dirname,'..','shots','mobile-nav.png')});
console.log('EN hero text:',heroTxt.trim().slice(0,70));
console.log('lightbox opens:',lbOpen);
console.log('console errors:',errs.length?errs:'none');
await b.close();s.close();})();
