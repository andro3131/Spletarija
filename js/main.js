// ========== SPLETARIJA - MAIN JAVASCRIPT ==========

// ========== CUSTOM CURSOR ==========
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

// Create particle trail
const particles = [];
const particleCount = 8;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'cursor-particle';
    document.body.appendChild(particle);
    particles.push({
        el: particle,
        x: 0,
        y: 0,
        alpha: 0
    });
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (dot) {
        dot.style.left = mouseX - 4 + 'px';
        dot.style.top = mouseY - 4 + 'px';
    }

    // Update service cards mouse position for gradient effect
    document.querySelectorAll('.service-card').forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
    });
});

function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    if (ring) {
        ring.style.left = ringX + 'px';
        ring.style.top = ringY + 'px';
    }

    // Animate particles trail
    particles.forEach((p, i) => {
        const delay = (i + 1) * 3;
        p.x += (mouseX - p.x) * (0.15 - i * 0.015);
        p.y += (mouseY - p.y) * (0.15 - i * 0.015);
        p.alpha = Math.max(0, 1 - (i * 0.12));

        p.el.style.left = p.x - 2 + 'px';
        p.el.style.top = p.y - 2 + 'px';
        p.el.style.opacity = p.alpha * 0.5;
        p.el.style.transform = `scale(${1 - i * 0.1})`;
    });

    requestAnimationFrame(animateRing);
}
animateRing();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .service-card, .project-card, .testimonial-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring && ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring && ring.classList.remove('hover'));
});

// Click effect
document.addEventListener('mousedown', () => ring && ring.classList.add('click'));
document.addEventListener('mouseup', () => ring && ring.classList.remove('click'));

// ========== SCROLL PROGRESS BAR ==========
const scrollProgress = document.querySelector('.scroll-progress');

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;

    if (scrollProgress) {
        scrollProgress.style.width = progress + '%';
    }
}

window.addEventListener('scroll', updateScrollProgress);

// ========== NAV HIDE ON SCROLL ==========
let lastScroll = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (navbar) {
        // Hide/show nav
        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        // Add scrolled class for background
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    lastScroll = currentScroll;
});

// ========== MOBILE MENU ==========
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
}

function closeMobile() {
    if (menuToggle && mobileMenu) {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========== SCROLL REVEAL ==========
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .reveal-rotate');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ========== SPLIT TEXT ANIMATION ==========
document.querySelectorAll('.split-text').forEach(el => {
    const text = el.textContent;
    el.innerHTML = '';

    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.transitionDelay = `${i * 0.03}s`;
        el.appendChild(span);
    });
});

const splitTextObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.split-text').forEach(el => splitTextObserver.observe(el));

// ========== ANIMATED COUNTERS ==========
const counters = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target);
            const suffix = el.dataset.suffix || '';
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    el.innerHTML = Math.floor(current) + `<span class="stat-suffix">${suffix}</span>`;
                    requestAnimationFrame(updateCounter);
                } else {
                    el.innerHTML = target + `<span class="stat-suffix">${suffix}</span>`;
                }
            };

            updateCounter();
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ========== PARALLAX ORBS ==========
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(() => {
            const scrollY = window.pageYOffset;
            document.querySelectorAll('.hero-orb').forEach((orb, i) => {
                const speed = 0.1 + (i * 0.05);
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
            ticking = false;
        });
        ticking = true;
    }
});

// ========== MAGNETIC EFFECT ON BUTTONS ==========
document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ========== 3D TILT ON PROJECT CARDS ==========
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * -10;
        const rotateY = (x - 0.5) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ========== 3D TILT ON SERVICE CARDS ==========
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * -5;
        const rotateY = (x - 0.5) * 5;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========== TYPING EFFECT FOR HERO ==========
function typeWriter(element, text, speed = 80) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Add blinking cursor at end
            element.innerHTML += '<span class="typing-cursor"></span>';
        }
    }

    type();
}

