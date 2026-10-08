document.addEventListener('DOMContentLoaded', () => {

    // Mobile nav
    const toggle = document.getElementById('navToggle');
    const links = document.getElementById('navLinks');
    if (toggle && links) {
        const bars = toggle.querySelectorAll('span');
        toggle.addEventListener('click', () => {
            const open = links.classList.toggle('open');
            bars[0].style.transform = open ? 'translateY(3.25px) rotate(45deg)' : '';
            bars[1].style.transform = open ? 'translateY(-3.25px) rotate(-45deg)' : '';
        });
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                links.classList.remove('open');
                bars[0].style.transform = '';
                bars[1].style.transform = '';
            });
        });
    }

    // Scroll progress bar
    const bar = document.getElementById('scrollProgress');
    const updateProgress = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = h > 0 ? (window.scrollY / h * 100) + '%' : '0%';
    };

    // Scroll reveal with stagger
    const reveals = document.querySelectorAll('.reveal');
    let raf = false;
    const check = () => {
        const vh = window.innerHeight;
        reveals.forEach((el, i) => {
            if (el.classList.contains('vis')) return;
            const top = el.getBoundingClientRect().top;
            if (top < vh - 60) {
                const siblings = el.parentElement.querySelectorAll('.reveal:not(.vis)');
                let delay = 0;
                siblings.forEach(s => {
                    if (s.getBoundingClientRect().top < vh - 60) {
                        s.style.transitionDelay = delay + 'ms';
                        s.classList.add('vis');
                        delay += 60;
                    }
                });
                if (!el.classList.contains('vis')) {
                    el.classList.add('vis');
                }
            }
        });
        raf = false;
    };

    const onScroll = () => {
        updateProgress();
        if (!raf) { requestAnimationFrame(check); raf = true; }
    };

    updateProgress();
    check();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Horizontal drag scroll for projects
    const scroll = document.getElementById('projectsScroll');
    if (scroll) {
        let down = false, startX, scrollL;
        scroll.addEventListener('mousedown', e => {
            down = true;
            scroll.style.cursor = 'grabbing';
            startX = e.pageX - scroll.offsetLeft;
            scrollL = scroll.scrollLeft;
        });
        scroll.addEventListener('mouseleave', () => { down = false; scroll.style.cursor = ''; });
        scroll.addEventListener('mouseup', () => { down = false; scroll.style.cursor = ''; });
        scroll.addEventListener('mousemove', e => {
            if (!down) return;
            e.preventDefault();
            scroll.scrollLeft = scrollL - (e.pageX - scroll.offsetLeft - startX) * 1.5;
        });
    }

});
