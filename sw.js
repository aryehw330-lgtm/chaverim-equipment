// COBC Equipment PWA — Service Worker v1
// Handles scheduled push notifications for shift reminders

var _scheduled = {}; // id → timeoutId

self.addEventListener('install', function() { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(self.clients.claim()); });

self.addEventListener('message', function(event) {
  var msg = event.data;
  if (!msg || !msg.type) return;

  if (msg.type === 'SCHEDULE') {
    var d = msg.data;
    if (_scheduled[d.id]) clearTimeout(_scheduled[d.id]);
    if (d.delayMs > 0) {
      _scheduled[d.id] = setTimeout(function() {
        delete _scheduled[d.id];
        self.registration.showNotification(d.title, {
          body: d.body,
          icon: './icon-192.png',
          badge: './icon-192.png',
          tag: d.tag || d.id,
          requireInteraction: true,
          data: { page: d.page }
        });
      }, d.delayMs);
    }
  } else if (msg.type === 'CANCEL') {
    if (_scheduled[msg.id]) { clearTimeout(_scheduled[msg.id]); delete _scheduled[msg.id]; }
  } else if (msg.type === 'SHOW') {
    var d = msg.data;
    self.registration.showNotification(d.title, {
      body: d.body,
      icon: '/icon-192.png',
      badge: '/icon-192.png',
      tag: d.tag || 'cobc',
      requireInteraction: !!d.requireInteraction,
      data: { page: d.page }
    });
  }
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  var page = (event.notification.data || {}).page || '';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (var i = 0; i < clientList.length; i++) {
        if (clientList[i].url && 'focus' in clientList[i]) {
          clientList[i].focus();
          clientList[i].postMessage({ type: 'NOTIF_CLICK', page: page });
          return;
        }
      }
      return self.clients.openWindow('index.html' + (page ? '?page=' + page : ''));
    })
  );
});