// Apply typing effect after page load
window.addEventListener('load', () => {
    const typingElement = document.querySelector('.hero-typing');
    if (typingElement) {
        const text = typingElement.dataset.text || typingElement.textContent;
        setTimeout(() => typeWriter(typingElement, text), 1500);
    }
});

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            closeMobile();
        }
    });
});

// ========== LAZY LOAD IMAGES ==========
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
}, { rootMargin: '50px' });

lazyImages.forEach(img => imageObserver.observe(img));

// ========== MOCKUP CODE ANIMATION ==========
const mockupSnippets = [
    // HTML Snippet (Current)
    `<span class="line" style="animation-delay: 0.1s"><span class="code-comment">// Ustvarjamo spletne čarovnije</span></span>
     <span class="line" style="animation-delay: 0.3s"><span class="code-tag">&lt;section</span> <span class="code-attr">class</span>=<span class="code-string">"hero"</span><span class="code-tag">&gt;</span></span>
     <span class="line" style="animation-delay: 0.5s"> <span class="code-tag">&lt;h1&gt;</span>Ustvarjamo</span>
     <span class="line" style="animation-delay: 0.7s"> <span class="code-tag">&lt;span</span> <span class="code-attr">class</span>=<span class="code-string">"gradient"</span><span class="code-tag">&gt;</span></span>
     <span class="line" style="animation-delay: 0.9s"> digitalne izkušnje</span>
     <span class="line" style="animation-delay: 1.1s"> <span class="code-tag">&lt;/span&gt;</span></span>
     <span class="line" style="animation-delay: 1.3s"> <span class="code-tag">&lt;/h1&gt;</span></span>
     <span class="line" style="animation-delay: 1.5s"><span class="code-tag">&lt;/section&gt;</span></span>`,

    // CSS Snippet
    `<span class="line" style="animation-delay: 0.1s"><span class="code-comment">/* Popoln dizajn */</span></span>
     <span class="line" style="animation-delay: 0.3s"><span class="code-tag">.spletarije</span> {</span>
     <span class="line" style="animation-delay: 0.5s">  <span class="code-attr">display</span>: <span class="code-string">flex</span>;</span>
     <span class="line" style="animation-delay: 0.7s">  <span class="code-attr">justify-content</span>: <span class="code-string">center</span>;</span>
     <span class="line" style="animation-delay: 0.9s">  <span class="code-attr">align-items</span>: <span class="code-string">awesome</span>;</span>
     <span class="line" style="animation-delay: 1.1s">  <span class="code-attr">background</span>: <span class="code-string">premium</span>;</span>
     <span class="line" style="animation-delay: 1.3s">  <span class="code-attr">color</span>: <span class="code-string">#fff</span>;</span>
     <span class="line" style="animation-delay: 1.5s">}</span>`,

    // JS Snippet
    `<span class="line" style="animation-delay: 0.1s"><span class="code-comment">// Logika uspeha</span></span>
     <span class="line" style="animation-delay: 0.3s"><span class="code-tag">const</span> <span class="code-attr">success</span> = <span class="code-tag">async</span> () => {</span>
     <span class="line" style="animation-delay: 0.5s">  <span class="code-tag">await</span> <span class="code-attr">Spletarije</span>.build();</span>
     <span class="line" style="animation-delay: 0.7s">  <span class="code-tag">if</span> (<span class="code-attr">client.happy</span>) {</span>
     <span class="line" style="animation-delay: 0.9s">    <span class="code-attr">return</span> <span class="code-string">"Launch 🚀"</span>;</span>
     <span class="line" style="animation-delay: 1.1s">  }</span>
     <span class="line" style="animation-delay: 1.3s">  <span class="code-tag">return</span> <span class="code-string">"Perfection"</span>;</span>
     <span class="line" style="animation-delay: 1.5s">};</span>`
];

let currentSnippetIndex = 0;

