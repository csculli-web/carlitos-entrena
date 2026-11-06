const CACHE="carlitos-entrena-v24";
const CORE=["./","./manifest.webmanifest","./icon-192.png?v=20","./icon-512.png?v=20"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;if(e.request.mode==="navigate"){e.respondWith(fetch(e.request,{cache:"no-store"}).then(r=>{const c=r.clone();caches.open(CACHE).then(x=>x.put("./",c));return r}).catch(()=>caches.match("./")));return}e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)))});
