/* ============================================================
   Foi Digitals — i18n v2
   - Auto-detects browser language (TR/EN), defaults to EN
   - Manual override via header toggle, persisted in localStorage
   - Updates [data-i18n], [data-i18n-html], [data-i18n-attr]
   - Per-page <html data-i18n-title> + <meta data-i18n-desc>
   ============================================================ */

const STORAGE_KEY = 'foi.lang';
const DEFAULT_LANG = 'en';
const SUPPORTED = ['en', 'tr'];

const translations = {
  /* ====================== ENGLISH ====================== */
  en: {
    meta: {
      siteTitle: 'Foi Digitals — Apps, games, and tools worth keeping',
      siteDesc: 'Foi Digitals is an independent studio crafting mobile apps, mobile games, web products, and AI-powered software.',

      privacyTitle: 'Privacy — Foi Digitals',
      termsTitle: 'Terms of Use — Foi Digitals',
      supportTitle: 'Support — Foi Digitals',

      appCalorieTitle: 'Calorie Reader AI — Foi Digitals',
      appCalorieDesc: 'Snap a meal, get calories instantly. AI-powered nutrition tracker by Foi Digitals.',
      appCaloriePrivacyTitle: 'Calorie Reader AI — Privacy Policy',
      appCalorieTermsTitle: 'Calorie Reader AI — Terms of Use',
      appCalorieSupportTitle: 'Calorie Reader AI — Support',
    },

    nav: {
      work: 'Work',
      about: 'Studio',
      support: 'Support',
      privacy: 'Privacy',
      terms: 'Terms',
      contact: 'Contact',
    },

    footer: {
      tagline: 'A small studio crafting software worth keeping.',
      copyright: '© 2026 Foi Digitals — All rights reserved.',
      col_studio: 'Studio',
      col_products: 'Products',
      col_legal: 'Legal',
      link_about: 'About',
      link_contact: 'Contact',
      link_support: 'Support',
      link_calorie: 'Calorie Reader AI',
      link_calorie_more: 'More coming',
      link_privacy: 'Privacy',
      link_terms: 'Terms',
    },

    home: {
      heroPill: 'Independent studio · est. 2026',
      heroTitleHtml: 'Apps, games, and tools <em>worth keeping.</em>',
      heroBody: 'Foi Digitals is a small independent studio building software for everyday life — mobile apps, mobile games, web products, and AI-powered tools. We make few things, each one with care.',
      heroStat1Value: '01',
      heroStat1Label: 'Shipping product',
      heroStat2Value: '06',
      heroStat2Label: 'Supported languages',
      heroStat3Value: '∞',
      heroStat3Label: 'Made with care',

      capLabel: 'Capabilities',
      capHeading: 'What the studio makes.',
      capLede: 'Four disciplines, one studio. We move between them deliberately so each product feels considered, not assembled.',
      cap1Title: 'Mobile Apps',
      cap1Desc: 'iOS and Android consumer apps. Calm interfaces, native feel, attention to first-minute experience.',
      cap2Title: 'Mobile Games',
      cap2Desc: 'Small, focused games made to be played in short sessions. Mechanics over monetization.',
      cap3Title: 'Web',
      cap3Desc: 'Marketing sites, web tools, and lightweight applications. Fast to load, slow to feel dated.',
      cap4Title: 'AI Software',
      cap4Desc: 'AI-powered products and internal tools. Practical applications of vision and language models, not demos.',

      featLabel: 'Featured product',
      featPill: 'Calorie Reader AI',
      featTitle: 'A calorie tracker that reads your plate.',
      featDesc: 'Photograph a meal. Our vision model returns calories, protein, carbs, and fat in seconds. No barcode scanning. No databases to search. Just snap and log.',
      featTag1: 'iOS',
      featTag2: 'AI Vision',
      featTag3: 'Health',
      featTag4: '6 Languages',
      featCtaPrimary: 'See the product',
      featCtaGhost: 'App Store soon',

      nextLabel: 'Next from the studio',
      nextHeading: 'In quiet development.',
      next1Index: '002',
      next1Title: 'Untitled mobile game',
      next1Desc: 'A short, focused game prototype. More details when the build is closer.',
      next1Status: 'Prototype',
      next2Index: '003',
      next2Title: 'Untitled AI tool',
      next2Desc: 'An internal experiment that wants to grow up into a real product.',
      next2Status: 'Research',

      philosLabel: 'How we work',
      philosHeading: 'Three things we hold to.',
      philos1Title: 'Few products, made well',
      philos1Body: 'We would rather ship one product that feels right than three that feel rushed. Cadence over volume.',
      philos2Title: 'Calm by default',
      philos2Body: 'No dark patterns, no manipulative loops, no anxiety-as-a-feature. Software should respect the person using it.',
      philos3Title: 'Independent and patient',
      philos3Body: 'Self-funded, small team, long horizon. We build what we want to use, then quietly ship it to the world.',

      contactLabel: 'Get in touch',
      contactTitleHtml: 'Tell us <em>what you are making.</em>',
      contactBody: 'Partnership ideas, press, careful technical questions, or just hello — every message is read by a human.',
      contactNote: 'Replies within 2–3 business days · English & Turkish',
    },

    /* ===== Company-wide Privacy ===== */
    privacy: {
      eyebrow: 'Legal — Studio Privacy',
      title: 'Privacy Policy',
      lede: 'This Privacy Policy covers the Foi Digitals website (foidigitals.github.io) and our company-wide practices. Each of our individual products may have its own additional privacy policy linked from inside that product.',
      effective: 'Effective 27 May 2026',
      version: 'v1.0',
      tocLabel: 'Contents',

      h_scope: 'Scope of this Policy',
      p_scope1: 'This policy describes how Foi Digitals collects and uses information when you visit our website or contact us directly. It does <strong>not</strong> describe data flows inside our applications — each application has its own privacy policy that you can find on its product page or inside the app.',
      p_scope2: 'For example, the privacy policy specific to <a href="apps/calorie-reader-ai/privacy.html">Calorie Reader AI</a> covers meal photo handling, AI vision processing, and Apple Health integration. This umbrella policy does not.',

      h_collect: 'What We Collect on the Website',
      p_collect1: 'Our website is intentionally minimal. We do not run third-party tracking pixels, advertising networks, or invasive analytics. We do not use cookies for tracking.',
      p_collect2: 'When you contact us by email at <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>, we receive whatever you choose to send: your email address, your message, and any details you include. We keep that correspondence only as long as needed to respond and follow up.',

      h_use: 'How We Use What You Send',
      p_use_lede: 'Information you send by email is used only to:',
      l_use_1: 'Respond to your question, request, or proposal.',
      l_use_2: 'Maintain context for ongoing correspondence.',
      l_use_3: 'Comply with applicable legal obligations.',
      p_use_no: 'We do not sell, rent, or share your contact information with third parties for marketing.',

      h_hosting: 'Hosting',
      p_hosting: 'The Foi Digitals website is hosted on GitHub Pages. GitHub may collect minimal request logs (IP, user agent, timestamp) for the operation and security of its infrastructure. See <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub’s Privacy Statement</a> for details.',

      h_apps: 'Our Applications',
      p_apps: 'Each Foi Digitals application has its own privacy policy that explains what it collects, why, and which third parties it relies on. Currently shipping applications:',
      l_apps_1: 'Calorie Reader AI — see <a href="apps/calorie-reader-ai/privacy.html">app privacy policy</a>.',

      h_rights: 'Your Rights',
      p_rights: 'Depending on where you live, you have rights to access, correct, delete, or export the personal information we hold about you. For website-level requests, write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>. For application-level data (such as the meals you logged in Calorie Reader AI), use the rights described in that app’s privacy policy.',

      h_children: 'Children',
      p_children: 'The Foi Digitals website is not directed to children. We do not knowingly collect personal information from children through this site.',

      h_changes: 'Changes',
      p_changes: 'We may update this Policy from time to time. The “Effective” date above will be updated. For material changes that affect existing correspondents, we may notify you by email.',

      h_contact: 'Contact',
      p_contact: 'Questions about this Policy? Write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>.',
    },

    /* ===== Company-wide Terms ===== */
    terms: {
      eyebrow: 'Legal — Studio Terms',
      title: 'Terms of Use',
      lede: 'These Terms govern use of the Foi Digitals website. Each of our applications has its own separate terms that apply to that application.',
      effective: 'Effective 27 May 2026',
      version: 'v1.0',
      tocLabel: 'Contents',

      h_accept: 'Acceptance',
      p_accept: 'By accessing or using this website, you agree to these Terms. If you do not agree, please do not use the website.',

      h_scope: 'Scope',
      p_scope: 'These Terms cover this marketing website only. Use of any Foi Digitals application is governed by the separate terms shipped with that application — for example, <a href="apps/calorie-reader-ai/terms.html">Calorie Reader AI Terms of Use</a>.',

      h_use: 'Acceptable Use',
      p_use_lede: 'You agree not to:',
      l_use_1: 'Use the website in a way that violates any applicable law.',
      l_use_2: 'Attempt to gain unauthorized access to any part of the website or its infrastructure.',
      l_use_3: 'Scrape, replicate, or republish substantial portions of the content without our prior written permission, beyond what is allowed by fair use or applicable law.',
      l_use_4: 'Misrepresent your identity or impersonate Foi Digitals or anyone affiliated with us.',

      h_ip: 'Intellectual Property',
      p_ip: 'The website content, design, brand marks, and source code are owned by Foi Digitals and protected by intellectual property laws. The studio name and product names are trademarks of Foi Digitals.',

      h_third: 'Third-Party Links',
      p_third: 'This website may contain links to third-party services (for example, the App Store, RevenueCat, or our partners). We are not responsible for the practices of those services. Your use of any linked service is subject to its own terms.',

      h_disclaim: 'Disclaimers',
      p_disclaim: 'The website is provided on an “as is” and “as available” basis. Information about our products and roadmap is informational and may change. We make no warranty that the website will be uninterrupted or error-free.',

      h_liability: 'Limitation of Liability',
      p_liability: 'To the maximum extent permitted by law, Foi Digitals shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of this website.',

      h_law: 'Governing Law',
      p_law: 'These Terms are governed by the laws of the Republic of Türkiye, without regard to conflict-of-laws principles. Any dispute arising out of these Terms is subject to the courts of Istanbul, unless mandatory consumer protection law in your jurisdiction provides otherwise.',

      h_changes: 'Changes',
      p_changes: 'We may revise these Terms from time to time. The “Effective” date above reflects the most recent revision. Continued use after changes take effect constitutes acceptance.',

      h_contact: 'Contact',
      p_contact: 'For questions about these Terms, write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>.',
    },

    /* ===== General Support ===== */
    support: {
      eyebrow: 'Support',
      title: 'How can we help?',
      lede: 'A short guide to the most common questions about Foi Digitals and our products. For app-specific help, please use the support page inside each product.',
      effective: 'Updated 27 May 2026',
      tocLabel: 'Topics',

      faq1_q: 'What is Foi Digitals?',
      faq1_a: 'Foi Digitals is a small independent software studio. We build mobile apps, mobile games, web products, and AI-powered tools. Our first shipping product is Calorie Reader AI; more are in development.',

      faq2_q: 'I need help with a specific app. Where do I go?',
      faq2_a: 'Each application has its own support page with FAQs tailored to that product. For Calorie Reader AI, see the <a href="apps/calorie-reader-ai/support.html">Calorie Reader AI support page</a>.',

      faq3_q: 'How do I report a bug or request a feature?',
      faq3_a: 'Email <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> with the product name, device model, OS version, and a clear description of the issue or idea. Screenshots help.',

      faq4_q: 'How do I work with the studio?',
      faq4_a: 'For partnership, licensing, or press inquiries, write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> with a short description of what you have in mind. We read every message.',

      faq5_q: 'When will the next product launch?',
      faq5_a: 'We ship when a product is ready, not before. The home page lists what is currently in development. Follow up by email if you want to be notified about a specific product.',

      cta_heading: 'Need a person?',
      cta_body: 'Send us a note — every message is answered.',
      cta_button: 'Email the studio',
    },

    /* ============================================================
       Apps — Calorie Reader AI
       ============================================================ */
    apps: {
      calorieReader: {
        detail: {
          breadcrumbStudio: 'Foi Digitals',
          breadcrumbWork: 'Work',
          name: 'Calorie Reader AI',
          tagline: 'A calorie tracker that reads your plate.',
          desc: 'Photograph a meal. Our vision model returns calories, protein, carbs, and fat in seconds. No barcodes to scan, no food databases to search — built for people who want to log a full day in under a minute.',
          statusPill: 'Coming soon — App Store',

          meta_platform_label: 'Platform',
          meta_platform_value: 'iOS · iPhone & iPad',
          meta_category_label: 'Category',
          meta_category_value: 'Health & Fitness',
          meta_lang_label: 'Languages',
          meta_lang_value: 'EN · TR · DE · ES · FR · PT',
          meta_studio_label: 'Studio',
          meta_studio_value: 'Foi Digitals',

          featuresLabel: 'What it does',
          featuresHeading: 'Track without typing.',
          featuresLede: 'A focused set of features built around a single idea: logging meals should take seconds, not minutes.',

          feat1Title: 'Snap & Track',
          feat1Desc: 'A single photo becomes calories, protein, carbs, and fat. No typing, no scanning.',
          feat2Title: 'AI Coach',
          feat2Desc: 'A chat coach that knows your goals, your dietary preferences, and your recent meals.',
          feat3Title: 'Smart Insights',
          feat3Desc: 'Weekly trends, daily targets, gentle streaks. The numbers stay in the background.',
          feat4Title: 'Privacy First',
          feat4Desc: 'Your photos and health data are yours. We never sell data and never train models on your meals.',
          feat5Title: '6 Languages',
          feat5Desc: 'English, Turkish, German, Spanish, French, Portuguese — including the AI coach.',
          feat6Title: 'Apple Health',
          feat6Desc: 'Optional read and write to Apple Health for weight, activity, and nutrition.',

          linksLabel: 'Documents',
          linkPrivacy: 'Privacy Policy',
          linkTerms: 'Terms of Use',
          linkSupport: 'Support & FAQ',
        },

        /* App-specific Privacy (detailed) */
        privacy: {
          eyebrow: 'Calorie Reader AI — Privacy',
          title: 'Privacy Policy',
          lede: 'This Privacy Policy applies to the Calorie Reader AI mobile application. It explains what the app collects, why, and the choices you have. For the broader Foi Digitals website policy, see the <a href="../../privacy.html">studio privacy page</a>.',
          effective: 'Effective 27 May 2026',
          version: 'v1.0',
          tocLabel: 'Contents',

          h_overview: 'Overview',
          p_overview: 'Calorie Reader AI is a nutrition tracking application published by Foi Digitals (“we”, “us”, “our”). This policy applies to anyone who downloads or uses the application.',

          h_collect: 'Information We Collect',
          h_collect_account: 'Account information',
          p_collect_account: 'When you create an account, we collect your email address. If you sign in with Apple or Google, we receive the basic profile information they share with us (typically a name and a unique identifier). We do not receive or store your password from these providers.',
          h_collect_profile: 'Profile & nutrition data',
          p_collect_profile: 'To personalize coaching and calorie targets, the app stores the profile inputs you provide: age, sex, height, weight, activity level, dietary preferences, allergens, and goals. You may edit or remove these at any time inside the app.',
          h_collect_photos: 'Meal photos',
          p_collect_photos: 'When you photograph a meal, the image is transmitted to our backend and then to a third-party AI vision provider for nutrition analysis. The image is associated with your account and stored so you can review your meal history. You may delete any photo from your history at any time, which removes it from our storage.',
          h_collect_health: 'Apple Health data',
          p_collect_health: 'If you explicitly grant permission, the app can read selected Health data (such as weight or activity) to improve personalization and can write nutrition results back to Health. Health data is processed only on your device or transiently on our servers; we do not retain it beyond what is required to provide the feature you requested.',
          h_collect_subs: 'Subscription data',
          p_collect_subs: 'Subscriptions are processed by Apple. We use RevenueCat as our subscription infrastructure provider to validate purchases and manage entitlements. We receive a transaction identifier, subscription status, and product identifier. We do not receive or store your payment card details.',
          h_collect_usage: 'Usage analytics & diagnostics',
          p_collect_usage: 'We collect anonymized usage events (for example, “screen opened”, “meal logged”) and crash diagnostics to understand which features work and to find bugs. Analytics events never include the contents of your meals, photos, or chat messages.',

          h_use: 'How We Use Your Information',
          p_use_lede: 'We use the information we collect to:',
          l_use_1: 'Provide and operate the app, including analyzing meal photos and computing nutrition totals.',
          l_use_2: 'Personalize coaching and recommendations based on your profile and goals.',
          l_use_3: 'Manage your subscription and entitlements through RevenueCat and Apple.',
          l_use_4: 'Send transactional notifications you have opted into (reminders, weekly summaries).',
          l_use_5: 'Diagnose issues, prevent abuse, and improve the app through aggregated analytics.',
          l_use_6: 'Comply with legal obligations.',
          p_use_no_sell: 'We do not sell your personal data. We do not use your meal photos to train any general-purpose model.',

          h_third: 'Third-Party Services',
          p_third_lede: 'We rely on a small set of vetted providers. Each receives only the data necessary for its function:',
          l_third_1: 'Supabase — authentication, database, and storage of your account, profile, and meal photos.',
          l_third_2: 'A third-party AI vision provider — receives meal photos for the sole purpose of returning a nutrition estimate. The provider is bound by data processing terms that prohibit using your data to train their general models.',
          l_third_3: 'RevenueCat — subscription validation and entitlement management on top of Apple’s App Store.',
          l_third_4: 'Apple (Sign in with Apple, Apple Health, push notifications) and Google (Sign in with Google) — only the data you authorize is shared.',
          l_third_5: 'Anonymized analytics and crash reporting providers — receive aggregate, non-identifying event data.',

          h_retention: 'Data Retention',
          p_retention: 'We retain account information, profile, and meal history for as long as your account is active. If you delete your account, we delete or irreversibly anonymize your data within 30 days, except where we are required by law to retain certain records (for example, transaction records).',

          h_rights: 'Your Rights',
          p_rights_lede: 'Depending on where you live, you may have the following rights:',
          l_rights_1: 'Access — request a copy of the information we hold about you.',
          l_rights_2: 'Correction — fix inaccurate or incomplete information.',
          l_rights_3: 'Deletion — request that we delete your account and data. You can also delete your account directly from within the app.',
          l_rights_4: 'Portability — receive your data in a structured, machine-readable format.',
          l_rights_5: 'Objection or restriction — object to or restrict certain processing.',
          l_rights_6: 'Withdraw consent — where processing is based on consent, you may withdraw it at any time.',
          p_rights_how: 'To exercise any of these rights, write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>. We respond within 30 days. You also have the right to lodge a complaint with your local data protection authority.',

          h_children: 'Children',
          p_children: 'The app is not directed to children under 13 (or the equivalent minimum age in your jurisdiction). We do not knowingly collect personal information from children. If we learn that we have, we will delete it promptly.',

          h_international: 'International Data Transfers',
          p_international: 'Your information may be processed in countries other than the one in which you reside, including in the European Union and the United States. We rely on appropriate safeguards (such as standard contractual clauses) where required by law.',

          h_security: 'Security',
          p_security: 'We use encryption in transit (TLS) and at rest, access controls, and the principle of least privilege. No system is perfectly secure, but we take security seriously and will notify affected users in the event of a material breach as required by law.',

          h_changes: 'Changes to This Policy',
          p_changes: 'We may update this Policy. The “Effective” date above will reflect the most recent revision. For material changes we will notify you in the app or by email.',

          h_contact: 'Contact',
          p_contact: 'Questions? Write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>.',
        },

        /* App-specific Terms */
        terms: {
          eyebrow: 'Calorie Reader AI — Terms',
          title: 'Terms of Use',
          lede: 'These Terms govern your use of the Calorie Reader AI application. For broader Foi Digitals website terms, see the <a href="../../terms.html">studio terms page</a>.',
          effective: 'Effective 27 May 2026',
          version: 'v1.0',
          tocLabel: 'Contents',

          h_accept: 'Acceptance of Terms',
          p_accept: 'By downloading, installing, or using the app, you confirm that you have read, understood, and agreed to be bound by these Terms and by our Privacy Policy. If you do not agree, do not use the app.',

          h_service: 'The App',
          p_service: 'Calorie Reader AI is software that estimates nutritional information from photos of meals, tracks dietary and activity data, and provides AI-assisted guidance. It is provided “as is” and may be modified, suspended, or discontinued at our discretion.',

          h_eligibility: 'Eligibility & Accounts',
          p_eligibility: 'You must be at least 13 years old (or the minimum age in your jurisdiction) to use the app. You are responsible for keeping your account credentials secure and for all activity that occurs under your account.',

          h_subs: 'Subscriptions & Auto-Renewal',
          p_subs1: 'The app may offer paid subscriptions (collectively “Calorie Reader Pro”). When you purchase a subscription, payment is charged to your Apple ID upon confirmation. Subscriptions automatically renew for the same period and at the same price unless auto-renewal is turned off at least 24 hours before the end of the current period.',
          p_subs2: 'Your account will be charged for renewal within 24 hours prior to the end of the current period. You can manage your subscriptions and turn off auto-renewal at any time in your Apple ID account settings: <strong>Settings → [your name] → Subscriptions</strong>.',
          p_subs3: 'Any unused portion of a free trial, if offered, will be forfeited when you purchase a subscription.',

          h_refunds: 'Refunds',
          p_refunds: 'All payments are handled by Apple. Refund requests are governed by Apple’s App Store policies. We cannot directly issue refunds for purchases made through the App Store. To request a refund, visit <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener">reportaproblem.apple.com</a>.',

          h_medical: 'Medical Disclaimer',
          p_medical1: '<strong>The app is not medical advice.</strong> Calorie estimates and AI-generated guidance are informational and approximate. They are not a substitute for consultation with a qualified healthcare professional, registered dietitian, or other licensed provider.',
          p_medical2: 'Do not use the app to diagnose, treat, cure, or prevent any disease or medical condition. If you have an eating disorder, are pregnant or nursing, are managing a chronic condition (such as diabetes), or are considering significant dietary changes, consult a qualified professional before relying on any output from the app.',
          p_medical3: 'In case of a medical emergency, contact your local emergency services immediately.',

          h_content: 'Your Content',
          p_content1: 'You retain ownership of the photos, profile information, and other content you submit (“Your Content”).',
          p_content2: 'By using the app, you grant Foi Digitals a worldwide, royalty-free license to host, process, and display Your Content solely as necessary to provide the app to you. We do not use Your Content to train general-purpose AI models, and we do not sell Your Content.',

          h_use: 'Acceptable Use',
          p_use_lede: 'You agree not to:',
          l_use_1: 'Use the app for any unlawful purpose or in violation of any applicable law.',
          l_use_2: 'Attempt to reverse-engineer, decompile, or extract source code from the app except where permitted by law.',
          l_use_3: 'Interfere with, disrupt, or attempt to gain unauthorized access to the app or its infrastructure.',
          l_use_4: 'Upload content that infringes the rights of others, is harmful, or attempts to manipulate the AI features (including prompt injection).',
          l_use_5: 'Use the app to provide medical, dietetic, or other professional advice to third parties.',
          l_use_6: 'Resell, sublicense, or otherwise commercially exploit the app without our prior written consent.',

          h_ip: 'Intellectual Property',
          p_ip: 'The app, including its software, design, brand marks, and content (other than Your Content), is owned by Foi Digitals and protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable, revocable license to use the app for your personal, non-commercial purposes.',

          h_third: 'Third-Party Services',
          p_third: 'The app relies on third-party providers (Apple, Google, Supabase, RevenueCat, and our AI provider). Your use of those providers is subject to their own terms. We are not responsible for the practices of third-party services beyond what is described in our Privacy Policy.',

          h_disclaim: 'Disclaimers',
          p_disclaim: 'The app is provided on an “as is” and “as available” basis, without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy, or non-infringement. We do not warrant that the app will be uninterrupted, error-free, or that calorie estimates will be exact.',

          h_liability: 'Limitation of Liability',
          p_liability: 'To the maximum extent permitted by law, Foi Digitals shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the app. In no event shall our aggregate liability exceed the greater of (a) the amount you paid us in the twelve months preceding the claim, or (b) USD 50.',

          h_termination: 'Termination',
          p_termination: 'You may stop using the app and delete your account at any time. We may suspend or terminate your access if you breach these Terms. Provisions that by their nature should survive termination will survive.',

          h_law: 'Governing Law',
          p_law: 'These Terms are governed by the laws of the Republic of Türkiye. Any dispute is subject to the courts of Istanbul, unless mandatory consumer protection law in your country of residence provides otherwise.',

          h_changes: 'Changes',
          p_changes: 'We may revise these Terms. The “Effective” date above reflects the most recent revision. Continued use of the app after changes take effect constitutes acceptance.',

          h_contact: 'Contact',
          p_contact: 'Questions? Write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>.',
        },

        /* App-specific Support */
        support: {
          eyebrow: 'Calorie Reader AI — Support',
          title: 'Questions & Help',
          lede: 'Common questions about Calorie Reader AI. If your question is not here, write to us — every message is read by a human.',
          effective: 'Updated 27 May 2026',
          tocLabel: 'Topics',

          faq1_q: 'What is Calorie Reader AI?',
          faq1_a: 'Calorie Reader AI is an iOS application that estimates the nutritional content of meals from a single photograph. It includes an AI nutrition coach, meal history, and progress tracking. The app is built by Foi Digitals.',

          faq2_q: 'How does the photo-to-calorie feature work?',
          faq2_a: 'When you take a photo of your meal, the image is securely transmitted to a vision-capable AI provider that identifies the foods present and estimates portion sizes. The result is combined with a nutrition reference to produce calorie and macronutrient estimates. The whole process typically takes a few seconds.',

          faq3_q: 'How accurate are the estimates?',
          faq3_a_p1: 'Photo-based estimates are approximate. The model performs best on clearly visible, well-lit meals. It may under- or over-estimate for dishes with hidden ingredients (sauces, oils, fillings), unusual portions, or ambiguous angles.',
          faq3_a_p2: 'For best results, photograph each meal from above with the full plate visible. You can tap a logged meal to manually adjust the values.',

          faq4_q: 'Is the AI coach giving me medical advice?',
          faq4_a: 'No. The AI nutrition coach is an informational tool. It is not a substitute for professional medical, dietetic, or psychological advice. If you have a medical condition, an eating disorder, are pregnant or nursing, or are considering significant dietary changes, please consult a qualified healthcare professional.',

          faq5_q: 'How do I manage or cancel my subscription?',
          faq5_a_p1: 'Calorie Reader Pro subscriptions are processed by Apple and managed in your Apple ID settings.',
          faq5_a_p2: 'On your device, go to <strong>Settings → [your name] → Subscriptions</strong>, find Calorie Reader AI, and choose Cancel Subscription. Cancellation takes effect at the end of the current billing period — access continues until then.',

          faq6_q: 'How do I delete my account?',
          faq6_a_p1: 'You can delete your account from inside the app: open <strong>Profile → Settings → Delete Account</strong> and confirm. Your profile, meal history, and photos will be permanently removed from our systems within 30 days.',
          faq6_a_p2: 'If you cannot delete in-app, write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> from the email address associated with your account and we will process the request manually.',

          faq7_q: 'Why does the app ask for camera and photo permissions?',
          faq7_a: 'The camera permission is required to photograph meals for nutrition analysis. The photo library permission lets you choose an existing meal photo instead of taking a new one. Both are optional — declining limits the ability to log meals but does not block other features. We do not access your photos beyond what you explicitly select.',

          faq8_q: 'How is my data protected?',
          faq8_a: 'All data is encrypted in transit (TLS) and at rest. Photos are stored under your account and are not shared with other users or used to train general-purpose AI models. The full details are in the <a href="privacy.html">Privacy Policy</a>.',

          faq9_q: 'How do I contact support?',
          faq9_a: 'Write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>. Please include the device model, iOS version, and a short description of the issue. We typically reply within 2–3 business days.',

          cta_heading: 'Still need help?',
          cta_body: 'Send us a note. We answer every message.',
          cta_button: 'Email the studio',
        },
      },
    },
  },

  /* ====================== TÜRKÇE ====================== */
  tr: {
    meta: {
      siteTitle: 'Foi Digitals — Saklamaya değer uygulamalar, oyunlar, araçlar',
      siteDesc: 'Foi Digitals; mobil uygulamalar, mobil oyunlar, web ürünleri ve yapay zekâ destekli yazılımlar geliştiren bağımsız bir stüdyodur.',

      privacyTitle: 'Gizlilik — Foi Digitals',
      termsTitle: 'Kullanım Şartları — Foi Digitals',
      supportTitle: 'Destek — Foi Digitals',

      appCalorieTitle: 'Calorie Reader AI — Foi Digitals',
      appCalorieDesc: 'Yemeğin fotoğrafını çek, kaloriyi anında öğren. Foi Digitals tarafından geliştirilen AI destekli beslenme takipçisi.',
      appCaloriePrivacyTitle: 'Calorie Reader AI — Gizlilik Politikası',
      appCalorieTermsTitle: 'Calorie Reader AI — Kullanım Şartları',
      appCalorieSupportTitle: 'Calorie Reader AI — Destek',
    },

    nav: {
      work: 'Ürünler',
      about: 'Stüdyo',
      support: 'Destek',
      privacy: 'Gizlilik',
      terms: 'Şartlar',
      contact: 'İletişim',
    },

    footer: {
      tagline: 'Saklamaya değer yazılım üreten küçük bir stüdyo.',
      copyright: '© 2026 Foi Digitals — Tüm hakları saklıdır.',
      col_studio: 'Stüdyo',
      col_products: 'Ürünler',
      col_legal: 'Hukuki',
      link_about: 'Hakkında',
      link_contact: 'İletişim',
      link_support: 'Destek',
      link_calorie: 'Calorie Reader AI',
      link_calorie_more: 'Yakında daha fazla',
      link_privacy: 'Gizlilik',
      link_terms: 'Şartlar',
    },

    home: {
      heroPill: 'Bağımsız stüdyo · 2026',
      heroTitleHtml: 'Saklamaya değer <em>uygulamalar, oyunlar, araçlar.</em>',
      heroBody: 'Foi Digitals; günlük hayata yönelik yazılımlar geliştiren küçük ve bağımsız bir stüdyodur — mobil uygulamalar, mobil oyunlar, web ürünleri ve yapay zekâ destekli araçlar. Az şey yaparız, her birini özenle.',
      heroStat1Value: '01',
      heroStat1Label: 'Yayında olan ürün',
      heroStat2Value: '06',
      heroStat2Label: 'Desteklenen dil',
      heroStat3Value: '∞',
      heroStat3Label: 'Özenle yapılır',

      capLabel: 'Yeteneklerimiz',
      capHeading: 'Stüdyonun ürettikleri.',
      capLede: 'Dört disiplin, tek stüdyo. Her ürünün “derlenmiş” değil, “düşünülmüş” hissettirmesi için aralarında bilinçli olarak hareket ederiz.',
      cap1Title: 'Mobil Uygulamalar',
      cap1Desc: 'iOS ve Android tüketici uygulamaları. Sakin arayüzler, yerel bir his, ilk dakikaya odaklı deneyim.',
      cap2Title: 'Mobil Oyunlar',
      cap2Desc: 'Kısa seanslarda oynanmak üzere yapılmış küçük ve odaklı oyunlar. Mekanik, monetizasyondan önce gelir.',
      cap3Title: 'Web',
      cap3Desc: 'Tanıtım siteleri, web araçları ve hafif uygulamalar. Hızlı yüklenir, geç eskir.',
      cap4Title: 'AI Yazılımı',
      cap4Desc: 'Yapay zekâ destekli ürünler ve dahili araçlar. Görüntü ve dil modellerinin pratik uygulamaları — demo değil.',

      featLabel: 'Öne çıkan ürün',
      featPill: 'Calorie Reader AI',
      featTitle: 'Tabağını okuyan bir kalori takipçisi.',
      featDesc: 'Yemeğinin fotoğrafını çek. Görsel modelimiz saniyeler içinde kalori, protein, karbonhidrat ve yağı geri döner. Barkod taramak yok. Veritabanı aramak yok. Sadece çek ve kaydet.',
      featTag1: 'iOS',
      featTag2: 'Görüntü AI',
      featTag3: 'Sağlık',
      featTag4: '6 Dil',
      featCtaPrimary: 'Ürünü gör',
      featCtaGhost: 'Yakında App Store',

      nextLabel: 'Stüdyodan sıradakiler',
      nextHeading: 'Sessizce geliştirilenler.',
      next1Index: '002',
      next1Title: 'İsimsiz mobil oyun',
      next1Desc: 'Kısa ve odaklı bir oyun prototipi. Build yaklaşınca daha fazla detay.',
      next1Status: 'Prototip',
      next2Index: '003',
      next2Title: 'İsimsiz AI aracı',
      next2Desc: 'Gerçek bir ürüne dönüşmek isteyen dahili bir deney.',
      next2Status: 'Araştırma',

      philosLabel: 'Çalışma biçimimiz',
      philosHeading: 'Bağlı kaldığımız üç şey.',
      philos1Title: 'Az ürün, iyi yapılmış',
      philos1Body: 'Aceleyle hissettiren üç ürün yerine doğru hissettiren bir ürünü tercih ederiz. Hacim değil, kadans.',
      philos2Title: 'Varsayılan sakin',
      philos2Body: 'Karanlık desen yok, manipülatif döngü yok, özellik olarak anksiyete yok. Yazılım, onu kullanan kişiye saygı duymalı.',
      philos3Title: 'Bağımsız ve sabırlı',
      philos3Body: 'Kendi kaynaklarıyla, küçük ekiple, uzun ufukla. Kendi kullanmak istediğimiz şeyi inşa eder, sonra sessizce dünyaya çıkarırız.',

      contactLabel: 'İletişime geç',
      contactTitleHtml: 'Bize <em>ne yaptığını anlat.</em>',
      contactBody: 'İş birliği fikirleri, basın, özenli teknik sorular ya da sadece selam — her mesajı bir insan okur.',
      contactNote: 'Cevap: 2–3 iş günü · Türkçe & İngilizce',
    },

    privacy: {
      eyebrow: 'Hukuki — Stüdyo Gizliliği',
      title: 'Gizlilik Politikası',
      lede: 'Bu Gizlilik Politikası; Foi Digitals web sitesini (foidigitals.github.io) ve şirket genelindeki uygulamalarımızı kapsar. Her bir ürünümüzün ürün içinde yer alan kendi ek gizlilik politikası olabilir.',
      effective: 'Yürürlük 27 Mayıs 2026',
      version: 'v1.0',
      tocLabel: 'İçindekiler',

      h_scope: 'Politikanın Kapsamı',
      p_scope1: 'Bu politika; Foi Digitals olarak web sitesini ziyaret ettiğinde veya bizimle doğrudan iletişime geçtiğinde topladığımız bilgileri açıklar. Uygulamalarımız içindeki veri akışlarını <strong>açıklamaz</strong>; her uygulamanın ürün sayfasında ya da uygulama içinde bulabileceğin kendi gizlilik politikası vardır.',
          p_scope2: 'Örneğin <a href="apps/calorie-reader-ai/privacy.html">Calorie Reader AI</a>’ın gizlilik politikası; öğün fotoğrafı işleme, AI görüntü analizi ve Apple Health entegrasyonunu kapsar. Bu şemsiye politika bunları kapsamaz.',

      h_collect: 'Web Sitesinde Topladıklarımız',
      p_collect1: 'Web sitemiz bilinçli olarak minimaldir. Üçüncü taraf takip pikselleri, reklam ağları ya da rahatsız edici analitik kullanmıyoruz. Takip amaçlı çerez kullanmıyoruz.',
      p_collect2: '<a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine e-posta ile yazdığında, göndermeyi seçtiğin her şeyi alırız: e-posta adresin, mesajın ve eklediğin detaylar. Bu yazışmayı yalnızca yanıtlamak ve takip etmek için gerekli olduğu süre boyunca saklarız.',

      h_use: 'Gönderdiklerini Nasıl Kullanırız',
      p_use_lede: 'E-posta ile gönderdiğin bilgileri yalnızca şu amaçlarla kullanırız:',
      l_use_1: 'Soruna, talebine ya da önerisine yanıt vermek.',
      l_use_2: 'Süregelen yazışmaların bağlamını korumak.',
      l_use_3: 'Geçerli yasal yükümlülüklere uymak.',
      p_use_no: 'İletişim bilgilerini pazarlama amacıyla üçüncü taraflara satmıyor, kiralamıyor veya paylaşmıyoruz.',

      h_hosting: 'Barındırma',
      p_hosting: 'Foi Digitals web sitesi GitHub Pages üzerinde barındırılır. GitHub; altyapısının işleyişi ve güvenliği için minimal istek günlükleri (IP, tarayıcı bilgisi, zaman damgası) toplayabilir. Detaylar için <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener">GitHub Gizlilik Bildirimi</a>’ne bak.',

      h_apps: 'Uygulamalarımız',
      p_apps: 'Her Foi Digitals uygulamasının; ne topladığını, neden topladığını ve hangi üçüncü taraflara dayandığını açıklayan kendi gizlilik politikası vardır. Şu an yayında olan uygulamalar:',
      l_apps_1: 'Calorie Reader AI — <a href="apps/calorie-reader-ai/privacy.html">uygulama gizlilik politikasına bak</a>.',

      h_rights: 'Haklarınız',
      p_rights: 'Yaşadığın yere bağlı olarak hakkımızdaki kişisel bilgilere erişme, düzeltme, silme veya dışa aktarma haklarına sahip olabilirsin. Web sitesi düzeyindeki talepler için <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz. Uygulama düzeyindeki veriler (örn. Calorie Reader AI’da kaydettiğin öğünler) için o uygulamanın gizlilik politikasındaki hakları kullan.',

      h_children: 'Çocuklar',
      p_children: 'Foi Digitals web sitesi çocuklara yönelik değildir. Bu site üzerinden bilerek çocuklardan kişisel bilgi toplamayız.',

      h_changes: 'Değişiklikler',
      p_changes: 'Bu Politikayı zaman zaman güncelleyebiliriz. Yukarıdaki “Yürürlük” tarihi güncellenir. Mevcut yazışmaları etkileyen önemli değişiklikler için seni e-posta ile bilgilendirebiliriz.',

      h_contact: 'İletişim',
      p_contact: 'Bu Politika hakkında sorular için <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz.',
    },

    terms: {
      eyebrow: 'Hukuki — Stüdyo Şartları',
      title: 'Kullanım Şartları',
      lede: 'Bu Şartlar; Foi Digitals web sitesinin kullanımını düzenler. Uygulamalarımızın her birinin, o uygulamaya uygulanan ayrı şartları vardır.',
      effective: 'Yürürlük 27 Mayıs 2026',
      version: 'v1.0',
      tocLabel: 'İçindekiler',

      h_accept: 'Kabul',
      p_accept: 'Bu web sitesine erişerek veya onu kullanarak bu Şartları kabul etmiş olursun. Kabul etmiyorsan lütfen web sitesini kullanma.',

      h_scope: 'Kapsam',
      p_scope: 'Bu Şartlar yalnızca bu tanıtım web sitesini kapsar. Foi Digitals uygulamalarının kullanımı, o uygulamayla birlikte gelen ayrı şartlara tabidir — örneğin <a href="apps/calorie-reader-ai/terms.html">Calorie Reader AI Kullanım Şartları</a>.',

      h_use: 'Kabul Edilebilir Kullanım',
      p_use_lede: 'Şunları yapmamayı kabul edersin:',
      l_use_1: 'Web sitesini herhangi bir geçerli yasayı ihlal edecek şekilde kullanmak.',
      l_use_2: 'Web sitesinin veya altyapısının herhangi bir bölümüne yetkisiz erişim sağlamaya çalışmak.',
      l_use_3: 'Önceden yazılı iznimiz olmadan, adil kullanım ya da geçerli yasaların izin verdiğinin ötesinde, içeriğin önemli kısımlarını kazımak, çoğaltmak veya yeniden yayınlamak.',
      l_use_4: 'Kimliğini yanlış tanıtmak ya da Foi Digitals veya bizimle ilişkili herhangi birinin yerine geçtiğini iddia etmek.',

      h_ip: 'Fikrî Mülkiyet',
      p_ip: 'Web sitesi içeriği, tasarımı, marka işaretleri ve kaynak kodu Foi Digitals’a aittir ve fikrî mülkiyet yasalarınca korunur. Stüdyo adı ve ürün adları Foi Digitals’ın ticari markalarıdır.',

      h_third: 'Üçüncü Taraf Bağlantıları',
      p_third: 'Bu web sitesi üçüncü taraf hizmetlere (örn. App Store, RevenueCat veya iş ortaklarımız) bağlantılar içerebilir. Bu hizmetlerin uygulamalarından sorumlu değiliz. Bağlantılı herhangi bir hizmeti kullanımın kendi şartlarına tabidir.',

      h_disclaim: 'Sorumluluk Reddi',
      p_disclaim: 'Web sitesi “olduğu gibi” ve “mevcut olduğu kadar” esasıyla sunulur. Ürünlerimiz ve yol haritamız hakkındaki bilgiler bilgilendirme amaçlıdır ve değişebilir. Web sitesinin kesintisiz veya hatasız olacağına dair hiçbir garanti vermiyoruz.',

      h_liability: 'Sorumluluk Sınırı',
      p_liability: 'Yasanın izin verdiği en geniş ölçüde Foi Digitals; bu web sitesini kullanmandan doğan herhangi bir dolaylı, arızi, sonuçsal ya da cezai zarardan sorumlu olmayacaktır.',

      h_law: 'Geçerli Hukuk',
      p_law: 'Bu Şartlar; çatışan kanunlar ilkelerine bakılmaksızın Türkiye Cumhuriyeti yasalarına tabidir. Bu Şartlardan doğan her türlü uyuşmazlık, ikamet ettiğin yargı yetkisindeki zorunlu tüketici koruma yasaları aksini gerektirmediği sürece İstanbul mahkemelerinin yetkisindedir.',

      h_changes: 'Değişiklikler',
      p_changes: 'Bu Şartları zaman zaman revize edebiliriz. Yukarıdaki “Yürürlük” tarihi en son revizyonu yansıtır. Değişiklikler yürürlüğe girdikten sonra kullanmaya devam etmen kabul anlamına gelir.',

      h_contact: 'İletişim',
      p_contact: 'Bu Şartlar hakkında sorular için <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz.',
    },

    support: {
      eyebrow: 'Destek',
      title: 'Nasıl yardımcı olabiliriz?',
      lede: 'Foi Digitals ve ürünlerimiz hakkında en yaygın soruların kısa rehberi. Uygulamaya özel yardım için lütfen her ürünün içindeki destek sayfasını kullan.',
      effective: 'Güncellendi 27 Mayıs 2026',
      tocLabel: 'Konular',

      faq1_q: 'Foi Digitals nedir?',
      faq1_a: 'Foi Digitals; mobil uygulamalar, mobil oyunlar, web ürünleri ve AI destekli araçlar geliştiren küçük ve bağımsız bir yazılım stüdyosudur. Yayında olan ilk ürünümüz Calorie Reader AI; daha fazlası geliştirme aşamasında.',

      faq2_q: 'Belirli bir uygulamayla ilgili yardıma ihtiyacım var. Nereye gideyim?',
      faq2_a: 'Her uygulamanın o ürüne özel SSS içeren kendi destek sayfası vardır. Calorie Reader AI için <a href="apps/calorie-reader-ai/support.html">Calorie Reader AI destek sayfasına</a> bak.',

      faq3_q: 'Hata bildirimi veya özellik isteği nasıl yaparım?',
      faq3_a: '<a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine ürün adı, cihaz modeli, işletim sistemi sürümü ve sorunun ya da fikrin net bir açıklamasıyla e-posta gönder. Ekran görüntüleri yardımcı olur.',

      faq4_q: 'Stüdyoyla nasıl çalışırım?',
      faq4_a: 'İş birliği, lisanslama veya basın talepleri için <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine, aklındakinin kısa bir açıklamasıyla yaz. Her mesajı okuyoruz.',

      faq5_q: 'Bir sonraki ürün ne zaman çıkacak?',
      faq5_a: 'Bir ürünü hazır olduğunda yayınlarız; öncesinde değil. Ana sayfa şu an geliştirilenleri listeler. Belirli bir ürünün haberini almak istiyorsan e-posta ile bize ulaş.',

      cta_heading: 'Bir insan mı lazım?',
      cta_body: 'Bize bir not gönder — her mesaja yanıt veriyoruz.',
      cta_button: 'Stüdyoya yaz',
    },

    apps: {
      calorieReader: {
        detail: {
          breadcrumbStudio: 'Foi Digitals',
          breadcrumbWork: 'Ürünler',
          name: 'Calorie Reader AI',
          tagline: 'Tabağını okuyan bir kalori takipçisi.',
          desc: 'Yemeğinin fotoğrafını çek. Görsel modelimiz saniyeler içinde kalori, protein, karbonhidrat ve yağı geri döner. Barkod taramak yok, veritabanı aramak yok — bir günü bir dakikadan az sürede kaydetmek isteyenler için.',
          statusPill: 'Yakında — App Store',

          meta_platform_label: 'Platform',
          meta_platform_value: 'iOS · iPhone & iPad',
          meta_category_label: 'Kategori',
          meta_category_value: 'Sağlık & Fitness',
          meta_lang_label: 'Diller',
          meta_lang_value: 'EN · TR · DE · ES · FR · PT',
          meta_studio_label: 'Stüdyo',
          meta_studio_value: 'Foi Digitals',

          featuresLabel: 'Neler yapıyor',
          featuresHeading: 'Yazmadan takip et.',
          featuresLede: 'Tek bir fikir etrafında kurulmuş odaklı bir özellik seti: öğün kaydetmek dakikalar değil, saniyeler almalı.',

          feat1Title: 'Çek & Kaydet',
          feat1Desc: 'Tek bir fotoğraf kaloriye, proteine, karbonhidrata ve yağa dönüşür. Yazmak yok, taramak yok.',
          feat2Title: 'AI Koç',
          feat2Desc: 'Hedeflerini, diyet tercihlerini ve son yediklerini bilen bir sohbet koçu.',
          feat3Title: 'Akıllı İçgörüler',
          feat3Desc: 'Haftalık trendler, günlük hedefler, nazik seriler. Rakamlar arka planda kalır.',
          feat4Title: 'Önce Gizlilik',
          feat4Desc: 'Fotoğrafların ve sağlık verin sana ait. Veri satmıyor, modelleri öğünlerinle eğitmiyoruz.',
          feat5Title: '6 Dil',
          feat5Desc: 'İngilizce, Türkçe, Almanca, İspanyolca, Fransızca, Portekizce — AI koç dâhil.',
          feat6Title: 'Apple Sağlık',
          feat6Desc: 'Kilo, aktivite ve beslenme için Apple Sağlık’a isteğe bağlı okuma ve yazma.',

          linksLabel: 'Dokümanlar',
          linkPrivacy: 'Gizlilik Politikası',
          linkTerms: 'Kullanım Şartları',
          linkSupport: 'Destek & SSS',
        },

        privacy: {
          eyebrow: 'Calorie Reader AI — Gizlilik',
          title: 'Gizlilik Politikası',
          lede: 'Bu Gizlilik Politikası, Calorie Reader AI mobil uygulamasına uygulanır. Uygulamanın ne topladığını, neden topladığını ve sahip olduğun seçenekleri açıklar. Daha geniş Foi Digitals web sitesi politikası için <a href="../../privacy.html">stüdyo gizlilik sayfasına</a> bak.',
          effective: 'Yürürlük 27 Mayıs 2026',
          version: 'v1.0',
          tocLabel: 'İçindekiler',

          h_overview: 'Genel Bakış',
          p_overview: 'Calorie Reader AI; Foi Digitals (“biz”, “bize”) tarafından yayımlanan bir beslenme takip uygulamasıdır. Bu politika, uygulamayı indiren veya kullanan herkese uygulanır.',

          h_collect: 'Topladığımız Bilgiler',
          h_collect_account: 'Hesap bilgileri',
          p_collect_account: 'Hesap oluşturduğunda e-posta adresini topluyoruz. Apple veya Google ile giriş yaptığında bu sağlayıcıların bizimle paylaştığı temel profil bilgilerini (genellikle bir isim ve benzersiz bir tanımlayıcı) alıyoruz. Şifreni bu sağlayıcılardan almıyor veya saklamıyoruz.',
          h_collect_profile: 'Profil ve beslenme verileri',
          p_collect_profile: 'Koçluk ve kalori hedeflerini kişiselleştirmek için sağladığın profil verilerini saklarız: yaş, cinsiyet, boy, kilo, aktivite seviyesi, diyet tercihleri, alerjenler ve hedefler. Uygulama içinden istediğin zaman düzenleyebilir veya silebilirsin.',
          h_collect_photos: 'Yemek fotoğrafları',
          p_collect_photos: 'Bir öğünü fotoğrafladığında; görüntü güvenli şekilde sunucumuza, oradan da beslenme analizi için üçüncü taraf bir görüntü AI sağlayıcısına iletilir. Görüntü; geçmişini inceleyebilmen için hesabınla ilişkilendirilerek saklanır. Geçmişten istediğin fotoğrafı silebilirsin; silinen fotoğraf depolamamızdan kaldırılır.',
          h_collect_health: 'Apple Sağlık verileri',
          p_collect_health: 'Açıkça izin verirsen; uygulama kişiselleştirmeyi iyileştirmek için seçili Sağlık verilerini (kilo veya aktivite gibi) okuyabilir ve beslenme sonuçlarını Sağlık’a yazabilir. Bu verileri yalnızca cihazında ya da sunucularımızda geçici olarak işleriz; talep ettiğin özelliği sunmak için gerekenin ötesinde saklamayız.',
          h_collect_subs: 'Abonelik verileri',
          p_collect_subs: 'Abonelikler Apple tarafından işlenir. Satın almaları doğrulamak ve hak yönetimini yapmak için abonelik altyapısı sağlayıcımız olarak RevenueCat’i kullanırız. Bir işlem kimliği, abonelik durumu ve ürün kimliği alırız. Ödeme kartı bilgilerini almıyor ve saklamıyoruz.',
          h_collect_usage: 'Kullanım analitiği ve teşhis',
          p_collect_usage: 'Hangi özelliklerin işe yaradığını anlamak ve hataları bulmak için anonimleştirilmiş kullanım olayları (örn. “ekran açıldı”, “öğün kaydedildi”) ve çökme teşhisi toplarız. Analitik olayları; öğünlerinin, fotoğraflarının ya da sohbet mesajlarının içeriğini asla içermez.',

          h_use: 'Bilgileri Nasıl Kullanırız',
          p_use_lede: 'Topladığımız bilgileri şunlar için kullanırız:',
          l_use_1: 'Uygulamayı sağlamak ve işletmek — öğün fotoğraflarını analiz etmek, beslenme toplamlarını hesaplamak dâhil.',
          l_use_2: 'Profil ve hedeflerine dayalı kişiselleştirilmiş koçluk ve öneriler sunmak.',
          l_use_3: 'Abonelik ve hakları RevenueCat ile Apple üzerinden yönetmek.',
          l_use_4: 'İzin verdiğin işlemsel bildirimleri göndermek (hatırlatıcılar, haftalık özetler).',
          l_use_5: 'Sorunları tespit etmek, kötüye kullanımı engellemek ve toplulaştırılmış analitik ile uygulamayı iyileştirmek.',
          l_use_6: 'Yasal yükümlülüklere uymak.',
          p_use_no_sell: 'Kişisel verilerini satmıyoruz. Öğün fotoğraflarını herhangi bir genel amaçlı modeli eğitmek için kullanmıyoruz.',

          h_third: 'Üçüncü Taraf Hizmetleri',
          p_third_lede: 'Hizmeti çalıştırmak için küçük ve denetlenmiş bir sağlayıcı grubuyla çalışıyoruz. Her biri yalnızca işlevi için gerekli olan veriyi alır:',
          l_third_1: 'Supabase — kimlik doğrulama, veritabanı ve hesabının, profilinin, öğün fotoğraflarının depolanması.',
          l_third_2: 'Üçüncü taraf AI görüntü sağlayıcısı — yalnızca beslenme tahmini döndürmek amacıyla öğün fotoğraflarını alır. Sağlayıcı, verilerini kendi genel modellerini eğitmek için kullanmayı yasaklayan veri işleme şartlarıyla bağlıdır.',
          l_third_3: 'RevenueCat — Apple App Store üzerinde abonelik doğrulama ve hak yönetimi.',
          l_third_4: 'Apple (Apple ile Giriş, Apple Sağlık, push bildirimleri) ve Google (Google ile Giriş) — yalnızca senin yetki verdiğin veriler paylaşılır.',
          l_third_5: 'Anonimleştirilmiş analitik ve çökme raporu sağlayıcıları — toplulaştırılmış, kimlik tanımlamayan olay verisi alır.',

          h_retention: 'Veri Saklama',
          p_retention: 'Hesap bilgilerini, profili ve öğün geçmişini hesabın aktif olduğu sürece saklarız. Hesabını silersen verilerini 30 gün içinde sileriz veya geri döndürülemez şekilde anonimleştiririz; belirli kayıtları tutmamız yasal olarak zorunlu olan durumlar (örn. işlem kayıtları) hariç.',

          h_rights: 'Haklarınız',
          p_rights_lede: 'Yaşadığın yere bağlı olarak aşağıdaki haklara sahip olabilirsin:',
          l_rights_1: 'Erişim — hakkında tuttuğumuz bilgilerin bir kopyasını talep etmek.',
          l_rights_2: 'Düzeltme — yanlış veya eksik bilgileri düzeltmek.',
          l_rights_3: 'Silme — hesabının ve verilerinin silinmesini istemek. Hesabını uygulama içinden de silebilirsin.',
          l_rights_4: 'Taşınabilirlik — verilerini yapılandırılmış, makine tarafından okunabilir bir biçimde almak.',
          l_rights_5: 'İtiraz veya kısıtlama — belirli işleme faaliyetlerine itiraz etmek veya bunları kısıtlamak.',
          l_rights_6: 'Onayı geri çekmek — işleme onaya dayalıysa onayını istediğin zaman geri çekebilirsin.',
          p_rights_how: 'Bu haklardan herhangi birini kullanmak için <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz. 30 gün içinde yanıt veririz. Yerel veri koruma otoritene şikâyet hakkın da vardır.',

          h_children: 'Çocuklar',
          p_children: 'Uygulama 13 yaş altı çocuklara yönelik değildir (veya yargı yetkindeki asgari yaşa). Bilerek çocuklardan kişisel veri toplamayız. Topladığımızı öğrenirsek derhâl sileriz.',

          h_international: 'Uluslararası Veri Aktarımları',
          p_international: 'Bilgilerin Avrupa Birliği ve Amerika Birleşik Devletleri dâhil, ikamet ettiğin ülke dışındaki ülkelerde işlenebilir. Yasanın gerektirdiği yerlerde uygun güvenceleri (standart sözleşme maddeleri gibi) uygularız.',

          h_security: 'Güvenlik',
          p_security: 'Aktarımda (TLS) ve dinlenmede şifreleme, erişim kontrolleri ve en az ayrıcalık ilkesini kullanırız. Hiçbir sistem mükemmel güvenli değildir; ancak güvenliği ciddiye alırız ve yasal olarak gerekli olan durumlarda önemli bir ihlal hâlinde etkilenen kullanıcıları bilgilendiririz.',

          h_changes: 'Bu Politikadaki Değişiklikler',
          p_changes: 'Bu Politikayı güncelleyebiliriz. Yukarıdaki “Yürürlük” tarihi en son revizyonu yansıtır. Önemli değişiklikler için seni uygulama içinden veya e-posta ile bilgilendiririz.',

          h_contact: 'İletişim',
          p_contact: 'Sorular için <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz.',
        },

        terms: {
          eyebrow: 'Calorie Reader AI — Şartlar',
          title: 'Kullanım Şartları',
          lede: 'Bu Şartlar; Calorie Reader AI uygulamasının kullanımını düzenler. Daha geniş Foi Digitals web sitesi şartları için <a href="../../terms.html">stüdyo şartlar sayfasına</a> bak.',
          effective: 'Yürürlük 27 Mayıs 2026',
          version: 'v1.0',
          tocLabel: 'İçindekiler',

          h_accept: 'Şartların Kabulü',
          p_accept: 'Uygulamayı indirerek, yükleyerek veya kullanarak bu Şartları ve Gizlilik Politikamızı okuduğunu, anladığını ve bunlarla bağlı olmayı kabul ettiğini onaylıyorsun. Kabul etmiyorsan uygulamayı kullanma.',

          h_service: 'Uygulama',
          p_service: 'Calorie Reader AI; öğün fotoğraflarından beslenme bilgisini tahmin eden, diyet ve aktivite verisini takip eden ve AI destekli rehberlik sunan bir yazılımdır. “Olduğu gibi” sunulur ve takdirimize bağlı olarak değiştirilebilir, askıya alınabilir veya sonlandırılabilir.',

          h_eligibility: 'Uygunluk ve Hesaplar',
          p_eligibility: 'Uygulamayı kullanmak için en az 13 yaşında olman (veya yargı yetkindeki asgari yaşta) gerekir. Hesap bilgilerini güvende tutmaktan ve hesabın altında gerçekleşen tüm aktivitelerden sen sorumlusun.',

          h_subs: 'Abonelikler ve Otomatik Yenileme',
          p_subs1: 'Uygulama; ücretli abonelikler (topluca “Calorie Reader Pro”) sunabilir. Bir abonelik satın aldığında ödeme, onay sırasında Apple ID’nden tahsil edilir. Mevcut dönemin bitiminden en az 24 saat önce otomatik yenileme kapatılmadıkça abonelik aynı süre ve fiyatla otomatik yenilenir.',
          p_subs2: 'Hesabın, mevcut dönemin bitiminden önceki 24 saat içinde yenileme için ücretlendirilir. Aboneliklerini istediğin zaman Apple ID hesap ayarlarından yönetebilir ve otomatik yenilemeyi kapatabilirsin: <strong>Ayarlar → [adın] → Abonelikler</strong>.',
          p_subs3: 'Sunulduğunda, ücretsiz denemenin kullanılmamış kısmı abonelik satın aldığında geçersiz kalır.',

          h_refunds: 'İadeler',
          p_refunds: 'Tüm ödemeler Apple tarafından işlenir. İade talepleri Apple’ın App Store politikalarına tabidir. App Store üzerinden yapılan satın almalar için iadeyi doğrudan biz veremeyiz. İade talebi için <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener">reportaproblem.apple.com</a> adresini ziyaret et.',

          h_medical: 'Tıbbi Uyarı',
          p_medical1: '<strong>Uygulama tıbbi tavsiye değildir.</strong> Kalori tahminleri ve AI tarafından üretilen yönlendirmeler bilgilendirme amaçlıdır ve yaklaşıktır. Nitelikli bir sağlık profesyoneli, kayıtlı diyetisyen veya diğer lisanslı bir uzmana danışmanın yerine geçmez.',
          p_medical2: 'Uygulamayı hastalık ya da tıbbi bir durumu teşhis etmek, tedavi etmek, iyileştirmek veya önlemek için kullanma. Yeme bozukluğun varsa, hamileysen ya da emziriyorsan, kronik bir durumun (örn. diyabet) varsa veya önemli diyet değişiklikleri düşünüyorsan, uygulamanın çıktılarına güvenmeden önce nitelikli bir uzmana danış.',
          p_medical3: 'Tıbbi bir acil durumda derhâl yerel acil durum servislerini ara.',

          h_content: 'İçeriğin',
          p_content1: 'Gönderdiğin fotoğrafların, profil bilgilerinin ve diğer içeriğin (“İçeriğin”) mülkiyeti sende kalır.',
          p_content2: 'Uygulamayı kullanarak Foi Digitals’a, uygulamayı sana sunmak için gereken kapsamda İçeriğini barındırmak, işlemek ve göstermek üzere dünya çapında, telif ücreti olmayan bir lisans verirsin. İçeriğini genel amaçlı AI modellerini eğitmek için kullanmıyor ve satmıyoruz.',

          h_use: 'Kabul Edilebilir Kullanım',
          p_use_lede: 'Şunları yapmamayı kabul edersin:',
          l_use_1: 'Uygulamayı hukuka aykırı bir amaçla veya geçerli herhangi bir yasayı ihlal ederek kullanmak.',
          l_use_2: 'Uygulamanın tersine mühendisliğini yapmaya, ondan kaynak kod çıkarmaya çalışmak — yasanın izin verdiği hâller hariç.',
          l_use_3: 'Uygulamaya veya altyapısına müdahale etmek, onu aksatmak ya da yetkisiz erişim sağlamaya çalışmak.',
          l_use_4: 'Başkalarının haklarını ihlal eden, zararlı olan ya da AI özelliklerini manipüle etmeye çalışan içerik yüklemek (prompt enjeksiyonu dâhil).',
          l_use_5: 'Uygulamayı üçüncü taraflara tıbbi, diyetetik veya diğer profesyonel tavsiye vermek için kullanmak.',
          l_use_6: 'Önceden yazılı iznimiz olmadan uygulamayı yeniden satmak, alt lisanslamak veya başka bir şekilde ticari olarak sömürmek.',

          h_ip: 'Fikrî Mülkiyet',
          p_ip: 'Yazılımı, tasarımı, marka işaretleri ve içerikleri (İçeriğin hariç) dâhil olmak üzere uygulama, Foi Digitals’a aittir ve fikrî mülkiyet yasalarınca korunur. Uygulamayı kişisel, ticari olmayan amaçlarla kullanmak için sınırlı, münhasır olmayan, devredilemez, geri alınabilir bir lisans veririz.',

          h_third: 'Üçüncü Taraf Hizmetleri',
          p_third: 'Uygulama; üçüncü taraf sağlayıcılara (Apple, Google, Supabase, RevenueCat ve AI sağlayıcımız dâhil) dayanır. Bu sağlayıcıları kullanımın kendi şartlarına tabidir. Üçüncü taraf hizmetlerinin uygulamalarından, Gizlilik Politikamızda açıklananın ötesinde sorumlu değiliz.',

          h_disclaim: 'Sorumluluk Reddi',
          p_disclaim: 'Uygulama; “olduğu gibi” ve “mevcut olduğu kadar” esasıyla, satılabilirlik, belirli bir amaca uygunluk, doğruluk veya ihlal etmeme garantileri dâhil olmak üzere açık veya zımnî hiçbir garanti olmaksızın sunulur. Uygulamanın kesintisiz, hatasız olacağını ya da kalori tahminlerinin kesin olacağını garanti etmiyoruz.',

          h_liability: 'Sorumluluk Sınırı',
          p_liability: 'Yasanın izin verdiği en geniş ölçüde Foi Digitals; uygulamayı kullanmandan doğan herhangi bir dolaylı, arızi, özel, sonuçsal ya da cezai zarardan sorumlu olmayacaktır. Hiçbir durumda toplam sorumluluğumuz (a) talep tarihinden önceki on iki ayda bize ödediğin tutarın veya (b) 50 ABD Dolarının daha büyük olanını aşmayacaktır.',

          h_termination: 'Sonlandırma',
          p_termination: 'Uygulamayı kullanmayı bırakabilir ve hesabını istediğin zaman silebilirsin. Bu Şartları ihlal etmen hâlinde erişimini askıya alabilir veya sonlandırabiliriz. Niteliği gereği sonlandırma sonrasında da geçerli kalması gereken hükümler yürürlükte kalır.',

          h_law: 'Geçerli Hukuk',
          p_law: 'Bu Şartlar; Türkiye Cumhuriyeti yasalarına tabidir. Her türlü uyuşmazlık, ikamet ettiğin ülkenin zorunlu tüketici koruma yasaları aksini gerektirmediği sürece İstanbul mahkemelerinin yetkisindedir.',

          h_changes: 'Değişiklikler',
          p_changes: 'Bu Şartları revize edebiliriz. Yukarıdaki “Yürürlük” tarihi en son revizyonu yansıtır. Değişiklikler yürürlüğe girdikten sonra uygulamayı kullanmaya devam etmen kabul anlamına gelir.',

          h_contact: 'İletişim',
          p_contact: 'Sorular için <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz.',
        },

        support: {
          eyebrow: 'Calorie Reader AI — Destek',
          title: 'Sorular ve Yardım',
          lede: 'Calorie Reader AI hakkındaki yaygın sorular. Sorunun burada değilse bize yaz — her mesajı bir insan okur.',
          effective: 'Güncellendi 27 Mayıs 2026',
          tocLabel: 'Konular',

          faq1_q: 'Calorie Reader AI nedir?',
          faq1_a: 'Calorie Reader AI; tek bir fotoğraftan öğünlerin beslenme içeriğini tahmin eden bir iOS uygulamasıdır. AI beslenme koçu, öğün geçmişi ve ilerleme takibi içerir. Uygulama, Foi Digitals tarafından geliştirilmektedir.',

          faq2_q: 'Fotoğraftan kalori özelliği nasıl çalışıyor?',
          faq2_a: 'Öğününün fotoğrafını çektiğinde; görüntü, içerideki yiyecekleri tanıyıp porsiyon boyutlarını tahmin eden bir görüntü AI sağlayıcısına güvenli şekilde iletilir. Sonuç, kalori ve makro besin tahminleri üretmek için bir beslenme referansıyla birleştirilir. Tüm süreç genellikle birkaç saniye sürer.',

          faq3_q: 'Tahminler ne kadar doğru?',
          faq3_a_p1: 'Fotoğrafa dayalı tahminler yaklaşıktır. Model; net görülebilen, iyi aydınlatılmış öğünlerde en iyi sonucu verir. Gizli malzemeleri (soslar, yağlar, iç harçlar) olan, alışılmadık porsiyonlu ya da belirsiz açıdaki yemeklerde olduğundan az ya da fazla tahmin edebilir.',
          faq3_a_p2: 'En iyi sonuç için her öğünü tabağın tamamı görünecek şekilde yukarıdan fotoğrafla. Kaydedilmiş bir öğüne dokunarak değerleri manuel olarak ayarlayabilirsin.',

          faq4_q: 'AI koçu bana tıbbi tavsiye veriyor mu?',
          faq4_a: 'Hayır. AI beslenme koçu bilgilendirme amaçlı bir araçtır. Profesyonel tıbbi, diyetetik ya da psikolojik tavsiyenin yerine geçmez. Bir tıbbi durumun, yeme bozukluğun varsa, hamileysen ya da emziriyorsan veya önemli diyet değişiklikleri düşünüyorsan lütfen nitelikli bir sağlık uzmanına danış.',

          faq5_q: 'Aboneliğimi nasıl yönetir veya iptal ederim?',
          faq5_a_p1: 'Calorie Reader Pro abonelikleri Apple tarafından işlenir ve Apple ID ayarlarında yönetilir.',
          faq5_a_p2: 'Cihazında <strong>Ayarlar → [adın] → Abonelikler</strong> bölümüne git, Calorie Reader AI’ı bul ve Aboneliği İptal Et’i seç. İptal, mevcut faturalama döneminin sonunda geçerli olur — o tarihe kadar erişimin korunur.',

          faq6_q: 'Hesabımı nasıl silerim?',
          faq6_a_p1: 'Hesabını uygulama içinden silebilirsin: <strong>Profil → Ayarlar → Hesabı Sil</strong> sayfasını açıp onayla. Profilin, öğün geçmişin ve fotoğrafların 30 gün içinde sistemlerimizden kalıcı olarak kaldırılır.',
          faq6_a_p2: 'Uygulama içinden silemiyorsan hesabınla ilişkilendirilmiş e-posta adresinden <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz; talebi manuel olarak işleriz.',

          faq7_q: 'Uygulama neden kamera ve fotoğraf izni istiyor?',
          faq7_a: 'Kamera izni; beslenme analizi için öğünleri fotoğraflamak amacıyla gereklidir. Fotoğraf kütüphanesi izni; yeni bir fotoğraf çekmek yerine mevcut bir öğün fotoğrafını seçebilmen içindir. Her ikisi de isteğe bağlıdır — reddetmen öğün kaydetme yeteneğini sınırlar ama diğer özellikleri engellemez. Fotoğraflarına; senin açıkça seçtiğin dışında erişmiyoruz.',

          faq8_q: 'Verilerim nasıl korunuyor?',
          faq8_a: 'Tüm veriler aktarımda (TLS) ve dinlenmede şifrelenir. Fotoğraflar hesabın altında saklanır; diğer kullanıcılarla paylaşılmaz ve genel amaçlı AI modellerini eğitmek için kullanılmaz. Tüm ayrıntılar <a href="privacy.html">Gizlilik Politikasında</a>.',

          faq9_q: 'Destekle nasıl iletişime geçerim?',
          faq9_a: '<a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz. Lütfen cihaz modelini, iOS sürümünü ve sorunun kısa bir açıklamasını ekle. Genellikle 2–3 iş günü içinde yanıt veririz.',

          cta_heading: 'Hâlâ yardıma mı ihtiyacın var?',
          cta_body: 'Bize bir not gönder. Her mesajı yanıtlıyoruz.',
          cta_button: 'Stüdyoya yaz',
        },
      },
    },
  },
};

