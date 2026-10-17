/* DeryCode cookie consent — lightweight, GDPR-style, no external services */
(function () {
  var KEY = "derycode-cookie-consent";
  function setCookie(name, value, days) {
    var d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + "=" + value + ";expires=" + d.toUTCString() + ";path=/;SameSite=Lax";
  }
  function getCookie(name) {
    var m = document.cookie.match("(^|;)\\s*" + name + "\\s*=\\s*([^;]+)");
    return m ? m.pop() : null;
  }
  // already consented? just record analytics-safe state silently
  if (getCookie("derycode-consent")) return;

  var wrap = document.createElement("div");
  wrap.id = "dc-cookie-banner";
  wrap.style.cssText = "position:fixed;bottom:0;left:0;right:0;z-index:99999;font-family:'Inter',system-ui,-apple-system,sans-serif;padding:14px 16px calc(14px + env(safe-area-inset-bottom));background:rgba(10,12,18,.96);backdrop-filter:blur(8px);border-top:1px solid rgba(0,212,255,.25);color:#e8ecf4;";
  wrap.innerHTML =
    '<div style="max-width:1080px;margin:0 auto;display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:space-between;">' +
      '<div style="flex:1;min-width:240px;font-size:13.5px;line-height:1.5;">' +
        '🍪 We use cookies to improve your experience and analyse site traffic. ' +
        'See our <a href="/cookies.html" style="color:#00D4FF;text-decoration:underline;">Cookie Policy</a>.' +
      '</div>' +
      '<div style="display:flex;gap:8px;">' +
        '<button id="dc-cookie-accept" style="cursor:pointer;border:0;border-radius:8px;padding:9px 18px;font-size:13px;font-weight:600;background:#0A84FF;color:#fff;">Accept all</button>' +
        '<button id="dc-cookie-essential" style="cursor:pointer;border:1px solid rgba(255,255,255,.25);border-radius:8px;padding:9px 18px;font-size:13px;font-weight:600;background:transparent;color:#e8ecf4;">Essential only</button>' +
      '</div>' +
    '</div>';

  function close(choice) {
    setCookie("derycode-consent", choice, 180);
    try { localStorage.setItem(KEY, choice); } catch (e) {}
    wrap.style.transition = "opacity .3s";
    wrap.style.opacity = "0";
    setTimeout(function () { wrap.remove(); }, 300);
  }
  wrap.querySelector("#dc-cookie-accept").addEventListener("click", function () { close("all"); });
  wrap.querySelector("#dc-cookie-essential").addEventListener("click", function () { close("essential"); });

  document.addEventListener("DOMContentLoaded", function () {
    document.body.appendChild(wrap);
  });
})();
