/*
Theme Name: Dhananjay Malhotra Architects
Description: Main JavaScript file
Author: Dhananjay Malhotra Architects
Version: 1.0.0
*/

"use strict";

/* CURSOR */
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0,
    my = 0,
    rx = 0,
    ry = 0;
document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
});
(function animRing() {
    rx += (mx - rx) * .12;
    ry += (my - ry) * .12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animRing);
})();
document.querySelectorAll('a,button,.service-card-v2,.port-item,.filter-btn-v2,.testi-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

/* PRELOADER */
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('fade-out'), 2000);
});

/* NAVBAR */
const nav = document.getElementById('mainNav');
const navAs = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
    document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 500);
    let cur = '';
    sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 200) cur = s.id;
    });
    navAs.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
    });
});

/* MOBILE MENU */
function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    const btn = document.getElementById('hamburgerBtn');
    menu.classList.toggle('open');
    btn.classList.toggle('open');
}

/* SMOOTH SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        const t = document.querySelector(this.getAttribute('href'));
        if (t) {
            e.preventDefault();
            t.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

/* AOS */
const aosEls = document.querySelectorAll('[data-aos]');
const aosObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('aos-animate');
            aosObs.unobserve(e.target);
        }
    });
}, {
    threshold: .15
});
aosEls.forEach(el => aosObs.observe(el));

/* COUNTERS */
function animCounter(el) {
    const target = +el.dataset.target,
        dur = 2000,
        step = target / (dur / 16);
    let cur = 0;
    const t = setInterval(() => {
        cur += step;
        if (cur >= target) {
            cur = target;
            clearInterval(t);
        }
        el.textContent = Math.floor(cur);
    }, 16);
}
const cntObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            animCounter(e.target);
            cntObs.unobserve(e.target);
        }
    });
}, {
    threshold: .5
});
document.querySelectorAll('.counter').forEach(c => cntObs.observe(c));

/* PORTFOLIO FILTER */
document.querySelectorAll('.filter-btn-v2').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn-v2').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filter = this.dataset.filter;
        document.querySelectorAll('.port-item').forEach(item => {
            const show = filter === 'all' || item.dataset.cat === filter;
            item.style.display = show ? '' : 'none';
        });
    });
});

/* LIGHTBOX */
function openLB(src) {
    document.getElementById('lightboxImg').src = src;
    document.getElementById('lightbox').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLB() {
    document.getElementById('lightbox').classList.remove('active');
    document.body.style.overflow = '';
}
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLB();
});

/* TESTIMONIALS */
const testiData = [{
        text: '"People signing him—you’ll be in good hands."',
        name: 'Google Review',
        role: 'Jaipur',
        avatar: 'assets/images/unsplash_1494790108377-be9c29b29330_fab751.jpg'
    },
    {
        text: '"I recommend him for all kinds of exterior and interior work."',
        name: 'Google Review',
        role: 'Jaipur',
        avatar: 'assets/images/unsplash_1507003211169-0a1dd7228f2d_fab751.jpg'
    },
    {
        text: '"Good experience, young and fresh ideas and proactive team."',
        name: 'Google Review',
        role: 'Jaipur',
        avatar: 'assets/images/unsplash_1534528741775-53994a69daeb_fab751.jpg'
    }
];

function selectTesti(i) {
    const d = testiData[i];
    document.getElementById('mainTestiText').textContent = d.text;
    document.getElementById('mainTestiName').textContent = d.name;
    document.getElementById('mainTestiRole').textContent = d.role;
    document.getElementById('mainTestiAvatar').src = d.avatar;
    document.getElementById('mainTestiAvatar').alt = d.name;
    document.querySelectorAll('.testi-card').forEach((c, idx) => c.classList.toggle('active', idx === i));
}

/* FORM */
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('.submit-btn');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>Sending…</span>';
    btn.disabled = true;
    setTimeout(() => {
        btn.innerHTML = orig;
        btn.disabled = false;
        document.getElementById('formSuccess-v2').style.display = 'block';
        e.target.reset();
        setTimeout(() => document.getElementById('formSuccess-v2').style.display = 'none', 5000);
    }, 1500);
}