/* ============================================================
   Runtime
   ============================================================ */

function resolveKey(lang, key) {
  const path = key.split('.');
  let node = translations[lang];
  for (const seg of path) {
    if (node == null) return null;
    node = node[seg];
  }
  return typeof node === 'string' ? node : null;
}

function t(key) {
  const lang = getLang();
  return resolveKey(lang, key) ?? resolveKey(DEFAULT_LANG, key) ?? key;
}

function detectInitialLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && SUPPORTED.includes(stored)) return stored;
  } catch (_) {}
  const nav = (navigator.language || navigator.userLanguage || '').toLowerCase();
  if (nav.startsWith('tr')) return 'tr';
  return DEFAULT_LANG;
}

let _lang = null;
function getLang() {
  if (!_lang) _lang = detectInitialLang();
  return _lang;
}

function setLang(lang) {
  if (!SUPPORTED.includes(lang)) return;
  _lang = lang;
  try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) {}
  document.documentElement.lang = lang;
  applyTranslations();
  syncToggle();
  document.dispatchEvent(new CustomEvent('foi:lang-changed', { detail: { lang } }));
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = resolveKey(_lang, key);
    if (value != null) el.textContent = value;
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    const value = resolveKey(_lang, key);
    if (value != null) el.innerHTML = value;
  });

  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const spec = el.getAttribute('data-i18n-attr');
    spec.split(',').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      const value = resolveKey(_lang, key);
      if (value != null) el.setAttribute(attr, value);
    });
  });

  const titleKey = document.documentElement.getAttribute('data-i18n-title');
  if (titleKey) {
    const titleValue = resolveKey(_lang, titleKey);
    if (titleValue) document.title = titleValue;
  }

  const descKey = document.documentElement.getAttribute('data-i18n-desc');
  if (descKey) {
    const descValue = resolveKey(_lang, descKey);
    const metaDesc = document.querySelector('meta[name="description"]');
    if (descValue && metaDesc) metaDesc.setAttribute('content', descValue);
  }
}

function syncToggle() {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    const isActive = btn.getAttribute('data-lang') === _lang;
    btn.classList.toggle('is-active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function bindToggle() {
  document.querySelectorAll('[data-lang]').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });
}

function init() {
  _lang = detectInitialLang();
  document.documentElement.lang = _lang;
  applyTranslations();
  bindToggle();
  syncToggle();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

window.FoiI18n = { t, setLang, getLang };
