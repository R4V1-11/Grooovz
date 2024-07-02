const CACHE_NAME = 'Groooovz-cache';

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Return the cached response if it exists
        return cachedResponse;
      }

      // Otherwise, fetch the resource from the network
      return fetch(event.request).then(networkResponse => {
        // Check if the request method is GET
        if (event.request.method === 'GET') {
          // Cache the response only for GET requests
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        } else {
          // If it's not a GET request, just return the network response without caching
          return networkResponse;
        }
      });
    })
  );
});

