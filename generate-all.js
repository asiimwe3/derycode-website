#!/usr/bin/env node
/**
 * DeryCode SEO Page Generator v3 — Master Generator
 * Generates all SEO pages and updates the sitemap
 */
const fs = require('fs');
const path = require('path');
const { page, SERVICES, buildHead, buildNav, buildFooter, buildSchema, breadcrumbSchema, faqSchema, serviceSchema, ORG_SCHEMA, BASE, VER, GA4 } = require('./seo-templates');

const allUrls = [];

function writePage(filepath, content) {
  const dir = path.dirname(filepath);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filepath, content);
  allUrls.push('/' + filepath);
  console.log('  ✓ ' + filepath);
}

// ── 1. SERVICE PAGES ──
console.log('\n=== Generating Service Pages ===');
for (const svc of SERVICES) {
  writePage(svc.path, page(svc));
}

// ── 2. ADDITIONAL SERVICE PAGES (compact definitions) ──
console.log('\n=== Generating Additional Service Pages ===');

const additionalServices = [
  { path:'services/sacco-software.html', h1:'SACCO Software in Uganda', title:'SACCO Software Uganda | DeryCode', desc:'SACCO management software in Uganda. Complete SACCO systems with member management, loan tracking, savings, shares, dividends, and MoMo integration.', kw:'SACCO software Uganda, SACCO management system Uganda, SACCO system Uganda, SACCO management software Uganda', serviceType:'SACCO Software',
    problem:{h:'SACCOs Need Digital Transformation',c:'Most Ugandan SACCOs still run on paper ledgers and Excel. Members can\'t check balances without visiting the office. Loans take days to process. Fraud is hard to detect. DeryCode builds complete SACCO management systems that digitize everything — from member registration to dividend calculation.'},
    features:{h:'SACCO Software Features',items:[
      {icon:'fa-users',t:'Member Management',d:'Register members, track KYC, manage memberships and roles.'},
      {icon:'fa-piggy-bank',t:'Savings Management',d:'Track deposits, withdrawals, and savings balances.'},
      {icon:'fa-file-contract',t:'Loan Management',d:'Apply, approve, disburse, and track loans with automated interest.'},
      {icon:'fa-chart-pie',t:'Shares & Dividends',d:'Manage share capital, calculate and distribute dividends.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Integration',d:'Members deposit and repay via MTN MoMo and Airtel Money.'},
      {icon:'fa-chart-bar',t:'Financial Reports',d:'Balance sheets, P&L, loan portfolios, and regulatory reports.'}
    ]},
    useCases:{h:'Who Uses Our SACCO Software',items:[
      {t:'Rural SACCOs',d:'Offline-first systems for farming communities with unreliable connectivity.'},
      {t:'Urban SACCOs',d:'High-volume transaction processing for city-based cooperatives.'},
      {t:'Teacher SACCOs',d:'Payroll-deducted savings and loan management for teacher cooperatives.'},
      {t:'Church SACCOs',d:'Faith-based financial cooperatives with member-specific needs.'},
      {t:'Police/Military SACCOs',d:'Salary-based lending with automatic deductions.'},
      {t:'Women\'s SACCOs',d:'Group savings, microloans, and community lending pools.'}
    ]},
    links:{h:'SACCO Software Modules',items:[
      {url:'/services/sacco-management-system.html',t:'SACCO Management System',d:'Complete management platform.'},
      {url:'/services/sacco-mobile-app.html',t:'SACCO Mobile App',d:'Mobile app for members.'},
      {url:'/services/sacco-loan-management.html',t:'SACCO Loan Management',d:'Loan tracking system.'},
      {url:'/services/sacco-accounting.html',t:'SACCO Accounting',d:'Accounting and bookkeeping.'},
      {url:'/services/sacco-member-management.html',t:'Member Management',d:'Member CRM.'},
      {url:'/services/sacco-savings-management.html',t:'Savings Management',d:'Savings tracking.'},
      {url:'/services/sacco-shares-management.html',t:'Shares Management',d:'Share capital management.'},
      {url:'/services/sacco-dividend-management.html',t:'Dividend Management',d:'Dividend calculation.'},
      {url:'/services/sacco-mobile-money.html',t:'SACCO MoMo Integration',d:'Mobile money deposits.'},
      {url:'/services/sacco-reporting.html',t:'SACCO Reporting',d:'Financial reports.'},
      {url:'/services/sacco-digital-banking.html',t:'SACCO Digital Banking',d:'Online banking.'},
      {url:'/services/sacco-ussd.html',t:'SACCO USSD',d:'USSD for feature phones.'},
      {url:'/pricing/sacco-software-cost-uganda.html',t:'SACCO Software Cost',d:'Pricing information.'},
      {url:'/comparisons/best-sacco-software-uganda.html',t:'SACCO Software Comparison',d:'Compare options.'}
    ]},
    faqs:[
      {q:'How much does SACCO software cost in Uganda?',a:'SACCO software development starts from UGX 3,800,000. Full enterprise systems with mobile apps, MoMo integration, and credit scoring cost UGX 10,000,000+.'},
      {q:'Can members deposit via mobile money?',a:'Yes. Our SACCO software integrates MTN MoMo and Airtel Money APIs so members can deposit and repay loans directly from their phones.'},
      {q:'Does it work offline?',a:'Yes. We build offline-first SACCO systems that work without internet and sync when connectivity returns — essential for rural Uganda.'},
      {q:'How long does SACCO software implementation take?',a:'A typical SACCO software implementation takes 4–8 weeks, including data migration, staff training, and parallel running.'}
    ]
  },

  { path:'services/erp-software.html', h1:'ERP Software Development in Uganda', title:'ERP Software Uganda | DeryCode', desc:'ERP software development in Uganda. Build custom ERP systems with inventory, HR, payroll, accounting, and POS. DeryCode ERP experts in Kampala.', kw:'ERP software Uganda, ERP Uganda, ERP system Uganda, ERP software Kampala, enterprise resource planning Uganda', serviceType:'ERP Software',
    problem:{h:'Why Ugandan Businesses Need ERP',c:'As your business grows, managing inventory, payroll, accounting, and operations across spreadsheets becomes chaotic. An ERP system centralizes everything — giving you real-time visibility and control.'},
    features:{h:'ERP Modules',items:[
      {icon:'fa-boxes-stacked',t:'Inventory Management',d:'Real-time stock tracking across locations.'},
      {icon:'fa-users',t:'HR & Payroll',d:'Employee records, attendance, and automated payroll.'},
      {icon:'fa-calculator',t:'Accounting',d:'General ledger, P&L, balance sheet, cash flow.'},
      {icon:'fa-cash-register',t:'POS',d:'Point of sale with inventory sync.'},
      {icon:'fa-people-roof',t:'CRM',d:'Customer relationship management.'},
      {icon:'fa-chart-line',t:'Business Intelligence',d:'Real-time dashboards and analytics.'}
    ]},
    links:{h:'ERP Modules & Related Services',items:[
      {url:'/services/business-management-software.html',t:'Business Management Software',d:'General management software.'},
      {url:'/services/accounting-software.html',t:'Accounting Software',d:'Accounting systems.'},
      {url:'/services/payroll-software.html',t:'Payroll Software',d:'Payroll management.'},
      {url:'/services/hr-software.html',t:'HR Software',d:'Human resources software.'},
      {url:'/services/inventory-management.html',t:'Inventory Management',d:'Stock management.'},
      {url:'/services/pos-software.html',t:'POS Software',d:'Point of sale systems.'},
      {url:'/services/erp-for-smes.html',t:'ERP for SMEs',d:'SME-focused ERP solutions.'},
      {url:'/pricing/erp-software-cost-uganda.html',t:'ERP Cost',d:'ERP pricing.'}
    ]},
    faqs:[
      {q:'How much does ERP software cost in Uganda?',a:'Custom ERP development starts from UGX 3,500,000 for basic modules. Full-featured ERP with all modules costs UGX 12,000,000+.'},
      {q:'How long does ERP implementation take?',a:'ERP implementation typically takes 8–16 weeks, including requirements analysis, development, testing, data migration, and training.'},
      {q:'Can ERP integrate with MoMo?',a:'Yes. We integrate MTN MoMo and Airtel Money into ERP systems for automated payment collection and reconciliation.'}
    ]
  },

  { path:'services/school-management-system.html', h1:'School Management System in Uganda', title:'School Management System Uganda | DeryCode', desc:'School management system development in Uganda. Manage students, fees, exams, attendance, and parent communication. DeryCode school software experts.', kw:'school management system Uganda, school management Uganda, school software Uganda, school system Uganda, school management software Kampala', serviceType:'School Management System',
    problem:{h:'Schools Need Digital Management',c:'Ugandan schools still rely on paper records for student data, fee collection, and exam results. This leads to errors, delays, and frustrated parents. A digital school management system solves all of this.'},
    features:{h:'School Management Features',items:[
      {icon:'fa-user-graduate',t:'Student Management',d:'Student records, enrollment, and profiles.'},
      {icon:'fa-money-bill',t:'Fees Management',d:'Track fees collection, send reminders, accept MoMo.'},
      {icon:'fa-clipboard-check',t:'Exam Management',d:'Grade entry, report cards, and transcripts.'},
      {icon:'fa-calendar-check',t:'Attendance',d:'Daily attendance tracking for students and staff.'},
      {icon:'fa-brands fa-whatsapp',t:'Parent Portal',d:'Parents check results, fees, and attendance online.'},
      {icon:'fa-chalkboard-user',t:'Staff Management',d:'Teacher records, timetables, and payroll.'}
    ]},
    links:{h:'Education Software',items:[
      {url:'/services/school-management-software.html',t:'School Management Software',d:'School administration software.'},
      {url:'/services/school-erp.html',t:'School ERP',d:'Education ERP systems.'},
      {url:'/services/student-information-system.html',t:'Student Information System',d:'SIS development.'},
      {url:'/services/school-fees-management.html',t:'School Fees Management',d:'Fees collection system.'},
      {url:'/services/lms.html',t:'LMS',d:'Learning management system.'},
      {url:'/services/e-learning-platform.html',t:'E-Learning Platform',d:'Online learning platform.'},
      {url:'/products/school-sync-manager.html',t:'School Sync Manager',d:'Our school management product.'}
    ]},
    faqs:[
      {q:'How much does school management software cost?',a:'School management system development starts from UGX 3,000,000. Full-featured systems with parent portals and MoMo integration cost UGX 8,000,000+.'},
      {q:'Can parents pay fees via mobile money?',a:'Yes. We integrate MTN MoMo and Airtel Money so parents can pay school fees directly from their phones, with automatic receipts.'},
      {q:'Can parents check results online?',a:'Yes. The parent portal lets parents view their child\'s results, attendance, fees status, and school announcements online.'}
    ]
  },

  { path:'services/seo-services.html', h1:'SEO Services in Uganda', title:'SEO Services Uganda | DeryCode', desc:'SEO services in Uganda. Rank higher on Google with technical SEO, local SEO, content optimization, and link building. DeryCode SEO company in Kampala.', kw:'SEO services Uganda, SEO company Uganda, SEO Uganda, search engine optimization Uganda, SEO agency Kampala, SEO expert Uganda', serviceType:'SEO Services',
    problem:{h:'Why SEO Matters in Uganda',c:'When someone searches "software company Uganda" or "website development Kampala" on Google, they find businesses. If you\'re not on page 1, you\'re invisible. SEO gets you to the top — organically, without paying for ads.'},
    features:{h:'Our SEO Services',items:[
      {icon:'fa-magnifying-glass',t:'Technical SEO',d:'Site speed, mobile optimization, structured data, sitemaps.'},
      {icon:'fa-location-dot',t:'Local SEO',d:'Google Business Profile, local keywords, location pages.'},
      {icon:'fa-file-lines',t:'Content SEO',d:'Keyword research, content creation, and optimization.'},
      {icon:'fa-link',t:'Link Building',d:'Quality backlinks from Ugandan and international sites.'},
      {icon:'fa-chart-line',t:'Analytics & Reporting',d:'Monthly ranking reports and traffic analysis.'},
      {icon:'fa-globe',t:'International SEO',d:'Expand beyond Uganda with hreflang and international targeting.'}
    ]},
    process:{h:'Our SEO Process',steps:[
      {t:'Audit',d:'Full technical and content audit of your website.'},
      {t:'Keyword Research',d:'Identify high-value keywords for your business.'},
      {t:'On-Page SEO',d:'Optimize titles, descriptions, content, and structure.'},
      {t:'Technical Fixes',d:'Fix speed, schema, sitemaps, and mobile issues.'},
      {t:'Content Creation',d:'Create SEO-optimized content for target keywords.'},
      {t:'Link Building',d:'Build quality backlinks to boost authority.'},
      {t:'Monitoring',d:'Track rankings, traffic, and conversions monthly.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/local-seo.html',t:'Local SEO',d:'Local search optimization.'},
      {url:'/services/google-ads.html',t:'Google Ads',d:'PPC advertising.'},
      {url:'/services/digital-marketing.html',t:'Digital Marketing',d:'Full digital marketing services.'},
      {url:'/services/content-marketing.html',t:'Content Marketing',d:'Content strategy and creation.'},
      {url:'/pricing/seo-services-pricing-uganda.html',t:'SEO Pricing',d:'SEO service pricing.'}
    ]},
    faqs:[
      {q:'How much does SEO cost in Uganda?',a:'SEO services start from UGX 1,500,000/month. The cost depends on your industry competitiveness, current rankings, and target keywords.'},
      {q:'How long does SEO take to show results?',a:'SEO is a long-term strategy. You\'ll typically see improvements in 3–6 months, with significant results in 6–12 months.'},
      {q:'Do you guarantee #1 rankings?',a:'No reputable SEO company guarantees #1 rankings. We guarantee best-practice optimization, regular reporting, and continuous improvement.'}
    ]
  },

  { path:'services/digital-marketing.html', h1:'Digital Marketing Services in Uganda', title:'Digital Marketing Uganda | DeryCode', desc:'Digital marketing services in Uganda. SEO, Google Ads, social media marketing, WhatsApp marketing, and content marketing. DeryCode digital marketing agency.', kw:'digital marketing Uganda, digital marketing agency Uganda, online marketing Uganda, digital marketing Kampala', serviceType:'Digital Marketing',
    problem:{h:'Digital Marketing Drives Growth',c:'In Uganda, more people are online than ever before. If your business isn\'t visible on Google, social media, and WhatsApp, you\'re losing customers to competitors who are.'},
    features:{h:'Digital Marketing Services',items:[
      {icon:'fa-magnifying-glass',t:'SEO',d:'Rank higher on Google organically.'},
      {icon:'fa-google',t:'Google Ads',d:'Targeted PPC advertising on Google.'},
      {icon:'fa-brands fa-whatsapp',t:'WhatsApp Marketing',d:'WhatsApp campaigns and automation.'},
      {icon:'fa-users',t:'Social Media',d:'Facebook, Instagram, and TikTok management.'},
      {icon:'fa-file-lines',t:'Content Marketing',d:'Blog content, articles, and thought leadership.'},
      {icon:'fa-envelope',t:'Email Marketing',d:'Email campaigns and newsletters.'}
    ]},
    links:{h:'Marketing Services',items:[
      {url:'/services/seo-services.html',t:'SEO Services',d:'Search engine optimization.'},
      {url:'/services/google-ads.html',t:'Google Ads',d:'PPC advertising.'},
      {url:'/services/social-media-marketing.html',t:'Social Media Marketing',d:'Social media management.'},
      {url:'/services/content-marketing.html',t:'Content Marketing',d:'Content strategy.'},
      {url:'/services/whatsapp-automation.html',t:'WhatsApp Automation',d:'WhatsApp marketing automation.'},
      {url:'/services/cro.html',t:'Conversion Optimization',d:'Improve conversion rates.'}
    ]},
    faqs:[
      {q:'How much does digital marketing cost in Uganda?',a:'Digital marketing packages start from UGX 1,500,000/month. Custom packages are tailored to your goals and budget.'},
      {q:'Which platform is best for marketing in Uganda?',a:'For most Ugandan businesses, WhatsApp and Facebook are the top platforms. Google Ads work well for businesses where customers search for specific services.'}
    ]
  },

  { path:'services/ui-ux-design.html', h1:'UI/UX Design Services in Uganda', title:'UI/UX Design Uganda | DeryCode', desc:'UI/UX design services in Uganda. User-centered design for websites, mobile apps, and digital products. DeryCode UI/UX design experts in Kampala.', kw:'UI UX design Uganda, UI UX Uganda, UI UX designer Uganda, UX design Uganda, user experience design Uganda', serviceType:'UI/UX Design',
    problem:{h:'Good Design Drives Results',c:'Beautiful design that\'s hard to use fails. Functional design that\'s ugly fails. Great UI/UX design is both beautiful and usable — guiding users to take action effortlessly.'},
    features:{h:'Our Design Services',items:[
      {icon:'fa-pen-ruler',t:'Wireframing',d:'Low-fidelity layouts to plan user flows.'},
      {icon:'fa-palette',t:'UI Design',d:'High-fidelity visual design with your brand.'},
      {icon:'fa-users',t:'User Research',d:'Understand your users\' needs and behaviors.'},
      {icon:'fa-mobile-screen',t:'Responsive Design',d:'Designs that work on all devices.'},
      {icon:'fa-swatchbook',t:'Design Systems',d:'Reusable component libraries.'},
      {icon:'fa-vial',t:'User Testing',d:'Validate designs with real users.'}
    ]},
    links:{h:'Design Services',items:[
      {url:'/services/ui-design.html',t:'UI Design',d:'User interface design.'},
      {url:'/services/product-design.html',t:'Product Design',d:'Digital product design.'},
      {url:'/services/branding.html',t:'Branding',d:'Brand identity design.'},
      {url:'/services/logo-design.html',t:'Logo Design',d:'Logo design services.'},
      {url:'/services/design-systems.html',t:'Design Systems',d:'Component libraries.'},
      {url:'/services/web-design.html',t:'Web Design',d:'Website design services.'}
    ]},
    faqs:[
      {q:'How much does UI/UX design cost in Uganda?',a:'UI/UX design starts from UGX 1,200,000 for a simple project. Complex products with user research and testing cost more.'}
    ]
  },

  { path:'services/api-development.html', h1:'API Development Services in Uganda', title:'API Development Uganda | DeryCode', desc:'Custom API development in Uganda. Build REST APIs, GraphQL APIs, and integrate third-party services. DeryCode API development experts.', kw:'API development Uganda, API developer Uganda, REST API Uganda, API integration Uganda, custom API Uganda', serviceType:'API Development',
    features:{h:'API Development Services',items:[
      {icon:'fa-plug',t:'REST APIs',d:'Custom RESTful APIs for your applications.'},
      {icon:'fa-database',t:'GraphQL',d:'GraphQL APIs for flexible data queries.'},
      {icon:'fa-shield-halved',t:'API Security',d:'OAuth 2.0, JWT, rate limiting, and encryption.'},
      {icon:'fa-file-lines',t:'Documentation',d:'OpenAPI/Swagger documentation.'},
      {icon:'fa-arrows-rotate',t:'Webhooks',d:'Real-time event notifications.'},
      {icon:'fa-mobile-money-bill',t:'Payment APIs',d:'MoMo, Pesapal, and card payment APIs.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/software-development.html',t:'Software Development',d:'Full software development.'},
      {url:'/services/payment-integration.html',t:'Payment Integration',d:'Payment gateway APIs.'},
      {url:'/services/mtn-momo-api.html',t:'MTN MoMo API',d:'MoMo API integration.'},
      {url:'/services/banking-api.html',t:'Banking API',d:'Banking API development.'}
    ]},
    faqs:[
      {q:'How much does API development cost?',a:'API development starts from UGX 1,800,000. Complex APIs with multiple integrations cost more.'}
    ]
  },

  { path:'services/software-consulting.html', h1:'Software Consulting in Uganda', title:'Software Consulting Uganda | DeryCode', desc:'Software consulting services in Uganda. Technology strategy, digital transformation, and software architecture consulting. DeryCode IT consultants.', kw:'software consulting Uganda, IT consulting Uganda, software consultancy Kampala, technology consulting Uganda, IT consultant Uganda', serviceType:'Software Consulting',
    problem:{h:'Technology Should Serve Your Business',c:'Many Ugandan businesses buy software without a clear strategy — then struggle with systems that don\'t fit. Our consulting helps you choose the right technology, plan your digital roadmap, and avoid costly mistakes.'},
    features:{h:'Consulting Services',items:[
      {icon:'fa-compass',t:'Technology Strategy',d:'Define your technology roadmap and priorities.'},
      {icon:'fa-building',t:'Digital Transformation',d:'Plan and execute digital transformation initiatives.'},
      {icon:'fa-sitemap',t:'Architecture Review',d:'Evaluate and improve your software architecture.'},
      {icon:'fa-lightbulb',t:'Feasibility Studies',d:'Assess technical feasibility before you invest.'},
      {icon:'fa-people-group',t:'Team Training',d:'Train your team on new technologies and processes.'},
      {icon:'fa-magnifying-glass',t:'Technical Due Diligence',d:'Evaluate software before acquisition or investment.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/software-development.html',t:'Software Development',d:'Custom software development.'},
      {url:'/services/erp-software.html',t:'ERP Software',d:'ERP systems.'},
      {url:'/services/cloud-computing.html',t:'Cloud Computing',d:'Cloud services.'},
      {url:'/services/cybersecurity.html',t:'Cybersecurity',d:'Security consulting.'}
    ]},
    faqs:[
      {q:'How much does software consulting cost?',a:'Software consulting starts from UGX 200,000/hour. Project-based consulting is priced based on scope and deliverables.'}
    ]
  }
];

