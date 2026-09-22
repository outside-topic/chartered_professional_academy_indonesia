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