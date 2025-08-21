
// Utilitaires pour sélection DOM (plus concis)
const qs = (s, c = document) => c.querySelector(s);
const qsa = (s, c = document) => [...c.querySelectorAll(s)];

// ========== NAVIGATION MOBILE ==========
const burger = qs('.burger');
const menu = qs('.menu');

if (burger && menu) {
    // Gestion du menu burger avec votre logique + améliorations
    burger.addEventListener('click', () => {
        const isOpen = menu.classList.contains('active');

        if (isOpen) {
            menu.classList.remove('active');
            menu.style.display = 'none';
            burger.textContent = '☰';
            burger.setAttribute('aria-expanded', 'false');
        } else {
            menu.classList.add('active');
            menu.style.display = 'flex';
            menu.style.flexDirection = 'column';
            menu.style.gap = '12px';
            burger.textContent = '✕';
            burger.setAttribute('aria-expanded', 'true');
        }
    });

    // Fermer le menu quand on clique sur un lien
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            menu.style.display = 'none';
            burger.textContent = '☰';
            burger.setAttribute('aria-expanded', 'false');
        });
    });

    // Fermer le menu avec Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menu.style.display = 'none';
            burger.textContent = '☰';
            burger.setAttribute('aria-expanded', 'false');
        }
    });

    // Fermer le menu quand on clique à l'extérieur
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !burger.contains(e.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menu.style.display = 'none';
            burger.textContent = '☰';
            burger.setAttribute('aria-expanded', 'false');
        }
    });
}

// ========== ANIMATIONS AU SCROLL ==========
// Utilisation de votre logique optimisée avec améliorations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target); // Performance: stop observing
        }
    });
}, observerOptions);

// Observer tous les éléments .reveal
qsa('.reveal').forEach(el => revealObserver.observe(el));

// ========== SLIDERS ==========
// Version améliorée de votre slider avec plus de contrôles
qsa('.slider').forEach((slider) => {
    const slides = slider.querySelector('.slides');
    const items = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    let idx = 0;
    let autoSlideInterval;
    let isPaused = false;

    function goToSlide(i) {
        idx = (i + items.length) % items.length;
        slides.style.transform = `translateX(-${idx * 100}%)`;
        dots.forEach((d, k) => d.classList.toggle('active', k === idx));
    }

    function startAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            if (!isPaused) goToSlide(idx + 1);
        }, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) clearInterval(autoSlideInterval);
    }

    // Contrôles manuels
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
    });

    // Pause/Resume sur hover
    slider.addEventListener('mouseenter', () => {
        isPaused = true;
    });

    slider.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    // Support du swipe sur mobile (basique)
    let startX = 0;
    let endX = 0;

    slides.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    }, { passive: true });

    slides.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    }, { passive: true });

    slides.addEventListener('touchend', () => {
        const diff = startX - endX;
        const threshold = 50; // Minimum swipe distance

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                goToSlide(idx + 1); // Swipe left -> next
            } else {
                goToSlide(idx - 1); // Swipe right -> previous
            }
        }
    }, { passive: true });

    // Support clavier (flèches)
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(idx - 1);
        if (e.key === 'ArrowRight') goToSlide(idx + 1);
    });

    // Initialisation
    goToSlide(0);
    startAutoSlide();

    // Pause auto-slide quand l'onglet n'est pas visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoSlide();
        } else {
            startAutoSlide();
        }
    });
});

// ========== MENU ACTIF ==========
// Votre logique avec amélioration pour les sous-dossiers
const currentPath = location.pathname;
const currentPage = currentPath.split('/').pop() || 'index.html';

qsa('nav .menu a').forEach(link => {
    const href = link.getAttribute('href');
    const linkPath = href.split('/').pop();

    // Vérification exacte + gestion des chemins relatifs
    if (linkPath === currentPage ||
        href === currentPath ||
        (currentPage === '' && linkPath === 'index.html')) {
        link.classList.add('active');
    }
});