for (const svc of additionalServices) {
  writePage(svc.path, page(svc));
}

// ── 3. INDUSTRY PAGES ──
console.log('\n=== Generating Industry Pages ===');

const industries = [
  {path:'industries/healthcare.html',h1:'Healthcare Software Solutions in Uganda',title:'Healthcare Software Uganda | DeryCode',desc:'Healthcare software development in Uganda. Clinic management, patient records, appointment scheduling, and pharmacy systems. DeryCode healthcare tech.',kw:'healthcare software Uganda, hospital management Uganda, clinic software Uganda, medical software Uganda',serviceType:'Healthcare Software',
    problem:{h:'Healthcare Technology Challenges in Uganda',c:'Ugandan clinics and hospitals struggle with paper-based patient records, long queues, manual billing, and no way to track patient history. Our healthcare software digitizes clinical operations, reduces wait times, and improves patient care.'},
    features:{h:'Healthcare Software Solutions',items:[
      {icon:'fa-user-doctor',t:'Patient Records',d:'Electronic medical records with history and prescriptions.'},
      {icon:'fa-calendar-check',t:'Appointments',d:'Online booking and appointment management.'},
      {icon:'fa-prescription',t:'Pharmacy',d:'Drug inventory, dispensing, and stock alerts.'},
      {icon:'fa-file-invoice',t:'Billing',d:'Automated billing with MoMo payment integration.'},
      {icon:'fa-chart-line',t:'Lab Results',d:'Digital lab results and report management.'},
      {icon:'fa-brands fa-whatsapp',t:'Patient Engagement',d:'WhatsApp appointment reminders and follow-ups.'}
    ]},
    links:{h:'Related Solutions',items:[
      {url:'/services/software-development.html',t:'Software Development',d:'Custom software development.'},
      {url:'/services/erp-software.html',t:'ERP Software',d:'ERP for healthcare facilities.'},
      {url:'/services/mobile-app-development.html',t:'Mobile Apps',d:'Patient and staff mobile apps.'},
      {url:'/case-study-peters-medicare.html',t:'Peters Medicare Case Study',d:'Our healthcare project.'}
    ]},
    faqs:[
      {q:'How much does healthcare software cost?',a:'Healthcare software starts from UGX 4,000,000 for clinic management. Full hospital management systems cost UGX 15,000,000+.'}
    ]
  },
  {path:'industries/hotels.html',h1:'Hotel Software Solutions in Uganda',title:'Hotel Software Uganda | DeryCode',desc:'Hotel management software in Uganda. Booking systems, room management, guest engagement, and POS. DeryCode hotel technology experts.',kw:'hotel software Uganda, hotel management system Uganda, hotel booking system Uganda, hotel software Kampala',serviceType:'Hotel Software',
    problem:{h:'Hotel Technology in Uganda',c:'Ugandan hotels need systems to manage bookings, room availability, guest communication, and payments. We build hotel software that works for both budget and luxury properties.'},
    features:{h:'Hotel Software Features',items:[
      {icon:'fa-bed',t:'Room Management',d:'Room availability, types, and pricing.'},
      {icon:'fa-calendar-check',t:'Booking System',d:'Online reservations with instant confirmation.'},
      {icon:'fa-credit-card',t:'Payment Processing',d:'MoMo and card payments for bookings.'},
      {icon:'fa-utensils',t:'Restaurant POS',d:'Integrated restaurant and bar management.'},
      {icon:'fa-spa',t:'Guest Services',d:'Spa, laundry, and extra service management.'},
      {icon:'fa-chart-bar',t:'Reports',d:'Occupancy rates, revenue, and guest analytics.'}
    ]},
    links:{h:'Related Solutions',items:[
      {url:'/services/web-development.html',t:'Web Development',d:'Hotel website development.'},
      {url:'/services/mobile-app-development.html',t:'Mobile Apps',d:'Guest mobile apps.'},
      {url:'/case-study-tropical-gardens-hotel.html',t:'Tropical Gardens Case Study',d:'Our hotel project.'},
      {url:'/services/pos-software.html',t:'POS Software',d:'Restaurant POS.'}
    ]},
    faqs:[
      {q:'How much does hotel software cost?',a:'Hotel software starts from UGX 3,500,000. Full-featured systems with booking, POS, and analytics cost UGX 10,000,000+.'}
    ]
  },
  {path:'industries/real-estate.html',h1:'Real Estate Software in Uganda',title:'Real Estate Software Uganda | DeryCode',desc:'Real estate software development in Uganda. Property listings, agent portals, tenant management, and payment tracking. DeryCode real estate tech.',kw:'real estate software Uganda, property management Uganda, real estate platform Uganda, property software Uganda',serviceType:'Real Estate Software',
    problem:{h:'Real Estate Technology in Uganda',c:'Uganda\'s real estate sector is growing fast, but most agents and developers still manage properties on paper. Our software digitizes property listings, tenant management, and rent collection.'},
    features:{h:'Real Estate Software Features',items:[
      {icon:'fa-house',t:'Property Listings',d:'Showcase properties with photos and details.'},
      {icon:'fa-user-tie',t:'Agent Portals',d:'Manage agents, commissions, and assignments.'},
      {icon:'fa-people-roof',t:'Tenant Management',d:'Track tenants, leases, and renewals.'},
      {icon:'fa-mobile-money-bill',t:'Rent Collection',d:'Automated rent collection via MoMo.'},
      {icon:'fa-calendar',t:'Lease Management',d:'Track lease terms, expirations, and renewals.'},
      {icon:'fa-chart-line',t:'Financial Reports',d:'Revenue, vacancy rates, and ROI reports.'}
    ]},
    links:{h:'Related Solutions',items:[
      {url:'/services/web-development.html',t:'Web Development',d:'Property websites.'},
      {url:'/services/erp-software.html',t:'ERP Software',d:'Property management ERP.'},
      {url:'/case-study-sageco-evergreen.html',t:'SAGECO Case Study',d:'Our real estate project.'},
      {url:'/services/mobile-app-development.html',t:'Mobile Apps',d:'Property browsing apps.'}
    ]},
    faqs:[
      {q:'How much does real estate software cost?',a:'Real estate software starts from UGX 3,500,000. Full platforms with agent portals and MoMo integration cost UGX 10,000,000+.'}
    ]
  },
  {path:'industries/saccos.html',h1:'SACCO Technology Solutions in Uganda',title:'SACCO Technology Uganda | DeryCode',desc:'SACCO technology solutions in Uganda. Complete SACCO management systems with MoMo integration, member portals, and loan management. DeryCode SACCO experts.',kw:'SACCO technology Uganda, SACCO digital transformation Uganda, SACCO digitization Uganda, SACCO software Uganda',serviceType:'SACCO Technology',
    problem:{h:'The SACCO Digital Transformation Imperative',c:'Uganda has over 30,000 SACCOs serving millions of members. Most still use paper ledgers. DeryCode builds the technology to digitize them — from member registration to dividend distribution.'},
    features:{h:'SACCO Technology Solutions',items:[
      {icon:'fa-users',t:'Member Management',d:'Digital member registration, KYC, and profiles.'},
      {icon:'fa-piggy-bank',t:'Savings & Deposits',d:'Track all member savings and deposits.'},
      {icon:'fa-file-contract',t:'Loan Management',d:'Apply, approve, disburse, and track loans.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Integration',d:'Members deposit and repay via MTN/Airtel.'},
      {icon:'fa-chart-pie',t:'Shares & Dividends',d:'Manage share capital and calculate dividends.'},
      {icon:'fa-mobile-screen',t:'Mobile App',d:'Members check balances and apply for loans.'}
    ]},
    useCases:{h:'SACCOs We Serve',items:[
      {t:'Farmer SACCOs',d:'Offline-first systems for rural agricultural cooperatives.'},
      {t:'Teacher SACCOs',d:'Salary-based savings and loans for educators.'},
      {t:'Women\'s SACCOs',d:'Group savings and microloan management.'},
      {t:'Church SACCOs',d:'Faith-based financial cooperatives.'},
      {t:'Trade SACCOs',d:'Market vendor and trader cooperatives.'},
      {t:'Transport SACCOs',d:'Boda-boda and taxi association SACCOs.'}
    ]},
    links:{h:'SACCO Software & Products',items:[
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'Complete SACCO management system.'},
      {url:'/services/sacco-management-system.html',t:'SACCO Management System',d:'Full management platform.'},
      {url:'/services/sacco-mobile-app.html',t:'SACCO Mobile App',d:'Member mobile app.'},
      {url:'/services/sacco-loan-management.html',t:'Loan Management',d:'SACCO loan tracking.'},
      {url:'/services/sacco-mobile-money.html',t:'MoMo Integration',d:'Mobile money deposits.'},
      {url:'/products/sacco-wallet.html',t:'SaccoWallet',d:'Our SACCO wallet product.'},
      {url:'/pricing/sacco-software-cost-uganda.html',t:'SACCO Software Cost',d:'Pricing info.'},
      {url:'/comparisons/best-sacco-software-uganda.html',t:'SACCO Software Comparison',d:'Compare options.'}
    ]},
    faqs:[
      {q:'How much does SACCO software cost in Uganda?',a:'SACCO software starts from UGX 3,800,000. Full enterprise systems cost UGX 10,000,000+.'},
      {q:'Can SACCO members deposit via mobile money?',a:'Yes. We integrate MTN MoMo and Airtel Money APIs so members can deposit and repay from their phones.'},
      {q:'Does it work in rural areas without internet?',a:'Yes. Our offline-first systems work without internet and sync when connectivity returns.'}
    ]
  },
  {path:'industries/schools.html',h1:'School Technology Solutions in Uganda',title:'School Software Uganda | DeryCode',desc:'School technology solutions in Uganda. School management systems, student portals, e-learning, and fees collection. DeryCode education tech experts.',kw:'school software Uganda, school technology Uganda, education software Uganda, digital school Uganda, school management system Uganda',serviceType:'School Technology',
    problem:{h:'Schools Need Digital Solutions',c:'Ugandan schools manage hundreds or thousands of students with paper-based systems. This means slow fee collection, manual report cards, and poor communication with parents. Our school technology solutions fix all of this.'},
    features:{h:'School Technology Solutions',items:[
      {icon:'fa-user-graduate',t:'Student Management',d:'Digital student records and enrollment.'},
      {icon:'fa-money-bill',t:'Fees Collection',d:'Accept fees via MoMo with automatic receipts.'},
      {icon:'fa-clipboard-check',t:'Exam Management',d:'Digital grade entry and report cards.'},
      {icon:'fa-brands fa-whatsapp',t:'Parent Portal',d:'Parents check results and fees online.'},
      {icon:'fa-laptop',t:'E-Learning',d:'Online classes, assignments, and resources.'},
      {icon:'fa-chalkboard-user',t:'Staff Management',d:'Teacher records, timetables, and payroll.'}
    ]},
    links:{h:'Education Software',items:[
      {url:'/services/school-management-system.html',t:'School Management System',d:'Complete school system.'},
      {url:'/services/school-fees-management.html',t:'School Fees Management',d:'Fees collection.'},
      {url:'/services/lms.html',t:'LMS',d:'Learning management system.'},
      {url:'/services/e-learning-platform.html',t:'E-Learning Platform',d:'Online learning.'},
      {url:'/services/digital-library.html',t:'Digital Library',d:'Digital library platform.'},
      {url:'/products/school-sync-manager.html',t:'School Sync Manager',d:'Our school product.'}
    ]},
    faqs:[
      {q:'How much does school software cost?',a:'School management software starts from UGX 3,000,000. Full systems with e-learning and parent portals cost UGX 8,000,000+.'}
    ]
  },
  {path:'industries/fintech.html',h1:'Fintech Solutions in Uganda',title:'Fintech Solutions Uganda | DeryCode',desc:'Fintech technology solutions in Uganda. Digital wallets, lending platforms, payment systems, and banking software. DeryCode fintech experts.',kw:'fintech solutions Uganda, financial technology Uganda, fintech companies Uganda, fintech industry Uganda',serviceType:'Fintech Solutions',
    problem:{h:'Fintech is Reshaping Finance in Uganda',c:'Uganda\'s fintech sector is one of Africa\'s fastest-growing. From mobile money to digital lending, technology is making financial services accessible to millions. DeryCode builds the software powering this transformation.'},
    features:{h:'Fintech Solutions',items:[
      {icon:'fa-wallet',t:'Digital Wallets',d:'Mobile wallet apps with MoMo and crypto support.'},
      {icon:'fa-piggy-bank',t:'Lending Platforms',d:'Digital lending with automated credit scoring.'},
      {icon:'fa-mobile-money-bill',t:'Payment Systems',d:'MoMo, card, and bank payment processing.'},
      {icon:'fa-university',t:'SACCO Software',d:'Complete SACCO management systems.'},
      {icon:'fa-coins',t:'Blockchain Finance',d:'DeFi protocols and crypto wallets.'},
      {icon:'fa-shield-halved',t:'Security & Compliance',d:'KYC, AML, fraud detection, and audit trails.'}
    ]},
    links:{h:'Fintech Services',items:[
      {url:'/services/fintech-software.html',t:'Fintech Software',d:'Full fintech development.'},
      {url:'/services/payment-integration.html',t:'Payment Integration',d:'Payment gateway services.'},
      {url:'/services/loan-management.html',t:'Loan Management',d:'Lending systems.'},
      {url:'/services/digital-wallet.html',t:'Digital Wallet',d:'Wallet development.'},
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'SACCO systems.'},
      {url:'/services/blockchain-development.html',t:'Blockchain',d:'Blockchain finance.'}
    ]},
    faqs:[
      {q:'How much does fintech software cost?',a:'Fintech software starts from UGX 3,800,000. Full digital banking or lending platforms cost UGX 15,000,000+.'}
    ]
  },
  {path:'industries/restaurants.html',h1:'Restaurant Software in Uganda',title:'Restaurant Software Uganda | DeryCode',desc:'Restaurant software in Uganda. POS systems, order management, kitchen displays, and online ordering. DeryCode restaurant technology experts.',kw:'restaurant software Uganda, restaurant POS Uganda, restaurant management Uganda, restaurant software Kampala',serviceType:'Restaurant Software',
    features:{h:'Restaurant Software Features',items:[
      {icon:'fa-utensils',t:'POS System',d:'Fast order entry and table management.'},
      {icon:'fa-mobile-screen',t:'Online Ordering',d:'Accept orders online with delivery.'},
      {icon:'fa-boxes-stacked',t:'Inventory',d:'Track ingredients and supplies.'},
      {icon:'fa-receipt',t:'Billing',d:'Split bills, tips, and MoMo payments.'},
      {icon:'fa-chart-line',t:'Sales Reports',d:'Daily, weekly, and monthly sales.'},
      {icon:'fa-people-group',t:'Staff Management',d:'Shifts, roles, and performance.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/pos-software.html',t:'POS Software',d:'POS development.'},
      {url:'/services/inventory-management.html',t:'Inventory Management',d:'Stock management.'},
      {url:'/services/web-development.html',t:'Web Development',d:'Restaurant websites.'}
    ]},
    faqs:[{q:'How much does restaurant software cost?',a:'Restaurant POS and management software starts from UGX 2,500,000.'}]
  },
  {path:'industries/agriculture.html',h1:'Agriculture Software in Uganda',title:'Agriculture Software Uganda | DeryCode',desc:'Agriculture software development in Uganda. Farm management, GPS verification, weather integration, and SACCO systems for farmers.',kw:'agriculture software Uganda, agritech Uganda, farm software Uganda, agriculture technology Uganda',serviceType:'Agriculture Software',
    features:{h:'Agriculture Software Features',items:[
      {icon:'fa-tractor',t:'Farm Management',d:'Track crops, inputs, and yields.'},
      {icon:'fa-location-dot',t:'GPS Verification',d:'Verify farm boundaries and acreage.'},
      {icon:'fa-cloud-sun',t:'Weather Data',d:'NASA POWER API climate integration.'},
      {icon:'fa-piggy-bank',t:'Farmer SACCOs',d:'Savings and loan management for farmers.'},
      {icon:'fa-mobile-screen',t:'Offline App',d:'Works offline in rural areas.'},
      {icon:'fa-language',t:'Local Languages',d:'Runyoro, Luganda, and more.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'Farmer SACCO systems.'},
      {url:'/products/sacco-wallet.html',t:'SaccoWallet',d:'Our farmer wallet product.'},
      {url:'/services/mobile-app-development.html',t:'Mobile Apps',d:'Offline-first apps.'}
    ]},
    faqs:[{q:'How much does agriculture software cost?',a:'Agriculture software starts from UGX 4,000,000. Systems with GPS and weather integration cost more.'}]
  },
  {path:'industries/ngos.html',h1:'NGO Software in Uganda',title:'NGO Software Uganda | DeryCode',desc:'NGO and nonprofit software development in Uganda. Donor management, project tracking, M&E systems, and impact reporting.',kw:'NGO software Uganda, nonprofit software Uganda, NGO platform Uganda, NGO website Uganda',serviceType:'NGO Software',
    features:{h:'NGO Software Features',items:[
      {icon:'fa-hand-holding-dollar',t:'Donor Management',d:'Track donors, donations, and relationships.'},
      {icon:'fa-clipboard-list',t:'Project Tracking',d:'Monitor projects, budgets, and milestones.'},
      {icon:'fa-chart-line',t:'M&E Systems',d:'Monitoring and evaluation dashboards.'},
      {icon:'fa-file-lines',t:'Impact Reports',d:'Generate donor and impact reports.'},
      {icon:'fa-globe',t:'NGO Website',d:'Professional website with donation portal.'},
      {icon:'fa-mobile-money-bill',t:'Payment Processing',d:'Accept donations via MoMo and cards.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/web-development.html',t:'Web Development',d:'NGO websites.'},
      {url:'/services/crm-software.html',t:'CRM Software',d:'Donor CRM.'},
      {url:'/services/payment-integration.html',t:'Payment Integration',d:'Donation payments.'}
    ]},
    faqs:[{q:'How much does NGO software cost?',a:'NGO software starts from UGX 3,000,000. Full M&E systems cost more.'}]
  },
  {path:'industries/retail.html',h1:'Retail Software in Uganda',title:'Retail Software Uganda | DeryCode',desc:'Retail software development in Uganda. POS systems, inventory management, e-commerce, and retail analytics.',kw:'retail software Uganda, retail management Uganda, retail technology Uganda, shop software Uganda',serviceType:'Retail Software',
    features:{h:'Retail Software Features',items:[
      {icon:'fa-cash-register',t:'POS System',d:'Fast checkout with barcode scanning.'},
      {icon:'fa-boxes-stacked',t:'Inventory',d:'Real-time stock across stores.'},
      {icon:'fa-shopping-cart',t:'E-Commerce',d:'Online store with delivery.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Payments',d:'Accept MTN and Airtel payments.'},
      {icon:'fa-chart-line',t:'Sales Analytics',d:'Best sellers, trends, and margins.'},
      {icon:'fa-users',t:'Customer Loyalty',d:'Loyalty points and promotions.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/pos-software.html',t:'POS Software',d:'Point of sale systems.'},
      {url:'/services/ecommerce-development.html',t:'E-Commerce',d:'Online store development.'},
      {url:'/services/inventory-management.html',t:'Inventory Management',d:'Stock management.'}
    ]},
    faqs:[{q:'How much does retail software cost?',a:'Retail software starts from UGX 2,500,000 for POS and inventory.'}]
  },
  {path:'industries/logistics.html',h1:'Logistics Software in Uganda',title:'Logistics Software Uganda | DeryCode',desc:'Logistics software development in Uganda. Fleet management, delivery tracking, route optimization, and warehouse management.',kw:'logistics software Uganda, logistics management Uganda, fleet management Uganda, delivery software Uganda',serviceType:'Logistics Software',
    features:{h:'Logistics Software Features',items:[
      {icon:'fa-truck',t:'Fleet Management',d:'Track vehicles, drivers, and maintenance.'},
      {icon:'fa-route',t:'Route Optimization',d:'Optimize delivery routes.'},
      {icon:'fa-box',t:'Delivery Tracking',d:'Real-time package tracking.'},
      {icon:'fa-warehouse',t:'Warehouse',d:'Warehouse management system.'},
      {icon:'fa-mobile-money-bill',t:'COD Management',d:'Cash-on-delivery tracking with MoMo.'},
      {icon:'fa-chart-bar',t:'Logistics Analytics',d:'Performance and cost analysis.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/warehouse-management.html',t:'Warehouse Management',d:'WMS development.'},
      {url:'/services/inventory-management.html',t:'Inventory Management',d:'Stock management.'},
      {url:'/services/mobile-app-development.html',t:'Mobile Apps',d:'Driver and customer apps.'}
    ]},
    faqs:[{q:'How much does logistics software cost?',a:'Logistics software starts from UGX 4,000,000.'}]
  },
  {path:'industries/construction.html',h1:'Construction Software in Uganda',title:'Construction Software Uganda | DeryCode',desc:'Construction software development in Uganda. Project management, cost tracking, procurement, and construction ERP.',kw:'construction software Uganda, construction management Uganda, construction ERP Uganda, project management Uganda',serviceType:'Construction Software',
    features:{h:'Construction Software Features',items:[
      {icon:'fa-hard-hat',t:'Project Management',d:'Track projects, timelines, and milestones.'},
      {icon:'fa-calculator',t:'Cost Tracking',d:'Monitor project costs and budgets.'},
      {icon:'fa-clipboard-list',t:'Procurement',d:'Material procurement and supplier management.'},
      {icon:'fa-people-group',t:'Labor Management',d:'Track workers, attendance, and wages.'},
      {icon:'fa-database',t:'Document Management',d:'Drawings, contracts, and permits.'},
      {icon:'fa-chart-line',t:'Progress Reports',d:'Visual progress tracking and reporting.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/erp-software.html',t:'ERP Software',d:'Construction ERP.'},
      {url:'/services/project-management.html',t:'Project Management',d:'Project management software.'}
    ]},
    faqs:[{q:'How much does construction software cost?',a:'Construction software starts from UGX 4,000,000.'}]
  },
  {path:'industries/manufacturing.html',h1:'Manufacturing Software in Uganda',title:'Manufacturing Software Uganda | DeryCode',desc:'Manufacturing software development in Uganda. Production management, quality control, inventory, and manufacturing ERP.',kw:'manufacturing software Uganda, manufacturing ERP Uganda, production management Uganda, factory software Uganda',serviceType:'Manufacturing Software',
    features:{h:'Manufacturing Software Features',items:[
      {icon:'fa-industry',t:'Production Planning',d:'Schedule and track production runs.'},
      {icon:'fa-clipboard-check',t:'Quality Control',d:'Quality checks and defect tracking.'},
      {icon:'fa-boxes-stacked',t:'Inventory',d:'Raw materials and finished goods.'},
      {icon:'fa-gears',t:'Equipment Management',d:'Machine maintenance and downtime.'},
      {icon:'fa-chart-line',t:'Production Analytics',d:'Output, efficiency, and OEE.'},
      {icon:'fa-truck',t:'Supply Chain',d:'Supplier and distribution management.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/erp-software.html',t:'ERP Software',d:'Manufacturing ERP.'},
      {url:'/services/inventory-management.html',t:'Inventory',d:'Stock management.'}
    ]},
    faqs:[{q:'How much does manufacturing software cost?',a:'Manufacturing software starts from UGX 5,000,000.'}]
  }
];