function initMockupCycle() {
    const mockupContainer = document.querySelector('.mockup-code');
    if (!mockupContainer) return;

    // Initial state is already in HTML, start cycling after delay
    setInterval(() => {
        currentSnippetIndex = (currentSnippetIndex + 1) % mockupSnippets.length;

        // Fade out slightly before swap (optional polish)
        mockupContainer.style.opacity = '0';

        setTimeout(() => {
            mockupContainer.innerHTML = mockupSnippets[currentSnippetIndex];
            mockupContainer.style.opacity = '1';
        }, 50); // Fast fade out

    }, 7000); // Cycle every 7 seconds
}

// ========== TESTIMONIALS CAROUSEL ==========
function initTestimonialsCarousel() {
    const slots = document.querySelectorAll('.testimonial-slot');
    if (slots.length === 0) return;

    const allTestimonials = [
        {
            quote: 'Stran je presegla vsa pričakovanja. Modernejše, hitrejše in lepše od česarkoli, kar sem si zamislil. Celoten proces je bil enostaven in profesionalen.',
            initials: 'MP', name: 'Marko P.', role: 'Lastnik studia'
        },
        {
            quote: 'Hitro, zanesljivo in kreativno. Spletarije razume, kaj želiš, še preden to poveš do konca. Priporočam vsakomur, ki želi izstopati na spletu.',
            initials: 'AK', name: 'Ana K.', role: 'Fotografinja'
        },
        {
            quote: 'Naša nova spletna stran je popolnoma spremenila poslovanje. Več povpraševanj, boljši vtis in stranke nas končno najdejo na spletu.',
            initials: 'TL', name: 'Tomaž L.', role: 'Podjetnik'
        },
        {
            quote: 'Končno imam stran, ki jo s ponosom pokažem strankam. Animacije in dizajn sta na ravni, ki je nisem pričakoval za to ceno.',
            initials: 'NV', name: 'Nina V.', role: 'Oblikovalka'
        },
        {
            quote: 'Od prvega klica do končnega produkta — vse je potekalo gladko. Odzivnost in komunikacija sta bila izjemni.',
            initials: 'JR', name: 'Jan R.', role: 'Trener'
        },
        {
            quote: 'Spletarije so nam postavili stran, ki ne le izgleda odlično, ampak tudi dejansko prinaša rezultate. Priporočam brez zadržkov.',
            initials: 'SB', name: 'Sara B.', role: 'Lastnica salona'
        }
    ];

    // Track which testimonials are shown (indices 0,1,2 at start)
    let activeIndices = [0, 1, 2];

    function getRandomInterval() {
        return 5000 + Math.random() * 2000; // 5-7 seconds
    }

    function buildCard(testimonial) {
        return `
            <div class="quote-mark">"</div>
            <blockquote>${testimonial.quote}</blockquote>
            <div class="testimonial-author">
                <div class="testimonial-avatar">${testimonial.initials}</div>
                <div class="testimonial-author-info">
                    <strong>${testimonial.name}</strong>
                    <span>${testimonial.role}</span>
                </div>
            </div>
        `;
    }

    function swapTestimonial() {
        // Pick a random slot (0, 1, or 2)
        const slotIndex = Math.floor(Math.random() * 3);
        const slot = slots[slotIndex];
        const currentCard = slot.querySelector('.testimonial-card.active');

        // Get available testimonials (not currently shown)
        const available = allTestimonials
            .map((t, i) => i)
            .filter(i => !activeIndices.includes(i));

        if (available.length === 0) return;

        // Pick a random new testimonial
        const newIndex = available[Math.floor(Math.random() * available.length)];

        // Fade out current
        if (currentCard) {
            currentCard.classList.remove('active');
        }

        // After fade out, swap content and fade in
        setTimeout(() => {
            if (currentCard) currentCard.remove();

            const newCard = document.createElement('div');
            newCard.className = 'testimonial-card';
            newCard.dataset.index = newIndex;
            newCard.innerHTML = buildCard(allTestimonials[newIndex]);
            slot.appendChild(newCard);

            // Trigger reflow for animation
            newCard.offsetHeight;
            newCard.classList.add('active');

            activeIndices[slotIndex] = newIndex;
        }, 600);

        // Schedule next swap
        setTimeout(swapTestimonial, getRandomInterval());
    }

    // Start the carousel after initial delay
    setTimeout(swapTestimonial, getRandomInterval());
}