// // ========== NEWSLETTER ==========
// // Votre logique avec améliorations UX
// const newsletterForm = qs('#newsletterForm');
// const newsletterMessage = qs('#newsletterMessage');

// if (newsletterForm && newsletterMessage) {
//     newsletterForm.addEventListener('submit', function (e) {
//         e.preventDefault();

//         const emailInput = qs('#newsletterEmail');
//         const email = emailInput.value.trim();
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//         // Reset message
//         newsletterMessage.className = '';

//         if (!email) {
//             showMessage('❌ Veuillez entrer une adresse email.', 'error');
//             return;
//         }

//         if (!emailPattern.test(email)) {
//             showMessage('❌ Veuillez entrer une adresse email valide.', 'error');
//             return;
//         }

//         // Simulation d'envoi (vous pouvez remplacer par un vrai appel API)
//         const submitBtn = newsletterForm.querySelector('button[type="submit"]');
//         const originalText = submitBtn.textContent;

//         submitBtn.disabled = true;
//         submitBtn.textContent = 'Envoi...';

//         setTimeout(() => {
//             showMessage('✅ Merci pour votre abonnement !', 'success');
//             emailInput.value = '';
//             submitBtn.disabled = false;
//             submitBtn.textContent = originalText;

//             // Effacer le message après 5 secondes
//             setTimeout(() => {
//                 newsletterMessage.textContent = '';
//                 newsletterMessage.className = '';
//             }, 5000);
//         }, 1000);

//         function showMessage(text, type) {
//             newsletterMessage.textContent = text;
//             newsletterMessage.style.color = type === 'error' ? 'red' : 'green';
//             newsletterMessage.className = type;
//         }
//     });
// }

// // ========== FORMULAIRE DE CONTACT ==========
// // Votre logique avec améliorations
// const contactForm = qs('#contact-form');
// const formStatus = qs('#form-status');

// if (contactForm) {
//     contactForm.addEventListener('submit', (e) => {
//         e.preventDefault();

//         const formData = new FormData(contactForm);
//         const data = Object.fromEntries(formData);

//         // Validation des champs requis
//         const requiredFields = ['name', 'email', 'message'];
//         const emptyFields = requiredFields.filter(field => !data[field]?.trim());

//         if (emptyFields.length > 0) {
//             showFormMessage('❌ Merci de remplir tous les champs obligatoires.', 'error');
//             // Focus sur le premier champ vide
//             const firstEmptyField = contactForm.querySelector(`[name="${emptyFields[0]}"]`);
//             if (firstEmptyField) firstEmptyField.focus();
//             return;
//         }

//         // Validation email
//         const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailPattern.test(data.email.trim())) {
//             showFormMessage('❌ Veuillez entrer une adresse email valide.', 'error');
//             return;
//         }

//         // Simulation d'envoi
//         const submitBtn = contactForm.querySelector('button[type="submit"]');
//         const originalText = submitBtn.textContent;

//         submitBtn.disabled = true;
//         submitBtn.textContent = 'Envoi...';

//         setTimeout(() => {
//             showFormMessage('✅ Merci ! Votre message a bien été envoyé.', 'success');
//             contactForm.reset();
//             submitBtn.disabled = false;
//             submitBtn.textContent = originalText;
//         }, 1500);
//     });

//     function showFormMessage(message, type) {
//         if (formStatus) {
//             formStatus.textContent = message;
//             formStatus.style.color = type === 'error' ? 'red' : 'green';
//             formStatus.className = type;
//         } else {
//             // Fallback si #form-status n'existe pas
//             alert(message);
//         }
//     }
// }

