#!/usr/bin/env node
/**
 * DeryCode SEO Page Generator
 * Generates 200+ SEO-optimized HTML pages from keyword cluster data
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://derycode.publicvm.com';
const TODAY = '2026-08-06';
const STYLESHEET_VER = '20260806a';

// ── Shared template components ──

function head(opts) {
  const { title, description, canonical, keywords, ogImage, type } = opts;
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  ${keywords ? `<meta name="keywords" content="${keywords}" />` : ''}
  <meta name="author" content="Asiimwe Derick — CEO DeryCode & Sageco Evergreen Company Limited" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="geo.region" content="UG-C" />
  <meta name="geo.placename" content="Kampala, Uganda" />
  <meta name="geo.position" content="0.3476;32.5825" />
  <meta name="ICBM" content="0.3476, 32.5825" />
  <meta name="language" content="en-UG" />
  <meta name="revisit-after" content="7 days" />
  <meta name="googlebot" content="index, follow, max-image-preview:large" />
  <meta name="bingbot" content="index, follow, max-image-preview:large" />
  <link rel="canonical" href="${BASE_URL}${canonical}" />
  <link rel="alternate" hreflang="en-ug" href="${BASE_URL}${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${BASE_URL}${canonical}" />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
  <link rel="icon" type="image/png" href="/logo.webp" />
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#D4A017" />
  <meta name="google-site-verification" content="dqp0OsklAjL-bQeqgt3qKwux3KpJExxaTLXoZQuIY2I" />
  <meta property="og:type" content="${type || 'website'}" />
  <meta property="og:url" content="${BASE_URL}${canonical}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${ogImage || BASE_URL + '/hero.webp'}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:site_name" content="DeryCode" />
  <meta property="og:locale" content="en_UG" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@DeryCode" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${ogImage || BASE_URL + '/hero.webp'}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" /></noscript>
  <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /></noscript>
  <link rel="stylesheet" href="/style.css?v=${STYLESHEET_VER}" />
`;
}

function structuredData(schemaJson) {
  return `  <script type="application/ld+json">
  ${JSON.stringify(schemaJson, null, 2)}
  </script>
</head>
`;
}

function nav() {
  return `
  <nav class="navbar">
    <a href="/" class="nav-logo">
      <img src="/logo.webp" alt="DeryCode Logo" width="40" height="40" />
      <span>DeryCode</span>
    </a>
    <button class="nav-toggle" aria-label="Toggle navigation"><i class="fas fa-bars"></i></button>
    <ul class="nav-menu">
      <li><a href="/">Home</a></li>
      <li><a href="/services/software-development.html">Services</a></li>
      <li><a href="/industries/saccos.html">Industries</a></li>
      <li><a href="/pricing/website-cost-uganda.html">Pricing</a></li>
      <li><a href="/blog.html">Blog</a></li>
      <li><a href="/about.html">About</a></li>
      <li><a href="https://wa.me/256772002326" class="nav-cta">Get Quote</a></li>
    </ul>
  </nav>`;
}

function breadcrumbs(items) {
  const itemList = items.map((item, i) => {
    const isLast = i === items.length - 1;
    return `<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">
      ${!isLast ? `<a href="${BASE_URL}${item.url}" itemprop="item">` : '<span itemprop="item">'}
      <span itemprop="name">${item.name}</span>
      ${!isLast ? '</a>' : '</span>'}
      <meta itemprop="position" content="${i + 1}" />
    </li>`;
  }).join('');

  return `
  <nav class="breadcrumbs" aria-label="Breadcrumb">
    <ol itemscope itemtype="https://schema.org/BreadcrumbList">${itemList}</ol>
  </nav>`;
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": BASE_URL + item.url
    }))
  };
}

function serviceSchema(serviceName, serviceDesc) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName,
    "provider": { "@id": BASE_URL + "/#organization" },
    "areaServed": { "@type": "Country", "name": "Uganda" },
    "description": serviceDesc
  };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };
}

function footer() {
  return `
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-col">
        <h4>DeryCode</h4>
        <p>Uganda's leading software development company. Building the future with technology & blockchain.</p>
        <p><i class="fas fa-map-marker-alt"></i> Kampala, Uganda</p>
        <p><i class="fas fa-phone"></i> +256 772 002 326</p>
        <p><i class="fas fa-envelope"></i> info@derycode.com</p>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <a href="/services/software-development.html">Software Development</a>
        <a href="/services/web-development.html">Web Development</a>
        <a href="/services/mobile-app-development.html">Mobile App Development</a>
        <a href="/services/ai-development.html">AI & Automation</a>
        <a href="/services/sacco-software.html">SACCO Software</a>
        <a href="/services/erp-software.html">ERP Software</a>
      </div>
      <div class="footer-col">
        <h4>Products</h4>
        <a href="/products/deryloan.html">DeryLoan</a>
        <a href="/products/sacco-wallet.html">SaccoWallet</a>
        <a href="/products/school-sync-manager.html">School Sync Manager</a>
        <a href="/products/derycoin.html">DeryCoin</a>
      </div>
      <div class="footer-col">
        <h4>Resources</h4>
        <a href="/blog.html">Blog</a>
        <a href="/pricing/website-cost-uganda.html">Website Pricing</a>
        <a href="/comparisons/best-sacco-software-uganda.html">SACCO Software Comparison</a>
        <a href="/about.html">About Us</a>
        <a href="/privacy.html">Privacy Policy</a>
      </div>
      <div class="footer-col">
        <h4>Connect</h4>
        <a href="https://wa.me/256772002326"><i class="fab fa-whatsapp"></i> WhatsApp</a>
        <a href="https://github.com/asiimwe3"><i class="fab fa-github"></i> GitHub</a>
        <a href="https://ug.linkedin.com/in/asiimwe-derick-501755313"><i class="fab fa-linkedin"></i> LinkedIn</a>
        <a href="https://www.facebook.com/p/Dery-Code-61590735268937/"><i class="fab fa-facebook"></i> Facebook</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2021–2026 DeryCode Technologies. All rights reserved. Founded by Asiimwe Derick.</p>
    </div>
  </footer>
  <a href="https://wa.me/256772002326" class="whatsapp-float" aria-label="Chat on WhatsApp"><i class="fab fa-whatsapp"></i></a>
  <script src="/script.js?v=${STYLESHEET_VER}"></script>
</body>
</html>`;
}

// ── Page generator for service pages ──

function generateServicePage(opts) {
  const { title, h1, description, canonical, cluster, faqs, sections, keywords } = opts;
  const bcItems = [
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services/software-development.html' },
    { name: cluster, url: canonical }
  ];

  const schemas = [
    breadcrumbSchema(bcItems),
    serviceSchema(h1, description)
  ];
  if (faqs) schemas.push(faqSchema(faqs));

  let html = head({ title, description, canonical, keywords });
  for (const schema of schemas) {
    html += structuredData(schema);
  }

  html += `
<body>
  ${nav()}
  <main class="page-content">
    <div class="container">
      ${breadcrumbs(bcItems)}
      <h1>${h1}</h1>
      <p class="lead">${description}</p>`;

  for (const section of sections) {
    if (section.type === 'problem') {
      html += `
      <section class="content-section">
        <h2>${section.heading}</h2>
        <p>${section.content}</p>
      </section>`;
    } else if (section.type === 'features') {
      html += `
      <section class="content-section">
        <h2>${section.heading}</h2>
        <div class="features-grid">`;
      for (const f of section.items) {
        html += `
          <div class="feature-card">
            <i class="fas ${f.icon}"></i>
            <h3>${f.title}</h3>
            <p>${f.desc}</p>
          </div>`;
      }
      html += `</div></section>`;
    } else if (section.type === 'process') {
      html += `
      <section class="content-section">
        <h2>${section.heading}</h2>
        <div class="process-steps">`;
      for (let i = 0; i < section.steps.length; i++) {
        html += `
          <div class="process-step">
            <span class="step-num">${i + 1}</span>
            <h3>${section.steps[i].title}</h3>
            <p>${section.steps[i].desc}</p>
          </div>`;
      }
      html += `</div></section>`;
    } else if (section.type === 'use-cases') {
      html += `
      <section class="content-section">
        <h2>${section.heading}</h2>
        <ul class="use-case-list">`;
      for (const uc of section.items) {
        html += `<li><strong>${uc.title}:</strong> ${uc.desc}</li>`;
      }
      html += `</ul></section>`;
    } else if (section.type === 'tech') {
      html += `
      <section class="content-section">
        <h2>${section.heading}</h2>
        <p>${section.content}</p>
        <div class="tech-badges">`;
      for (const t of section.items) {
        html += `<span class="tech-badge">${t}</span>`;
      }
      html += `</div></section>`;
    } else if (section.type === 'links') {
      html += `
      <section class="content-section">
        <h2>${section.heading}</h2>
        <div class="internal-links-grid">`;
      for (const l of section.items) {
        html += `<a href="${l.url}" class="internal-link-card"><h3>${l.title}</h3><p>${l.desc}</p></a>`;
      }
      html += `</div></section>`;
    } else if (section.type === 'faq') {
      html += `
      <section class="content-section faq-section">
        <h2>${section.heading}</h2>`;
      for (const f of section.items) {
        html += `
        <details class="faq-item">
          <summary>${f.q}</summary>
          <p>${f.a}</p>
        </details>`;
      }
      html += `</section>`;
    } else if (section.type === 'cta') {
      html += `
      <section class="content-section cta-section">
        <h2>${section.heading}</h2>
        <p>${section.content}</p>
        <a href="https://wa.me/256772002326" class="btn-primary">Get a Free Quote</a>
      </section>`;
    } else if (section.type === 'paragraph') {
      html += `
      <section class="content-section">
        <h2>${section.heading}</h2>
        <p>${section.content}</p>
      </section>`;
    }
  }

  html += `
    </div>
  </main>
  ${footer()}`;

  return html;
}

// ── Page definitions ──

const pages = [
  // ── A. Core Software Development ──
  {
    path: 'services/software-development.html',
    title: 'Software Development Company Uganda | DeryCode',
    h1: 'Software Development Company in Uganda',
    description: 'DeryCode is a leading software development company in Uganda building custom software, web applications, mobile apps, and enterprise systems for businesses across Kampala and East Africa.',
    cluster: 'Software Development',
    keywords: 'software development company Uganda, software company Kampala, custom software development Uganda, software developers Uganda, IT company Kampala',
    faqs: [
      { q: 'How much does software development cost in Uganda?', a: 'Custom software development in Uganda typically ranges from UGX 2,200,000 for simple applications to UGX 30,000,000+ for enterprise systems. The cost depends on complexity, features, integrations, and timeline.' },
      { q: 'How long does software development take in Uganda?', a: 'A typical custom software project takes 4–12 weeks depending on scope. Simple applications can be built in 2–4 weeks, while enterprise systems with multiple integrations may take 3–6 months.' },
      { q: 'Does DeryCode offer software maintenance after deployment?', a: 'Yes. DeryCode provides ongoing maintenance, bug fixes, security updates, and feature enhancements for all software we build. Maintenance plans start from UGX 500,000/month.' },
      { q: 'What technologies does DeryCode use?', a: 'We use modern technologies including React, Next.js, Node.js, Python, Flutter, React Native, PostgreSQL, Supabase, Firebase, and Solidity for blockchain projects.' }
    ],
    sections: [
      { type: 'problem', heading: 'The Challenge with Software in Uganda', content: 'Many Ugandan businesses struggle with off-the-shelf software that doesn\'t fit their workflows, manual processes that slow growth, and systems that can\'t integrate with local payment methods like MTN MoMo and Airtel Money. Custom software solves these problems by being built specifically for your business needs and the Ugandan operating environment.' },
      { type: 'features', heading: 'Our Software Development Services', items: [
        { icon: 'fa-code', title: 'Custom Software', desc: 'Bespoke applications built from scratch to match your exact business requirements.' },
        { icon: 'fa-cloud', title: 'Cloud Applications', desc: 'Scalable cloud-native software deployed on AWS, Vercel, and other platforms.' },
        { icon: 'fa-plug', title: 'API Integration', desc: 'Connect your software with payment gateways, SMS, email, and third-party services.' },
        { icon: 'fa-mobile-screen', title: 'Cross-Platform', desc: 'Software that works across web, mobile, and desktop from a single codebase.' },
        { icon: 'fa-shield-halved', title: 'Security First', desc: 'Built with security best practices including encryption, RBAC, and audit trails.' },
        { icon: 'fa-chart-line', title: 'Analytics & Reporting', desc: 'Real-time dashboards and reports to track performance and make data-driven decisions.' }
      ]},
      { type: 'tech', heading: 'Technologies We Use', content: 'DeryCode builds software with modern, battle-tested technologies:', items: ['React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'Supabase', 'Firebase', 'Flutter', 'React Native', 'TypeScript', 'Docker', 'Solidity'] },
      { type: 'process', heading: 'Our Development Process', steps: [
        { title: 'Discovery', desc: 'We analyze your business needs, workflows, and technical requirements.' },
        { title: 'Planning', desc: 'We create a detailed project plan, architecture, and technology stack recommendation.' },
        { title: 'Design', desc: 'UI/UX design with wireframes, prototypes, and user testing.' },
        { title: 'Development', desc: 'Agile development with weekly sprints and regular client reviews.' },
        { title: 'Testing', desc: 'Comprehensive QA testing including unit, integration, and user acceptance.' },
        { title: 'Deployment', desc: 'Production deployment with monitoring, documentation, and team training.' },
        { title: 'Support', desc: 'Ongoing maintenance, updates, and feature enhancements.' }
      ]},
      { type: 'use-cases', heading: 'Who We Build For', items: [
        { title: 'SACCOs & Microfinance', desc: 'Core banking systems, loan management, member portals, and MoMo integration for financial cooperatives.' },
        { title: 'Schools & Universities', desc: 'School management systems, student portals, e-learning platforms, and fees collection.' },
        { title: 'Healthcare', desc: 'Clinic management, patient records, appointment scheduling, and pharmacy systems.' },
        { title: 'Retail & Hospitality', desc: 'POS systems, inventory management, hotel booking, and restaurant management.' },
        { title: 'NGOs & Nonprofits', desc: 'Donor management, project tracking, M&E systems, and impact reporting.' },
        { title: 'Real Estate', desc: 'Property listings, agent portals, tenant management, and payment tracking.' }
      ]},
      { type: 'links', heading: 'Related Services', items: [
        { url: '/services/web-development.html', title: 'Web Development', desc: 'Professional websites and web applications for Ugandan businesses.' },
        { url: '/services/mobile-app-development.html', title: 'Mobile App Development', desc: 'iOS and Android apps built with Flutter and React Native.' },
        { url: '/services/sacco-software.html', title: 'SACCO Software', desc: 'Complete SACCO management systems with MoMo integration.' },
        { url: '/services/erp-software.html', title: 'ERP Software', desc: 'Enterprise resource planning for Ugandan businesses.' },
        { url: '/services/api-development.html', title: 'API Development', desc: 'Custom APIs and payment integrations.' },
        { url: '/services/software-consulting.html', title: 'Software Consulting', desc: 'Technology strategy and digital transformation consulting.' }
      ]},
      { type: 'faq', heading: 'Frequently Asked Questions', items: [
        { q: 'How much does software development cost in Uganda?', a: 'Custom software development in Uganda typically ranges from UGX 2,200,000 for simple applications to UGX 30,000,000+ for enterprise systems.' },
        { q: 'How long does software development take?', a: 'Most projects take 4–12 weeks. Simple apps can be built in 2–4 weeks, while enterprise systems may take 3–6 months.' },
        { q: 'Do you offer maintenance after deployment?', a: 'Yes, we provide ongoing maintenance, security updates, and feature enhancements starting from UGX 500,000/month.' },
        { q: 'Can you integrate with MTN MoMo and Airtel Money?', a: 'Yes, we have extensive experience integrating MTN MoMo API, Airtel Money API, and Pesapal for Ugandan payment processing.' },
        { q: 'Do you sign NDAs?', a: 'Yes, we sign mutual NDAs before discussing project details to protect your intellectual property.' }
      ]},
      { type: 'cta', heading: 'Ready to Build Your Software?', content: 'Get a free consultation and quote for your custom software project. We\'ll help you plan, design, and build the right solution for your business.', }
    ]
  }
];

// ── Generate pages ──

const sitemapEntries = [];

for (const page of pages) {
  const dir = path.dirname(page.path);
  fs.mkdirSync(dir, { recursive: true });

  const html = generateServicePage(page);
  fs.writeFileSync(page.path, html);
  sitemapEntries.push({
    url: '/' + page.path,
    priority: page.title.includes('Uganda') ? '0.9' : '0.8'
  });
  console.log(`Generated: ${page.path}`);
}

console.log(`\nTotal pages generated: ${pages.length}`);
console.log('Sitemap entries:', sitemapEntries.length);
