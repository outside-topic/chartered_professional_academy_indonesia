/* =========================================================
   CPA INDONESIA — HOMEPAGE SCRIPTS
   Section-wise organized. Safe to keep in this single file
   or move to an external file as-is (no inline JS used).

   1. GLOBAL HELPERS
   2. ANNOUNCEMENT BAR JS
   3. NAVIGATION JS
   4. HERO SECTION JS
   5. SCROLL REVEAL JS
   6. FORMS JS
   7. BACK TO TOP JS
========================================================= */

'use strict';

/* =========================
   1. GLOBAL HELPERS
========================= */

// Flags JS availability (used by CSS reveal styles).
document.documentElement.classList.add('js');

// Shared reduced-motion preference (respects user settings).
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* =========================
   2. ANNOUNCEMENT BAR JS
   Rotates the three suggested announcement
   messages. Pauses on hover / keyboard focus.
========================= */
(function () {
  const bar = document.querySelector('.topbar');
  const slides = document.querySelectorAll('#topbarMessage .topbar-slide');
  if (!bar || !slides.length) return;

  const ROTATE_MS = 4600;
  let current = 0;
  let timer = null;

  function goTo(nextIndex) {
    slides[current].classList.remove('is-active');
    current = (nextIndex + slides.length) % slides.length;
    slides[current].classList.add('is-active');
  }

  function startRotation() {
    if (prefersReducedMotion || slides.length < 2) return;
    stopRotation();
    timer = window.setInterval(function () {
      goTo(current + 1);
    }, ROTATE_MS);
  }

  function stopRotation() {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  }

  bar.addEventListener('mouseenter', stopRotation);
  bar.addEventListener('mouseleave', startRotation);
  bar.addEventListener('focusin', stopRotation);
  bar.addEventListener('focusout', startRotation);

  startRotation();
})();


/* =========================
   3. NAVIGATION JS
   - Sticky header scrolled state.
   - Closes the mobile menu after a link is used.
   - Prevents page jump for placeholder "#" links.
========================= */
(function () {

  // Sticky header shadow on scroll
  const header = document.getElementById('siteHeader');
  if (header) {
    const onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Close collapsed mobile menu after choosing a link
  const navCollapse = document.getElementById('mainNav');
  if (navCollapse && typeof bootstrap !== 'undefined') {
    navCollapse.addEventListener('click', function (event) {
      const link = event.target.closest('a');
      if (!link) return;
      const isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
      if (!isDesktop && navCollapse.classList.contains('show')) {
        const instance =
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false });
        instance.hide();
      }
    });
  }

  // Placeholder links ("#") should not jump the page
  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      event.preventDefault();
    });
  });
})();


/* =========================
   4. HERO SECTION JS
   Front-end search behaviour: keeps focus in the
   field. Connect to the backend search later.
========================= */
(function () {
  const form = document.querySelector('.hero-search');
  if (!form) return;

  const input = form.querySelector('input[type="search"]');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!input) return;

    if (!input.value.trim()) {
      input.focus();
      return;
    }
    // Backend search is not connected in this template.
    input.select();
  });
})();


/* =========================
   5. SCROLL REVEAL JS
   Adds .is-visible when .reveal elements enter
   the viewport. Falls back gracefully.
========================= */
(function () {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const showAll = function () {
    items.forEach(function (el) {
      el.classList.add('is-visible');
    });
  };

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) {
    observer.observe(el);
  });
})();


/* =========================
   6. FORMS JS
   Newsletter subscribe — front-end only.
   Wire the submission endpoint later.
========================= */
(function () {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  const input = form.querySelector('input[type="email"]');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!input) return;

    const isValid = input.checkValidity() && input.value.trim() !== '';
    if (!isValid) {
      input.focus();
      return;
    }
    // Backend subscription is not connected in this template.
    form.reset();
  });
})();


/* =========================
   7. BACK TO TOP JS
   Smooth scroll back to the top of the page.
========================= */
(function () {
  const button = document.getElementById('backToTop');
  if (!button) return;

  button.addEventListener('click', function (event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth'
    });
  });
})();






// About js start





