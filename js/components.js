// ========== MOCKUP CODE ANIMATION ==========
const mockupSnippets = [
    // HTML Snippet
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

export function initMockupCycle() {
    const mockupContainer = document.querySelector('.mockup-code');
    if (!mockupContainer) return;

    setInterval(() => {
        currentSnippetIndex = (currentSnippetIndex + 1) % mockupSnippets.length;

        mockupContainer.style.opacity = '0';

        setTimeout(() => {
            mockupContainer.innerHTML = mockupSnippets[currentSnippetIndex];
            mockupContainer.style.opacity = '1';
        }, 50);

    }, 7000);
}

// ========== TESTIMONIALS CAROUSEL ==========
export function initTestimonialsCarousel() {
    const slots = document.querySelectorAll('.testimonial-slot');
    if (slots.length === 0) return;

    const allTestimonials = window.__testimonials || [
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

    let activeIndices = [0, 1, 2];

    function getRandomInterval() {
        return 5000 + Math.random() * 2000;
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
        const slotIndex = Math.floor(Math.random() * 3);
        const slot = slots[slotIndex];
        const currentCard = slot.querySelector('.testimonial-card.active');

        const available = allTestimonials
            .map((t, i) => i)
            .filter(i => !activeIndices.includes(i));

        if (available.length === 0) return;

        const newIndex = available[Math.floor(Math.random() * available.length)];

        if (currentCard) {
            currentCard.classList.remove('active');
        }

        setTimeout(() => {
            if (currentCard) currentCard.remove();

            const newCard = document.createElement('div');
            newCard.className = 'testimonial-card';
            newCard.dataset.index = newIndex;
            newCard.innerHTML = buildCard(allTestimonials[newIndex]);
            slot.appendChild(newCard);

            newCard.offsetHeight;
            newCard.classList.add('active');

            activeIndices[slotIndex] = newIndex;
        }, 600);

        setTimeout(swapTestimonial, getRandomInterval());
    }

    setTimeout(swapTestimonial, getRandomInterval());
}

// ========== PROJECT CARD SLIDESHOW ==========
document.querySelectorAll('.project-slideshow').forEach(card => {
    const images = card.querySelectorAll('.project-card-image');
    if (images.length <= 1) return;

    let current = 0;
    setInterval(() => {
        images[current].classList.remove('active');
        current = (current + 1) % images.length;
        images[current].classList.add('active');
    }, 5000);
});

// ========== PROJECT PREVIEW MODAL ==========
const projectModal = document.getElementById('projectModal');
const projectModalIframe = document.getElementById('projectModalIframe');
const projectModalUrl = document.getElementById('projectModalUrl');
const projectModalNewTab = document.getElementById('projectModalNewTab');
const projectModalClose = document.getElementById('projectModalClose');

function openProjectModal(url) {
    if (!projectModal || !url) return;
    projectModalIframe.src = url;
    projectModalUrl.textContent = url.replace('https://', '');
    projectModalNewTab.href = url;
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => { projectModalIframe.src = ''; }, 300);
}

if (projectModalClose) projectModalClose.addEventListener('click', closeProjectModal);
if (projectModal) projectModal.addEventListener('click', (e) => {
    if (e.target === projectModal) closeProjectModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
});

// Attach click to project cards (including dynamically loaded ones)
document.addEventListener('click', (e) => {
    const card = e.target.closest('.project-card[data-url]');
    if (card) {
        e.preventDefault();
        openProjectModal(card.dataset.url);
    }
});