for (const ind of industries) {
  writePage(ind.path, page(ind));
}

// ── 4. LOCATION PAGES ──
console.log('\n=== Generating Location Pages ===');

const locations = [
  {city:'Kampala',slug:'kampala',geo:'0.3476;32.5825',desc:'Kampala, Uganda\'s capital and largest city, is the hub of technology and business in East Africa.'},
  {city:'Wakiso',slug:'wakiso',geo:'0.4044;32.4637',desc:'Wakiso is a rapidly growing district surrounding Kampala with a thriving business community.'},
  {city:'Entebbe',slug:'entebbe',geo:'0.0511;32.4601',desc:'Entebbe, home to Uganda\'s international airport, is a key commercial hub on Lake Victoria.'},
  {city:'Jinja',slug:'jinja',geo:'0.4403;33.8586',desc:'Jinja is Uganda\'s second-largest commercial center and the source of the Nile.'},
  {city:'Mbarara',slug:'mbarara',geo:'-0.6167;30.6500',desc:'Mbarara is the largest city in western Uganda and a major commercial center.'},
  {city:'Gulu',slug:'gulu',geo:'2.7747;32.2990',desc:'Gulu is the largest city in northern Uganda and a growing commercial hub.'},
  {city:'Mbale',slug:'mbale',geo:'1.0833;34.1833',desc:'Mbale is a major commercial center in eastern Uganda.'},
  {city:'Fort Portal',slug:'fort-portal',geo:'0.6610;30.2750',desc:'Fort Portal is the gateway to western Uganda\'s tourism and agricultural economy.'}
];

