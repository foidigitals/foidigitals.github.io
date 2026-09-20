/* ============================================================
   FOI DIGITALS — i18n
   - Auto-detects browser language (tr/en), defaults to en.
   - Manual override via header toggle, persisted in localStorage.
   - Resolves [data-i18n], [data-i18n-html], [data-i18n-attr="attr:key"]
   - Per-page <html data-i18n-title> + <meta data-i18n-desc>
   - Dispatches "foi:lang-changed" CustomEvent on change.
   ============================================================ */

(function () {
  "use strict";

  const STORAGE_KEY = "foi.lang";
  const DEFAULT_LANG = "en";
  const SUPPORTED = ["en", "tr"];

  /* ===================== EN ===================== */
  const en = {
    meta: {
      siteTitle: "Foi Digitals — software, crafted with intent",
      siteDesc: "An independent studio crafting mobile apps, mobile games, web apps, SaaS, and AI software.",
      privacyTitle: "Privacy — Foi Digitals",
      privacyDesc: "How Foi Digitals handles information across its website and products.",
      termsTitle: "Terms of Use — Foi Digitals",
      termsDesc: "The terms governing use of foidigitals.github.io and its products.",
      supportTitle: "Support — Foi Digitals",
      supportDesc: "Help, FAQ, and contact for Foi Digitals products.",
      appCalorieTitle: "Calorie Reader AI — Foi Digitals",
      appCalorieDesc: "Photograph a meal, get calories instantly. AI-powered nutrition tracker.",
      appCaloriePrivacyTitle: "Calorie Reader AI — Privacy",
      appCalorieTermsTitle: "Calorie Reader AI — Terms",
      appCalorieSupportTitle: "Calorie Reader AI — Support",
      appBeautyTitle: "Beauty Studio: Glow Up AI — Foi Digitals",
      appBeautyDesc: "Your own face, read properly — shape, colors, and the styles that suit you. AI styling reports.",
      appBeautyPrivacyTitle: "Beauty Studio — Privacy",
      appBeautyTermsTitle: "Beauty Studio — Terms",
      appBeautySupportTitle: "Beauty Studio — Support",
    },

    nav: {
      work: "Work",
      services: "Services",
      studio: "Studio",
      support: "Support",
      contact: "Contact",
    },

    hero: {
      tag: "studio no. 001 · istanbul · available q2",
      side: "independent · self-funded · since 2024",
      titleHtml: "software,<br>crafted with <em>intent.</em>",
      lede: "We are an independent studio building mobile apps, games, web products, SaaS, and AI software — the kind of work that outlives a launch week.",
      ctaWork: "see our work",
      ctaProject: "start a project",
      scroll: "scroll",
    },

    marquee: {
      1: "mobile apps",
      2: "mobile games",
      3: "web products",
      4: "saas platforms",
      5: "ai software",
      accent: "made with care",
    },

    featured: {
      id: "our work",
      heading: "two apps that <em>read</em> what they look at.",
      pill: "calorie reader ai · flagship",
      title: "photograph a meal. <em>understand it.</em>",
      desc: "Our vision model returns calories, protein, carbs, and fat in seconds — six languages, no friction. Built for the way people actually eat.",
      tag2: "AI vision",
      tag3: "health",
      tag4: "6 languages",
      ctaPrimary: "see the product",
      ctaGhost: "faq + support",
    },

    featured2: {
      pill: "beauty studio · glow up ai",
      title: "photograph a face. <em>style it.</em>",
      desc: "Face structure, seasonal color palette, hair, makeup and outfits — 94 analyses returned as written reports, plus try-ons rendered on your own photo before you commit to anything.",
      tag2: "AI vision",
      tag3: "lifestyle",
      tag4: "9 languages",
    },

    cap: {
      id: "the studio",
      heading: "five disciplines, <em>one studio.</em>",
      lede: "We move deliberately between disciplines so each product feels considered, not assembled. Few things, made well.",
      mobile: { title: "mobile apps.", desc: "iOS and Android consumer apps with calm interfaces, native feel, and shipping discipline. SwiftUI, Kotlin, React Native." },
      games:  { title: "mobile games.", desc: "Short, focused mechanics. No dark patterns." },
      web:    { title: "web products.", desc: "Marketing sites, dashboards, web apps. Fast & accessible." },
      saas:   { title: "saas.", desc: "Internal tools, B2B platforms, billing, auth." },
      ai:     { title: "ai software.", desc: "LLM apps, vision pipelines, RAG, agents." },
      custom: { title: "custom programs.", desc: "Bespoke tools and one-off systems built for a specific job." },
    },

    svc: {
      id: "work with us",
      heading: "have a project? <em>we'll build it.</em>",
      lede: "Engagement models that fit how small teams actually ship. From a discovery sprint to a full product partnership.",
      1: { title: "two-week discovery.", desc: "A fixed-scope sprint to validate an idea. Wireframes, technical scoping, and a build estimate at the end.", tag1: "fixed scope", tag2: "2 weeks", tag3: "deliverables" },
      2: { title: "end-to-end build.", desc: "From zero to App Store / production. Design, engineering, infrastructure, and release. Best for a single product MVP.", tag1: "design + engineering", tag2: "6–16 weeks" },
      3: { title: "ongoing partnership.", desc: "An embedded studio for product teams that need consistent shipping over multiple quarters. Monthly cadence.", tag1: "retainer", tag2: "quarterly review" },
      4: { title: "ai retrofit.", desc: "Add vision, language, or agent capability to an existing product. Includes model selection, eval, and integration.", tag1: "LLM + vision", tag2: "eval framework" },
      5: { title: "game prototype.", desc: "A short, focused prototype to test a single mechanic on real devices. Unity or native.", tag1: "mechanic-first", tag2: "3–6 weeks" },
      6: { title: "tell us what you need.", desc: "Internal tools, automations, one-off systems. If it's software, we've probably built something like it.", tag1: "scoped per engagement" },
    },

    next: {
      id: "in development",
      heading: "in quiet development.",
      lede: "Two things we're working on. Not announcing yet — but listed here so you know what's next.",
      1: { title: "untitled mobile game", desc: "A short, focused prototype. Single mechanic, no monetization gimmicks.", status: "prototype" },
      2: { title: "untitled ai tool", desc: "An internal experiment we're sharpening before deciding if it's a product.", status: "research" },
    },

    philos: {
      id: "how we work",
      heading: "three things we hold to.",
      1: { title: "few things, <em>made well.</em>", body: "Cadence over volume. We'd rather ship one product that lasts five years than ten that don't." },
      2: { title: "calm by <em>default.</em>",       body: "No dark patterns, no manufactured urgency. The product should respect the person using it." },
      3: { title: "independent and <em>patient.</em>", body: "Self-funded. Small team. We take the time the work needs." },
    },

    contact: {
      id: "get in touch",
      title: "tell us <em>what you're making.</em>",
      meta: "replies within 2–3 business days · istanbul, tr",
      side: {
        title: "what to send",
        body: "A paragraph about what you're building, a rough budget range, and your timeline. We'll tell you honestly if it's a fit.",
        l1: "subject", l2: "prefer", l3: "timezone",
      },
    },

    footer: {
      statement: "a small studio crafting software <em>worth keeping.</em>",
      copyright: "© 2026 foi digitals — istanbul, tr",
      col: { products: "products", studio: "studio", legal: "legal" },
      link: {
        calorie: "Calorie Reader AI",
        beauty: "Beauty Studio",
        more: "more coming",
        services: "services",
        capabilities: "capabilities",
        contact: "contact",
        privacy: "privacy",
        terms: "terms",
        support: "support",
      },
    },

    /* ----- Studio-wide legal pages ----- */
    privacy: {
      eyebrow: "legal · studio privacy",
      title: "Privacy",
      meta: "Last updated · 2026-05-27 · v1.1",
      body: `
        <p>Foi Digitals ("Foi Digitals", "we", "our") respects your privacy. This page describes what information we collect across our website at <code>foidigitals.github.io</code> and our company-wide channels. Each of our products may have its own additional privacy policy — for example, <a href="apps/calorie-reader-ai/privacy.html">Calorie Reader AI</a> and <a href="apps/beauty-studio/privacy.html">Beauty Studio</a>.</p>

        <h2>What we collect</h2>
        <h3>The studio website</h3>
        <p>This site is hosted on GitHub Pages. We do not run analytics, set tracking cookies, or include third-party trackers. GitHub may collect standard server logs (IP address, user-agent, requested URL) as part of operating the hosting platform; please see GitHub's privacy statement for details.</p>

        <h3>Email contact</h3>
        <p>If you email <strong>foidigitals@gmail.com</strong>, we receive the contents of that email and your email address. We use it solely to reply to you and any follow-up correspondence.</p>

        <h2>What we do not do</h2>
        <ul>
          <li>We do not sell, rent, or trade your information.</li>
          <li>We do not place advertising cookies on this site.</li>
          <li>We do not track you across other sites.</li>
        </ul>

        <h2>Product-level privacy</h2>
        <p>Each Foi Digitals product has its own dedicated privacy policy that describes how that specific product handles data. The product policies take precedence over this studio-wide policy for any product-related processing.</p>
        <ul>
          <li><a href="apps/calorie-reader-ai/privacy.html">Calorie Reader AI privacy policy</a></li>
          <li><a href="apps/beauty-studio/privacy.html">Beauty Studio privacy policy</a></li>
        </ul>

        <h2>Your rights</h2>
        <p>If you have ever emailed us and would like us to delete that correspondence, write to <strong>foidigitals@gmail.com</strong> with the subject "delete request" and we will do so within 30 days.</p>

        <h2>Changes</h2>
        <p>If this policy changes materially, we will update the "last updated" date above. Continued use of the site after a change constitutes acceptance of the revised policy.</p>

        <h2>Contact</h2>
        <p>Questions, concerns, or requests: <strong>foidigitals@gmail.com</strong>.</p>
      `,
    },

    terms: {
      eyebrow: "legal · terms of use",
      title: "Terms of Use",
      meta: "Last updated · 2026-05-27 · v1.1",
      body: `
        <p>These Terms of Use govern your access to and use of <code>foidigitals.github.io</code> ("the Site"), operated by Foi Digitals ("we", "us"). By using the Site, you agree to these terms. If you do not agree, do not use the Site.</p>

        <h2>Content</h2>
        <p>All text, images, graphics, and other content on the Site, unless otherwise noted, are the property of Foi Digitals and are protected by applicable intellectual property laws. You may view and link to the Site for personal, non-commercial use. You may not copy, reproduce, or redistribute the content without our written permission.</p>

        <h2>Products</h2>
        <p>Information about Foi Digitals products on this Site is provided for general information. Specific products are governed by their own terms of use, which take precedence:</p>
        <ul>
          <li><a href="apps/calorie-reader-ai/terms.html">Calorie Reader AI terms</a></li>
          <li><a href="apps/beauty-studio/terms.html">Beauty Studio terms</a></li>
        </ul>

        <h2>No warranties</h2>
        <p>The Site is provided "as is" without warranties of any kind. We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components. To the maximum extent permitted by law, we disclaim all implied warranties.</p>

        <h2>Limitation of liability</h2>
        <p>In no event shall Foi Digitals be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Site.</p>

        <h2>Third-party links</h2>
        <p>The Site may link to third-party websites. We are not responsible for the content, policies, or practices of those sites.</p>

        <h2>Governing law</h2>
        <p>These Terms are governed by the laws of the Republic of Türkiye, without regard to conflict-of-laws principles. Any disputes shall be resolved in the courts of Istanbul, Türkiye.</p>

        <h2>Changes</h2>
        <p>We may update these Terms from time to time. Material changes will be reflected in the "last updated" date above. Your continued use after changes are posted constitutes acceptance.</p>

        <h2>Contact</h2>
        <p>For questions about these Terms: <strong>foidigitals@gmail.com</strong>.</p>
      `,
    },

    support: {
      eyebrow: "support · studio help",
      title: "Support",
      meta: "We reply within 2–3 business days.",
      body: `
        <p>This is the umbrella support page for Foi Digitals. For product-specific help, please visit that product's support page.</p>

        <h2>Product support</h2>
        <ul>
          <li><a href="apps/calorie-reader-ai/support.html">Calorie Reader AI support &amp; FAQ</a></li>
          <li><a href="apps/beauty-studio/support.html">Beauty Studio support &amp; FAQ</a></li>
        </ul>

        <h2>Get in touch</h2>
        <p>Reach us at <strong>foidigitals@gmail.com</strong>. Include:</p>
        <ul>
          <li>which product you're using (or a project enquiry)</li>
          <li>the device + OS version, if reporting a bug</li>
          <li>steps to reproduce, screenshots, or a short description</li>
        </ul>

        <h2>Business inquiries</h2>
        <p>If you're considering working with us — discovery sprint, build engagement, AI retrofit, partnership — see <a href="index.html#services">our services</a> or email <strong>foidigitals@gmail.com</strong> with a paragraph about the project, your timeline, and rough budget. We'll respond honestly about fit within 2–3 business days.</p>

        <h2>Press &amp; partnerships</h2>
        <p>Press kits, interviews, and partnership proposals — same email, subject line "press" or "partnership".</p>
      `,
    },

    /* ----- Calorie Reader AI product ----- */
    cra: {
      back: "back to foi digitals",
      eyebrow: "product · calorie reader ai",
      pill: "an AI-powered nutrition tracker",
      titleHtml: "calorie tracking, <em>without the friction.</em>",
      desc: "Photograph any meal. Our vision model returns calories, protein, carbs, and fat in seconds. No barcode scanning, no manual logging, no database to search. Built for the way people actually eat.",
      meta: {
        platform: "Platform", platformVal: "iOS · iPhone",
        category: "Category", categoryVal: "Health & Fitness",
        langs: "Languages", langsVal: "6 (EN · TR · DE · ES · FR · IT)",
        size: "Status", sizeVal: "App Store soon",
      },
      cta: { primary: "view on app store · soon", privacy: "privacy policy", terms: "terms of use", support: "support & faq" },

      featuresId: "what it does",
      featuresHeading: "designed around <em>real meals.</em>",
      features: {
        f1: { title: "Snap & log.", desc: "Photograph a plate. The model recognizes ingredients and portion sizes, then returns full macros within seconds." },
        f2: { title: "Multi-item meals.", desc: "Handles complex plates — multiple dishes, sides, sauces — and breaks down nutrition per component." },
        f3: { title: "Edit if needed.", desc: "Disagree with an estimate? Adjust portions or items inline. Your edits help refine the next estimate." },
        f4: { title: "Six languages.", desc: "Localised meal recognition for English, Turkish, German, Spanish, French, and Italian — and growing." },
        f5: { title: "Calm interface.", desc: "No streaks, no shame loops, no manufactured anxiety. Track when you want, ignore when you don't." },
        f6: { title: "Privacy-first.", desc: "Encrypted in transit, GDPR/CCPA rights honored, and full account deletion from inside the app." },
      },

      pagesId: "legal & support",
      pagesHeading: "everything for this product.",
    },

    craPrivacy: {
      back: "back to calorie reader ai",
      eyebrow: "calorie reader ai · privacy",
      title: "Privacy Policy",
      meta: "Last updated · 2026-05-30 · v2.0",
      body: `
        <p>This Privacy Policy explains how <strong>Calorie Reader AI</strong> ("the App", "we", "us") collects, uses, shares, and protects your information. The App is operated by <strong>Foi Digitals</strong> ("the data controller"). By using the App you agree to the practices described here.</p>

        <h2>1. Who we are &amp; how to contact us</h2>
        <p>Data controller: Foi Digitals.<br>Contact / privacy requests: <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a></p>

        <h2>2. Data we collect</h2>
        <p>We collect only the data needed to provide the App's features. We do <strong>not</strong> use your data for cross-app tracking or advertising, and we do not sell your data.</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Category</th><th>Examples</th><th>Why</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Account &amp; contact</td>
                <td>Email address (from Sign in with Apple or Google). If you use Apple's "Hide My Email", we only receive the relay address.</td>
                <td>Create and secure your account.</td>
              </tr>
              <tr>
                <td>Health &amp; nutrition</td>
                <td>Weight, height, age, gender, activity level, calorie/macro goals, logged meals and nutrition values.</td>
                <td>Provide calorie tracking, goals, and coaching insights. This data is entered by you in the App.</td>
              </tr>
              <tr>
                <td>Meal photos</td>
                <td>Photos you take or choose of your meals.</td>
                <td>Estimate food and calories via AI image analysis (see Section 4).</td>
              </tr>
              <tr>
                <td>User content</td>
                <td>Messages to the in-app coach, meal notes, custom food names and your favorites.</td>
                <td>Operate the coaching chat and your food log.</td>
              </tr>
              <tr>
                <td>Identifiers</td>
                <td>Account user ID, an app-generated install identifier ("device ID"), and a push-notification token with your time zone and language.</td>
                <td>Operate the account, enforce free-tier limits / prevent abuse, and deliver reminders you enable.</td>
              </tr>
              <tr>
                <td>Purchases</td>
                <td>Subscription and credit-pack purchase status and history (processed via RevenueCat and the App Store / Google Play).</td>
                <td>Unlock paid features, restore purchases, and manage subscriptions.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="muted">We do <strong>not</strong> collect precise or coarse location, contacts, browsing or search history, advertising identifiers (IDFA), or biometric data. The App does not include any advertising or third-party analytics/tracking SDKs.</p>

        <h2>3. HealthKit / Apple Health</h2>
        <p>This version of the App does <strong>not</strong> read from or write to Apple Health (HealthKit) or Android Health Connect. Any nutrition or weight data is information you enter directly in the App.</p>

        <h2>4. AI photo analysis (OpenAI)</h2>
        <p>When you analyze a meal photo, the image is sent to <strong>OpenAI</strong> (OpenAI, L.L.C.) to detect foods and estimate nutrition. OpenAI processes the image to return a result; per OpenAI's API policy, API inputs are not used to train their models. Calorie and nutrition figures are <strong>estimates only</strong> and are not medical advice.</p>

        <h2>5. How your data is stored</h2>
        <p>Your account data, meals, weight logs, chat messages, and uploaded meal photos are stored on <strong>Supabase</strong> (our hosting and database provider) on your behalf. Data in transit is encrypted via HTTPS.</p>
        <blockquote><strong>Meal photo access note:</strong> Uploaded meal photos are served from a storage bucket via direct URLs. Anyone who obtains the specific file URL could access that image without signing in. We rely on these URLs not being shared publicly. Do not share meal-photo URLs you do not want others to see. You can delete photos by deleting the meal or your account (Section 8).</blockquote>

        <h2>6. Service providers (sub-processors)</h2>
        <p>We share data only with providers that help us run the App, under their respective terms:</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Provider</th><th>Purpose</th><th>Data involved</th></tr></thead>
            <tbody>
              <tr><td>OpenAI</td><td>AI meal-photo analysis</td><td>Meal photos</td></tr>
              <tr><td>Supabase</td><td>Hosting, database, authentication, storage</td><td>Account, health/nutrition, photos, chat</td></tr>
              <tr><td>RevenueCat</td><td>Subscription &amp; purchase management</td><td>Purchase status, user/app identifiers</td></tr>
              <tr><td>Apple / Google</td><td>Sign-in, payments, push delivery</td><td>Email (sign-in), purchase, push token</td></tr>
              <tr><td>Expo</td><td>Push-notification delivery</td><td>Push token</td></tr>
            </tbody>
          </table>
        </div>

        <h2>7. Legal bases (EEA/UK)</h2>
        <p>Where the GDPR applies, we process data to <strong>perform our contract</strong> with you (providing the App), based on your <strong>consent</strong> (e.g., camera, notifications), and for our <strong>legitimate interests</strong> (security, abuse prevention).</p>

        <h2>8. Your rights &amp; account deletion</h2>
        <p>You can access and edit your profile in the App. You may delete your account and associated data from within the App (Profile → account deletion), which removes your profile, meals, weight logs, chat messages, and meal photos. You may also email <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> to request access, correction, deletion, or a copy of your data. We honor applicable GDPR/CCPA rights.</p>

        <h2>9. Data retention</h2>
        <p>We keep your data while your account is active. When you delete your account, we delete your personal data from our active systems, except where we must retain limited records (e.g., purchase/transaction records) to comply with legal obligations.</p>

        <h2>10. Children</h2>
        <p>The App is not directed to children under 13 (or the minimum age in your country). We do not knowingly collect data from children under that age. If you believe a child has provided us data, contact us and we will delete it.</p>

        <h2>11. Changes</h2>
        <p>We may update this Policy. Material changes will be reflected by the "Last updated" date above and, where appropriate, in the App.</p>

        <h2>12. Contact</h2>
        <p>Questions? Email <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>.</p>
      `,
    },

    craTerms: {
      back: "back to calorie reader ai",
      eyebrow: "calorie reader ai · terms",
      title: "Terms of Use",
      meta: "Last updated · 2026-05-30 · v2.0",
      body: `
        <p>These Terms of Use ("Terms") govern your use of the <strong>Calorie Reader AI</strong> mobile application ("the App"), operated by <strong>Foi Digitals</strong> ("we", "us"). By downloading or using the App, you agree to these Terms and to our <a href="privacy.html">Privacy Policy</a>. If you do not agree, do not use the App.</p>

        <h2>1. The service</h2>
        <p>The App helps you log meals and estimate calories and nutrition, including via AI analysis of meal photos. <strong>All nutrition figures are estimates, not exact measurements.</strong></p>

        <h2>2. Not medical advice</h2>
        <p>The App is for general informational and wellness purposes only. It does <strong>not</strong> provide medical advice and is not a substitute for professional diagnosis, treatment, or dietary guidance. Calorie, macro, and weight targets are informational, not prescriptions. Consult a qualified health professional before making health decisions, especially if you have a medical condition. You use the App at your own risk.</p>

        <h2>3. Eligibility &amp; accounts</h2>
        <p>You must be at least 13 years old (or the minimum age in your country) to use the App. You are responsible for activity under your account and for keeping your sign-in credentials secure.</p>

        <h2>4. Acceptable use</h2>
        <ul>
          <li>Do not misuse, reverse-engineer, or attempt to disrupt the App or its backend.</li>
          <li>Do not submit unlawful content or attempt to manipulate the AI coach into producing harmful output.</li>
          <li>Do not use the App to violate the rights of others or any applicable law.</li>
        </ul>

        <h2 id="subscriptions">5. Subscriptions, credits &amp; payments</h2>
        <p>The App offers optional auto-renewable subscriptions and one-time credit packs that unlock additional features and AI usage.</p>
        <ul>
          <li><strong>Billing:</strong> Payment is charged to your Apple ID or Google account at confirmation of purchase.</li>
          <li><strong>Auto-renewal:</strong> Subscriptions renew automatically unless cancelled at least 24 hours before the end of the current period. Your account is charged for renewal within 24 hours before the period ends.</li>
          <li><strong>Manage / cancel:</strong> You can manage or cancel subscriptions in your device account settings (App Store or Google Play) after purchase.</li>
          <li><strong>Credit packs:</strong> Credit packs are one-time, consumable purchases and are non-refundable once used, except where required by law.</li>
          <li><strong>Restore:</strong> You can restore eligible purchases from within the App.</li>
          <li><strong>Pricing:</strong> Prices and plan details are shown in the App before purchase and may change for future periods.</li>
        </ul>
        <p class="muted">Refunds for App Store / Google Play purchases are handled by Apple or Google under their respective policies.</p>

        <h2>6. User content</h2>
        <p>You retain ownership of the content you submit (meal photos, notes, messages). You grant us a limited licence to process and store it solely to operate the App's features for you, including sending meal photos to our AI provider for analysis as described in the <a href="privacy.html">Privacy Policy</a>.</p>

        <h2>7. Intellectual property</h2>
        <p>The App, its design, and its content (excluding your user content) are owned by Foi Digitals and protected by applicable laws. These Terms grant you a personal, non-exclusive, non-transferable, revocable licence to use the App.</p>

        <h2>8. Disclaimers &amp; limitation of liability</h2>
        <p>The App is provided "as is" and "as available" without warranties of any kind, to the maximum extent permitted by law. We do not warrant that nutrition estimates are accurate or that the App will be uninterrupted or error-free. To the maximum extent permitted by law, Foi Digitals is not liable for any indirect, incidental, or consequential damages, or for any health outcomes arising from your use of the App.</p>

        <h2>9. Termination</h2>
        <p>You may stop using the App and delete your account at any time from within the App. We may suspend or terminate access if you breach these Terms.</p>

        <h2>10. Changes</h2>
        <p>We may update these Terms. Material changes are reflected by the "Last updated" date above. Continued use after changes means you accept the updated Terms.</p>

        <h2>11. Contact</h2>
        <p>Questions? Email <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>.</p>

        <hr>

        <h2 id="eula">End User License Agreement (EULA)</h2>
        <p class="muted">Applies to the Calorie Reader AI licensed application.</p>
        <p>This End User License Agreement supplements the Terms above. Because the App is distributed via the Apple App Store, the following acknowledgements apply (consistent with Apple's standard Licensed Application End User License Agreement):</p>
        <ul>
          <li>This EULA is between you and Foi Digitals only, and not with Apple. Apple is not responsible for the App or its content.</li>
          <li>Foi Digitals grants you a non-transferable licence to use the App on any Apple-branded device you own or control, as permitted by the App Store Terms of Service.</li>
          <li>Apple has no obligation to provide maintenance or support for the App.</li>
          <li>In the event the App fails to conform to any applicable warranty, you may notify Apple, and Apple may refund the purchase price (if any). Apple has no other warranty obligation with respect to the App.</li>
          <li>Foi Digitals, not Apple, is responsible for addressing any claims relating to the App, including product liability, legal/regulatory non-compliance, and consumer protection claims.</li>
          <li>Foi Digitals, not Apple, is responsible for investigating and resolving any third-party claim that the App infringes intellectual property rights.</li>
          <li>You represent that you are not located in a country subject to a U.S. Government embargo and are not on any U.S. Government restricted-parties list.</li>
          <li>Apple and its subsidiaries are third-party beneficiaries of this EULA and may enforce it against you.</li>
        </ul>

        <h3>Contact</h3>
        <p>Foi Digitals · <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a></p>
      `,
    },

    craSupport: {
      back: "back to calorie reader ai",
      eyebrow: "calorie reader ai · support",
      title: "Support & FAQ",
      meta: "We reply within 2–3 business days.",
      body: `
        <h2>Getting help</h2>
        <p>Email <strong>foidigitals@gmail.com</strong>. Please include:</p>
        <ul>
          <li>your iOS version (Settings → General → About)</li>
          <li>your iPhone model</li>
          <li>App version (found at the bottom of the App's Settings screen)</li>
          <li>a description of what happened and what you expected</li>
          <li>screenshots if relevant</li>
        </ul>

        <h2>Frequently asked questions</h2>

        <h3>Does Calorie Reader AI store my photos?</h3>
        <p>Yes. Meal photos are stored on our hosting provider (Supabase) so you can view your meal history. They are sent to OpenAI for nutrition analysis and are deleted when you remove the meal or delete your account. See the <a href="privacy.html">Privacy Policy</a> for details.</p>

        <h3>How accurate are the estimates?</h3>
        <p>The model performs well on common foods photographed clearly from above. Accuracy can drop with unusual lighting, partially hidden ingredients, or unusual cuisines. You can always edit estimates manually within the App. The App is not a substitute for medical or nutritional advice.</p>

        <h3>Which languages are supported?</h3>
        <p>English, Turkish, German, Spanish, French, and Italian. The UI language follows your iPhone's system language; meal recognition uses contextual cues from your selected language.</p>

        <h3>Does it work offline?</h3>
        <p>Meal analysis requires a network connection because it runs on a server-side vision model. Your previously logged meals (stored locally on your device) are accessible offline.</p>

        <h3>Will my data sync between devices?</h3>
        <p>Not yet. iCloud sync is on our roadmap and will be opt-in when released.</p>

        <h3>How do I delete my data?</h3>
        <p>Nutrition logs are stored locally on your device. To delete them, either remove entries inside the App (Settings → Reset all data) or uninstall the App.</p>

        <h3>Is there an Android version?</h3>
        <p>Not at launch. Android is on the roadmap.</p>

        <h3>How do I report a bug?</h3>
        <p>Email <strong>foidigitals@gmail.com</strong> with the subject "bug" and the details listed above.</p>

        <h3>How do I request a feature?</h3>
        <p>Same email, subject "feature request". We read every message.</p>
      `,
    },

    /* ----- Beauty Studio: Glow Up AI product ----- */
    bs: {
      back: "back to foi digitals",
      eyebrow: "product · beauty studio",
      pill: "AI styling reports from your own face",
      titleHtml: "your own face, <em>read properly.</em>",
      desc: "What looks good on someone else may not look good on you. Beauty Studio reads your face — its structure, its proportions, its coloring — and turns that into advice you can act on. Your lines, your palette, your look.",
      meta: {
        platform: "Platform", platformVal: "iOS · Android",
        category: "Category", categoryVal: "Lifestyle · Photo & Video",
        langs: "Languages", langsVal: "9 (EN · TR · DE · FR · PT · IT · RU · ES · NL)",
        size: "Status", sizeVal: "App Store & Play soon",
      },
      cta: { primary: "view on the stores · soon", privacy: "privacy policy", terms: "terms of use", support: "support & faq" },

      featuresId: "what it does",
      featuresHeading: "built around <em>your face,</em> not a trend.",
      features: {
        f1: { title: "Start with your structure.", desc: "Face shape, proportions, and the feature worth leading with. Eye shape and where liner belongs. Brow architecture, lip proportions, and frames that suit your bone structure." },
        f2: { title: "Find your colors.", desc: "Your seasonal palette, your five best colors, and the neutrals that hold them together. Gold or silver. Colors for an interview, an evening, a wedding invitation. Hold a garment to your face and get a verdict." },
        f3: { title: "See it before you commit.", desc: "Try a cut, a shade, a makeup look or an outfit on your own photo first — then decide. Hair length and color, natural to glam makeup, capsule outfits, a 30-day glow-up preview." },
        f4: { title: "94 analyses, one library.", desc: "Face, skin, color, hair, makeup, outfits, style identity and glow-up planning across ten categories. Every result is saved as a report you can reopen while you shop, compare over time, or export as a card." },
        f5: { title: "Nine languages.", desc: "English, Turkish, German, French, Portuguese, Italian, Russian, Spanish and Dutch — interface and written reports alike, following your device language." },
        f6: { title: "Your photos stay yours.", desc: "Photos are stored privately to your account, never shown to other users, and never sold. Delete a photo, delete every report, or delete your whole account from inside the app." },
      },
      disclaimer: "Beauty Studio is a styling tool — not medical, dermatological, or cosmetic-procedure advice. The analysis is generated by AI and can be wrong. Treat it as a well-informed second opinion, not a verdict. The app does not score attractiveness and never ranks you against anyone else.",

      pagesId: "legal & support",
      pagesHeading: "everything for this product.",
    },

    bsPrivacy: {
      back: "back to beauty studio",
      eyebrow: "beauty studio · privacy",
      title: "Privacy Policy",
      meta: "Last updated · 2026-08-20 · v1.0",
      body: `
        <p>This Privacy Policy explains how <strong>Beauty Studio: Glow Up AI</strong> ("the App", "Beauty Studio", "we", "us") collects, uses, shares, and protects your information. The App is operated by <strong>Foi Digitals</strong>, Istanbul, Türkiye ("the data controller"). It applies to the iOS and Android versions of the App. By using the App you agree to the practices described here.</p>
        <p class="muted">Written to be read, not to be survived. If anything here is unclear, email us and we will explain it in plain language.</p>

        <h2>1. Who we are &amp; how to contact us</h2>
        <p>Data controller: <strong>Foi Digitals</strong> — Istanbul, Türkiye.<br>Privacy requests, questions, and deletion requests: <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a></p>

        <h2>2. You can use Beauty Studio without giving us your name or email</h2>
        <p>The App's default sign-in path is an <strong>anonymous account</strong>. When you tap "continue as guest", we create an account identified only by a random ID (a UUID). In that mode we hold <strong>no email address, no name, and no contact details for you at all</strong> — only the random ID, and whatever you then create inside the App.</p>
        <p>You may optionally sign in with an <strong>email address and password</strong>, with <strong>Google</strong>, or with <strong>Sign in with Apple</strong>. Doing so lets you keep your reports if you change device. If you use Apple's <em>Hide My Email</em>, we only ever receive the private relay address, not your real one. Apple may return your full name to us at first sign-in; we <strong>do not store it</strong>.</p>
        <blockquote>Anonymous accounts live on the device that created them. If you delete the App, or lose the device, an anonymous account and its reports cannot be recovered by us — we have no way to identify you. Add an email or a social login if you want your reports to survive a device change.</blockquote>

        <h2>3. Data we collect</h2>
        <p>We collect only what the App's features need. We do <strong>not</strong> sell your data. Section 6 describes the one place where data leaves us for advertising measurement, and how to switch it off.</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Category</th><th>What it is</th><th>Why</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Account</td>
                <td>A randomly generated account ID (UUID). If you choose to sign in: your email address and which provider you used (Apple / Google / email), plus the account creation date.</td>
                <td>Create and secure your account; let you sign back in on another device.</td>
              </tr>
              <tr>
                <td>Photos</td>
                <td>The selfie or portrait you take or select for an analysis.</td>
                <td>Produce the analysis you asked for, and generate visual try-ons from it. See Section 4.</td>
              </tr>
              <tr>
                <td>Analysis reports</td>
                <td>The written report the AI returns — face-shape and structure notes, seasonal color palette and hex values, hair, makeup and outfit recommendations, style archetype, glow-up suggestions — together with the type of analysis, the date, links to any generated preview images, and any note you attach.</td>
                <td>Save your results so you can reopen, compare and export them.</td>
              </tr>
              <tr>
                <td>Profile &amp; preferences</td>
                <td>Whether you have completed onboarding, your saved goals, your premium status, and how many analyses you have run.</td>
                <td>Operate the App and your entitlements.</td>
              </tr>
              <tr>
                <td>Credits &amp; purchases</td>
                <td>Your credit balance and credit-transaction history, your subscription status, the product identifier purchased, and its start/expiry dates. Payment itself is handled by Apple or Google — <strong>we never see your card details</strong>.</td>
                <td>Unlock paid features, meter AI usage, restore purchases.</td>
              </tr>
              <tr>
                <td>Advertising identifiers</td>
                <td>On iOS, your IDFA — <strong>only if you allow tracking</strong> when asked. On Android, the Google Advertising ID. Plus app install / session / purchase events sent to Meta.</td>
                <td>Measure which ads bring people to the App. See Section 6, including how to refuse.</td>
              </tr>
              <tr>
                <td>Device-only data</td>
                <td>Display name, avatar color, favourites, report tone, language, notification settings, onboarding answers (hair type, goal, metal preference), your Lookbook, and cached previews.</td>
                <td>Kept <strong>on your device only</strong> — never uploaded to us. See Section 9.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="muted">We do <strong>not</strong> collect location (precise or coarse), contacts, calendar, microphone or audio, video, browsing or search history, health or fitness data, biometric templates, or financial account details. Beauty Studio contains <strong>no in-app advertising</strong>, no third-party analytics SDK, and no crash-reporting SDK.</p>

        <h2>4. Your photo: exactly what happens to it</h2>
        <p>This is the part most people want to know, so here it is step by step.</p>
        <ul>
          <li><strong>You choose it.</strong> You take a photo with the camera or pick one from your library. The App never accesses your photo library in the background.</li>
          <li><strong>It is shrunk on your device.</strong> Before anything leaves your phone, the image is resized to at most 1,600 pixels on its longest side (1,920 for full-length shots) and re-encoded as a JPEG. Because it is fully re-encoded, the original file's embedded metadata — including any GPS coordinates your camera may have written — is not carried through.</li>
          <li><strong>It is uploaded to private storage.</strong> The photo goes to our storage provider (Supabase) into a <strong>private</strong> bucket, under a path belonging to your account ID. Access rules permit only your own signed-in account to read, add or delete files under that path. It is not published, not indexed, and not visible to other users.</li>
          <li><strong>It is sent for analysis.</strong> Our server fetches the photo and passes it to <strong>fal.ai</strong>, the AI infrastructure provider that runs the vision models, together with the styling instructions. We do <strong>not</strong> send your account ID, email or name to fal.ai — the request contains the image and the prompt.</li>
          <li><strong>Generated images.</strong> For visual try-ons (hair, color, makeup, outfits, glow-up, nails) the same photo is used to generate new images of you. These are produced by fal.ai and returned as image links hosted on fal.ai's infrastructure; those links are saved to your report so the App can show them again. Deleting the report removes our reference to them.</li>
          <li><strong>It stays until you remove it.</strong> There is no automatic expiry. Your photo remains in your private storage until you delete it, delete the report, or delete your account (Section 12).</li>
        </ul>
        <p>You should only upload photos of <strong>yourself</strong>, or of someone who has agreed to it. Please do not upload photos of children.</p>

        <h2>5. AI processing</h2>
        <p>All AI processing runs through <strong>fal.ai</strong> (Features and Labels, Inc.), which hosts and routes to the underlying models. Two things happen there:</p>
        <ul>
          <li><strong>Reading the photo.</strong> A vision model produces the written report. The models currently used are <em>Google Gemini 2.5 Flash</em>, <em>Gemini 2.5 Flash Lite</em>, and <em>Qwen3-VL</em> as a fallback, in that order. We may change this list to keep quality up; the processing route (through fal.ai) stays the same.</li>
          <li><strong>Generating images.</strong> An image model creates try-on previews from your photo, with the provider's safety filter enabled.</li>
        </ul>
        <p>We do not use your photos, reports, or any other content to train AI models, and we do not permit our providers to train their models on data we send them.</p>
        <p><strong>The output is an estimate.</strong> AI-generated analysis and imagery can be wrong, unflattering, or simply odd. The App deliberately does not score attractiveness, rate beauty, or comment on weight or skin conditions, and the models are instructed not to infer or mention age, ethnicity, nationality or religion. Treat every result as a suggestion, not a fact about you.</p>

        <h2>6. Advertising measurement, Meta, and App Tracking Transparency</h2>
        <p>We want to be direct about this, because it is the only part of Beauty Studio that involves tracking in Apple's sense of the word.</p>
        <p>The App includes the <strong>Meta (Facebook) SDK</strong> so we can tell which advertising actually brings people to the App and stop paying for the advertising that does not. Through it, Meta receives standard app events — <em>install</em>, <em>session</em>, and <em>purchase</em> (purchase amount, currency and the product identifier) — and, where permitted, your device's advertising identifier.</p>
        <ul>
          <li><strong>On iOS</strong>, the SDK starts with advertiser tracking switched <strong>off</strong>. The App asks for App Tracking Transparency permission only <em>after</em> your first report is on screen — not at launch. If you choose <strong>"Ask App Not to Track"</strong>, your IDFA is not used and the tracking flag stays off. You can change your mind at any time in <em>Settings → Privacy &amp; Security → Tracking</em>.</li>
          <li><strong>On Android</strong>, you can limit this in <em>Settings → Google → Ads</em> by deleting or opting out of the advertising ID.</li>
          <li><strong>Refusing costs you nothing.</strong> No feature, report, credit or purchase depends on it.</li>
        </ul>
        <p>This data is used for advertising measurement and attribution. We do not use it to personalise your reports, and it plays no part in the AI analysis.</p>

        <h2>7. Purchases and subscriptions</h2>
        <p>Subscriptions and credit packs are sold through the <strong>App Store</strong> and <strong>Google Play</strong> and managed for us by <strong>RevenueCat</strong>. RevenueCat receives your account ID (the same random UUID) and your purchase and entitlement status. <strong>We do not send RevenueCat your email address or name</strong>, and neither we nor RevenueCat ever see your payment card — Apple and Google handle payment entirely.</p>

        <h2>8. Notifications</h2>
        <p>All notifications in Beauty Studio are <strong>scheduled locally on your device</strong>. The App does not generate or store a push token, and we operate no push server — which means we cannot send you a message remotely, and there is no notification identifier of yours held anywhere. Your notification preferences never leave your phone. You can turn notifications off in the App or in your device settings.</p>

        <h2>9. Data kept only on your device</h2>
        <p>Some things never reach us at all. Your sign-in session is held in the device's secure keystore (iOS Keychain / Android Keystore). Your display name, avatar color, favourite colors and previews, report tone, language, notification settings, the three onboarding answers (hair type, goal, metal preference), your saved Lookbook images, cached reports and cached previews are stored in the App's local storage and files. Uninstalling the App removes them.</p>

        <h2>10. Service providers (sub-processors)</h2>
        <p>We share data only with the providers that make the App work, under their respective terms. Each of them is bound by data processing terms that require it to protect your information to a standard at least equal to the one described in this policy, to process it only on our instructions and only to deliver the service listed below, and never to use it for its own purposes or to train its own models:</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Provider</th><th>Purpose</th><th>Data involved</th></tr></thead>
            <tbody>
              <tr><td>Supabase</td><td>Authentication, database, private photo storage, server functions</td><td>Account ID, email (if you signed in), photos, reports, credits, subscription status</td></tr>
              <tr><td>fal.ai</td><td>Runs the vision and image-generation models</td><td>Your photo and the analysis prompt — no account ID, email or name</td></tr>
              <tr><td>RevenueCat</td><td>Subscription and purchase management</td><td>Account ID, purchase and entitlement status</td></tr>
              <tr><td>Apple / Google</td><td>Sign-in, app distribution, payment processing</td><td>Email (if you use their sign-in), purchase records</td></tr>
              <tr><td>Meta Platforms</td><td>Advertising measurement and attribution</td><td>Install / session / purchase events; advertising identifier where permitted (Section 6)</td></tr>
            </tbody>
          </table>
        </div>

        <h2>11. International transfers</h2>
        <p>Foi Digitals is based in Türkiye and our providers operate infrastructure in the United States and the European Union. Using the App therefore involves transferring your data outside your country, including to the United States. Where the GDPR or UK GDPR applies, these transfers rely on the European Commission's Standard Contractual Clauses or an equivalent safeguard offered by the provider. Where Turkish law (KVKK) applies, transfers are made on the basis of your explicit consent or the applicable legal ground under Article 9.</p>

        <h2>12. Your rights, and the four tools inside the App</h2>
        <p>Open <strong>Profile → Data Management</strong> in the App. You do not need to email us for any of this:</p>
        <ul>
          <li><strong>Export my data</strong> — writes a JSON file containing your account details and every report, and hands it to the share sheet so you can save or send it. Nothing is uploaded.</li>
          <li><strong>Delete uploaded photos</strong> — removes every photo you have uploaded from our storage. If any file cannot be removed, the App tells you so rather than claiming success.</li>
          <li><strong>Delete all analysis data</strong> — deletes every saved report from our database and clears the local cache.</li>
          <li><strong>Delete account</strong> — deletes every photo you have uploaded, then deletes the account itself. Your profile, reports, credit wallet, credit history and subscription record are removed with it. This cannot be undone.</li>
        </ul>
        <blockquote><strong>Deleting your account does not cancel your subscription.</strong> Subscriptions are billed by Apple or Google and must be cancelled separately in <em>Settings → Apple Account → Subscriptions</em> or in <em>Google Play → Subscriptions</em>, otherwise billing continues.</blockquote>
        <p>Under the GDPR / UK GDPR, Türkiye's KVKK, and comparable laws, you also have the right to <strong>access</strong>, <strong>rectify</strong>, <strong>erase</strong>, <strong>restrict</strong>, and <strong>port</strong> your data, to <strong>object</strong> to processing based on legitimate interests, and to <strong>withdraw consent</strong> at any time. Email <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> and we will respond within 30 days. You may also complain to your local data protection authority — in Türkiye, the Kişisel Verileri Koruma Kurumu (KVKK).</p>
        <p class="muted">One honest limitation: if you use an anonymous account and contact us by email, we may be unable to identify which account is yours, and therefore unable to act on the request. Use the in-app tools instead — they are authenticated as you.</p>

        <h2>13. Legal bases (EEA / UK)</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Purpose</th><th>Legal basis</th></tr></thead>
            <tbody>
              <tr><td>Creating your account, running analyses, storing your reports, handling purchases</td><td>Performance of a contract (Art. 6(1)(b))</td></tr>
              <tr><td>Camera and photo-library access, notifications, advertising measurement / ATT</td><td>Consent (Art. 6(1)(a)) — withdrawable at any time in device settings</td></tr>
              <tr><td>Keeping the service secure, preventing abuse, metering AI cost</td><td>Legitimate interests (Art. 6(1)(f))</td></tr>
              <tr><td>Keeping purchase and tax records</td><td>Legal obligation (Art. 6(1)(c))</td></tr>
            </tbody>
          </table>
        </div>
        <p>A photograph of your face processed to describe your features is treated by us with care. We do not use it for biometric identification, we do not create a faceprint or template from it, and we do not use it to recognise you across images or sessions.</p>

        <h2>14. Retention</h2>
        <p>We keep your account, photos and reports <strong>for as long as your account exists</strong> — there is no automatic expiry, because we would rather you decide when your reports stop being useful. When you delete a photo, a report, or your account, the data is removed from our active systems. Purchase and transaction records may be retained where tax or accounting law requires it. Backups are cycled out in the ordinary course.</p>

        <h2>15. Security</h2>
        <p>All traffic is encrypted in transit over HTTPS. Photos live in a private storage bucket with row-level access rules that permit only your own account. Your sign-in session is stored in the device's hardware-backed secure store. Server-side functions verify your signed token before acting, and derive your identity from that token rather than from anything the client claims. No system is perfectly secure, but we do not take shortcuts here.</p>

        <h2>16. Children</h2>
        <p>Beauty Studio is <strong>not intended for anyone under 13</strong> (or the higher minimum age in your country — 16 in parts of the EEA). We do not knowingly collect data from children. Please do not upload photographs of children. If you believe a child has used the App or that a child's photo has been uploaded, email us and we will delete the account and its contents.</p>

        <h2>17. California residents (CCPA / CPRA)</h2>
        <p>We <strong>do not sell</strong> personal information for money. However, sharing app events and advertising identifiers with Meta for advertising measurement may qualify as "sharing for cross-context behavioural advertising" under the CPRA. You can opt out at any time by declining App Tracking Transparency on iOS or opting out of the advertising ID on Android (Section 6), and we honour Global Privacy Control signals where they reach us. You have the rights to know, delete, correct, and to be free from discrimination for exercising them.</p>

        <h2>18. Store privacy labels</h2>
        <p>For transparency, this is what we declare to Apple and Google:</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Data type</th><th>Collected</th><th>Linked to you</th><th>Used for tracking</th></tr></thead>
            <tbody>
              <tr><td>Email address</td><td>Only if you sign in</td><td>Yes</td><td>No</td></tr>
              <tr><td>Photos</td><td>Yes</td><td>Yes</td><td>No</td></tr>
              <tr><td>Other user content (reports, notes, goals)</td><td>Yes</td><td>Yes</td><td>No</td></tr>
              <tr><td>Purchase history</td><td>Yes</td><td>Yes</td><td><strong>Yes</strong></td></tr>
              <tr><td>Device ID (advertising identifier)</td><td>With your permission</td><td>Yes</td><td><strong>Yes</strong></td></tr>
              <tr><td>Product interaction</td><td>Yes</td><td>Yes</td><td><strong>Yes</strong></td></tr>
              <tr><td>Location, contacts, health, browsing history, diagnostics</td><td>No</td><td>—</td><td>—</td></tr>
            </tbody>
          </table>
        </div>

        <h2>19. What we never do</h2>
        <ul>
          <li>We never sell your personal data.</li>
          <li>We never show your photos or reports to other users — Beauty Studio has no social feed and no public profiles.</li>
          <li>We never use your photos or reports to train AI models.</li>
          <li>We never use advertising data to shape what your report says.</li>
          <li>We never require you to give us an email address to use the App.</li>
        </ul>

        <h2>20. Changes</h2>
        <p>We may update this Policy as the App changes. Material changes will be reflected in the "Last updated" date above and, where the change is significant, surfaced in the App. Continued use after an update means you accept the revised Policy.</p>

        <h2>21. Contact</h2>
        <p>Questions, requests, or a privacy concern: <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>. We reply within 2–3 business days, and always within 30 days for a formal data-rights request.</p>
      `,
    },

    bsTerms: {
      back: "back to beauty studio",
      eyebrow: "beauty studio · terms",
      title: "Terms of Use",
      meta: "Last updated · 2026-08-20 · v1.0",
      body: `
        <p>These Terms of Use ("Terms") govern your use of the <strong>Beauty Studio: Glow Up AI</strong> mobile application ("the App"), operated by <strong>Foi Digitals</strong>, Istanbul, Türkiye ("we", "us"). By downloading or using the App, you agree to these Terms and to our <a href="privacy.html">Privacy Policy</a>. If you do not agree, do not use the App.</p>

        <h2>1. What the App is</h2>
        <p>Beauty Studio analyses a photograph you provide and returns styling guidance: face structure and proportions, seasonal color palettes, hair, makeup and outfit recommendations, a style archetype, and glow-up suggestions. For many analyses it also generates preview images from your own photo so you can see a change before committing to it. The catalogue currently holds <strong>94 analyses across ten categories</strong>.</p>

        <h2>2. What the App is not</h2>
        <p>Beauty Studio is a <strong>styling and self-expression tool</strong>. It is <strong>not</strong> medical, dermatological, psychological, nutritional or cosmetic-procedure advice, and it is not a diagnostic device. Nothing in the App should be used to identify, diagnose or treat any condition of the skin, hair or body. If you have a health concern, consult a qualified professional.</p>
        <p>The App does not score attractiveness, rate beauty, or rank you against other people, and it is not designed to. If a result ever reads that way to you, treat it as a defect and tell us.</p>

        <h2>3. AI-generated content — read this one</h2>
        <ul>
          <li>Every report and every preview image is <strong>generated by artificial intelligence</strong> and can be inaccurate, inconsistent, unflattering, or simply wrong.</li>
          <li>Preview images are <strong>synthetic illustrations</strong>, not photographs and not predictions. A haircut, color or outfit rendered on your face is an approximation; a real salon or a real garment will differ, sometimes considerably.</li>
          <li><strong>Do not rely on a preview as the sole basis for an irreversible decision</strong> — a cut, a dye, a permanent treatment or a costly purchase. Take the report to a professional and use your own judgement.</li>
          <li>Two runs of the same analysis on the same photo may return different results. That is inherent to how these models work, not a malfunction.</li>
        </ul>

        <h2>4. Eligibility &amp; accounts</h2>
        <p>You must be at least <strong>13 years old</strong> — or older where your country requires it (16 in parts of the EEA) — to use the App. If you are under the age of majority where you live, you may only use the App with a parent or guardian's involvement, and only they may make purchases.</p>
        <p>You may use the App with an anonymous guest account, or sign in with email, Google, or Apple. You are responsible for activity under your account and for keeping your credentials secure. Note that an anonymous account cannot be recovered by us if you lose the device — we have no way to identify it as yours.</p>

        <h2>5. Your photos and content</h2>
        <p>You keep ownership of everything you submit. You grant us a limited, non-exclusive, worldwide, royalty-free licence to host, process and display your content <strong>solely to operate the App's features for you</strong> — including sending your photo to our AI provider for analysis and image generation, as described in the <a href="privacy.html">Privacy Policy</a>. This licence ends when you delete the content or your account. We do not use your content to train AI models, and we do not use it in marketing.</p>
        <p>You promise that:</p>
        <ul>
          <li>the photo is of <strong>you</strong>, or of an adult who has given you permission to upload it and to have AI-generated images made from it;</li>
          <li>you will <strong>not upload photographs of children</strong>;</li>
          <li>you hold the rights to the image and its upload does not infringe anyone's rights;</li>
          <li>you will not upload nudity, sexual content, violent or hateful imagery, or anything unlawful.</li>
        </ul>

        <h2>6. Generated images: what you may do with them</h2>
        <p>Preview images generated from your photo are yours to keep, save and share for personal, non-commercial use. Because they are AI-generated depictions, <strong>do not present them as genuine photographs</strong> — in particular, do not use them as evidence of a real result, in advertising, in a dating or professional profile that implies they are real, or in any way that would mislead someone about your appearance. Do not use the App to create images of another identifiable person.</p>

        <h2>7. Acceptable use</h2>
        <ul>
          <li>Do not reverse-engineer, decompile, scrape, or attempt to disrupt the App, its servers, or its AI providers.</li>
          <li>Do not attempt to bypass credit metering, entitlement checks, or paywalls, or to obtain paid features without paying.</li>
          <li>Do not use automated systems to submit analyses at scale.</li>
          <li>Do not use the App to harass, impersonate, or produce material about another person without their consent.</li>
          <li>Do not attempt to manipulate the AI into producing harmful, unlawful, or sexual output.</li>
        </ul>

        <h2 id="subscriptions">8. Subscriptions, credits &amp; payments</h2>
        <p>Beauty Studio is free to download. Paid plans and credit packs unlock the analysis catalogue and the AI processing that powers it.</p>
        <h3>Plans</h3>
        <ul>
          <li><strong>Weekly</strong> — premium access to written analyses, with a weekly credit allowance. Visual try-ons are not included in this plan.</li>
          <li><strong>Monthly</strong> — full access including visual try-ons, with a monthly credit allowance.</li>
          <li><strong>Yearly</strong> — full access including visual try-ons, billed annually, with the credit allowance refilled each month.</li>
        </ul>
        <p>The exact price, duration and credit allowance of every plan are shown in the App, in your local currency, before you confirm anything.</p>
        <h3>Credits</h3>
        <ul>
          <li>Credits meter AI usage. Written analyses cost a small number of credits; generating images on your own face costs substantially more, because it genuinely costs us more to produce. Nothing in the App is unlimited, and we would rather say so than promise otherwise.</li>
          <li>New accounts do <strong>not</strong> include free credits.</li>
          <li><strong>Credit packs</strong> are one-time consumable purchases. They add credits but do not unlock premium access on their own.</li>
          <li>Credits have no cash value, cannot be exchanged for money, cannot be transferred between accounts, and expire when your account is deleted.</li>
          <li>Where a plan grants a periodic allowance, unused allowance credits do not roll over unless the App states otherwise.</li>
        </ul>
        <h3>Billing</h3>
        <ul>
          <li><strong>Payment</strong> is charged to your Apple Account or Google Play account at confirmation of purchase.</li>
          <li><strong>Auto-renewal:</strong> subscriptions renew automatically unless cancelled at least <strong>24 hours before</strong> the end of the current period. Your account is charged for renewal within 24 hours before the period ends.</li>
          <li><strong>Manage or cancel</strong> at any time in <em>Settings → Apple Account → Subscriptions</em> (iOS) or <em>Google Play → Subscriptions</em> (Android). Deleting the App or your Beauty Studio account does <strong>not</strong> cancel a subscription.</li>
          <li><strong>Restore purchases</strong> is available in the paywall footer if you reinstall or change device.</li>
          <li><strong>Free trials</strong>, where offered, are described in the App before purchase. Any unused portion of a free trial is forfeited when you buy a subscription.</li>
          <li><strong>Price changes</strong> apply to future periods only, and Apple or Google will notify you as their rules require.</li>
        </ul>
        <h3>Refunds</h3>
        <p>Purchases are made through the App Store and Google Play, so <strong>refunds are handled by Apple or Google</strong> under their policies — we cannot issue them directly. Consumed credits are non-refundable except where the law requires otherwise. If you are in the EU or UK and exercising a statutory withdrawal right, note that by starting an analysis you ask us to begin performing the service immediately, which may affect that right for the portion already delivered.</p>

        <h2>9. Availability and changes to the App</h2>
        <p>We may add, change or remove analyses, models and features, and adjust credit costs, as the App evolves and as our own provider costs change. Where a change materially reduces what a plan you are currently paying for provides, we will make that clear in the App before it takes effect. We may suspend the service for maintenance or where a provider outage prevents analyses from running.</p>

        <h2>10. Intellectual property</h2>
        <p>The App, its name, its design, its interface, its analysis catalogue and its prompts (excluding your own content and the images generated from your photo) belong to Foi Digitals and are protected by applicable law. These Terms grant you a personal, non-exclusive, non-transferable, revocable licence to use the App on devices you own or control.</p>

        <h2>11. Disclaimers</h2>
        <p>The App is provided <strong>"as is" and "as available"</strong>, without warranties of any kind, to the maximum extent permitted by law. We do not warrant that the analysis is accurate, that generated images resemble any real outcome, that the App will be uninterrupted or error-free, or that it will meet your expectations. Any styling, purchasing, grooming or cosmetic decision you take is your own.</p>

        <h2>12. Limitation of liability</h2>
        <p>To the maximum extent permitted by law, Foi Digitals is not liable for any indirect, incidental, special, consequential or punitive damages, nor for lost profits, lost data, or the cost of a haircut, dye job, cosmetic treatment or purchase you made after using the App. Where liability cannot be excluded, our total aggregate liability is limited to the greater of (a) the amount you paid us for the App in the twelve months before the claim, or (b) EUR 50. Nothing here limits liability for fraud, death or personal injury caused by negligence, or any other liability that cannot lawfully be limited — and if you are a consumer, your statutory rights are unaffected.</p>

        <h2>13. Indemnity</h2>
        <p>You agree to indemnify Foi Digitals against claims arising from content you upload in breach of Section 5 — in particular, uploading a photograph of another person without their consent.</p>

        <h2>14. Termination</h2>
        <p>You may stop using the App and delete your account at any time from <em>Profile → Data Management</em>. We may suspend or terminate access if you materially breach these Terms, with notice where practicable. Sections 5, 10, 11, 12, 13 and 16 survive termination.</p>

        <h2>15. Changes to these Terms</h2>
        <p>We may update these Terms. Material changes are reflected in the "Last updated" date above and, where significant, surfaced in the App. Continued use after a change means you accept the updated Terms.</p>

        <h2>16. Governing law</h2>
        <p>These Terms are governed by the laws of the Republic of Türkiye, and the courts of Istanbul have jurisdiction. If you are a consumer resident in the EEA, the UK, or another jurisdiction whose law grants you mandatory protections, that choice of law does not deprive you of them, and you may bring proceedings in your local courts.</p>

        <h2>17. Contact</h2>
        <p>Questions about these Terms: <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>.</p>

        <hr>

        <h2 id="eula">End User License Agreement (EULA)</h2>
        <p class="muted">Applies to the Beauty Studio licensed application.</p>
        <p>This End User License Agreement supplements the Terms above. Because the App is distributed via the Apple App Store, the following acknowledgements apply, consistent with Apple's standard Licensed Application End User License Agreement:</p>
        <ul>
          <li>This EULA is between you and Foi Digitals only, and not with Apple. Apple is not responsible for the App or its content.</li>
          <li>Foi Digitals grants you a non-transferable licence to use the App on any Apple-branded device you own or control, as permitted by the App Store Terms of Service.</li>
          <li>Apple has no obligation to provide maintenance or support for the App.</li>
          <li>In the event the App fails to conform to any applicable warranty, you may notify Apple, and Apple may refund the purchase price (if any). Apple has no other warranty obligation with respect to the App.</li>
          <li>Foi Digitals, not Apple, is responsible for addressing any claims relating to the App, including product liability, legal or regulatory non-compliance, and consumer protection claims.</li>
          <li>Foi Digitals, not Apple, is responsible for investigating and resolving any third-party claim that the App infringes intellectual property rights.</li>
          <li>You represent that you are not located in a country subject to a U.S. Government embargo and are not on any U.S. Government restricted-parties list.</li>
          <li>Apple and its subsidiaries are third-party beneficiaries of this EULA and may enforce it against you.</li>
        </ul>
        <p>For the Android version distributed via Google Play, your use is additionally subject to the <em>Google Play Terms of Service</em>. Google is not a party to these Terms and is not responsible for the App.</p>

        <h3>Contact</h3>
        <p>Foi Digitals · Istanbul, Türkiye · <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a></p>
      `,
    },

    bsSupport: {
      back: "back to beauty studio",
      eyebrow: "beauty studio · support",
      title: "Support & FAQ",
      meta: "We reply within 2–3 business days.",
      body: `
        <h2>Getting help</h2>
        <p>Email <strong>foidigitals@gmail.com</strong>. To get a useful answer on the first reply, include:</p>
        <ul>
          <li>your device and OS version (iPhone 15 / iOS 18.4, Pixel 8 / Android 15, and so on)</li>
          <li>the App version, shown at the bottom of the Profile screen</li>
          <li>which analysis you were running, if the problem happened during one</li>
          <li>what you expected and what actually happened</li>
          <li>a screenshot, if it helps</li>
        </ul>
        <p class="muted">Please do not email us your photos unless we ask for them.</p>

        <h2>Photos &amp; privacy</h2>

        <h3>What happens to the photo I upload?</h3>
        <p>It is shrunk and re-encoded on your device, uploaded to a private storage area belonging to your account, and sent to our AI provider (fal.ai) for analysis. It is never shown to other users and never sold. It stays until you delete it. The <a href="privacy.html">Privacy Policy</a> walks through every step.</p>

        <h3>How do I delete my photos, my reports, or my whole account?</h3>
        <p>Open <strong>Profile → Data Management</strong>. There are four buttons: export your data as a JSON file, delete uploaded photos, delete all analysis data, and delete your account. Account deletion removes your photos and every report with it, and cannot be undone.</p>

        <h3>Do I have to create an account?</h3>
        <p>No. You can continue as a guest, and we will hold no email address or name for you at all. The trade-off: a guest account lives on that device only. If you reinstall the App or change phone, it cannot be recovered — we have no way to identify it as yours. Adding an email, Google or Apple sign-in fixes that.</p>

        <h3>Are my photos used to train AI?</h3>
        <p>No. We do not train models on your content and do not permit our providers to.</p>

        <h3>Why does the App ask permission to track me?</h3>
        <p>Only to measure which ads bring people to the App. Declining changes nothing about how the App works — every feature, credit and report behaves identically. See <a href="privacy.html">the Privacy Policy</a>, Section 6.</p>

        <h2>Results</h2>

        <h3>How accurate is the analysis?</h3>
        <p>It performs best on a well-lit, front-facing photo with your hair back from your face and no heavy filter. Accuracy drops with strong colored lighting, sunglasses, extreme angles, or a heavily edited image. Everything the App returns is an AI-generated opinion — a well-informed second opinion, not a verdict.</p>

        <h3>I ran the same analysis twice and got different answers.</h3>
        <p>That is expected. These models are not deterministic. If the two results genuinely contradict each other on something important, a better-lit photo usually settles it.</p>

        <h3>Will my hair really look like the preview?</h3>
        <p>Treat previews as illustrations, not promises. They are synthetic images, and a real cut or dye depends on your hair's texture, current color and your stylist's technique. Take the preview to your salon as a reference — that is what it is good for. Please do not commit to anything irreversible on the strength of a generated image alone.</p>

        <h3>Does the App rate how attractive I am?</h3>
        <p>No, deliberately. There is no beauty score, no rating, no ranking, and no comparison to anyone else. The models are explicitly instructed not to comment on attractiveness, weight or skin conditions, and not to infer age, ethnicity, nationality or religion.</p>

        <h3>The analysis said something about my skin. Is that medical advice?</h3>
        <p>No. Beauty Studio is a styling tool. It cannot diagnose anything, and it is not a substitute for a dermatologist. If something about your skin concerns you, see a professional.</p>

        <h2>Credits &amp; subscriptions</h2>

        <h3>Why are there credits at all?</h3>
        <p>Because running a vision model on a photo and generating new images of your face costs us real money per run. Credits meter that. Written analyses cost a little; image generation costs considerably more. Nothing is unlimited, and we would rather be straight about it than promise otherwise.</p>

        <h3>Which plan includes the visual try-ons?</h3>
        <p>The monthly and yearly plans. The weekly plan covers the written analyses. Exact allowances and prices are shown in the App before you buy.</p>

        <h3>How do I cancel?</h3>
        <p>On iOS: <em>Settings → your name → Subscriptions</em>. On Android: <em>Google Play → Subscriptions</em>. Cancel at least 24 hours before the period ends. <strong>Deleting the App or your account does not cancel a subscription.</strong></p>

        <h3>I paid but nothing unlocked.</h3>
        <p>Tap <strong>Restore Purchases</strong> in the paywall footer first — that resolves most cases, especially after a reinstall or device change. If it does not, email us with the store receipt and we will sort it out.</p>

        <h3>Can I get a refund?</h3>
        <p>Refunds are handled by Apple and Google, not by us. On iOS use <em>reportaproblem.apple.com</em>; on Android request it through your Google Play order history. If a purchase failed because of a bug on our side, tell us and we will help you make the case.</p>

        <h3>Do unused credits expire?</h3>
        <p>Credits bought in a pack stay in your wallet. Allowance credits granted by a plan are refreshed each period rather than accumulated. All credits are lost if you delete your account.</p>

        <h2>Using the App</h2>

        <h3>Which languages are supported?</h3>
        <p>English, Turkish, German, French, Portuguese, Italian, Russian, Spanish and Dutch — for both the interface and the written report. The App follows your device language, and you can change it in the App.</p>

        <h3>Does it work offline?</h3>
        <p>No. Analyses and image generation run on our servers, so a connection is required. Reports you have already run are cached and can be reopened offline.</p>

        <h3>Will my reports sync to a new phone?</h3>
        <p>Yes, if you signed in with email, Google or Apple — sign in on the new device and your reports are there. A guest account cannot be moved.</p>

        <h3>Are there notifications I did not ask for?</h3>
        <p>All notifications are scheduled locally by the App, and you control them in the App's notification settings. We operate no push server, so we cannot message you remotely even if we wanted to.</p>

        <h3>How do I report a bug or ask for a feature?</h3>
        <p>Email <strong>foidigitals@gmail.com</strong> with subject "bug" or "feature request". We read every message and reply within 2–3 business days.</p>
      `,
    },
  };

  /* ===================== TR ===================== */
  const tr = {
    meta: {
      siteTitle: "Foi Digitals — niyetle, özenle yazılım",
      siteDesc: "Mobil uygulama, mobil oyun, web uygulamaları, SaaS ve AI yazılımları geliştiren bağımsız bir stüdyo.",
      privacyTitle: "Gizlilik — Foi Digitals",
      privacyDesc: "Foi Digitals'in web sitesi ve ürünlerinde bilgileri nasıl işlediği.",
      termsTitle: "Kullanım Koşulları — Foi Digitals",
      termsDesc: "foidigitals.github.io ve ürünlerinin kullanımını düzenleyen koşullar.",
      supportTitle: "Destek — Foi Digitals",
      supportDesc: "Foi Digitals ürünleri için yardım, SSS ve iletişim.",
      appCalorieTitle: "Calorie Reader AI — Foi Digitals",
      appCalorieDesc: "Yemeğinizin fotoğrafını çekin, kaloriyi anında öğrenin. AI destekli beslenme takibi.",
      appCaloriePrivacyTitle: "Calorie Reader AI — Gizlilik",
      appCalorieTermsTitle: "Calorie Reader AI — Koşullar",
      appCalorieSupportTitle: "Calorie Reader AI — Destek",
      appBeautyTitle: "Beauty Studio: Glow Up AI — Foi Digitals",
      appBeautyDesc: "Kendi yüzün, doğru okunmuş — hatların, renklerin ve sana yakışan stiller. Yapay zekâ ile stil raporları.",
      appBeautyPrivacyTitle: "Beauty Studio — Gizlilik",
      appBeautyTermsTitle: "Beauty Studio — Koşullar",
      appBeautySupportTitle: "Beauty Studio — Destek",
    },

    nav: {
      work: "İşler",
      services: "Hizmetler",
      studio: "Stüdyo",
      support: "Destek",
      contact: "İletişim",
    },

    hero: {
      tag: "stüdyo no. 001 · istanbul · q2 uygun",
      side: "bağımsız · kendi kaynağıyla · 2024'ten beri",
      titleHtml: "yazılım, <em>niyetle</em><br>ve özenle.",
      lede: "Bağımsız bir stüdyoyuz; mobil uygulamalar, oyunlar, web ürünleri, SaaS ve AI yazılımları geliştiriyoruz — lansman haftasını aşacak işler üretiyoruz.",
      ctaWork: "işlerimizi gör",
      ctaProject: "proje başlat",
      scroll: "kaydır",
    },

    marquee: {
      1: "mobil uygulamalar",
      2: "mobil oyunlar",
      3: "web ürünleri",
      4: "saas platformları",
      5: "ai yazılımları",
      accent: "özenle yapılmış",
    },

    featured: {
      id: "işlerimiz",
      heading: "baktığını <em>okuyan</em> iki uygulama.",
      pill: "calorie reader ai · amiral gemisi",
      title: "yemeğin fotoğrafını çek. <em>anlasın.</em>",
      desc: "Görüntü modelimiz saniyeler içinde kalori, protein, karbonhidrat ve yağ değerlerini döndürür — altı dilde, sürtünmesiz. İnsanların gerçekten yediği gibi tasarlandı.",
      tag2: "AI görüntü",
      tag3: "sağlık",
      tag4: "6 dil",
      ctaPrimary: "ürünü incele",
      ctaGhost: "sss + destek",
    },

    featured2: {
      pill: "beauty studio · glow up ai",
      title: "bir yüzün fotoğrafını çek. <em>stilini bul.</em>",
      desc: "Yüz yapısı, mevsimsel renk paleti, saç, makyaj ve kombinler — yazılı rapor olarak dönen 94 analiz; üstüne, karar vermeden önce kendi fotoğrafında görebileceğin denemeler.",
      tag2: "AI görüntü",
      tag3: "yaşam tarzı",
      tag4: "9 dil",
    },

    cap: {
      id: "stüdyo",
      heading: "beş disiplin, <em>tek stüdyo.</em>",
      lede: "Disiplinler arasında bilinçle hareket ediyoruz — böylece her ürün özenle düşünülmüş hissi verir. Az iş, iyi yapılmış.",
      mobile: { title: "mobil uygulamalar.", desc: "iOS ve Android tüketici uygulamaları; sakin arayüzler, yerel his, disiplinli yayın. SwiftUI, Kotlin, React Native." },
      games:  { title: "mobil oyunlar.", desc: "Kısa, odaklanmış mekanikler. Karanlık desenler yok." },
      web:    { title: "web ürünleri.", desc: "Tanıtım siteleri, paneller, web uygulamaları. Hızlı ve erişilebilir." },
      saas:   { title: "saas.", desc: "İç araçlar, B2B platformlar, faturalandırma, kimlik doğrulama." },
      ai:     { title: "ai yazılımları.", desc: "LLM uygulamaları, görüntü işleme, RAG, ajanlar." },
      custom: { title: "özel programlar.", desc: "Belirli bir iş için yazılmış özel araçlar ve tek seferlik sistemler." },
    },

    svc: {
      id: "birlikte çalış",
      heading: "projeniz mi var? <em>biz inşa edelim.</em>",
      lede: "Küçük takımların gerçekten ürün çıkarma biçimine uyan çalışma modelleri. Keşif sprintinden tam ürün ortaklığına.",
      1: { title: "iki haftalık keşif.", desc: "Bir fikri doğrulamak için sabit kapsamlı bir sprint. Tel kafes, teknik kapsam ve sonunda inşa tahmini.", tag1: "sabit kapsam", tag2: "2 hafta", tag3: "çıktılar" },
      2: { title: "uçtan uca inşa.", desc: "Sıfırdan App Store'a / canlıya. Tasarım, mühendislik, altyapı, yayın. Tek ürün MVP için en uygunu.", tag1: "tasarım + mühendislik", tag2: "6–16 hafta" },
      3: { title: "süregelen ortaklık.", desc: "Birden çok çeyrek boyunca tutarlı ürün çıkaran ekipler için gömülü bir stüdyo. Aylık ritim.", tag1: "retainer", tag2: "çeyreklik gözden geçirme" },
      4: { title: "ai entegrasyonu.", desc: "Mevcut bir ürüne görüntü, dil veya ajan yeteneği ekleyin. Model seçimi, değerlendirme ve entegrasyon dahil.", tag1: "LLM + görüntü", tag2: "değerlendirme çerçevesi" },
      5: { title: "oyun prototipi.", desc: "Tek bir mekaniği gerçek cihazda test etmek için kısa, odaklanmış prototip. Unity veya yerel.", tag1: "mekanik-öncelikli", tag2: "3–6 hafta" },
      6: { title: "ihtiyacını söyle.", desc: "İç araçlar, otomasyonlar, tek seferlik sistemler. Yazılımsa, muhtemelen benzerini yapmışızdır.", tag1: "iş başına kapsam" },
    },

    next: {
      id: "geliştirmede",
      heading: "sessiz geliştirmede.",
      lede: "Üzerinde çalıştığımız iki şey. Henüz duyurmuyoruz — ama burada listeli, ne geldiğini bilesiniz diye.",
      1: { title: "isimsiz mobil oyun", desc: "Kısa, odaklanmış prototip. Tek mekanik, manipülasyon yok.", status: "prototip" },
      2: { title: "isimsiz ai aracı", desc: "Ürün olup olmayacağına karar vermeden önce keskinleştirdiğimiz bir iç deney.", status: "araştırma" },
    },

    philos: {
      id: "nasıl çalışıyoruz",
      heading: "üç şeye bağlıyız.",
      1: { title: "az iş, <em>iyi yapılmış.</em>", body: "Hacim değil, ritim. Beş yıl yaşayan tek bir ürün, yaşamayan on üründen daha değerlidir." },
      2: { title: "varsayılan olarak <em>sakin.</em>", body: "Karanlık desenler yok, üretilmiş aciliyet yok. Ürün, onu kullanan kişiye saygı duymalıdır." },
      3: { title: "bağımsız ve <em>sabırlı.</em>", body: "Kendi kaynağımızla. Küçük takım. İşin gerektirdiği zamanı veriyoruz." },
    },

    contact: {
      id: "iletişime geç",
      title: "<em>ne yaptığınızı</em> bize anlatın.",
      meta: "2–3 iş günü içinde yanıt · istanbul, tr",
      side: {
        title: "ne göndermeli",
        body: "Ne inşa ettiğinize dair bir paragraf, kabaca bütçe aralığı ve zaman çizelgeniz. Uyumlu olup olmadığımızı dürüstçe söyleriz.",
        l1: "konu", l2: "tercih", l3: "saat dilimi",
      },
    },

    footer: {
      statement: "<em>saklamaya değer</em> yazılım üreten küçük bir stüdyo.",
      copyright: "© 2026 foi digitals — istanbul, tr",
      col: { products: "ürünler", studio: "stüdyo", legal: "yasal" },
      link: {
        calorie: "Calorie Reader AI",
        beauty: "Beauty Studio",
        more: "yakında daha fazlası",
        services: "hizmetler",
        capabilities: "yetenekler",
        contact: "iletişim",
        privacy: "gizlilik",
        terms: "koşullar",
        support: "destek",
      },
    },

    privacy: {
      eyebrow: "yasal · stüdyo gizliliği",
      title: "Gizlilik",
      meta: "Son güncelleme · 27.05.2026 · v1.1",
      body: `
        <p>Foi Digitals ("Foi Digitals", "biz") gizliliğinize saygı duyar. Bu sayfa, <code>foidigitals.github.io</code> adresindeki web sitemiz ve şirket çapındaki kanallarımızda hangi bilgileri topladığımızı açıklar. Ürünlerimizin her birinin kendi ek gizlilik politikası olabilir — örneğin <a href="apps/calorie-reader-ai/privacy.html">Calorie Reader AI</a>.</p>

        <h2>Topladığımız bilgiler</h2>
        <h3>Stüdyo web sitesi</h3>
        <p>Bu site GitHub Pages üzerinde barındırılıyor. Analitik çalıştırmıyor, izleme çerezi koymuyor, üçüncü taraf izleyici eklemiyoruz. GitHub, barındırma platformunu işletmenin bir parçası olarak standart sunucu günlüklerini (IP adresi, tarayıcı bilgisi, talep edilen URL) toplayabilir; ayrıntılar için GitHub'ın gizlilik beyanına bakın.</p>

        <h3>E-posta iletişimi</h3>
        <p><strong>foidigitals@gmail.com</strong> adresine e-posta gönderirseniz, mesajın içeriğini ve e-posta adresinizi alırız. Bunu yalnızca size yanıt vermek ve takip yazışmaları için kullanırız.</p>

        <h2>Yapmadıklarımız</h2>
        <ul>
          <li>Bilgilerinizi satmıyor, kiralamıyor veya takas etmiyoruz.</li>
          <li>Bu sitede reklam çerezi yerleştirmiyoruz.</li>
          <li>Sizi diğer sitelerde izlemiyoruz.</li>
        </ul>

        <h2>Ürün düzeyinde gizlilik</h2>
        <p>Her Foi Digitals ürününün, o ürünün verileri nasıl işlediğini anlatan kendi gizlilik politikası vardır. Ürünle ilgili işlemlerde ürün politikası bu stüdyo politikasına önceliklidir.</p>
        <ul>
          <li><a href="apps/calorie-reader-ai/privacy.html">Calorie Reader AI gizlilik politikası</a></li>
        </ul>

        <h2>Haklarınız</h2>
        <p>Bize daha önce e-posta gönderdiyseniz ve bu yazışmayı silmemizi isterseniz, "silme talebi" konulu bir e-postayı <strong>foidigitals@gmail.com</strong>'a gönderin; 30 gün içinde silelim.</p>

        <h2>Değişiklikler</h2>
        <p>Bu politika önemli ölçüde değişirse, yukarıdaki "son güncelleme" tarihini yenileriz. Değişiklikten sonra siteyi kullanmaya devam etmek, güncellenmiş politikayı kabul etmek anlamına gelir.</p>

        <h2>İletişim</h2>
        <p>Sorular, endişeler veya talepler için: <strong>foidigitals@gmail.com</strong>.</p>
      `,
    },

    terms: {
      eyebrow: "yasal · kullanım koşulları",
      title: "Kullanım Koşulları",
      meta: "Son güncelleme · 27.05.2026 · v1.1",
      body: `
        <p>Bu Kullanım Koşulları, Foi Digitals ("biz") tarafından işletilen <code>foidigitals.github.io</code> ("Site") üzerindeki erişiminizi ve kullanımınızı düzenler. Siteyi kullanarak bu koşulları kabul etmiş olursunuz. Kabul etmiyorsanız Siteyi kullanmayın.</p>

        <h2>İçerik</h2>
        <p>Aksi belirtilmedikçe, Sitedeki tüm metin, görseller, grafikler ve diğer içerikler Foi Digitals'in mülkiyetindedir ve geçerli fikri mülkiyet yasalarıyla korunur. Siteyi kişisel, ticari olmayan kullanım için görüntüleyebilir ve ona bağlantı verebilirsiniz. Yazılı izin olmaksızın içeriği kopyalayamaz, çoğaltamaz veya yeniden dağıtamazsınız.</p>

        <h2>Ürünler</h2>
        <p>Bu Sitedeki Foi Digitals ürünleri hakkındaki bilgiler genel bilgi amaçlıdır. Belirli ürünler kendi kullanım koşullarına tabidir ve bu koşullar önceliklidir:</p>
        <ul>
          <li><a href="apps/calorie-reader-ai/terms.html">Calorie Reader AI koşulları</a></li>
        </ul>

        <h2>Garanti yok</h2>
        <p>Site "olduğu gibi" sunulur ve hiçbir garanti verilmez. Sitenin kesintisiz, hatasız veya zararlı bileşenlerden arınmış olacağını garanti etmiyoruz. Yasaların izin verdiği azami ölçüde tüm zımni garantileri reddediyoruz.</p>

        <h2>Sorumluluğun sınırlandırılması</h2>
        <p>Hiçbir durumda Foi Digitals, Siteyi kullanımınızdan kaynaklanan veya buna bağlı dolaylı, arızi, özel, sonuç olarak ortaya çıkan veya cezai zararlardan sorumlu tutulamaz.</p>

        <h2>Üçüncü taraf bağlantıları</h2>
        <p>Site, üçüncü taraf web sitelerine bağlantı verebilir. Bu sitelerin içeriği, politikaları veya uygulamalarından sorumlu değiliz.</p>

        <h2>Geçerli hukuk</h2>
        <p>Bu Koşullar, kanunlar ihtilafı kuralları gözetilmeksizin Türkiye Cumhuriyeti yasalarına tabidir. Doğacak uyuşmazlıklar İstanbul mahkemelerinde çözülecektir.</p>

        <h2>Değişiklikler</h2>
        <p>Bu Koşulları zaman zaman güncelleyebiliriz. Önemli değişiklikler yukarıdaki "son güncelleme" tarihine yansıtılır. Değişiklikler yayımlandıktan sonra kullanmaya devam etmek kabul anlamına gelir.</p>

        <h2>İletişim</h2>
        <p>Bu Koşullar hakkında sorular için: <strong>foidigitals@gmail.com</strong>.</p>
      `,
    },

    support: {
      eyebrow: "destek · stüdyo yardım",
      title: "Destek",
      meta: "2–3 iş günü içinde yanıtlıyoruz.",
      body: `
        <p>Bu, Foi Digitals'in şemsiye destek sayfasıdır. Ürüne özel yardım için lütfen ilgili ürünün destek sayfasını ziyaret edin.</p>

        <h2>Ürün desteği</h2>
        <ul>
          <li><a href="apps/calorie-reader-ai/support.html">Calorie Reader AI destek ve SSS</a></li>
        </ul>

        <h2>Bize ulaşın</h2>
        <p><strong>foidigitals@gmail.com</strong> üzerinden ulaşın. Şunları belirtin:</p>
        <ul>
          <li>hangi ürünü kullandığınız (veya proje sorgusu)</li>
          <li>hata bildiriyorsanız cihaz ve OS sürümü</li>
          <li>tekrarlama adımları, ekran görüntüleri veya kısa bir açıklama</li>
        </ul>

        <h2>İş soruları</h2>
        <p>Bizimle çalışmayı düşünüyorsanız — keşif sprinti, inşa, AI entegrasyonu, ortaklık — <a href="index.html#services">hizmetlerimizi</a> görün veya proje, zaman çizelgesi ve kabaca bütçe hakkında bir paragrafla <strong>foidigitals@gmail.com</strong>'a yazın. 2–3 iş günü içinde uyum hakkında dürüstçe yanıtlarız.</p>

        <h2>Basın ve ortaklıklar</h2>
        <p>Basın kitleri, röportajlar, ortaklık teklifleri — aynı e-posta, konu satırı "basın" veya "ortaklık".</p>
      `,
    },

    /* ----- Calorie Reader AI ----- */
    cra: {
      back: "foi digitals'e dön",
      eyebrow: "ürün · calorie reader ai",
      pill: "AI destekli beslenme takipçisi",
      titleHtml: "kalori takibi, <em>sürtünmesiz.</em>",
      desc: "Herhangi bir yemeğin fotoğrafını çekin. Görüntü modelimiz saniyeler içinde kalori, protein, karbonhidrat ve yağ değerlerini döndürür. Barkod taraması yok, manuel kayıt yok, aranacak veritabanı yok. İnsanların gerçekten yediği gibi tasarlandı.",
      meta: {
        platform: "Platform", platformVal: "iOS · iPhone",
        category: "Kategori", categoryVal: "Sağlık ve Fitness",
        langs: "Diller", langsVal: "6 (EN · TR · DE · ES · FR · IT)",
        size: "Durum", sizeVal: "App Store yakında",
      },
      cta: { primary: "app store'da görüntüle · yakında", privacy: "gizlilik politikası", terms: "kullanım koşulları", support: "destek & sss" },

      featuresId: "ne yapıyor",
      featuresHeading: "<em>gerçek yemekler</em> için tasarlandı.",
      features: {
        f1: { title: "Çek ve kaydet.", desc: "Tabağın fotoğrafını çekin. Model malzemeleri ve porsiyon boyutlarını tanır, saniyeler içinde tam makroları döndürür." },
        f2: { title: "Çoklu yemekler.", desc: "Karmaşık tabakları işler — birden çok yemek, garnitür, sos — ve beslenmeyi bileşen başına ayırır." },
        f3: { title: "Gerekirse düzenle.", desc: "Tahmine katılmıyor musunuz? Porsiyonları veya öğeleri yerinde ayarlayın. Düzenlemeleriniz bir sonraki tahmini iyileştirir." },
        f4: { title: "Altı dil.", desc: "İngilizce, Türkçe, Almanca, İspanyolca, Fransızca ve İtalyanca için yerelleştirilmiş yemek tanıma — büyüyor." },
        f5: { title: "Sakin arayüz.", desc: "Seri yok, utanç döngüsü yok, üretilmiş kaygı yok. İstediğinizde takip edin, istemediğinizde görmezden gelin." },
        f6: { title: "Gizlilik önce.", desc: "Aktarımda şifrelenmiş, GDPR/CCPA haklarına saygılı, uygulama içinden tam hesap silme." },
      },

      pagesId: "yasal ve destek",
      pagesHeading: "bu ürün için her şey.",
    },

    craPrivacy: {
      back: "calorie reader ai'a dön",
      eyebrow: "calorie reader ai · gizlilik",
      title: "Gizlilik Politikası",
      meta: "Son güncelleme · 30.05.2026 · v2.0",
      body: `
        <p>Bu Gizlilik Politikası, <strong>Calorie Reader AI</strong>'ın ("Uygulama", "biz") bilgilerinizi nasıl topladığını, kullandığını, paylaştığını ve koruduğunu açıklar. Uygulama, <strong>Foi Digitals</strong> ("veri sorumlusu") tarafından işletilir. Uygulamayı kullanarak burada açıklanan uygulamaları kabul etmiş olursunuz.</p>

        <h2>1. Biz kimiz ve nasıl iletişime geçilir</h2>
        <p>Veri sorumlusu: Foi Digitals.<br>İletişim / gizlilik talepleri: <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a></p>

        <h2>2. Topladığımız veriler</h2>
        <p>Yalnızca Uygulamanın özelliklerini sağlamak için gereken verileri topluyoruz. Verilerinizi uygulamalar arası izleme veya reklamcılık için <strong>kullanmıyoruz</strong> ve verilerinizi satmıyoruz.</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Kategori</th><th>Örnekler</th><th>Neden</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Hesap ve iletişim</td>
                <td>E-posta adresi (Apple veya Google ile Giriş Yap'tan). Apple'ın "E-postamı Gizle" seçeneğini kullanırsanız yalnızca aktarma adresini alırız.</td>
                <td>Hesabınızı oluşturmak ve güvenceye almak.</td>
              </tr>
              <tr>
                <td>Sağlık ve beslenme</td>
                <td>Kilo, boy, yaş, cinsiyet, aktivite seviyesi, kalori/makro hedefleri, kaydedilen öğünler ve besin değerleri.</td>
                <td>Kalori takibi, hedefler ve koçluk içgörüleri sağlamak. Bu veriler Uygulamada sizin tarafınızdan girilir.</td>
              </tr>
              <tr>
                <td>Yemek fotoğrafları</td>
                <td>Yemeklerinizi çektiğiniz veya seçtiğiniz fotoğraflar.</td>
                <td>AI görüntü analizi ile yiyecek ve kaloriyi tahmin etmek (bkz. Bölüm 4).</td>
              </tr>
              <tr>
                <td>Kullanıcı içeriği</td>
                <td>Uygulama içi koça gönderilen mesajlar, öğün notları, özel yemek adları ve favorileriniz.</td>
                <td>Koçluk sohbetini ve yemek günlüğünüzü işletmek.</td>
              </tr>
              <tr>
                <td>Tanımlayıcılar</td>
                <td>Hesap kullanıcı kimliği, uygulama tarafından üretilen bir kurulum tanımlayıcısı ("cihaz kimliği") ve saat dilimi ile dilinizi içeren bir push bildirim jetonu.</td>
                <td>Hesabı işletmek, ücretsiz katman sınırlarını uygulamak / kötüye kullanımı önlemek ve etkinleştirdiğiniz hatırlatıcıları iletmek.</td>
              </tr>
              <tr>
                <td>Satın almalar</td>
                <td>Abonelik ve kredi paketi satın alma durumu ve geçmişi (RevenueCat ve App Store / Google Play üzerinden işlenir).</td>
                <td>Ücretli özellikleri açmak, satın almaları geri yüklemek ve abonelikleri yönetmek.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="muted">Hassas veya kaba konum, kişiler, tarama veya arama geçmişi, reklam tanımlayıcıları (IDFA) veya biyometrik veri <strong>toplamıyoruz</strong>. Uygulama hiçbir reklam veya üçüncü taraf analitik/izleme SDK'sı içermez.</p>

        <h2>3. HealthKit / Apple Health</h2>
        <p>Uygulamanın bu sürümü Apple Health (HealthKit) veya Android Health Connect'i <strong>okumaz veya bunlara yazmaz</strong>. Tüm beslenme veya kilo verileri doğrudan Uygulamaya girdiğiniz bilgilerdir.</p>

        <h2>4. AI fotoğraf analizi (OpenAI)</h2>
        <p>Bir yemek fotoğrafını analiz ettiğinizde, görüntü yiyecekleri tespit etmek ve beslenmeyi tahmin etmek için <strong>OpenAI</strong>'a (OpenAI, L.L.C.) gönderilir. OpenAI sonuç döndürmek için görüntüyü işler; OpenAI'ın API politikasına göre API girdileri modellerini eğitmek için kullanılmaz. Kalori ve beslenme rakamları yalnızca <strong>tahmindir</strong> ve tıbbi tavsiye değildir.</p>

        <h2>5. Verileriniz nasıl saklanır</h2>
        <p>Hesap verileriniz, öğünleriniz, kilo kayıtlarınız, sohbet mesajlarınız ve yüklenen yemek fotoğraflarınız sizin adınıza <strong>Supabase</strong> (barındırma ve veritabanı sağlayıcımız) üzerinde saklanır. Aktarımdaki veriler HTTPS ile şifrelenir.</p>
        <blockquote><strong>Yemek fotoğrafı erişim notu:</strong> Yüklenen yemek fotoğrafları doğrudan URL'ler aracılığıyla bir depolama kovasından sunulur. Belirli dosya URL'sini elde eden herkes oturum açmadan o görüntüye erişebilir. Bu URL'lerin kamuya açık olarak paylaşılmamasına güveniyoruz. Başkalarının görmesini istemediğiniz yemek fotoğrafı URL'lerini paylaşmayın. Öğünü veya hesabınızı silerek fotoğrafları silebilirsiniz (Bölüm 8).</blockquote>

        <h2>6. Hizmet sağlayıcılar (alt işleyiciler)</h2>
        <p>Verileri yalnızca Uygulamayı işletmemize yardımcı olan sağlayıcılarla, kendi koşulları altında paylaşırız. Her biri, bilgilerinizi bu politikada anlatılan düzeye en az eşdeğer bir standartta korumakla, yalnızca bizim talimatımızla ve aşağıda sayılan hizmeti vermek için işlemekle yükümlüdür; kendi amaçları için kullanamaz, kendi modellerini eğitmekte kullanamaz:</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Sağlayıcı</th><th>Amaç</th><th>İlgili veri</th></tr></thead>
            <tbody>
              <tr><td>OpenAI</td><td>AI yemek fotoğrafı analizi</td><td>Yemek fotoğrafları</td></tr>
              <tr><td>Supabase</td><td>Barındırma, veritabanı, kimlik doğrulama, depolama</td><td>Hesap, sağlık/beslenme, fotoğraflar, sohbet</td></tr>
              <tr><td>RevenueCat</td><td>Abonelik ve satın alma yönetimi</td><td>Satın alma durumu, kullanıcı/uygulama tanımlayıcıları</td></tr>
              <tr><td>Apple / Google</td><td>Giriş, ödemeler, push iletimi</td><td>E-posta (giriş), satın alma, push jetonu</td></tr>
              <tr><td>Expo</td><td>Push bildirim iletimi</td><td>Push jetonu</td></tr>
            </tbody>
          </table>
        </div>

        <h2>7. Yasal dayanaklar (EEA/UK)</h2>
        <p>GDPR'nin geçerli olduğu yerlerde verileri sizinle <strong>sözleşmemizi yerine getirmek</strong> (Uygulamayı sağlamak) için, <strong>rızanıza</strong> dayalı olarak (örn. kamera, bildirimler) ve <strong>meşru menfaatlerimiz</strong> için (güvenlik, kötüye kullanımı önleme) işleriz.</p>

        <h2>8. Haklarınız ve hesap silme</h2>
        <p>Uygulama içinden profilinize erişebilir ve düzenleyebilirsiniz. Hesabınızı ve ilişkili verilerinizi Uygulama içinden silebilirsiniz (Profil → hesap silme); bu, profilinizi, öğünlerinizi, kilo kayıtlarınızı, sohbet mesajlarınızı ve yemek fotoğraflarınızı kaldırır. Erişim, düzeltme, silme veya verilerinizin bir kopyasını talep etmek için <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>'a da yazabilirsiniz. Geçerli GDPR/CCPA haklarına saygı duyuyoruz.</p>

        <h2>9. Veri saklama</h2>
        <p>Verilerinizi hesabınız aktif olduğu sürece tutarız. Hesabınızı sildiğinizde, yasal yükümlülüklere uymak için sınırlı kayıtları (örn. satın alma/işlem kayıtları) saklamamız gereken durumlar haricinde kişisel verilerinizi aktif sistemlerimizden sileriz.</p>

        <h2>10. Çocuklar</h2>
        <p>Uygulama 13 yaşın (veya ülkenizdeki asgari yaşın) altındaki çocuklara yönelik değildir. O yaşın altındaki çocuklardan bilerek veri toplamıyoruz. Bir çocuğun bize veri sağladığına inanıyorsanız, bizimle iletişime geçin; sileriz.</p>

        <h2>11. Değişiklikler</h2>
        <p>Bu Politikayı güncelleyebiliriz. Önemli değişiklikler yukarıdaki "Son güncelleme" tarihine ve uygun olduğunda Uygulamaya yansıtılır.</p>

        <h2>12. İletişim</h2>
        <p>Sorular? <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine e-posta gönderin.</p>
      `,
    },

    craTerms: {
      back: "calorie reader ai'a dön",
      eyebrow: "calorie reader ai · koşullar",
      title: "Kullanım Koşulları",
      meta: "Son güncelleme · 30.05.2026 · v2.0",
      body: `
        <p>Bu Kullanım Koşulları ("Koşullar"), <strong>Foi Digitals</strong> ("biz") tarafından işletilen <strong>Calorie Reader AI</strong> mobil uygulamasının ("Uygulama") kullanımını düzenler. Uygulamayı indirerek veya kullanarak bu Koşulları ve <a href="privacy.html">Gizlilik Politikamızı</a> kabul etmiş olursunuz. Kabul etmiyorsanız Uygulamayı kullanmayın.</p>

        <h2>1. Hizmet</h2>
        <p>Uygulama, yemek fotoğraflarınızın AI analizi de dahil olmak üzere öğünleri kaydetmenize ve kalori ile beslenmeyi tahmin etmenize yardımcı olur. <strong>Tüm beslenme rakamları tahmindir, kesin ölçümler değildir.</strong></p>

        <h2>2. Tıbbi tavsiye değildir</h2>
        <p>Uygulama yalnızca genel bilgi ve sağlık amaçlıdır. Tıbbi tavsiye <strong>vermez</strong> ve profesyonel teşhis, tedavi veya diyet rehberliğinin yerini almaz. Kalori, makro ve kilo hedefleri bilgi amaçlıdır, reçete değildir. Özellikle bir tıbbi durumunuz varsa, sağlık kararları vermeden önce nitelikli bir sağlık uzmanına danışın. Uygulamayı kendi sorumluluğunuzda kullanırsınız.</p>

        <h2>3. Uygunluk ve hesaplar</h2>
        <p>Uygulamayı kullanmak için en az 13 yaşında (veya ülkenizdeki asgari yaşta) olmalısınız. Hesabınız altındaki etkinliklerden ve giriş bilgilerinizi güvende tutmaktan siz sorumlusunuz.</p>

        <h2>4. Kabul edilebilir kullanım</h2>
        <ul>
          <li>Uygulamayı veya arka uçunu kötüye kullanmayın, tersine mühendislik yapmayın veya bozmaya çalışmayın.</li>
          <li>Yasadışı içerik göndermeyin ve AI koçu zararlı çıktı üretmeye yönlendirmeye çalışmayın.</li>
          <li>Uygulamayı başkalarının haklarını veya geçerli yasaları ihlal etmek için kullanmayın.</li>
        </ul>

        <h2 id="subscriptions">5. Abonelikler, krediler ve ödemeler</h2>
        <p>Uygulama, ek özellikler ve AI kullanımı sunan, isteğe bağlı otomatik yenilenen abonelikler ve tek seferlik kredi paketleri sunar.</p>
        <ul>
          <li><strong>Faturalama:</strong> Ödeme, satın alma onayında Apple ID veya Google hesabınızdan tahsil edilir.</li>
          <li><strong>Otomatik yenileme:</strong> Mevcut dönemin bitiminden en az 24 saat önce iptal edilmediği sürece abonelikler otomatik yenilenir. Dönem bitimine 24 saat kala hesabınızdan yenileme ücreti tahsil edilir.</li>
          <li><strong>Yönetim / iptal:</strong> Satın aldıktan sonra abonelikleri cihaz hesap ayarlarınızdan (App Store veya Google Play) yönetebilir veya iptal edebilirsiniz.</li>
          <li><strong>Kredi paketleri:</strong> Kredi paketleri tek seferlik, tüketilebilir satın almalardır ve yasanın gerektirdiği durumlar haricinde kullanıldıktan sonra iade edilmez.</li>
          <li><strong>Geri yükleme:</strong> Uygun satın almaları Uygulama içinden geri yükleyebilirsiniz.</li>
          <li><strong>Fiyatlandırma:</strong> Fiyatlar ve plan ayrıntıları satın alma öncesi Uygulamada gösterilir ve gelecek dönemler için değişebilir.</li>
        </ul>
        <p class="muted">App Store / Google Play satın almaları için iadeler, kendi politikaları uyarınca Apple veya Google tarafından yönetilir.</p>

        <h2>6. Kullanıcı içeriği</h2>
        <p>Gönderdiğiniz içeriğin (yemek fotoğrafları, notlar, mesajlar) sahipliği size aittir. Bize, yalnızca sizin için Uygulamanın özelliklerini işletmek amacıyla — yemek fotoğraflarını <a href="privacy.html">Gizlilik Politikası</a>'nda açıklandığı şekilde AI sağlayıcımıza analiz için göndermek dahil — bunu işleme ve saklama yönünde sınırlı bir lisans verirsiniz.</p>

        <h2>7. Fikri mülkiyet</h2>
        <p>Uygulama, tasarımı ve içeriği (kullanıcı içeriğiniz hariç) Foi Digitals'in mülkiyetindedir ve geçerli yasalarla korunur. Bu Koşullar size Uygulamayı kullanmak için kişisel, münhasır olmayan, devredilemez ve geri alınabilir bir lisans verir.</p>

        <h2>8. Sorumluluk reddi ve sorumluluğun sınırlandırılması</h2>
        <p>Uygulama, yasaların izin verdiği azami ölçüde hiçbir garanti olmaksızın "olduğu gibi" ve "mevcut olduğu gibi" sağlanır. Beslenme tahminlerinin doğru olduğunu veya Uygulamanın kesintisiz ya da hatasız olacağını garanti etmiyoruz. Yasaların izin verdiği azami ölçüde, Foi Digitals herhangi bir dolaylı, arızi veya sonuç olarak ortaya çıkan zarardan veya Uygulamayı kullanımınızdan doğan herhangi bir sağlık sonucundan sorumlu değildir.</p>

        <h2>9. Fesih</h2>
        <p>Uygulamayı kullanmayı bırakabilir ve hesabınızı istediğiniz zaman Uygulama içinden silebilirsiniz. Bu Koşulları ihlal etmeniz durumunda erişimi askıya alabilir veya sonlandırabiliriz.</p>

        <h2>10. Değişiklikler</h2>
        <p>Bu Koşulları güncelleyebiliriz. Önemli değişiklikler yukarıdaki "Son güncelleme" tarihine yansıtılır. Değişikliklerden sonra kullanmaya devam etmek, güncellenmiş Koşulları kabul ettiğiniz anlamına gelir.</p>

        <h2>11. İletişim</h2>
        <p>Sorular? <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine e-posta gönderin.</p>

        <hr>

        <h2 id="eula">Son Kullanıcı Lisans Sözleşmesi (EULA)</h2>
        <p class="muted">Calorie Reader AI lisanslı uygulamasına uygulanır.</p>
        <p>Bu Son Kullanıcı Lisans Sözleşmesi yukarıdaki Koşulları tamamlar. Uygulama Apple App Store üzerinden dağıtıldığı için, aşağıdaki onaylar (Apple'ın standart Lisanslı Uygulama Son Kullanıcı Lisans Sözleşmesi ile uyumlu olarak) uygulanır:</p>
        <ul>
          <li>Bu EULA yalnızca sizinle Foi Digitals arasındadır, Apple ile değildir. Apple, Uygulamadan veya içeriğinden sorumlu değildir.</li>
          <li>Foi Digitals, App Store Hizmet Şartlarının izin verdiği şekilde, sahip olduğunuz veya kontrol ettiğiniz herhangi bir Apple markalı cihazda Uygulamayı kullanmanız için size devredilemez bir lisans verir.</li>
          <li>Apple'ın Uygulama için bakım veya destek sağlama yükümlülüğü yoktur.</li>
          <li>Uygulamanın geçerli bir garantiye uymaması durumunda Apple'a bildirimde bulunabilirsiniz; Apple satın alma fiyatını (varsa) iade edebilir. Apple'ın Uygulama ile ilgili başka bir garanti yükümlülüğü yoktur.</li>
          <li>Ürün sorumluluğu, yasal/düzenleyici uyumsuzluk ve tüketici koruma talepleri dahil olmak üzere Uygulama ile ilgili tüm taleplerin ele alınmasından Apple değil Foi Digitals sorumludur.</li>
          <li>Uygulamanın fikri mülkiyet haklarını ihlal ettiğine dair herhangi bir üçüncü taraf talebini araştırma ve çözmekten Apple değil Foi Digitals sorumludur.</li>
          <li>ABD Hükümeti ambargosuna tabi bir ülkede bulunmadığınızı ve herhangi bir ABD Hükümeti kısıtlanmış taraflar listesinde olmadığınızı beyan edersiniz.</li>
          <li>Apple ve iştirakleri bu EULA'nın üçüncü taraf yararlanıcılarıdır ve size karşı uygulayabilirler.</li>
        </ul>

        <h3>İletişim</h3>
        <p>Foi Digitals · <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a></p>
      `,
    },

    craSupport: {
      back: "calorie reader ai'a dön",
      eyebrow: "calorie reader ai · destek",
      title: "Destek ve SSS",
      meta: "2–3 iş günü içinde yanıtlıyoruz.",
      body: `
        <h2>Yardım alma</h2>
        <p><strong>foidigitals@gmail.com</strong>'a e-posta gönderin. Lütfen şunları ekleyin:</p>
        <ul>
          <li>iOS sürümünüz (Ayarlar → Genel → Hakkında)</li>
          <li>iPhone modeliniz</li>
          <li>Uygulama sürümü (Uygulamanın Ayarlar ekranının altında)</li>
          <li>ne olduğunun ve ne beklediğinizin açıklaması</li>
          <li>varsa ekran görüntüleri</li>
        </ul>

        <h2>Sıkça sorulan sorular</h2>

        <h3>Calorie Reader AI fotoğraflarımı saklıyor mu?</h3>
        <p>Evet. Yemek fotoğrafları, geçmişinizi görüntüleyebilmeniz için barındırma sağlayıcımızda (Supabase) saklanır. Beslenme analizi için OpenAI'a gönderilir ve öğünü veya hesabınızı sildiğinizde silinir. Ayrıntılar için <a href="privacy.html">Gizlilik Politikası</a>'na bakın.</p>

        <h3>Tahminler ne kadar doğru?</h3>
        <p>Model, yukarıdan net çekilmiş yaygın yiyeceklerde iyi performans gösterir. Olağandışı aydınlatma, kısmen gizli malzemeler veya alışılmadık mutfaklarda doğruluk düşebilir. Tahminleri Uygulama içinde manuel düzenleyebilirsiniz. Uygulama tıbbi veya beslenme tavsiyesinin yerine geçmez.</p>

        <h3>Hangi diller destekleniyor?</h3>
        <p>İngilizce, Türkçe, Almanca, İspanyolca, Fransızca ve İtalyanca. Arayüz dili iPhone'unuzun sistem dilini izler; yemek tanıma seçili dilinizden bağlamsal ipuçları kullanır.</p>

        <h3>Çevrimdışı çalışıyor mu?</h3>
        <p>Yemek analizi, sunucu tarafı görüntü modelinde çalıştığı için ağ bağlantısı gerektirir. Daha önce kaydedilmiş yemekleriniz (cihazınızda yerel olarak saklanır) çevrimdışı erişilebilir.</p>

        <h3>Verilerim cihazlar arası senkronize olacak mı?</h3>
        <p>Henüz değil. iCloud senkronizasyonu yol haritamızda ve yayınlandığında isteğe bağlı olacak.</p>

        <h3>Verilerimi nasıl silerim?</h3>
        <p>Beslenme kayıtları cihazınızda yerel olarak saklanır. Silmek için Uygulama içinden girdileri kaldırın (Ayarlar → Tüm verileri sıfırla) veya Uygulamayı kaldırın.</p>

        <h3>Android sürümü var mı?</h3>
        <p>Lansmanda yok. Android yol haritamızda.</p>

        <h3>Bir hatayı nasıl bildiririm?</h3>
        <p><strong>foidigitals@gmail.com</strong>'a "hata" konusuyla ve yukarıda listelenen ayrıntılarla e-posta gönderin.</p>

        <h3>Özellik talebini nasıl iletirim?</h3>
        <p>Aynı e-posta, konu "özellik talebi". Her mesajı okuyoruz.</p>
      `,
    },

    /* ----- Beauty Studio: Glow Up AI ürünü ----- */
    bs: {
      back: "foi digitals'e dön",
      eyebrow: "ürün · beauty studio",
      pill: "kendi yüzünden yapay zekâ stil raporları",
      titleHtml: "kendi yüzün, <em>doğru okunmuş.</em>",
      desc: "Başkasına yakışan sana yakışmayabilir. Beauty Studio kendi yüzünü okur — yapısını, oranlarını, renk uyumunu — ve bunu gerçekten uygulayabileceğin bir yönlendirmeye çevirir. Senin hatların, senin paletin, senin görünüşün.",
      meta: {
        platform: "Platform", platformVal: "iOS · Android",
        category: "Kategori", categoryVal: "Yaşam Tarzı · Fotoğraf ve Video",
        langs: "Diller", langsVal: "9 (EN · TR · DE · FR · PT · IT · RU · ES · NL)",
        size: "Durum", sizeVal: "App Store ve Play yakında",
      },
      cta: { primary: "mağazalarda görüntüle · yakında", privacy: "gizlilik politikası", terms: "kullanım koşulları", support: "destek & sss" },

      featuresId: "ne yapıyor",
      featuresHeading: "bir trendin değil, <em>senin yüzünün</em> etrafında kuruldu.",
      features: {
        f1: { title: "Kendi yapınla başla.", desc: "Yüz şekli, oranlar ve öne çıkarmaya değer özelliğin. Göz şeklin ve eyeliner'ın yeri. Kaş mimarisi, dudak oranları ve kemik yapına yakışan gözlük çerçeveleri." },
        f2: { title: "Renklerini bul.", desc: "Mevsim paletin, en iyi beş rengin ve onları bir arada tutan nötrler. Altın mı gümüş mü. İş görüşmesi, bir akşam, bir düğün daveti için renkler. Bir kıyafeti yüzüne tut, cevabını al." },
        f3: { title: "Denemeden önce gör.", desc: "Bir kesimi, bir tonu, bir makyajı ya da bir kombini önce kendi fotoğrafında dene — sonra karar ver. Saç boyu ve rengi, doğaldan gösterişliye makyaj, kapsül kombinler, 30 günlük glow-up önizlemesi." },
        f4: { title: "94 analiz, tek kütüphane.", desc: "On kategori boyunca yüz, cilt, renk, saç, makyaj, kıyafet, stil kimliği ve glow-up planlaması. Her sonuç, alışveriş yaparken yeniden açabileceğin, zaman içinde karşılaştırabileceğin ya da kart olarak dışa aktarabileceğin bir rapor olarak kaydedilir." },
        f5: { title: "Dokuz dil.", desc: "İngilizce, Türkçe, Almanca, Fransızca, Portekizce, İtalyanca, Rusça, İspanyolca ve Felemenkçe — hem arayüz hem yazılı raporlar, cihazının dilini izleyerek." },
        f6: { title: "Fotoğrafların senin kalır.", desc: "Fotoğraflar hesabına özel olarak saklanır, başka kullanıcılara asla gösterilmez ve asla satılmaz. Bir fotoğrafı, tüm raporlarını ya da hesabının tamamını uygulama içinden silebilirsin." },
      },
      disclaimer: "Beauty Studio bir stil aracıdır — tıbbi, dermatolojik ya da estetik işlem tavsiyesi değildir. Analiz yapay zekâ tarafından üretilir ve yanılabilir. Bir hüküm değil, bilgili bir ikinci görüş olarak değerlendir. Uygulama çekicilik puanı vermez ve seni asla başkasıyla kıyaslamaz.",

      pagesId: "yasal ve destek",
      pagesHeading: "bu ürün için her şey.",
    },

    bsPrivacy: {
      back: "beauty studio'ya dön",
      eyebrow: "beauty studio · gizlilik",
      title: "Gizlilik Politikası",
      meta: "Son güncelleme · 20.08.2026 · v1.0",
      body: `
        <p>Bu Gizlilik Politikası, <strong>Beauty Studio: Glow Up AI</strong>'ın ("Uygulama", "Beauty Studio", "biz") bilgilerinizi nasıl topladığını, kullandığını, paylaştığını ve koruduğunu açıklar. Uygulama, <strong>Foi Digitals</strong> (İstanbul, Türkiye — "veri sorumlusu") tarafından işletilir. Uygulamanın hem iOS hem Android sürümü için geçerlidir. Uygulamayı kullanarak burada açıklanan uygulamaları kabul etmiş olursunuz.</p>
        <p class="muted">Okunmak için yazıldı, atlatılmak için değil. Bir yer belirsiz kalırsa bize yazın, sade bir dille açıklayalım.</p>

        <h2>1. Biz kimiz ve nasıl ulaşılır</h2>
        <p>Veri sorumlusu: <strong>Foi Digitals</strong> — İstanbul, Türkiye.<br>Gizlilik talepleri, sorular ve silme istekleri: <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a></p>

        <h2>2. Beauty Studio'yu adınızı ya da e-postanızı vermeden kullanabilirsiniz</h2>
        <p>Uygulamanın varsayılan giriş yolu <strong>anonim hesap</strong>tır. "Misafir olarak devam et" dediğinizde yalnızca rastgele bir kimlikle (UUID) tanımlanan bir hesap oluşturulur. Bu modda sizin hakkınızda <strong>hiçbir e-posta adresi, isim ya da iletişim bilgisi tutmayız</strong> — yalnızca o rastgele kimlik ve sonrasında Uygulama içinde ürettikleriniz.</p>
        <p>İsterseniz <strong>e-posta ve parola</strong> ile, <strong>Google</strong> ile ya da <strong>Apple ile Giriş Yap</strong> ile oturum açabilirsiniz. Bu, cihaz değiştirdiğinizde raporlarınızı korumanızı sağlar. Apple'ın <em>E-postamı Gizle</em> seçeneğini kullanırsanız yalnızca özel aktarma adresini alırız, gerçek adresinizi değil. Apple ilk girişte bize tam adınızı iletebilir; bu bilgiyi <strong>saklamıyoruz</strong>.</p>
        <blockquote>Anonim hesaplar, kendilerini oluşturan cihazda yaşar. Uygulamayı silerseniz ya da cihazı kaybederseniz anonim bir hesabı ve raporlarını sizin için geri getiremeyiz — sizi tanımlamanın hiçbir yolu yoktur. Raporlarınızın cihaz değişikliğinden sağ çıkmasını istiyorsanız bir e-posta ya da sosyal giriş ekleyin.</blockquote>

        <h2>3. Topladığımız veriler</h2>
        <p>Yalnızca Uygulamanın özelliklerinin ihtiyaç duyduğu kadarını topluyoruz. Verilerinizi <strong>satmıyoruz</strong>. 6. bölüm, verinin reklam ölçümü için bizden çıktığı tek yeri ve bunu nasıl kapatacağınızı anlatır.</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr><th>Kategori</th><th>Nedir</th><th>Neden</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Hesap</td>
                <td>Rastgele üretilmiş bir hesap kimliği (UUID). Oturum açmayı seçerseniz: e-posta adresiniz, hangi sağlayıcıyı kullandığınız (Apple / Google / e-posta) ve hesabın oluşturulma tarihi.</td>
                <td>Hesabınızı oluşturmak, güvenceye almak ve başka bir cihazda geri girebilmenizi sağlamak.</td>
              </tr>
              <tr>
                <td>Fotoğraflar</td>
                <td>Analiz için çektiğiniz ya da seçtiğiniz selfie veya portre.</td>
                <td>İstediğiniz analizi üretmek ve ondan görsel denemeler oluşturmak. Bkz. 4. bölüm.</td>
              </tr>
              <tr>
                <td>Analiz raporları</td>
                <td>Yapay zekânın döndürdüğü yazılı rapor — yüz şekli ve yapı notları, mevsimsel renk paleti ve hex değerleri, saç, makyaj ve kombin önerileri, stil arketipi, glow-up önerileri — ayrıca analiz türü, tarih, üretilen önizleme görsellerinin bağlantıları ve eklediğiniz notlar.</td>
                <td>Sonuçlarınızı yeniden açabilmeniz, karşılaştırabilmeniz ve dışa aktarabilmeniz için saklamak.</td>
              </tr>
              <tr>
                <td>Profil ve tercihler</td>
                <td>Tanıtım akışını tamamlayıp tamamlamadığınız, kayıtlı hedefleriniz, premium durumunuz ve kaç analiz çalıştırdığınız.</td>
                <td>Uygulamayı ve haklarınızı işletmek.</td>
              </tr>
              <tr>
                <td>Krediler ve satın almalar</td>
                <td>Kredi bakiyeniz ve kredi işlem geçmişiniz, abonelik durumunuz, satın alınan ürün kimliği ve başlangıç/bitiş tarihleri. Ödemenin kendisi Apple ya da Google tarafından yürütülür — <strong>kart bilgilerinizi asla görmeyiz</strong>.</td>
                <td>Ücretli özellikleri açmak, yapay zekâ kullanımını ölçmek, satın alımları geri yüklemek.</td>
              </tr>
              <tr>
                <td>Reklam tanımlayıcıları</td>
                <td>iOS'ta IDFA — <strong>yalnızca sorulduğunda izin verirseniz</strong>. Android'de Google Reklam Kimliği. Ayrıca Meta'ya gönderilen uygulama kurulum / oturum / satın alma olayları.</td>
                <td>Hangi reklamların insanları Uygulamaya getirdiğini ölçmek. Reddetme yolu dahil, bkz. 6. bölüm.</td>
              </tr>
              <tr>
                <td>Yalnızca cihazdaki veriler</td>
                <td>Görünen ad, avatar rengi, favoriler, rapor tonu, dil, bildirim ayarları, tanıtım yanıtları (saç tipi, hedef, metal tercihi), Lookbook'unuz ve önbelleğe alınmış önizlemeler.</td>
                <td><strong>Yalnızca cihazınızda</strong> tutulur — bize hiç yüklenmez. Bkz. 9. bölüm.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="muted">Konum (kesin ya da yaklaşık), kişiler, takvim, mikrofon ya da ses, video, gezinme veya arama geçmişi, sağlık ve fitness verisi, biyometrik şablon ya da finansal hesap bilgisi <strong>toplamıyoruz</strong>. Beauty Studio'da <strong>uygulama içi reklam yok</strong>, üçüncü taraf analitik SDK'sı yok, çökme raporlama SDK'sı yok.</p>

        <h2>4. Fotoğrafınıza tam olarak ne oluyor</h2>
        <p>Çoğu kişinin asıl merak ettiği kısım bu; adım adım anlatalım.</p>
        <ul>
          <li><strong>Siz seçersiniz.</strong> Kamerayla çekersiniz ya da galerinizden seçersiniz. Uygulama fotoğraf kitaplığınıza arka planda hiç erişmez.</li>
          <li><strong>Cihazınızda küçültülür.</strong> Telefonunuzdan hiçbir şey çıkmadan önce görsel, uzun kenarı en fazla 1.600 piksel (boy fotoğraflarında 1.920) olacak şekilde yeniden boyutlandırılır ve JPEG olarak yeniden kodlanır. Tamamen yeniden kodlandığı için orijinal dosyanın gömülü meta verisi — kameranızın yazmış olabileceği GPS koordinatları dahil — aktarılmaz.</li>
          <li><strong>Özel depolamaya yüklenir.</strong> Fotoğraf, depolama sağlayıcımızda (Supabase) <strong>özel</strong> bir alana, hesap kimliğinize ait bir yol altına gider. Erişim kuralları o yol altındaki dosyaları yalnızca kendi oturum açmış hesabınızın okumasına, eklemesine ve silmesine izin verir. Yayımlanmaz, dizine eklenmez ve başka kullanıcılara görünmez.</li>
          <li><strong>Analiz için gönderilir.</strong> Sunucumuz fotoğrafı alır ve görüntü modellerini çalıştıran yapay zekâ altyapı sağlayıcısı <strong>fal.ai</strong>'a stil talimatlarıyla birlikte iletir. fal.ai'a hesap kimliğinizi, e-postanızı ya da adınızı <strong>göndermiyoruz</strong> — istek görselden ve komuttan ibarettir.</li>
          <li><strong>Üretilen görseller.</strong> Görsel denemelerde (saç, renk, makyaj, kombin, glow-up, tırnak) aynı fotoğraf sizin yeni görsellerinizi üretmek için kullanılır. Bunlar fal.ai tarafından üretilir ve fal.ai altyapısında barındırılan görsel bağlantıları olarak döner; Uygulama tekrar gösterebilsin diye bu bağlantılar raporunuza kaydedilir. Raporu silmek, bizdeki referansı kaldırır.</li>
          <li><strong>Siz kaldırana kadar kalır.</strong> Otomatik bir süre sonu yoktur. Fotoğrafınız; siz silene, raporu silene ya da hesabınızı silene kadar özel depolamanızda durur (12. bölüm).</li>
        </ul>
        <p>Yalnızca <strong>kendinize</strong> ait ya da bunu kabul etmiş bir kişinin fotoğrafını yükleyin. Lütfen çocuk fotoğrafı yüklemeyin.</p>

        <h2>5. Yapay zekâ işleme</h2>
        <p>Tüm yapay zekâ işleme, modelleri barındıran ve yönlendiren <strong>fal.ai</strong> (Features and Labels, Inc.) üzerinden çalışır. Orada iki şey olur:</p>
        <ul>
          <li><strong>Fotoğrafın okunması.</strong> Bir görüntü modeli yazılı raporu üretir. Şu anda kullanılan modeller sırasıyla <em>Google Gemini 2.5 Flash</em>, <em>Gemini 2.5 Flash Lite</em> ve yedek olarak <em>Qwen3-VL</em>'dir. Kaliteyi korumak için bu listeyi değiştirebiliriz; işleme yolu (fal.ai üzerinden) aynı kalır.</li>
          <li><strong>Görsel üretimi.</strong> Bir görsel modeli, sağlayıcının güvenlik filtresi açıkken fotoğrafınızdan deneme önizlemeleri oluşturur.</li>
        </ul>
        <p>Fotoğraflarınızı, raporlarınızı ya da başka içeriğinizi yapay zekâ modeli eğitmek için kullanmıyoruz ve sağlayıcılarımızın da gönderdiğimiz veriyle model eğitmesine izin vermiyoruz.</p>
        <p><strong>Çıktı bir tahmindir.</strong> Yapay zekâ ile üretilen analiz ve görseller yanlış, gurur okşamayan ya da tuhaf olabilir. Uygulama bilinçli olarak çekicilik puanı vermez, güzellik derecelendirmez, kilo ya da cilt rahatsızlıkları hakkında yorum yapmaz; modellere yaş, etnik köken, milliyet veya din çıkarımı yapmamaları ve bunlardan söz etmemeleri talimatı verilmiştir. Her sonucu hakkınızda bir gerçek değil, bir öneri olarak değerlendirin.</p>

        <h2>6. Reklam ölçümü, Meta ve App Tracking Transparency</h2>
        <p>Bu konuda açık olmak istiyoruz, çünkü Beauty Studio'nun Apple'ın tanımıyla "izleme" içeren tek kısmı burası.</p>
        <p>Uygulamada <strong>Meta (Facebook) SDK</strong> bulunuyor; böylece hangi reklamın gerçekten insan getirdiğini görebiliyor ve getirmeyen reklamlara para ödemeyi bırakabiliyoruz. Bu yolla Meta standart uygulama olaylarını alır — <em>kurulum</em>, <em>oturum</em> ve <em>satın alma</em> (tutar, para birimi ve ürün kimliği) — ve izin verildiği ölçüde cihazınızın reklam tanımlayıcısını.</p>
        <ul>
          <li><strong>iOS'ta</strong> SDK, reklam izleme <strong>kapalı</strong> başlar. Uygulama, App Tracking Transparency iznini yalnızca ilk raporunuz ekrana geldikten <em>sonra</em> ister — açılışta değil. <strong>"Uygulamanın İzlememesini İste"</strong> derseniz IDFA'nız kullanılmaz ve izleme bayrağı kapalı kalır. Fikrinizi istediğiniz zaman <em>Ayarlar → Gizlilik ve Güvenlik → İzleme</em>'den değiştirebilirsiniz.</li>
          <li><strong>Android'de</strong> bunu <em>Ayarlar → Google → Reklamlar</em> bölümünden reklam kimliğini silerek ya da devre dışı bırakarak sınırlayabilirsiniz.</li>
          <li><strong>Reddetmenin size hiçbir maliyeti yok.</strong> Hiçbir özellik, rapor, kredi ya da satın alma buna bağlı değildir.</li>
        </ul>
        <p>Bu veri reklam ölçümü ve atıf için kullanılır. Raporlarınızı kişiselleştirmek için kullanmıyoruz ve yapay zekâ analizinde hiçbir rolü yok.</p>

        <h2>7. Satın almalar ve abonelikler</h2>
        <p>Abonelikler ve kredi paketleri <strong>App Store</strong> ve <strong>Google Play</strong> üzerinden satılır ve bizim adımıza <strong>RevenueCat</strong> tarafından yönetilir. RevenueCat, hesap kimliğinizi (aynı rastgele UUID) ve satın alma / hak durumunuzu alır. <strong>RevenueCat'e e-posta adresinizi ya da adınızı göndermiyoruz</strong>; ne biz ne de RevenueCat ödeme kartınızı görür — ödemeyi tamamen Apple ve Google yürütür.</p>

        <h2>8. Bildirimler</h2>
        <p>Beauty Studio'daki tüm bildirimler <strong>cihazınızda yerel olarak planlanır</strong>. Uygulama bir push token üretmez ya da saklamaz; bir push sunucusu işletmiyoruz — yani size uzaktan mesaj gönderemeyiz ve hiçbir yerde size ait bir bildirim tanımlayıcısı tutulmuyor. Bildirim tercihleriniz telefonunuzdan hiç çıkmaz. Bildirimleri Uygulamadan ya da cihaz ayarlarınızdan kapatabilirsiniz.</p>

        <h2>9. Yalnızca cihazınızda kalan veriler</h2>
        <p>Bazı şeyler bize hiç ulaşmaz. Oturum bilginiz cihazın güvenli anahtar deposunda (iOS Keychain / Android Keystore) tutulur. Görünen adınız, avatar renginiz, favori renkleriniz ve önizlemeleriniz, rapor tonunuz, diliniz, bildirim ayarlarınız, üç tanıtım yanıtınız (saç tipi, hedef, metal tercihi), kaydettiğiniz Lookbook görselleri, önbelleğe alınmış raporlar ve önizlemeler Uygulamanın yerel depolamasında ve dosyalarında saklanır. Uygulamayı kaldırmak bunları siler.</p>

        <h2>10. Hizmet sağlayıcılar (alt işleyenler)</h2>
        <p>Verileri yalnızca Uygulamayı çalıştıran sağlayıcılarla, kendi koşulları kapsamında paylaşıyoruz:</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Sağlayıcı</th><th>Amaç</th><th>İlgili veri</th></tr></thead>
            <tbody>
              <tr><td>Supabase</td><td>Kimlik doğrulama, veritabanı, özel fotoğraf depolama, sunucu fonksiyonları</td><td>Hesap kimliği, e-posta (oturum açtıysanız), fotoğraflar, raporlar, krediler, abonelik durumu</td></tr>
              <tr><td>fal.ai</td><td>Görüntü ve görsel üretim modellerini çalıştırır</td><td>Fotoğrafınız ve analiz komutu — hesap kimliği, e-posta ya da isim yok</td></tr>
              <tr><td>RevenueCat</td><td>Abonelik ve satın alma yönetimi</td><td>Hesap kimliği, satın alma ve hak durumu</td></tr>
              <tr><td>Apple / Google</td><td>Giriş, uygulama dağıtımı, ödeme işleme</td><td>E-posta (girişlerini kullanırsanız), satın alma kayıtları</td></tr>
              <tr><td>Meta Platforms</td><td>Reklam ölçümü ve atıf</td><td>Kurulum / oturum / satın alma olayları; izin verildiğinde reklam tanımlayıcısı (6. bölüm)</td></tr>
            </tbody>
          </table>
        </div>

        <h2>11. Yurt dışına aktarım</h2>
        <p>Foi Digitals Türkiye merkezlidir ve sağlayıcılarımız Amerika Birleşik Devletleri ile Avrupa Birliği'nde altyapı işletir. Bu nedenle Uygulamayı kullanmak, verilerinizin ülkenizin dışına — ABD dahil — aktarılmasını içerir. GDPR ya da UK GDPR'ın uygulandığı hallerde bu aktarımlar Avrupa Komisyonu'nun Standart Sözleşme Hükümlerine ya da sağlayıcının sunduğu eşdeğer bir güvenceye dayanır. KVKK'nın uygulandığı hallerde aktarım, açık rızanıza ya da 9. maddedeki ilgili hukuki sebebe dayanır.</p>

        <h2>12. Haklarınız ve Uygulama içindeki dört araç</h2>
        <p>Uygulamada <strong>Profil → Veri Yönetimi</strong>'ni açın. Bunların hiçbiri için bize e-posta atmanız gerekmez:</p>
        <ul>
          <li><strong>Verilerimi dışa aktar</strong> — hesap bilgilerinizi ve tüm raporlarınızı içeren bir JSON dosyası oluşturur ve paylaşım sayfasına verir; kaydedebilir ya da gönderebilirsiniz. Hiçbir şey yüklenmez.</li>
          <li><strong>Yüklenen fotoğrafları sil</strong> — yüklediğiniz her fotoğrafı depolamamızdan kaldırır. Herhangi bir dosya kaldırılamazsa Uygulama başarı iddia etmek yerine size bunu söyler.</li>
          <li><strong>Tüm analiz verilerini sil</strong> — kayıtlı her raporu veritabanımızdan siler ve yerel önbelleği temizler.</li>
          <li><strong>Hesabı sil</strong> — yüklediğiniz her fotoğrafı, ardından hesabın kendisini siler. Profiliniz, raporlarınız, kredi cüzdanınız, kredi geçmişiniz ve abonelik kaydınız da onunla gider. Geri alınamaz.</li>
        </ul>
        <blockquote><strong>Hesabınızı silmek aboneliğinizi iptal etmez.</strong> Abonelikler Apple ya da Google tarafından faturalandırılır ve ayrıca <em>Ayarlar → Apple Hesabı → Abonelikler</em> veya <em>Google Play → Abonelikler</em> üzerinden iptal edilmelidir; aksi hâlde faturalandırma devam eder.</blockquote>
        <p>GDPR / UK GDPR, Türkiye'de KVKK ve benzer mevzuat kapsamında ayrıca verilerinize <strong>erişme</strong>, <strong>düzeltme</strong>, <strong>silme</strong>, <strong>işlemeyi kısıtlama</strong> ve <strong>taşıma</strong> haklarına; meşru menfaate dayanan işlemeye <strong>itiraz</strong> etme ve <strong>açık rızanızı geri çekme</strong> hakkına sahipsiniz. <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yazın, 30 gün içinde yanıtlayalım. Ayrıca yerel veri koruma otoritesine şikâyette bulunabilirsiniz — Türkiye'de Kişisel Verileri Koruma Kurumu (KVKK).</p>
        <p class="muted">Dürüst bir sınırlama: anonim hesap kullanıyor ve bize e-postayla ulaşıyorsanız, hangi hesabın sizin olduğunu tespit edemeyebilir, dolayısıyla talebinizi yerine getiremeyebiliriz. Bunun yerine uygulama içi araçları kullanın — onlar sizin adınıza kimlik doğrulanmış çalışır.</p>

        <h2>13. Hukuki sebepler (AEA / BK)</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Amaç</th><th>Hukuki sebep</th></tr></thead>
            <tbody>
              <tr><td>Hesabınızı oluşturmak, analizleri çalıştırmak, raporlarınızı saklamak, satın alımları yürütmek</td><td>Sözleşmenin ifası (m. 6(1)(b))</td></tr>
              <tr><td>Kamera ve fotoğraf kitaplığı erişimi, bildirimler, reklam ölçümü / ATT</td><td>Açık rıza (m. 6(1)(a)) — cihaz ayarlarından istediğiniz zaman geri çekilebilir</td></tr>
              <tr><td>Hizmeti güvende tutmak, kötüye kullanımı önlemek, yapay zekâ maliyetini ölçmek</td><td>Meşru menfaat (m. 6(1)(f))</td></tr>
              <tr><td>Satın alma ve vergi kayıtlarını tutmak</td><td>Hukuki yükümlülük (m. 6(1)(c))</td></tr>
            </tbody>
          </table>
        </div>
        <p>Özelliklerinizi tarif etmek için işlenen bir yüz fotoğrafına özenle yaklaşıyoruz. Bunu biyometrik kimlik tespiti için kullanmıyoruz, ondan bir yüz şablonu çıkarmıyoruz ve sizi görseller ya da oturumlar arasında tanımak için kullanmıyoruz.</p>

        <h2>14. Saklama süresi</h2>
        <p>Hesabınızı, fotoğraflarınızı ve raporlarınızı <strong>hesabınız var olduğu sürece</strong> saklarız — otomatik bir süre sonu yoktur, çünkü raporlarınızın ne zaman işe yaramaz hâle geldiğine sizin karar vermenizi tercih ediyoruz. Bir fotoğrafı, bir raporu ya da hesabınızı sildiğinizde veri aktif sistemlerimizden kaldırılır. Satın alma ve işlem kayıtları, vergi ya da muhasebe mevzuatının gerektirdiği ölçüde saklanabilir. Yedekler olağan döngüsü içinde tasfiye olur.</p>

        <h2>15. Güvenlik</h2>
        <p>Tüm trafik HTTPS ile aktarım sırasında şifrelenir. Fotoğraflar, yalnızca kendi hesabınıza izin veren satır düzeyi erişim kurallarına sahip özel bir depolama alanında durur. Oturum bilginiz cihazın donanım destekli güvenli deposunda saklanır. Sunucu tarafındaki fonksiyonlar işlem yapmadan önce imzalı belirtecinizi doğrular ve kimliğinizi istemcinin iddiasından değil, o belirteçten türetir. Hiçbir sistem kusursuz güvenli değildir, ama burada kestirmeye sapmıyoruz.</p>

        <h2>16. Çocuklar</h2>
        <p>Beauty Studio <strong>13 yaşından küçükler için tasarlanmamıştır</strong> (ya da ülkenizdeki daha yüksek asgari yaş — AEA'nın bazı bölgelerinde 16). Çocuklardan bilerek veri toplamıyoruz. Lütfen çocuk fotoğrafı yüklemeyin. Bir çocuğun Uygulamayı kullandığını ya da bir çocuğun fotoğrafının yüklendiğini düşünüyorsanız bize yazın; hesabı ve içeriğini silelim.</p>

        <h2>17. Kaliforniya sakinleri (CCPA / CPRA)</h2>
        <p>Kişisel bilgileri para karşılığı <strong>satmıyoruz</strong>. Ancak reklam ölçümü için uygulama olaylarının ve reklam tanımlayıcılarının Meta ile paylaşılması, CPRA kapsamında "bağlamlar arası davranışsal reklamcılık için paylaşım" sayılabilir. iOS'ta App Tracking Transparency'yi reddederek ya da Android'de reklam kimliğinden çıkarak istediğiniz zaman vazgeçebilirsiniz (6. bölüm); bize ulaşan Global Privacy Control sinyallerine uyarız. Bilme, silme, düzeltme ve bu hakları kullandığınız için ayrımcılığa uğramama haklarına sahipsiniz.</p>

        <h2>18. Mağaza gizlilik etiketleri</h2>
        <p>Şeffaflık için, Apple ve Google'a beyan ettiğimiz tablo:</p>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Veri türü</th><th>Toplanıyor</th><th>Size bağlı</th><th>İzleme için kullanılıyor</th></tr></thead>
            <tbody>
              <tr><td>E-posta adresi</td><td>Yalnızca oturum açarsanız</td><td>Evet</td><td>Hayır</td></tr>
              <tr><td>Fotoğraflar</td><td>Evet</td><td>Evet</td><td>Hayır</td></tr>
              <tr><td>Diğer kullanıcı içeriği (raporlar, notlar, hedefler)</td><td>Evet</td><td>Evet</td><td>Hayır</td></tr>
              <tr><td>Satın alma geçmişi</td><td>Evet</td><td>Evet</td><td><strong>Evet</strong></td></tr>
              <tr><td>Cihaz kimliği (reklam tanımlayıcısı)</td><td>İzninizle</td><td>Evet</td><td><strong>Evet</strong></td></tr>
              <tr><td>Ürün etkileşimi</td><td>Evet</td><td>Evet</td><td><strong>Evet</strong></td></tr>
              <tr><td>Konum, kişiler, sağlık, gezinme geçmişi, tanılama</td><td>Hayır</td><td>—</td><td>—</td></tr>
            </tbody>
          </table>
        </div>

        <h2>19. Asla yapmadıklarımız</h2>
        <ul>
          <li>Kişisel verilerinizi asla satmayız.</li>
          <li>Fotoğraflarınızı ya da raporlarınızı başka kullanıcılara asla göstermeyiz — Beauty Studio'da sosyal akış ve herkese açık profil yoktur.</li>
          <li>Fotoğraflarınızı ya da raporlarınızı yapay zekâ modeli eğitmek için asla kullanmayız.</li>
          <li>Reklam verisini raporunuzun içeriğini şekillendirmek için asla kullanmayız.</li>
          <li>Uygulamayı kullanmanız için sizden asla e-posta adresi istemeyiz.</li>
        </ul>

        <h2>20. Değişiklikler</h2>
        <p>Uygulama değiştikçe bu Politikayı güncelleyebiliriz. Önemli değişiklikler yukarıdaki "Son güncelleme" tarihine yansıtılır ve değişiklik ciddiyse Uygulama içinde de duyurulur. Güncellemeden sonra kullanmaya devam etmeniz, yeni Politikayı kabul ettiğiniz anlamına gelir.</p>

        <h2>21. İletişim</h2>
        <p>Sorular, talepler ya da bir gizlilik endişesi: <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>. 2–3 iş günü içinde, resmi bir veri hakkı talebinde ise her hâlükârda 30 gün içinde yanıtlıyoruz.</p>
      `,
    },

    bsTerms: {
      back: "beauty studio'ya dön",
      eyebrow: "beauty studio · koşullar",
      title: "Kullanım Koşulları",
      meta: "Son güncelleme · 20.08.2026 · v1.0",
      body: `
        <p>Bu Kullanım Koşulları ("Koşullar"), <strong>Foi Digitals</strong> (İstanbul, Türkiye — "biz") tarafından işletilen <strong>Beauty Studio: Glow Up AI</strong> mobil uygulamasının ("Uygulama") kullanımını düzenler. Uygulamayı indirerek ya da kullanarak bu Koşulları ve <a href="privacy.html">Gizlilik Politikamızı</a> kabul etmiş olursunuz. Kabul etmiyorsanız Uygulamayı kullanmayın.</p>

        <h2>1. Uygulama nedir</h2>
        <p>Beauty Studio, sağladığınız bir fotoğrafı analiz eder ve stil yönlendirmesi döndürür: yüz yapısı ve oranları, mevsimsel renk paletleri, saç, makyaj ve kombin önerileri, bir stil arketipi ve glow-up önerileri. Birçok analizde ayrıca kendi fotoğrafınızdan önizleme görselleri üretir; böylece bir değişikliği uygulamadan önce görebilirsiniz. Katalog şu anda <strong>on kategoride 94 analiz</strong> içerir.</p>

        <h2>2. Uygulama ne değildir</h2>
        <p>Beauty Studio bir <strong>stil ve kendini ifade aracıdır</strong>. Tıbbi, dermatolojik, psikolojik, beslenmeye ilişkin ya da estetik işlem tavsiyesi <strong>değildir</strong> ve bir tanı cihazı değildir. Uygulamadaki hiçbir şey cilt, saç ya da vücutla ilgili bir durumu tespit etmek, teşhis etmek veya tedavi etmek için kullanılmamalıdır. Bir sağlık endişeniz varsa nitelikli bir uzmana danışın.</p>
        <p>Uygulama çekicilik puanı vermez, güzellik derecelendirmez ve sizi başkalarıyla sıralamaz; öyle tasarlanmamıştır. Bir sonuç size böyle geliyorsa bunu bir kusur olarak kabul edin ve bize bildirin.</p>

        <h2>3. Yapay zekâ ile üretilen içerik — bu maddeyi okuyun</h2>
        <ul>
          <li>Her rapor ve her önizleme görseli <strong>yapay zekâ tarafından üretilir</strong>; yanlış, tutarsız, gurur okşamayan ya da düpedüz hatalı olabilir.</li>
          <li>Önizleme görselleri <strong>sentetik illüstrasyonlardır</strong>; fotoğraf değildir, öngörü de değildir. Yüzünüzde canlandırılan bir kesim, renk ya da kombin bir yaklaşıklıktır; gerçek bir kuaför ya da gerçek bir kıyafet bazen hayli farklı sonuç verir.</li>
          <li><strong>Geri dönüşü olmayan bir kararı yalnızca bir önizlemeye dayandırmayın</strong> — bir kesim, bir boya, kalıcı bir işlem ya da pahalı bir alışveriş. Raporu bir uzmana götürün ve kendi muhakemenizi kullanın.</li>
          <li>Aynı fotoğrafta aynı analizi iki kez çalıştırmak farklı sonuçlar verebilir. Bu, bu modellerin doğasında vardır; bir arıza değildir.</li>
        </ul>

        <h2>4. Uygunluk ve hesaplar</h2>
        <p>Uygulamayı kullanmak için en az <strong>13 yaşında</strong> olmalısınız — ülkeniz daha yükseğini gerektiriyorsa o yaşta (AEA'nın bazı bölgelerinde 16). Yaşadığınız yerde reşit değilseniz Uygulamayı yalnızca ebeveyn ya da vasinizin bilgisi dahilinde kullanabilirsiniz ve satın alma yalnızca onlar tarafından yapılabilir.</p>
        <p>Uygulamayı anonim misafir hesabıyla kullanabilir ya da e-posta, Google veya Apple ile oturum açabilirsiniz. Hesabınız altındaki etkinlikten ve giriş bilgilerinizin güvenliğinden siz sorumlusunuz. Cihazınızı kaybederseniz anonim bir hesabı sizin için geri getiremeyeceğimizi unutmayın — onun size ait olduğunu tespit etmenin bir yolu yoktur.</p>

        <h2>5. Fotoğraflarınız ve içeriğiniz</h2>
        <p>Gönderdiğiniz her şeyin mülkiyeti sizde kalır. Bize, içeriğinizi <strong>yalnızca Uygulamanın özelliklerini sizin için çalıştırmak amacıyla</strong> barındırmamız, işlememiz ve göstermemiz için sınırlı, münhasır olmayan, dünya çapında ve telifsiz bir lisans verirsiniz — buna, <a href="privacy.html">Gizlilik Politikasında</a> açıklandığı gibi fotoğrafınızın analiz ve görsel üretimi için yapay zekâ sağlayıcımıza gönderilmesi dahildir. Bu lisans, içeriği ya da hesabınızı sildiğinizde sona erer. İçeriğinizi yapay zekâ modeli eğitmek için kullanmıyoruz ve pazarlamada kullanmıyoruz.</p>
        <p>Şunları taahhüt edersiniz:</p>
        <ul>
          <li>fotoğraf <strong>size</strong> aittir ya da yüklenmesine ve ondan yapay zekâ görselleri üretilmesine izin vermiş bir yetişkine aittir;</li>
          <li><strong>çocuk fotoğrafı yüklemeyeceksiniz</strong>;</li>
          <li>görsel üzerindeki haklara sahipsiniz ve yüklenmesi kimsenin hakkını ihlal etmiyor;</li>
          <li>çıplaklık, cinsel içerik, şiddet ya da nefret içeren görseller veya hukuka aykırı hiçbir şey yüklemeyeceksiniz.</li>
        </ul>

        <h2>6. Üretilen görsellerle ne yapabilirsiniz</h2>
        <p>Fotoğrafınızdan üretilen önizleme görselleri sizindir; kişisel, ticari olmayan kullanım için saklayabilir ve paylaşabilirsiniz. Yapay zekâ ile üretilmiş tasvirler oldukları için <strong>bunları gerçek fotoğraf gibi sunmayın</strong> — özellikle gerçek bir sonucun kanıtı olarak, reklamda, gerçek olduğu izlenimi veren bir flört ya da profesyonel profilde veya birini görünüşünüz konusunda yanıltacak biçimde kullanmayın. Uygulamayı, tanınabilir başka bir kişinin görselini üretmek için kullanmayın.</p>

        <h2>7. Kabul edilebilir kullanım</h2>
        <ul>
          <li>Uygulamayı, sunucularını ya da yapay zekâ sağlayıcılarını tersine mühendislikle çözmeye, kaynak koda dönüştürmeye, veri kazımaya veya işleyişini bozmaya çalışmayın.</li>
          <li>Kredi ölçümünü, hak kontrollerini ya da ödeme duvarlarını aşmaya veya ücretli özellikleri ödemeden elde etmeye çalışmayın.</li>
          <li>Toplu analiz göndermek için otomatik sistemler kullanmayın.</li>
          <li>Uygulamayı taciz etmek, başkasının kimliğine bürünmek ya da rızası olmadan biri hakkında materyal üretmek için kullanmayın.</li>
          <li>Yapay zekâyı zararlı, hukuka aykırı ya da cinsel çıktı üretmeye yönlendirmeye çalışmayın.</li>
        </ul>

        <h2 id="subscriptions">8. Abonelikler, krediler ve ödemeler</h2>
        <p>Beauty Studio'yu indirmek ücretsizdir. Ücretli planlar ve kredi paketleri, analiz kataloğunu ve onu çalıştıran yapay zekâ işlemesini açar.</p>
        <h3>Planlar</h3>
        <ul>
          <li><strong>Haftalık</strong> — haftalık kredi hakkıyla, yazılı analizlere premium erişim. Görsel denemeler bu plana dahil değildir.</li>
          <li><strong>Aylık</strong> — aylık kredi hakkıyla, görsel denemeler dahil tam erişim.</li>
          <li><strong>Yıllık</strong> — yıllık faturalandırılan, görsel denemeler dahil tam erişim; kredi hakkı her ay yenilenir.</li>
        </ul>
        <p>Her planın tam fiyatı, süresi ve kredi hakkı, siz onaylamadan önce Uygulamada yerel para biriminizle gösterilir.</p>
        <h3>Krediler</h3>
        <ul>
          <li>Krediler yapay zekâ kullanımını ölçer. Yazılı analizler az sayıda kredi tüketir; kendi yüzünüzde görsel üretmek belirgin biçimde daha fazlasını tüketir, çünkü bize gerçekten daha pahalıya mal olur. Uygulamada hiçbir şey sınırsız değildir ve bunu aksini vaat etmeye tercih ediyoruz.</li>
          <li>Yeni hesaplarda ücretsiz kredi <strong>bulunmaz</strong>.</li>
          <li><strong>Kredi paketleri</strong> tek seferlik, tüketilebilir satın alımlardır. Kredi ekler ancak tek başlarına premium erişimi açmaz.</li>
          <li>Kredilerin nakit değeri yoktur, paraya çevrilemez, hesaplar arasında aktarılamaz ve hesabınız silindiğinde sona erer.</li>
          <li>Bir planın dönemsel hak tanıdığı hâllerde, kullanılmayan hak kredileri Uygulama aksini belirtmedikçe sonraki döneme devretmez.</li>
        </ul>
        <h3>Faturalandırma</h3>
        <ul>
          <li><strong>Ödeme</strong>, satın alma onayında Apple Hesabınızdan ya da Google Play hesabınızdan tahsil edilir.</li>
          <li><strong>Otomatik yenileme:</strong> abonelikler, mevcut dönemin bitiminden en az <strong>24 saat önce</strong> iptal edilmedikçe otomatik yenilenir. Yenileme ücreti, dönem bitmeden önceki 24 saat içinde tahsil edilir.</li>
          <li><strong>Yönetim ve iptal</strong> istediğiniz zaman <em>Ayarlar → Apple Hesabı → Abonelikler</em> (iOS) ya da <em>Google Play → Abonelikler</em> (Android) üzerinden yapılır. Uygulamayı ya da Beauty Studio hesabınızı silmek aboneliği <strong>iptal etmez</strong>.</li>
          <li><strong>Satın alımları geri yükle</strong> seçeneği, yeniden kurduğunuzda ya da cihaz değiştirdiğinizde ödeme ekranının altında bulunur.</li>
          <li><strong>Ücretsiz deneme</strong> sunulduğu hâllerde koşulları satın almadan önce Uygulamada açıklanır. Bir abonelik satın aldığınızda ücretsiz denemenin kullanılmayan kısmı geçersiz olur.</li>
          <li><strong>Fiyat değişiklikleri</strong> yalnızca gelecek dönemler için geçerlidir; Apple ya da Google kendi kurallarının gerektirdiği şekilde sizi bilgilendirir.</li>
        </ul>
        <h3>İadeler</h3>
        <p>Satın alımlar App Store ve Google Play üzerinden yapıldığı için <strong>iadeler Apple ya da Google tarafından</strong> kendi politikaları kapsamında yürütülür — biz doğrudan iade veremeyiz. Tüketilmiş krediler, mevzuat aksini gerektirmedikçe iade edilemez. AB ya da Birleşik Krallık'ta yasal cayma hakkınızı kullanıyorsanız: bir analizi başlatmakla hizmetin derhal ifasını talep etmiş olursunuz; bu, hâlihazırda sunulmuş kısım bakımından cayma hakkını etkileyebilir.</p>

        <h2>9. Erişilebilirlik ve Uygulamadaki değişiklikler</h2>
        <p>Uygulama geliştikçe ve kendi sağlayıcı maliyetlerimiz değiştikçe analiz, model ve özellik ekleyebilir, değiştirebilir veya kaldırabilir; kredi maliyetlerini güncelleyebiliriz. Bir değişiklik, hâlihazırda ödediğiniz planın sunduğunu esaslı biçimde azaltıyorsa, yürürlüğe girmeden önce bunu Uygulamada açıkça belirtiriz. Bakım için ya da bir sağlayıcı kesintisi analizlerin çalışmasını engellediğinde hizmeti askıya alabiliriz.</p>

        <h2>10. Fikri mülkiyet</h2>
        <p>Uygulama, adı, tasarımı, arayüzü, analiz kataloğu ve komutları (kendi içeriğiniz ve fotoğrafınızdan üretilen görseller hariç) Foi Digitals'e aittir ve ilgili mevzuatla korunur. Bu Koşullar size, sahibi olduğunuz ya da kontrol ettiğiniz cihazlarda Uygulamayı kullanmanız için kişisel, münhasır olmayan, devredilemez ve geri alınabilir bir lisans verir.</p>

        <h2>11. Sorumluluk reddi</h2>
        <p>Uygulama, mevzuatın izin verdiği azami ölçüde <strong>"olduğu gibi" ve "mevcut hâliyle"</strong>, hiçbir garanti verilmeksizin sunulur. Analizin doğru olduğunu, üretilen görsellerin gerçek bir sonuca benzeyeceğini, Uygulamanın kesintisiz ya da hatasız çalışacağını veya beklentilerinizi karşılayacağını garanti etmiyoruz. Aldığınız her stil, alışveriş, bakım ya da kozmetik kararı size aittir.</p>

        <h2>12. Sorumluluğun sınırlandırılması</h2>
        <p>Mevzuatın izin verdiği azami ölçüde Foi Digitals; dolaylı, arızi, özel, sonuç niteliğindeki ya da cezai zararlardan, kâr kaybından, veri kaybından veya Uygulamayı kullandıktan sonra yaptırdığınız bir saç kesimi, boya, kozmetik işlem ya da alışverişin bedelinden sorumlu değildir. Sorumluluğun tamamen kaldırılamadığı hâllerde toplam sorumluluğumuz, (a) talepten önceki on iki ay içinde Uygulama için bize ödediğiniz tutar ile (b) 50 EUR'dan yüksek olanıyla sınırlıdır. Buradaki hiçbir hüküm; hile, ihmalden kaynaklanan ölüm veya bedensel zarar ya da hukuken sınırlandırılamayacak diğer sorumlulukları sınırlamaz — ve tüketiciyseniz kanuni haklarınız etkilenmez.</p>

        <h2>13. Tazminat</h2>
        <p>5. maddeye aykırı olarak yüklediğiniz içerikten — özellikle başka bir kişinin fotoğrafını rızası olmadan yüklemekten — doğan taleplere karşı Foi Digitals'i tazmin etmeyi kabul edersiniz.</p>

        <h2>14. Fesih</h2>
        <p>Uygulamayı kullanmayı bırakabilir ve hesabınızı istediğiniz zaman <em>Profil → Veri Yönetimi</em>'nden silebilirsiniz. Bu Koşulları esaslı biçimde ihlal etmeniz hâlinde, mümkün olduğunda bildirimde bulunarak erişimi askıya alabilir ya da sonlandırabiliriz. 5, 10, 11, 12, 13 ve 16. maddeler fesihten sonra da yürürlükte kalır.</p>

        <h2>15. Koşullardaki değişiklikler</h2>
        <p>Bu Koşulları güncelleyebiliriz. Önemli değişiklikler yukarıdaki "Son güncelleme" tarihine yansıtılır ve ciddiyse Uygulama içinde de duyurulur. Değişiklikten sonra kullanmaya devam etmeniz, güncellenmiş Koşulları kabul ettiğiniz anlamına gelir.</p>

        <h2>16. Uygulanacak hukuk</h2>
        <p>Bu Koşullar Türkiye Cumhuriyeti hukukuna tabidir ve İstanbul mahkemeleri yetkilidir. AEA'da, Birleşik Krallık'ta ya da size emredici koruma tanıyan başka bir ülkede yerleşik bir tüketiciyseniz, bu hukuk seçimi sizi o korumalardan yoksun bırakmaz ve yerel mahkemelerinizde dava açabilirsiniz.</p>

        <h2>17. İletişim</h2>
        <p>Bu Koşullar hakkında sorular: <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>.</p>

        <hr>

        <h2 id="eula">Son Kullanıcı Lisans Sözleşmesi (EULA)</h2>
        <p class="muted">Beauty Studio lisanslı uygulaması için geçerlidir.</p>
        <p>Bu Son Kullanıcı Lisans Sözleşmesi, yukarıdaki Koşulları tamamlar. Uygulama Apple App Store üzerinden dağıtıldığı için, Apple'ın standart Lisanslı Uygulama Son Kullanıcı Lisans Sözleşmesi ile uyumlu olarak aşağıdaki kabuller geçerlidir:</p>
        <ul>
          <li>Bu EULA yalnızca sizinle Foi Digitals arasındadır, Apple ile değil. Apple, Uygulamadan ya da içeriğinden sorumlu değildir.</li>
          <li>Foi Digitals size, App Store Hizmet Koşullarının izin verdiği ölçüde, sahip olduğunuz ya da kontrol ettiğiniz Apple markalı cihazlarda Uygulamayı kullanmanız için devredilemez bir lisans verir.</li>
          <li>Apple'ın Uygulama için bakım ya da destek sağlama yükümlülüğü yoktur.</li>
          <li>Uygulamanın geçerli bir garantiye uymaması hâlinde Apple'ı bilgilendirebilirsiniz; Apple varsa satın alma bedelini iade edebilir. Apple'ın Uygulamaya ilişkin başka bir garanti yükümlülüğü yoktur.</li>
          <li>Uygulamaya ilişkin taleplerin ele alınmasından — ürün sorumluluğu, hukuki ya da düzenleyici uyumsuzluk ve tüketicinin korunması talepleri dahil — Apple değil, Foi Digitals sorumludur.</li>
          <li>Uygulamanın fikri mülkiyet haklarını ihlal ettiğine dair üçüncü taraf taleplerinin araştırılması ve çözülmesinden Apple değil, Foi Digitals sorumludur.</li>
          <li>ABD hükûmetinin ambargo uyguladığı bir ülkede bulunmadığınızı ve ABD hükûmetinin kısıtlı taraflar listelerinde yer almadığınızı beyan edersiniz.</li>
          <li>Apple ve bağlı kuruluşları bu EULA'nın üçüncü taraf lehtarlarıdır ve size karşı ileri sürebilirler.</li>
        </ul>
        <p>Google Play üzerinden dağıtılan Android sürümü için kullanımınız ayrıca <em>Google Play Hizmet Koşullarına</em> tabidir. Google bu Koşulların tarafı değildir ve Uygulamadan sorumlu değildir.</p>

        <h3>İletişim</h3>
        <p>Foi Digitals · İstanbul, Türkiye · <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a></p>
      `,
    },

    bsSupport: {
      back: "beauty studio'ya dön",
      eyebrow: "beauty studio · destek",
      title: "Destek ve SSS",
      meta: "2–3 iş günü içinde yanıtlıyoruz.",
      body: `
        <h2>Yardım alma</h2>
        <p><strong>foidigitals@gmail.com</strong> adresine yazın. İlk yanıtta işe yarar bir cevap alabilmeniz için şunları ekleyin:</p>
        <ul>
          <li>cihazınız ve işletim sistemi sürümü (iPhone 15 / iOS 18.4, Pixel 8 / Android 15 gibi)</li>
          <li>Profil ekranının altında görünen Uygulama sürümü</li>
          <li>sorun bir analiz sırasında olduysa hangi analizi çalıştırdığınız</li>
          <li>ne beklediğiniz ve gerçekte ne olduğu</li>
          <li>işe yarayacaksa bir ekran görüntüsü</li>
        </ul>
        <p class="muted">Biz istemedikçe lütfen fotoğraflarınızı e-postayla göndermeyin.</p>

        <h2>Fotoğraflar ve gizlilik</h2>

        <h3>Yüklediğim fotoğrafa ne oluyor?</h3>
        <p>Cihazınızda küçültülüp yeniden kodlanır, hesabınıza ait özel bir depolama alanına yüklenir ve analiz için yapay zekâ sağlayıcımıza (fal.ai) gönderilir. Başka kullanıcılara asla gösterilmez ve asla satılmaz. Siz silene kadar kalır. <a href="privacy.html">Gizlilik Politikası</a> her adımı tek tek anlatır.</p>

        <h3>Fotoğraflarımı, raporlarımı ya da hesabımın tamamını nasıl silerim?</h3>
        <p><strong>Profil → Veri Yönetimi</strong>'ni açın. Dört düğme var: verilerinizi JSON dosyası olarak dışa aktarma, yüklenen fotoğrafları silme, tüm analiz verilerini silme ve hesabı silme. Hesap silme, fotoğraflarınızı ve her raporu da beraberinde götürür ve geri alınamaz.</p>

        <h3>Hesap açmak zorunda mıyım?</h3>
        <p>Hayır. Misafir olarak devam edebilirsiniz; sizin hakkınızda hiçbir e-posta ya da isim tutmayız. Karşılığı şu: misafir hesap yalnızca o cihazda yaşar. Uygulamayı yeniden kurarsanız ya da telefon değiştirirseniz geri getirilemez — onun size ait olduğunu tespit etmenin bir yolu yoktur. E-posta, Google ya da Apple girişi eklemek bunu çözer.</p>

        <h3>Fotoğraflarım yapay zekâ eğitmek için kullanılıyor mu?</h3>
        <p>Hayır. İçeriğinizle model eğitmiyoruz ve sağlayıcılarımızın eğitmesine de izin vermiyoruz.</p>

        <h3>Uygulama neden beni izlemek için izin istiyor?</h3>
        <p>Yalnızca hangi reklamların insanları Uygulamaya getirdiğini ölçmek için. Reddetmeniz Uygulamanın işleyişinde hiçbir şeyi değiştirmez — her özellik, kredi ve rapor aynı şekilde çalışır. Bkz. <a href="privacy.html">Gizlilik Politikası</a>, 6. bölüm.</p>

        <h2>Sonuçlar</h2>

        <h3>Analiz ne kadar doğru?</h3>
        <p>En iyi sonucu iyi aydınlatılmış, cepheden çekilmiş, saçınızın yüzünüzden toplandığı ve ağır filtre kullanılmamış bir fotoğrafta verir. Güçlü renkli ışık, güneş gözlüğü, aşırı açı ya da yoğun düzenlenmiş bir görselde doğruluk düşer. Uygulamanın döndürdüğü her şey yapay zekâ ile üretilmiş bir görüştür — bir hüküm değil, bilgili bir ikinci görüş.</p>

        <h3>Aynı analizi iki kez çalıştırdım, farklı cevap aldım.</h3>
        <p>Bu beklenen bir durum. Bu modeller deterministik değildir. İki sonuç önemli bir konuda gerçekten çelişiyorsa, daha iyi aydınlatılmış bir fotoğraf genellikle meseleyi çözer.</p>

        <h3>Saçım gerçekten önizlemedeki gibi mi olacak?</h3>
        <p>Önizlemeleri vaat değil, illüstrasyon olarak görün. Bunlar sentetik görsellerdir; gerçek bir kesim ya da boya saçınızın dokusuna, mevcut rengine ve kuaförünüzün tekniğine bağlıdır. Önizlemeyi kuaförünüze referans olarak götürün — asıl işe yaradığı yer orası. Lütfen yalnızca üretilmiş bir görsele bakarak geri dönüşü olmayan bir şeye karar vermeyin.</p>

        <h3>Uygulama ne kadar çekici olduğumu puanlıyor mu?</h3>
        <p>Hayır, bilinçli olarak. Güzellik puanı, derecelendirme, sıralama ve başkasıyla kıyaslama yok. Modellere çekicilik, kilo ya da cilt rahatsızlıkları hakkında yorum yapmamaları; yaş, etnik köken, milliyet ya da din çıkarımında bulunmamaları açıkça talimatlandırılmıştır.</p>

        <h3>Analiz cildim hakkında bir şey söyledi. Bu tıbbi tavsiye mi?</h3>
        <p>Hayır. Beauty Studio bir stil aracıdır. Hiçbir şeyi teşhis edemez ve bir dermatoloğun yerini tutmaz. Cildinizle ilgili bir şey sizi endişelendiriyorsa bir uzmana görünün.</p>

        <h2>Krediler ve abonelikler</h2>

        <h3>Neden kredi var?</h3>
        <p>Çünkü bir fotoğrafta görüntü modeli çalıştırmak ve yüzünüzden yeni görseller üretmek bize her çalıştırmada gerçek para maliyeti çıkarıyor. Krediler bunu ölçüyor. Yazılı analizler az, görsel üretimi belirgin biçimde daha fazla tüketir. Hiçbir şey sınırsız değil ve bunu aksini vaat etmeye tercih ediyoruz.</p>

        <h3>Görsel denemeler hangi planda var?</h3>
        <p>Aylık ve yıllık planlarda. Haftalık plan yazılı analizleri kapsar. Kesin haklar ve fiyatlar, satın almadan önce Uygulamada gösterilir.</p>

        <h3>Nasıl iptal ederim?</h3>
        <p>iOS'ta: <em>Ayarlar → adınız → Abonelikler</em>. Android'de: <em>Google Play → Abonelikler</em>. Dönem bitmeden en az 24 saat önce iptal edin. <strong>Uygulamayı ya da hesabınızı silmek aboneliği iptal etmez.</strong></p>

        <h3>Ödeme yaptım ama hiçbir şey açılmadı.</h3>
        <p>Önce ödeme ekranının altındaki <strong>Satın Alımları Geri Yükle</strong>'ye dokunun — özellikle yeniden kurulum ya da cihaz değişikliğinden sonra çoğu durum böyle çözülür. Çözülmezse mağaza makbuzuyla bize yazın, halledelim.</p>

        <h3>İade alabilir miyim?</h3>
        <p>İadeler biz değil, Apple ve Google tarafından yürütülür. iOS'ta <em>reportaproblem.apple.com</em>'u kullanın; Android'de Google Play sipariş geçmişinizden talep edin. Satın alma bizim tarafımızdaki bir hata yüzünden başarısız olduysa bize söyleyin, talebinizi desteklemenize yardımcı olalım.</p>

        <h3>Kullanılmayan krediler sona erer mi?</h3>
        <p>Paketle satın alınan krediler cüzdanınızda kalır. Bir planın tanıdığı hak kredileri ise biriktirilmek yerine her dönem yenilenir. Hesabınızı silerseniz tüm krediler kaybolur.</p>

        <h2>Uygulamayı kullanma</h2>

        <h3>Hangi diller destekleniyor?</h3>
        <p>İngilizce, Türkçe, Almanca, Fransızca, Portekizce, İtalyanca, Rusça, İspanyolca ve Felemenkçe — hem arayüz hem yazılı rapor için. Uygulama cihazınızın dilini izler, dilerseniz Uygulama içinden değiştirebilirsiniz.</p>

        <h3>Çevrimdışı çalışıyor mu?</h3>
        <p>Hayır. Analizler ve görsel üretimi sunucularımızda çalışır, bu yüzden bağlantı gerekir. Daha önce çalıştırdığınız raporlar önbelleğe alınır ve çevrimdışı açılabilir.</p>

        <h3>Raporlarım yeni telefonuma taşınır mı?</h3>
        <p>E-posta, Google ya da Apple ile oturum açtıysanız evet — yeni cihazda giriş yapın, raporlarınız orada olur. Misafir hesap taşınamaz.</p>

        <h3>İstemediğim bildirimler gelir mi?</h3>
        <p>Tüm bildirimler Uygulama tarafından cihazda yerel olarak planlanır ve Uygulamanın bildirim ayarlarından siz kontrol edersiniz. Bir push sunucusu işletmiyoruz; yani istesek bile size uzaktan mesaj gönderemeyiz.</p>

        <h3>Hatayı ya da özellik talebini nasıl iletirim?</h3>
        <p><strong>foidigitals@gmail.com</strong> adresine "hata" ya da "özellik talebi" konusuyla yazın. Her mesajı okuyor ve 2–3 iş günü içinde yanıtlıyoruz.</p>
      `,
    },
  };

  const translations = { en, tr };

  /* ====== Resolution / state ====== */
  let _lang = null;

  function resolveKey(lang, key) {
    const parts = key.split(".");
    let node = translations[lang];
    for (const seg of parts) {
      if (node == null || typeof node !== "object") return null;
      node = node[seg];
    }
    return (typeof node === "string") ? node : null;
  }

  function t(key) {
    const lang = getLang();
    return resolveKey(lang, key) ?? resolveKey(DEFAULT_LANG, key) ?? key;
  }

  function detectInitialLang() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch (_) {}
    const nav = (navigator.language || navigator.userLanguage || "").toLowerCase();
    if (nav.startsWith("tr")) return "tr";
    return DEFAULT_LANG;
  }

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
    document.dispatchEvent(new CustomEvent("foi:lang-changed", { detail: { lang } }));
  }

  function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = t(key);
      if (val != null) el.textContent = val;
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.getAttribute("data-i18n-html");
      const val = t(key);
      if (val != null) el.innerHTML = val;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const spec = el.getAttribute("data-i18n-attr") || "";
      spec.split(",").forEach(pair => {
        const [attr, key] = pair.split(":").map(s => s && s.trim());
        if (attr && key) {
          const val = t(key);
          if (val != null) el.setAttribute(attr, val);
        }
      });
    });

    const titleKey = document.documentElement.getAttribute("data-i18n-title");
    if (titleKey) {
      const v = t(titleKey);
      if (v) document.title = v;
    }
    const descKey = document.documentElement.getAttribute("data-i18n-desc");
    if (descKey) {
      const v = t(descKey);
      if (v) {
        let m = document.querySelector('meta[name="description"]');
        if (!m) {
          m = document.createElement("meta");
          m.setAttribute("name", "description");
          document.head.appendChild(m);
        }
        m.setAttribute("content", v);
      }
    }
  }

  function syncToggle() {
    const lang = getLang();
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === lang ? "true" : "false");
    });
  }

  function bindToggle() {
    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.getAttribute("data-lang")));
    });
  }

  function init() {
    _lang = detectInitialLang();
    document.documentElement.lang = _lang;
    applyTranslations();
    bindToggle();
    syncToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Expose minimal API for debugging / future use.
  window.foiI18n = { setLang, getLang, t };
})();
