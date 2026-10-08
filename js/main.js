document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile nav ----
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (toggle && navLinks) {
        const bars = toggle.querySelectorAll('span');
        toggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            bars[0].style.transform = open ? 'translateY(3.5px) rotate(45deg)' : '';
            bars[1].style.transform = open ? 'translateY(-3.5px) rotate(-45deg)' : '';
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                bars[0].style.transform = '';
                bars[1].style.transform = '';
            });
        });
    }

    // ---- Nav shadow on scroll ----
    const nav = document.getElementById('nav');
    const onNavScroll = () => {
        nav.classList.toggle('scrolled', window.scrollY > 10);
    };
    onNavScroll();

    // ---- Scroll reveal with stagger ----
    const reveals = document.querySelectorAll('.reveal');
    let ticking = false;

    const checkReveal = () => {
        const vh = window.innerHeight;
        const seen = new Set();

        reveals.forEach(el => {
            if (el.classList.contains('vis') || seen.has(el)) return;
            if (el.getBoundingClientRect().top < vh - 80) {
                const parent = el.parentElement;
                const siblings = parent.querySelectorAll('.reveal:not(.vis)');
                let delay = 0;
                siblings.forEach(s => {
                    if (s.getBoundingClientRect().top < vh - 80 && !seen.has(s)) {
                        s.style.transitionDelay = delay + 'ms';
                        s.classList.add('vis');
                        seen.add(s);
                        delay += 70;
                    }
                });
                if (!el.classList.contains('vis')) {
                    el.classList.add('vis');
                    seen.add(el);
                }
            }
        });
        ticking = false;
    };

    const onScroll = () => {
        onNavScroll();
        if (!ticking) {
            requestAnimationFrame(checkReveal);
            ticking = true;
        }
    };

    checkReveal();
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---- Active nav link highlighting ----
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

    const highlightNav = () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 200) {
                current = s.id;
            }
        });
        navAnchors.forEach(a => {
            a.style.color = a.getAttribute('href') === '#' + current ? '' : '';
            if (a.getAttribute('href') === '#' + current) {
                a.style.color = 'var(--text)';
            } else {
                a.style.color = '';
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();

});
