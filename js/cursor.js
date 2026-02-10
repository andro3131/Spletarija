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
