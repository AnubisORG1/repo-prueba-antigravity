document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // 2. Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 3. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    let isMenuOpen = false;

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
        } else {
            mobileMenu.classList.add('hidden');
        }
    }

    mobileMenuBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // 4. Navbar Background on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-lg');
            navbar.querySelector('div').classList.replace('bg-dark-900/80', 'bg-dark-900/95');
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.querySelector('div').classList.replace('bg-dark-900/95', 'bg-dark-900/80');
        }
    });

    // 5. Quote Form Handling
    const quoteForm = document.getElementById('quote-form');
    const btnSubmit = document.getElementById('btn-submit-quote');
    const btnText = btnSubmit.querySelector('.btn-text');
    const btnIcon = btnSubmit.querySelector('.btn-icon');
    const btnLoader = btnSubmit.querySelector('.btn-loader');
    const feedbackBox = document.getElementById('quote-feedback');

    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Check HTML5 validation
            if (!quoteForm.checkValidity()) {
                // Force validation UI
                quoteForm.querySelectorAll('input, select, textarea').forEach(el => {
                    if (!el.validity.valid) {
                        el.classList.add('border-red-400');
                        el.parentElement.querySelector('.error-msg')?.classList.remove('hidden');
                    } else {
                        el.classList.remove('border-red-400');
                        el.parentElement.querySelector('.error-msg')?.classList.add('hidden');
                    }
                });
                return;
            }

            // Clear errors
            quoteForm.querySelectorAll('.error-msg').forEach(el => el.classList.add('hidden'));
            quoteForm.querySelectorAll('input, select, textarea').forEach(el => el.classList.remove('border-red-400'));

            // Loading state
            btnSubmit.disabled = true;
            btnText.classList.add('opacity-0');
            btnIcon.classList.add('opacity-0');
            btnLoader.classList.remove('hidden');
            feedbackBox.classList.add('hidden');

            try {
                // Mock API call (simulate delay)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success
                feedbackBox.className = 'p-4 rounded-xl text-sm font-medium flex items-start gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400';
                feedbackBox.innerHTML = `
                    <i data-lucide="check-circle-2" class="w-5 h-5 shrink-0 mt-0.5"></i>
                    <div>
                        <strong>¡Solicitud enviada con éxito!</strong><br/>
                        He recibido tus detalles. Te responderé al correo proporcionado en menos de 24 horas.
                    </div>
                `;
                feedbackBox.classList.remove('hidden');
                lucide.createIcons();
                quoteForm.reset();

            } catch (error) {
                // Error
                feedbackBox.className = 'p-4 rounded-xl text-sm font-medium flex items-start gap-3 bg-red-500/10 border border-red-500/20 text-red-400';
                feedbackBox.innerHTML = `
                    <i data-lucide="alert-circle" class="w-5 h-5 shrink-0 mt-0.5"></i>
                    <div>
                        <strong>Ocurrió un error</strong><br/>
                        No pudimos procesar tu solicitud en este momento. Por favor, intenta de nuevo o contáctame directamente por WhatsApp.
                    </div>
                `;
                feedbackBox.classList.remove('hidden');
                lucide.createIcons();
            } finally {
                // Reset loading state
                btnSubmit.disabled = false;
                btnText.classList.remove('opacity-0');
                btnIcon.classList.remove('opacity-0');
                btnLoader.classList.add('hidden');
            }
        });

        // Clear error on input change
        quoteForm.querySelectorAll('input, select, textarea').forEach(el => {
            el.addEventListener('input', () => {
                if (el.validity.valid) {
                    el.classList.remove('border-red-400');
                    el.parentElement.querySelector('.error-msg')?.classList.add('hidden');
                }
            });
        });
    }
});