for (const loc of locations) {
  const p = {
    path: `locations/${loc.slug}/software-development.html`,
    h1: `Software Development Company in ${loc.city}, Uganda`,
    title: `Software Development ${loc.city} Uganda | DeryCode`,
    desc: `DeryCode provides software development services in ${loc.city}, Uganda. Custom software, web development, mobile apps, and IT consulting for businesses in ${loc.city}.`,
    kw: `software development ${loc.city}, software company ${loc.city}, IT company ${loc.city}, web development ${loc.city}, mobile app development ${loc.city}`,
    serviceType: 'Software Development',
    breadcrumbs: [{name:'Home',url:'/'},{name:'Locations',url:'/locations/'},{name:loc.city,url:`/locations/${loc.slug}/software-development.html`}],
    lead: `DeryCode is a leading software development company serving businesses in ${loc.city} and across Uganda. ${loc.desc} We build custom software, websites, mobile apps, and enterprise systems for businesses of all sizes.`,
    problem: {h:`Why ${loc.city} Businesses Choose DeryCode`,c:`As ${loc.city} grows as a business hub, local companies need technology partners who understand the Ugandan market. DeryCode combines international development standards with deep local knowledge — building software that works for ${loc.city} businesses and their customers.`},
    features: {h:'Our Services in '+loc.city,items:[
      {icon:'fa-code',t:'Software Development',d:'Custom software for businesses in '+loc.city+'.'},
      {icon:'fa-globe',t:'Web Development',d:'Professional websites and web applications.'},
      {icon:'fa-mobile-screen',t:'Mobile Apps',d:'iOS and Android apps for '+loc.city+' businesses.'},
      {icon:'fa-magnifying-glass',t:'SEO Services',d:'Rank higher on Google in '+loc.city+'.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Integration',d:'MTN MoMo and Airtel Money integration.'},
      {icon:'fa-brands fa-whatsapp',t:'WhatsApp Automation',d:'WhatsApp business automation.'}
    ]},
    links: {h:'Our Services',items:[
      {url:'/services/software-development.html',t:'Software Development',d:'Custom software services.'},
      {url:'/services/web-development.html',t:'Web Development',d:'Website development.'},
      {url:'/services/mobile-app-development.html',t:'Mobile Apps',d:'App development.'},
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'SACCO management systems.'},
      {url:'/services/erp-software.html',t:'ERP Software',d:'ERP systems.'},
      {url:'/pricing/website-cost-uganda.html',t:'Website Pricing',d:'Get a quote.'}
    ]},
    faqs:[
      {q:`Do you work with clients in ${loc.city}?`,a:`Yes. While we're based in Kampala, we serve clients across Uganda including ${loc.city}. We communicate via WhatsApp, email, and video calls, and can visit your ${loc.city} office when needed.`},
      {q:`How much does software development cost in ${loc.city}?`,a:'Pricing is the same across Uganda. Websites start from UGX 750,000, mobile apps from UGX 4,400,000, and custom software from UGX 2,200,000.'}
    ]
  };
  writePage(p.path, page(p));
}

// ── 5. COMPARISON PAGES ──
console.log('\n=== Generating Comparison Pages ===');

