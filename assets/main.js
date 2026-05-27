/* ============================================================
   Foi Digitals — Interactivity v3
   - Custom cursor (dot + ring) with hover state for links
   - Magnetic buttons
   - Sticky header morph + hide-on-scroll-down
   - Scroll reveal (IntersectionObserver)
   - Bento card pointer-tracked radial highlight
   - Hero word-by-word reveal (with re-run on lang change)
   - Marquee duplication for seamless loop
   ============================================================ */

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Custom cursor ---------- */
  if (isFinePointer && !reduceMotion) {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot is-hidden';
    const ring = document.createElement('div');
    ring.className = 'cursor-ring is-hidden';
    document.body.append(dot, ring);
    document.body.classList.add('has-custom-cursor');

    let dx = window.innerWidth / 2, dy = window.innerHeight / 2;
    let rx = dx, ry = dy;
    let tx = dx, ty = dy;
    let hovering = false;

    window.addEventListener('pointermove', (e) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.classList.remove('is-hidden');
      ring.classList.remove('is-hidden');
    });

    window.addEventListener('pointerleave', () => {
      dot.classList.add('is-hidden');
      ring.classList.add('is-hidden');
    });

    const interactive = 'a, button, [role="button"], .bento-card, .next-card, .app-feature, .faq-item';
    document.addEventListener('pointerover', (e) => {
      if (e.target.closest(interactive)) {
        ring.classList.add('is-link');
        hovering = true;
      }
    });
    document.addEventListener('pointerout', (e) => {
      if (e.target.closest(interactive) && !e.relatedTarget?.closest(interactive)) {
        ring.classList.remove('is-link');
        hovering = false;
      }
    });

    const tick = () => {
      // Dot — snappy
      dx += (tx - dx) * 0.65;
      dy += (ty - dy) * 0.65;
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      // Ring — laggy follow
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Magnetic buttons ---------- */
  if (isFinePointer && !reduceMotion) {
    const magnets = document.querySelectorAll('.btn, .magnetic');
    magnets.forEach((el) => {
      const strength = 0.35;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
      el.addEventListener('pointerleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  /* ---------- Header morph + hide-on-scroll-down ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    let lastY = 0;
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 12);
      if (y > 80) {
        header.classList.toggle('is-hidden', y > lastY);
      } else {
        header.classList.remove('is-hidden');
      }
      lastY = y;
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });
  }

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
      { threshold: 0.12, rootMargin: '0px 0px -5% 0px' }
    );
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- Bento card pointer tracking ---------- */
  if (!reduceMotion && isFinePointer) {
    document.querySelectorAll('.bento-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    });
  }

  /* ---------- Hero word-by-word reveal ---------- */
  function splitAndRevealHero() {
    if (reduceMotion) return;
    const titleEl = document.querySelector('.hero-title');
    if (!titleEl) return;

    // Unwrap any previous wrappers (when language changes mid-session)
    titleEl.querySelectorAll('.word').forEach((w) => {
      w.replaceWith(document.createTextNode(w.textContent));
    });
    titleEl.normalize();

    const wrap = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (/\s+/.test(part) || part === '') {
            frag.appendChild(document.createTextNode(part));
          } else {
            const word = document.createElement('span');
            word.className = 'word';
            const inner = document.createElement('span');
            inner.textContent = part;
            word.appendChild(inner);
            frag.appendChild(word);
          }
        });
        node.parentNode.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(wrap);
      }
    };

    Array.from(titleEl.childNodes).forEach(wrap);

    titleEl.querySelectorAll('.word > span').forEach((s, i) => {
      s.style.animationDelay = `${0.08 + i * 0.07}s`;
    });
  }

  splitAndRevealHero();
  document.addEventListener('foi:lang-changed', () => {
    setTimeout(splitAndRevealHero, 0);
  });

  /* ---------- Marquee — duplicate content for seamless loop ---------- */
  document.querySelectorAll('.marquee-track').forEach((track) => {
    const clone = track.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.parentNode.appendChild(clone);
    // Wrap pair so animation moves both as one
  });
  // Combine pairs into single tracks
  document.querySelectorAll('.marquee').forEach((m) => {
    const tracks = m.querySelectorAll('.marquee-track');
    if (tracks.length === 2) {
      const wrapper = document.createElement('div');
      wrapper.className = 'marquee-track';
      wrapper.style.animation = getComputedStyle(tracks[0]).animation;
      while (tracks[0].firstChild) wrapper.appendChild(tracks[0].firstChild);
      while (tracks[1].firstChild) wrapper.appendChild(tracks[1].firstChild);
      tracks[0].remove();
      tracks[1].remove();
      m.appendChild(wrapper);
    }
  });

  /* ---------- Featured visual gentle parallax on scroll ---------- */
  const featuredLogo = document.querySelector('.featured-logo');
  if (featuredLogo && !reduceMotion) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = featuredLogo.getBoundingClientRect();
          const center = rect.top + rect.height / 2;
          const offset = (window.innerHeight / 2 - center) * 0.08;
          featuredLogo.style.setProperty('--scroll-y', `${offset}px`);
          featuredLogo.style.translate = `0 ${offset * 0.5}px`;
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Mark current nav link ---------- */
  const here = location.pathname.replace(/\/$/, '').split('/').pop() || 'index.html';
  document.querySelectorAll('.site-nav a[href]').forEach((a) => {
    const target = a.getAttribute('href').split('/').pop().split('#')[0] || 'index.html';
    if (target === here) a.setAttribute('aria-current', 'page');
  });

  /* ---------- Hydrate nav link "swap on hover" data-text ---------- */
  document.querySelectorAll('.site-nav a').forEach((a) => {
    const span = a.querySelector('span');
    if (span && !a.hasAttribute('data-text')) {
      a.setAttribute('data-text', span.textContent);
    }
  });

  // Keep data-text in sync after i18n updates
  document.addEventListener('foi:lang-changed', () => {
    setTimeout(() => {
      document.querySelectorAll('.site-nav a').forEach((a) => {
        const span = a.querySelector('span');
        if (span) a.setAttribute('data-text', span.textContent);
      });
    }, 0);
  });
})();
