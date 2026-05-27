/* ============================================================
   Foi Digitals — Interactivity v2
   - Hero word-by-word reveal
   - Sticky header scroll-morph
   - Mobile menu
   - Scroll reveal (IntersectionObserver)
   - Capability card pointer tracking (for radial glow)
   - Re-runs hero animation when language toggles
   ============================================================ */

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.site-nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Sticky header morph on scroll ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 16);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Scroll reveal ---------- */
  const targets = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- Capability card pointer tracking (radial glow follows cursor) ---------- */
  const capCards = document.querySelectorAll('.cap-card');
  if (!reduceMotion) {
    capCards.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
      });
    });
  }

  /* ---------- Hero word-by-word reveal ---------- */
  function splitAndRevealHero() {
    if (reduceMotion) return;
    const titleEl = document.querySelector('.hero-title');
    if (!titleEl) return;

    // Walk text nodes and wrap each word, preserving inline elements (e.g. <em>).
    const wrapWords = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        const parts = node.textContent.split(/(\s+)/);
        parts.forEach((part) => {
          if (/\s+/.test(part) || part === '') {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement('span');
            span.className = 'split-word';
            span.textContent = part;
            frag.appendChild(span);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Recurse into children, snapshot first since we mutate
        const children = Array.from(node.childNodes);
        children.forEach(wrapWords);
      }
    };

    // Reset any prior wraps (when language changes)
    titleEl.querySelectorAll('.split-word').forEach((w) => {
      w.replaceWith(document.createTextNode(w.textContent));
    });
    titleEl.normalize();

    wrapWords(titleEl);

    // Stagger animation delays
    const words = titleEl.querySelectorAll('.split-word');
    words.forEach((w, i) => {
      w.style.animationDelay = `${0.1 + i * 0.06}s`;
    });
  }

  splitAndRevealHero();

  // Re-run hero animation when language changes (text content gets replaced)
  document.addEventListener('foi:lang-changed', () => {
    // Wait a tick so i18n has updated the DOM
    setTimeout(splitAndRevealHero, 0);
  });

  /* ---------- Current nav link marker ---------- */
  const here = location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    const target = href.split('/').pop().split('#')[0] || 'index.html';
    if (target === here) a.setAttribute('aria-current', 'page');
  });

  /* ---------- Footer year stamp ---------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
