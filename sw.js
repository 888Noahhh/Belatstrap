self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  if (url.startsWith('https://github.com/888Noahhh/Belatstrap/releases/download/Belatstrap/Belatstrap.exe')) {
    event.respondWith(relayDownload(event.request));
  }
});

async function relayDownload(request) {
  try {
    const response = await fetch(request.url, { mode: 'no-cors', redirect: 'follow' });
    if (!response.body) return fetch(request);
    const { readable, writable } = new TransformStream();
    const reader = response.body.getReader();
    const writer = writable.getWriter();
    (async () => {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          await writer.write(value);
        }
        await writer.close();
      } catch (err) {
        try { await writer.abort(err); } catch (_) {}
      }
    })();
    return new Response(readable, {
      status: 200,
      headers: { 'Content-Type': 'application/octet-stream' },
    });
  } catch (err) {
    return fetch(request);
  }
}
