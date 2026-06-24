// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;

const savedTheme = localStorage.getItem('derycode-theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('derycode-theme', next);
  themeIcon.className = next === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
});

// ===== HAMBURGER / MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const mobileOverlay = document.getElementById('mobileNavOverlay');

function openNav() {
  navLinks.classList.add('open');
  hamburger.classList.add('active');
  mobileOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  navLinks.classList.contains('open') ? closeNav() : openNav();
});

mobileOverlay.addEventListener('click', closeNav);

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeNav);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== FOOTER YEAR =====
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const duration = 2000;
  const start = performance.now();
  const update = (time) => {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

// ===== INTERSECTION OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.service-card, .portfolio-card, .tech-category, .booking-step, .value-item, .contact-item, .testimonial-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  observer.observe(el);
});

// Animate hero stats
document.querySelectorAll('.hero-stats').forEach(el => observer.observe(el));

// ===== HERO CANVAS =====
const canvas = document.getElementById('heroCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animId;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.r = Math.random() * 1.8 + 0.4;
      this.dx = (Math.random() - 0.5) * 0.4;
      this.dy = (Math.random() - 0.5) * 0.4;
      this.alpha = Math.random() * 0.4 + 0.1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(108,99,255,${this.alpha})`;
      ctx.fill();
    }
    update() {
      this.x += this.dx; this.y += this.dy;
      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
  }

  for (let i = 0; i < 70; i++) particles.push(new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    // Connect nearby particles
    particles.forEach((a, i) => {
      particles.slice(i + 1).forEach(b => {
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(108,99,255,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      });
    });
    animId = requestAnimationFrame(animate);
  }
  animate();
}

// ===== SET MIN DATE FOR BOOKING =====
const bookDateInput = document.getElementById('bookDate');
if (bookDateInput) {
  const today = new Date();
  today.setDate(today.getDate() + 1); // minimum tomorrow
  bookDateInput.min = today.toISOString().split('T')[0];
}

// ===== BOOKING FORM SUBMIT =====
const bookingForm = document.getElementById('bookingForm');
const bookingSuccess = document.getElementById('bookingSuccess');
const bookSubmitBtn = document.getElementById('bookSubmitBtn');

if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = bookingForm.querySelectorAll('[required]');
    let valid = true;
    requiredFields.forEach(field => {
      field.style.borderColor = '';
      if (!field.value.trim()) {
        field.style.borderColor = '#FF6584';
        valid = false;
      }
    });
    if (!valid) {
      // Scroll to first invalid
      const firstInvalid = bookingForm.querySelector('[required]:placeholder-shown, select:invalid');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Disable button, show loading
    bookSubmitBtn.disabled = true;
    bookSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const data = {
      name: document.getElementById('bookName').value,
      email: document.getElementById('bookEmail').value,
      phone: document.getElementById('bookPhone').value,
      service: document.getElementById('bookService').value,
      date: document.getElementById('bookDate').value,
      time: document.getElementById('bookTime').value,
      budget: document.getElementById('bookBudget').value,
      message: document.getElementById('bookMessage').value,
    };

    // Build WhatsApp message as fallback / primary delivery
    const waMsg = encodeURIComponent(
      `📅 *New Booking Request — DeryCode Website*\n\n` +
      `👤 *Name:* ${data.name}\n` +
      `📧 *Email:* ${data.email}\n` +
      `📞 *Phone:* ${data.phone}\n` +
      `🛠️ *Service:* ${data.service}\n` +
      `📆 *Date:* ${data.date}\n` +
      `⏰ *Time:* ${data.time}\n` +
      `💰 *Budget:* ${data.budget || 'Not specified'}\n\n` +
      `📝 *Project Details:*\n${data.message}`
    );

    // Simulate a short delay, then show success + redirect to WhatsApp
    setTimeout(() => {
      bookingForm.style.display = 'none';
      bookingSuccess.style.display = 'block';
      bookingSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Auto-open WhatsApp with booking details after 1.5s
      setTimeout(() => {
        window.open(`https://wa.me/256772002326?text=${waMsg}`, '_blank');
      }, 1500);
    }, 1200);
  });
}

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');
const contactSubmitBtn = document.getElementById('contactSubmitBtn');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    if (!name || !email || !subject || !message) return;

    contactSubmitBtn.disabled = true;
    contactSubmitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    const waMsg = encodeURIComponent(
      `📬 *Contact Message — DeryCode Website*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📧 *Email:* ${email}\n` +
      `📌 *Subject:* ${subject}\n\n` +
      `💬 *Message:*\n${message}`
    );

    setTimeout(() => {
      contactSubmitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      contactSubmitBtn.disabled = false;
      contactForm.reset();
      contactSuccess.style.display = 'flex';
      setTimeout(() => { contactSuccess.style.display = 'none'; }, 5000);
      window.open(`https://wa.me/256772002326?text=${waMsg}`, '_blank');
    }, 1000);
  });
}
