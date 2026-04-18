/* ═══════════════════════════════════════════════════════════
   WRESTLEFLIX — Shared JS
   Include: <script src="js/wf.js"></script> before </body>
   ═══════════════════════════════════════════════════════════ */

/* ── Navbar scroll solidify ── */
(function() {
  const nav = document.querySelector('.wf-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('solid', window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* ── Image lazy-load with fade-in ── */
(function() {
  const imgs = document.querySelectorAll('.wf-img-el');
  if (!imgs.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const img = e.target;
      if (img.dataset.src) img.src = img.dataset.src;
      img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
      if (img.complete && img.naturalWidth) img.classList.add('loaded');
      obs.unobserve(img);
    });
  }, { rootMargin: '200px' });
  imgs.forEach(img => {
    if (img.src && img.src !== window.location.href) {
      if (img.complete && img.naturalWidth) { img.classList.add('loaded'); return; }
      img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
    }
    obs.observe(img);
  });
})();

/* ── Row scroll arrows + fade edges ── */
(function() {
  document.querySelectorAll('.wf-row-wrap').forEach(wrap => {
    const row  = wrap.querySelector('.wf-row');
    const prev = wrap.querySelector('.wf-row-arrow.prev');
    const next = wrap.querySelector('.wf-row-arrow.next');
    if (!row) return;

    const STEP = 600;

    const update = () => {
      const atLeft  = row.scrollLeft <= 4;
      const atRight = row.scrollLeft >= row.scrollWidth - row.clientWidth - 4;
      wrap.classList.toggle('can-left',  !atLeft);
      wrap.classList.toggle('can-right', !atRight);
      if (prev) { prev.style.opacity = atLeft  ? '0' : ''; prev.style.pointerEvents = atLeft  ? 'none' : ''; }
      if (next) { next.style.opacity = atRight ? '0' : ''; next.style.pointerEvents = atRight ? 'none' : ''; }
    };

    row.addEventListener('scroll', update, { passive: true });
    if (prev) prev.addEventListener('click', () => row.scrollBy({ left: -STEP, behavior: 'smooth' }));
    if (next) next.addEventListener('click', () => row.scrollBy({ left:  STEP, behavior: 'smooth' }));
    update();

    // ResizeObserver to re-check after layout shifts
    new ResizeObserver(update).observe(row);
  });
})();

/* ── Hero rotation ── */
(function() {
  const slides = document.querySelectorAll('.wf-hero-slide');
  const dots   = document.querySelectorAll('.wf-hero-dot');
  if (slides.length < 2) return;

  let current = 0;
  let timer;

  const go = (idx) => {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  };

  const start = () => {
    clearInterval(timer);
    timer = setInterval(() => go(current + 1), 8000);
  };

  dots.forEach((dot, i) => dot.addEventListener('click', () => { go(i); start(); }));

  // Pause on hover
  const heroEl = document.querySelector('.wf-hero');
  if (heroEl) {
    heroEl.addEventListener('mouseenter', () => clearInterval(timer));
    heroEl.addEventListener('mouseleave', start);
  }

  start();
})();

/* ── Build row arrows automatically if not present ── */
(function() {
  const SVG_PREV = `<svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>`;
  const SVG_NEXT = `<svg viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>`;

  document.querySelectorAll('.wf-row-wrap').forEach(wrap => {
    if (!wrap.querySelector('.wf-row-arrow')) {
      const p = document.createElement('button');
      p.className = 'wf-row-arrow prev'; p.innerHTML = SVG_PREV; p.setAttribute('aria-label','Scroll left');
      const n = document.createElement('button');
      n.className = 'wf-row-arrow next'; n.innerHTML = SVG_NEXT; n.setAttribute('aria-label','Scroll right');
      wrap.appendChild(p);
      wrap.appendChild(n);
    }
  });
})();