/* =========================================================
   ABOUT CPA INDONESIA — PAGE SCRIPT (about.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with the site-wide script.js (no shared
     globals, no redeclaration errors).

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the about-cpa- hook and
   never conflicts with the global .reveal observer.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('about-cpa-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .about-cpa-reveal blocks as they enter the
     viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.about-cpa-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] BACK TO TOP JS
     Smooth scroll back to the top of the page.
  ========================= */
  (function backToTop() {
    var button = document.getElementById('backToTop');
    if (!button) return;
    button.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  })();

})();








// purpose vision and mission








/* =========================================================
   PURPOSE, VISION, MISSION & VALUES — PAGE SCRIPT (pvm.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or about.js
     (About) — no shared globals, no redeclaration errors.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the pvm- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('pvm-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .pvm-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.pvm-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();

  /* =========================
     [SHARED] BACK TO TOP JS
     Smooth scroll back to the top of the page.
  ========================= */
  (function backToTop() {
    var button = document.getElementById('backToTop');
    if (!button) return;
    button.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  })();

})();









// Governance Quality and Standards






/* =========================================================
   GOVERNANCE, QUALITY & STANDARDS — PAGE SCRIPT (gqs.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home), about.js (About)
     or pvm.js (PVM) — no shared globals, no redeclaration.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the gqs- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('gqs-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .gqs-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.gqs-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();

  /* =========================
     [SHARED] BACK TO TOP JS
     Smooth scroll back to the top of the page.
  ========================= */
  (function backToTop() {
    var button = document.getElementById('backToTop');
    if (!button) return;
    button.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  })();

})();









// Why Choose Us









/* =========================================================
   WHY CHOOSE CPA INDONESIA — PAGE SCRIPT (wcc.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home), about.js (About),
     pvm.js (PVM) or gqs.js (GQS) — no shared globals.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the wcc- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('wcc-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .wcc-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.wcc-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();

  /* =========================
     [SHARED] BACK TO TOP JS
     Smooth scroll back to the top of the page.
  ========================= */
  (function backToTop() {
    var button = document.getElementById('backToTop');
    if (!button) return;
    button.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  })();

})();







// Professioanl Certifications









/* =========================================================
   PROFESSIONAL CERTIFICATIONS — PAGE SCRIPT (pcert.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home), about.js, pvm.js,
     gqs.js or wcc.js — no shared globals.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the pcert- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('pcert-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .pcert-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.pcert-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();

  /* =========================
     [SHARED] BACK TO TOP JS
     Smooth scroll back to the top of the page.
  ========================= */
  (function backToTop() {
    var button = document.getElementById('backToTop');
    if (!button) return;
    button.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  })();

})();









// Certification Areas







