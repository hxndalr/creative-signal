/* Install + offline support. Only active when the app is served over http(s) - opening
   index.html straight from a folder (file://) keeps working exactly as before, just without install. */
(function () {
  const ua = navigator.userAgent;
  const PWA = window.PWA = {
    served: /^https?:$/.test(location.protocol),
    installed: matchMedia('(display-mode: standalone)').matches || navigator.standalone === true,
    isIOS: /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
    isFirefox: /Firefox\//.test(ua),
    canPrompt: false,
    prompt() {
      if (!deferred) return Promise.resolve(false);
      const d = deferred; deferred = null; PWA.canPrompt = false;
      d.prompt();
      return d.userChoice.then(c => c.outcome === 'accepted');
    }
  };
  let deferred = null;

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferred = e; PWA.canPrompt = true;
    document.dispatchEvent(new CustomEvent('pwa-change'));
  });
  window.addEventListener('appinstalled', () => {
    PWA.installed = true; PWA.canPrompt = false; deferred = null;
    document.dispatchEvent(new CustomEvent('pwa-change'));
  });

  if (!PWA.served || !('serviceWorker' in navigator)) return;

  // Ask the browser not to clear this app's storage under pressure. Firefox would show a prompt, so skip it there.
  if (navigator.storage && navigator.storage.persist && !PWA.isFirefox) navigator.storage.persist().catch(() => {});

  let reloading = false;
  function offerUpdate(worker) {
    if (document.getElementById('pwa-update')) return;
    const t = document.createElement('div');
    t.className = 'toast toast--update'; t.id = 'pwa-update';
    t.innerHTML = '<strong>Update ready</strong>A new version of the course is downloaded. Your progress is kept. ' +
      '<span class="row"><button type="button" class="btn btn--sm btn--primary">Reload to update</button><button type="button" class="btn btn--sm btn--ghost">Later</button></span>';
    const [now, later] = t.querySelectorAll('button');
    now.addEventListener('click', () => { reloading = true; worker.postMessage('skip-waiting'); });
    later.addEventListener('click', () => t.remove());
    (document.getElementById('toasts') || document.body).appendChild(t);
  }

  navigator.serviceWorker.addEventListener('controllerchange', () => { if (reloading) location.reload(); });

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').then(reg => {
      if (reg.waiting && navigator.serviceWorker.controller) offerUpdate(reg.waiting);
      reg.addEventListener('updatefound', () => {
        const w = reg.installing;
        w.addEventListener('statechange', () => {
          if (w.state === 'installed' && navigator.serviceWorker.controller) offerUpdate(w);
        });
      });
      setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
    }).catch(() => { /* offline support unavailable; the app still works online */ });
  });
})();
