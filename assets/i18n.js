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
      heading: "a calorie tracker that <em>reads</em> your plate.",
      pill: "calorie reader ai · flagship",
      title: "photograph a meal. <em>understand it.</em>",
      desc: "Our vision model returns calories, protein, carbs, and fat in seconds — six languages, no friction. Built for the way people actually eat.",
      tag2: "AI vision",
      tag3: "health",
      tag4: "6 languages",
      ctaPrimary: "see the product",
      ctaGhost: "faq + support",
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
        <p>Foi Digitals ("Foi Digitals", "we", "our") respects your privacy. This page describes what information we collect across our website at <code>foidigitals.github.io</code> and our company-wide channels. Each of our products may have its own additional privacy policy — for example, <a href="apps/calorie-reader-ai/privacy.html">Calorie Reader AI</a>.</p>

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
      title: "Support &amp; FAQ",
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
      heading: "tabağınızı <em>okuyan</em> bir kalori takipçisi.",
      pill: "calorie reader ai · amiral gemisi",
      title: "yemeğin fotoğrafını çek. <em>anlasın.</em>",
      desc: "Görüntü modelimiz saniyeler içinde kalori, protein, karbonhidrat ve yağ değerlerini döndürür — altı dilde, sürtünmesiz. İnsanların gerçekten yediği gibi tasarlandı.",
      tag2: "AI görüntü",
      tag3: "sağlık",
      tag4: "6 dil",
      ctaPrimary: "ürünü incele",
      ctaGhost: "sss + destek",
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
        <p>Verileri yalnızca Uygulamayı işletmemize yardımcı olan sağlayıcılarla, kendi koşulları altında paylaşırız:</p>
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