/* =========================================================
   CERTIFICATION AREAS — PAGE SCRIPT (carea.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home), about.js, pvm.js,
     gqs.js, wcc.js or pcert.js — no shared globals.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the carea- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('carea-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .carea-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.carea-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();




})();









// Certification Pathway







/* =========================================================
   CERTIFICATION PATHWAY — PAGE SCRIPT (cpath.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home), about.js, pvm.js,
     gqs.js, wcc.js, pcert.js or carea.js — no shared globals.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the cpath- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('cpath-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .cpath-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.cpath-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();




})();








// Assessment and Certification Standards








/* =========================================================
   ASSESSMENT AND CERTIFICATION STANDARDS — PAGE SCRIPT (acs.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath) —
     no shared globals, no redeclaration errors.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the acs- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('acs-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .acs-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.acs-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();




})();









// Certification Renewal and CPD






/* =========================================================
   CERTIFICATION RENEWAL & CPD — PAGE SCRIPT (crcpd.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs)
     — no shared globals, no redeclaration errors.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the crcpd- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('crcpd-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .crcpd-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.crcpd-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();




})();







// Certification Faq






/* =========================================================
   CERTIFICATION FREQUENTLY ASKED QUESTIONS — PAGE SCRIPT (cfq.js)

   • No inline JavaScript is used anywhere in the page.
   • FAQ expand/collapse is handled entirely by Bootstrap 5's
     native accordion (data-bs-toggle) — no custom accordion
     logic is required.
   • Everything is wrapped in ONE IIFE, so this file can never
     collide with script.js (Home) or any other page script
     (about, pvm, gqs, wcc, pcert, carea, cpath, acs, crcpd).

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   sections — they use the cfq- hook and never conflict with
   the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('cfq-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .cfq-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.cfq-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =========================
     ACCORDION OPEN-STATE JS  (page-specific)
     Bootstrap handles the expand/collapse and all ARIA
     attributes. This small block only mirrors the open state
     onto .cfq-item (via .is-open) so the card border/shadow
     can respond visually. If JS is unavailable the accordion
     still works — the card simply keeps its default border.
  ========================= */
  (function accordionOpenState() {
    var items = document.querySelectorAll('.cfq-item');
    if (!items.length) return;

    items.forEach(function (item) {
      var collapse = item.querySelector('.accordion-collapse');
      if (!collapse || typeof bootstrap === 'undefined') return;

      // Reflect state immediately (before the animation).
      collapse.addEventListener('show.bs.collapse', function () {
        item.classList.add('is-open');
      });
      collapse.addEventListener('hide.bs.collapse', function () {
        item.classList.remove('is-open');
      });

      // Sync the initial state (in case any item starts open).
      if (collapse.classList.contains('show')) {
        item.classList.add('is-open');
      }
    });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();





// Professional Membership








/* =========================================================
   PROFESSIONAL MEMBERSHIP — PAGE SCRIPT (pmem.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq) — no shared globals, no redeclaration errors.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the pmem- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('pmem-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .pmem-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.pmem-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();



// Memerbship Catageories




/* =========================================================
   MEMBERSHIP CATEGORIES — PAGE SCRIPT (mcat.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem) — no shared globals.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the mcat- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('mcat-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .mcat-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.mcat-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();






// Membership Benifits





/* =========================================================
   MEMBERSHIP BENEFITS — PAGE SCRIPT (mben.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat) — no shared globals.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the mben- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('mben-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .mben-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.mben-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();





// How to join 






/* =========================================================
   HOW TO JOIN — PAGE SCRIPT (howjoin.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben) — no shared globals.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the howjoin- hook and
   never conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('howjoin-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .howjoin-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.howjoin-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();






// CPD Stort






/* =========================================================
   CONTINUING PROFESSIONAL DEVELOPMENT — PAGE SCRIPT (cpd.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin) — no shared globals.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the cpd- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('cpd-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .cpd-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.cpd-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();






// Corporate Trainning Solutions






/* =========================================================
   CORPORATE LEARNING SOLUTIONS — PAGE SCRIPT (cls.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc) — no
     shared globals, no redeclaration errors.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the cls- hook and never
   conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('cls-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .cls-reveal blocks as they enter the viewport.
     Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.cls-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();

})();







// Customized Trainning






/* =========================================================
   CUSTOMIZED TRAINING — PAGE SCRIPT (custom-training.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc, cls)
     — no shared globals, no redeclaration errors.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the custom-training- hook
   and never conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('custom-training-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .custom-training-reveal blocks as they enter the
     viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.custom-training-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();




// functional Academies




/* =========================================================
   FUNCTIONAL ACADEMIES — PAGE SCRIPT (functional-academies.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc, cls,
     custom-training) — no shared globals, no redeclaration.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the functional-academies-
   hook and never conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('functional-academies-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .functional-academies-reveal blocks as they enter
     the viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.functional-academies-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();

})();







// Leadership Developement






/* =========================================================
   LEADERSHIP DEVELOPMENT — PAGE SCRIPT (leadership-development.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc, cls,
     custom-training, functional-academies) — no shared globals.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the leadership-development-
   hook and never conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('leadership-development-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .leadership-development-reveal blocks as they
     enter the viewport. Falls back to fully visible without
     JS or IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.leadership-development-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();






// Delivery adn Evaluation Approch






/* =========================================================
   DELIVERY AND EVALUATION APPROACH — PAGE SCRIPT
   (delivery-evaluation.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc, cls,
     custom-training, functional-academies,
     leadership-development) — no shared globals.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the delivery-evaluation-
   hook and never conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('delivery-evaluation-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .delivery-evaluation-reveal blocks as they enter
     the viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.delivery-evaluation-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();





// Request a corporate Trainning proposal




/* =========================================================
   REQUEST A CORPORATE TRAINING PROPOSAL — PAGE SCRIPT
   (corporate-proposal.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc, cls,
     custom-training, functional-academies,
     leadership-development, delivery-evaluation) — no
     shared globals, no redeclaration errors.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   sections — they use the corporate-proposal- hook and
   never conflict with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('corporate-proposal-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .corporate-proposal-reveal blocks as they enter
     the viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.corporate-proposal-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =========================
     PROPOSAL REQUEST INTERACTION (page-specific)

     The document specifies the form fields but no backend
     submission endpoint. This handler therefore only stops
     native form navigation so the page does not reload with
     query data — it does NOT simulate a submission or show a
     fabricated confirmation. Connect a real endpoint here
     when the backend becomes available.
  ========================= */
  (function formGuard() {
    var form = document.getElementById('corporateProposalForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();



})();






// Individual profesional Developement





/* =========================================================
   INDIVIDUAL PROFESSIONAL DEVELOPMENT — PAGE SCRIPT
   (individual-development.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc, cls,
     custom-training, functional-academies,
     leadership-development, delivery-evaluation,
     corporate-proposal) — no shared globals.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the individual-development-
   hook and never conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('individual-development-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .individual-development-reveal blocks as they
     enter the viewport. Falls back to fully visible without
     JS or IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.individual-development-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();

  /* =========================
     [SHARED] BACK TO TOP JS
     Smooth scroll back to the top of the page.
  ========================= */
  (function backToTop() {
    var button = document.getElementById('backToTop');
    if (!button) return;
    button.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });
  })();

})();





