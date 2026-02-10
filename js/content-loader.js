// ========== CONTENT LOADER ==========
// Fetches JSON content files and updates the DOM.
// Falls back to hardcoded HTML content if fetch fails.

const CONTENT_SECTIONS = ['general', 'hero', 'services', 'projects', 'stats', 'process', 'testimonials'];

export async function loadContent() {
    try {
        const results = await Promise.allSettled(
            CONTENT_SECTIONS.map(section =>
                fetch(`/content/${section}.json`).then(r => r.ok ? r.json() : null)
            )
        );

        const content = {};
        CONTENT_SECTIONS.forEach((section, i) => {
            if (results[i].status === 'fulfilled' && results[i].value) {
                content[section] = results[i].value;
            }
        });

        if (content.hero) applyHero(content.hero);
        if (content.general) applyGeneral(content.general);
        if (content.services) applyServices(content.services);
        if (content.projects) applyProjects(content.projects);
        if (content.stats) applyStats(content.stats);
        if (content.process) applyProcess(content.process);
        if (content.testimonials) applyTestimonials(content.testimonials);

    } catch (err) {
        console.warn('Content loader: uporaba fallback HTML vsebine', err);
    }
}

// -- Helpers --

function setText(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
}

function setTextPreservingChildren(el, text) {
    const children = Array.from(el.children);
    el.textContent = text + ' ';
    children.forEach(child => el.appendChild(child));
}

