/* DeryCode subscribe forms — talks to the newsletterSubscribe backend function.
   One shared file so 100+ pages stay consistent. */
(function () {
  'use strict';

  var ENDPOINT = 'https://superagent-45013b11.base44.app/functions/newsletterSubscribe';
  var WHATSAPP = 'https://wa.me/256762306675?text=' + encodeURIComponent("Hi DeryCode, I'd like to subscribe to the newsletter.");

  var SB = {
    url: 'https://hejyndudxtinigbvzolj.supabase.co',
    key: 'sb_publishable_AqC-q3-23JiE6VyyCGvNCA_FZ1ZmAd_'
  };

  /* the list we own: written alongside the legacy endpoint so nothing is stranded */
  function storeSubscriber(email, source) {
    return fetch(SB.url + '/rest/v1/subscribers', {
      method: 'POST',
      headers: {
        'apikey': SB.key,
        'Authorization': 'Bearer ' + SB.key,
        'Content-Type': 'application/json',
        'Content-Profile': 'dery',
        'Prefer': 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify({ email: email, source: source, page: location.pathname })
    }).catch(function () {});
  }

  /* a quiet ask at the end of an article, and a bar once someone is clearly reading */
  function promptStyles() {
    if (document.getElementById('dc-sub-style')) return;
    var st = document.createElement('style');
    st.id = 'dc-sub-style';
    st.textContent = [
      '.dc-sub-card{max-width:720px;margin:38px auto 0;padding:22px 22px 20px;border:1px solid #22304a;',
      'border-radius:16px;background:linear-gradient(160deg,#0d1424,#111a2c);color:#E6EDF7;font-family:inherit}',
      '.dc-sub-card h3{margin:0 0 6px;font-size:1.12rem;color:#fff}',
      '.dc-sub-card p{margin:0 0 14px;font-size:.94rem;color:#9FB4D8;line-height:1.5}',
      '.dc-sub-card form{display:flex;gap:8px;flex-wrap:wrap}',
      '.dc-sub-card input{flex:1 1 220px;min-width:180px;padding:11px 12px;border-radius:10px;border:1px solid #24304a;background:#070B14;color:#E6EDF7}',
      '.dc-sub-card button{padding:11px 18px;border-radius:10px;border:0;background:#4F7CFF;color:#fff;font-weight:600;cursor:pointer}',
      '.dc-sub-card .subscribe-note{margin:10px 0 0;font-size:.86rem}',
      '.dc-sub-card .subscribe-note.is-ok{color:#43E97B}.dc-sub-card .subscribe-note.is-error{color:#FF8A8A}',
      '#dc-sub-bar{position:fixed;left:12px;right:12px;bottom:12px;z-index:9998;max-width:640px;margin:0 auto;',
      'padding:14px 16px;border-radius:14px;border:1px solid #22304a;background:#0b1220;color:#E6EDF7;',
      'box-shadow:0 14px 40px rgba(0,0,0,.45);display:flex;gap:12px;align-items:center;flex-wrap:wrap;font-family:inherit}',
      '#dc-sub-bar p{margin:0;flex:1 1 200px;font-size:.9rem;line-height:1.45;color:#c9d8f0}',
      '#dc-sub-bar a.dc-go{padding:9px 14px;border-radius:9px;background:#4F7CFF;color:#fff;font-weight:600;text-decoration:none;font-size:.86rem}',
      '#dc-sub-bar button.dc-x{background:none;border:0;color:#7f93b5;font-size:1.1rem;cursor:pointer;line-height:1}'
    ].join('');
    document.head.appendChild(st);
  }

  function articleCard() {
    if (!/\/blog\/[^/]+\.html$/.test(location.pathname)) return;
    if (document.getElementById('dc-sub-card')) return;
    var host = document.querySelector('article, .article, main') || document.body;
    var card = document.createElement('div');
    card.id = 'dc-sub-card';
    card.className = 'dc-sub-card';
    card.innerHTML = '<h3>Get the next guide by email</h3>' +
      '<p>One short email when we publish something new for Ugandan businesses, schools and SACCOs. No noise.</p>' +
      '<form class="newsletter-form" data-subscribe data-source="article-end" aria-label="Subscribe by email">' +
      '<input type="email" name="email" placeholder="you@example.com" autocomplete="email" required>' +
      '<input type="text" name="company" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px">' +
      '<button type="submit">Subscribe</button></form>';
    host.appendChild(card);
    bind(card.querySelector('form'));
  }

  function scrollBar() {
    if (sessionStorage.getItem('dc-sub-hidden') === '1') return;
    if (document.querySelector('#dc-sub-bar')) return;
    var seen = false;
    function maybe() {
      if (seen) return;
      var h = document.documentElement;
      var pct = (h.scrollTop + window.innerHeight) / h.scrollHeight;
      if (pct < 0.45) return;
      seen = true;
      window.removeEventListener('scroll', maybe);
      var bar = document.createElement('div');
      bar.id = 'dc-sub-bar';
      bar.setAttribute('role', 'complementary');
      bar.innerHTML = '<p>Want new guides and offers by email? We send one when something useful ships.</p>' +
        '<a class="dc-go" href="#dc-sub-scroll">Subscribe</a>' +
        '<button class="dc-x" type="button" aria-label="Dismiss">×</button>';
      document.body.appendChild(bar);
      bar.querySelector('.dc-x').addEventListener('click', function () {
        bar.remove(); sessionStorage.setItem('dc-sub-hidden', '1');
      });
      bar.querySelector('.dc-go').addEventListener('click', function (ev) {
        ev.preventDefault();
        var target = document.querySelector('.newsletter-form input[type="email"]') ||
                     document.querySelector('form[data-subscribe] input[type="email"]');
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          bar.remove(); sessionStorage.setItem('dc-sub-hidden', '1');
        }
      });
    }
    window.addEventListener('scroll', maybe, { passive: true });
    maybe();
  }

  function setState(form, state, message) {
    var btn = form.querySelector('button[type="submit"], button');
    var note = form.querySelector('.subscribe-note');
    form.dataset.state = state;
    if (!note) {
      note = document.createElement('p');
      note.className = 'subscribe-note';
      note.setAttribute('role', 'status');
      note.setAttribute('aria-live', 'polite');
      form.appendChild(note);
    }
    if (state === 'sending') {
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      note.textContent = '';
      note.hidden = true;
    } else if (state === 'done') {
      if (btn) { btn.disabled = false; btn.textContent = '✓ Subscribed'; btn.classList.add('is-done'); }
      note.hidden = false;
      note.textContent = message || "You're on the list. Watch your inbox.";
      note.className = 'subscribe-note is-ok';
    } else if (state === 'error') {
      if (btn) { btn.disabled = false; btn.textContent = 'Subscribe'; btn.classList.remove('is-done'); }
      note.hidden = false;
      note.className = 'subscribe-note is-error';
      note.textContent = message || 'That did not go through.';
      if (!note.querySelector('a')) {
        var a = document.createElement('a');
        a.href = WHATSAPP;
        a.textContent = ' Try WhatsApp instead';
        note.appendChild(a);
      }
    } else {
      if (btn) { btn.disabled = false; btn.textContent = 'Subscribe'; btn.classList.remove('is-done'); }
      note.hidden = true;
      note.textContent = '';
    }
  }

  function validEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(String(value || '').trim());
  }

  function sourceFor(form) {
    var explicit = form.getAttribute('data-source');
    if (explicit) return explicit;
    var path = location.pathname.replace(/\/$/, '') || '/';
    return 'site' + path;
  }

  function bind(form) {
    if (form.dataset.subscribeBound === '1') return;
    form.dataset.subscribeBound = '1';
    form.setAttribute('novalidate', 'novalidate');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (form.dataset.state === 'sending') return;

      var input = form.querySelector('input[type="email"]');
      var trap = form.querySelector('input[name="company"]');
      var email = (input && input.value || '').trim();

      // bots fill the hidden field; pretend all is well and drop it
      if (trap && trap.value) {
        setState(form, 'done');
        if (input) input.value = '';
        return;
      }

      if (!validEmail(email)) {
        setState(form, 'error', 'Please enter a valid email address.');
        if (input) input.focus();
        return;
      }

      setState(form, 'sending');
      storeSubscriber(email, sourceFor(form));

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, source: sourceFor(form) })
      })
        .then(function (res) {
          return res.json().then(function (data) { return { status: res.status, data: data }; });
        })
        .then(function (out) {
          if (out.data && out.data.ok) {
            setState(form, 'done', out.data.duplicate
              ? 'You were already on the list. Nothing else to do.'
              : "You're on the list. Watch your inbox.");
            if (input) input.value = '';
            form.dispatchEvent(new CustomEvent('subscribed', { detail: out.data }));
          } else {
            setState(form, 'error', (out.data && out.data.error) || 'That did not go through.');
          }
        })
        .catch(function () {
          setState(form, 'error', 'Network problem, nothing was sent.');
        });
    });

    var input = form.querySelector('input[type="email"]');
    if (input) input.addEventListener('input', function () {
      if (form.dataset.state === 'error') setState(form, 'idle');
    });
  }

  function init() {
    var forms = document.querySelectorAll('form.newsletter-form, form[data-subscribe]');
    for (var i = 0; i < forms.length; i++) bind(forms[i]);
    promptStyles();
    articleCard();
    scrollBar();
    var late = document.querySelectorAll('form[data-subscribe]:not([data-subscribe-bound])');
    for (var j = 0; j < late.length; j++) bind(late[j]);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
