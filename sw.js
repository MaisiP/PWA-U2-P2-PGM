//console.log("Hola mundo SW")
const CACHE_NAME = 'cache-v1'

const CACHE_STATIC_NAME = 'static-v1'
const DYMAMIC_CACHE_NAME = 'dynamic-v1'
const CACHE_INMUTABLE_NAME = 'inmutable-v1'

function cleanCache(cacheName,sizeItems) {
    caches.open(cacheName)
        .then(cache =>{
            cache.keys().then(keys =>{
                console.log(keys)
                if (keys.length >= sizeItems) {
                    cache.delete(keys[0].then(()=>{
                        cleanCache(cacheName,sizeItems)
                    }))
                }
            })
            
        })
}

self.addEventListener('install',(event)=>{
    console.log('SW: Instalado')

    const promesaCache = caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll([
                '/PWA-U2-P2-PGM/',
                '/PWA-U2-P2-PGM/index.html',
                '/PWA-U2-P2-PGM/css/page.css',
                '/PWA-U2-P2-PGM/js/app.js'
            ])
        })

    const promInmutable = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => {
            return cache.addAll([
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css',
                'https://code.jquery.com/jquery-3.5.1.min.js',
                'https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js'
            ])
        })
    event.waitUntil(Promise.all([promesaCache,promInmutable]))

})

self.addEventListener('activate',(event)=>{
    console.log('SW: Activado y controlando la app')
})

self.addEventListener('fetch',(event)=>{
    const respuestaCache = caches.match(event.request)
        .then(resp =>{
            if (resp) {
                return resp
            }
            console.log("No esta en caché ",event.request.url);

            return fetch(event.request)
                .then(respNet => {
                    caches.open(DYMAMIC_CACHE_NAME)
                        .then(cache =>{
                            cache.put(event.request,respNet).then(ok =>{
                                cleanCache(DYMAMIC_CACHE_NAME,10)
                            })
                            
                        })
                    return respNet.clone()
                })
        })
    event.respondWith(respuestaCache)
})

self.addEventListener()