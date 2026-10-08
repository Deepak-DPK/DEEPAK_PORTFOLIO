document.addEventListener('DOMContentLoaded', () => {

    const toggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        const bars = toggle.querySelectorAll('.bar');

        toggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('active');
            bars[0].style.transform = open ? 'translateY(3.75px) rotate(45deg)' : '';
            bars[1].style.transform = open ? 'translateY(-3.75px) rotate(-45deg)' : '';
        });

        navLinks.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                navLinks.classList.remove('active');
                bars[0].style.transform = '';
                bars[1].style.transform = '';
            });
        });
    }

    const reveals = document.querySelectorAll('.reveal');
    let ticking = false;

    const check = () => {
        const vh = window.innerHeight;
        reveals.forEach(el => {
            if (el.classList.contains('visible')) return;
            if (el.getBoundingClientRect().top < vh - 80) {
                el.classList.add('visible');
            }
        });
        ticking = false;
    };

    const onScroll = () => {
        if (!ticking) {
            requestAnimationFrame(check);
            ticking = true;
        }
    };

    check();
    window.addEventListener('scroll', onScroll, { passive: true });

});