// Short Courses start






/* =========================================================
   SHORT COURSES — PAGE SCRIPT (short-courses.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc, cls,
     custom-training, functional-academies,
     leadership-development, delivery-evaluation,
     corporate-proposal, individual-development) — no shared
     globals, no redeclaration errors.

   • No course filtering is added: the document lists no
     individual courses, so there is nothing to filter.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the short-courses- hook
   and never conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('short-courses-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .short-courses-reveal blocks as they enter the
     viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.short-courses-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();




// Executive Learning




/* =========================================================
   EXECUTIVE LEARNING — PAGE SCRIPT (executive-learning.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc, cls,
     custom-training, functional-academies,
     leadership-development, delivery-evaluation,
     corporate-proposal, individual-development,
     short-courses, professional-masterclasses) — no shared
     globals, no redeclaration errors.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the executive-learning-
   hook and never conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('executive-learning-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .executive-learning-reveal blocks as they enter
     the viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.executive-learning-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();

})();





// Learning Calender



/* =========================================================
   LEARNING CALENDAR — PAGE SCRIPT (learning-calendar.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc, cls,
     custom-training, functional-academies,
     leadership-development, delivery-evaluation,
     corporate-proposal, individual-development,
     short-courses, professional-masterclasses,
     executive-learning, career-development-pathways) — no
     shared globals, no redeclaration errors.

   • No filtering/search JavaScript is added: the document
     defines the filter FIELDS for the calendar but lists no
     actual events to filter.

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the learning-calendar-
   hook and never conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('learning-calendar-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .learning-calendar-reveal blocks as they enter
     the viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.learning-calendar-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();





// Professional Resources



/* =========================================================
   PROFESSIONAL RESOURCES — PAGE SCRIPT (professional-resources.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc, cls,
     custom-training, functional-academies,
     leadership-development, delivery-evaluation,
     corporate-proposal, individual-development,
     short-courses, professional-masterclasses,
     executive-learning, career-development-pathways,
     learning-calendar) — no shared globals.

   • No filtering/search JavaScript is added: the document
     defines 7 resource categories but lists no actual
     resource items to filter (brief §12).

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the professional-resources-
   hook and never conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('professional-resources-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .professional-resources-reveal blocks as they
     enter the viewport. Falls back to fully visible without
     JS or IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.professional-resources-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();



// Insights and Articles





/* =========================================================
   INSIGHTS AND ARTICLES — PAGE SCRIPT (insights-articles.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc, cls,
     custom-training, functional-academies,
     leadership-development, delivery-evaluation,
     corporate-proposal, individual-development,
     short-courses, professional-masterclasses,
     executive-learning, career-development-pathways,
     learning-calendar, professional-resources) — no shared
     globals, no redeclaration errors.

   • No filtering/search JavaScript is added: the document
     defines 8 editorial categories and 8 launch article
     titles but provides no mapping between them, so filters
     would be invented (brief §13).

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the insights-articles-
   hook and never conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('insights-articles-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .insights-articles-reveal blocks as they enter
     the viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.insights-articles-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();
})();




// Events and webinar




/* =========================================================
   EVENTS AND WEBINARS — PAGE SCRIPT (events-webinars.js)

   • No inline JavaScript is used anywhere in the page.
   • Everything is wrapped in ONE IIFE, so this file can
     never collide with script.js (Home) or any other page
     script (about, pvm, gqs, wcc, pcert, carea, cpath, acs,
     crcpd, cfq, pmem, mcat, mben, howjoin, cpd, cpc, cls,
     custom-training, functional-academies,
     leadership-development, delivery-evaluation,
     corporate-proposal, individual-development,
     short-courses, professional-masterclasses,
     executive-learning, career-development-pathways,
     learning-calendar, professional-resources,
     insights-articles) — no shared globals.

   • No filtering JavaScript is added: the document defines
     event TYPES and event-page requirements but lists no
     actual events to filter (brief §23).

   INTEGRATION NOTE
   The [SHARED] sections reproduce the header/topbar/footer
   behaviours that already exist in script.js. Include this
   file as-is if script.js is only loaded on the Home page.
   If script.js is ALREADY loaded on every page, delete the
   [SHARED] block below and keep only the page-specific
   SCROLL REVEAL section — it uses the events-webinars- hook
   and never conflicts with the other pages' observers.
========================================================= */

