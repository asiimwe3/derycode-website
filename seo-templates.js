#!/usr/bin/env node
/**
 * DeryCode SEO Page Generator v2
 * Data-driven generator for 200+ SEO-optimized pages
 */
const fs = require('fs');
const path = require('path');

const BASE = 'https://derycode.publicvm.com';
const VER = '20260806a';
const GA4 = `  <!-- GA4 -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-VY99K5XN58"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VY99K5XN58');
  </script>`;

const ORG_SCHEMA = {
  "@type": "Organization",
  "@id": BASE + "/#organization",
  "name": "DeryCode",
  "legalName": "DeryCode Technologies",
  "url": BASE + "/",
  "logo": BASE + "/logo.webp",
  "description": "Uganda's leading software development company.",
  "foundingDate": "2021",
  "founder": { "@type": "Person", "name": "Asiimwe Derick" },
  "address": { "@type": "PostalAddress", "addressLocality": "Kampala", "addressRegion": "Central", "addressCountry": "UG" },
  "contactPoint": [{ "@type": "ContactPoint", "telephone": "+256772002326", "contactType": "customer service", "availableLanguage": ["English", "Luganda"] }],
  "email": "info@derycode.com",
  "sameAs": ["https://github.com/asiimwe3", "https://wa.me/256772002326", "https://ug.linkedin.com/in/asiimwe-derick-501755313", "https://www.facebook.com/p/Dery-Code-61590735268937/"]
};

function buildHead(p) {
  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.title}</title>
  <meta name="description" content="${p.desc}" />
  <meta name="keywords" content="${p.kw || ''}" />
  <meta name="author" content="Asiimwe Derick — CEO DeryCode" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
  <meta name="geo.region" content="UG-C" />
  <meta name="geo.placename" content="Kampala, Uganda" />
  <meta name="geo.position" content="0.3476;32.5825" />
  <meta name="ICBM" content="0.3476, 32.5825" />
  <meta name="language" content="en-UG" />
  <meta name="revisit-after" content="7 days" />
  <meta name="googlebot" content="index, follow" />
  <meta name="bingbot" content="index, follow" />
  <link rel="canonical" href="${BASE}/${p.path}" />
  <link rel="alternate" hreflang="en-ug" href="${BASE}/${p.path}" />
  <link rel="alternate" hreflang="x-default" href="${BASE}/${p.path}" />
  <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
  <link rel="icon" type="image/png" href="/logo.webp" />
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#D4A017" />
  <meta name="google-site-verification" content="dqp0OsklAjL-bQeqgt3qKwux3KpJExxaTLXoZQuIY2I" />
  <meta property="og:type" content="${p.ogtype || 'website'}" />
  <meta property="og:url" content="${BASE}/${p.path}" />
  <meta property="og:title" content="${p.title}" />
  <meta property="og:description" content="${p.desc}" />
  <meta property="og:image" content="${BASE}/${p.ogimage || '/hero.webp'}" />
  <meta property="og:site_name" content="DeryCode" />
  <meta property="og:locale" content="en_UG" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@DeryCode" />
  <meta name="twitter:title" content="${p.title}" />
  <meta name="twitter:description" content="${p.desc}" />
  <meta name="twitter:image" content="${BASE}/${p.ogimage || '/hero.webp'}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" /></noscript>
  <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" onload="this.onload=null;this.rel='stylesheet'" />
  <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" /></noscript>
  <link rel="stylesheet" href="/style.css?v=${VER}" />`;
}

function buildNav() {
  return `
  <nav class="navbar">
    <a href="/" class="nav-logo"><img src="/logo.webp" alt="DeryCode" width="40" height="40" /><span>DeryCode</span></a>
    <button class="nav-toggle" aria-label="Menu"><i class="fas fa-bars"></i></button>
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