function setSectionTitle(selector, title, gradientText) {
    const el = document.querySelector(selector);
    if (el) el.innerHTML = title + '<br><span class="gradient-text">' + escapeHtml(gradientText) + '</span>';
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// -- Section Appliers --

function applyHero(data) {
    const labelSpan = document.querySelector('.hero-label [data-content="hero.label"]');
    if (labelSpan) labelSpan.textContent = data.label;

    setText('.hero-title .line:nth-child(1) .line-inner', data.titleLine1);

    const gradientEl = document.querySelector('.hero-title .line:nth-child(2) .gradient-text');
    if (gradientEl) gradientEl.textContent = data.titleLine2;

    const outlineEl = document.querySelector('.hero-title .line:nth-child(3) .outline-text');
    if (outlineEl) outlineEl.textContent = data.titleLine3;

    const descEl = document.querySelector('.hero-description');
    if (descEl) descEl.textContent = data.description;

    const ctaPrimary = document.querySelector('.hero-ctas .btn-primary');
    if (ctaPrimary) setTextPreservingChildren(ctaPrimary, data.ctaPrimary);

    const ctaSecondary = document.querySelector('.hero-ctas .btn-ghost');
    if (ctaSecondary) ctaSecondary.textContent = data.ctaSecondary;
}

function applyGeneral(data) {
    // Contact section
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(el => {
        el.href = 'mailto:' + data.email;
        el.textContent = data.email;
    });

    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(el => {
        el.href = 'tel:' + data.phoneLink;
        el.textContent = data.phone;
    });

    // Address
    const addressItems = document.querySelectorAll('.contact-info-item');
    addressItems.forEach(item => {
        const icon = item.querySelector('.contact-icon');
        if (icon && icon.textContent.includes('\uD83D\uDCCD')) {
            const paragraphs = item.querySelectorAll('p');
            if (paragraphs[0]) paragraphs[0].textContent = data.address.line1;
            if (paragraphs[1]) paragraphs[1].textContent = data.address.line2;
        }
    });

    // Working hours
    const contactCards = document.querySelectorAll('.contact-info-card');
    if (contactCards[1]) {
        const p = contactCards[1].querySelector('p');
        if (p) p.textContent = data.workingHours;
    }

    // Footer
    const footerBrand = document.querySelector('.footer-brand > p');
    if (footerBrand) footerBrand.textContent = data.footerDescription;

    const copyrightEl = document.querySelector('.footer-bottom > span');
    if (copyrightEl) copyrightEl.textContent = data.copyright;

    // Social links
    if (data.socials.facebook) {
        const fbLink = document.querySelector('.social-btn.facebook');
        if (fbLink) fbLink.href = data.socials.facebook;
    }
    if (data.socials.instagram) {
        const igLink = document.querySelector('.social-btn.instagram');
        if (igLink) igLink.href = data.socials.instagram;
    }
}

function applyServices(data) {
    setText('.services .section-label', data.sectionLabel);
    setSectionTitle('.services .section-title', data.sectionTitle, data.sectionTitleGradient);
    setText('.services .section-subtitle', data.sectionSubtitle);

    document.querySelectorAll('.service-card').forEach((card, i) => {
        if (!data.items[i]) return;
        const item = data.items[i];
        const num = card.querySelector('.service-number');
        const h3 = card.querySelector('h3');
        const p = card.querySelector('p');
        if (num) num.textContent = item.number;
        if (h3) h3.textContent = item.title;
        if (p) p.textContent = item.description;
    });
}

function applyProjects(data) {
    const section = document.querySelector('.projects');
    if (!section) return;

    setText('.projects .section-label', data.sectionLabel);
    setSectionTitle('.projects .section-title', data.sectionTitle, data.sectionTitleGradient);

    const grid = section.querySelector('.projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    data.items.forEach((item, i) => {
        const images = item.images || (item.image ? [item.image] : []);
        const isSlideshow = images.length > 1;
        const card = document.createElement('div');
        card.className = 'project-card' + (isSlideshow ? ' project-slideshow' : '') + ' reveal-scale delay-' + (i + 1);

        const imgsHtml = images.map((src, j) =>
            `<img class="project-card-image${j === 0 ? ' active' : ''}" src="${escapeHtml(src)}" alt="${escapeHtml(item.title)}">`
        ).join('');

        card.innerHTML = `
            ${imgsHtml}
            <div class="project-card-overlay">
                <span class="project-tag">${escapeHtml(item.tag)}</span>
                <h3>${escapeHtml(item.title)}</h3>
                <p>${escapeHtml(item.description)}</p>
            </div>
        `;
        grid.appendChild(card);
    });

    // Init slideshows
    grid.querySelectorAll('.project-slideshow').forEach(card => {
        const imgs = card.querySelectorAll('.project-card-image');
        if (imgs.length <= 1) return;
        let cur = 0;
        setInterval(() => {
            imgs[cur].classList.remove('active');
            cur = (cur + 1) % imgs.length;
            imgs[cur].classList.add('active');
        }, 5000);
    });

    // Re-observe for reveal animations
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    grid.querySelectorAll('.reveal-scale').forEach(el => revealObserver.observe(el));

    // Re-apply 3D tilt
    grid.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            card.style.transform = `perspective(1000px) rotateX(${(y - 0.5) * -10}deg) rotateY(${(x - 0.5) * 10}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

function applyStats(data) {
    document.querySelectorAll('.stat-item').forEach((item, i) => {
        if (!data.items[i]) return;
        const stat = data.items[i];
        const numEl = item.querySelector('.stat-number');
        const labelEl = item.querySelector('.stat-label');
        if (numEl) {
            numEl.dataset.target = stat.target;
            numEl.dataset.suffix = stat.suffix;
        }
        if (labelEl) labelEl.textContent = stat.label;
    });
}

function applyProcess(data) {
    const section = document.querySelector('.process');
    if (!section) return;

    setText('.process .section-label', data.sectionLabel);
    setSectionTitle('.process .section-title', data.sectionTitle, data.sectionTitleGradient);

    section.querySelectorAll('.process-step').forEach((step, i) => {
        if (!data.items[i]) return;
        const item = data.items[i];
        const num = step.querySelector('.process-step-number');
        const h3 = step.querySelector('h3');
        const p = step.querySelector('p');
        if (num) num.textContent = item.number;
        if (h3) h3.textContent = item.title;
        if (p) p.textContent = item.description;
    });
}

function applyTestimonials(data) {
    const section = document.querySelector('.testimonials');
    if (!section) return;

    setText('.testimonials .section-label', data.sectionLabel);
    setSectionTitle('.testimonials .section-title', data.sectionTitle, data.sectionTitleGradient);

    // Set global for carousel in components.js
    window.__testimonials = data.items;

    // Update initial 3 cards
    const slots = section.querySelectorAll('.testimonial-slot');
    slots.forEach((slot, i) => {
        if (!data.items[i]) return;
        const t = data.items[i];
        const card = slot.querySelector('.testimonial-card');
        if (!card) return;
        const blockquote = card.querySelector('blockquote');
        const avatar = card.querySelector('.testimonial-avatar');
        const name = card.querySelector('.testimonial-author-info strong');
        const role = card.querySelector('.testimonial-author-info span');
        if (blockquote) blockquote.textContent = t.quote;
        if (avatar) avatar.textContent = t.initials;
        if (name) name.textContent = t.name;
        if (role) role.textContent = t.role;
    });
}
