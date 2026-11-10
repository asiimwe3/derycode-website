/* DeryCode ads loader
   One file shared by every site. It only does something on a domain that has a
   Monetag zone configured below, so nothing loads (and no cookies are set) on the
   sites that are not monetised yet.

   To switch a site on: paste its zone id from the Monetag dashboard next to the
   domain. Format per Monetag: data-zone is the number, data-sdk is "show_<zone>". */
(function () {
  'use strict';

  var ZONES = {
    'derycode.online': null,
    'reliemotel.com': null,
    'nuwerugabamachinary.com': null,
    'brazilplumbingcenter.online': null,
    'petersmedicare.online': null,
    'sageco-evergreen.vercel.app': null,
    'school-sync-manager.vercel.app': null,
    'derycode-search-c.vercel.app': null,
    'tooro-music.vercel.app': null,
    'elite-members-six.vercel.app': null,
    'western-youth-tech-foundation.vercel.app': null
  };

  var host = location.hostname.replace(/^www\./, '');
  var zone = ZONES[host];
  if (!zone) return;

  // respect a visitor who asked not to be tracked, and skip the private app pages
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;
  if (/\/(admin|login|register|account|pricing|checkout|order)(\.html)?$/i.test(location.pathname)) return;

  var s = document.createElement('script');
  s.src = '//libtl.com/sdk.js';
  s.setAttribute('data-zone', String(zone));
  s.setAttribute('data-sdk', 'show_' + zone);
  s.async = true;
  document.head.appendChild(s);
})();
