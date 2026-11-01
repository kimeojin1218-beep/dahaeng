// 다행 키오스크 오프라인 캐시 — 한 번 인터넷으로 열면 그 뒤로는 인터넷 없이 열려요
const CACHE='dahaeng-v1';
const PRECACHE=["./", "./index.html", "./epos-2.27.0.js", "./illu/c/01.webp", "./illu/c/02.webp", "./illu/c/03.webp", "./illu/c/04.webp", "./illu/c/05.webp", "./illu/c/06.webp", "./illu/c/07.webp", "./illu/c/08.webp", "./illu/c/09.webp", "./illu/c/10.webp", "./illu/c/11.webp", "./illu/c/12.webp", "./illu/c/13.webp", "./illu/c/14.webp", "./illu/c/15.webp", "./illu/c/16.webp", "./illu/c/17.webp", "./illu/c/18.webp", "./illu/c/19.webp", "./illu/c/20.webp", "./illu/c/21.webp", "./illu/c/22.webp", "./illu/c/23.webp", "./illu/c/24.webp", "./illu/c/25.webp", "./illu/c/26.webp", "./illu/c/27.webp", "./illu/c/28.webp", "./illu/c/29.webp", "./illu/c/30.webp", "./illu/c/31.webp", "./illu/c/32.webp", "./illu/c/33.webp", "./illu/c/34.webp", "./illu/c/35.webp", "./illu/c/36.webp", "./illu/c/37.webp", "./illu/c/38.webp", "./illu/c/39.webp", "./illu/c/40.webp", "./illu/c/41.webp", "./illu/c/42.webp", "./illu/c/43.webp", "./illu/c/44.webp", "./illu/c/45.webp", "./illu/c/46.webp", "./illu/c/47.webp", "./illu/c/48.webp", "./illu/c/49.webp", "./illu/c/50.webp", "./illu/c/51.webp", "./illu/c/52.webp", "./illu/c/53.webp", "./illu/c/54.webp", "./illu/c/55.webp", "./illu/c/56.webp", "./illu/c/57.webp", "./illu/c/58.webp", "./illu/c/59.webp", "./illu/c/60.webp", "./illu/g/01.webp", "./illu/g/02.webp", "./illu/g/03.webp", "./illu/g/04.webp", "./illu/g/05.webp", "./illu/g/06.webp", "./illu/g/07.webp", "./illu/g/08.webp", "./illu/g/09.webp", "./illu/g/10.webp", "./illu/g/11.webp", "./illu/g/12.webp", "./illu/g/13.webp", "./illu/g/14.webp", "./illu/g/15.webp", "./illu/g/16.webp", "./illu/g/17.webp", "./illu/g/18.webp", "./illu/g/19.webp", "./illu/g/20.webp", "./illu/g/21.webp", "./illu/g/22.webp", "./illu/g/23.webp", "./illu/g/24.webp", "./illu/g/25.webp", "./illu/g/26.webp", "./illu/g/27.webp", "./illu/g/28.webp", "./illu/g/29.webp", "./illu/g/30.webp", "./illu/g/31.webp", "./illu/g/32.webp", "./illu/g/33.webp", "./illu/g/34.webp", "./illu/g/35.webp", "./illu/g/36.webp", "./illu/g/37.webp", "./illu/g/38.webp", "./illu/g/39.webp", "./illu/g/40.webp", "./illu/g/41.webp", "./illu/g/42.webp", "./illu/g/43.webp", "./illu/g/44.webp", "./illu/g/45.webp", "./illu/g/46.webp", "./illu/g/47.webp", "./illu/g/48.webp", "./illu/g/49.webp", "./illu/g/50.webp", "./illu/g/51.webp", "./illu/g/52.webp", "./illu/g/53.webp", "./illu/g/54.webp", "./illu/g/55.webp", "./illu/g/56.webp", "./illu/g/57.webp", "./illu/g/58.webp", "./illu/g/59.webp", "./illu/g/60.webp"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
function isFont(u){return u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com';}
self.addEventListener('fetch',e=>{
  const req=e.request; if(req.method!=='GET')return;
  const u=new URL(req.url);
  const same=u.origin===self.location.origin;
  if(!same&&!isFont(u))return; // 프린터(192.168.x.x) 등 다른 주소는 건드리지 않음
  e.respondWith(caches.open(CACHE).then(async c=>{
    const key=(same&&req.mode==='navigate')?'./index.html':req;
    const hit=await c.match(key,{ignoreSearch:same});
    const net=fetch(req).then(r=>{if(r&&(r.ok||r.type==='opaque'))c.put(key,r.clone());return r;}).catch(()=>null);
    if(hit){e.waitUntil(net);return hit;}
    const r=await net; return r||new Response('오프라인이에요',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
  }));
});
