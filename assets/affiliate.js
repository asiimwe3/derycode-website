/* DeryCode affiliate referral capture — safe to include on every DeryCode property.
 * Adds: window.DeryRef (the referral code), 90-day attribution, one click per session.
 */
(function () {
  var API = 'https://superagent-c4c23880.base44.app/functions/affiliateTrack';
  var KEY = 'dery_ref';
  var DAYS = 90;

  function readStore() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (!o || !o.code) return null;
      if (Date.now() - o.ts > DAYS * 864e5) { localStorage.removeItem(KEY); return null; }
      return o;
    } catch (e) { return null; }
  }

  function save(code) {
    try { localStorage.setItem(KEY, JSON.stringify({ code: code, ts: Date.now() })); } catch (e) {}
  }

  function fromUrl() {
    try {
      var p = new URLSearchParams(location.search);
      var code = (p.get('ref') || p.get('aff') || '').trim().toUpperCase();
      return /^[A-Z0-9]{4,16}$/.test(code) ? code : null;
    } catch (e) { return null; }
  }

  var fresh = fromUrl();
  if (fresh) save(fresh);
  var stored = readStore();
  var code = stored ? stored.code : null;
  window.DeryRef = code || null;

  if (window.DeryRef) {
    // let forms and apps attached to this page pick the code up
    document.querySelectorAll('input[name="ref"], input[name="referral"], input[name="referralCode"]').forEach(function (el) {
      if (!el.value) el.value = window.DeryRef;
    });
  }

  // record the click once per browser session
  if (code) {
    var sentKey = 'dery_ref_sent_' + code;
    var already = false;
    try { already = sessionStorage.getItem(sentKey) === '1'; } catch (e) {}
    if (!already) {
      var payload = JSON.stringify({
        code: code,
        product: window.DERY_PRODUCT || location.hostname,
        page: location.pathname,
        referrer: document.referrer || '',
        visitor: (function () {
          var v = null;
          try { v = localStorage.getItem('dery_visitor'); } catch (e) {}
          if (!v) { v = 'v' + Math.random().toString(36).slice(2, 11); try { localStorage.setItem('dery_visitor', v); } catch (e) {} }
          return v;
        })()
      });
      try { sessionStorage.setItem(sentKey, '1'); } catch (e) {}
      if (navigator.sendBeacon) {
        try { navigator.sendBeacon(API, new Blob([payload], { type: 'application/json' })); }
        catch (e) { fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(function () {}); }
      } else {
        fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: payload, keepalive: true }).catch(function () {});
      }
    }
  }
})();
