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
        f6: { title: "Privacy-first.", desc: "Photos are processed and discarded — we don't keep a library of your meals on our servers." },
      },

      pagesId: "legal & support",
      pagesHeading: "everything for this product.",
    },

    craPrivacy: {
      back: "back to calorie reader ai",
      eyebrow: "calorie reader ai · privacy",
      title: "Privacy Policy",
      meta: "Last updated · 2026-05-27 · v1.2",
      body: `
        <p>This Privacy Policy describes how <strong>Calorie Reader AI</strong> ("the App"), a product of Foi Digitals, collects, uses, and protects information when you use the App on iOS. We follow Apple's App Store privacy guidelines and applicable data protection laws.</p>

        <h2>1. Data we collect</h2>
        <h3>1.1 Meal photographs</h3>
        <p>When you photograph a meal, the image is sent to our nutrition analysis service for processing. Images are processed in real time and are <strong>not stored on our servers</strong> after the analysis is complete. We do not maintain a library of your meal photographs.</p>

        <h3>1.2 Nutrition logs (on-device)</h3>
        <p>The estimated nutrition data (calories, protein, carbohydrates, fat) and any notes you add are stored <strong>locally on your device</strong>. They are not transmitted to our servers unless you explicitly opt in to iCloud sync (a future feature).</p>

        <h3>1.3 Diagnostic data</h3>
        <p>If the App crashes or hits an error, anonymous crash logs may be sent via Apple's diagnostics. These contain no personal information and no meal data. You can disable this in iOS Settings → Privacy → Analytics & Improvements.</p>

        <h2>2. How we use your data</h2>
        <ul>
          <li><strong>Meal photographs</strong> are used solely to estimate nutritional content and are discarded after analysis.</li>
          <li><strong>Local nutrition logs</strong> remain on your device under your control. You can delete them any time from within the App.</li>
          <li><strong>Diagnostic data</strong> is used only to identify and fix bugs.</li>
        </ul>

        <h2>3. Third-party services</h2>
        <p>The App uses a vision model hosted by a third-party AI provider for image analysis. Photographs are transmitted to this provider over an encrypted (TLS) connection, processed for nutrition estimation, and not retained by them per our data processing agreement.</p>

        <h2>4. Data we do not collect</h2>
        <ul>
          <li>We do not collect your name, email address, phone number, or contacts.</li>
          <li>We do not use third-party advertising or analytics SDKs.</li>
          <li>We do not track you across other apps or websites.</li>
          <li>We do not sell, rent, or share your data with third parties for marketing purposes.</li>
        </ul>

        <h2>5. Children</h2>
        <p>The App is not directed to children under 13. We do not knowingly collect data from children under 13.</p>

        <h2>6. Your rights</h2>
        <p>Because nutrition logs are stored locally on your device, you can delete them at any time by removing entries within the App or by uninstalling the App. To make a request related to any other data, contact <strong>foidigitals@gmail.com</strong>.</p>

        <h2>7. Security</h2>
        <p>All network communication uses TLS. We follow industry-standard practices for the limited backend services we operate.</p>

        <h2>8. Changes to this policy</h2>
        <p>We may update this policy when the App changes. Material changes will be reflected in the "last updated" date above and, where required by law, surfaced inside the App.</p>

        <h2>9. Contact</h2>
        <p>Questions, concerns, or data requests: <strong>foidigitals@gmail.com</strong>.</p>
      `,
    },

    craTerms: {
      back: "back to calorie reader ai",
      eyebrow: "calorie reader ai · terms",
      title: "Terms of Use",
      meta: "Last updated · 2026-05-27 · v1.2",
      body: `
        <p>These Terms of Use ("Terms") govern your use of <strong>Calorie Reader AI</strong> ("the App"), provided by Foi Digitals ("we", "us"). By downloading, installing, or using the App, you agree to be bound by these Terms.</p>

        <h2>1. License</h2>
        <p>We grant you a personal, non-exclusive, non-transferable, revocable license to use the App on iOS devices that you own or control, in accordance with these Terms and the Apple App Store Terms of Service.</p>

        <h2>2. Not medical advice</h2>
        <blockquote>The App provides <strong>estimates</strong> of nutritional content based on image analysis. These estimates are for general informational purposes only and are <strong>not medical, nutritional, or dietary advice</strong>.</blockquote>
        <p>If you have a medical condition, food allergy, eating disorder, or other health concern, consult a qualified healthcare professional. Do not rely on the App for medical decisions. The App is not a substitute for professional medical judgement.</p>

        <h2>3. Estimate accuracy</h2>
        <p>Vision-model estimates have inherent limitations. Portion sizes, hidden ingredients, cooking methods, and lighting can affect accuracy. You are responsible for verifying nutritional information when accuracy is critical.</p>

        <h2>4. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>reverse-engineer, decompile, or attempt to extract the App's source code;</li>
          <li>use the App to harass, defraud, or harm others;</li>
          <li>submit content that is illegal, infringing, or invasive of another's privacy;</li>
          <li>interfere with or disrupt the App's services or networks.</li>
        </ul>

        <h2>5. Intellectual property</h2>
        <p>The App, including all designs, code, models, and content, is owned by Foi Digitals and protected by intellectual property laws. The "Foi Digitals" and "Calorie Reader AI" names and marks are property of Foi Digitals.</p>

        <h2>6. Disclaimer of warranties</h2>
        <p>The App is provided "as is" and "as available" without warranties of any kind, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. We do not warrant that the App will be uninterrupted, error-free, or that estimates will be accurate.</p>

        <h2>7. Limitation of liability</h2>
        <p>To the maximum extent permitted by law, Foi Digitals shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, arising from your use of the App.</p>

        <h2>8. Termination</h2>
        <p>We may suspend or terminate your access to the App at any time for any reason, including violation of these Terms. You may stop using the App at any time by uninstalling it.</p>

        <h2>9. Governing law</h2>
        <p>These Terms are governed by the laws of the Republic of Türkiye, without regard to conflict-of-laws principles. Any dispute arising under these Terms shall be brought in the courts of Istanbul, Türkiye.</p>

        <h2>10. Changes</h2>
        <p>We may revise these Terms from time to time. Material changes will be reflected in the "last updated" date above.</p>

        <h2>11. Contact</h2>
        <p>For questions about these Terms: <strong>foidigitals@gmail.com</strong>.</p>
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
        <p>No. Photographs are processed in real time and discarded after the analysis. We do not maintain a server-side library of your meal photos. See the <a href="privacy.html">Privacy Policy</a> for details.</p>

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
        f6: { title: "Gizlilik önce.", desc: "Fotoğraflar işlenip atılır — sunucularımızda yemeklerinizin kütüphanesini tutmuyoruz." },
      },

      pagesId: "yasal ve destek",
      pagesHeading: "bu ürün için her şey.",
    },

    craPrivacy: {
      back: "calorie reader ai'a dön",
      eyebrow: "calorie reader ai · gizlilik",
      title: "Gizlilik Politikası",
      meta: "Son güncelleme · 27.05.2026 · v1.2",
      body: `
        <p>Bu Gizlilik Politikası, Foi Digitals'in bir ürünü olan <strong>Calorie Reader AI</strong>'ın ("Uygulama") iOS'ta kullandığınız sırada bilgileri nasıl topladığını, kullandığını ve koruduğunu açıklar. Apple'ın App Store gizlilik kurallarına ve geçerli veri koruma yasalarına uyuyoruz.</p>

        <h2>1. Topladığımız veriler</h2>
        <h3>1.1 Yemek fotoğrafları</h3>
        <p>Bir yemeğin fotoğrafını çektiğinizde, görüntü işlenmek üzere beslenme analizi hizmetimize gönderilir. Görüntüler gerçek zamanlı olarak işlenir ve analiz tamamlandıktan sonra <strong>sunucularımızda saklanmaz</strong>. Yemek fotoğraflarınızın kütüphanesini tutmuyoruz.</p>

        <h3>1.2 Beslenme kayıtları (cihazda)</h3>
        <p>Tahmini beslenme verileri (kalori, protein, karbonhidrat, yağ) ve eklediğiniz notlar <strong>yerel olarak cihazınızda</strong> saklanır. iCloud senkronizasyonunu açıkça etkinleştirmedikçe (gelecek özellik) sunucularımıza iletilmez.</p>

        <h3>1.3 Tanılama verileri</h3>
        <p>Uygulama çökerse veya bir hatayla karşılaşırsa, Apple'ın tanılaması aracılığıyla anonim çökme günlükleri gönderilebilir. Bunlar kişisel bilgi ve yemek verisi içermez. iOS Ayarlar → Gizlilik → Analiz ve İyileştirmeler bölümünden devre dışı bırakabilirsiniz.</p>

        <h2>2. Verilerinizi nasıl kullanıyoruz</h2>
        <ul>
          <li><strong>Yemek fotoğrafları</strong> yalnızca besin içeriğini tahmin etmek için kullanılır ve analizden sonra atılır.</li>
          <li><strong>Yerel beslenme kayıtları</strong> cihazınızda kontrolünüz altında kalır. Uygulama içinden istediğiniz zaman silebilirsiniz.</li>
          <li><strong>Tanılama verileri</strong> yalnızca hataları tespit etmek ve düzeltmek için kullanılır.</li>
        </ul>

        <h2>3. Üçüncü taraf hizmetler</h2>
        <p>Uygulama, görüntü analizi için üçüncü taraf bir AI sağlayıcısı tarafından barındırılan bir görüntü modelini kullanır. Fotoğraflar şifrelenmiş (TLS) bir bağlantı üzerinden bu sağlayıcıya iletilir, beslenme tahmini için işlenir ve veri işleme sözleşmemiz uyarınca tarafımızca saklanmaz.</p>

        <h2>4. Toplamadığımız veriler</h2>
        <ul>
          <li>Adınızı, e-posta adresinizi, telefon numaranızı veya rehberinizi toplamıyoruz.</li>
          <li>Üçüncü taraf reklam veya analitik SDK'ları kullanmıyoruz.</li>
          <li>Sizi diğer uygulamalar veya web sitelerinde izlemiyoruz.</li>
          <li>Pazarlama amacıyla verilerinizi üçüncü taraflarla satmıyor, kiralamıyor veya paylaşmıyoruz.</li>
        </ul>

        <h2>5. Çocuklar</h2>
        <p>Uygulama 13 yaşın altındaki çocuklara yönelik değildir. 13 yaşın altındaki çocuklardan bilerek veri toplamıyoruz.</p>

        <h2>6. Haklarınız</h2>
        <p>Beslenme kayıtları cihazınızda yerel olarak saklandığından, Uygulama içindeki girdileri kaldırarak veya Uygulamayı kaldırarak istediğiniz zaman silebilirsiniz. Başka veriyle ilgili bir talepte bulunmak için <strong>foidigitals@gmail.com</strong>'a yazın.</p>

        <h2>7. Güvenlik</h2>
        <p>Tüm ağ iletişimi TLS kullanır. İşlettiğimiz sınırlı arka uç hizmetleri için endüstri standardı uygulamaları takip ediyoruz.</p>

        <h2>8. Bu politikadaki değişiklikler</h2>
        <p>Uygulama değiştikçe bu politikayı güncelleyebiliriz. Önemli değişiklikler yukarıdaki "son güncelleme" tarihine ve yasaların gerektirdiği yerlerde Uygulama içinde yansıtılır.</p>

        <h2>9. İletişim</h2>
        <p>Sorular, endişeler veya veri talepleri: <strong>foidigitals@gmail.com</strong>.</p>
      `,
    },

    craTerms: {
      back: "calorie reader ai'a dön",
      eyebrow: "calorie reader ai · koşullar",
      title: "Kullanım Koşulları",
      meta: "Son güncelleme · 27.05.2026 · v1.2",
      body: `
        <p>Bu Kullanım Koşulları ("Koşullar"), Foi Digitals ("biz") tarafından sağlanan <strong>Calorie Reader AI</strong> ("Uygulama") kullanımınızı düzenler. Uygulamayı indirerek, kurarak veya kullanarak bu Koşullarla bağlı olmayı kabul edersiniz.</p>

        <h2>1. Lisans</h2>
        <p>Bu Koşullara ve Apple App Store Hizmet Şartlarına uygun olarak, sahip olduğunuz veya kontrol ettiğiniz iOS cihazlarda Uygulamayı kullanmanız için size kişisel, münhasır olmayan, devredilemez ve geri alınabilir bir lisans veriyoruz.</p>

        <h2>2. Tıbbi tavsiye değildir</h2>
        <blockquote>Uygulama, görüntü analizine dayalı besin içeriği <strong>tahminleri</strong> sağlar. Bu tahminler yalnızca genel bilgi amaçlıdır ve <strong>tıbbi, beslenme veya diyet tavsiyesi değildir</strong>.</blockquote>
        <p>Tıbbi durumunuz, gıda alerjiniz, yeme bozukluğunuz veya başka bir sağlık endişeniz varsa, nitelikli bir sağlık uzmanına danışın. Tıbbi kararlar için Uygulamaya güvenmeyin. Uygulama profesyonel tıbbi muhakemenin yerine geçmez.</p>

        <h2>3. Tahmin doğruluğu</h2>
        <p>Görüntü modeli tahminlerinin doğal sınırları vardır. Porsiyon boyutları, gizli malzemeler, pişirme yöntemleri ve aydınlatma doğruluğu etkileyebilir. Doğruluk kritik olduğunda besin bilgisini doğrulamak sizin sorumluluğunuzdadır.</p>

        <h2>4. Kabul edilebilir kullanım</h2>
        <p>Şunları yapmamayı kabul edersiniz:</p>
        <ul>
          <li>Uygulamanın kaynak kodunu tersine mühendislik yapmak, derlemek veya çıkarmaya çalışmak;</li>
          <li>Uygulamayı başkalarını taciz etmek, dolandırmak veya zarar vermek için kullanmak;</li>
          <li>Yasadışı, ihlal eden veya başkalarının gizliliğini ihlal eden içerik göndermek;</li>
          <li>Uygulamanın hizmetlerine veya ağlarına müdahale etmek veya bunları bozmak.</li>
        </ul>

        <h2>5. Fikri mülkiyet</h2>
        <p>Tüm tasarımları, kodu, modelleri ve içeriği dahil olmak üzere Uygulama, Foi Digitals'in mülkiyetindedir ve fikri mülkiyet yasalarıyla korunur. "Foi Digitals" ve "Calorie Reader AI" adları ve markaları Foi Digitals'in mülküdür.</p>

        <h2>6. Garanti reddi</h2>
        <p>Uygulama, satılabilirlik, belirli bir amaca uygunluk veya ihlal etmeme garantileri dahil ancak bunlarla sınırlı olmamak üzere, açık veya zımni hiçbir garanti olmaksızın "olduğu gibi" ve "mevcut olduğu gibi" sağlanır. Uygulamanın kesintisiz, hatasız veya tahminlerin doğru olacağını garanti etmiyoruz.</p>

        <h2>7. Sorumluluğun sınırlandırılması</h2>
        <p>Yasaların izin verdiği azami ölçüde, Foi Digitals, Uygulamayı kullanımınızdan kaynaklanan dolaylı, arızi, özel, sonuç olarak ortaya çıkan veya cezai zararlardan veya kar veya gelir kaybından sorumlu tutulamaz.</p>

        <h2>8. Fesih</h2>
        <p>Bu Koşulların ihlali dahil herhangi bir nedenle Uygulamaya erişiminizi herhangi bir zamanda askıya alabilir veya sonlandırabiliriz. Uygulamayı kaldırarak istediğiniz zaman kullanmayı bırakabilirsiniz.</p>

        <h2>9. Geçerli hukuk</h2>
        <p>Bu Koşullar, kanunlar ihtilafı kuralları gözetilmeksizin Türkiye Cumhuriyeti yasalarına tabidir. Bu Koşullar kapsamında doğacak uyuşmazlıklar İstanbul mahkemelerinde çözülecektir.</p>

        <h2>10. Değişiklikler</h2>
        <p>Bu Koşulları zaman zaman güncelleyebiliriz. Önemli değişiklikler yukarıdaki "son güncelleme" tarihine yansıtılır.</p>

        <h2>11. İletişim</h2>
        <p>Bu Koşullar hakkında sorular için: <strong>foidigitals@gmail.com</strong>.</p>
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
        <p>Hayır. Fotoğraflar gerçek zamanlı işlenir ve analiz sonrası atılır. Yemek fotoğraflarınızın sunucu tarafı kütüphanesini tutmuyoruz. Ayrıntılar için <a href="privacy.html">Gizlilik Politikası</a>'na bakın.</p>

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
