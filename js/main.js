document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile nav ----
    const toggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (toggle && navLinks) {
        const bars = toggle.querySelectorAll('span');
        toggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            bars[0].style.transform = open ? 'translateY(3.25px) rotate(45deg)' : '';
            bars[1].style.transform = open ? 'translateY(-3.25px) rotate(-45deg)' : '';
        });
        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('open');
                bars[0].style.transform = '';
                bars[1].style.transform = '';
            });
        });
    }

    // ---- Cursor-reactive hero blob ----
    const blob = document.getElementById('heroBlob');
    if (blob) {
        let bx = window.innerWidth / 2;
        let by = window.innerHeight / 2;
        let cx = bx, cy = by;

        document.addEventListener('mousemove', e => {
            bx = e.clientX;
            by = e.clientY;
        });

        function animateBlob() {
            cx += (bx - cx) * 0.04;
            cy += (by - cy) * 0.04;
            blob.style.transform = 'translate(' + (cx - 300) + 'px, ' + (cy - 300) + 'px)';
            requestAnimationFrame(animateBlob);
        }
        animateBlob();
    }

    // ---- Scroll reveal with sibling stagger ----
    const reveals = document.querySelectorAll('.reveal');
    let ticking = false;

    const checkReveal = () => {
        const vh = window.innerHeight;
        const seen = new Set();

        reveals.forEach(el => {
            if (el.classList.contains('vis') || seen.has(el)) return;
            if (el.getBoundingClientRect().top < vh - 60) {
                const parent = el.parentElement;
                const siblings = parent.querySelectorAll('.reveal:not(.vis)');
                let delay = 0;
                siblings.forEach(s => {
                    if (s.getBoundingClientRect().top < vh - 60 && !seen.has(s)) {
                        s.style.transitionDelay = delay + 'ms';
                        s.classList.add('vis');
                        seen.add(s);
                        delay += 80;
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
        if (!ticking) {
            requestAnimationFrame(checkReveal);
            ticking = true;
        }
    };

    checkReveal();
    window.addEventListener('scroll', onScroll, { passive: true });

    // ---- Count-up animation for stats ----
    const statNums = document.querySelectorAll('.stat-num[data-target]');
    const counted = new Set();

    const countUp = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.round(target * eased);
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    };

    const checkCounters = () => {
        statNums.forEach(el => {
            if (counted.has(el)) return;
            if (el.getBoundingClientRect().top < window.innerHeight - 80) {
                counted.add(el);
                countUp(el);
            }
        });
    };

    window.addEventListener('scroll', checkCounters, { passive: true });
    checkCounters();

    // ---- Portrait hover ripple effect ----
    const portrait = document.getElementById('portrait');
    if (portrait) {
        const wrap = portrait.parentElement;
        wrap.addEventListener('mousemove', e => {
            const rect = wrap.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
            portrait.style.transform = 'scale(1.03) translate(' + x + 'px, ' + y + 'px)';
        });
        wrap.addEventListener('mouseleave', () => {
            portrait.style.transform = '';
        });
    }

});
