import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.resolve(fileURLToPath(new URL('../public/',import.meta.url)));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.json':'application/json'};
http.createServer(async(req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(pathname==='/UFFF'){res.writeHead(301,{Location:'/UFFF/'});return res.end();}if(pathname.startsWith('/UFFF/'))pathname=pathname.slice(5);let target=path.resolve(root,'.'+pathname);if(target!==root&&!target.startsWith(root+path.sep))throw Error('path');if((await stat(target)).isDirectory()){if(!pathname.endsWith('/')){res.writeHead(301,{Location:req.url+'/'});return res.end();}target=path.join(target,'index.html');}let body=await readFile(target);res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store'});res.end(body);}catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Not found');}}).listen(8767,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:8767/UFFF/'));