// ========== SCROLL SMOOTH POUR LES ANCRES ==========
qsa('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = qs(targetId);

        if (targetElement) {
            const headerHeight = qs('nav')?.offsetHeight || 0;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========== LAZY LOADING DES IMAGES ==========
// Optimisation performance
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            }
        });
    }, {
        rootMargin: '50px 0px'
    });

    qsa('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== GESTION DES ERREURS ==========
// Debug mode (désactivé en production)
const DEBUG_MODE = false;

if (DEBUG_MODE) {
    window.addEventListener('error', (e) => {
        console.error('JavaScript Error:', e.error);
    });
}

// ========== FONCTIONS UTILITAIRES ==========
// Export des fonctions pour utilisation externe si nécessaire
window.BrandifyUtils = {
    qs,
    qsa,
    goToSlide: (sliderIndex, slideIndex) => {
        const slider = qsa('.slider')[sliderIndex];
        if (slider) {
            const slides = slider.querySelector('.slides');
            slides.style.transform = `translateX(-${slideIndex * 100}%)`;
        }
    }
};

// ========== INITIALISATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Brandify - Site loaded successfully');

    // Vérifications d'initialisation
    if (DEBUG_MODE) {
        console.log('Navigation:', !!burger);
        console.log('Sliders:', qsa('.slider').length);
        console.log('Newsletter form:', !!newsletterForm);
        console.log('Contact form:', !!contactForm);
    }
});

// ========== PERFORMANCE ==========
// Préchargement des pages importantes
const criticalPages = ['pages/services.html', 'pages/contact.html'];
criticalPages.forEach(page => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = page;
    document.head.appendChild(link);
});


// Détecte si la page est dans /pages/ pour ajuster les chemins vers /composants et /assets
const IN_PAGES = location.pathname.includes('/pages/');
const BASE = IN_PAGES ? '..' : '.';

// Charge un composant HTML et exécute des hooks optionnels
function loadComponent(selector, file, onLoad) {
    const url = `${BASE}/composants/${file}`;
    fetch(url)
        .then(r => {
            if (!r.ok) throw new Error(`Erreur ${r.status} lors du chargement de ${url}`);
            return r.text();
        })
        .then(html => {
            const target = document.querySelector(selector);
            if (!target) return console.warn(`Cible "${selector}" introuvable`);
            target.innerHTML = html;

            // Corriger les chemins relatifs du contenu injecté (href/src) selon le niveau courant
            rewriteRelativeURLs(target);

            if (typeof onLoad === 'function') onLoad(target);
        })
        .catch(console.error);
}

// Corrige les href/src qui n'ont pas de "/" absolu ni de protocole (http:, mailto:, tel:)
function rewriteRelativeURLs(scope) {
    const prefix = IN_PAGES ? '../' : './';

    scope.querySelectorAll('a[href]').forEach(a => {
        const href = a.getAttribute('href');
        if (!href || isAbsolute(href)) return;
        a.setAttribute('href', normalize(`${prefix}${href}`));
    });

    scope.querySelectorAll('img[src], script[src], link[href]').forEach(el => {
        const attr = el.tagName.toLowerCase() === 'link' ? 'href' : 'src';
        const val = el.getAttribute(attr);
        if (!val || isAbsolute(val)) return;
        el.setAttribute(attr, normalize(`${prefix}${val}`));
    });
}

function isAbsolute(url) {
    return /^(https?:|mailto:|tel:|\/\/|\/)/i.test(url);
}

function normalize(path) {
    // Nettoie les doubles slashes éventuels
    return path.replace(/([^:]\/)\/+/g, '$1');
}

// Burger menu
function initNavbar() {
    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');
    if (burger && menu) {
        burger.addEventListener('click', () => menu.classList.toggle('active'));
    }
}

// Active le lien correspondant à la page courante
function setActiveMenu() {
    const current = normalizePath(location.pathname);

    document.querySelectorAll('nav .menu a').forEach(a => {
        a.classList.remove('active');
        const linkPath = normalizePath(new URL(a.getAttribute('href'), location.href).pathname);
        if (linkPath === current) a.classList.add('active');
    });
}

// Normalise les chemins (gère /, /pages/, ?query, #hash, index.html, etc.)
function normalizePath(pathname) {
    const u = new URL(pathname, location.href);
    let p = u.pathname;
    if (p.endsWith('/')) p += 'index.html';     // /pages/  -> /pages/index.html
    p = p.replace(/\/+/g, '/');
    return p;
}

