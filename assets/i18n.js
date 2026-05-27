/* ============================================================
   Foi Digitals — i18n
   - Auto-detects browser language (TR/EN), defaults to EN
   - Manual override via header toggle, stored in localStorage
   - Updates [data-i18n], [data-i18n-html], [data-i18n-attr]
   ============================================================ */

const STORAGE_KEY = 'foi.lang';
const DEFAULT_LANG = 'en';
const SUPPORTED = ['en', 'tr'];

const translations = {
  /* ====================== ENGLISH ====================== */
  en: {
    meta: {
      siteTitle: 'Foi Digitals — A small studio for calm software',
      siteDesc: 'Foi Digitals is an independent atelier crafting AI-powered apps for everyday life. Maker of Calorie Reader AI.',
      privacyTitle: 'Privacy Policy — Foi Digitals',
      termsTitle: 'Terms of Use — Foi Digitals',
      supportTitle: 'Support & FAQ — Foi Digitals',
    },
    nav: {
      apps: 'Apps',
      support: 'Support',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    footer: {
      tagline: 'A small studio in pursuit of calm software.',
      copyright: '© 2026 Foi Digitals — All rights reserved.',
      location: 'Independent · Self-funded',
    },
    home: {
      heroLabel: '01 — Studio',
      heroTitleHtml: 'Calm, careful software <em>from a small studio.</em>',
      heroBody: 'Foi Digitals is an independent atelier crafting AI-powered apps for everyday life. We make few things, but we make them with intention.',
      heroStatus: 'Established 2026 · Independent · Self-funded',

      appsLabel: '02 — Catalog',
      appsHeading: 'Apps in production.',

      app1Title: 'Calorie Reader AI',
      app1Status: 'Coming soon — App Store',
      app1Desc: 'Photograph a meal. Our vision model reads it back to you in calories, protein, carbs, and fat. No databases to search, no barcodes to scan. Built for people who want to log a day in thirty seconds.',
      app1Tag1: 'iOS',
      app1Tag2: 'AI Vision',
      app1Tag3: 'Health',
      app1Tag4: '6 Languages',

      appNextTitle: 'Untitled — 002',
      appNextStatus: 'In development',
      appNextDesc: 'Something quiet, useful, and a little surprising. More when it is ready.',

      contactLabel: '03 — Contact',
      contactHeading: 'Reach the studio.',
      contactBody: 'For partnerships, press inquiries, or careful technical questions — write to us. We read every message.',
      contactNote: 'Replies within 2–3 business days · English & Turkish',
    },

    /* ===== Privacy Policy ===== */
    privacy: {
      eyebrow: 'Legal — Privacy',
      title: 'Privacy Policy',
      lede: 'This Privacy Policy explains what information Foi Digitals collects when you use our applications, why we collect it, and the choices you have. We treat your data the way we would want ours treated: with restraint.',
      effective: 'Effective 27 May 2026',
      version: 'v1.0',
      tocLabel: 'Contents',

      h_overview: 'Overview',
      p_overview1: 'Foi Digitals (“we”, “us”, “our”) operates the “Calorie Reader AI” mobile application and any related services (collectively, the “Service”). This policy applies to the Service and to anyone who downloads or uses it.',
      p_overview2: 'By using the Service, you agree to the practices described here. If you do not agree, please discontinue use of the Service.',

      h_collect: 'Information We Collect',
      h_collect_account: 'Account information',
      p_collect_account: 'When you create an account, we collect your email address and, if you sign in via Apple or Google, the basic profile information they share with us (typically a name and a unique identifier). We do not receive or store your password from these providers.',
      h_collect_profile: 'Profile & nutrition data',
      p_collect_profile: 'To personalize coaching and calorie targets, the Service stores the profile inputs you provide: age, sex, height, weight, activity level, dietary preferences, allergens, and goals. You may edit or remove these at any time from within the app.',
      h_collect_photos: 'Meal photos',
      p_collect_photos: 'When you photograph a meal, the image is transmitted to our backend and then to a third-party AI vision provider for analysis. The image is associated with your account and stored so you can review your meal history. You may delete any photo from your history at any time, which removes it from our storage.',
      h_collect_health: 'Apple Health data',
      p_collect_health: 'If you explicitly grant permission, the Service can read selected Health data (such as weight or activity) to improve personalization and can write nutrition results back to Health. We process this data only on your device or transiently on our servers; we do not retain Health data beyond what is needed to provide the feature you requested.',
      h_collect_subs: 'Subscription data',
      p_collect_subs: 'Subscriptions are processed by Apple. We use RevenueCat as our subscription infrastructure provider to validate purchases and manage entitlements. We receive a transaction identifier, subscription status, and product identifier. We do not receive or store your payment card details.',
      h_collect_usage: 'Usage analytics & diagnostics',
      p_collect_usage: 'We collect anonymized usage events (such as “screen opened”, “meal logged”, “onboarding completed”) and crash diagnostics to understand which features work and to find bugs. Analytics events do not include the contents of your meals, photos, or chat messages.',

      h_use: 'How We Use Your Information',
      p_use_lede: 'We use the information we collect to:',
      l_use_1: 'Provide and operate the Service — including analyzing meal photos, computing nutrition totals, and showing you progress.',
      l_use_2: 'Personalize coaching and recommendations based on your profile and goals.',
      l_use_3: 'Manage your subscription and entitlements via RevenueCat and Apple.',
      l_use_4: 'Send transactional notifications you opt into (reminders, weekly summaries).',
      l_use_5: 'Diagnose issues, prevent abuse, and improve the Service through aggregated analytics.',
      l_use_6: 'Comply with legal obligations.',
      p_use_no_sell: 'We do not sell your personal data. We do not use your meal photos to train any general-purpose model.',

      h_third: 'Third-Party Services',
      p_third_lede: 'We rely on a small set of vetted providers to operate the Service. Each receives only the data necessary for its function:',
      l_third_1: 'Supabase — authentication, database, and storage of your account, profile, and meal photos.',
      l_third_2: 'A third-party AI provider — receives meal photos for the sole purpose of returning a nutrition estimate. The provider is bound by data processing terms that prohibit using your data to train their general models.',
      l_third_3: 'RevenueCat — subscription validation and entitlement management on top of Apple’s App Store.',
      l_third_4: 'Apple (Sign in with Apple, Apple Health, push notifications) and Google (Sign in with Google) — only the data you authorize is shared.',
      l_third_5: 'Anonymized analytics and crash reporting providers — receive aggregate, non-identifying event data.',

      h_retention: 'Data Retention',
      p_retention: 'We retain account information, profile, and meal history for as long as your account is active. If you delete your account, we delete or irreversibly anonymize your data within 30 days, except where we are required to retain certain records (for example, transaction records for tax purposes).',

      h_rights: 'Your Rights',
      p_rights_lede: 'Depending on where you live, you may have the following rights regarding your personal data:',
      l_rights_1: 'Access — request a copy of the information we hold about you.',
      l_rights_2: 'Correction — fix inaccurate or incomplete information.',
      l_rights_3: 'Deletion — request that we delete your account and associated data. You can also delete your account directly from within the app.',
      l_rights_4: 'Portability — receive your data in a structured, machine-readable format.',
      l_rights_5: 'Objection / restriction — object to or restrict certain processing activities.',
      l_rights_6: 'Withdraw consent — where processing is based on consent, you may withdraw it at any time.',
      p_rights_how: 'To exercise any of these rights, write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>. We will respond within 30 days. You also have the right to lodge a complaint with your local data protection authority.',

      h_children: 'Children',
      p_children: 'The Service is not directed to children under 13 (or the equivalent minimum age in your jurisdiction). We do not knowingly collect personal information from children. If we learn that we have, we will delete it promptly.',

      h_international: 'International Data Transfers',
      p_international: 'Your information may be processed in countries other than the one in which you reside, including in the European Union and the United States. We rely on appropriate safeguards (such as standard contractual clauses) where required by law.',

      h_security: 'Security',
      p_security: 'We use encryption in transit (TLS) and at rest, access controls, and the principle of least privilege. No system is perfectly secure, but we take security seriously and will notify affected users in the event of a material breach as required by law.',

      h_changes: 'Changes to This Policy',
      p_changes: 'We may update this Policy from time to time. When we do, we will update the “Effective” date above and, for material changes, notify you within the app or by email. Continued use of the Service after changes take effect constitutes acceptance.',

      h_contact: 'Contact',
      p_contact: 'Questions about this Policy or your data? Write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>.',
    },

    /* ===== Terms of Use ===== */
    terms: {
      eyebrow: 'Legal — Terms',
      title: 'Terms of Use',
      lede: 'These Terms govern your use of Calorie Reader AI and other applications and services provided by Foi Digitals. Please read them carefully. By using the Service, you agree to these Terms.',
      effective: 'Effective 27 May 2026',
      version: 'v1.0',
      tocLabel: 'Contents',

      h_accept: 'Acceptance of Terms',
      p_accept: 'By downloading, installing, or using the Service, you confirm that you have read, understood, and agreed to be bound by these Terms and by our Privacy Policy. If you do not agree, do not use the Service.',

      h_service: 'The Service',
      p_service: 'Foi Digitals provides software that estimates nutritional information from photos of meals, tracks dietary and activity data, and provides AI-assisted guidance. The Service is provided “as is” and may be modified, suspended, or discontinued at our discretion.',

      h_eligibility: 'Eligibility & Accounts',
      p_eligibility: 'You must be at least 13 years old (or the minimum age in your jurisdiction) to use the Service. You are responsible for keeping your account credentials secure and for all activity that occurs under your account.',

      h_subs: 'Subscriptions & Auto-Renewal',
      p_subs1: 'The Service may offer paid subscriptions (collectively “Calorie Reader Pro”). When you purchase a subscription, payment is charged to your Apple ID upon confirmation. Subscriptions automatically renew for the same period and at the same price unless auto-renewal is turned off at least 24 hours before the end of the current period.',
      p_subs2: 'Your account will be charged for renewal within 24 hours prior to the end of the current period. You can manage your subscriptions and turn off auto-renewal at any time in your Apple ID account settings: <strong>Settings → [your name] → Subscriptions</strong>.',
      p_subs3: 'Any unused portion of a free trial, if offered, will be forfeited when you purchase a subscription.',

      h_refunds: 'Refunds',
      p_refunds: 'All payments are handled by Apple. Refund requests are governed by Apple’s App Store policies. We cannot directly issue refunds for purchases made through the App Store. To request a refund, visit <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener">reportaproblem.apple.com</a>.',

      h_medical: 'Medical Disclaimer',
      p_medical1: '<strong>The Service is not medical advice.</strong> Calorie estimates and AI-generated guidance are informational and approximate. They are not a substitute for consultation with a qualified healthcare professional, registered dietitian, or other licensed provider.',
      p_medical2: 'Do not use the Service to diagnose, treat, cure, or prevent any disease or medical condition. If you have an eating disorder, are pregnant or nursing, are managing a chronic condition (such as diabetes), or are considering significant dietary changes, consult a qualified professional before relying on any output from the Service.',
      p_medical3: 'In case of a medical emergency, contact your local emergency services immediately.',

      h_content: 'Your Content',
      p_content1: 'You retain ownership of the photos, profile information, and other content you submit (“Your Content”).',
      p_content2: 'By using the Service, you grant Foi Digitals a worldwide, royalty-free license to host, process, and display Your Content solely as necessary to provide the Service to you. We do not use Your Content to train general-purpose AI models, and we do not sell Your Content.',

      h_use: 'Acceptable Use',
      p_use_lede: 'You agree not to:',
      l_use_1: 'Use the Service for any unlawful purpose or in violation of any applicable law.',
      l_use_2: 'Attempt to reverse-engineer, decompile, or extract source code from the Service except where permitted by law.',
      l_use_3: 'Interfere with, disrupt, or attempt to gain unauthorized access to the Service or its underlying infrastructure.',
      l_use_4: 'Upload content that infringes the rights of others, is harmful, or attempts to manipulate the AI features (including prompt injection or attempts to extract system instructions).',
      l_use_5: 'Use the Service to provide medical, dietetic, or other professional advice to third parties.',
      l_use_6: 'Resell, sublicense, or otherwise commercially exploit the Service without our prior written consent.',

      h_ip: 'Intellectual Property',
      p_ip: 'The Service, including its software, design, brand marks, and content (other than Your Content), is owned by Foi Digitals and protected by intellectual property laws. We grant you a limited, non-exclusive, non-transferable, revocable license to use the Service for your personal, non-commercial purposes.',

      h_third: 'Third-Party Services',
      p_third: 'The Service relies on third-party providers (including Apple, Google, Supabase, RevenueCat, and our AI provider). Your use of those providers is subject to their own terms. We are not responsible for the practices of third-party services beyond what is described in our Privacy Policy.',

      h_disclaim: 'Disclaimers',
      p_disclaim: 'The Service is provided on an “as is” and “as available” basis, without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy, or non-infringement. We do not warrant that the Service will be uninterrupted, error-free, or that calorie estimates will be exact.',

      h_liability: 'Limitation of Liability',
      p_liability: 'To the maximum extent permitted by law, Foi Digitals shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising from your use of, or inability to use, the Service. In no event shall our aggregate liability exceed the greater of (a) the amount you paid us in the twelve months preceding the claim, or (b) USD 50.',

      h_termination: 'Termination',
      p_termination: 'You may stop using the Service and delete your account at any time. We may suspend or terminate your access if you breach these Terms or if we are required to do so by law. Provisions that by their nature should survive termination (such as intellectual property, disclaimers, and limitation of liability) will survive.',

      h_law: 'Governing Law',
      p_law: 'These Terms are governed by the laws of the Republic of Türkiye, without regard to its conflict of laws principles. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts and enforcement offices of Istanbul, unless otherwise required by mandatory consumer protection laws of your country of residence.',

      h_changes: 'Changes to These Terms',
      p_changes: 'We may revise these Terms from time to time. We will update the “Effective” date and, for material changes, notify you within the app or by email. Continued use of the Service after changes take effect constitutes acceptance.',

      h_contact: 'Contact',
      p_contact: 'For questions about these Terms, write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>.',
    },

    /* ===== Support / FAQ ===== */
    support: {
      eyebrow: 'Support',
      title: 'Questions & Help',
      lede: 'A short guide to the most common questions about Calorie Reader AI. If you do not find what you need, write to us — every message is read by a human.',
      effective: 'Updated 27 May 2026',
      version: 'v1.0',
      tocLabel: 'Topics',

      faq1_q: 'What is Calorie Reader AI?',
      faq1_a: 'Calorie Reader AI is an iOS application that estimates the nutritional content (calories, protein, carbohydrates, and fat) of meals from a single photograph. It also includes an AI nutrition coach and progress tracking. The app is built by Foi Digitals, a small independent studio.',

      faq2_q: 'How does the photo-to-calorie feature work?',
      faq2_a: 'When you take a photo of your meal, the image is securely transmitted to a vision-capable AI provider that identifies the foods present and estimates portion sizes. The result is combined with a nutrition reference to produce calorie and macronutrient estimates. The whole process typically takes a few seconds.',

      faq3_q: 'How accurate are the estimates?',
      faq3_a_p1: 'Photo-based estimates are approximate. The model performs best on clearly visible, well-lit meals; it may under- or over-estimate for dishes with hidden ingredients (sauces, oils, fillings), unusual portions, or ambiguous angles.',
      faq3_a_p2: 'For best results, photograph each meal from above with the full plate visible. You can always tap a logged meal to manually adjust the values.',

      faq4_q: 'Is the AI coach giving me medical advice?',
      faq4_a: 'No. The AI nutrition coach is an informational tool. It is not a substitute for professional medical, dietetic, or psychological advice. If you have a medical condition, an eating disorder, are pregnant or nursing, or are considering significant dietary changes, please consult a qualified healthcare professional.',

      faq5_q: 'How do I manage or cancel my subscription?',
      faq5_a_p1: 'Calorie Reader Pro subscriptions are processed by Apple and managed in your Apple ID settings.',
      faq5_a_p2: 'On your device, go to <strong>Settings → [your name] → Subscriptions</strong>, find Calorie Reader AI, and choose Cancel Subscription. Cancellation takes effect at the end of the current billing period — you keep access until then.',

      faq6_q: 'How do I delete my account?',
      faq6_a_p1: 'You can delete your account directly from within the app: open <strong>Profile → Settings → Delete Account</strong> and confirm. Your profile, meal history, and photos will be permanently removed from our systems within 30 days.',
      faq6_a_p2: 'If you have trouble deleting in-app, write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> from the email address associated with your account and we will process the request manually.',

      faq7_q: 'Why does the app ask for camera and photo permissions?',
      faq7_a: 'The camera permission is required to photograph meals for nutrition analysis. The photo library permission lets you choose an existing meal photo instead of taking a new one. Both are optional — declining limits the ability to log meals but does not block other features. We do not access your photos beyond what you explicitly select.',

      faq8_q: 'How is my data protected?',
      faq8_a: 'All data is encrypted in transit (TLS) and at rest. Photos are stored under your account and are not shared with other users or used to train general-purpose AI models. You can review the full details in our <a href="privacy.html">Privacy Policy</a>.',

      faq9_q: 'How do I contact support?',
      faq9_a: 'Write to <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a>. Please include the device model, iOS version, and a short description of the issue. We typically reply within 2–3 business days.',

      cta_heading: 'Still need help?',
      cta_body: 'Send us a note. We answer every message.',
    },
  },

  /* ====================== TÜRKÇE ====================== */
  tr: {
    meta: {
      siteTitle: 'Foi Digitals — Sakin yazılım için küçük bir stüdyo',
      siteDesc: 'Foi Digitals; günlük hayata yapay zekâ destekli uygulamalar geliştiren bağımsız bir atölyedir. Calorie Reader AI’ın üreticisi.',
      privacyTitle: 'Gizlilik Politikası — Foi Digitals',
      termsTitle: 'Kullanım Şartları — Foi Digitals',
      supportTitle: 'Destek & SSS — Foi Digitals',
    },
    nav: {
      apps: 'Uygulamalar',
      support: 'Destek',
      privacy: 'Gizlilik',
      terms: 'Şartlar',
    },
    footer: {
      tagline: 'Sakin yazılımın peşindeki küçük bir stüdyo.',
      copyright: '© 2026 Foi Digitals — Tüm hakları saklıdır.',
      location: 'Bağımsız · Kendi kaynaklı',
    },
    home: {
      heroLabel: '01 — Stüdyo',
      heroTitleHtml: 'Küçük bir stüdyodan, <em>sakin ve özenli yazılım.</em>',
      heroBody: 'Foi Digitals; günlük hayata yapay zekâ destekli uygulamalar geliştiren bağımsız bir atölyedir. Az şey yaparız; ama her birini niyetle yaparız.',
      heroStatus: 'Kuruluş 2026 · Bağımsız · Kendi kaynaklı',

      appsLabel: '02 — Katalog',
      appsHeading: 'Üretim hâlindeki uygulamalar.',

      app1Title: 'Calorie Reader AI',
      app1Status: 'Yakında — App Store',
      app1Desc: 'Yemeğinin fotoğrafını çek; görsel modelimiz onu sana kalori, protein, karbonhidrat ve yağ olarak okusun. Veritabanı aramak, barkod taramak yok. Otuz saniyede gününü kaydetmek isteyenler için.',
      app1Tag1: 'iOS',
      app1Tag2: 'Görüntü AI',
      app1Tag3: 'Sağlık',
      app1Tag4: '6 Dil',

      appNextTitle: 'İsimsiz — 002',
      appNextStatus: 'Geliştiriliyor',
      appNextDesc: 'Sessiz, faydalı ve biraz şaşırtıcı bir şey. Hazır olunca daha fazlası gelir.',

      contactLabel: '03 — İletişim',
      contactHeading: 'Stüdyoya ulaş.',
      contactBody: 'İş birlikleri, basın talepleri ya da özenli teknik sorular için — bize yaz. Her mesaj okunuyor.',
      contactNote: 'Cevap: 2–3 iş günü · Türkçe & İngilizce',
    },

    /* ===== Gizlilik ===== */
    privacy: {
      eyebrow: 'Hukuki — Gizlilik',
      title: 'Gizlilik Politikası',
      lede: 'Bu Gizlilik Politikası; Foi Digitals olarak uygulamalarımızı kullandığında hangi bilgileri topladığımızı, bunları neden topladığımızı ve sahip olduğun seçenekleri açıklar. Verilerini, kendi verimize davranmak isteyeceğimiz gibi: ölçülü bir şekilde işliyoruz.',
      effective: 'Yürürlük 27 Mayıs 2026',
      version: 'v1.0',
      tocLabel: 'İçindekiler',

      h_overview: 'Genel Bakış',
      p_overview1: 'Foi Digitals (“biz”, “bize”) “Calorie Reader AI” mobil uygulamasını ve ilgili hizmetleri (topluca “Hizmet”) işletir. Bu politika Hizmet’e ve onu indiren ya da kullanan herkese uygulanır.',
      p_overview2: 'Hizmet’i kullanarak burada açıklanan uygulamaları kabul etmiş olursun. Kabul etmiyorsan, lütfen Hizmet’i kullanmayı bırak.',

      h_collect: 'Topladığımız Bilgiler',
      h_collect_account: 'Hesap bilgileri',
      p_collect_account: 'Hesap oluşturduğunda e-posta adresini topluyoruz. Apple veya Google ile giriş yaptığında bu sağlayıcıların bizimle paylaştığı temel profil bilgilerini (genellikle isim ve benzersiz bir tanımlayıcı) alıyoruz. Bu sağlayıcılardan şifreni almıyor veya saklamıyoruz.',
      h_collect_profile: 'Profil ve beslenme verileri',
      p_collect_profile: 'Koçluk ve kalori hedeflerini kişiselleştirmek için sağladığın profil verilerini saklıyoruz: yaş, cinsiyet, boy, kilo, aktivite seviyesi, diyet tercihleri, alerjenler ve hedefler. Bunları istediğin zaman uygulama içinden düzenleyebilir veya silebilirsin.',
      h_collect_photos: 'Yemek fotoğrafları',
      p_collect_photos: 'Bir öğünü fotoğrafladığında, görüntü güvenli şekilde sunucumuza ve oradan da analiz için üçüncü taraf bir görüntü AI sağlayıcısına iletilir. Görüntü hesabınla ilişkilendirilerek geçmişini incelemen için saklanır. Geçmişten istediğin fotoğrafı silebilirsin; silinen fotoğraf depolamamızdan kaldırılır.',
      h_collect_health: 'Apple Sağlık verileri',
      p_collect_health: 'Açıkça izin verirsen Hizmet; kişiselleştirmeyi iyileştirmek için seçili Sağlık verilerini (kilo veya aktivite gibi) okuyabilir ve beslenme sonuçlarını Sağlık’a yazabilir. Bu verileri yalnızca cihazında ya da sunucularımızda geçici olarak işleriz; talep ettiğin özelliği sunmak için gerekenin ötesinde saklamayız.',
      h_collect_subs: 'Abonelik verileri',
      p_collect_subs: 'Abonelikler Apple tarafından işlenir. Satın almaları doğrulamak ve hak yönetimini yapmak için abonelik altyapısı sağlayıcımız olarak RevenueCat’i kullanırız. Bir işlem kimliği, abonelik durumu ve ürün kimliği alırız. Ödeme kartı bilgilerini almıyor ve saklamıyoruz.',
      h_collect_usage: 'Kullanım analitiği ve teşhis',
      p_collect_usage: 'Hangi özelliklerin işe yaradığını anlamak ve hataları bulmak için anonimleştirilmiş kullanım olayları (örn. “ekran açıldı”, “öğün kaydedildi”, “onboarding tamamlandı”) ve çökme teşhisi toplarız. Analitik olayları; öğünlerinin, fotoğraflarının ya da sohbet mesajlarının içeriğini içermez.',

      h_use: 'Bilgileri Nasıl Kullanıyoruz',
      p_use_lede: 'Topladığımız bilgileri şunlar için kullanırız:',
      l_use_1: 'Hizmet’i sağlamak ve işletmek — öğün fotoğraflarını analiz etmek, beslenme toplamlarını hesaplamak, ilerlemeni göstermek dâhil.',
      l_use_2: 'Profil ve hedeflerine dayalı kişiselleştirilmiş koçluk ve öneriler sunmak.',
      l_use_3: 'Abonelik ve hakları RevenueCat ile Apple üzerinden yönetmek.',
      l_use_4: 'İzin verdiğin işlemsel bildirimleri göndermek (hatırlatıcılar, haftalık özetler).',
      l_use_5: 'Sorunları tespit etmek, kötüye kullanımı engellemek ve toplulaştırılmış analitik ile Hizmet’i iyileştirmek.',
      l_use_6: 'Yasal yükümlülüklere uymak.',
      p_use_no_sell: 'Kişisel verilerini satmıyoruz. Öğün fotoğraflarını herhangi bir genel amaçlı modeli eğitmek için kullanmıyoruz.',

      h_third: 'Üçüncü Taraf Hizmetleri',
      p_third_lede: 'Hizmet’i çalıştırmak için küçük ve denetlenmiş bir sağlayıcı grubuyla çalışıyoruz. Her biri yalnızca işlevi için gerekli olan veriyi alır:',
      l_third_1: 'Supabase — kimlik doğrulama, veritabanı ve hesabının, profilinin, öğün fotoğraflarının depolanması.',
      l_third_2: 'Üçüncü taraf AI sağlayıcısı — yalnızca beslenme tahmini döndürmek amacıyla öğün fotoğraflarını alır. Sağlayıcı, verilerini kendi genel modellerini eğitmek için kullanmayı yasaklayan veri işleme şartlarıyla bağlıdır.',
      l_third_3: 'RevenueCat — Apple App Store üzerinde abonelik doğrulama ve hak yönetimi.',
      l_third_4: 'Apple (Apple ile Giriş, Apple Sağlık, push bildirimleri) ve Google (Google ile Giriş) — yalnızca senin yetki verdiğin veriler paylaşılır.',
      l_third_5: 'Anonimleştirilmiş analitik ve çökme raporu sağlayıcıları — toplulaştırılmış, kimlik tanımlamayan olay verisi alır.',

      h_retention: 'Veri Saklama',
      p_retention: 'Hesap bilgilerini, profili ve öğün geçmişini hesabın aktif olduğu sürece saklarız. Hesabını silersen verilerini 30 gün içinde sileriz veya geri döndürülemez şekilde anonimleştiririz; belirli kayıtları tutmamız yasal olarak zorunlu olan durumlar (örneğin vergi amaçlı işlem kayıtları) hariç.',

      h_rights: 'Haklarınız',
      p_rights_lede: 'Yaşadığın yere bağlı olarak kişisel verilerinle ilgili aşağıdaki haklara sahip olabilirsin:',
      l_rights_1: 'Erişim — hakkında tuttuğumuz bilgilerin bir kopyasını talep etmek.',
      l_rights_2: 'Düzeltme — yanlış veya eksik bilgileri düzeltmek.',
      l_rights_3: 'Silme — hesabının ve ilişkili verilerinin silinmesini istemek. Hesabını uygulama içinden de silebilirsin.',
      l_rights_4: 'Taşınabilirlik — verilerini yapılandırılmış, makine tarafından okunabilir bir biçimde almak.',
      l_rights_5: 'İtiraz / kısıtlama — belirli işleme faaliyetlerine itiraz etmek veya bunları kısıtlamak.',
      l_rights_6: 'Onayı geri çekmek — işleme onaya dayalıysa onayını istediğin zaman geri çekebilirsin.',
      p_rights_how: 'Bu haklardan herhangi birini kullanmak için <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz. 30 gün içinde yanıt veririz. Ayrıca yerel veri koruma otoritene şikâyet hakkın vardır.',

      h_children: 'Çocuklar',
      p_children: 'Hizmet 13 yaş altı çocuklara yönelik değildir (veya yargın yetkinin gerektirdiği asgari yaşa). Bilerek çocuklardan kişisel veri toplamayız. Topladığımızı öğrenirsek derhâl sileriz.',

      h_international: 'Uluslararası Veri Aktarımları',
      p_international: 'Bilgilerin Avrupa Birliği ve Amerika Birleşik Devletleri dâhil, ikamet ettiğin ülke dışındaki ülkelerde işlenebilir. Yasanın gerektirdiği yerlerde uygun güvenceleri (standart sözleşme maddeleri gibi) uygularız.',

      h_security: 'Güvenlik',
      p_security: 'Aktarımda (TLS) ve dinlenmede şifreleme, erişim kontrolleri ve en az ayrıcalık ilkesini kullanırız. Hiçbir sistem mükemmel güvenli değildir; ancak güvenliği ciddiye alırız ve yasal olarak gerekli olan durumlarda etkilenen kullanıcıları önemli bir ihlal hâlinde bilgilendiririz.',

      h_changes: 'Bu Politikadaki Değişiklikler',
      p_changes: 'Bu Politikayı zaman zaman güncelleyebiliriz. Güncellediğimizde yukarıdaki “Yürürlük” tarihini değiştiririz ve önemli değişiklikler için seni uygulama içinden veya e-posta ile bilgilendiririz. Değişiklikler yürürlüğe girdikten sonra Hizmet’i kullanmaya devam etmen kabul anlamına gelir.',

      h_contact: 'İletişim',
      p_contact: 'Bu Politika veya verilerinle ilgili sorular için <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz.',
    },

    /* ===== Şartlar ===== */
    terms: {
      eyebrow: 'Hukuki — Şartlar',
      title: 'Kullanım Şartları',
      lede: 'Bu Şartlar; Calorie Reader AI ve Foi Digitals tarafından sağlanan diğer uygulama ve hizmetleri kullanımını düzenler. Lütfen dikkatlice oku. Hizmet’i kullanarak bu Şartları kabul etmiş olursun.',
      effective: 'Yürürlük 27 Mayıs 2026',
      version: 'v1.0',
      tocLabel: 'İçindekiler',

      h_accept: 'Şartların Kabulü',
      p_accept: 'Hizmet’i indirerek, yükleyerek veya kullanarak bu Şartları ve Gizlilik Politikamızı okuduğunu, anladığını ve bunlarla bağlı olmayı kabul ettiğini onaylıyorsun. Kabul etmiyorsan Hizmet’i kullanma.',

      h_service: 'Hizmet',
      p_service: 'Foi Digitals; öğün fotoğraflarından beslenme bilgisini tahmin eden, diyet ve aktivite verisini takip eden ve AI destekli rehberlik sunan yazılım sağlar. Hizmet “olduğu gibi” sunulur ve takdirimize bağlı olarak değiştirilebilir, askıya alınabilir veya sonlandırılabilir.',

      h_eligibility: 'Uygunluk ve Hesaplar',
      p_eligibility: 'Hizmet’i kullanmak için en az 13 yaşında olman (veya yargı yetkindeki asgari yaşta) gerekir. Hesap bilgilerini güvende tutmaktan ve hesabın altında gerçekleşen tüm aktivitelerden sen sorumlusun.',

      h_subs: 'Abonelikler ve Otomatik Yenileme',
      p_subs1: 'Hizmet; ücretli abonelikler (topluca “Calorie Reader Pro”) sunabilir. Bir abonelik satın aldığında ödeme, onay sırasında Apple ID’nden tahsil edilir. Mevcut dönemin bitiminden en az 24 saat önce otomatik yenileme kapatılmadıkça abonelik aynı süre ve fiyatla otomatik yenilenir.',
      p_subs2: 'Hesabın, mevcut dönemin bitiminden önceki 24 saat içinde yenileme için ücretlendirilir. Aboneliklerini istediğin zaman Apple ID hesap ayarlarından yönetebilir ve otomatik yenilemeyi kapatabilirsin: <strong>Ayarlar → [adın] → Abonelikler</strong>.',
      p_subs3: 'Sunulduğunda, ücretsiz denemenin kullanılmamış kısmı abonelik satın aldığında geçersiz kalır.',

      h_refunds: 'İadeler',
      p_refunds: 'Tüm ödemeler Apple tarafından işlenir. İade talepleri Apple’ın App Store politikalarına tabidir. App Store üzerinden yapılan satın almalar için iadeyi doğrudan biz veremeyiz. İade talebi için <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener">reportaproblem.apple.com</a> adresini ziyaret et.',

      h_medical: 'Tıbbi Uyarı',
      p_medical1: '<strong>Hizmet tıbbi tavsiye değildir.</strong> Kalori tahminleri ve AI tarafından üretilen yönlendirmeler bilgilendirme amaçlıdır ve yaklaşıktır. Nitelikli bir sağlık profesyoneli, kayıtlı diyetisyen veya diğer lisanslı bir uzmana danışmanın yerine geçmez.',
      p_medical2: 'Hizmet’i hastalık ya da tıbbi bir durumu teşhis etmek, tedavi etmek, iyileştirmek veya önlemek için kullanma. Yeme bozukluğu varsa, hamileysen ya da emziriyorsan, kronik bir durumun (örn. diyabet) varsa veya önemli diyet değişiklikleri düşünüyorsan, Hizmet’in çıktılarına güvenmeden önce nitelikli bir uzmana danış.',
      p_medical3: 'Tıbbi bir acil durumda derhâl yerel acil durum servislerini ara.',

      h_content: 'İçeriğin',
      p_content1: 'Gönderdiğin fotoğrafların, profil bilgilerinin ve diğer içeriğin (“İçeriğin”) mülkiyeti sende kalır.',
      p_content2: 'Hizmet’i kullanarak Foi Digitals’a, Hizmet’i sana sunmak için gereken kapsamda İçeriğini barındırmak, işlemek ve göstermek üzere dünya çapında, telif ücreti olmayan bir lisans verirsin. İçeriğini genel amaçlı AI modellerini eğitmek için kullanmıyor ve satmıyoruz.',

      h_use: 'Kabul Edilebilir Kullanım',
      p_use_lede: 'Şunları yapmamayı kabul edersin:',
      l_use_1: 'Hizmet’i hukuka aykırı bir amaçla veya geçerli herhangi bir yasayı ihlal ederek kullanmak.',
      l_use_2: 'Hizmet’in tersine mühendisliğini yapmaya, ondan kaynak kod çıkarmaya çalışmak — yasanın izin verdiği hâller hariç.',
      l_use_3: 'Hizmet’e veya temel altyapısına müdahale etmek, onu aksatmak ya da yetkisiz erişim sağlamaya çalışmak.',
      l_use_4: 'Başkalarının haklarını ihlal eden, zararlı olan ya da AI özelliklerini manipüle etmeye çalışan içerik yüklemek (prompt enjeksiyonu veya sistem talimatlarını çıkarma girişimleri dâhil).',
      l_use_5: 'Hizmet’i üçüncü taraflara tıbbi, diyetetik veya diğer profesyonel tavsiye vermek için kullanmak.',
      l_use_6: 'Önceden yazılı iznimiz olmadan Hizmet’i yeniden satmak, alt lisanslamak veya başka bir şekilde ticari olarak sömürmek.',

      h_ip: 'Fikrî Mülkiyet',
      p_ip: 'Yazılımı, tasarımı, marka işaretleri ve içerikleri (İçeriğin hariç) dâhil olmak üzere Hizmet, Foi Digitals’a aittir ve fikrî mülkiyet yasalarınca korunur. Hizmet’i kişisel, ticari olmayan amaçlarla kullanmak için sınırlı, münhasır olmayan, devredilemez, geri alınabilir bir lisans veririz.',

      h_third: 'Üçüncü Taraf Hizmetleri',
      p_third: 'Hizmet; üçüncü taraf sağlayıcılara (Apple, Google, Supabase, RevenueCat ve AI sağlayıcımız dâhil) dayanır. Bu sağlayıcıları kullanımın kendi şartlarına tabidir. Üçüncü taraf hizmetlerinin uygulamalarından, Gizlilik Politikamızda açıklananın ötesinde sorumlu değiliz.',

      h_disclaim: 'Sorumluluk Reddi',
      p_disclaim: 'Hizmet; “olduğu gibi” ve “mevcut olduğu kadar” esasıyla, satılabilirlik, belirli bir amaca uygunluk, doğruluk veya ihlal etmeme garantileri dâhil olmak üzere açık veya zımnî hiçbir garanti olmaksızın sunulur. Hizmet’in kesintisiz, hatasız olacağını ya da kalori tahminlerinin kesin olacağını garanti etmiyoruz.',

      h_liability: 'Sorumluluk Sınırı',
      p_liability: 'Yasanın izin verdiği en geniş ölçüde Foi Digitals; Hizmet’i kullanmandan ya da kullanamamandan doğan kâr, veri veya itibar kaybı dâhil herhangi bir dolaylı, arızi, özel, sonuçsal ya da cezai zarardan sorumlu olmayacaktır. Hiçbir durumda toplam sorumluluğumuz (a) talep tarihinden önceki on iki ayda bize ödediğin tutarın veya (b) 50 ABD Dolarının daha büyük olanını aşmayacaktır.',

      h_termination: 'Sonlandırma',
      p_termination: 'Hizmet’i kullanmayı bırakabilir ve hesabını istediğin zaman silebilirsin. Bu Şartları ihlal etmen ya da bunu yapmamız yasal olarak gerekli olması hâlinde erişimini askıya alabilir veya sonlandırabiliriz. Niteliği gereği sonlandırma sonrasında da geçerli kalması gereken hükümler (fikrî mülkiyet, sorumluluk reddi, sorumluluk sınırı gibi) yürürlükte kalır.',

      h_law: 'Geçerli Hukuk',
      p_law: 'Bu Şartlar; çatışan kanunlar ilkelerine bakılmaksızın Türkiye Cumhuriyeti yasalarına tabidir. Bu Şartlardan doğan veya bunlarla bağlantılı her türlü uyuşmazlık, ikamet ülkenin zorunlu tüketici koruma yasaları aksini gerektirmediği sürece İstanbul mahkemeleri ve icra dairelerinin münhasır yetkisindedir.',

      h_changes: 'Bu Şartlardaki Değişiklikler',
      p_changes: 'Bu Şartları zaman zaman revize edebiliriz. “Yürürlük” tarihini güncelleriz ve önemli değişiklikler için seni uygulama içinden veya e-posta ile bilgilendiririz. Değişiklikler yürürlüğe girdikten sonra Hizmet’i kullanmaya devam etmen kabul anlamına gelir.',

      h_contact: 'İletişim',
      p_contact: 'Bu Şartlar hakkında sorular için <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz.',
    },

    /* ===== Destek ===== */
    support: {
      eyebrow: 'Destek',
      title: 'Sorular ve Yardım',
      lede: 'Calorie Reader AI hakkında en yaygın soruların kısa rehberi. Aradığını bulamazsan bize yaz — her mesajı bir insan okur.',
      effective: 'Güncellendi 27 Mayıs 2026',
      version: 'v1.0',
      tocLabel: 'Konular',

      faq1_q: 'Calorie Reader AI nedir?',
      faq1_a: 'Calorie Reader AI; tek bir fotoğraftan öğünlerin beslenme içeriğini (kalori, protein, karbonhidrat ve yağ) tahmin eden bir iOS uygulamasıdır. AI beslenme koçu ve ilerleme takibi de içerir. Uygulama, bağımsız bir stüdyo olan Foi Digitals tarafından geliştirilmektedir.',

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
      faq6_a_p1: 'Hesabını doğrudan uygulama içinden silebilirsin: <strong>Profil → Ayarlar → Hesabı Sil</strong> sayfasını açıp onayla. Profilin, öğün geçmişin ve fotoğrafların 30 gün içinde sistemlerimizden kalıcı olarak kaldırılır.',
      faq6_a_p2: 'Uygulama içinden silmekte zorlanırsan hesabınla ilişkilendirilmiş e-posta adresinden <a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz; talebi manuel olarak işleriz.',

      faq7_q: 'Uygulama neden kamera ve fotoğraf izni istiyor?',
      faq7_a: 'Kamera izni; beslenme analizi için öğünleri fotoğraflamak amacıyla gereklidir. Fotoğraf kütüphanesi izni; yeni bir fotoğraf çekmek yerine mevcut bir öğün fotoğrafını seçebilmen içindir. Her ikisi de isteğe bağlıdır — reddetmen öğün kaydetme yeteneğini sınırlar ama diğer özellikleri engellemez. Fotoğraflarına; senin açıkça seçtiğin dışında erişmiyoruz.',

      faq8_q: 'Verilerim nasıl korunuyor?',
      faq8_a: 'Tüm veriler aktarımda (TLS) ve dinlenmede şifrelenir. Fotoğraflar hesabın altında saklanır; diğer kullanıcılarla paylaşılmaz ve genel amaçlı AI modellerini eğitmek için kullanılmaz. Tüm ayrıntıları <a href="privacy.html">Gizlilik Politikamızda</a> inceleyebilirsin.',

      faq9_q: 'Destekle nasıl iletişime geçerim?',
      faq9_a: '<a href="mailto:foidigitals@gmail.com">foidigitals@gmail.com</a> adresine yaz. Lütfen cihaz modelini, iOS sürümünü ve sorunun kısa bir açıklamasını ekle. Genellikle 2–3 iş günü içinde yanıt veririz.',

      cta_heading: 'Hâlâ yardıma mı ihtiyacın var?',
      cta_body: 'Bize bir not gönder. Her mesajı yanıtlıyoruz.',
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
}

function applyTranslations() {
  // Text content
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const value = resolveKey(_lang, key);
    if (value != null) el.textContent = value;
  });

  // HTML content (allowed only for our own translations)
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    const value = resolveKey(_lang, key);
    if (value != null) el.innerHTML = value;
  });

  // Attributes — format: "attr1:key.path,attr2:other.key"
  document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
    const spec = el.getAttribute('data-i18n-attr');
    spec.split(',').forEach((pair) => {
      const [attr, key] = pair.split(':').map((s) => s.trim());
      const value = resolveKey(_lang, key);
      if (value != null) el.setAttribute(attr, value);
    });
  });

  // Page title via meta key
  const titleKey = document.documentElement.getAttribute('data-i18n-title');
  if (titleKey) {
    const titleValue = resolveKey(_lang, titleKey);
    if (titleValue) document.title = titleValue;
  }

  // Meta description
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