(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('events-webinars-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .events-webinars-reveal blocks as they enter the
     viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.events-webinars-reveal');
    if (!items.length) return;

    var showAll = function () {
      items.forEach(function (el) { el.classList.add('is-visible'); });
    };

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      showAll();
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* =====================================================
     [SHARED] Everything below mirrors script.js behaviour.
     Delete this block if script.js is already loaded on
     every page of the site.
  ===================================================== */

  /* =========================
     [SHARED] ANNOUNCEMENT BAR JS
     Rotates the suggested announcement messages and pauses
     on hover and keyboard focus.
  ========================= */
  (function announcementBar() {
    var bar = document.querySelector('.topbar');
    var slides = document.querySelectorAll('#topbarMessage .topbar-slide');
    if (!bar || !slides.length) return;

    var ROTATE_MS = 4600;
    var current = 0;
    var timer = null;

    function goTo(nextIndex) {
      slides[current].classList.remove('is-active');
      current = (nextIndex + slides.length) % slides.length;
      slides[current].classList.add('is-active');
    }

    function startRotation() {
      if (prefersReducedMotion || slides.length < 2 || timer) return;
      timer = window.setInterval(function () {
        goTo(current + 1);
      }, ROTATE_MS);
    }

    function stopRotation() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    bar.addEventListener('mouseenter', stopRotation);
    bar.addEventListener('mouseleave', startRotation);
    bar.addEventListener('focusin', stopRotation);
    bar.addEventListener('focusout', startRotation);
    startRotation();
  })();

  /* =========================
     [SHARED] NAVIGATION JS
     Sticky header state, mobile menu close-on-navigate and
     placeholder link protection.
  ========================= */
  (function navigation() {

    // Sticky header shadow on scroll
    var header = document.getElementById('siteHeader');
    if (header) {
      var onScroll = function () {
        header.classList.toggle('is-scrolled', window.scrollY > 8);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Close the collapsed mobile menu after a link is used
    var navCollapse = document.getElementById('mainNav');
    if (navCollapse && typeof bootstrap !== 'undefined') {
      navCollapse.addEventListener('click', function (event) {
        var link = event.target.closest('a');
        if (!link) return;
        var isDesktop = window.innerWidth >= 1400; // navbar-expand-xxl
        if (!isDesktop && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getOrCreateInstance(navCollapse, { toggle: false }).hide();
        }
      });
    }

    // Placeholder links ("#") must not jump the page
    document.querySelectorAll('a[href="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    });
  })();

  /* =========================
     [SHARED] FORMS JS
     Newsletter subscribe — front-end only.
     Wire the submission endpoint later.
  ========================= */
  (function newsletter() {
    var form = document.getElementById('newsletterForm');
    if (!form) return;

    var input = form.querySelector('input[type="email"]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!input) return;

      var isValid = input.checkValidity() && input.value.trim() !== '';
      if (!isValid) {
        input.focus();
        return;
      }
      // Backend subscription is not connected in this template.
      form.reset();
    });
  })();


})();