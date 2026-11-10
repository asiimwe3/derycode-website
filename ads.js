/* DeryCode ads loader
   One file shared by every site. It only does something on a domain that has a
   Monetag zone configured below, so nothing loads (and no cookies are set) on the
   sites that are not monetised yet.

   To switch a site on: paste its zone id from the Monetag dashboard next to the
   domain. Format per Monetag: data-zone is the number, data-sdk is "show_<zone>". */
(function () {
  'use strict';

  var ZONES = {
    'derycode.online': 308339,
    'bagulegacyhomes.online': 308339,
    'reliemotel.com': 308339,
    'steadycompanyltd.com': 308339,
    'nuwerugabamachinary.com': 308339,
    'brazilplumbingcenter.online': 308339,
    'petersmedicare.online': 308339,
    'tooro-music.vercel.app': 308339,
    'sageco-evergreen.vercel.app': 308339,
    'derycare.vercel.app': 308339,
    'deryaccount.vercel.app': 308339,
    'yezu-amala-motel.vercel.app': 308339,
    'gomery.vercel.app': 308339
  };

  var host = location.hostname.replace(/^www\./, '');
  var zone = ZONES[host];
  if (!zone) return;

  // respect a visitor who asked not to be tracked, and skip the private app pages
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
  if (/\/(admin|login|register|account|pricing|checkout|order)(\.html)?$/i.test(location.pathname)) return;

  var s = document.createElement('script');
  s.src = 'https://quge5.com/88/tag.min.js';
  s.setAttribute('data-zone', String(zone));
  s.setAttribute('data-cfasync', 'false');
  s.async = true;
  document.head.appendChild(s);
})();
