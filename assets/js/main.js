/* Brandify – Interactions */
const qs = (s, c = document) => c.querySelector(s);
const qsa = (s, c = document) => [...c.querySelectorAll(s)];

/* Mobile menu */
const burger = qs('.burger');
const menu = qs('.menu');
if (burger) {
    burger.addEventListener('click', () => {
        if (menu.style.display === 'flex') { menu.style.display = 'none' }
        else { menu.style.display = 'flex'; menu.style.flexDirection = 'column'; menu.style.gap = '12px' }
    });
}

/* Reveal on scroll */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
}, { threshold: .15 });
qsa('.reveal').forEach(el => observer.observe(el));

/* Simple slider */
qsa('.slider').forEach((slider) => {
    const slides = slider.querySelector('.slides');
    const items = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    let idx = 0;
    function go(i) {
        idx = (i + items.length) % items.length;
        slides.style.transform = `translateX(-${idx * 100}%)`;
        dots.forEach((d, k) => d.classList.toggle('active', k === idx));
    }
    dots.forEach((d, i) => d.addEventListener('click', () => go(i)));
    setInterval(() => go(idx + 1), 5000);
    go(0);
});

/* Active menu link */
const path = location.pathname.split('/').pop() || 'index.html';
qsa('nav .menu a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path) a.classList.add('active');
});

/* Contact form (front-only demo) */
const form = qs('#contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(form));
        if (!data.name || !data.email || !data.message) {
            alert('Merci de remplir tous les champs.');
            return;
        }
        qs('#form-status').textContent = "Merci ! Votre message a bien été envoyé.";
        form.reset();
    });
}
