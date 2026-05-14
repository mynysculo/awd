/* ============================================ */
/* VINÍCOLA HERANÇA · SCRIPT.JS                */
/* PRELOADER · CURSOR · CANVAS · NAVEGAÇÃO     */
/* ============================================ */
(function(){
    'use strict';
    
    // ===== PRELOADER =====
    const preloader = document.getElementById('preloader');
    const preloaderFill = document.getElementById('preloaderFill');
    const preloaderText = document.getElementById('preloaderText');
    if (preloader) {
        let prog = 0;
        const iv = setInterval(() => {
            prog += Math.random() * 5 + 2;
            if (prog >= 100) {
                prog = 100;
                clearInterval(iv);
                setTimeout(() => {
                    preloader.classList.add('loaded');
                    setTimeout(() => { preloader.style.display = 'none'; }, 600);
                }, 400);
            }
            if (preloaderFill) preloaderFill.style.width = prog + '%';
            if (preloaderText) preloaderText.textContent = Math.round(prog) + '%';
        }, 40);
    }
    
    // ===== CURSOR CUSTOMIZADO =====
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursorFollower');
    let mx = 0, my = 0, fx = 0, fy = 0;
    
    document.addEventListener('mousemove', (e) => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });
    
    const hoverElements = document.querySelectorAll('a, button, .wine-card, .exp-card, .btn-primary, .btn-outline, .btn-header, .social-links a');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
    
    function animateCursor() {
        fx += (mx - fx) * 0.1;
        fy += (my - fy) * 0.1;
        follower.style.left = fx + 'px';
        follower.style.top = fy + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // ===== CANVAS BACKGROUND =====
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let w, h, parts = [];
        
        function resize() {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w;
            canvas.height = h;
        }
        window.addEventListener('resize', resize);
        resize();
        
        for (let i = 0; i < 50; i++) {
            parts.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.1,
                vy: (Math.random() - 0.5) * 0.1,
                s: Math.random() * 2 + 1
            });
        }
        
        function draw() {
            ctx.clearRect(0, 0, w, h);
            parts.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > w) p.vx *= -1;
                if (p.y < 0 || p.y > h) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(201,168,76,0.08)';
                ctx.fill();
            });
            requestAnimationFrame(draw);
        }
        draw();
    }
    
    // ===== SCROLL PROGRESS =====
    window.addEventListener('scroll', () => {
        const st = window.scrollY;
        const dh = document.documentElement.scrollHeight - window.innerHeight;
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = (st / dh) * 100 + '%';
        }
    });
    
    // ===== NAVEGAÇÃO SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // ===== ATUALIZAR LINK ATIVO =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
    
    // ===== FORMULÁRIO DE CONTATO =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('🍷 Reserva confirmada! Entraremos em contato em breve.');
            contactForm.reset();
        });
    }
    
    // ===== MOBILE MENU =====
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            alert('📱 Menu mobile (demonstração)');
        });
    }
    
    console.log('🍷 Vinícola Herança · Site carregado com sucesso!');
    console.log('✨ Design por AgroForte Studio');
})();
