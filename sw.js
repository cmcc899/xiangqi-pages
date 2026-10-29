const CACHE='xiangqi-mvtmb2uz';
const PRECACHE=['./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(PRECACHE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>e.respondWith(
  caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{if(resp&&resp.ok){const cl=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,cl));}return resp;})).then(resp=>{
    if(!resp||resp.status===0) return resp;
    const h=new Headers(resp.headers);
    h.set('Cross-Origin-Embedder-Policy','require-corp');
    h.set('Cross-Origin-Resource-Policy','cross-origin');
    h.set('Cross-Origin-Opener-Policy','same-origin');
    return new Response(resp.body,{status:resp.status,statusText:resp.statusText,headers:h});
  })
));