const comparisons = [
  {path:'comparisons/best-sacco-software-uganda.html',h1:'Best SACCO Software in Uganda',title:'Best SACCO Software Uganda 2026 | DeryCode',desc:'Compare the best SACCO software in Uganda. Features, pricing, and recommendations for Ugandan SACCOs. Comprehensive SACCO software comparison.',kw:'best SACCO software Uganda, SACCO software comparison Uganda, top SACCO software Uganda, SACCO system comparison Uganda',
    problem:{h:'Choosing the Right SACCO Software',c:'With many SACCO software options available in Uganda, choosing the right one for your cooperative is critical. This comparison helps SACCO leaders evaluate options based on features, pricing, and local support.'},
    features:{h:'What to Look for in SACCO Software',items:[
      {icon:'fa-mobile-money-bill',t:'MoMo Integration',d:'MTN MoMo and Airtel Money deposit/repayment support.'},
      {icon:'fa-wifi',t:'Offline Support',d:'Works without internet — critical for rural SACCOs.'},
      {icon:'fa-users',t:'Member Management',d:'Member registration, KYC, and profiles.'},
      {icon:'fa-file-contract',t:'Loan Management',d:'Full loan lifecycle from application to repayment.'},
      {icon:'fa-chart-pie',t:'Shares & Dividends',d:'Share capital and dividend calculation.'},
      {icon:'fa-chart-bar',t:'Financial Reports',d:'Balance sheets, P&L, and regulatory reports.'}
    ]},
    paragraphs:[{h:'Key Factors When Choosing SACCO Software',c:'When evaluating SACCO software in Uganda, consider: (1) Does it support mobile money integration? (2) Can it work offline? (3) Is it affordable for your SACCO size? (4) Does the vendor offer local support? (5) Can it scale as your SACCO grows? (6) Does it meet regulatory requirements from the Uganda Microfinance Regulatory Authority?'}],
    links:{h:'DeryCode SACCO Solutions',items:[
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'Our complete SACCO system.'},
      {url:'/products/sacco-wallet.html',t:'SaccoWallet',d:'Our SACCO wallet product.'},
      {url:'/pricing/sacco-software-cost-uganda.html',t:'SACCO Software Cost',d:'Pricing info.'},
      {url:'/services/sacco-mobile-app.html',t:'SACCO Mobile App',d:'Member mobile app.'}
    ]},
    faqs:[
      {q:'What is the best SACCO software in Uganda?',a:'The best SACCO software depends on your SACCO\'s size, location, and needs. Key features to look for include MoMo integration, offline support, loan management, and local vendor support.'},
      {q:'How much does SACCO software cost in Uganda?',a:'SACCO software costs range from UGX 3,800,000 for basic systems to UGX 15,000,000+ for enterprise solutions. Monthly maintenance typically costs UGX 500,000-1,500,000.'}
    ]
  },
  {path:'comparisons/best-software-companies-uganda.html',h1:'Best Software Companies in Uganda',title:'Best Software Companies Uganda 2026 | DeryCode',desc:'List of the best software development companies in Uganda. Compare services, expertise, and pricing. Find the right software partner for your business.',kw:'best software companies Uganda, top software companies Uganda, leading software companies Uganda, best IT companies Uganda',
    problem:{h:'Finding the Right Software Partner',c:'Choosing a software development company is a significant decision. This guide helps Ugandan businesses evaluate software companies based on expertise, portfolio, support, and local market knowledge.'},
    features:{h:'What to Look for in a Software Company',items:[
      {icon:'fa-code',t:'Technical Expertise',d:'Modern technologies and proven development practices.'},
      {icon:'fa-folder-open',t:'Portfolio',d:'Relevant projects in your industry or with similar requirements.'},
      {icon:'fa-headset',t:'Local Support',d:'Ongoing support from a team that understands Uganda.'},
      {icon:'fa-mobile-money-bill',t:'Local Integration',d:'MoMo, Airtel Money, and Ugandan payment support.'},
      {icon:'fa-shield-halved',t:'Security',d:'Secure coding practices and data protection.'},
      {icon:'fa-comments',t:'Communication',d:'Clear, responsive communication throughout the project.'}
    ]},
    links:{h:'About DeryCode',items:[
      {url:'/about.html',t:'About DeryCode',d:'Learn about our company.'},
      {url:'/authors/asiimwe-derick.html',t:'Meet the Founder',d:'Asiimwe Derick, CEO.'},
      {url:'/services/software-development.html',t:'Our Services',d:'Full service catalog.'},
      {url:'/pricing/website-cost-uganda.html',t:'Pricing',d:'Transparent pricing.'}
    ]},
    faqs:[
      {q:'What should I look for in a software company in Uganda?',a:'Look for: local market understanding, MoMo integration experience, relevant portfolio, clear communication, transparent pricing, and ongoing support.'},
      {q:'How much do software companies in Uganda charge?',a:'Software development rates in Uganda vary. Websites start from UGX 750,000, mobile apps from UGX 4,400,000, and custom software from UGX 2,200,000.'}
    ]
  },
  {path:'comparisons/best-web-design-companies-kampala.html',h1:'Best Web Design Companies in Kampala',title:'Best Web Design Companies Kampala 2026 | DeryCode',desc:'Compare the best web design companies in Kampala, Uganda. Services, pricing, and portfolio comparison to help you choose.',kw:'best web design companies Kampala, top web designers Kampala, web design companies Kampala, best web design Kampala',
    features:{h:'What Makes a Great Web Design Company',items:[
      {icon:'fa-palette',t:'Design Quality',d:'Modern, responsive, and conversion-focused designs.'},
      {icon:'fa-bolt',t:'Performance',d:'Fast-loading sites optimized for mobile.'},
      {icon:'fa-magnifying-glass',t:'SEO Built-in',d:'SEO-friendly code and structure.'},
      {icon:'fa-mobile-money-bill',t:'Local Integration',d:'MoMo and local payment integration.'},
      {icon:'fa-headset',t:'Support',d:'Ongoing maintenance and updates.'},
      {icon:'fa-shield-halved',t:'Security',d:'SSL, backups, and security best practices.'}
    ]},
    links:{h:'DeryCode Web Services',items:[
      {url:'/services/web-design.html',t:'Web Design',d:'Our design services.'},
      {url:'/services/web-development.html',t:'Web Development',d:'Our development services.'},
      {url:'/pricing/website-cost-uganda.html',t:'Website Cost',d:'Transparent pricing.'}
    ]},
    faqs:[
      {q:'How much does web design cost in Kampala?',a:'Professional web design in Kampala starts from UGX 750,000 for a business website. E-commerce and custom web apps cost more.'}
    ]
  },
  {path:'comparisons/best-erp-software-uganda.html',h1:'Best ERP Software in Uganda',title:'Best ERP Software Uganda 2026 | DeryCode',desc:'Compare the best ERP software solutions for Ugandan businesses. Features, pricing, and recommendations for SMEs and enterprises.',kw:'best ERP software Uganda, top ERP software Uganda, ERP comparison Uganda, best ERP Uganda',
    features:{h:'What to Look for in ERP Software',items:[
      {icon:'fa-boxes-stacked',t:'Inventory',d:'Real-time stock management.'},
      {icon:'fa-calculator',t:'Accounting',d:'Full accounting and financial management.'},
      {icon:'fa-users',t:'HR & Payroll',d:'Employee management and payroll.'},
      {icon:'fa-cash-register',t:'POS',d:'Point of sale integration.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Integration',d:'Mobile money payment support.'},
      {icon:'fa-chart-line',t:'Analytics',d:'Business intelligence dashboards.'}
    ]},
    links:{h:'DeryCode ERP Solutions',items:[
      {url:'/services/erp-software.html',t:'ERP Software',d:'Our ERP development.'},
      {url:'/pricing/erp-software-cost-uganda.html',t:'ERP Cost',d:'ERP pricing.'},
      {url:'/services/erp-for-smes.html',t:'ERP for SMEs',d:'SME-focused ERP.'}
    ]},
    faqs:[{q:'How much does ERP software cost in Uganda?',a:'Custom ERP development starts from UGX 3,500,000. Full systems cost UGX 12,000,000+.'}]
  },
  {path:'comparisons/best-school-management-software-uganda.html',h1:'Best School Management Software in Uganda',title:'Best School Management Software Uganda 2026 | DeryCode',desc:'Compare the best school management software in Uganda. Features, pricing, and recommendations for Ugandan schools.',kw:'best school management software Uganda, top school software Uganda, school software comparison Uganda',
    features:{h:'What to Look for in School Software',items:[
      {icon:'fa-user-graduate',t:'Student Management',d:'Student records and profiles.'},
      {icon:'fa-money-bill',t:'Fees Management',d:'Fees collection with MoMo support.'},
      {icon:'fa-clipboard-check',t:'Exam Management',d:'Grade entry and report cards.'},
      {icon:'fa-brands fa-whatsapp',t:'Parent Portal',d:'Parent communication portal.'},
      {icon:'fa-laptop',t:'E-Learning',d:'Online learning capabilities.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Payment',d:'Accept fees via mobile money.'}
    ]},
    links:{h:'DeryCode Education Solutions',items:[
      {url:'/services/school-management-system.html',t:'School Management System',d:'Our school system.'},
      {url:'/products/school-sync-manager.html',t:'School Sync Manager',d:'Our product.'},
      {url:'/services/lms.html',t:'LMS',d:'Learning management system.'}
    ]},
    faqs:[{q:'How much does school management software cost?',a:'School management software starts from UGX 3,000,000. Full systems with parent portals cost UGX 8,000,000+.'}]
  },
  {path:'comparisons/wordpress-vs-custom-website-uganda.html',h1:'WordPress vs Custom Website in Uganda',title:'WordPress vs Custom Website Uganda | DeryCode',desc:'WordPress vs custom website development in Uganda. Pros, cons, costs, and which is right for your Ugandan business.',kw:'WordPress vs custom website Uganda, WordPress vs custom development Uganda, WordPress vs HTML Uganda, build vs buy website Uganda',
    paragraphs:[
      {h:'WordPress: Pros and Cons',c:'WordPress is the world\'s most popular CMS. Pros: easy to use, lots of plugins, relatively low cost to start. Cons: security vulnerabilities, plugin conflicts, performance issues with heavy plugins, and limited customization for complex features.'},
      {h:'Custom Website: Pros and Cons',c:'A custom-built website is coded from scratch for your specific needs. Pros: unlimited customization, better performance, stronger security, no plugin dependencies, full control. Cons: higher initial cost, requires a developer for changes.'},
      {h:'Which is Right for Your Ugandan Business?',c:'For a simple business website or blog, WordPress can work well and costs less upfront. For e-commerce, SaaS, or applications with custom features, a custom website is better long-term. Many Ugandan businesses start with WordPress and upgrade to custom when they outgrow it.'},
      {h:'Cost Comparison',c:'WordPress: UGX 500,000-2,000,000 upfront + UGX 200,000+/month maintenance. Custom: UGX 750,000-5,000,000 upfront + UGX 100,000+/month hosting. Over 2-3 years, total cost of ownership is often similar.'}
    ],
    links:{h:'Related Resources',items:[
      {url:'/services/web-development.html',t:'Web Development',d:'Our development services.'},
      {url:'/services/wordpress-development.html',t:'WordPress Development',d:'WordPress services.'},
      {url:'/pricing/website-cost-uganda.html',t:'Website Cost',d:'Pricing comparison.'}
    ]},
    faqs:[
      {q:'Is WordPress or custom website better for Uganda?',a:'For simple sites, WordPress is fine. For complex features, e-commerce, or apps, custom is better. We help you choose based on your specific needs and budget.'},
      {q:'Can I switch from WordPress to custom later?',a:'Yes. We can migrate your WordPress content to a custom website while preserving SEO and URLs.'}
    ]
  },
  {path:'comparisons/flutter-vs-react-native-uganda.html',h1:'Flutter vs React Native in Uganda',title:'Flutter vs React Native Uganda | DeryCode',desc:'Flutter vs React Native comparison for Ugandan startups. Performance, cost, learning curve, and which framework to choose for your app.',kw:'Flutter vs React Native Uganda, Flutter vs React Native for Uganda, cross-platform comparison Uganda, mobile framework Uganda',
    paragraphs:[
      {h:'Flutter Overview',c:'Flutter is Google\'s UI toolkit for building natively compiled apps from a single Dart codebase. It offers excellent performance (60-120fps), beautiful UI with Material Design, and hot reload for fast development.'},
      {h:'React Native Overview',c:'React Native is Facebook\'s framework using JavaScript. It lets web developers build mobile apps, has a massive ecosystem of npm packages, and offers near-native performance.'},
      {h:'Performance',c:'Flutter has a slight edge in performance and UI consistency because it renders its own widgets. React Native uses native components but can have slight inconsistency between platforms.'},
      {h:'For Ugandan Startups',c:'If your team knows JavaScript, React Native is faster to adopt. If you want the best UI performance and don\'t mind learning Dart, Flutter is excellent. Both support offline functionality and MoMo integration — critical for Uganda.'},
      {h:'Cost',c:'Both frameworks give you Android and iOS from one codebase, saving 40-50% vs native development. Flutter development starts from UGX 4,400,000, React Native similarly.'}
    ],
    links:{h:'Our Mobile Services',items:[
      {url:'/services/flutter-development.html',t:'Flutter Development',d:'Flutter app development.'},
      {url:'/services/react-native-development.html',t:'React Native Development',d:'React Native app development.'},
      {url:'/services/mobile-app-development.html',t:'Mobile App Development',d:'All mobile services.'}
    ]},
    faqs:[
      {q:'Which is better for Uganda: Flutter or React Native?',a:'Both are excellent. Choose Flutter for the best UI performance. Choose React Native if your team knows JavaScript. We can help you decide based on your project.'}
    ]
  },
  {path:'comparisons/supabase-vs-firebase-uganda.html',h1:'Supabase vs Firebase in Uganda',title:'Supabase vs Firebase Uganda | DeryCode',desc:'Supabase vs Firebase comparison for Ugandan developers. Features, pricing, offline support, and which backend to choose.',kw:'Supabase vs Firebase Uganda, Supabase or Firebase Uganda, backend comparison Uganda, backend as a service Uganda',
    paragraphs:[
      {h:'Firebase Overview',c:'Firebase is Google\'s Backend-as-a-Service with Firestore, Authentication, Cloud Functions, and Hosting. It\'s NoSQL-based with excellent offline support and real-time sync.'},
      {h:'Supabase Overview',c:'Supabase is an open-source alternative to Firebase built on PostgreSQL. It offers database, authentication, storage, and real-time subscriptions with the power of SQL.'},
      {h:'For Ugandan Projects',c:'Firebase is excellent for rapid prototyping and apps that need heavy offline sync. Supabase is better for apps with complex data relationships, SQL requirements, or when you want open-source. Both work well in Uganda.'},
      {h:'Pricing',c:'Firebase has a generous free tier but costs scale with usage. Supabase also has a free tier and may be more cost-effective for data-heavy applications. Both are suitable for Ugandan startups.'}
    ],
    links:{h:'Our Backend Services',items:[
      {url:'/services/supabase-development.html',t:'Supabase Development',d:'Supabase services.'},
      {url:'/services/firebase-development.html',t:'Firebase Development',d:'Firebase services.'},
      {url:'/services/database-development.html',t:'Database Development',d:'Custom database services.'}
    ]},
    faqs:[
      {q:'Which backend is better for Uganda?',a:'Firebase is better for offline-first apps and rapid development. Supabase is better for complex data and SQL needs. Both work well in Uganda.'}
    ]
  },
  {path:'comparisons/custom-vs-off-the-shelf-software-uganda.html',h1:'Custom vs Off-the-Shelf Software in Uganda',title:'Custom vs Off-the-Shelf Software Uganda | DeryCode',desc:'Custom software vs off-the-shelf software in Uganda. Pros, cons, costs, and which approach is right for your business.',kw:'custom software vs off-the-shelf Uganda, build vs buy software Uganda, custom vs packaged software Uganda',
    paragraphs:[
      {h:'Off-the-Shelf Software',c:'Off-the-shelf software (like QuickBooks, Tally, or generic ERP) is pre-built and ready to use. Pros: lower upfront cost, quick deployment, proven features. Cons: doesn\'t fit your exact workflows, limited customization, ongoing licensing fees, may not support local needs like MoMo.'},
      {h:'Custom Software',c:'Custom software is built specifically for your business. Pros: exact match to your workflows, full customization, no licensing fees, MoMo integration, competitive advantage. Cons: higher upfront cost, development time, needs developer for changes.'},
      {h:'The Decision Framework',c:'Choose off-the-shelf if: your processes are standard, budget is tight, and you need to launch quickly. Choose custom if: you have unique workflows, need local integrations (MoMo, EFRIS), want to scale, or off-the-shelf options don\'t fit.'},
      {h:'Total Cost Over 3 Years',c:'Off-the-shelf: UGX 1,000,000/year licensing = UGX 3,000,000 over 3 years. Custom: UGX 5,000,000 upfront + UGX 600,000/year maintenance = UGX 6,800,000 over 3 years. But custom saves UGX 3,000,000 in licensing — so net cost is similar.'}
    ],
    links:{h:'Related Resources',items:[
      {url:'/services/software-development.html',t:'Software Development',d:'Custom development.'},
      {url:'/pricing/software-development-cost-uganda.html',t:'Software Cost',d:'Pricing info.'},
      {url:'/services/software-consulting.html',t:'Software Consulting',d:'Get expert advice.'}
    ]},
    faqs:[
      {q:'Is custom software worth it in Uganda?',a:'For growing businesses with specific needs, yes. Custom software eliminates ongoing licensing fees, integrates with MoMo, and fits your exact workflows. The ROI typically justifies the investment within 2-3 years.'}
    ]
  }
];

