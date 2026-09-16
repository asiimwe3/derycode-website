/* =============================================================
   DeryCode Technologies — Enterprise Script
   September 2026 — Complete Redesign
============================================================= */

(function () {
  'use strict';

  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ─── NAVBAR SCROLL ────────────────────────────────────────── */
  const navbar = $('#navbar');
  const backToTop = $('#backToTop');

  function handleScroll() {
    const scrolled = window.scrollY > 40;
    navbar?.classList.toggle('scrolled', scrolled);
    backToTop?.classList.toggle('visible', window.scrollY > 600);
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();


  /* ─── SCROLL PROGRESS BAR ──────────────────────────────────── */
  const progressBar = $('#scrollProgress');
  if (progressBar) {
    const updateProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progressBar.style.width = pct + '%';
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ─── BACK TO TOP ─────────────────────────────────────────── */
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── MOBILE NAV ──────────────────────────────────────────── */
  const hamburger = $('#hamburger');
  const mobileNav = $('#mobileNav');
  const mobileNavClose = $('#mobileNavClose');

  function openMobileNav() {
    mobileNav?.classList.add('active');
    mobileNav.setAttribute('aria-hidden', 'false');
    hamburger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileNav() {
    mobileNav?.classList.remove('active');
    mobileNav.setAttribute('aria-hidden', 'true');
    hamburger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  hamburger?.addEventListener('click', openMobileNav);
  mobileNavClose?.addEventListener('click', closeMobileNav);
  $$('.mobile-nav-links a').forEach(a => a.addEventListener('click', closeMobileNav));

  /* ─── FOOTER YEAR ─────────────────────────────────────────── */
  const yearEl = $('#footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ─── SCROLL REVEAL ───────────────────────────────────────── */
  const revealEls = $$('.section, .capability-card, .case-card, .pillar, .industry-item, .tech-cat, .insight-card, .problem-card, .method-step, .future-card, .milestone, .platform-chip');
  revealEls.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });

  revealEls.forEach(el => observer.observe(el));

  /* ─── STAT COUNTER ────────────────────────────────────────── */
  const statNums = $$('.comp-stat-num');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1500;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      statObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statObserver.observe(el));

  /* ─── LEAD CAPTURE (newsletter + project inquiries) ──────── */
  const CAPTURE_URL = 'https://vesper-425a3e24.base44.app/functions/derycodeCapture';

  async function postCapture(payload) {
    const res = await fetch(CAPTURE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.ok === false) throw new Error(data.error || 'Network error');
    return data;
  }

  window.handleNewsletter = async (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button');
    if (!input?.value) return;
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Subscribing...';
    try {
      await postCapture({ type: 'newsletter', email: input.value, source: 'footer' });
      btn.textContent = '✓ Subscribed';
      btn.style.background = '#22C55E';
      input.value = '';
      form.reset();
    } catch (err) {
      btn.textContent = 'Try again';
      console.warn('Newsletter capture failed:', err);
    }
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
    }, 3000);
  };

  const inquiryForm = $('#inquiryForm');
  if (inquiryForm) {
    inquiryForm.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const btn = $('#inqSubmit');
      const status = $('#inqStatus');
      const original = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending...';
      status.textContent = '';
      status.className = 'form-status';
      const fd = new FormData(inquiryForm);
      const payload = { type: 'lead', source: 'homepage inquiry form' };
      fd.forEach((v, k) => { payload[k] = v; });
      try {
        await postCapture(payload);
        inquiryForm.reset();
        btn.innerHTML = '✓ Sent';
        btn.style.background = '#22C55E';
        status.textContent = "Thank you — your inquiry is in. We'll respond within 24 hours. For anything urgent, use the WhatsApp button.";
        status.classList.add('form-status-ok');
        inquiryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } catch (err) {
        status.textContent = "We couldn't send that right now — please reach us directly on WhatsApp: +256 772 002 326.";
        status.classList.add('form-status-err');
      }
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    });
  }

  /* ─── NETWORK VISUALIZATION ──────────────────────────────── */
  const canvas = $('#networkCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const labels = $$('.net-label');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W, H, dpr, nodes, raf;
  const NODE_COUNT = 6;
  const NODE_LABELS = ['AI', 'Software', 'Blockchain', 'Data', 'Cloud', 'Web3'];

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initNodes() {
    nodes = [];
    const cx = W / 2;
    const cy = H / 2;
    const radius = Math.min(W, H) * 0.32;

    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i / NODE_COUNT) * Math.PI * 2 - Math.PI / 2;
      nodes.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        baseX: cx + Math.cos(angle) * radius,
        baseY: cy + Math.sin(angle) * radius,
        vx: 0, vy: 0,
        radius: 4,
        label: NODE_LABELS[i],
        phase: i * 1.2
      });
    }

    // Position labels
    labels.forEach((label, i) => {
      if (nodes[i]) {
        label.style.left = `${(nodes[i].x / W) * 100}%`;
        label.style.top = `${(nodes[i].y / H) * 100}%`;
      }
    });
  }

  let time = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    time += 0.008;

    // Update node positions with subtle floating
    nodes.forEach((node, i) => {
      const floatX = Math.sin(time + node.phase) * 12;
      const floatY = Math.cos(time + node.phase * 1.3) * 12;
      node.x = node.baseX + floatX;
      node.y = node.baseY + floatY;

      // Update labels
      if (labels[i]) {
        labels[i].style.left = `${(node.x / W) * 100}%`;
        labels[i].style.top = `${(node.y / H) * 100}%`;
      }
    });

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const dx = n1.x - n2.x;
        const dy = n1.y - n2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Only draw if close enough
        if (dist < W * 0.5) {
          const opacity = (1 - dist / (W * 0.5)) * 0.25;
          ctx.strokeStyle = `rgba(79, 124, 255, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(n1.x, n1.y);
          ctx.lineTo(n2.x, n2.y);
          ctx.stroke();

          // Animated pulse along connection
          const pulseProgress = ((time * 0.5 + i + j) % 2) / 2;
          if (pulseProgress < 1) {
            const px = n1.x + (n2.x - n1.x) * pulseProgress;
            const py = n1.y + (n2.y - n1.y) * pulseProgress;
            ctx.fillStyle = `rgba(34, 211, 238, ${0.5 * (1 - pulseProgress)})`;
            ctx.beginPath();
            ctx.arc(px, py, 1.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    }

    // Draw nodes
    nodes.forEach((node, i) => {
      // Outer glow
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 24);
      gradient.addColorStop(0, 'rgba(79, 124, 255, 0.4)');
      gradient.addColorStop(0.5, 'rgba(79, 124, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(79, 124, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, 24, 0, Math.PI * 2);
      ctx.fill();

      // Node core
      ctx.fillStyle = '#4F7CFF';
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();

      // Inner highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(node.x - 1, node.y - 1, 1.5, 0, Math.PI * 2);
      ctx.fill();
    });

    if (!prefersReducedMotion) {
      raf = requestAnimationFrame(draw);
    }
  }

  function start() {
    resize();
    initNodes();
    if (prefersReducedMotion) {
      draw(); // Draw once
    } else {
      raf = requestAnimationFrame(draw);
    }
  }

  // Pause when not visible for performance
  let isVisible = true;
  const visObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible && !prefersReducedMotion) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(draw);
      } else if (!isVisible) {
        cancelAnimationFrame(raf);
      }
    });
  });
  visObserver.observe(canvas);

  window.addEventListener('resize', () => {
    cancelAnimationFrame(raf);
    resize();
    initNodes();
    if (!prefersReducedMotion && isVisible) {
      raf = requestAnimationFrame(draw);
    }
  });

  start();

  /* ─── SERVICE WORKER ──────────────────────────────────────── */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {});
    });
  }

})();