function buildBreadcrumbs(items) {
  const list = items.map((item, i) => {
    const last = i === items.length - 1;
    return `<li itemprop="itemListElement" itemscope itemtype="https://schema.org/ListItem">${last ? `<span itemprop="name">${item.name}</span>` : `<a href="${BASE}${item.url}" itemprop="item"><span itemprop="name">${item.name}</span></a>`}<meta itemprop="position" content="${i+1}" /></li>`;
  }).join('');
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol itemscope itemtype="https://schema.org/BreadcrumbList">${list}</ol></nav>`;
}

function buildFooter() {
  return `
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-col"><h4>DeryCode</h4><p>Uganda's leading software development company.</p><p><i class="fas fa-map-marker-alt"></i> Kampala, Uganda</p><p><i class="fas fa-phone"></i> +256 772 002 326</p><p><i class="fas fa-envelope"></i> info@derycode.com</p></div>
      <div class="footer-col"><h4>Services</h4><a href="/services/software-development.html">Software Development</a><a href="/services/web-development.html">Web Development</a><a href="/services/mobile-app-development.html">Mobile Apps</a><a href="/services/ai-development.html">AI & Automation</a><a href="/services/sacco-software.html">SACCO Software</a><a href="/services/erp-software.html">ERP Software</a></div>
      <div class="footer-col"><h4>Products</h4><a href="/products/deryloan.html">DeryLoan</a><a href="/products/sacco-wallet.html">SaccoWallet</a><a href="/products/school-sync-manager.html">School Sync Manager</a><a href="/products/derycoin.html">DeryCoin</a></div>
      <div class="footer-col"><h4>Resources</h4><a href="/blog.html">Blog</a><a href="/pricing/website-cost-uganda.html">Pricing</a><a href="/comparisons/best-sacco-software-uganda.html">Comparisons</a><a href="/about.html">About</a><a href="/privacy.html">Privacy</a></div>
      <div class="footer-col"><h4>Connect</h4><a href="https://wa.me/256772002326"><i class="fab fa-whatsapp"></i> WhatsApp</a><a href="https://github.com/asiimwe3"><i class="fab fa-github"></i> GitHub</a><a href="https://ug.linkedin.com/in/asiimwe-derick-501755313"><i class="fab fa-linkedin"></i> LinkedIn</a><a href="https://www.facebook.com/p/Dery-Code-61590735268937/"><i class="fab fa-facebook"></i> Facebook</a></div>
    </div>
    <div class="footer-bottom"><p>&copy; 2021–2026 DeryCode Technologies. Founded by Asiimwe Derick.</p></div>
  </footer>
  <a href="https://wa.me/256772002326" class="whatsapp-float" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>`;
}

function buildSchema(schemas) {
  return schemas.map(s => `  <script type="application/ld+json">\n  ${JSON.stringify(s, null, 2)}\n  </script>`).join('\n');
}

function breadcrumbSchema(items) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items.map((item, i) => ({ "@type": "ListItem", "position": i+1, "name": item.name, "item": BASE + item.url })) };
}

function serviceSchema(name, desc) {
  return { "@context": "https://schema.org", "@type": "Service", "serviceType": name, "provider": {"@id": BASE + "/#organization"}, "areaServed": {"@type":"Country","name":"Uganda"}, "description": desc };
}

function faqSchema(faqs) {
  return { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": faqs.map(f => ({ "@type": "Question", "name": f.q, "acceptedAnswer": {"@type": "Answer", "text": f.a} })) };
}

// Build complete page
function page(p) {
  const bc = p.breadcrumbs || [{name:'Home',url:'/'},{name:p.category||'Services',url:'/'+p.path.split('/')[0]+'/index.html'},{name:p.h1,url:'/'+p.path}];
  const schemas = [breadcrumbSchema(bc), { "@context": "https://schema.org", "@graph": [ORG_SCHEMA] }];
  if (p.faqs) schemas.push(faqSchema(p.faqs));
  if (p.serviceType) schemas.push(serviceSchema(p.serviceType, p.desc));

  let body = `
<body>
${buildNav()}
<main class="page-content">
  <div class="container">
    ${buildBreadcrumbs(bc)}
    <h1>${p.h1}</h1>
    <p class="lead">${p.lead || p.desc}</p>`;

  if (p.problem) body += `\n    <section class="content-section"><h2>${p.problem.h}</h2><p>${p.problem.c}</p></section>`;
  
  if (p.features) body += `\n    <section class="content-section"><h2>${p.features.h}</h2><div class="features-grid">${p.features.items.map(f => `<div class="feature-card"><i class="fas ${f.icon}"></i><h3>${f.t}</h3><p>${f.d}</p></div>`).join('')}</div></section>`;
  
  if (p.process) body += `\n    <section class="content-section"><h2>${p.process.h}</h2><div class="process-steps">${p.process.steps.map((s, i) => `<div class="process-step"><span class="step-num">${i+1}</span><h3>${s.t}</h3><p>${s.d}</p></div>`).join('')}</div></section>`;
  
  if (p.useCases) body += `\n    <section class="content-section"><h2>${p.useCases.h}</h2><ul class="use-case-list">${p.useCases.items.map(u => `<li><strong>${u.t}:</strong> ${u.d}</li>`).join('')}</ul></section>`;
  
  if (p.tech) body += `\n    <section class="content-section"><h2>${p.tech.h}</h2><p>${p.tech.c}</p><div class="tech-badges">${p.tech.items.map(t => `<span class="tech-badge">${t}</span>`).join('')}</div></section>`;
  
  if (p.paragraphs) for (const para of p.paragraphs) body += `\n    <section class="content-section"><h2>${para.h}</h2><p>${para.c}</p></section>`;
  
  if (p.links) body += `\n    <section class="content-section"><h2>${p.links.h}</h2><div class="internal-links-grid">${p.links.items.map(l => `<a href="${l.url}" class="internal-link-card"><h3>${l.t}</h3><p>${l.d}</p></a>`).join('')}</div></section>`;
  
  if (p.faqs) body += `\n    <section class="content-section faq-section"><h2>Frequently Asked Questions</h2>${p.faqs.map(f => `<details class="faq-item"><summary>${f.q}</summary><p>${f.a}</p></details>`).join('')}</section>`;
  
  body += `\n    <section class="content-section cta-section"><h2>Ready to Get Started?</h2><p>Contact DeryCode today for a free consultation and quote.</p><a href="https://wa.me/256772002326" class="btn-primary">Get a Free Quote</a></section>`;
  
  body += `\n  </div>\n</main>\n${buildFooter()}\n<script src="/script.js?v=${VER}"></script>\n${GA4}\n</body>\n</html>`;

  return buildHead(p) + '\n' + buildSchema(schemas) + '\n</head>\n' + body;
}

// ── PAGE DEFINITIONS ──

const SERVICES = [
  { path: 'services/software-development.html', h1: 'Software Development Company in Uganda', title: 'Software Development Company Uganda | DeryCode', desc: 'DeryCode is a leading software development company in Uganda building custom software, web apps, mobile apps, and enterprise systems for businesses in Kampala and East Africa.', kw: 'software development company Uganda, software company Kampala, custom software development Uganda, software developers Uganda, IT company Kampala', serviceType: 'Software Development',
    problem: { h: 'The Challenge with Software in Uganda', c: 'Many Ugandan businesses struggle with off-the-shelf software that doesn\'t fit their workflows, manual processes that slow growth, and systems that can\'t integrate with local payment methods like MTN MoMo and Airtel Money. Custom software solves these problems by being built specifically for your business needs and the Ugandan operating environment.' },
    features: { h: 'Our Software Development Services', items: [
      {icon:'fa-code',t:'Custom Software',d:'Bespoke applications built from scratch to match your exact business requirements.'},
      {icon:'fa-cloud',t:'Cloud Applications',d:'Scalable cloud-native software deployed on AWS, Vercel, and other platforms.'},
      {icon:'fa-plug',t:'API Integration',d:'Connect your software with payment gateways, SMS, email, and third-party services.'},
      {icon:'fa-mobile-screen',t:'Cross-Platform',d:'Software that works across web, mobile, and desktop from a single codebase.'},
      {icon:'fa-shield-halved',t:'Security First',d:'Built with security best practices including encryption, RBAC, and audit trails.'},
      {icon:'fa-chart-line',t:'Analytics & Reporting',d:'Real-time dashboards and reports to track performance and make data-driven decisions.'}
    ]},
    tech: { h: 'Technologies We Use', c: 'DeryCode builds software with modern, battle-tested technologies:', items: ['React','Next.js','Node.js','Python','PostgreSQL','Supabase','Firebase','Flutter','React Native','TypeScript','Docker','Solidity'] },
    process: { h: 'Our Development Process', steps: [
      {t:'Discovery',d:'We analyze your business needs, workflows, and technical requirements.'},
      {t:'Planning',d:'Detailed project plan, architecture, and technology stack recommendation.'},
      {t:'Design',d:'UI/UX design with wireframes, prototypes, and user testing.'},
      {t:'Development',d:'Agile development with weekly sprints and regular client reviews.'},
      {t:'Testing',d:'Comprehensive QA testing including unit, integration, and user acceptance.'},
      {t:'Deployment',d:'Production deployment with monitoring, documentation, and team training.'},
      {t:'Support',d:'Ongoing maintenance, updates, and feature enhancements.'}
    ]},
    useCases: { h: 'Who We Build For', items: [
      {t:'SACCOs & Microfinance',d:'Core banking systems, loan management, member portals, and MoMo integration.'},
      {t:'Schools & Universities',d:'School management systems, student portals, e-learning platforms, and fees collection.'},
      {t:'Healthcare',d:'Clinic management, patient records, appointment scheduling, and pharmacy systems.'},
      {t:'Retail & Hospitality',d:'POS systems, inventory management, hotel booking, and restaurant management.'},
      {t:'NGOs & Nonprofits',d:'Donor management, project tracking, M&E systems, and impact reporting.'},
      {t:'Real Estate',d:'Property listings, agent portals, tenant management, and payment tracking.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/web-development.html',t:'Web Development',d:'Professional websites and web applications.'},
      {url:'/services/mobile-app-development.html',t:'Mobile App Development',d:'iOS and Android apps with Flutter and React Native.'},
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'Complete SACCO management systems with MoMo integration.'},
      {url:'/services/erp-software.html',t:'ERP Software',d:'Enterprise resource planning for Ugandan businesses.'},
      {url:'/services/api-development.html',t:'API Development',d:'Custom APIs and payment integrations.'},
      {url:'/services/software-consulting.html',t:'Software Consulting',d:'Technology strategy and digital transformation consulting.'}
    ]},
    faqs: [
      {q:'How much does software development cost in Uganda?',a:'Custom software development in Uganda typically ranges from UGX 2,200,000 for simple applications to UGX 30,000,000+ for enterprise systems.'},
      {q:'How long does software development take?',a:'Most projects take 4–12 weeks. Simple apps can be built in 2–4 weeks, while enterprise systems may take 3–6 months.'},
      {q:'Do you offer maintenance after deployment?',a:'Yes, we provide ongoing maintenance, security updates, and feature enhancements starting from UGX 500,000/month.'},
      {q:'Can you integrate with MTN MoMo and Airtel Money?',a:'Yes, we have extensive experience integrating MTN MoMo API, Airtel Money API, and Pesapal for Ugandan payment processing.'}
    ]
  },

  { path: 'services/custom-software-development.html', h1: 'Custom Software Development in Uganda', title: 'Custom Software Development Uganda | DeryCode', desc: 'Bespoke software development services in Uganda. DeryCode builds custom software solutions tailored to your business needs, from CRM to ERP and beyond.', kw: 'custom software development Uganda, bespoke software Uganda, custom software solutions Uganda, custom software Kampala', serviceType: 'Custom Software Development',
    problem: { h: 'Why Off-the-Shelf Software Falls Short', c: 'Generic software forces your business to adapt to the tool rather than the other way around. Custom software development means the application is built around your exact workflows, data requirements, and growth plans — not a one-size-fits-all template.' },
    features: { h: 'What We Build', items: [
      {icon:'fa-code',t:'Custom CRM Systems',d:'Manage customer relationships with software built around your sales process.'},
      {icon:'fa-database',t:'Custom Databases',d:'Purpose-built data architectures for your specific industry needs.'},
      {icon:'fa-gears',t:'Workflow Automation',d:'Automate repetitive tasks, approvals, and notifications across your organization.'},
      {icon:'fa-chart-line',t:'Custom Dashboards',d:'Real-time business intelligence dashboards with the metrics that matter to you.'},
      {icon:'fa-plug',t:'Third-Party Integrations',d:'Connect with payment gateways, SMS providers, email services, and government APIs.'},
      {icon:'fa-lock',t:'Role-Based Access',d:'Granular permissions so every employee sees only what they need to.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/software-development.html',t:'Software Development',d:'Full-stack software development services.'},
      {url:'/services/erp-software.html',t:'ERP Software',d:'Enterprise resource planning systems.'},
      {url:'/services/api-development.html',t:'API Development',d:'Custom APIs and integrations.'},
      {url:'/pricing/software-development-cost-uganda.html',t:'Software Development Cost',d:'Transparent pricing for custom software.'}
    ]},
    faqs: [
      {q:'What is custom software development?',a:'Custom software development is the process of designing, building, and deploying software specifically for your business needs, as opposed to buying off-the-shelf software.'},
      {q:'Is custom software worth it in Uganda?',a:'For growing businesses with specific workflows, custom software saves time and money long-term. If your team spends hours on manual processes that could be automated, custom software pays for itself.'},
      {q:'How long does custom software take to build?',a:'A custom software project typically takes 6–16 weeks depending on scope, complexity, and number of integrations.'}
    ]
  },

  { path: 'services/web-development.html', h1: 'Web Development Services in Uganda', title: 'Web Development Uganda | DeryCode', desc: 'Professional web development services in Uganda. DeryCode builds fast, SEO-optimized websites, web applications, and e-commerce platforms for Ugandan businesses.', kw: 'web development Uganda, website development Kampala, web developer Uganda, web development company Uganda, web development services Uganda', serviceType: 'Web Development',
    problem: { h: 'Why Your Website Matters in Uganda', c: 'Your website is your digital storefront. In Uganda\'s growing digital economy, customers research online before they buy. A slow, outdated, or non-existent website means lost business — every day.' },
    features: { h: 'Our Web Development Services', items: [
      {icon:'fa-globe',t:'Business Websites',d:'Professional, fast-loading websites that convert visitors into customers.'},
      {icon:'fa-shopping-cart',t:'E-commerce Platforms',d:'Online stores with MoMo integration, inventory, and order management.'},
      {icon:'fa-server',t:'Web Applications',d:'Custom web apps for internal tools, portals, and SaaS products.'},
      {icon:'fa-mobile-screen',t:'Responsive Design',d:'Every site works perfectly on mobile, tablet, and desktop.'},
      {icon:'fa-magnifying-glass',t:'SEO Optimized',d:'Built with search engine optimization from the ground up.'},
      {icon:'fa-bolt',t:'Performance Focused',d:'Sub-second load times with optimized images and code.'}
    ]},
    tech: { h: 'Our Technology Stack', c: 'We use modern, fast, and reliable web technologies:', items: ['HTML5','CSS3','JavaScript','React','Next.js','Node.js','Tailwind CSS','Supabase','PostgreSQL','Vercel'] },
    process: { h: 'Our Web Development Process', steps: [
      {t:'Discovery',d:'We learn about your business, target audience, and goals.'},
      {t:'Design',d:'Wireframes and mockups that match your brand and user needs.'},
      {t:'Development',d:'Clean, semantic code with responsive design.'},
      {t:'Testing',d:'Cross-browser testing, performance optimization, and QA.'},
      {t:'Launch',d:'Deployment with SSL, analytics, and SEO setup.'},
      {t:'Maintenance',d:'Ongoing updates, security patches, and content support.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/web-design.html',t:'Web Design',d:'Beautiful, conversion-focused website design.'},
      {url:'/services/ecommerce-development.html',t:'E-commerce Development',d:'Online stores with payment integration.'},
      {url:'/services/website-maintenance.html',t:'Website Maintenance',d:'Keep your site updated and secure.'},
      {url:'/services/website-hosting.html',t:'Website Hosting',d:'Reliable hosting with SSL and CDN.'},
      {url:'/services/seo-services.html',t:'SEO Services',d:'Rank higher on Google with proven SEO.'},
      {url:'/pricing/website-cost-uganda.html',t:'Website Cost',d:'Transparent pricing for all website types.'}
    ]},
    faqs: [
      {q:'How much does a website cost in Uganda?',a:'Professional business websites in Uganda start from UGX 750,000. E-commerce sites and custom web applications cost more depending on features and complexity.'},
      {q:'How long does website development take?',a:'A typical business website takes 2–4 weeks. E-commerce sites and web applications take 4–8 weeks.'},
      {q:'Do you provide website hosting?',a:'Yes, we provide reliable hosting with SSL certificates, CDN, and daily backups starting from UGX 100,000/year.'},
      {q:'Will my website work on mobile phones?',a:'Absolutely. Every website we build is fully responsive and optimized for mobile devices, which is critical in Uganda where most users browse on phones.'}
    ]
  },

  { path: 'services/web-design.html', h1: 'Web Design Services in Uganda', title: 'Web Design Uganda | DeryCode', desc: 'Professional web design services in Uganda. Beautiful, responsive, conversion-focused websites designed by DeryCode for Ugandan businesses.', kw: 'web design Uganda, website design Uganda, web designer Uganda, website design company Uganda, web design Kampala', serviceType: 'Web Design',
    problem: { h: 'Good Design is Good Business', c: 'In Uganda\'s competitive market, your website\'s design directly impacts whether visitors become customers. Studies show users form an opinion about your website in 0.05 seconds. Professional design builds trust instantly.' },
    features: { h: 'Our Web Design Services', items: [
      {icon:'fa-palette',t:'UI/UX Design',d:'User-centered design that guides visitors toward action.'},
      {icon:'fa-mobile-screen',t:'Responsive Design',d:'Looks great on every device — phones, tablets, desktops.'},
      {icon:'fa-brands',t:'Brand Integration',d:'Designs that reflect your brand identity and values.'},
      {icon:'fa-bolt',t:'Fast Loading',d:'Optimized images and clean code for sub-second load times.'},
      {icon:'fa-magnifying-glass',t:'SEO-Friendly',d:'Semantic HTML and structured data built into every design.'},
      {icon:'fa-hand-pointer',t:'Conversion Focused',d:'Clear CTAs, trust signals, and optimized user journeys.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/web-development.html',t:'Web Development',d:'Full-stack web development services.'},
      {url:'/services/ui-ux-design.html',t:'UI/UX Design',d:'User experience design for digital products.'},
      {url:'/services/branding.html',t:'Branding',d:'Complete brand identity design services.'},
      {url:'/services/logo-design.html',t:'Logo Design',d:'Professional logo design for your business.'},
      {url:'/pricing/website-cost-uganda.html',t:'Website Cost',d:'Transparent website pricing.'}
    ]},
    faqs: [
      {q:'How much does web design cost in Uganda?',a:'Professional web design in Uganda starts from UGX 750,000 for a business website. Custom designs with more pages and features cost more.'},
      {q:'Do you redesign existing websites?',a:'Yes, we offer website redesign services to modernize outdated sites while preserving your SEO rankings and content.'},
      {q:'How long does web design take?',a:'A typical website design takes 1–3 weeks depending on the number of pages and revisions needed.'}
    ]
  },

  { path: 'services/mobile-app-development.html', h1: 'Mobile App Development in Uganda', title: 'Mobile App Development Uganda | DeryCode', desc: 'Custom mobile app development for iOS and Android in Uganda. DeryCode builds React Native and Flutter apps with MoMo integration and offline support.', kw: 'mobile app development Uganda, mobile app developer Uganda, app development Uganda, mobile application development Uganda, Android app development Uganda', serviceType: 'Mobile App Development',
    problem: { h: 'Why Mobile Apps Matter in Uganda', c: 'Uganda has over 25 million mobile phone users. Your customers live on their phones. A mobile app gives you a direct channel to them — with push notifications, offline access, and a better experience than any website.' },
    features: { h: 'Our Mobile App Services', items: [
      {icon:'fa-android',t:'Android App Development',d:'Native-quality Android apps optimized for low-end devices common in Uganda.'},
      {icon:'fa-apple',t:'iOS App Development',d:'iPhone and iPad apps built with Swift and React Native.'},
      {icon:'fa-mobile-screen',t:'Cross-Platform Apps',d:'One codebase, both platforms — saving you 40-50% on development cost.'},
      {icon:'fa-wifi',t:'Offline-First Apps',d:'Apps that work without internet and sync when connectivity returns — critical for rural Uganda.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Integration',d:'Built-in MTN MoMo and Airtel Money payment integration.'},
      {icon:'fa-bell',t:'Push Notifications',d:'Engage users with targeted push notifications and in-app messaging.'}
    ]},
    tech: { h: 'Mobile Technologies We Use', c: 'We build with the best cross-platform and native technologies:', items: ['Flutter','React Native','Dart','TypeScript','Firebase','Supabase','Expo','Android Studio','Xcode'] },
    process: { h: 'Our App Development Process', steps: [
      {t:'Strategy',d:'Define app goals, target users, and key features.'},
      {t:'UI/UX Design',d:'Wireframes, prototypes, and user testing.'},
      {t:'Development',d:'Agile development with Flutter or React Native.'},
      {t:'Testing',d:'Device testing on multiple Android and iOS devices.'},
      {t:'Store Deployment',d:'Play Store and App Store submission and approval.'},
      {t:'Support',d:'Updates, bug fixes, and feature enhancements.'}
    ]},
    useCases: { h: 'Apps We Build', items: [
      {t:'SACCO Mobile Apps',d:'Member portals with savings, loans, and MoMo deposits for SACCOs.'},
      {t:'School Apps',d:'Parent portals, student portals, fees payment, and exam results.'},
      {t:'E-commerce Apps',d:'Online stores with cart, checkout, and MoMo payment.'},
      {t:'Healthcare Apps',d:'Appointment booking, patient records, and pharmacy ordering.'},
      {t:'Logistics Apps',d:'Delivery tracking, fleet management, and route optimization.'},
      {t:'Fintech Apps',d:'Digital wallets, lending platforms, and financial services.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/android-app-development.html',t:'Android App Development',d:'Native Android apps optimized for Ugandan devices.'},
      {url:'/services/ios-app-development.html',t:'iOS App Development',d:'iPhone and iPad apps.'},
      {url:'/services/flutter-development.html',t:'Flutter Development',d:'Cross-platform apps with Flutter.'},
      {url:'/services/react-native-development.html',t:'React Native Development',d:'Cross-platform apps with React Native.'},
      {url:'/services/pwa-development.html',t:'PWA Development',d:'Progressive web apps — no app store needed.'},
      {url:'/pricing/mobile-app-cost-uganda.html',t:'Mobile App Cost',d:'Transparent pricing for app development.'}
    ]},
    faqs: [
      {q:'How much does a mobile app cost in Uganda?',a:'Mobile app development in Uganda starts from UGX 4,400,000 for a cross-platform app. Complex apps with multiple integrations can cost UGX 10,000,000+.'},
      {q:'Should I build for Android or iOS?',a:'In Uganda, Android dominates with 90%+ market share. We recommend starting with Android (or a cross-platform framework like Flutter that covers both) and adding iOS later if needed.'},
      {q:'Do you build offline apps?',a:'Yes, we specialize in offline-first apps using service workers and local databases — essential for rural Uganda with unreliable connectivity.'},
      {q:'Can you integrate MoMo payments in the app?',a:'Absolutely. We have extensive experience integrating MTN MoMo API and Airtel Money API into mobile applications.'}
    ]
  },

  { path: 'services/android-app-development.html', h1: 'Android App Development in Uganda', title: 'Android App Development Uganda | DeryCode', desc: 'Professional Android app development in Uganda. Build fast, lightweight Android apps optimized for low-end devices with MTN MoMo integration.', kw: 'Android app development Uganda, Android developer Uganda, Android app developer Kampala, Play Store app Uganda', serviceType: 'Android App Development',
    problem: { h: 'Android Dominates Uganda', c: 'Over 90% of smartphone users in Uganda use Android devices. Many are low-end devices with limited storage and RAM. Your Android app must be optimized for these constraints while still delivering a great experience.' },
    features: { h: 'Our Android Development Services', items: [
      {icon:'fa-mobile-screen',t:'Native Android Apps',d:'Built with Kotlin and Java for maximum performance.'},
      {icon:'fa-bolt',t:'Lightweight Apps',d:'Optimized for low-end Android devices with small APK sizes.'},
      {icon:'fa-wifi',t:'Offline Support',d:'Apps that work offline and sync when connectivity returns.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Integration',d:'MTN MoMo and Airtel Money payment integration.'},
      {icon:'fa-bell',t:'Push Notifications',d:'Firebase Cloud Messaging for user engagement.'},
      {icon:'fa-google-play',t:'Play Store Deployment',d:'We handle the entire Google Play Store submission process.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/mobile-app-development.html',t:'Mobile App Development',d:'Cross-platform mobile development.'},
      {url:'/services/flutter-development.html',t:'Flutter Development',d:'Build Android apps with Flutter.'},
      {url:'/services/react-native-development.html',t:'React Native',d:'Build Android apps with React Native.'},
      {url:'/pricing/mobile-app-cost-uganda.html',t:'Mobile App Cost',d:'Pricing for Android app development.'}
    ]},
    faqs: [
      {q:'How much does an Android app cost in Uganda?',a:'Android app development starts from UGX 3,500,000 for a basic app. More complex apps with multiple integrations cost UGX 8,000,000+.'},
      {q:'Do you optimize for low-end phones?',a:'Yes, we specifically optimize for Tecno, Itel, and other budget Android devices common in Uganda, keeping APK sizes small and memory usage low.'}
    ]
  },

  { path: 'services/ios-app-development.html', h1: 'iOS App Development in Uganda', title: 'iOS App Development Uganda | DeryCode', desc: 'Custom iOS app development for iPhone and iPad in Uganda. DeryCode builds native-quality iOS apps with Swift and React Native.', kw: 'iOS app development Uganda, iPhone app Uganda, iOS developer Uganda, App Store Uganda', serviceType: 'iOS App Development',
    problem: { h: 'iOS Users are High-Value Customers', c: 'While Android dominates volume in Uganda, iOS users tend to be higher-income and more willing to pay for premium services. An iOS app signals quality and trust.' },
    features: { h: 'Our iOS Development Services', items: [
      {icon:'fa-apple',t:'Native iOS Apps',d:'Built with Swift for maximum performance on iPhone and iPad.'},
      {icon:'fa-mobile-screen',t:'Cross-Platform iOS',d:'React Native apps that run on both iOS and Android.'},
      {icon:'fa-app-store',t:'App Store Deployment',d:'We handle the full App Store submission and review process.'},
      {icon:'fa-bell',t:'Push Notifications',d:'APNs integration for real-time user engagement.'},
      {icon:'fa-shield-halved',t:'Secure by Design',d:'Keychain, Face ID, and secure API communication.'},
      {icon:'fa-tablet-screen-button',t:'iPad Support',d:'Optimized layouts for iPad and iPad Pro.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/mobile-app-development.html',t:'Mobile App Development',d:'Cross-platform mobile development.'},
      {url:'/services/react-native-development.html',t:'React Native Development',d:'Build iOS apps with React Native.'},
      {url:'/services/flutter-development.html',t:'Flutter Development',d:'Build iOS apps with Flutter.'}
    ]},
    faqs: [
      {q:'How much does an iOS app cost in Uganda?',a:'iOS app development starts from UGX 4,400,000. Since most Ugandan businesses target Android first, we typically recommend cross-platform tools like Flutter or React Native to cover both platforms efficiently.'},
      {q:'Do I need a Mac for iOS development?',a:'We handle all iOS development in-house with Mac environments. You don\'t need any Apple hardware — we manage the entire build and deployment process.'}
    ]
  },

  { path: 'services/flutter-development.html', h1: 'Flutter App Development in Uganda', title: 'Flutter Development Uganda | DeryCode', desc: 'Flutter app development in Uganda. Build beautiful, fast cross-platform apps for iOS and Android with a single codebase. DeryCode Flutter experts.', kw: 'Flutter development Uganda, Flutter developer Uganda, Flutter app development Uganda, Dart Uganda, cross-platform Flutter Uganda', serviceType: 'Flutter Development',
    problem: { h: 'Why Flutter Makes Sense in Uganda', c: 'Flutter lets you build one app that runs on Android, iOS, web, and desktop — from a single codebase. For budget-conscious Ugandan businesses, this means getting apps on both platforms for roughly half the cost of building separately.' },
    features: { h: 'Our Flutter Development Services', items: [
      {icon:'fa-mobile-screen',t:'Cross-Platform Apps',d:'One codebase for Android, iOS, web, and desktop.'},
      {icon:'fa-bolt',t:'Fast Performance',d:'Flutter apps run at 60-120fps with native rendering.'},
      {icon:'fa-palette',t:'Beautiful UI',d:'Custom Material Design widgets for stunning interfaces.'},
      {icon:'fa-wifi',t:'Offline Support',d:'Local storage and sync for unreliable connectivity.'},
      {icon:'fa-plug',t:'API Integration',d:'Connect with MoMo, Firebase, Supabase, and more.'},
      {icon:'fa-code',t:'Hot Reload',d:'Faster development with instant code changes.'}
    ]},
    tech: { h: 'Flutter Tech Stack', c: 'We build Flutter apps with:', items: ['Flutter','Dart','Material Design','Firebase','Supabase','REST APIs','Provider','Riverpod'] },
    links: { h: 'Related Services', items: [
      {url:'/services/mobile-app-development.html',t:'Mobile App Development',d:'Full mobile development services.'},
      {url:'/services/react-native-development.html',t:'React Native Development',d:'Compare Flutter vs React Native.'},
      {url:'/services/cross-platform-app-development.html',t:'Cross-Platform Development',d:'All cross-platform options.'},
      {url:'/comparisons/flutter-vs-react-native-uganda.html',t:'Flutter vs React Native',d:'Which is better for your Ugandan project?'}
    ]},
    faqs: [
      {q:'Is Flutter good for app development in Uganda?',a:'Flutter is excellent for Uganda. It reduces development cost by covering both Android and iOS with one codebase, performs well on low-end devices, and supports offline functionality.'},
      {q:'How much does a Flutter app cost in Uganda?',a:'Flutter app development starts from UGX 4,400,000. Since you get both Android and iOS from one build, it\'s significantly cheaper than native development for both platforms.'}
    ]
  },

  { path: 'services/react-native-development.html', h1: 'React Native Development in Uganda', title: 'React Native Development Uganda | DeryCode', desc: 'React Native app development in Uganda. Build cross-platform iOS and Android apps with JavaScript. DeryCode React Native experts in Kampala.', kw: 'React Native development Uganda, React Native developer Uganda, React Native app Uganda, JavaScript app Uganda', serviceType: 'React Native Development',
    problem: { h: 'Why React Native for Ugandan Businesses', c: 'React Native lets you use JavaScript — the most popular programming language — to build native apps for both Android and iOS. For businesses with web developers, this means faster development and easier maintenance.' },
    features: { h: 'Our React Native Services', items: [
      {icon:'fa-mobile-screen',t:'Cross-Platform Apps',d:'One JavaScript codebase for Android and iOS.'},
      {icon:'fa-bolt',t:'Near-Native Performance',d:'Apps that feel native with smooth animations.'},
      {icon:'fa-code',t:'Hot Reloading',d:'See changes instantly during development.'},
      {icon:'fa-plug',t:'Rich Ecosystem',d:'Access to thousands of npm packages and libraries.'},
      {icon:'fa-wifi',t:'Offline Support',d:'Local storage and background sync capabilities.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Integration',d:'MTN MoMo and Airtel Money payment APIs.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/mobile-app-development.html',t:'Mobile App Development',d:'Full mobile development services.'},
      {url:'/services/flutter-development.html',t:'Flutter Development',d:'Compare React Native vs Flutter.'},
      {url:'/comparisons/flutter-vs-react-native-uganda.html',t:'Flutter vs React Native',d:'Detailed comparison for Ugandan projects.'}
    ]},
    faqs: [
      {q:'React Native or Flutter for Uganda?',a:'Both are excellent choices. React Native is better if your team knows JavaScript or you need to share code with a web app. Flutter offers slightly better performance and more consistent UI. We can help you choose based on your specific needs.'},
      {q:'How much does a React Native app cost?',a:'React Native app development starts from UGX 4,400,000 for a cross-platform app. The cost advantage is significant compared to building separate native apps.'}
    ]
  },

  { path: 'services/cross-platform-app-development.html', h1: 'Cross-Platform App Development in Uganda', title: 'Cross-Platform App Development Uganda | DeryCode', desc: 'Cross-platform app development in Uganda. Build once, deploy everywhere — Android, iOS, web. DeryCode uses Flutter and React Native.', kw: 'cross-platform app development Uganda, hybrid app Uganda, multi-platform app Uganda, cross-platform developer Uganda', serviceType: 'Cross-Platform App Development',
    problem: { h: 'The Cross-Platform Advantage', c: 'Building separate native apps for Android and iOS doubles your cost and timeline. Cross-platform development lets you build one app that runs on both — saving 40-50% while reaching 99% of Uganda\'s smartphone users.' },
    features: { h: 'Cross-Platform Options', items: [
      {icon:'fa-mobile-screen',t:'Flutter',d:'Google\'s UI toolkit for beautiful cross-platform apps.'},
      {icon:'fa-code',t:'React Native',d:'Facebook\'s framework using JavaScript.'},
      {icon:'fa-globe',t:'PWA',d:'Progressive Web Apps that work like native apps.'},
      {icon:'fa-tablet-screen-button',t:'Tablet Support',d:'Apps that adapt to phone and tablet layouts.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/flutter-development.html',t:'Flutter Development',d:'Build with Flutter.'},
      {url:'/services/react-native-development.html',t:'React Native Development',d:'Build with React Native.'},
      {url:'/services/pwa-development.html',t:'PWA Development',d:'Progressive Web Apps.'},
      {url:'/comparisons/flutter-vs-react-native-uganda.html',t:'Flutter vs React Native',d:'Which framework is right for you?'}
    ]},
    faqs: [
      {q:'What is cross-platform app development?',a:'Cross-platform development means building one app that runs on both Android and iOS (and sometimes web) from a single codebase, instead of building separate native apps.'},
      {q:'Is cross-platform as good as native?',a:'For most business apps, yes. Modern frameworks like Flutter and React Native deliver near-native performance. For graphics-intensive games or AR apps, native might still be better.'}
    ]
  },

  { path: 'services/pwa-development.html', h1: 'Progressive Web App (PWA) Development in Uganda', title: 'PWA Development Uganda | DeryCode', desc: 'Progressive Web App development in Uganda. Build offline-capable, installable web apps that work like native apps without app store friction.', kw: 'PWA development Uganda, progressive web app Uganda, offline app Uganda, installable web app Uganda', serviceType: 'PWA Development',
    problem: { h: 'Why PWAs Are Perfect for Uganda', c: 'PWAs work offline, install on the home screen, and don\'t need the Play Store. For Uganda\'s mobile users with limited data and storage, PWAs deliver app-like experiences at website prices.' },
    features: { h: 'PWA Features', items: [
      {icon:'fa-wifi',t:'Offline First',d:'Service workers cache content for offline use.'},
      {icon:'fa-mobile-screen',t:'Installable',d:'Users can install to home screen without an app store.'},
      {icon:'fa-bolt',t:'Fast Loading',d:'Instant loading with cached resources.'},
      {icon:'fa-bell',t:'Push Notifications',d:'Re-engage users with push notifications.'},
      {icon:'fa-database',t:'Local Storage',d:'Store data locally and sync when online.'},
      {icon:'fa-money-bill',t:'Low Data Usage',d:'Caching reduces data costs for users.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/web-development.html',t:'Web Development',d:'Full web development services.'},
      {url:'/services/mobile-app-development.html',t:'Mobile App Development',d:'Native mobile app development.'},
      {url:'/services/cross-platform-app-development.html',t:'Cross-Platform',d:'All cross-platform options.'}
    ]},
    faqs: [
      {q:'What is a Progressive Web App?',a:'A PWA is a website that behaves like a native app — it can be installed on a phone\'s home screen, work offline, send push notifications, and load instantly, all without needing an app store.'},
      {q:'Should I build a PWA or a native app?',a:'For most Ugandan businesses, a PWA is the best starting point. It costs less, reaches all users immediately, and works on low-end devices. You can always add a native app later.'}
    ]
  },

  // ── AI & Automation ──
  { path: 'services/ai-development.html', h1: 'AI Development Services in Uganda', title: 'AI Development Uganda | DeryCode', desc: 'AI development services in Uganda. DeryCode builds AI chatbots, agents, automation systems, and ML solutions for Ugandan businesses.', kw: 'AI development Uganda, AI company Uganda, artificial intelligence Uganda, AI solutions Uganda, AI developer Uganda', serviceType: 'AI Development',
    problem: { h: 'AI is Transforming Business in Uganda', c: 'AI is no longer just for big tech companies. Ugandan businesses are using AI to automate customer service, analyze data, detect fraud, and make smarter decisions. DeryCode makes AI accessible and practical for your business.' },
    features: { h: 'Our AI Development Services', items: [
      {icon:'fa-robot',t:'AI Chatbots',d:'Intelligent chatbots for customer service on WhatsApp, web, and mobile.'},
      {icon:'fa-brain',t:'AI Agents',d:'Autonomous agents that handle complex tasks and workflows.'},
      {icon:'fa-gears',t:'Business Automation',d:'Automate repetitive tasks with AI-powered workflows.'},
      {icon:'fa-chart-line',t:'AI Analytics',d:'Predictive analytics and insights from your business data.'},
      {icon:'fa-file-lines',t:'Document Processing',d:'AI-powered OCR and document data extraction.'},
      {icon:'fa-plug',t:'AI Integration',d:'Integrate OpenAI, Gemini, and other AI APIs into your systems.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/ai-chatbots.html',t:'AI Chatbots',d:'Build intelligent customer service chatbots.'},
      {url:'/services/ai-agents.html',t:'AI Agents',d:'Autonomous AI agents for business workflows.'},
      {url:'/services/business-automation.html',t:'Business Automation',d:'Automate your business processes.'},
      {url:'/services/whatsapp-automation.html',t:'WhatsApp Automation',d:'AI-powered WhatsApp bots.'},
      {url:'/services/whatsapp-business-api.html',t:'WhatsApp Business API',d:'Official WhatsApp Business API integration.'}
    ]},
    faqs: [
      {q:'How much does AI development cost in Uganda?',a:'AI development costs vary widely. A chatbot might start from UGX 2,500,000, while a custom ML model could be UGX 10,000,000+. We provide detailed quotes after understanding your requirements.'},
      {q:'Can AI work with limited internet in Uganda?',a:'Yes. We design AI solutions that can work with intermittent connectivity, using local processing where possible and cloud APIs when available.'},
      {q:'What AI technologies do you use?',a:'We work with OpenAI GPT, Google Gemini, Anthropic Claude, open-source models like Llama, and custom ML models using Python, TensorFlow, and PyTorch.'}
    ]
  },

  { path: 'services/ai-chatbots.html', h1: 'AI Chatbot Development in Uganda', title: 'AI Chatbots Uganda | DeryCode', desc: 'AI chatbot development in Uganda. Build intelligent WhatsApp chatbots, web chatbots, and customer service bots powered by AI. DeryCode chatbot experts.', kw: 'AI chatbots Uganda, chatbot development Uganda, AI chatbot Kampala, WhatsApp chatbot Uganda, customer service bot Uganda', serviceType: 'AI Chatbot Development',
    problem: { h: 'Why Your Business Needs an AI Chatbot', c: 'Customers expect instant responses 24/7. In Uganda, where WhatsApp is the primary communication channel, an AI chatbot can handle thousands of conversations simultaneously — answering FAQs, qualifying leads, and processing orders while you sleep.' },
    features: { h: 'Our AI Chatbot Services', items: [
      {icon:'fa-brands fa-whatsapp',t:'WhatsApp Chatbots',d:'AI-powered bots on WhatsApp Business API.'},
      {icon:'fa-globe',t:'Web Chatbots',d:'Intelligent chatbots for your website.'},
      {icon:'fa-phone',t:'USSD Bots',d:'Interactive USSD for feature phone users.'},
      {icon:'fa-language',t:'Multi-Language',d:'Bots that understand English, Luganda, Runyoro, and more.'},
      {icon:'fa-plug',t:'API Integration',d:'Connect bots to your CRM, database, and payment systems.'},
      {icon:'fa-chart-bar',t:'Analytics Dashboard',d:'Track conversations, satisfaction, and conversions.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/ai-development.html',t:'AI Development',d:'Full AI development services.'},
      {url:'/services/whatsapp-automation.html',t:'WhatsApp Automation',d:'Automate WhatsApp business.'},
      {url:'/services/whatsapp-business-api.html',t:'WhatsApp Business API',d:'Official WhatsApp API integration.'},
      {url:'/services/ai-customer-service.html',t:'AI Customer Service',d:'AI-powered support systems.'}
    ]},
    faqs: [
      {q:'How much does an AI chatbot cost in Uganda?',a:'AI chatbot development starts from UGX 2,500,000 for a basic FAQ bot. More advanced bots with API integrations and multi-language support cost UGX 5,000,000+.'},
      {q:'Can the chatbot understand Luganda?',a:'Yes, we build chatbots that understand and respond in English, Luganda, Runyoro, Rutooro, and other Ugandan languages using modern AI models.'},
      {q:'Can the chatbot process payments?',a:'Yes, we can integrate MTN MoMo, Airtel Money, and card payments so your chatbot can collect payments directly in the conversation.'}
    ]
  },

  { path: 'services/ai-agents.html', h1: 'AI Agent Development in Uganda', title: 'AI Agents Uganda | DeryCode', desc: 'AI agent development in Uganda. Build autonomous AI agents that handle complex business tasks, workflows, and decisions. DeryCode AI agent experts.', kw: 'AI agents Uganda, AI agent development Uganda, autonomous AI Uganda, intelligent agents Uganda', serviceType: 'AI Agent Development',
    problem: { h: 'From Chatbots to AI Agents', c: 'AI chatbots answer questions. AI agents do things. They can research, analyze, draft emails, update databases, and make decisions within defined parameters. For Ugandan businesses, this means automating entire workflows — not just conversations.' },
    features: { h: 'AI Agent Capabilities', items: [
      {icon:'fa-robot',t:'Task Automation',d:'Agents that execute multi-step tasks autonomously.'},
      {icon:'fa-database',t:'Data Operations',d:'Read, write, and update your business databases.'},
      {icon:'fa-envelope',t:'Communication',d:'Draft and send emails, messages, and reports.'},
      {icon:'fa-magnifying-glass',t:'Research',d:'Gather information from web and internal sources.'},
      {icon:'fa-gears',t:'Workflow Orchestration',d:'Coordinate complex multi-system workflows.'},
      {icon:'fa-shield-halved',t:'Guardrails',d:'Defined boundaries and human-in-the-loop approval.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/ai-development.html',t:'AI Development',d:'Full AI development services.'},
      {url:'/services/business-automation.html',t:'Business Automation',d:'Automate business processes.'},
      {url:'/services/ai-chatbots.html',t:'AI Chatbots',d:'Conversational AI bots.'}
    ]},
    faqs: [
      {q:'What is an AI agent?',a:'An AI agent is a software program that uses artificial intelligence to autonomously perform tasks — not just answering questions, but taking actions like updating records, sending messages, and making decisions within defined rules.'},
      {q:'How is an AI agent different from a chatbot?',a:'A chatbot converses with users. An AI agent takes action — it can update your CRM, send emails, generate reports, and coordinate workflows, all autonomously.'}
    ]
  },

  { path: 'services/business-automation.html', h1: 'Business Automation Services in Uganda', title: 'Business Automation Uganda | DeryCode', desc: 'Business automation services in Uganda. Automate repetitive tasks, streamline workflows, and save time with DeryCode\'s automation solutions.', kw: 'business automation Uganda, workflow automation Uganda, process automation Uganda, business process automation Uganda', serviceType: 'Business Automation',
    problem: { h: 'Stop Wasting Time on Manual Tasks', c: 'Every hour your team spends on data entry, report generation, or manual follow-ups is an hour they could spend on growth. Business automation frees your team from repetitive tasks and lets them focus on what matters.' },
    features: { h: 'What We Automate', items: [
      {icon:'fa-file-invoice',t:'Report Generation',d:'Automatically generate and distribute business reports.'},
      {icon:'fa-envelope',t:'Email Automation',d:'Automated email sequences, reminders, and notifications.'},
      {icon:'fa-mobile-money-bill',t:'Payment Processing',d:'Automate invoicing, payment reminders, and reconciliation.'},
      {icon:'fa-database',t:'Data Entry',d:'Eliminate manual data entry with automated data pipelines.'},
      {icon:'fa-people-group',t:'HR Automation',d:'Automate onboarding, leave tracking, and payroll.'},
      {icon:'fa-brands fa-whatsapp',t:'WhatsApp Automation',d:'Automated WhatsApp messages for customers and teams.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/ai-development.html',t:'AI Development',d:'AI-powered automation solutions.'},
      {url:'/services/whatsapp-automation.html',t:'WhatsApp Automation',d:'Automate WhatsApp business.'},
      {url:'/services/ai-agents.html',t:'AI Agents',d:'Autonomous AI task agents.'}
    ]},
    faqs: [
      {q:'How much does business automation cost in Uganda?',a:'Business automation projects start from UGX 1,500,000 for simple workflows. Complex multi-system automations cost more. We start with a free audit to identify your highest-ROI automation opportunities.'},
      {q:'What can I automate in my business?',a:'Common automations include: report generation, email sequences, invoice reminders, data sync between systems, social media posting, WhatsApp customer follow-ups, and employee onboarding.'}
    ]
  },

  { path: 'services/whatsapp-automation.html', h1: 'WhatsApp Automation in Uganda', title: 'WhatsApp Automation Uganda | DeryCode', desc: 'WhatsApp automation services in Uganda. Build WhatsApp bots, automated messages, and customer engagement flows. DeryCode WhatsApp automation experts.', kw: 'WhatsApp automation Uganda, WhatsApp bot Uganda, WhatsApp automation bot Uganda, WhatsApp business automation Uganda', serviceType: 'WhatsApp Automation',
    problem: { h: 'WhatsApp is Uganda\'s #1 Messaging App', c: 'With over 15 million WhatsApp users in Uganda, it\'s where your customers already are. WhatsApp automation lets you engage them instantly — send automated replies, process orders, collect payments, and provide 24/7 support.' },
    features: { h: 'WhatsApp Automation Features', items: [
      {icon:'fa-brands fa-whatsapp',t:'Auto-Reply Bots',d:'Instant automated responses to customer messages.'},
      {icon:'fa-bullhorn',t:'Broadcast Messages',d:'Send targeted broadcasts to your contact list.'},
      {icon:'fa-mobile-money-bill',t:'Payment Collection',d:'Collect MoMo payments directly in WhatsApp.'},
      {icon:'fa-list-check',t:'Order Processing',d:'Automated order taking and confirmation flows.'},
      {icon:'fa-calendar-check',t:'Appointment Booking',d:'Let customers book appointments via WhatsApp.'},
      {icon:'fa-chart-bar',t:'Analytics',d:'Track message open rates, responses, and conversions.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/whatsapp-business-api.html',t:'WhatsApp Business API',d:'Official WhatsApp Business API integration.'},
      {url:'/services/ai-chatbots.html',t:'AI Chatbots',d:'AI-powered WhatsApp chatbots.'},
      {url:'/services/business-automation.html',t:'Business Automation',d:'General business automation.'}
    ]},
    faqs: [
      {q:'How much does WhatsApp automation cost in Uganda?',a:'WhatsApp automation setup starts from UGX 1,500,000. Monthly costs include WhatsApp Business API fees (from $15/month) and our maintenance fee.'},
      {q:'Is WhatsApp automation legal in Uganda?',a:'Yes, when using the official WhatsApp Business API. We only use authorized methods and follow WhatsApp\'s commerce and messaging policies.'},
      {q:'Can I send bulk messages on WhatsApp?',a:'Yes, through WhatsApp Business API broadcast messaging. However, WhatsApp has rules about who you can message — users must opt in. We help you set this up correctly.'}
    ]
  },

  { path: 'services/whatsapp-business-api.html', h1: 'WhatsApp Business API Integration in Uganda', title: 'WhatsApp Business API Uganda | DeryCode', desc: 'WhatsApp Business API integration in Uganda. Connect your business to WhatsApp officially with DeryCode. Send messages, automate replies, collect payments.', kw: 'WhatsApp Business API Uganda, WhatsApp API Uganda, WhatsApp API integration Uganda, WhatsApp Business integration Uganda', serviceType: 'WhatsApp Business API Integration',
    problem: { h: 'Why Official WhatsApp Business API?', c: 'Unofficial WhatsApp tools get your number banned. The WhatsApp Business API is the official, Meta-approved way to use WhatsApp for business — with higher messaging limits, automation capabilities, and verified badges.' },
    features: { h: 'WhatsApp Business API Features', items: [
      {icon:'fa-badge-check',t:'Verified Business',d:'Green checkmark and official business profile.'},
      {icon:'fa-robot',t:'Automated Responses',d:'Chatbots and auto-reply on WhatsApp.'},
      {icon:'fa-mobile-money-bill',t:'Payment Links',d:'Send payment links and collect MoMo in WhatsApp.'},
      {icon:'fa-list',t:'Rich Messages',d:'Send images, documents, catalogs, and buttons.'},
      {icon:'fa-chart-bar',t:'Webhooks',d:'Real-time message status and event webhooks.'},
      {icon:'fa-plug',t:'CRM Integration',d:'Connect WhatsApp to your CRM and database.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/whatsapp-automation.html',t:'WhatsApp Automation',d:'Automate WhatsApp business.'},
      {url:'/services/ai-chatbots.html',t:'AI Chatbots',d:'AI-powered WhatsApp bots.'},
      {url:'/services/api-development.html',t:'API Development',d:'Custom API development services.'}
    ]},
    faqs: [
      {q:'How do I get WhatsApp Business API in Uganda?',a:'You need to apply through a WhatsApp Business Solution Provider (BSP). DeryCode helps you set up the entire process — business verification, API access, number registration, and integration.'},
      {q:'How much does WhatsApp Business API cost?',a:'WhatsApp Business API has per-message pricing from Meta (approximately $0.05 per conversation in Uganda), plus our integration fee starting from UGX 1,500,000.'},
      {q:'Can I use my existing WhatsApp number?',a:'Yes, you can migrate your existing number to WhatsApp Business API, but you\'ll need to re-register it. We handle this process for you.'}
    ]
  },

  // ── Blockchain ──
  { path: 'services/blockchain-development.html', h1: 'Blockchain Development in Uganda', title: 'Blockchain Development Uganda | DeryCode', desc: 'Blockchain development services in Uganda. DeryCode builds smart contracts, DeFi protocols, NFT marketplaces, and blockchain applications. Solidity experts.', kw: 'blockchain development Uganda, blockchain company Uganda, blockchain developer Uganda, blockchain solutions Uganda', serviceType: 'Blockchain Development',
    problem: { h: 'Blockchain for Ugandan Business', c: 'Blockchain offers transparency, security, and decentralization — solving real problems in Uganda\'s financial, agricultural, and supply chain sectors. From SACCO savings pools to transparent land registries, blockchain creates trust in low-trust environments.' },
    features: { h: 'Our Blockchain Services', items: [
      {icon:'fa-file-contract',t:'Smart Contracts',d:'Solidity smart contract development and audit.'},
      {icon:'fa-coins',t:'Token Development',d:'ERC-20 token creation and tokenomics design.'},
      {icon:'fa-diamond',t:'NFT Marketplaces',d:'NFT marketplace platforms for digital assets.'},
      {icon:'fa-university',t:'DeFi Protocols',d:'Decentralized lending, borrowing, and savings.'},
      {icon:'fa-wallet',t:'Crypto Wallets',d:'Secure wallet applications with MoMo on/off ramps.'},
      {icon:'fa-link',t:'Supply Chain',d:'Blockchain-based tracking and provenance.'}
    ]},
    tech: { h: 'Blockchain Technologies', c: 'We work with leading blockchain platforms:', items: ['Ethereum','Polygon','BSC','Solidity','Web3.js','Ethers.js','Hardhat','IPFS','Chainlink'] },
    links: { h: 'Related Services', items: [
      {url:'/services/smart-contract-development.html',t:'Smart Contract Development',d:'Solidity smart contract services.'},
      {url:'/services/web3-development.html',t:'Web3 Development',d:'Decentralized application development.'},
      {url:'/services/token-development.html',t:'Token Development',d:'Crypto token creation.'},
      {url:'/services/defi-development.html',t:'DeFi Development',d:'Decentralized finance protocols.'},
      {url:'/products/derycoin.html',t:'DeryCoin',d:'Our blockchain token project.'}
    ]},
    faqs: [
      {q:'How much does blockchain development cost in Uganda?',a:'Blockchain development starts from UGX 5,500,000 for smart contracts. Complex DeFi protocols or marketplaces can cost UGX 15,000,000+.'},
      {q:'Is blockchain legal in Uganda?',a:'Blockchain technology itself is legal. The Bank of Uganda has issued guidance on cryptocurrencies. We ensure all our solutions comply with current Ugandan regulations.'},
      {q:'Which blockchain do you recommend?',a:'For most Ugandan use cases, we recommend Polygon or BSC due to low gas fees and fast transactions. Ethereum mainnet is used when maximum security and decentralization are required.'}
    ]
  },

  { path: 'services/web3-development.html', h1: 'Web3 Development in Uganda', title: 'Web3 Development Uganda | DeryCode', desc: 'Web3 development in Uganda. DeryCode builds decentralized applications (dApps), Web3 integrations, and blockchain-connected web platforms.', kw: 'Web3 development Uganda, Web3 Uganda, Web3 developer Uganda, decentralized app Uganda, dApp Uganda', serviceType: 'Web3 Development',
    problem: { h: 'The Web3 Revolution in Uganda', c: 'Web3 represents the next evolution of the internet — one where users own their data, transactions are transparent, and middlemen are replaced by smart contracts. For Uganda, this means new opportunities in finance, governance, and digital ownership.' },
    features: { h: 'Web3 Services', items: [
      {icon:'fa-globe',t:'dApp Development',d:'Decentralized applications with Web3.js integration.'},
      {icon:'fa-wallet',t:'Wallet Integration',d:'MetaMask, WalletConnect, and custom wallet solutions.'},
      {icon:'fa-plug',t:'Smart Contract Integration',d:'Connect web apps to Ethereum, Polygon, BSC.'},
      {icon:'fa-database',t:'IPFS Storage',d:'Decentralized file storage with IPFS and Arweave.'},
      {icon:'fa-diamond',t:'NFT Integration',d:'NFT minting, listing, and marketplace features.'},
      {icon:'fa-exchange',t:'DeFi Interfaces',d:'User interfaces for DeFi protocols.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/blockchain-development.html',t:'Blockchain Development',d:'Full blockchain services.'},
      {url:'/services/smart-contract-development.html',t:'Smart Contracts',d:'Solidity development.'},
      {url:'/services/token-development.html',t:'Token Development',d:'Crypto token creation.'}
    ]},
    faqs: [
      {q:'What is Web3?',a:'Web3 refers to decentralized web applications that run on blockchain networks. Instead of a central server controlling your data, smart contracts and decentralized protocols manage transactions and data ownership.'},
      {q:'How much does Web3 development cost?',a:'Web3 development starts from UGX 5,500,000. The cost depends on the complexity of smart contracts, blockchain integrations, and user interface requirements.'}
    ]
  },

  { path: 'services/smart-contract-development.html', h1: 'Smart Contract Development in Uganda', title: 'Smart Contract Development Uganda | DeryCode', desc: 'Solidity smart contract development, audit, and deployment in Uganda. DeryCode builds secure smart contracts on Ethereum, Polygon, and BSC.', kw: 'smart contract development Uganda, Solidity Uganda, smart contract audit Uganda, smart contracts Uganda', serviceType: 'Smart Contract Development',
    problem: { h: 'Smart Contracts Automate Trust', c: 'Smart contracts are self-executing agreements on the blockchain. They automatically enforce rules without intermediaries — perfect for Uganda\'s SACCOs, escrow services, and transparent supply chains.' },
    features: { h: 'Smart Contract Services', items: [
      {icon:'fa-file-contract',t:'Custom Smart Contracts',d:'Solidity contracts built for your specific use case.'},
      {icon:'fa-shield-halved',t:'Security Audits',d:'Comprehensive code review for vulnerabilities.'},
      {icon:'fa-rocket',t:'Deployment',d:'Contract deployment on Ethereum, Polygon, BSC.'},
      {icon:'fa-gears',t:'Upgradable Contracts',d:'Contracts that can be upgraded without losing state.'},
      {icon:'fa-plug',t:'Oracle Integration',d:'Chainlink oracles for real-world data.'},
      {icon:'fa-vial',t:'Testing',d:'Comprehensive unit and integration testing.'}
    ]},
    tech: { h: 'Smart Contract Stack', c: 'We use industry-standard tools:', items: ['Solidity','Hardhat','Foundry','OpenZeppelin','Ethers.js','Remix','Chainlink'] },
    links: { h: 'Related Services', items: [
      {url:'/services/blockchain-development.html',t:'Blockchain Development',d:'Full blockchain services.'},
      {url:'/services/web3-development.html',t:'Web3 Development',d:'Decentralized applications.'},
      {url:'/services/defi-development.html',t:'DeFi Development',d:'DeFi protocols.'},
      {url:'/services/token-development.html',t:'Token Development',d:'Crypto tokens.'}
    ]},
    faqs: [
      {q:'How much does a smart contract cost in Uganda?',a:'Smart contract development starts from UGX 5,500,000 for a basic contract. Complex contracts with security audits cost UGX 10,000,000+.'},
      {q:'Are smart contracts secure?',a:'When properly developed and audited, yes. We follow OpenZeppelin standards, use extensive testing, and recommend security audits before mainnet deployment.'}
    ]
  },

  { path: 'services/token-development.html', h1: 'Crypto Token Development in Uganda', title: 'Token Development Uganda | DeryCode', desc: 'Crypto token development in Uganda. Create ERC-20 tokens, utility tokens, and governance tokens with DeryCode. Solidity experts in Kampala.', kw: 'token development Uganda, crypto token Uganda, ERC-20 Uganda, token creation Uganda, tokenomics Uganda', serviceType: 'Token Development',
    problem: { h: 'Tokens Enable New Business Models', c: 'Crypto tokens can represent ownership, rewards, access rights, or governance power. For Ugandan businesses, tokens offer new ways to engage customers, raise capital, and build community-driven platforms.' },
    features: { h: 'Token Development Services', items: [
      {icon:'fa-coins',t:'ERC-20 Tokens',d:'Standard fungible tokens on Ethereum, Polygon, BSC.'},
      {icon:'fa-diamond',t:'NFT Tokens',d:'Non-fungible tokens for unique digital assets.'},
      {icon:'fa-chart-pie',t:'Tokenomics Design',d:'Supply, distribution, and utility strategy.'},
      {icon:'fa-shield-halved',t:'Security',d:'Audited, secure contract implementation.'},
      {icon:'fa-wallet',t:'Wallet Integration',d:'Token support in wallets and exchanges.'},
      {icon:'fa-file-lines',t:'Whitepaper Support',d:'Technical documentation for your token.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/blockchain-development.html',t:'Blockchain Development',d:'Full blockchain services.'},
      {url:'/services/smart-contract-development.html',t:'Smart Contracts',d:'Solidity contract development.'},
      {url:'/services/defi-development.html',t:'DeFi Development',d:'DeFi protocols.'},
      {url:'/products/derycoin.html',t:'DeryCoin',d:'Our community token project.'}
    ]},
    faqs: [
      {q:'How much does it cost to create a crypto token in Uganda?',a:'Token development starts from UGX 6,000,000. This includes smart contract creation, testing, deployment, and basic wallet integration.'},
      {q:'Is it legal to create a token in Uganda?',a:'Creating utility tokens is generally permissible. However, tokens that function as securities may require regulatory approval. We recommend legal consultation and can connect you with Ugandan legal advisors.'}
    ]
  },

  { path: 'services/defi-development.html', h1: 'DeFi Development in Uganda', title: 'DeFi Development Uganda | DeryCode', desc: 'DeFi (decentralized finance) development in Uganda. Build lending platforms, savings pools, and DeFi protocols. DeryCode DeFi experts.', kw: 'DeFi development Uganda, DeFi Uganda, decentralized finance Uganda, DeFi protocol Uganda, DeFi platform Uganda', serviceType: 'DeFi Development',
    problem: { h: 'DeFi for Financial Inclusion', c: 'DeFi protocols enable lending, borrowing, and savings without traditional banks. For Uganda, where many people are unbanked but have mobile phones, DeFi offers a path to financial inclusion powered by blockchain.' },
    features: { h: 'DeFi Services', items: [
      {icon:'fa-university',t:'Lending Platforms',d:'Peer-to-peer lending protocols with automated interest rates.'},
      {icon:'fa-piggy-bank',t:'Savings Pools',d:'Community savings pools similar to SACCOs but on-chain.'},
      {icon:'fa-exchange',t:'DEX Development',d:'Decentralized exchange interfaces.'},
      {icon:'fa-coins',t:'Yield Farming',d:'Staking and yield farming smart contracts.'},
      {icon:'fa-chart-pie',t:'Tokenomics',d:'Economic model design for DeFi protocols.'},
      {icon:'fa-shield-halved',t:'Security Audits',d:'Critical security review for DeFi protocols.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/blockchain-development.html',t:'Blockchain Development',d:'Full blockchain services.'},
      {url:'/services/smart-contract-development.html',t:'Smart Contracts',d:'Solidity development.'},
      {url:'/services/fintech-software.html',t:'Fintech Software',d:'Traditional fintech development.'},
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'Traditional SACCO systems.'}
    ]},
    faqs: [
      {q:'How much does DeFi development cost?',a:'DeFi development starts from UGX 8,000,000. Security is critical in DeFi, so we include comprehensive auditing in all projects.'},
      {q:'Can DeFi work with mobile money in Uganda?',a:'Yes. We build bridges between DeFi protocols and mobile money APIs (MTN MoMo, Airtel Money) so users can enter and exit DeFi positions using local payment methods.'}
    ]
  },

  { path: 'services/nft-marketplace-development.html', h1: 'NFT Marketplace Development in Uganda', title: 'NFT Marketplace Uganda | DeryCode', desc: 'NFT marketplace development in Uganda. Build platforms for minting, buying, and selling NFTs. DeryCode NFT experts in Kampala.', kw: 'NFT marketplace Uganda, NFT platform Uganda, NFT development Uganda, NFT Uganda', serviceType: 'NFT Marketplace Development',
    features: { h: 'NFT Marketplace Features', items: [
      {icon:'fa-diamond',t:'Minting Platform',d:'Users can mint NFTs from images, videos, or documents.'},
      {icon:'fa-store',t:'Marketplace',d:'Buy, sell, and auction NFTs.'},
      {icon:'fa-wallet',t:'Wallet Integration',d:'MetaMask, WalletConnect, and custom wallets.'},
      {icon:'fa-tag',t:'Royalty System',d:'Automatic creator royalties on secondary sales.'},
      {icon:'fa-mobile-screen',t:'Mobile Support',d:'Mobile-friendly marketplace interface.'},
      {icon:'fa-database',t:'IPFS Storage',d:'Decentralized metadata and asset storage.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/blockchain-development.html',t:'Blockchain Development',d:'Full blockchain services.'},
      {url:'/services/web3-development.html',t:'Web3 Development',d:'Decentralized apps.'},
      {url:'/services/token-development.html',t:'Token Development',d:'Crypto tokens.'}
    ]},
    faqs: [
      {q:'How much does an NFT marketplace cost?',a:'NFT marketplace development starts from UGX 7,000,000. Cost depends on features like auctions, lazy minting, and multi-chain support.'}
    ]
  },

  { path: 'services/crypto-development.html', h1: 'Cryptocurrency Development in Uganda', title: 'Crypto Development Uganda | DeryCode', desc: 'Cryptocurrency development in Uganda. Build crypto wallets, exchanges, and payment systems. DeryCode cryptocurrency development experts.', kw: 'crypto development Uganda, cryptocurrency Uganda, crypto wallet Uganda, crypto developer Uganda', serviceType: 'Cryptocurrency Development',
    features: { h: 'Crypto Development Services', items: [
      {icon:'fa-wallet',t:'Crypto Wallets',d:'Mobile and web wallets with MoMo integration.'},
      {icon:'fa-exchange',t:'Exchange Development',d:'Crypto exchange platforms.'},
      {icon:'fa-coins',t:'Token Creation',d:'Create custom tokens and cryptocurrencies.'},
      {icon:'fa-mobile-money-bill',t:'Payment Gateways',d:'Accept crypto payments in your business.'},
      {icon:'fa-chart-line',t:'Trading Interfaces',d:'Trading dashboards and chart tools.'},
      {icon:'fa-shield-halved',t:'Security',d:'Multi-sig wallets and secure key management.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/blockchain-development.html',t:'Blockchain Development',d:'Full blockchain services.'},
      {url:'/services/token-development.html',t:'Token Development',d:'Token creation services.'},
      {url:'/products/derycoin.html',t:'DeryCoin',d:'Our blockchain token project.'}
    ]},
    faqs: [
      {q:'How much does crypto development cost?',a:'Crypto wallet development starts from UGX 5,000,000. Exchange platforms cost UGX 15,000,000+ due to security requirements.'}
    ]
  },

  // ── Fintech ──
  { path: 'services/fintech-software.html', h1: 'Fintech Software Development in Uganda', title: 'Fintech Software Uganda | DeryCode', desc: 'Fintech software development in Uganda. DeryCode builds digital wallets, payment systems, lending platforms, and banking software with MoMo integration.', kw: 'fintech software Uganda, fintech development Uganda, fintech company Uganda, fintech solutions Uganda, financial technology Uganda', serviceType: 'Fintech Software Development',
    problem: { h: 'Fintech is Booming in Uganda', c: 'Uganda\'s fintech sector is growing rapidly, driven by mobile money penetration, increasing smartphone adoption, and a large unbanked population. DeryCode builds the software that powers this transformation.' },
    features: { h: 'Fintech Solutions We Build', items: [
      {icon:'fa-wallet',t:'Digital Wallets',d:'Mobile wallet apps with MoMo, cards, and crypto support.'},
      {icon:'fa-mobile-money-bill',t:'Payment Gateways',d:'Accept and process payments via MoMo, cards, and bank transfers.'},
      {icon:'fa-piggy-bank',t:'Lending Platforms',d:'Digital lending with automated credit scoring and disbursement.'},
      {icon:'fa-university',t:'SACCO Software',d:'Complete SACCO management systems with MoMo integration.'},
      {icon:'fa-chart-line',t:'Financial Analytics',d:'Real-time dashboards for financial operations.'},
      {icon:'fa-shield-halved',t:'Fraud Detection',d:'AI-powered fraud detection and prevention.'}
    ]},
    tech: { h: 'Fintech Stack', c: 'We build fintech solutions with:', items: ['React','Node.js','PostgreSQL','Supabase','Firebase','MTN MoMo API','Airtel Money API','Pesapal','Stripe','Flutterwave'] },
    links: { h: 'Related Services', items: [
      {url:'/services/payment-integration.html',t:'Payment Integration',d:'MoMo, Pesapal, and payment gateway integration.'},
      {url:'/services/mobile-money-integration.html',t:'Mobile Money Integration',d:'MTN MoMo and Airtel Money APIs.'},
      {url:'/services/loan-management.html',t:'Loan Management',d:'Loan management systems.'},
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'SACCO management systems.'},
      {url:'/services/digital-wallet.html',t:'Digital Wallets',d:'Digital wallet development.'},
      {url:'/services/digital-banking.html',t:'Digital Banking',d:'Digital banking solutions.'}
    ]},
    faqs: [
      {q:'How much does fintech software cost in Uganda?',a:'Fintech software development starts from UGX 3,800,000 for basic payment integration. Full digital banking or lending platforms cost UGX 15,000,000+.'},
      {q:'Can you integrate with MTN MoMo and Airtel Money?',a:'Yes. We have extensive experience integrating MTN MoMo API, Airtel Money API, and Pesapal for fintech applications in Uganda.'},
      {q:'Is fintech software secure?',a:'We build all fintech solutions with bank-grade security: encryption, tokenization, audit trails, role-based access control, and fraud detection.'}
    ]
  },

  { path: 'services/payment-integration.html', h1: 'Payment Integration Services in Uganda', title: 'Payment Integration Uganda | DeryCode', desc: 'Payment integration services in Uganda. Integrate MTN MoMo, Airtel Money, Pesapal, Stripe, and card payments. DeryCode payment experts.', kw: 'payment integration Uganda, payment gateway Uganda, online payment Uganda, payment system Uganda, MoMo integration Uganda', serviceType: 'Payment Integration',
    problem: { h: 'Accept Payments the Ugandan Way', c: 'In Uganda, mobile money is king. If your website or app can\'t accept MTN MoMo or Airtel Money, you\'re losing customers. We integrate the payment methods your customers actually use.' },
    features: { h: 'Payment Methods We Integrate', items: [
      {icon:'fa-mobile-money-bill',t:'MTN MoMo',d:'MTN Mobile Money API integration for collections and disbursements.'},
      {icon:'fa-mobile',t:'Airtel Money',d:'Airtel Money API integration for payments.'},
      {icon:'fa-credit-card',t:'Card Payments',d:'Visa, Mastercard via Pesapal, Stripe, Flutterwave.'},
      {icon:'fa-university',t:'Bank Transfers',d:'Bank transfer integration and reconciliation.'},
      {icon:'fa-coins',t:'Crypto Payments',d:'Accept Bitcoin, USDT, and other cryptocurrencies.'},
      {icon:'fa-paypal',t:'PayPal',d:'International payment acceptance.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/mobile-money-integration.html',t:'Mobile Money Integration',d:'MoMo and Airtel Money APIs.'},
      {url:'/services/mtn-momo-api.html',t:'MTN MoMo API',d:'MTN MoMo API integration.'},
      {url:'/services/airtel-money-api.html',t:'Airtel Money API',d:'Airtel Money API integration.'},
      {url:'/services/pesapal-integration.html',t:'Pesapal Integration',d:'Pesapal payment gateway.'},
      {url:'/services/api-development.html',t:'API Development',d:'Custom API development.'},
      {url:'/services/fintech-software.html',t:'Fintech Software',d:'Full fintech development.'}
    ]},
    faqs: [
      {q:'How much does payment integration cost in Uganda?',a:'Payment integration starts from UGX 1,800,000. This includes API integration, testing, and deployment.'},
      {q:'How long does payment integration take?',a:'Most payment integrations take 3–7 days. Complex multi-gateway integrations may take 2–3 weeks.'},
      {q:'Do you handle the API registration with MTN and Airtel?',a:'Yes, we assist with the full registration process including business verification, sandbox testing, and production API key setup.'}
    ]
  },

  { path: 'services/mobile-money-integration.html', h1: 'Mobile Money Integration in Uganda', title: 'Mobile Money Integration Uganda | DeryCode', desc: 'Mobile money integration services in Uganda. Integrate MTN MoMo API and Airtel Money API into your website or app. DeryCode MoMo experts.', kw: 'mobile money integration Uganda, MoMo integration Uganda, mobile money API Uganda, MTN MoMo integration Uganda, Airtel Money integration Uganda', serviceType: 'Mobile Money Integration',
    problem: { h: 'Mobile Money is Uganda\'s Payment Standard', c: 'With over 20 million mobile money users in Uganda, accepting MoMo payments isn\'t optional — it\'s essential. We integrate both MTN MoMo and Airtel Money APIs into your systems.' },
    features: { h: 'What We Integrate', items: [
      {icon:'fa-mobile-money-bill',t:'MTN MoMo API',d:'Collections, disbursements, and balance checks via MTN MoMo API.'},
      {icon:'fa-mobile',t:'Airtel Money API',d:'Airtel Money collections and disbursements.'},
      {icon:'fa-arrows-rotate',t:'Webhooks',d:'Real-time payment status callbacks and webhooks.'},
      {icon:'fa-receipt',t:'Reconciliation',d:'Automated transaction reconciliation and reporting.'},
      {icon:'fa-shield-halved',t:'Security',d:'OAuth 2.0 authentication and encrypted API calls.'},
      {icon:'fa-chart-bar',t:'Dashboard',d:'Admin dashboard for tracking all transactions.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/mtn-momo-api.html',t:'MTN MoMo API',d:'MTN MoMo API integration.'},
      {url:'/services/airtel-money-api.html',t:'Airtel Money API',d:'Airtel Money API integration.'},
      {url:'/services/payment-integration.html',t:'Payment Integration',d:'All payment methods.'},
      {url:'/services/api-development.html',t:'API Development',d:'Custom API development.'}
    ]},
    faqs: [
      {q:'How much does MoMo integration cost in Uganda?',a:'MTN MoMo API integration starts from UGX 1,800,000. Adding Airtel Money integration adds approximately UGX 800,000.'},
      {q:'How long does MoMo integration take?',a:'Integration typically takes 5–10 days, including API registration, sandbox testing, and production deployment.'},
      {q:'What are the MoMo API fees?',a:'MTN MoMo API charges per transaction (approximately 1-2% depending on transaction type). We help you understand the fee structure during setup.'}
    ]
  },

  { path: 'services/mtn-momo-api.html', h1: 'MTN MoMo API Integration in Uganda', title: 'MTN MoMo API Uganda | DeryCode', desc: 'MTN MoMo API integration in Uganda. Collect payments, disburse funds, and check balances via MTN Mobile Money API. DeryCode MTN MoMo experts.', kw: 'MTN MoMo API Uganda, MTN MoMo API integration Uganda, MTN mobile money API Uganda, MoMo developer Uganda, MTN MoMo developer Uganda', serviceType: 'MTN MoMo API Integration',
    features: { h: 'MTN MoMo API Services', items: [
      {icon:'fa-arrow-down',t:'Collections',d:'Request payments from customers via MTN MoMo.'},
      {icon:'fa-arrow-up',t:'Disbursements',d:'Send money to customers via MTN MoMo.'},
      {icon:'fa-balance-scale',t:'Balance Check',d:'Check account balance in real-time.'},
      {icon:'fa-arrows-rotate',t:'Webhooks',d:'Real-time payment status notifications.'},
      {icon:'fa-shield-halved',t:'OAuth Security',d:'Secure API key and OAuth 2.0 authentication.'},
      {icon:'fa-receipt',t:'Transaction Reports',d:'Detailed transaction history and reports.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/mobile-money-integration.html',t:'Mobile Money Integration',d:'All mobile money services.'},
      {url:'/services/airtel-money-api.html',t:'Airtel Money API',d:'Airtel Money integration.'},
      {url:'/services/payment-integration.html',t:'Payment Integration',d:'All payment methods.'}
    ]},
    faqs: [
      {q:'How do I get MTN MoMo API access in Uganda?',a:'You need to register as a merchant on the MTN MoMo developer portal. DeryCode handles the entire registration, verification, and integration process for you.'},
      {q:'How much does MTN MoMo API integration cost?',a:'Integration starts from UGX 1,800,000. MTN charges per-transaction fees, typically 1-2% of the transaction amount.'}
    ]
  },

  { path: 'services/airtel-money-api.html', h1: 'Airtel Money API Integration in Uganda', title: 'Airtel Money API Uganda | DeryCode', desc: 'Airtel Money API integration in Uganda. Collect payments and disburse funds via Airtel Money API. DeryCode Airtel Money integration experts.', kw: 'Airtel Money API Uganda, Airtel Money integration Uganda, Airtel API Uganda, Airtel Money developer Uganda', serviceType: 'Airtel Money API Integration',
    features: { h: 'Airtel Money API Services', items: [
      {icon:'fa-arrow-down',t:'Collections',d:'Request payments from Airtel Money users.'},
      {icon:'fa-arrow-up',t:'Disbursements',d:'Send money to Airtel Money users.'},
      {icon:'fa-arrows-rotate',t:'Webhooks',d:'Real-time payment callbacks.'},
      {icon:'fa-balance-scale',t:'Balance Check',d:'Check account balance.'},
      {icon:'fa-shield-halved',t:'Secure Auth',d:'OAuth 2.0 and encrypted communications.'},
      {icon:'fa-receipt',t:'Transaction Reports',d:'Full transaction history and reconciliation.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/mtn-momo-api.html',t:'MTN MoMo API',d:'MTN MoMo API integration.'},
      {url:'/services/mobile-money-integration.html',t:'Mobile Money Integration',d:'All mobile money services.'},
      {url:'/services/payment-integration.html',t:'Payment Integration',d:'All payment methods.'}
    ]},
    faqs: [
      {q:'How much does Airtel Money API integration cost?',a:'Airtel Money API integration starts from UGX 1,500,000. Combined MTN + Airtel integration is UGX 2,600,000.'},
      {q:'Should I integrate both MTN and Airtel?',a:'Yes. MTN has the largest market share, but Airtel users represent a significant portion of Uganda\'s mobile money users. Integrating both ensures you don\'t lose customers.'}
    ]
  },

  { path: 'services/pesapal-integration.html', h1: 'Pesapal Integration in Uganda', title: 'Pesapal Integration Uganda | DeryCode', desc: 'Pesapal payment gateway integration in Uganda. Accept MoMo, cards, and bank transfers through Pesapal. DeryCode Pesapal integration experts.', kw: 'Pesapal integration Uganda, Pesapal Uganda, Pesapal API Uganda, Pesapal payment Uganda, payment gateway Uganda', serviceType: 'Pesapal Integration',
    features: { h: 'Pesapal Integration Services', items: [
      {icon:'fa-credit-card',t:'Card Payments',d:'Accept Visa and Mastercard via Pesapal.'},
      {icon:'fa-mobile-money-bill',t:'MoMo via Pesapal',d:'MTN MoMo and Airtel Money through Pesapal.'},
      {icon:'fa-university',t:'Bank Transfers',d:'Direct bank transfer payments.'},
      {icon:'fa-globe',t:'Web Checkout',d:'Pesapal hosted checkout pages.'},
      {icon:'fa-arrows-rotate',t:'IPN Webhooks',d:'Instant Payment Notifications.'},
      {icon:'fa-receipt',t:'Reconciliation',d:'Automated transaction reconciliation.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/payment-integration.html',t:'Payment Integration',d:'All payment methods.'},
      {url:'/services/mobile-money-integration.html',t:'Mobile Money',d:'Direct MoMo integration.'},
      {url:'/services/api-development.html',t:'API Development',d:'Custom API development.'}
    ]},
    faqs: [
      {q:'How much does Pesapal integration cost?',a:'Pesapal integration starts from UGX 1,200,000. Pesapal charges transaction fees of approximately 2.5-3.5% per transaction.'},
      {q:'Why use Pesapal instead of direct MoMo API?',a:'Pesapal gives you multiple payment methods (cards, MoMo, bank) through one integration. If you need to accept all payment types quickly, Pesapal is faster than integrating each API separately.'}
    ]
  },

  { path: 'services/digital-wallet.html', h1: 'Digital Wallet Development in Uganda', title: 'Digital Wallet Uganda | DeryCode', desc: 'Digital wallet development in Uganda. Build mobile wallet apps with MoMo integration, crypto support, and offline capabilities. DeryCode wallet experts.', kw: 'digital wallet Uganda, wallet app Uganda, mobile wallet Uganda, digital wallet development Uganda, e-wallet Uganda', serviceType: 'Digital Wallet Development',
    features: { h: 'Digital Wallet Features', items: [
      {icon:'fa-wallet',t:'Balance Management',d:'Real-time balance tracking and transaction history.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Top-Up',d:'Deposit funds via MTN MoMo or Airtel Money.'},
      {icon:'fa-arrows-right-left',t:'Transfers',d:'Peer-to-peer and wallet-to-wallet transfers.'},
      {icon:'fa-shield-halved',t:'Security',d:'PIN, biometric auth, and fraud detection.'},
      {icon:'fa-wifi',t:'Offline Mode',d:'Limited functionality when offline.'},
      {icon:'fa-chart-bar',t:'Analytics',d:'Spending insights and financial reports.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/fintech-software.html',t:'Fintech Software',d:'Full fintech services.'},
      {url:'/services/payment-integration.html',t:'Payment Integration',d:'Payment gateway services.'},
      {url:'/products/sacco-wallet.html',t:'SaccoWallet',d:'Our SACCO wallet product.'}
    ]},
    faqs: [
      {q:'How much does a digital wallet cost?',a:'Digital wallet development starts from UGX 5,000,000. Full-featured wallets with multiple integrations cost UGX 15,000,000+.'}
    ]
  },

  { path: 'services/loan-management.html', h1: 'Loan Management System in Uganda', title: 'Loan Management Uganda | DeryCode', desc: 'Loan management system development in Uganda. Track loans, automate disbursements, manage repayments via MoMo. DeryCode lending software experts.', kw: 'loan management Uganda, loan management system Uganda, loan software Uganda, lending software Uganda, loan tracking Uganda', serviceType: 'Loan Management System',
    features: { h: 'Loan Management Features', items: [
      {icon:'fa-file-contract',t:'Loan Origination',d:'Application, approval, and disbursement workflows.'},
      {icon:'fa-calculator',t:'Interest Calculation',d:'Automated interest and penalty calculations.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Repayments',d:'Automatic repayment collection via MoMo.'},
      {icon:'fa-chart-line',t:'Credit Scoring',d:'Automated credit scoring and risk assessment.'},
      {icon:'fa-bell',t:'Automated Reminders',d:'SMS and WhatsApp payment reminders.'},
      {icon:'fa-chart-pie',t:'Portfolio Analytics',d:'Non-performing loan tracking and reports.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'SACCO management with loans.'},
      {url:'/services/digital-lending.html',t:'Digital Lending',d:'Digital lending platforms.'},
      {url:'/services/fintech-software.html',t:'Fintech Software',d:'Full fintech services.'},
      {url:'/products/deryloan.html',t:'DeryLoan',d:'Our loan management product.'}
    ]},
    faqs: [
      {q:'How much does a loan management system cost?',a:'Loan management system development starts from UGX 3,800,000. Systems with credit scoring and MoMo integration cost more.'}
    ]
  },

  { path: 'services/digital-lending.html', h1: 'Digital Lending Platform Development in Uganda', title: 'Digital Lending Uganda | DeryCode', desc: 'Digital lending platform development in Uganda. Build automated lending systems with credit scoring, MoMo disbursement, and real-time analytics.', kw: 'digital lending Uganda, digital lending platform Uganda, online lending Uganda, lending software Uganda', serviceType: 'Digital Lending Platform',
    features: { h: 'Digital Lending Features', items: [
      {icon:'fa-mobile-screen',t:'Mobile Application',d:'Apply for loans from your phone.'},
      {icon:'fa-bolt',t:'Instant Approval',d:'Automated credit scoring and approval.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Disbursement',d:'Instant loan disbursement via MoMo.'},
      {icon:'fa-shield-halved',t:'Risk Assessment',d:'AI-powered credit risk evaluation.'},
      {icon:'fa-bell',t:'Automated Collections',d:'Auto-deduct repayments on due dates.'},
      {icon:'fa-chart-bar',t:'Portfolio Management',d:'Real-time loan portfolio analytics.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/loan-management.html',t:'Loan Management',d:'Loan management systems.'},
      {url:'/services/credit-scoring.html',t:'Credit Scoring',d:'Credit scoring systems.'},
      {url:'/services/fintech-software.html',t:'Fintech Software',d:'Full fintech services.'}
    ]},
    faqs: [
      {q:'How much does a digital lending platform cost?',a:'Digital lending platform development starts from UGX 6,000,000. Full-featured platforms with credit scoring and MoMo integration cost UGX 15,000,000+.'}
    ]
  },

  { path: 'services/credit-scoring.html', h1: 'Credit Scoring Software in Uganda', title: 'Credit Scoring Uganda | DeryCode', desc: 'Credit scoring software development in Uganda. Build automated credit scoring systems for SACCOs, microfinance, and lending platforms.', kw: 'credit scoring Uganda, credit scoring software Uganda, credit score Uganda, credit assessment Uganda', serviceType: 'Credit Scoring Software',
    features: { h: 'Credit Scoring Features', items: [
      {icon:'fa-chart-line',t:'Risk Models',d:'Custom credit risk models based on your data.'},
      {icon:'fa-database',t:'Data Aggregation',d:'Combine financial, behavioral, and alternative data.'},
      {icon:'fa-bolt',t:'Real-Time Scoring',d:'Instant credit decisions.'},
      {icon:'fa-chart-pie',t:'Portfolio Analysis',d:'Track default rates and model accuracy.'},
      {icon:'fa-shield-halved',t:'Compliance',d:'Fair lending rules and audit trails.'},
      {icon:'fa-mobile-money-bill',t:'MoMo History',d:'Use MoMo transaction history for scoring.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/loan-management.html',t:'Loan Management',d:'Loan management systems.'},
      {url:'/services/sacco-credit-scoring.html',t:'SACCO Credit Scoring',d:'SACCO-specific credit scoring.'},
      {url:'/services/fintech-software.html',t:'Fintech Software',d:'Full fintech services.'}
    ]},
    faqs: [
      {q:'How much does credit scoring software cost?',a:'Credit scoring software development starts from UGX 4,000,000. The cost depends on data availability, model complexity, and integration requirements.'}
    ]
  },

  { path: 'services/digital-banking.html', h1: 'Digital Banking Software in Uganda', title: 'Digital Banking Uganda | DeryCode', desc: 'Digital banking software development in Uganda. Build core banking systems, digital wallets, and financial platforms with MoMo integration.', kw: 'digital banking Uganda, digital banking software Uganda, online banking Uganda, digital banking solutions Uganda', serviceType: 'Digital Banking Software',
    features: { h: 'Digital Banking Features', items: [
      {icon:'fa-university',t:'Core Banking',d:'Account management, deposits, withdrawals, transfers.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Integration',d:'Deposit and withdraw via mobile money.'},
      {icon:'fa-wallet',t:'Digital Wallets',d:'In-app wallets for members.'},
      {icon:'fa-file-contract',t:'Loan Management',d:'Full loan lifecycle management.'},
      {icon:'fa-shield-halved',t:'Security & Compliance',d:'KYC, AML, audit trails, encryption.'},
      {icon:'fa-chart-bar',t:'Reporting',d:'Regulatory and operational reports.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/fintech-software.html',t:'Fintech Software',d:'Full fintech services.'},
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'SACCO management systems.'},
      {url:'/services/banking-api.html',t:'Banking API',d:'Banking API development.'}
    ]},
    faqs: [
      {q:'How much does digital banking software cost?',a:'Digital banking software development starts from UGX 8,000,000. Full core banking systems with regulatory compliance cost UGX 20,000,000+.'}
    ]
  },

  { path: 'services/banking-api.html', h1: 'Banking API Development in Uganda', title: 'Banking API Uganda | DeryCode', desc: 'Banking API development and integration in Uganda. Build secure APIs for banking, payments, and financial services.', kw: 'banking API Uganda, banking software Uganda, core banking Uganda, banking API integration Uganda', serviceType: 'Banking API Development',
    features: { h: 'Banking API Services', items: [
      {icon:'fa-plug',t:'REST APIs',d:'Secure RESTful APIs for banking operations.'},
      {icon:'fa-university',t:'Core Banking Integration',d:'Connect with core banking systems.'},
      {icon:'fa-mobile-money-bill',t:'Payment APIs',d:'MoMo, card, and bank transfer APIs.'},
      {icon:'fa-shield-halved',t:'Security',d:'OAuth 2.0, encryption, rate limiting.'},
      {icon:'fa-database',t:'Data APIs',d:'Account, transaction, and customer data APIs.'},
      {icon:'fa-file-lines',t:'API Documentation',d:'Full OpenAPI/Swagger documentation.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/digital-banking.html',t:'Digital Banking',d:'Digital banking software.'},
      {url:'/services/fintech-software.html',t:'Fintech Software',d:'Full fintech services.'},
      {url:'/services/api-development.html',t:'API Development',d:'General API development.'}
    ]},
    faqs: [
      {q:'How much does banking API development cost?',a:'Banking API development starts from UGX 4,000,000. The cost depends on the number of endpoints, security requirements, and integration complexity.'}
    ]
  },

  { path: 'services/financial-reporting.html', h1: 'Financial Reporting Software in Uganda', title: 'Financial Reporting Uganda | DeryCode', desc: 'Financial reporting software development in Uganda. Build automated financial reports, dashboards, and analytics for your business.', kw: 'financial reporting Uganda, financial reports Uganda, financial software Uganda, accounting reports Uganda', serviceType: 'Financial Reporting Software',
    features: { h: 'Financial Reporting Features', items: [
      {icon:'fa-chart-line',t:'Real-Time Dashboards',d:'Live financial dashboards.'},
      {icon:'fa-file-lines',t:'Automated Reports',d:'Schedule and generate reports automatically.'},
      {icon:'fa-chart-pie',t:'P&L Statements',d:'Profit and loss, balance sheets, cash flow.'},
      {icon:'fa-database',t:'Data Aggregation',d:'Combine data from multiple sources.'},
      {icon:'fa-file-export',t:'Export Options',d:'PDF, Excel, CSV export.'},
      {icon:'fa-chart-bar',t:'Trend Analysis',d:'Historical trends and forecasts.'}
    ]},
    links: { h: 'Related Services', items: [
      {url:'/services/accounting-software.html',t:'Accounting Software',d:'Accounting systems.'},
      {url:'/services/erp-software.html',t:'ERP Software',d:'ERP with financial reporting.'},
      {url:'/services/fintech-software.html',t:'Fintech Software',d:'Full fintech services.'}
    ]},
    faqs: [
      {q:'How much does financial reporting software cost?',a:'Financial reporting software development starts from UGX 2,500,000. Systems with advanced analytics cost more.'}
    ]
  }
];

module.exports = { page, SERVICES, buildHead, buildNav, buildFooter, buildSchema, breadcrumbSchema, faqSchema, serviceSchema, ORG_SCHEMA, BASE, VER, GA4 };