for (const cmp of comparisons) {
  writePage(cmp.path, page(cmp));
}

// ── 6. PRICING PAGES ──
console.log('\n=== Generating Pricing Pages ===');

const pricingPages = [
  {path:'pricing/website-cost-uganda.html',h1:'Website Cost in Uganda',title:'Website Cost Uganda 2026 | DeryCode Pricing',desc:'How much does a website cost in Uganda? Transparent pricing for business websites, e-commerce, and web apps in Uganda. DeryCode website pricing guide.',kw:'website cost Uganda, website design prices Uganda, website development cost Uganda, how much does a website cost in Uganda, website price Uganda',
    breadcrumbs:[{name:'Home',url:'/'},{name:'Pricing',url:'/pricing/website-cost-uganda.html'},{name:'Website Cost',url:'/pricing/website-cost-uganda.html'}],
    lead:'One of the most common questions we get: "How much does a website cost in Uganda?" This guide breaks down pricing transparently so you know exactly what to expect.',
    problem:{h:'Understanding Website Costs in Uganda',c:'Website costs in Uganda vary based on type, features, and complexity. A simple business website costs less than an e-commerce platform or custom web application. Here\'s our transparent pricing breakdown.'},
    features:{h:'Website Pricing Tiers',items:[
      {icon:'fa-globe',t:'Business Website',d:'UGX 750,000 – 2,500,000. 5-10 pages, responsive, SEO-ready, contact form.'},
      {icon:'fa-shopping-cart',t:'E-Commerce Website',d:'UGX 2,500,000 – 6,000,000. Product catalog, cart, checkout, MoMo integration.'},
      {icon:'fa-server',t:'Web Application',d:'UGX 4,000,000 – 15,000,000. Custom functionality, user accounts, dashboards.'},
      {icon:'fa-rocket',t:'Enterprise Platform',d:'UGX 15,000,000+. Complex integrations, multi-tenant, custom APIs.'}
    ]},
    paragraphs:[
      {h:'What Affects Website Cost',c:'Factors that impact pricing: number of pages, design complexity, custom features, e-commerce functionality, payment integration (MoMo, cards), content management system, multi-language support, performance optimization, and SEO setup.'},
      {h:'Ongoing Costs',c:'Hosting: UGX 100,000-500,000/year. Domain: UGX 80,000/year. Maintenance: UGX 200,000-500,000/year. SSL: Free with our hosting. Security updates: included in maintenance.'}
    ],
    links:{h:'Get Started',items:[
      {url:'/services/web-development.html',t:'Web Development',d:'Our development services.'},
      {url:'/services/web-design.html',t:'Web Design',d:'Our design services.'},
      {url:'/services/website-maintenance.html',t:'Maintenance',d:'Website maintenance plans.'},
      {url:'/services/website-hosting.html',t:'Hosting',d:'Website hosting.'}
    ]},
    faqs:[
      {q:'How much does a website cost in Uganda?',a:'A professional business website in Uganda costs between UGX 750,000 and UGX 2,500,000. E-commerce sites cost UGX 2,500,000-6,000,000. Custom web applications cost UGX 4,000,000+.'},
      {q:'Do you offer payment plans?',a:'Yes. We offer flexible payment plans: 50% upfront, 25% at milestone, 25% on completion. For larger projects, we can arrange monthly installments.'},
      {q:'What\'s included in the price?',a:'Our pricing includes design, development, testing, deployment, basic SEO setup, SSL, mobile responsiveness, and 30 days of post-launch support.'},
      {q:'Are there ongoing costs?',a:'Yes: hosting (UGX 100,000-500,000/year), domain (UGX 80,000/year), and optional maintenance (UGX 200,000-500,000/year).'}
    ]
  },
  {path:'pricing/mobile-app-cost-uganda.html',h1:'Mobile App Development Cost in Uganda',title:'Mobile App Cost Uganda 2026 | DeryCode Pricing',desc:'How much does a mobile app cost in Uganda? Transparent pricing for Android, iOS, and cross-platform apps. DeryCode mobile app pricing guide.',kw:'mobile app cost Uganda, app development cost Uganda, how much does an app cost Uganda, mobile app price Uganda',
    breadcrumbs:[{name:'Home',url:'/'},{name:'Pricing',url:'/pricing/website-cost-uganda.html'},{name:'Mobile App Cost',url:'/pricing/mobile-app-cost-uganda.html'}],
    problem:{h:'Understanding App Costs in Uganda',c:'Mobile app development costs depend on platform (Android, iOS, or both), features, design complexity, and integrations. Here\'s our transparent breakdown.'},
    features:{h:'App Pricing Tiers',items:[
      {icon:'fa-mobile-screen',t:'Basic App',d:'UGX 4,400,000 – 7,000,000. 5-10 screens, basic functionality, API integration.'},
      {icon:'fa-mobile-screen',t:'Standard App',d:'UGX 7,000,000 – 15,000,000. User accounts, MoMo, push notifications, offline support.'},
      {icon:'fa-mobile-screen',t:'Complex App',d:'UGX 15,000,000 – 30,000,000. Real-time features, complex APIs, AI, multi-language.'},
      {icon:'fa-mobile-screen',t:'Enterprise App',d:'UGX 30,000,000+. Full enterprise platform, integrations, admin panels.'}
    ]},
    paragraphs:[
      {h:'What Affects App Cost',c:'Key factors: platform (Android only, iOS only, or both), number of screens, design complexity, backend development, API integrations (MoMo, payment), offline functionality, push notifications, multi-language, and testing devices.'},
      {h:'Cross-Platform Saves Money',c:'Using Flutter or React Native, we build one app for both Android and iOS, saving 40-50% compared to building separate native apps.'}
    ],
    links:{h:'Related Services',items:[
      {url:'/services/mobile-app-development.html',t:'Mobile App Development',d:'Our app services.'},
      {url:'/services/flutter-development.html',t:'Flutter Development',d:'Cross-platform apps.'},
      {url:'/services/android-app-development.html',t:'Android Development',d:'Android-specific apps.'}
    ]},
    faqs:[
      {q:'How much does a mobile app cost in Uganda?',a:'A basic mobile app starts from UGX 4,400,000. Standard apps with user accounts and MoMo cost UGX 7,000,000-15,000,000. Complex apps cost UGX 15,000,000+.'},
      {q:'Should I build for Android or iOS?',a:'In Uganda, start with Android (90%+ market share) or use cross-platform tools like Flutter to cover both from one codebase.'}
    ]
  },
  {path:'pricing/software-development-cost-uganda.html',h1:'Software Development Cost in Uganda',title:'Software Development Cost Uganda 2026 | DeryCode',desc:'How much does custom software development cost in Uganda? Transparent pricing for custom software, CRM, ERP, and enterprise systems.',kw:'software development cost Uganda, custom software pricing Uganda, software cost Uganda, how much does software cost Uganda',
    breadcrumbs:[{name:'Home',url:'/'},{name:'Pricing',url:'/pricing/website-cost-uganda.html'},{name:'Software Cost',url:'/pricing/software-development-cost-uganda.html'}],
    features:{h:'Software Pricing Tiers',items:[
      {icon:'fa-code',t:'Simple Software',d:'UGX 2,200,000 – 5,000,000. Basic CRUD app, simple dashboard.'},
      {icon:'fa-server',t:'Standard Software',d:'UGX 5,000,000 – 15,000,000. User roles, APIs, MoMo integration.'},
      {icon:'fa-building',t:'Enterprise Software',d:'UGX 15,000,000 – 50,000,000+. Multi-tenant, complex integrations, scaling.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/software-development.html',t:'Software Development',d:'Our services.'},
      {url:'/services/custom-software-development.html',t:'Custom Software',d:'Custom development.'},
      {url:'/pricing/erp-software-cost-uganda.html',t:'ERP Cost',d:'ERP pricing.'}
    ]},
    faqs:[
      {q:'How much does custom software cost in Uganda?',a:'Custom software starts from UGX 2,200,000 for simple applications. Standard business software costs UGX 5,000,000-15,000,000. Enterprise systems cost UGX 15,000,000+.'}
    ]
  },
  {path:'pricing/erp-software-cost-uganda.html',h1:'ERP Software Cost in Uganda',title:'ERP Software Cost Uganda 2026 | DeryCode',desc:'How much does ERP software cost in Uganda? Transparent pricing for custom ERP systems with inventory, HR, payroll, and POS modules.',kw:'ERP software cost Uganda, ERP pricing Uganda, ERP cost Uganda, how much does ERP cost Uganda',
    breadcrumbs:[{name:'Home',url:'/'},{name:'Pricing',url:'/pricing/website-cost-uganda.html'},{name:'ERP Cost',url:'/pricing/erp-software-cost-uganda.html'}],
    features:{h:'ERP Pricing Tiers',items:[
      {icon:'fa-boxes-stacked',t:'Basic ERP',d:'UGX 3,500,000 – 7,000,000. Inventory + basic accounting + POS.'},
      {icon:'fa-building',t:'Standard ERP',d:'UGX 7,000,000 – 15,000,000. Inventory + HR + Payroll + Accounting + CRM.'},
      {icon:'fa-server',t:'Enterprise ERP',d:'UGX 15,000,000 – 40,000,000+. All modules + custom integrations + MoMo + multi-branch.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/erp-software.html',t:'ERP Software',d:'Our ERP services.'},
      {url:'/services/erp-for-smes.html',t:'ERP for SMEs',d:'SME ERP solutions.'},
      {url:'/services/business-management-software.html',t:'Business Management',d:'Management software.'}
    ]},
    faqs:[
      {q:'How much does ERP software cost in Uganda?',a:'Basic ERP starts from UGX 3,500,000. Standard ERP with all modules costs UGX 7,000,000-15,000,000. Enterprise systems cost UGX 15,000,000+.'}
    ]
  },
  {path:'pricing/sacco-software-cost-uganda.html',h1:'SACCO Software Cost in Uganda',title:'SACCO Software Cost Uganda 2026 | DeryCode',desc:'How much does SACCO software cost in Uganda? Transparent pricing for SACCO management systems with MoMo integration.',kw:'SACCO software cost Uganda, SACCO software price Uganda, SACCO software pricing Uganda, how much does SACCO software cost Uganda',
    breadcrumbs:[{name:'Home',url:'/'},{name:'Pricing',url:'/pricing/website-cost-uganda.html'},{name:'SACCO Software Cost',url:'/pricing/sacco-software-cost-uganda.html'}],
    features:{h:'SACCO Software Pricing Tiers',items:[
      {icon:'fa-users',t:'Basic SACCO System',d:'UGX 3,800,000 – 6,000,000. Member management + savings + basic loans.'},
      {icon:'fa-mobile-money-bill',t:'Standard SACCO System',d:'UGX 6,000,000 – 12,000,000. + MoMo + mobile app + shares + dividends.'},
      {icon:'fa-university',t:'Enterprise SACCO System',d:'UGX 12,000,000 – 25,000,000+. + Credit scoring + USSD + multi-branch + advanced analytics.'}
    ]},
    links:{h:'SACCO Solutions',items:[
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'Our SACCO system.'},
      {url:'/products/sacco-wallet.html',t:'SaccoWallet',d:'Our SACCO product.'},
      {url:'/comparisons/best-sacco-software-uganda.html',t:'SACCO Comparison',d:'Compare options.'}
    ]},
    faqs:[
      {q:'How much does SACCO software cost in Uganda?',a:'Basic SACCO software starts from UGX 3,800,000. Standard systems with MoMo and mobile app cost UGX 6,000,000-12,000,000. Enterprise systems cost UGX 12,000,000+.'},
      {q:'Is there a monthly fee?',a:'Monthly maintenance starts from UGX 500,000. This includes security updates, backups, and technical support.'}
    ]
  },
  {path:'pricing/seo-services-pricing-uganda.html',h1:'SEO Services Pricing in Uganda',title:'SEO Services Pricing Uganda 2026 | DeryCode',desc:'How much do SEO services cost in Uganda? Transparent pricing for technical SEO, local SEO, and ongoing SEO management.',kw:'SEO services pricing Uganda, SEO cost Uganda, SEO pricing Uganda, how much does SEO cost Uganda',
    breadcrumbs:[{name:'Home',url:'/'},{name:'Pricing',url:'/pricing/website-cost-uganda.html'},{name:'SEO Pricing',url:'/pricing/seo-services-pricing-uganda.html'}],
    features:{h:'SEO Pricing Plans',items:[
      {icon:'fa-magnifying-glass',t:'Starter SEO',d:'UGX 1,500,000/month. Technical audit, on-page SEO, 5 keywords, monthly reports.'},
      {icon:'fa-chart-line',t:'Growth SEO',d:'UGX 3,000,000/month. Full on-page + content + link building + 15 keywords.'},
      {icon:'fa-rocket',t:'Enterprise SEO',d:'UGX 5,000,000+/month. Full service + competitor analysis + content creation + 30+ keywords.'}
    ]},
    links:{h:'SEO Services',items:[
      {url:'/services/seo-services.html',t:'SEO Services',d:'Our SEO services.'},
      {url:'/services/local-seo.html',t:'Local SEO',d:'Local SEO services.'},
      {url:'/services/digital-marketing.html',t:'Digital Marketing',d:'Full marketing services.'}
    ]},
    faqs:[
      {q:'How much does SEO cost in Uganda?',a:'SEO services start from UGX 1,500,000/month for basic optimization. Full-service SEO with content and link building costs UGX 3,000,000-5,000,000/month.'},
      {q:'How long until I see results?',a:'SEO typically shows results in 3-6 months. Significant ranking improvements usually take 6-12 months.'}
    ]
  },
  {path:'pricing/website-maintenance-cost-uganda.html',h1:'Website Maintenance Cost in Uganda',title:'Website Maintenance Cost Uganda 2026 | DeryCode',desc:'How much does website maintenance cost in Uganda? Transparent pricing for website updates, security, and support.',kw:'website maintenance cost Uganda, website maintenance pricing Uganda, website upkeep cost Uganda',
    breadcrumbs:[{name:'Home',url:'/'},{name:'Pricing',url:'/pricing/website-cost-uganda.html'},{name:'Maintenance Cost',url:'/pricing/website-maintenance-cost-uganda.html'}],
    features:{h:'Maintenance Plans',items:[
      {icon:'fa-shield-halved',t:'Basic Plan',d:'UGX 200,000/month. Security updates, backups, uptime monitoring.'},
      {icon:'fa-gears',t:'Standard Plan',d:'UGX 400,000/month. + Content updates, performance optimization, SEO monitoring.'},
      {icon:'fa-headset',t:'Premium Plan',d:'UGX 700,000/month. + Priority support, new features, dedicated manager.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/website-maintenance.html',t:'Website Maintenance',d:'Our maintenance services.'},
      {url:'/services/website-hosting.html',t:'Website Hosting',d:'Hosting services.'}
    ]},
    faqs:[{q:'How much does website maintenance cost?',a:'Website maintenance starts from UGX 200,000/month for basic security and backups. Full maintenance plans cost UGX 400,000-700,000/month.'}]
  }
];

