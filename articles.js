/* DeryCode Blog — Article content store, keyed by ?id= param */
window.DERYCODE_ARTICLES = {
  "derycoin": {
    tag: "⭐ Featured · Blockchain",
    title: "What is DeryCoin? Uganda's First Community Blockchain Token",
    date: "June 1, 2026",
    readTime: "5 min read",
    icon: "fa-coins",
    description: "DeryCoin is a blockchain-based token built by DeryCode to power digital commerce, rewards, and financial inclusion across Uganda and East Africa. Learn how it works.",
    html: `
      <p>DeryCoin is a blockchain-based token built by DeryCode to power digital commerce, rewards, and financial inclusion across Uganda and East Africa. As mobile money and digital payments continue to grow across the region, DeryCoin is designed to bridge the gap between traditional finance and blockchain technology — giving everyday Ugandans a simple way to access decentralized digital value.</p>
      <h2>Why DeryCoin Exists</h2>
      <p>Millions of people across East Africa are unbanked or underbanked, yet nearly everyone has access to a mobile phone. DeryCoin was created to meet people where they already are — building on top of familiar mobile money rails while introducing the transparency, low fees, and borderless nature of blockchain technology.</p>
      <h2>How DeryCoin Works</h2>
      <ul>
        <li>Built on a low-fee, high-speed blockchain network suited for everyday microtransactions.</li>
        <li>Wallet integration with MTN MoMo and Airtel Money for easy on/off ramps.</li>
        <li>Used for merchant payments, loyalty rewards, and peer-to-peer transfers.</li>
        <li>Smart contract-powered savings and community pooling features, similar to a digital SACCO.</li>
      </ul>
      <h2>Real-World Use Cases</h2>
      <p>Beyond simple payments, DeryCoin is being explored for microloan disbursement in rural SACCOs, digital rewards programs for small businesses, and cross-border remittances for the East African diaspora — cutting out the high fees typically charged by traditional money transfer services.</p>
      <h2>What's Next</h2>
      <p>DeryCode continues to develop the DeryCoin ecosystem, including a public whitepaper, merchant onboarding tools, and pilot programs with SACCOs in Kyenjojo and surrounding districts. Follow our blog and documentation for updates as the project moves toward public testnet launch.</p>
    `
  },

  "sacco-banking": {
    tag: "Banking Tech",
    title: "How Digital Banking Software is Transforming SACCOs in Uganda",
    date: "May 10, 2026",
    readTime: "6 min read",
    icon: "fa-university",
    description: "Modern SACCO software is replacing manual record-keeping with real-time ledgers, MoMo integration, and mobile access for members.",
    html: `
      <p>For decades, Savings and Credit Cooperative Organizations (SACCOs) across Uganda have run on paper ledgers, exercise books, and manual calculations. That's changing fast. Digital banking software is now helping SACCOs — from small rural cooperatives to large urban unions — manage member savings, loans, and shares with the same rigor as commercial banks.</p>
      <h2>The Problem With Manual SACCO Management</h2>
      <p>Paper-based record keeping is slow, error-prone, and hard to audit. Loan officers spend hours calculating interest by hand, members can't check their balance without visiting the office, and fraud is harder to detect when there's no digital trail. For SACCOs trying to grow past a few hundred members, manual systems become a real bottleneck.</p>
      <h2>What Digital SACCO Software Provides</h2>
      <ul>
        <li><strong>Real-time ledgers</strong> — every deposit, withdrawal, and loan repayment updates instantly, with a full audit trail.</li>
        <li><strong>Mobile Money integration</strong> — members deposit and repay loans directly via MTN MoMo or Airtel Money, no more carrying cash to the office.</li>
        <li><strong>Automated interest & credit scoring</strong> — loan eligibility and interest calculations happen automatically based on savings history and repayment behavior.</li>
        <li><strong>Offline-first mobile access</strong> — critical in rural Uganda where connectivity is unreliable; transactions sync once a connection is available.</li>
        <li><strong>GPS-based farm verification</strong> — for agricultural SACCOs, land size can be verified against loan collateral claims to reduce default risk.</li>
      </ul>
      <h2>Why This Matters for Kyenjojo & Rural SACCOs</h2>
      <p>DeryCode has built SACCO platforms specifically for farming communities like Kyenjojo, where members need offline access, local language support, and simple mobile-first interfaces. Digitizing these SACCOs doesn't just save time — it builds trust, because members can see their own numbers transparently at any time.</p>
      <h2>Getting Started</h2>
      <p>Migrating from paper to digital doesn't have to be disruptive. We typically run a parallel period where both systems operate together before fully switching over, ensuring no data or member trust is lost in the transition.</p>
    `
  },

  "pwa-uganda": {
    tag: "Web Development",
    title: "Building a PWA: Why Progressive Web Apps Are Perfect for Uganda",
    date: "Mar 22, 2026",
    readTime: "5 min read",
    icon: "fa-mobile-screen",
    description: "Low data costs, offline-first experience, and no app store needed — PWAs are the smartest choice for businesses targeting Ugandan users.",
    html: `
      <p>If you're building a digital product for Ugandan users, a Progressive Web App (PWA) is often a smarter choice than a native mobile app — and it costs significantly less to build and maintain.</p>
      <h2>What is a PWA?</h2>
      <p>A Progressive Web App is a website that behaves like a native app — it can be installed on a phone's home screen, work offline, send push notifications, and load instantly, all without needing the Google Play Store or Apple App Store.</p>
      <h2>Why PWAs Make Sense in Uganda</h2>
      <ul>
        <li><strong>Low data costs</strong> — PWAs are lightweight and cache content locally, meaning users spend far less on mobile data compared to constantly reloading a native app.</li>
        <li><strong>Offline-first</strong> — service workers let key parts of the app keep working even with no signal, syncing data once connectivity returns.</li>
        <li><strong>No app store friction</strong> — users don't need to download anything from the Play Store, which matters a lot on low storage Android devices common across Uganda.</li>
        <li><strong>One codebase</strong> — a single PWA works across Android, iOS, and desktop browsers, cutting development cost roughly in half compared to building separate native apps.</li>
        <li><strong>Instant updates</strong> — push a new version and every user gets it immediately, no waiting on app store review.</li>
      </ul>
      <h2>Where We've Used This</h2>
      <p>DeryCode built the SACCO digital wallet platform for Kyenjojo farmers as a mobile-first, offline-capable PWA — optimized specifically for low-end Android devices with limited storage and inconsistent connectivity.</p>
      <h2>Is a PWA Right for Your Business?</h2>
      <p>If your users are primarily on Android, cost-sensitive on data, or you want to launch fast without app store approval delays, a PWA is almost always the right starting point. You can always add a native app later once you've validated demand.</p>
    `
  },

  "momo-integration": {
    tag: "Fintech",
    title: "How to Integrate MoMo Mobile Money into Your App in Uganda",
    date: "Feb 28, 2026",
    readTime: "5 min read",
    icon: "fa-money-bill-wave",
    description: "MTN MoMo and Airtel Money APIs demystified — a practical guide to adding mobile payments to your web or mobile app.",
    html: `
      <p>Mobile money is how most Ugandans move money day to day — so if your app or website needs to accept payments, integrating MTN MoMo and Airtel Money isn't optional, it's essential. Here's how the process actually works.</p>
      <h2>1. Register as a Developer / Merchant</h2>
      <p>Both MTN and Airtel provide developer portals where you register your business, get sandbox API credentials for testing, and later apply for production API keys once your integration is verified.</p>
      <h2>2. Choose Your Integration Method</h2>
      <ul>
        <li><strong>Collections API</strong> — request payment from a customer's MoMo wallet (used for checkout, loan repayments, deposits).</li>
        <li><strong>Disbursements API</strong> — send money out to a customer's wallet (used for refunds, loan payouts, marketplace seller payments).</li>
        <li><strong>USSD fallback</strong> — for users without smartphones or data, a USSD prompt can trigger the same payment flow.</li>
      </ul>
      <h2>3. Handle the Payment Flow Correctly</h2>
      <p>A typical flow: your app triggers a payment request → the customer receives a PIN prompt on their phone → they approve → your backend receives a webhook/callback confirming success or failure → you update the order/loan/wallet record accordingly. This all happens asynchronously, so your backend needs to handle "pending" states gracefully rather than assuming instant confirmation.</p>
      <h2>4. Common Pitfalls</h2>
      <ul>
        <li>Not handling failed or timed-out transactions — always show a clear retry option.</li>
        <li>Ignoring currency and minimum transaction limits set by the providers.</li>
        <li>Skipping the sandbox testing phase — production approval requires proof of a working sandbox integration first.</li>
      </ul>
      <h2>Where We've Built This</h2>
      <p>DeryCode has integrated MoMo and Airtel Money into SACCO wallets, e-commerce checkouts, and the DeryCoin ecosystem, handling both collections and disbursements at scale for Ugandan businesses.</p>
    `
  }
};
