// ========== SPLETARIJA - MAIN JAVASCRIPT ==========

// Import modules
import './cursor.js';
import './animations.js';
import { initMockupCycle, initTestimonialsCarousel } from './components.js';
import { initContactForm } from './contact.js';
import { loadContent } from './content-loader.js';

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

// ========== INITIALIZE ON DOM READY ==========
document.addEventListener('DOMContentLoaded', async () => {
    document.body.classList.add('loaded');

    await loadContent();

    initMockupCycle();
    initContactForm();
    initTestimonialsCarousel();

    console.log('\uD83C\uDFA8 Spletarije loaded successfully');
});