for (const pr of pricingPages) {
  writePage(pr.path, page(pr));
}

// ── 7. PRODUCT PAGES ──
console.log('\n=== Generating Product Pages ===');

const products = [
  {path:'products/deryloan.html',h1:'DeryLoan — Loan Management Software',title:'DeryLoan | Loan Management Software Uganda | DeryCode',desc:'DeryLoan is a loan management software by DeryCode for Ugandan SACCOs, microfinance, and lending institutions. Track loans, automate repayments, integrate MoMo.',kw:'DeryLoan, DeryLoan Uganda, loan management software DeryLoan, DeryCode DeryLoan',ogtype:'product',
    breadcrumbs:[{name:'Home',url:'/'},{name:'Products',url:'/products/deryloan.html'},{name:'DeryLoan',url:'/products/deryloan.html'}],
    lead:'DeryLoan is DeryCode\'s loan management software — designed for Ugandan SACCOs, microfinance institutions, and lenders who need to track loans, automate repayments, and integrate with mobile money.',
    problem:{h:'The Loan Management Challenge',c:'Manual loan tracking leads to errors, missed payments, and poor portfolio visibility. DeryLoan automates the entire loan lifecycle — from application to disbursement to repayment — with real-time dashboards and MoMo integration.'},
    features:{h:'DeryLoan Features',items:[
      {icon:'fa-file-contract',t:'Loan Origination',d:'Application, approval workflow, and disbursement tracking.'},
      {icon:'fa-calculator',t:'Interest Calculation',d:'Automated interest, penalties, and amortization schedules.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Repayments',d:'Automatic repayment collection via MTN MoMo and Airtel Money.'},
      {icon:'fa-bell',t:'Payment Reminders',d:'Automated SMS and WhatsApp payment reminders.'},
      {icon:'fa-chart-pie',t:'Portfolio Analytics',d:'Non-performing loan tracking, portfolio at risk, and performance reports.'},
      {icon:'fa-shield-halved',t:'Credit Scoring',d:'Automated credit scoring based on savings and repayment history.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/loan-management.html',t:'Loan Management',d:'Custom loan management systems.'},
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'Complete SACCO systems.'},
      {url:'/services/digital-lending.html',t:'Digital Lending',d:'Digital lending platforms.'},
      {url:'/products/sacco-wallet.html',t:'SaccoWallet',d:'Our SACCO wallet product.'}
    ]},
    faqs:[
      {q:'What is DeryLoan?',a:'DeryLoan is DeryCode\'s loan management software for Ugandan financial institutions. It automates the entire loan lifecycle with MoMo integration.'},
      {q:'How much does DeryLoan cost?',a:'DeryLoan pricing depends on your institution\'s size and requirements. Contact us for a custom quote.'},
      {q:'Does DeryLoan integrate with mobile money?',a:'Yes. DeryLoan integrates with MTN MoMo and Airtel Money APIs for automatic repayment collection and disbursement.'}
    ]
  },
  {path:'products/sacco-wallet.html',h1:'SaccoWallet — SACCO Digital Wallet',title:'SaccoWallet | SACCO Wallet App Uganda | DeryCode',desc:'SaccoWallet is a digital wallet platform by DeryCode for Ugandan SACCOs. Offline-first, MoMo integration, GPS farm verification, and member management.',kw:'SaccoWallet, SaccoWallet Uganda, SACCO wallet app Uganda, DeryCode SaccoWallet',ogtype:'product',
    breadcrumbs:[{name:'Home',url:'/'},{name:'Products',url:'/products/sacco-wallet.html'},{name:'SaccoWallet',url:'/products/sacco-wallet.html'}],
    lead:'SaccoWallet is DeryCode\'s flagship SACCO digital wallet — built for Ugandan farming communities with offline-first architecture, mobile money integration, GPS farm verification, and local language support.',
    problem:{h:'The SACCO Digital Challenge',c:'Rural SACCOs need software that works without internet, supports local languages, and integrates with mobile money. SaccoWallet was built specifically for these requirements — tested with farmer SACCOs in Kyenjojo district.'},
    features:{h:'SaccoWallet Features',items:[
      {icon:'fa-wifi',t:'Offline-First',d:'Full functionality offline with auto-sync when connectivity returns.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Integration',d:'MTN MoMo and Airtel Money deposit and repayment.'},
      {icon:'fa-location-dot',t:'GPS Farm Verification',d:'Verify farm boundaries and acreage using GPS polygons.'},
      {icon:'fa-language',t:'Local Languages',d:'Runyoro, Rutooro, Luganda, and English support.'},
      {icon:'fa-users',t:'Member Portal',d:'Members check balances, apply for loans, and view history.'},
      {icon:'fa-chart-line',t:'Admin Dashboard',d:'Real-time SACCO analytics and reporting.'}
    ]},
    useCases:{h:'Who Uses SaccoWallet',items:[
      {t:'Farmer SACCOs',d:'Agricultural cooperatives in Kyenjojo and surrounding districts.'},
      {t:'Rural SACCOs',d:'Any SACCO needing offline-first software.'},
      {t:'Savings Groups',d:'Community savings and lending groups.'},
      {t:'Microfinance',d:'Small microfinance institutions needing digital tools.'}
    ]},
    links:{h:'Related Resources',items:[
      {url:'/services/sacco-software.html',t:'SACCO Software',d:'Our SACCO systems.'},
      {url:'/services/sacco-mobile-app.html',t:'SACCO Mobile App',d:'SACCO mobile apps.'},
      {url:'/case-study-sacco-wallet.html',t:'Case Study',d:'SaccoWallet case study.'},
      {url:'/pricing/sacco-software-cost-uganda.html',t:'SACCO Software Cost',d:'Pricing info.'}
    ]},
    faqs:[
      {q:'What is SaccoWallet?',a:'SaccoWallet is DeryCode\'s offline-first digital wallet platform for Ugandan SACCOs, with MoMo integration, GPS farm verification, and local language support.'},
      {q:'Does SaccoWallet work offline?',a:'Yes. SaccoWallet is designed to work fully offline and sync data when internet connectivity returns — essential for rural Uganda.'},
      {q:'Can members deposit via mobile money?',a:'Yes. SaccoWallet integrates MTN MoMo and Airtel Money APIs so members can deposit and repay from their phones.'}
    ]
  },
  {path:'products/school-sync-manager.html',h1:'School Sync Manager — School Management Software',title:'School Sync Manager | School Software Uganda | DeryCode',desc:'School Sync Manager is DeryCode\'s school management software for Ugandan schools. Manage students, fees, exams, and parent communication.',kw:'School Sync Manager, School Sync Manager Uganda, school management DeryCode, DeryCode school software',ogtype:'product',
    breadcrumbs:[{name:'Home',url:'/'},{name:'Products',url:'/products/school-sync-manager.html'},{name:'School Sync Manager',url:'/products/school-sync-manager.html'}],
    lead:'School Sync Manager is DeryCode\'s school management software — built for Ugandan schools to manage students, fees, exams, and parent communication in one platform.',
    problem:{h:'The School Management Challenge',c:'Ugandan schools juggle paper records, manual fee tracking, and slow report card generation. School Sync Manager digitizes everything — saving time, reducing errors, and keeping parents informed.'},
    features:{h:'School Sync Manager Features',items:[
      {icon:'fa-user-graduate',t:'Student Management',d:'Digital student records, enrollment, and profiles.'},
      {icon:'fa-money-bill',t:'Fees Management',d:'Track fees, send reminders, accept MoMo payments.'},
      {icon:'fa-clipboard-check',t:'Exam Management',d:'Grade entry, automated report cards, and transcripts.'},
      {icon:'fa-brands fa-whatsapp',t:'Parent Portal',d:'Parents check results, fees, and attendance online.'},
      {icon:'fa-calendar-check',t:'Attendance',d:'Daily attendance for students and staff.'},
      {icon:'fa-chalkboard-user',t:'Staff Management',d:'Teacher records, timetables, and payroll.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/school-management-system.html',t:'School Management System',d:'Our school systems.'},
      {url:'/services/school-fees-management.html',t:'Fees Management',d:'Fees collection.'},
      {url:'/services/lms.html',t:'LMS',d:'Learning management.'}
    ]},
    faqs:[
      {q:'What is School Sync Manager?',a:'School Sync Manager is DeryCode\'s school management software for Ugandan schools — handling students, fees, exams, and parent communication.'},
      {q:'Can parents pay fees via MoMo?',a:'Yes. School Sync Manager integrates with MTN MoMo and Airtel Money so parents can pay fees from their phones with automatic receipts.'}
    ]
  },
  {path:'products/derycoin.html',h1:'DeryCoin — Uganda\'s Community Blockchain Token',title:'DeryCoin | Blockchain Token Uganda | DeryCode',desc:'DeryCoin is a blockchain-based token by DeryCode for digital commerce, rewards, and financial inclusion across Uganda and East Africa.',kw:'DeryCoin, DeryCoin Uganda, DeryCoin blockchain, DeryCode token, DeryCoin crypto',ogtype:'product',
    breadcrumbs:[{name:'Home',url:'/'},{name:'Products',url:'/products/derycoin.html'},{name:'DeryCoin',url:'/products/derycoin.html'}],
    lead:'DeryCoin is a blockchain-based token built by DeryCode to power digital commerce, rewards, and financial inclusion across Uganda and East Africa.',
    problem:{h:'Why DeryCoin Exists',c:'Millions of people across East Africa are unbanked or underbanked, yet nearly everyone has access to a mobile phone. DeryCoin bridges the gap between traditional finance and blockchain — meeting people where they already are.'},
    features:{h:'DeryCoin Features',items:[
      {icon:'fa-coins',t:'Low-Fee Transactions',d:'Built on a low-fee blockchain suited for everyday microtransactions.'},
      {icon:'fa-mobile-money-bill',t:'MoMo Integration',d:'Wallet integration with MTN MoMo and Airtel Money.'},
      {icon:'fa-store',t:'Merchant Payments',d:'Used for merchant payments and peer-to-peer transfers.'},
      {icon:'fa-gift',t:'Loyalty Rewards',d:'Digital rewards programs for small businesses.'},
      {icon:'fa-piggy-bank',t:'Community Savings',d:'Smart contract-powered community pooling (digital SACCO).'},
      {icon:'fa-exchange',t:'Remittances',d:'Cross-border remittances with lower fees.'}
    ]},
    links:{h:'Related Services',items:[
      {url:'/services/token-development.html',t:'Token Development',d:'Token creation services.'},
      {url:'/services/blockchain-development.html',t:'Blockchain Development',d:'Blockchain services.'},
      {url:'/case-study-derycoin.html',t:'DeryCoin Case Study',d:'Case study.'}
    ]},
    faqs:[
      {q:'What is DeryCoin?',a:'DeryCoin is a blockchain-based token built by DeryCode to power digital commerce, rewards, and financial inclusion in Uganda and East Africa.'},
      {q:'Is DeryCoin available now?',a:'DeryCoin is in development with pilot programs planned. Follow our blog and documentation for updates.'},
      {q:'How can I use DeryCoin?',a:'DeryCoin is designed for merchant payments, loyalty rewards, peer-to-peer transfers, and community savings — with mobile money integration for easy on/off ramps.'}
    ]
  }
];

