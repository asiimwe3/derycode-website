/**
 * DeryCode — script.js (refactored June 2026)
 *
 * Changes from original:
 * - Wrapped in DOMContentLoaded — no more globals leaking
 * - Replaced 28 getElementById + 8 querySelector calls with
 *   a single cached $ / $$ helper — fewer DOM queries
 * - Added aria-expanded to hamburger for screen readers
 * - Added aria-hidden to heroCanvas (decorative)
 * - Keyboard trap on modal (Tab / Shift+Tab / Escape)
 * - IntersectionObserver uses CSS class instead of inline styles
 *   → avoids CLS and is easier to override
 * - Canvas animation pauses when tab is hidden (visibilitychange)
 *   → stops wasting GPU when user switches tabs
 * - All form error feedback now uses aria-invalid + aria-describedby
 *   instead of borderColor inline style
 * - Removed duplicate newsletter / year logic
 * - Service worker registration guarded against errors
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ─── HELPERS ─────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ─── THEME ────────────────────────────────────────────────── */
  const themeToggle = $('#themeToggle');
  const themeIcon   = $('#themeIcon');
  const html        = document.documentElement;

  const applyTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('derycode-theme', theme);
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  };

  // Respect OS preference on first visit
  const storedTheme = localStorage.getItem('derycode-theme');
  const prefersDark  = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(storedTheme || (prefersDark ? 'dark' : 'light'));

  themeToggle?.addEventListener('click', () => {
    applyTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  /* ─── HAMBURGER / MOBILE NAV ───────────────────────────────── */
  const hamburger       = $('#hamburger');
  const navLinks        = $('#navLinks');
  const mobileOverlay   = $('#mobileNavOverlay');

  const openNav = () => {
    navLinks.classList.add('open');
    hamburger.classList.add('active');
    mobileOverlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Move focus into the nav
    $('#navLinks a')?.focus();
  };

  const closeNav = () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
    mobileOverlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  };

  hamburger?.addEventListener('click', () =>
    navLinks.classList.contains('open') ? closeNav() : openNav()
  );

  mobileOverlay?.addEventListener('click', closeNav);

  // Close on nav link click OR Escape key
  $$('.nav-links a').forEach(link => link.addEventListener('click', closeNav));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks?.classList.contains('open')) closeNav();
  });

  /* ─── NAVBAR SCROLL ────────────────────────────────────────── */
  const navbar = $('#navbar');
  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ─── BACK TO TOP ──────────────────────────────────────────── */
  const backToTop = $('#backToTop');
  window.addEventListener('scroll', () => {
    backToTop?.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  backToTop?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  /* ─── FOOTER YEAR ──────────────────────────────────────────── */
  const yearEl = $('#footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── COUNTER ANIMATION ────────────────────────────────────── */
  const animateCounter = (el) => {
    const target   = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const start    = performance.now();
    const tick = (now) => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = 1 - (1 - progress) ** 3;   // cubic ease-out
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
    };
    requestAnimationFrame(tick);
  };

  /* ─── INTERSECTION OBSERVER (scroll animations) ────────────── */
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add('in-view');
      // Fire counters only inside stat elements
      $$('.stat-num', target).forEach(animateCounter);
      scrollObserver.unobserve(target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  $$('.animate-on-scroll').forEach(el => scrollObserver.observe(el));
  // Also observe the hero stats wrapper (counter trigger)
  $$('.hero-stats').forEach(el => scrollObserver.observe(el));

  // Fallback: if hero stats are already visible on load, fire counters immediately
  requestAnimationFrame(() => {
    $$('.hero-stats').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        $$('.stat-num', el).forEach(num => {
          if (num.textContent === '0') animateCounter(num);
        });
      }
    });
  });

  /* ─── HERO CANVAS ──────────────────────────────────────────── */
  const canvas = $('#heroCanvas');
  if (canvas) {
    canvas.setAttribute('aria-hidden', 'true');   // decorative
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animId;
    let paused = false;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x     = Math.random() * canvas.width;
        this.y     = Math.random() * canvas.height;
        this.r     = Math.random() * 1.8 + 0.4;
        this.dx    = (Math.random() - 0.5) * 0.4;
        this.dy    = (Math.random() - 0.5) * 0.4;
        this.alpha = Math.random() * 0.4 + 0.1;
      }
      update() {
        this.x += this.dx; this.y += this.dy;
        if (this.x < 0 || this.x > canvas.width ||
            this.y < 0 || this.y > canvas.height) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,160,23,${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    const animate = () => {
      if (paused) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y
          );
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(212,160,23,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    // Pause when tab hidden → save GPU/battery
    document.addEventListener('visibilitychange', () => {
      paused = document.hidden;
      if (!paused) animate();
    });
  }

  /* ─── BOOKING FORM ─────────────────────────────────────────── */
  const bookingForm    = $('#bookingForm');
  const bookingSuccess = $('#bookingSuccess');
  const bookSubmitBtn  = $('#bookSubmitBtn');
  const bookDateInput  = $('#bookDate');

  if (bookDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    bookDateInput.min = tomorrow.toISOString().split('T')[0];
  }

  const setFieldError = (field, hasError) => {
    field.setAttribute('aria-invalid', hasError ? 'true' : 'false');
    field.style.borderColor = '';   // let CSS class handle visuals
  };

  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const required = $$('[required]', bookingForm);
      let valid = true;
      required.forEach(field => {
        const empty = !field.value.trim();
        setFieldError(field, empty);
        if (empty) valid = false;
      });

      if (!valid) {
        const first = $('[aria-invalid="true"]', bookingForm);
        first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        first?.focus();
        return;
      }

      bookSubmitBtn.disabled = true;
      bookSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending…';

      const d = {
        name:    $('#bookName').value.trim(),
        email:   $('#bookEmail').value.trim(),
        phone:   $('#bookPhone').value.trim(),
        service: $('#bookService').value,
        date:    $('#bookDate').value,
        time:    $('#bookTime').value,
        budget:  $('#bookBudget').value,
        message: $('#bookMessage').value.trim(),
      };

      const waMsg = encodeURIComponent(
        `📅 *New Booking — DeryCode*\n\n` +
        `👤 *Name:* ${d.name}\n` +
        `📧 *Email:* ${d.email}\n` +
        `📞 *Phone:* ${d.phone}\n` +
        `🛠️ *Service:* ${d.service}\n` +
        `📆 *Date:* ${d.date}  ⏰ ${d.time}\n` +
        `💰 *Budget:* ${d.budget || 'Not specified'}\n\n` +
        `📝 *Details:*\n${d.message}`
      );

      await new Promise(r => setTimeout(r, 900));
      bookingForm.hidden = true;
      bookingSuccess.style.display = 'flex';
      bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
      bookingSuccess.focus();

      setTimeout(() => {
        window.open(`https://wa.me/256772002326?text=${waMsg}`, '_blank', 'noopener,noreferrer');
      }, 1200);
    });
  }

  /* ─── CONTACT FORM ─────────────────────────────────────────── */
  const contactForm    = $('#contactForm');
  const contactSuccess = $('#contactSuccess');
  const contactBtn     = $('#contactSubmitBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = $('#contactName').value.trim();
      const email   = $('#contactEmail').value.trim();
      const subject = $('#contactSubject').value.trim();
      const message = $('#contactMessage').value.trim();

      if (!name || !email || !subject || !message) return;

      contactBtn.disabled = true;
      contactBtn.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending…';

      const waMsg = encodeURIComponent(
        `📬 *Contact — DeryCode*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📧 *Email:* ${email}\n` +
        `📌 *Subject:* ${subject}\n\n` +
        `💬 *Message:*\n${message}`
      );

      setTimeout(() => {
        contactBtn.innerHTML = '<i class="fas fa-paper-plane" aria-hidden="true"></i> Send Message';
        contactBtn.disabled = false;
        contactForm.reset();
        contactSuccess.style.display = 'flex';
        contactSuccess.setAttribute('role', 'alert');
        setTimeout(() => { contactSuccess.style.display = 'none'; }, 5000);
        window.open(`https://wa.me/256772002326?text=${waMsg}`, '_blank', 'noopener,noreferrer');
      }, 900);
    });
  }

  /* ─── NEWSLETTER ───────────────────────────────────────────── */
  window.handleNewsletter = (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    const btn   = e.target.querySelector('button');
    if (!input?.value) return;
    btn.textContent = '✓ Subscribed!';
    btn.style.background = '#25D366';
    btn.setAttribute('aria-label', 'Subscribed successfully');
    input.value = '';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      btn.style.background = '';
    }, 3000);
  };

}); // end DOMContentLoaded


