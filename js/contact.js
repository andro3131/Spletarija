// ========== CONTACT FORM ==========
export function initContactForm() {
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
            const serviceID = 'service_ldorija';
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
            formStatus.textContent = '\u2713 Sporočilo uspešno poslano! Odgovorili vam bomo v najkrajšem možnem času.';

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
            formStatus.textContent = '\u2717 Napaka: ' + errorMsg;
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
