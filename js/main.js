document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    // Check if device has touch capability (disable custom cursor on mobile)
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isTouchDevice && cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            // Dot follows instantly
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Outline follows with slight delay
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Hover effect for clickable elements
        const clickables = document.querySelectorAll('a, button, input, textarea, [data-magnetic]');
        clickables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    // --- Magnetic Buttons ---
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    magneticElements.forEach(elem => {
        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            elem.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        elem.addEventListener('mouseleave', () => {
            elem.style.transform = 'translate(0px, 0px)';
        });
    });

    // --- 3D Card Tilt (Vanilla JS VanillaTilt-like effect) ---
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            if (isTouchDevice || window.innerWidth < 900) return;
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const multiplier = 20; // Tilt intensity
            const xCalc = (x - rect.width / 2) / rect.width * multiplier;
            const yCalc = -(y - rect.height / 2) / rect.height * multiplier;
            
            card.style.transform = `perspective(1000px) rotateX(${yCalc}deg) rotateY(${xCalc}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            card.style.transition = 'transform 0.5s ease';
        });
        
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none';
        });
    });

    // --- Scroll Animations & Navbar Blur ---
    const navbar = document.getElementById('navbar');
    const reveals = document.querySelectorAll('.reveal-up');
    
    const handleScroll = () => {
        // Navbar
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Reveals
        const windowHeight = window.innerHeight;
        const revealPoint = 100;
        
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on load

    // --- Mobile Menu ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('nav-active');
            navLinks.classList.toggle('active');
        });
        
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('nav-active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Simple Form Handler ---
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.btn-submit span');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sent Successfully ✓';
            form.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
            }, 3000);
        });
    }
});