// Injection auto quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('#navbar', 'navbar.html', () => {
        initNavbar();
        setActiveMenu(); // IMPORTANT : appelé après injection
    });
    loadComponent('#footer', 'footer.html');
});


// Fonction d'animation du compteur
function animateCounter(el, target, duration = 1500) {
    let start = 0;
    let startTime = null;

    function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        el.textContent = "+" + Math.floor(progress * target);
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            el.textContent = "+" + target; // Valeur finale
        }
    }

    requestAnimationFrame(updateCounter);
}

// Observer pour déclencher l'animation quand la section est visible
const kpisSection = document.querySelector('.kpis');
let alreadyAnimated = false;

const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !alreadyAnimated) {
        alreadyAnimated = true;
        document.querySelectorAll('.kpi b').forEach(el => {
            const target = parseInt(el.textContent.replace(/\D/g, ''), 10);
            animateCounter(el, target, 1500);
        });
    }
}, { threshold: 0.5 });

observer.observe(kpisSection);





// document.getElementById("contact-form").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     let formData = {
//         type: "contact",
//         name: e.target.name.value,
//         email: e.target.email.value,
//         tel: e.target.tel.value,
//         company: e.target.company.value,
//         service: e.target.service.value,
//         message: e.target.message.value,
//     };

//     let response = await fetch("", {
//         method: "POST",
//         body: JSON.stringify(formData),
//         headers: { "Content-Type": "application/json" }
//     });

//     let result = await response.json();
//     document.getElementById("form-status").textContent = "Message envoyé ✅";
// });


// document.getElementById("newsletterForm").addEventListener("submit", async (e) => {
//     e.preventDefault();

//     let formData = {
//         type: "newsletter",
//         email: document.getElementById("newsletterEmail").value,
//     };

//     let response = await fetch("", {
//         method: "POST",
//         body: JSON.stringify(formData),
//         headers: { "Content-Type": "application/json" }
//     });

//     let result = await response.json();
//     document.getElementById("newsletterMessage").textContent = "Inscription réussie 🎉";
// });






document.addEventListener("DOMContentLoaded", () => {
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzTm0ocDsWX2GVCNxrHvGNdBJ_zSKnLnn8RK1etZXfsxYaOFZmcq61oNapiMwO1UBbU/exec";

    // FORMULAIRE DE CONTACT
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = {
                type: "contact",
                name: e.target.name.value,
                email: e.target.email.value,
                tel: e.target.tel.value,
                company: e.target.company.value,
                service: e.target.service.value,
                message: e.target.message.value,
            };

            try {
                const response = await fetch(SCRIPT_URL, {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: { "Content-Type": "application/json" },
                });


                const raw = await response.text();
                console.log("Réponse brute du serveur :", raw);

                document.getElementById("form-status").textContent = raw;


                // const result = await response.json();
                // document.getElementById("form-status").textContent = result.message;
                document.getElementById("form-status").style.color = "green";
                contactForm.reset();
            } catch (error) {
                document.getElementById("form-status").textContent = "❌ Erreur d’envoi";
                document.getElementById("form-status").style.color = "red";
            }
        });
    }

    // FORMULAIRE NEWSLETTER
    const newsletterForm = document.getElementById("newsletterForm");
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = {
                type: "newsletter",
                email: document.getElementById("newsletterEmail").value,
            };

            try {
                const response = await fetch(SCRIPT_URL, {
                    method: "POST",
                    body: JSON.stringify(formData),
                    headers: { "Content-Type": "application/json" },
                });
                

                const raw = await response.text();
                console.log("Réponse brute newsletter :", raw);

                document.getElementById("newsletterMessage").textContent = raw;

                // const result = await response.json();
                // document.getElementById("newsletterMessage").textContent = result.message;
                document.getElementById("newsletterMessage").style.color = "green";
                newsletterForm.reset();
            } catch (error) {
                document.getElementById("newsletterMessage").textContent = "❌ Erreur d’abonnement";
                document.getElementById("newsletterMessage").style.color = "red";
            }
        });
    }
});
