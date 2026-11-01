// 다행 키오스크 오프라인 캐시 — 한 번 인터넷으로 열면 그 뒤로는 인터넷 없이 열려요
const CACHE='dahaeng-v2';
const PRECACHE=["./", "./index.html", "./epos-2.27.0.js", "./illu/c/01.webp", "./illu/c/02.webp", "./illu/c/03.webp", "./illu/c/04.webp", "./illu/c/05.webp", "./illu/c/06.webp", "./illu/c/07.webp", "./illu/c/08.webp", "./illu/c/09.webp", "./illu/c/10.webp", "./illu/c/11.webp", "./illu/c/12.webp", "./illu/c/13.webp", "./illu/c/14.webp", "./illu/c/15.webp", "./illu/c/16.webp", "./illu/c/17.webp", "./illu/c/18.webp", "./illu/c/19.webp", "./illu/c/20.webp", "./illu/c/21.webp", "./illu/c/22.webp", "./illu/c/23.webp", "./illu/c/24.webp", "./illu/c/25.webp", "./illu/c/26.webp", "./illu/c/27.webp", "./illu/c/28.webp", "./illu/c/29.webp", "./illu/c/30.webp", "./illu/c/31.webp", "./illu/c/32.webp", "./illu/c/33.webp", "./illu/c/34.webp", "./illu/c/35.webp", "./illu/c/36.webp", "./illu/c/37.webp", "./illu/c/38.webp", "./illu/c/39.webp", "./illu/c/40.webp", "./illu/c/41.webp", "./illu/c/42.webp", "./illu/c/43.webp", "./illu/c/44.webp", "./illu/c/45.webp", "./illu/c/46.webp", "./illu/c/47.webp", "./illu/c/48.webp", "./illu/c/49.webp", "./illu/c/50.webp", "./illu/c/51.webp", "./illu/c/52.webp", "./illu/c/53.webp", "./illu/c/54.webp", "./illu/c/55.webp", "./illu/c/56.webp", "./illu/c/57.webp", "./illu/c/58.webp", "./illu/c/59.webp", "./illu/c/60.webp", "./g/01.webp", "./g/02.webp", "./g/03.webp", "./g/04.webp", "./g/05.webp", "./g/06.webp", "./g/07.webp", "./g/08.webp", "./g/09.webp", "./g/10.webp", "./g/11.webp", "./g/12.webp", "./g/13.webp", "./g/14.webp", "./g/15.webp", "./g/16.webp", "./g/17.webp", "./g/18.webp", "./g/19.webp", "./g/20.webp", "./g/21.webp", "./g/22.webp", "./g/23.webp", "./g/24.webp", "./g/25.webp", "./g/26.webp", "./g/27.webp", "./g/28.webp", "./g/29.webp", "./g/30.webp", "./g/31.webp", "./g/32.webp", "./g/33.webp", "./g/34.webp", "./g/35.webp", "./g/36.webp", "./g/37.webp", "./g/38.webp", "./g/39.webp", "./g/40.webp", "./g/41.webp", "./g/42.webp", "./g/43.webp", "./g/44.webp", "./g/45.webp", "./g/46.webp", "./g/47.webp", "./g/48.webp", "./g/49.webp", "./g/50.webp", "./g/51.webp", "./g/52.webp", "./g/53.webp", "./g/54.webp", "./g/55.webp", "./g/56.webp", "./g/57.webp", "./g/58.webp", "./g/59.webp", "./g/60.webp"];
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
