import assert from 'node:assert/strict';
import {readFile, readdir, stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';

const root=path.resolve(fileURLToPath(new URL('../public/',import.meta.url)));
const pages=['index.html','support/index.html','privacy/index.html','en/index.html','en/support/index.html','en/privacy/index.html','de/index.html','de/support/index.html','de/privacy/index.html'];
let localLinks=0, anchors=0;
for(const page of pages){
  const html=await readFile(path.join(root,page),'utf8');
  assert(html.startsWith('<!doctype html>'),`${page}: missing doctype`);
  const lang=page.startsWith('en/')?'en':page.startsWith('de/')?'de':'tr';
  assert(html.includes(`<html lang="${lang}">`),`${page}: language mismatch`);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`${page}: one h1 required`);
  assert.match(html,/<meta name="viewport"/);
  assert.match(html,/<meta name="description" content="[^"]+"/);
  assert.match(html,/<main id="main">/);
  assert(!/<script\b|<iframe\b|<form\b/.test(html),`${page}: unexpected active content`);
  assert(!/OWNER_INPUT_REQUIRED|TODO|lorem ipsum|localhost|127\.0\.0\.1|\/Users\//i.test(html),`${page}: internal or placeholder text`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length,`${page}: duplicate IDs`);
  for(const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)){
    const value=m[1];
    if(value.startsWith('https://')||value.startsWith('mailto:'))continue;
    assert(!value.startsWith('/'),`${page}: root-absolute link breaks project hosting: ${value}`);
    const [file,anchor]=value.split('#');
    let target=file?path.resolve(root,path.dirname(page),file):path.join(root,page);
    assert(target===root||target.startsWith(root+path.sep),`${page}: path escapes public/`);
    if((await stat(target)).isDirectory())target=path.join(target,'index.html');
    assert((await stat(target)).isFile(),`${page}: broken local link ${value}`);localLinks++;
    if(anchor){assert((await readFile(target,'utf8')).includes(`id="${anchor}"`),`${page}: missing anchor ${value}`);anchors++;}
  }
}
async function inventory(dir){const files=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())files.push(...await inventory(p));else files.push(p);}return files;}
const files=await inventory(root);
for(const p of files){
  assert(['.html','.css','.png'].includes(path.extname(p))||path.basename(p)==='.nojekyll',`Unexpected published file: ${p}`);
  if(p.endsWith('.png')){
    const b=await readFile(p);assert.equal(b.subarray(1,4).toString(),'PNG');
    assert(b.readUInt32BE(16)>0&&b.readUInt32BE(20)>0,`Bad PNG dimensions: ${p}`);
  }
}
const css=await readFile(path.join(root,'assets/style.css'),'utf8');
assert(!/@import|url\(["']?https?:/.test(css),'Unexpected external stylesheet/asset');
assert.match(css,/prefers-reduced-motion/);
const workflow=await readFile(new URL('../.github/workflows/pages.yml',import.meta.url),'utf8');
assert.match(workflow,/path: public\n/);
assert.match(workflow,/node scripts\/check.mjs/);
console.log(JSON.stringify({result:'PASS',pages:pages.length,localLinks,anchors,publishedFiles:files.length,noRuntimeJavaScript:true,noExternalAssets:true},null,2));
