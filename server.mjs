import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root=path.resolve('dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.pdf':'application/pdf','.xml':'application/xml'};
createServer(async(req,res)=>{
 try {
  let u=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  let f=path.resolve(root,'.'+u);
  if(!f.startsWith(root+path.sep)&&f!==root) throw Error('invalid');
  const s=await stat(f).catch(()=>null);if(s?.isDirectory()||u.endsWith('/'))f=path.join(f,'index.html');
  const b=await readFile(f);res.writeHead(200,{'Content-Type':types[path.extname(f)]||'application/octet-stream'});res.end(b);
 }catch{res.writeHead(404);res.end('404 Not Found');}
}).listen(8765,()=>console.log('Open http://localhost:8765'));