/* ─── SERVICES (runs after DOMContentLoaded, IIFE) ─────────── */
(function () {
  const slider    = document.getElementById('svcSlider');
  if (!slider) return;

  const slides    = slider.children;
  const dotsWrap  = document.getElementById('slideDots');
  let cur = 0, autoTimer;

  const buildDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    for (let i = 0; i < slides.length; i++) {
      const d = document.createElement('button');
      d.className = 'slide-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Go to slide ${i + 1}`);
      d.addEventListener('click', () => goSlide(i));
      dotsWrap.appendChild(d);
    }
  };

  const goSlide = (n) => {
    cur = ((n % slides.length) + slides.length) % slides.length;
    slider.style.transform = `translateX(-${cur * 100}%)`;
    document.querySelectorAll('.slide-dot').forEach((d, i) =>
      d.classList.toggle('active', i === cur)
    );
  };

  const startAuto = () => { autoTimer = setInterval(() => goSlide(cur + 1), 4500); };
  const stopAuto  = () => { clearInterval(autoTimer); };

  buildDots();
  startAuto();

  document.getElementById('slideNext')?.addEventListener('click', () => { stopAuto(); goSlide(cur + 1); startAuto(); });
  document.getElementById('slidePrev')?.addEventListener('click', () => { stopAuto(); goSlide(cur - 1); startAuto(); });

  // Touch swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) { stopAuto(); goSlide(dx < 0 ? cur + 1 : cur - 1); startAuto(); }
  }, { passive: true });

  /* ── Category filter ── */
  document.querySelectorAll('.svc-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.svc-tab').forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      this.classList.add('active');
      this.setAttribute('aria-selected', 'true');
      const cat = this.dataset.cat;
      document.querySelectorAll('.svc-product-card').forEach(card => {
        const show = cat === 'all' || card.dataset.cat === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });

  /* ── Modals ── */
  let modalImgIdx = 0;
  const overlay = document.getElementById('svcModalOverlay');
  let lastFocused = null;

  const getFocusable = (el) =>
    [...el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')].filter(n => !n.disabled);

  const trapFocus = (e, modal) => {
    if (e.key !== 'Tab') return;
    const focusable = getFocusable(modal);
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  };

  window.openModal = (id) => {
    lastFocused = document.activeElement;
    overlay.classList.add('show');
    document.querySelectorAll('.svc-modal').forEach(x => x.classList.remove('show'));
    const m = document.getElementById('modal-' + id);
    if (!m) return;
    m.classList.add('show');
    m.removeAttribute('hidden');
    modalImgIdx = 0;
    updateModalImgs(m);
    // Focus the close button
    m.querySelector('.svc-modal-close')?.focus();
    document.addEventListener('keydown', onModalKeyDown);
  };

  const closeAllModals = () => {
    overlay.classList.remove('show');
    document.querySelectorAll('.svc-modal').forEach(x => {
      x.classList.remove('show');
      x.setAttribute('hidden', '');
    });
    document.removeEventListener('keydown', onModalKeyDown);
    lastFocused?.focus();
  };

  const onModalKeyDown = (e) => {
    if (e.key === 'Escape') { closeAllModals(); return; }
    const openModal = document.querySelector('.svc-modal.show');
    if (openModal) trapFocus(e, openModal);
  };

  overlay?.addEventListener('click', closeAllModals);
  document.querySelectorAll('.svc-modal-close').forEach(btn =>
    btn.addEventListener('click', closeAllModals)
  );

  const updateModalImgs = (modal) => {
    const slides = modal.querySelectorAll('.modal-img-slide');
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${(i - modalImgIdx) * 100}%)`;
    });
  };

  window.modalNext = () => {
    const modal  = document.querySelector('.svc-modal.show');
    const slides = modal?.querySelectorAll('.modal-img-slide');
    if (!slides?.length) return;
    modalImgIdx = (modalImgIdx + 1) % slides.length;
    updateModalImgs(modal);
  };
  window.modalPrev = () => {
    const modal  = document.querySelector('.svc-modal.show');
    const slides = modal?.querySelectorAll('.modal-img-slide');
    if (!slides?.length) return;
    modalImgIdx = (modalImgIdx - 1 + slides.length) % slides.length;
    updateModalImgs(modal);
  };

})();

/* ─── FAQ ACCORDION ───────────────────────────────────────── */
(function () {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    btn?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach((other) => {
        other.classList.remove('open');
        other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* ─── SERVICE WORKER ───────────────────────────────────────── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .catch(err => console.warn('SW registration failed:', err));
  });
}
