const fs=require('fs'),path=require('path');
const D=path.join(__dirname,'..','dist');
const rd=p=>fs.readFileSync(path.join(D,p));
const dataURI=(p)=>{
  const ext=path.extname(p).toLowerCase();
  const mime=ext==='.svg'?'image/svg+xml':ext==='.png'?'image/png':'application/octet-stream';
  return `data:${mime};base64,${rd(p).toString('base64')}`;
};
let css=rd('assets/css/main.css').toString();
css=css.replace(/url\("\.\.\/img\/([^"]+)"\)/g,(m,f)=>`url("${dataURI('assets/img/'+f)}")`);
let js=rd('assets/js/main.js').toString();
let html=rd('index.html').toString();
html=html.replace(/<link rel="stylesheet" href="\.\/assets\/css\/main\.css">/,`<style>\n${css}\n</style>`);
html=html.replace(/<script src="\.\/assets\/js\/main\.js" defer><\/script>/,`<script>\n${js}\n</script>`);
html=html.replace(/(src|href)="\.\/assets\/img\/([^"]+)"/g,(m,a,f)=>`${a}="${dataURI('assets/img/'+f)}"`);
html=html.replace(/onerror="[^"]*"/g,'');
fs.writeFileSync(path.join(__dirname,'..','preview-homepage.html'),html);
console.log('preview-homepage.html',(html.length/1024).toFixed(0)+'KB');
