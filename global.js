document.addEventListener('DOMContentLoaded', async () => {

    // ==========================================
    // 0. LOAD COMPONENTS (Header & Footer)
    // ==========================================
    try {
        const headerRes = await fetch('components/header.html');
        if (headerRes.ok) {
            const headerHtml = await headerRes.text();
            const headerPlaceholder = document.getElementById('header-placeholder');
            if (headerPlaceholder) {
                headerPlaceholder.outerHTML = headerHtml;
            }
        }

        const footerRes = await fetch('components/footer.html');
        if (footerRes.ok) {
            const footerHtml = await footerRes.text();
            const footerPlaceholder = document.getElementById('footer-placeholder');
            if (footerPlaceholder) {
                footerPlaceholder.outerHTML = footerHtml;
            }
        }
    } catch (e) {
        console.error('Failed to load components', e);
    }

    // ==========================================
    // 1. MOBILE MENU & HEADER SCROLL LOGIC
    // ==========================================
    const header = document.getElementById('site-header');
    const container = document.getElementById('header-container');
    const mobileNav = document.getElementById('mobileNav');
    const menuBtn = document.getElementById('menuBtn');
    const headerLogo = document.getElementById('header-logo');

    if (header && container && headerLogo && menuBtn) {
        // Listen for scroll events to toggle the navbar background
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                // Scrolled state (Beige background)
                header.classList.remove('bg-transparent', 'border-transparent', 'text-white');
                header.classList.add('bg-brand-beige', 'shadow-md', 'border-brand-dark/10', 'text-brand-dark');
                container.classList.remove('py-5', 'md:py-6');
                container.classList.add('py-2', 'md:py-3');
                
                // Switch to dark logo
                headerLogo.src = 'assets/Tony%20Best%20Pictures/logo_dark_txt.png';
                
                // Update mobile menu button color
                menuBtn.classList.remove('text-white');
                menuBtn.classList.add('text-brand-dark');

                // Remove gallery-specific dark-nav override now that beige bg is applied
                header.classList.remove('gallery-dark-nav');
            } else {
                // Top state (Transparent background)
                header.classList.add('bg-transparent', 'border-transparent', 'text-white');
                header.classList.remove('bg-brand-beige', 'shadow-md', 'border-brand-dark/10', 'text-brand-dark');
                container.classList.add('py-5', 'md:py-6');
                container.classList.remove('py-2', 'md:py-3');

                // Pages with light background at top: use dark logo (e.g. gallery, thank-you page)
                const isLightTopPage = document.body.dataset.page === 'gallery' || document.body.dataset.page === 'thank-you' || document.body.dataset.page === 'services';
                if (isLightTopPage) {
                    headerLogo.src = 'assets/Tony%20Best%20Pictures/logo_dark_txt.png';
                    header.classList.add('gallery-dark-nav');
                    menuBtn.classList.add('text-brand-dark');
                    menuBtn.classList.remove('text-white');
                } else {
                    // All other pages: light logo over dark hero
                    headerLogo.src = 'assets/Tony%20Best%20Pictures/logo_light_txt.png';
                    menuBtn.classList.remove('text-brand-dark');
                    menuBtn.classList.add('text-white');
                }
            }
        });
        
        // Trigger scroll event once to handle page load in scrolled state
        window.dispatchEvent(new Event('scroll'));
    }

    if (menuBtn && mobileNav) {
        let menuOpen = false;

        function closeMenu() {
            if (!menuOpen) return;
            menuOpen = false;
            mobileNav.classList.add('opacity-0', '-translate-y-2', 'pointer-events-none');
            document.body.style.overflow = '';
            menuBtn.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>';
            menuBtn.setAttribute('aria-expanded', 'false');

            // Reset both accordions to closed
            [['mobileServicesPanel', 'mob-svc-closed'], ['mobileLocationsPanel', 'mob-loc-closed']].forEach(([id, cls]) => {
                const panel = document.getElementById(id);
                if (!panel) return;
                panel.style.maxHeight = '0';
                panel.style.opacity = '0';
                panel.classList.add(cls);
                const btn = panel.previousElementSibling;
                if (btn) btn.querySelector('svg').style.transform = 'rotate(0deg)';
            });
        }

        function openMenu() {
            if (menuOpen) return;
            menuOpen = true;
            mobileNav.classList.remove('opacity-0', '-translate-y-2', 'pointer-events-none');
            document.body.style.overflow = 'hidden';
            menuBtn.querySelector('svg').innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
            menuBtn.setAttribute('aria-expanded', 'true');
        }

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuOpen ? closeMenu() : openMenu();
        });

        // Click anywhere outside the drawer closes it
        document.addEventListener('click', (e) => {
            if (menuOpen && !mobileNav.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Any link click inside the drawer closes it
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => closeMenu());
        });
    }

    // ==========================================
    // 2. SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    // Create an observer that triggers when elements are 10% visible
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Triggers CSS transition
                observer.unobserve(entry.target);     // Only animate once per load
            }
        });
    }, {
        root: null,
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px" // Triggers slightly before hitting the bottom of viewport
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // 3. STAT COUNTERS (.auto-counter)
    // ==========================================
    const counterEls = document.querySelectorAll('.auto-counter');
    if (counterEls.length) {
        const duration = 2000;
        const frameRate = 1000 / 60;
        const totalFrames = Math.round(duration / frameRate);
        const easeOutQuad = t => t * (2 - t);
        const animateCounter = (counter) => {
            let frame = 0;
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const counterInterval = setInterval(() => {
                frame++;
                const progress = easeOutQuad(frame / totalFrames);
                const currentCount = Math.round(target * progress);
                if (parseInt(counter.innerText, 10) !== currentCount) { counter.innerText = currentCount; }
                if (frame === totalFrames) { clearInterval(counterInterval); counter.innerText = target; }
            }, frameRate);
        };
        const statsObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.auto-counter').forEach(animateCounter);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        counterEls[0].closest('section') && statsObserver.observe(counterEls[0].closest('section'));
    }

    // ==========================================
    // 4. GLOBAL SLIDESHOW COMPONENT
    // ==========================================
    document.querySelectorAll('.svc-slideshow').forEach(ss => {
        const slides = ss.querySelectorAll('.svc-slide');
        const dots = ss.nextElementSibling?.classList.contains('svc-dots') ? ss.nextElementSibling.querySelectorAll('.svc-dot') : null;
        if (slides.length <= 1) return;
        let current = 0;
        const go = (n) => {
            slides[current].classList.remove('active');
            if (dots) dots[current].classList.remove('active');
            current = (n + slides.length) % slides.length;
            slides[current].classList.add('active');
            if (dots) dots[current].classList.add('active');
        };
        if (dots) dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
        const interval = parseInt(ss.dataset.interval) || 4000;
        setInterval(() => go(current + 1), interval);
    });

});