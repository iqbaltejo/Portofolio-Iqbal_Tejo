/* ============================================================
   JS SECTION 0 — ACCORDION TOGGLE
   Handle collapsible accordion items
============================================================ */
function toggleAccordion(btn) {
  const item = btn.closest('.accordion-item');
  const body = item.querySelector('.accordion-body');

  // Close all other items
  document.querySelectorAll('.accordion-body.active').forEach(b => {
    if (b !== body) {
      b.classList.remove('active');
      b.closest('.accordion-item').querySelector('.accordion-header').classList.remove('active');
    }
  });

  // Toggle current item
  btn.classList.toggle('active');
  body.classList.toggle('active');
}

/* ============================================================
   JS SECTION A — SCROLL PROGRESS BAR
   Updates a CSS width on the thin top bar as the user scrolls.
============================================================ */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  function updateProgress() {
    const scrollTop  = window.scrollY || document.documentElement.scrollTop;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width  = pct + '%';
    bar.setAttribute('aria-valuenow', Math.round(pct));
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress(); // initialise
})();


/* ============================================================
   JS SECTION B — SCROLL-REVEAL OBSERVER
   Adds .revealed to any .reveal element once it enters viewport.
============================================================ */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
})();


/* ============================================================
   JS SECTION C — ANIMATED KPI COUNTERS
   Reads data-target (number) and data-suffix from each
   .metric-value element, then animates from 0 on first view.
============================================================ */
(function initCounters() {
  const counters = document.querySelectorAll('.metric-value[data-target]');
  if (!counters.length) return;

  function easeOutQuad(t) { return t * (2 - t); }

  function animateCounter(el) {
    const target  = parseFloat(el.dataset.target);
    const suffix  = el.dataset.suffix || '';
    const duration = 1400; // ms
    const start   = performance.now();

    if (target === 0) {
      el.textContent = '0' + suffix;
      return;
    }

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased    = easeOutQuad(progress);
      const current  = target * eased;

      const formatted = Number.isInteger(target)
        ? Math.round(current).toLocaleString()
        : current.toFixed(2);

      el.textContent = formatted + suffix;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => obs.observe(el));
})();


/* ============================================================
   JS SECTION D — GALLERY LIGHTBOX
   Handles opening, closing, navigation (prev/next + keyboard),
   backdrop click to close, and swipe gesture on touch screens.
============================================================ */
(function initLightbox() {
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightboxImg');
  const lightboxCap  = document.getElementById('lightboxCaption');
  const closeBtn     = document.getElementById('lightboxClose');
  const prevBtn      = document.getElementById('lightboxPrev');
  const nextBtn      = document.getElementById('lightboxNext');

  if (!lightbox || !lightboxImg) return;

  const galleryItems = Array.from(
    document.querySelectorAll('.gallery-item[data-src]')
  );

  let currentIndex = 0;
  let previousFocus = null;

  function openLightbox(index) {
    currentIndex  = index;
    previousFocus = document.activeElement;

    const item    = galleryItems[currentIndex];
    lightboxImg.src = item.dataset.src;
    lightboxImg.alt = item.querySelector('img')?.alt || '';
    lightboxCap.textContent = item.dataset.caption || '';

    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    closeBtn.focus();
    updateNavVisibility();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    if (previousFocus) previousFocus.focus();

    setTimeout(() => {
      lightboxImg.src = '';
      lightboxImg.alt = '';
    }, 350);
  }

  function showImage(index) {
    if (index < 0 || index >= galleryItems.length) return;
    currentIndex = index;
    const item = galleryItems[currentIndex];

    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.96)';

    setTimeout(() => {
      lightboxImg.src = item.dataset.src;
      lightboxImg.alt = item.querySelector('img')?.alt || '';
      lightboxCap.textContent = item.dataset.caption || '';

      lightboxImg.style.opacity  = '1';
      lightboxImg.style.transform = 'scale(1)';
      updateNavVisibility();
    }, 180);
  }

  function updateNavVisibility() {
    prevBtn.style.display = currentIndex === 0 ? 'none' : '';
    nextBtn.style.display = currentIndex === galleryItems.length - 1 ? 'none' : '';
  }

  lightboxImg.style.transition = 'opacity 180ms ease, transform 180ms ease';

  galleryItems.forEach((item, idx) => {
    item.addEventListener('click', () => openLightbox(idx));

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(idx);
      }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
  nextBtn.addEventListener('click', () => showImage(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;

    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        showImage(currentIndex - 1);
        break;
      case 'ArrowRight':
        showImage(currentIndex + 1);
        break;
    }
  });

  let touchStartX = 0;
  const SWIPE_THRESHOLD = 50;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;

    if (delta < 0) {
      showImage(currentIndex + 1);
    } else {
      showImage(currentIndex - 1);
    }
  }, { passive: true });
})();