for (const prod of products) {
  writePage(prod.path, page(prod));
}

// ── 8. AUTHOR & ABOUT PAGES ──
console.log('\n=== Generating Author & About Pages ===');

const authorPage = {
  path: 'authors/asiimwe-derick.html',
  h1: 'Asiimwe Derick — Founder & CEO of DeryCode',
  title: 'Asiimwe Derick | Founder DeryCode | Software Engineer Uganda',
  desc: 'Asiimwe Derick is the founder and CEO of DeryCode, a Ugandan software development company. Software engineer, blockchain developer, and tech entrepreneur.',
  kw: 'Asiimwe Derick, Derick Asiimwe, TraderDerick, DeryCode founder, Asiimwe Derick software engineer, Asiimwe Derick Uganda',
  ogtype: 'profile',
  breadcrumbs: [{name:'Home',url:'/'},{name:'Authors',url:'/authors/asiimwe-derick.html'},{name:'Asiimwe Derick',url:'/authors/asiimwe-derick.html'}],
  lead: 'Asiimwe Derick is the founder and CEO of DeryCode Technologies and Sageco Evergreen Company Limited. He is a software engineer, blockchain developer, and technology entrepreneur based in Uganda.',
  problem: {h:'About Asiimwe Derick',c:'Derick founded DeryCode in 2021 with a vision to build Uganda\'s leading software development company. He specializes in software development, blockchain technology, AI, and fintech solutions. Under his leadership, DeryCode has delivered 100+ projects for clients across Uganda and East Africa.'},
  features: {h:'Expertise',items:[
    {icon:'fa-code',t:'Software Engineering',d:'Full-stack development with React, Node.js, Python, and modern frameworks.'},
    {icon:'fa-link',t:'Blockchain Development',d:'Smart contracts, DeFi protocols, and token development.'},
    {icon:'fa-robot',t:'AI & Automation',d:'AI chatbots, automation systems, and ML solutions.'},
    {icon:'fa-mobile-money-bill',t:'Fintech',d:'Mobile money integration, lending platforms, and SACCO software.'},
    {icon:'fa-building',t:'Business Leadership',d:'CEO of DeryCode and Sageco Evergreen Company Limited.'},
    {icon:'fa-chalkboard-user',t:'Mentorship',d:'Mentoring young Ugandan developers and tech entrepreneurs.'}
  ]},
  links: {h:'Connect',items:[
    {url:'/about.html',t:'About DeryCode',d:'About the company.'},
    {url:'/blog.html',t:'Blog',d:'Read our articles.'},
    {url:'https://wa.me/256772002326',t:'WhatsApp',d:'Contact Derick on WhatsApp.'},
    {url:'https://ug.linkedin.com/in/asiimwe-derick-501755313',t:'LinkedIn',d:'Connect on LinkedIn.'},
    {url:'https://github.com/asiimwe3',t:'GitHub',d:'View code on GitHub.'}
  ]},
  faqs: [
    {q:'Who is Asiimwe Derick?',a:'Asiimwe Derick is the founder and CEO of DeryCode Technologies and Sageco Evergreen Company Limited. He is a software engineer and tech entrepreneur from Uganda.'},
    {q:'What is DeryCode?',a:'DeryCode is a Ugandan software development company founded by Asiimwe Derick in 2021, offering software development, web development, mobile apps, blockchain, AI, and fintech services.'},
    {q:'How can I contact Asiimwe Derick?',a:'You can contact Derick via WhatsApp at +256 772 002 326, or through the DeryCode website.'}
  ]
};
writePage(authorPage.path, page(authorPage));

// About page
const aboutPage = {
  path: 'about.html',
  h1: 'About DeryCode Technologies',
  title: 'About DeryCode | Software Company Uganda',
  desc: 'DeryCode Technologies is Uganda\'s leading software development company. Founded by Asiimwe Derick in 2021. 100+ projects, 100+ clients, serving Uganda and East Africa.',
  kw: 'about DeryCode, DeryCode company, DeryCode team, DeryCode Uganda, DeryCode Kampala, DeryCode Technologies',
  breadcrumbs: [{name:'Home',url:'/'},{name:'About',url:'/about.html'}],
  lead: 'DeryCode Technologies is Uganda\'s leading software development company. Founded by Asiimwe Derick in 2021, we\'ve delivered 100+ projects for clients across Uganda and East Africa.',
  problem: {h:'Our Story',c:'DeryCode was founded in 2021 with a simple mission: build world-class software for Ugandan businesses. Starting with website development, we\'ve grown into a full-service technology company offering software development, mobile apps, blockchain, AI, fintech, and digital marketing services.'},
  features: {h:'What We Do',items:[
    {icon:'fa-code',t:'Software Development',d:'Custom software for businesses across Uganda.'},
    {icon:'fa-globe',t:'Web Development',d:'Professional websites and web applications.'},
    {icon:'fa-mobile-screen',t:'Mobile Apps',d:'iOS and Android apps with Flutter and React Native.'},
    {icon:'fa-robot',t:'AI & Automation',d:'AI chatbots, agents, and business automation.'},
    {icon:'fa-link',t:'Blockchain',d:'Smart contracts, tokens, and DeFi protocols.'},
    {icon:'fa-mobile-money-bill',t:'Fintech',d:'SACCO software, lending platforms, and payment integration.'}
  ]},
  paragraphs: [
    {h:'Our Mission',c:'To make world-class software accessible to every Ugandan business — from small startups to large enterprises.'},
    {h:'Our Values',c:'Quality over quantity. Local context matters. Technology should serve business, not the other way around. We build long-term relationships, not just projects.'},
    {h:'Our Track Record',c:'100+ projects delivered. 100+ happy clients. 3+ years of experience. Clients across Uganda, Kenya, Tanzania, and beyond. Industries served: finance, healthcare, education, real estate, agriculture, hospitality, retail, and NGOs.'}
  ],
  links: {h:'Learn More',items:[
    {url:'/authors/asiimwe-derick.html',t:'Meet the Founder',d:'Asiimwe Derick, CEO.'},
    {url:'/services/software-development.html',t:'Our Services',d:'Full service catalog.'},
    {url:'/blog.html',t:'Blog',d:'Read our insights.'},
    {url:'/pricing/website-cost-uganda.html',t:'Pricing',d:'Transparent pricing.'},
    {url:'/editorial-methodology.html',t:'Editorial Methodology',d:'How we create content.'}
  ]},
  faqs: [
    {q:'When was DeryCode founded?',a:'DeryCode was founded in 2021 by Asiimwe Derick.'},
    {q:'Where is DeryCode located?',a:'DeryCode is based in Kampala, Uganda, and serves clients across Uganda and East Africa.'},
    {q:'How many projects has DeryCode delivered?',a:'DeryCode has delivered over 100 projects for clients across various industries.'},
    {q:'What services does DeryCode offer?',a:'Software development, web development, mobile apps, AI & automation, blockchain, fintech, SACCO software, ERP, school management, digital marketing, and UI/UX design.'}
  ]
};
writePage(aboutPage.path, page(aboutPage));

// Editorial methodology
const editorialPage = {
  path: 'editorial-methodology.html',
  h1: 'DeryCode Editorial Methodology',
  title: 'Editorial Methodology | DeryCode Content Standards',
  desc: 'How DeryCode researches, writes, and maintains technical content. Our editorial standards for accuracy, relevance, and quality.',
  kw: 'DeryCode editorial methodology, DeryCode content methodology, editorial standards DeryCode, how DeryCode researches content',
  breadcrumbs: [{name:'Home',url:'/'},{name:'Editorial Methodology',url:'/editorial-methodology.html'}],
  lead: 'At DeryCode, we hold our content to high standards. This page explains how we research, write, and maintain our technical articles and guides.',
  problem: {h:'Our Editorial Standards',c:'We believe that technical content should be accurate, practical, and written for real people — not just for search engines. Our editorial methodology ensures every article we publish meets these standards.'},
  features: {h:'Our Editorial Principles',items:[
    {icon:'fa-check-double',t:'Accuracy',d:'All technical claims are verified and based on real experience.'},
    {icon:'fa-earth-africa',t:'Local Relevance',d:'Content is tailored to the Ugandan and East African context.'},
    {icon:'fa-clock',t:'Timeliness',d:'Content is reviewed and updated regularly.'},
    {icon:'fa-user',t:'Expert Authorship',d:'Articles are written by developers with real experience.'},
    {icon:'fa-link',t:'Transparency',d:'We cite sources and disclose limitations.'},
    {icon:'fa-hand-pointer',t:'Practical Value',d:'Every article provides actionable, useful information.'}
  ]},
  paragraphs: [
    {h:'Research Process',c:'Before writing an article, we research the topic using official documentation, practical development experience, and industry best practices. We test code examples and verify technical claims.'},
    {h:'Review Process',c:'Every article goes through technical review by at least one other team member. We check for accuracy, clarity, and completeness.'},
    {h:'Update Process',c:'Technology changes fast. We review our articles every 6 months and update them with new information, tools, or best practices.'},
    {h:'Content Guidelines',c:'We write for humans first. We avoid keyword stuffing, AI-generated filler content, and thin pages designed only to rank. Every page must provide genuine value to the reader.'}
  ],
  links: {h:'Related',items:[
    {url:'/about.html',t:'About DeryCode',d:'About our company.'},
    {url:'/authors/asiimwe-derick.html',t:'Meet the Founder',d:'Our lead author.'},
    {url:'/blog.html',t:'Blog',d:'Read our articles.'}
  ]}
};
writePage(editorialPage.path, page(editorialPage));

// ── 9. 404 PAGE ──
console.log('\n=== Generating 404 Page ===');
const notFound = `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Page Not Found | DeryCode</title>
  <meta name="robots" content="noindex, follow" />
  <link rel="icon" type="image/png" href="/logo.webp" />
  <link rel="stylesheet" href="/style.css?v=${VER}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head>
<body>
  <nav class="navbar">
    <a href="/" class="nav-logo"><img src="/logo.webp" alt="DeryCode" width="40" height="40" /><span>DeryCode</span></a>
    <ul class="nav-menu">
      <li><a href="/">Home</a></li>
      <li><a href="/services/software-development.html">Services</a></li>
      <li><a href="/blog.html">Blog</a></li>
      <li><a href="/about.html">About</a></li>
    </ul>
  </nav>
  <main style="text-align:center;padding:4rem 1rem;">
    <h1 style="font-size:3rem;color:#D4A017;">404</h1>
    <p style="font-size:1.5rem;">Page Not Found</p>
    <p>The page you're looking for doesn't exist or has been moved.</p>
    <a href="/" class="btn-primary" style="display:inline-block;margin-top:2rem;">Back to Home</a>
  </main>
</body>
</html>`;
writePage('404.html', notFound);

// ── 10. UPDATE SITEMAP ──
console.log('\n=== Updating Sitemap ===');

// Read existing sitemap to preserve existing URLs
const existingSitemap = fs.readFileSync('sitemap.xml', 'utf-8');
const existingUrls = [];
const urlRegex = /<loc>([^<]+)<\/loc>/g;
let match;
while ((match = urlRegex.exec(existingSitemap)) !== null) {
  existingUrls.push(match[1]);
}

// Build new sitemap with all URLs
const allSitemapUrls = new Set();

// Add existing URLs (excluding ones we're replacing)
for (const url of existingUrls) {
  allSitemapUrls.add(url);
}

// Add new generated URLs
for (const url of allUrls) {
  allSitemapUrls.add(BASE + url);
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`;

for (const url of [...allSitemapUrls].sort()) {
  sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
}

sitemap += `
</urlset>`;

fs.writeFileSync('sitemap.xml', sitemap);
console.log(`Sitemap updated with ${allSitemapUrls.size} URLs`);

// ── SUMMARY ──
console.log('\n=== GENERATION COMPLETE ===');
console.log(`New pages generated: ${allUrls.length}`);
console.log(`Total sitemap URLs: ${allSitemapUrls.size}`);
console.log(`\nNew pages by category:`);

const categories = {};
for (const url of allUrls) {
  const cat = url.split('/')[1];
  categories[cat] = (categories[cat] || 0) + 1;
}
for (const [cat, count] of Object.entries(categories)) {
  console.log(`  ${cat}: ${count} pages`);
}
