

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









// Governance Quality and Standards








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







})();









// Why Choose Us











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






})();







// Professioanl Certifications











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





})();









// Certification Areas









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




})();









// Certification Pathway









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




})();








// Assessment and Certification Standards










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





})();









// Certification Renewal and CPD








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




})();







// Certification Faq








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




})();





// Professional Membership










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




})();



// Memerbship Catageories






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




})();






// Membership Benifits







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




})();





// How to join 








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




})();






// CPD Stort








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




})();






// Corporate Trainning Solutions








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





})();







// Customized Trainning








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




})();




// functional Academies






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





})();







// Leadership Developement








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




})();






// Delivery adn Evaluation Approch








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




})();





// Request a corporate Trainning proposal






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
})();






// Individual profesional Developement







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







})();





// Short Courses start








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
})();




// Executive Learning






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
})();





// Learning Calender





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
})();





// Professional Resources





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
})();



// Insights and Articles







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
})();




// Events and webinar






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
})();






// Download and Guide 






(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('downloads-guides-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .downloads-guides-reveal blocks as they enter
     the viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.downloads-guides-reveal');
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
     DOWNLOAD FORM INTERACTION (page-specific)

     The document specifies the download form fields but no
     backend submission endpoint. This handler therefore only
     stops native form navigation so the page does not reload
     with query data — it does NOT simulate a download or show
     a fabricated confirmation. Connect a real endpoint here
     when the download/fulfilment backend becomes available.
  ========================= */
  (function formGuard() {
    var form = document.getElementById('downloadsGuidesForm');
    if (!form) return;

    form.addEventListener('submit', function (event) {
      event.preventDefault();
    });
  })();
})();




// Success Stories





(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('success-stories-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .success-stories-reveal blocks as they enter the
     viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.success-stories-reveal');
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
})();





// Help Centre







(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('help-centre-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .help-centre-reveal blocks as they enter the
     viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.help-centre-reveal');
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
     HELP CENTRE SEARCH JS  (page-specific)
     Client-side filter over the real document content:
     the 11 help-category cards and the 7 popular help
     questions. No fake results, no backend. Shows the
     handbook's own "Empty search" microcopy when nothing
     matches, and a clear button when a query is active.
  ========================= */
  (function helpSearch() {
    var input = document.getElementById('help-centre-search-input');
    var clearBtn = document.getElementById('helpCentreSearchClear');
    var emptyState = document.getElementById('helpCentreEmpty');
    if (!input) return;

    var items = document.querySelectorAll('[data-help-searchable]');

    var applyFilter = function () {
      var query = input.value.trim().toLowerCase();
      var visibleCount = 0;

      items.forEach(function (el) {
        var matches = el.textContent.toLowerCase().indexOf(query) !== -1;
        var show = query === '' || matches;
        el.classList.toggle('help-centre-is-hidden', !show);
        if (show) visibleCount++;
      });

      if (emptyState) {
        emptyState.classList.toggle('help-centre-is-hidden', visibleCount > 0);
      }
      if (clearBtn) {
        clearBtn.classList.toggle('help-centre-is-hidden', query === '');
      }
    };

    input.addEventListener('input', applyFilter);

    if (clearBtn) {
      clearBtn.addEventListener('click', function () {
        input.value = '';
        applyFilter();
        input.focus();
      });
    }
  })();
})();






// corporate and institutional partnership








(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('corporate-partnerships-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .corporate-partnerships-reveal blocks as they
     enter the viewport. Falls back to fully visible without
     JS or IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.corporate-partnerships-reveal');
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

  
})();






// Faculty and trainer






(function () {
  'use strict';

  /* =========================
     GLOBAL HELPERS
  ========================= */

  // Enables reveal styles only when JS is available, so no
  // content is ever hidden for users without JavaScript.
  document.documentElement.classList.add('faculty-experts-js');

  // Shared reduced-motion preference (respects user settings).
  var prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =========================
     SCROLL REVEAL JS  (page-specific — always required)
     Reveals .faculty-experts-reveal blocks as they enter the
     viewport. Falls back to fully visible without JS or
     IntersectionObserver support.
  ========================= */
  (function scrollReveal() {
    var items = document.querySelectorAll('.faculty-experts-reveal');
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
})();