// ========== CONTACT FORM ==========
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const submitBtn = form.querySelector('.btn-submit');
    const formStatus = form.querySelector('.form-status');

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate individual field
    function validateField(input, validator) {
        const errorSpan = input.parentElement.querySelector('.form-error');
        const isValid = validator(input.value.trim());

        if (!isValid && input.value.trim() !== '') {
            input.style.borderColor = '#ff4444';
            return false;
        } else {
            input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            errorSpan.textContent = '';
            return true;
        }
    }

    // Real-time validation
    nameInput.addEventListener('blur', () => {
        validateField(nameInput, (val) => val.length >= 2);
    });

    emailInput.addEventListener('blur', () => {
        const errorSpan = emailInput.parentElement.querySelector('.form-error');
        const isValid = emailRegex.test(emailInput.value.trim());

        if (!isValid && emailInput.value.trim() !== '') {
            emailInput.style.borderColor = '#ff4444';
            errorSpan.textContent = 'Vnesite veljaven email naslov';
        } else {
            emailInput.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            errorSpan.textContent = '';
        }
    });

    messageInput.addEventListener('blur', () => {
        validateField(messageInput, (val) => val.length >= 10);
    });

    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const message = messageInput.value.trim();

        // Check required fields
        if (!name || name.length < 2) {
            showError(nameInput, 'Vnesite ime (vsaj 2 znaka)');
            return;
        }

        if (!email || !emailRegex.test(email)) {
            showError(emailInput, 'Vnesite veljaven email naslov');
            return;
        }

        if (!message || message.length < 10) {
            showError(messageInput, 'Sporočilo mora vsebovati vsaj 10 znakov');
            return;
        }

        // Disable submit button
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Pošiljam... <span class="arrow">→</span>';

        // Send email via EmailJS
        try {
            const serviceID = 'service_4q0d1de';
            const templateID = 'template_3dbz4cb';
            const publicKey = '1uqnzr8kLJtPkA2gY';

            const templateParams = {
                from_name: name,
                from_email: email,
                phone: phone || 'Ni navedeno',
                message: message,
                to_name: 'Spletarije'
            };

            await emailjs.send(serviceID, templateID, templateParams, publicKey);

            // Show success message
            formStatus.className = 'form-status success';
            formStatus.textContent = '✓ Sporočilo uspešno poslano! Odgovorili vam bomo v najkrajšem možnem času.';

            // Reset form
            form.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formStatus.className = 'form-status';
            }, 5000);

        } catch (error) {
            console.error('Napaka pri pošiljanju:', error);
            const errorMsg = error?.text || error?.message || error || 'Neznana napaka';
            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Napaka: ' + errorMsg;
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Pošlji sporočilo <span class="arrow">→</span>';
        }
    });

    // Helper function to show error
    function showError(input, message) {
        const errorSpan = input.parentElement.querySelector('.form-error');
        errorSpan.textContent = message;
        input.style.borderColor = '#ff4444';
        input.focus();
    }
}

// ========== INITIALIZE ON DOM READY ==========
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for initial animations
    document.body.classList.add('loaded');

    // Initialize mockup cycle
    initMockupCycle();

    // Initialize contact form
    initContactForm();

    // Initialize testimonials carousel
    initTestimonialsCarousel();

    // Initialize any additional components here
    console.log('🎨 Spletarije loaded successfully');
});
