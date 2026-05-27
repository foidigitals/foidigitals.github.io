/* ============================================================
   FOI DIGITALS — main.js
   Vanilla JS. No build step. GitHub Pages-friendly.
   ============================================================ */

(function () {
  "use strict";

  const $  = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Header scroll state -------------------------------- */
  const header = $("#siteHeader");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile menu --------------------------------------- */
  const menuBtn = $("#menuBtn");
  const drawer  = $("#mobileDrawer");
  const closeBtn = $("#closeMenuBtn");
  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "true");
  };
  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (menuBtn) menuBtn.setAttribute("aria-expanded", "false");
  };
  if (menuBtn) menuBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (drawer) {
    $$("a", drawer).forEach(a => a.addEventListener("click", closeDrawer));
  }
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeDrawer();
  });

  /* ---- Reveal-on-scroll (IntersectionObserver) ------------ */
  const reveals = $$(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("is-visible"));
  }

  /* ---- Bento card mouse spotlight ------------------------ */
  if (!prefersReducedMotion) {
    $$(".bento-card, .service-card").forEach(card => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${e.clientX - r.left}px`);
        card.style.setProperty("--my", `${e.clientY - r.top}px`);
      });
    });
  }

  /* ---- 3D tilt on Calorie Reader logo --------------------- */
  if (!prefersReducedMotion) {
    const logo = $("#featuredLogo");
    const wrap = logo ? logo.parentElement : null;
    if (logo && wrap) {
      const maxTilt = 12;
      wrap.addEventListener("pointermove", (e) => {
        const r = wrap.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = (e.clientX - cx) / (r.width / 2);
        const dy = (e.clientY - cy) / (r.height / 2);
        logo.style.setProperty("--ry", `${dx * maxTilt}deg`);
        logo.style.setProperty("--rx", `${-dy * maxTilt}deg`);
      });
      wrap.addEventListener("pointerleave", () => {
        logo.style.setProperty("--ry", `-8deg`);
        logo.style.setProperty("--rx", `6deg`);
      });
    }
  }

  /* ---- Hero subtle parallax on compass + mouse-tracked ---- */
  if (!prefersReducedMotion) {
    const compass = $(".compass");
    const hero    = $(".hero");
    if (compass && hero) {
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect();
        const dx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
        const dy = ((e.clientY - r.top)  / r.height - 0.5) * 2;
        compass.style.transform = `translate(calc(-50% + ${dx * 18}px), calc(-50% + ${dy * 14}px))`;
      });
      hero.addEventListener("pointerleave", () => {
        compass.style.transform = "translate(-50%, -50%)";
      });
    }
  }

  /* ---- Hero headline letter-by-letter reveal -------------- */
  function splitHeroTitle() {
    const title = $(".hero-title");
    if (!title || prefersReducedMotion) return;

    // If we already wrapped chars, restore from cached HTML first.
    if (title.dataset.fullHtml && title.querySelector(".reveal-char")) {
      title.innerHTML = title.dataset.fullHtml;
    } else {
      title.dataset.fullHtml = title.innerHTML;
    }

    // Walk text nodes, wrap each character (preserve spaces and tags like <em>, <br>).
    let counter = 0;
    const wrapTextNode = (textNode) => {
      const text = textNode.textContent;
      if (!text) return;
      const frag = document.createDocumentFragment();
      for (const ch of text) {
        if (ch === " " || ch === "\n") {
          frag.appendChild(document.createTextNode(ch === "\n" ? " " : " "));
        } else {
          const span = document.createElement("span");
          span.className = "reveal-char";
          span.textContent = ch;
          span.style.setProperty("--d", `${counter * 35 + 150}ms`);
          counter++;
          frag.appendChild(span);
        }
      }
      textNode.parentNode.replaceChild(frag, textNode);
    };

    const walk = (node) => {
      const kids = Array.from(node.childNodes);
      kids.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          wrapTextNode(child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          if (child.tagName === "BR") return;
          walk(child);
        }
      });
    };

    walk(title);
  }

  // Initial split — wait for next frame so i18n (if same-tick) gets to apply first.
  requestAnimationFrame(() => requestAnimationFrame(splitHeroTitle));

  // Re-split when language changes (i18n.js dispatches 'foi:lang-changed').
  document.addEventListener("foi:lang-changed", () => {
    requestAnimationFrame(() => requestAnimationFrame(splitHeroTitle));
  });

  /* ---- Smooth-scroll for hash links ---------------------- */
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (href === "#" || href.length < 2) return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    });
  });

  /* ---- Year tag (if present) ---------------------- */
  const year = new Date().getFullYear();
  $$("[data-year]").forEach(el => { el.textContent = year; });

})();
