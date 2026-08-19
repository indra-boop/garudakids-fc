const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..','dist');
let files=[]; (function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name); e.isDirectory()?w(p):files.push(p);}})(ROOT);
const htmls=files.filter(f=>f.endsWith('.html'));
let bad=0, checked=0;
for(const f of htmls){
  const html=fs.readFileSync(f,'utf8');
  const dir=path.dirname(f);
  const links=[...html.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]);
  for(const l of links){
    if(/^(https?:|mailto:|tel:|#|data:)/.test(l)) continue;
    checked++;
    let target=path.resolve(dir,l.split('?')[0].split('#')[0]);
    if(fs.existsSync(target)&&fs.statSync(target).isDirectory()) target=path.join(target,'index.html');
    if(!fs.existsSync(target)){ console.log('MISSING',path.relative(ROOT,f),'->',l); bad++; }
  }
}
// crude tag balance / stray checks
for(const f of htmls){
  const h=fs.readFileSync(f,'utf8');
  if(h.includes('{{REL}}')) { console.log('UNRESOLVED REL in',path.relative(ROOT,f)); bad++; }
  if(h.includes('undefined')) { console.log('UNDEFINED in',path.relative(ROOT,f)); bad++; }
  if(/\[object Object\]/.test(h)) { console.log('OBJECT in',path.relative(ROOT,f)); bad++; }
  const o=(h.match(/<div/g)||[]).length,c=(h.match(/<\/div>/g)||[]).length;
  if(o!==c) console.log('DIV IMBALANCE',path.relative(ROOT,f),o,c);
}
console.log(`\nchecked ${checked} internal links across ${htmls.length} pages — ${bad} problem(s)`);
