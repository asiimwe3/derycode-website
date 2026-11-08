/* DeryCode lead capture
   Every enquiry, order request and partner application is written to the
   DeryCode database so nothing is lost, then the visitor is told what happens next. */
(function () {
  'use strict';

  var CFG = {
    url: 'https://hejyndudxtinigbvzolj.supabase.co',
    key: 'sb_publishable_AqC-q3-23JiE6VyyCGvNCA_FZ1ZmAd_',
    schema: 'dery',
    mail: 'derycode50@gmail.com',
    whatsapp: '256762306675'
  };

  function post(path, body) {
    return fetch(CFG.url + '/rest/v1/' + path, {
      method: 'POST',
      headers: {
        'apikey': CFG.key,
        'Authorization': 'Bearer ' + CFG.key,
        'Content-Type': 'application/json',
        'Content-Profile': CFG.schema,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(body)
    });
  }

  /* best-effort email copy: the database is the record, this is the doorbell */
  function emailCopy(row) {
    return fetch('https://formsubmit.co/ajax/' + CFG.mail, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: 'Website ' + (row.topic || 'enquiry') + ' from ' + (row.name || 'a visitor'),
        _template: 'table',
        _captcha: 'false',
        Name: row.name || '-',
        Phone: row.phone || '-',
        Email: row.email || '-',
        Company: row.company || '-',
        Topic: row.topic || '-',
        Budget: row.budget || '-',
        Message: row.message || '-',
        Page: row.page,
        Source: row.source
      })
    }).catch(function () {});
  }

  /* send one lead; resolves true when the row is safely stored */
  function send(payload) {
    var row = {
      name: payload.name || null,
      email: payload.email || null,
      phone: payload.phone || null,
      company: payload.company || null,
      topic: payload.topic || null,
      budget: payload.budget || null,
      message: payload.message || null,
      source: payload.source || 'website',
      page: location.pathname + location.search,
      raw: payload.raw || null
    };
    emailCopy(row);
    return post('leads', row).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return true;
    });
  }

  function whatsappLink(text) {
    return 'https://wa.me/' + CFG.whatsapp + '?text=' + encodeURIComponent(text);
  }

  function fields(form) {
    var out = {};
    var data = new FormData(form);
    data.forEach(function (v, k) { out[k] = typeof v === 'string' ? v.trim() : v; });
    return out;
  }

  function statusNode(form) {
    var node = form.querySelector('[data-lead-status]');
    if (!node) {
      node = document.createElement('p');
      node.setAttribute('data-lead-status', '');
      node.style.cssText = 'margin:.75rem 0 0;font-size:.92rem;line-height:1.5';
      form.appendChild(node);
    }
    return node;
  }

  function bind(form) {
    if (form.dataset.leadBound === '1') return;
    form.dataset.leadBound = '1';
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var btn = form.querySelector('[type="submit"]');
      var original = btn ? btn.innerHTML : '';
      var payload = fields(form);
      payload.source = form.dataset.leadSource || form.dataset.source || 'website';
      payload.topic = payload.topic || form.dataset.leadTopic || form.id || 'website enquiry';

      var note = statusNode(form);
      note.style.color = '#9FB4D8';
      note.textContent = 'Sending…';
      if (btn) { btn.disabled = true; }

      send(payload).then(function () {
        note.style.color = '#43E97B';
        note.innerHTML = 'Received. We reply within one working day. Need it faster? ' +
          '<a href="' + whatsappLink('Hi DeryCode, I just sent a request through your website: ' + (payload.topic || '')) +
          '" target="_blank" rel="noopener" style="color:#4F7CFF">Message us on WhatsApp</a>.';
        form.reset();
        if (btn) { btn.innerHTML = 'Sent'; }
        setTimeout(function () { if (btn) { btn.innerHTML = original; btn.disabled = false; } }, 4000);
        if (window.dcp && dcp.track) { try { dcp.track('lead_submitted', { form: payload.source }); } catch (e) {} }
        form.dispatchEvent(new CustomEvent('lead:sent', { detail: payload }));
      }).catch(function () {
        note.style.color = '#FF6B6B';
        note.innerHTML = 'That did not go through. Please ' +
          '<a href="' + whatsappLink('Hi DeryCode, I tried your website form: ' + (payload.topic || '')) +
          '" target="_blank" rel="noopener" style="color:#4F7CFF">send it on WhatsApp</a> so it is not lost.';
        if (btn) { btn.innerHTML = original; btn.disabled = false; }
      });
    });
  }

  function init() {
    var forms = document.querySelectorAll('form[data-lead-form]');
    for (var i = 0; i < forms.length; i++) bind(forms[i]);
  }

  window.DCLead = { send: send, whatsapp: whatsappLink };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
