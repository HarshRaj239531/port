document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuToggle.addEventListener('click', () => {
        const isHidden = mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden', !isHidden);
        mobileMenu.style.height = isHidden ? 'auto' : '0px';
        mobileMenu.style.opacity = isHidden ? '1' : '0';
        mobileMenu.style.transition = 'height 0.3s ease, opacity 0.3s ease';
    });

    // tsParticles initialization
    tsParticles.load('tsparticles', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#ffffff' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
        },
        interactivity: {
            events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
            modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
        },
        retina_detect: true
    });

    // About section animation
    /*const aboutSection = document.getElementById('about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.style.opacity = '1';
                    aboutSection.style.transform = 'translateY(0)';
                    aboutSection.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    observer.unobserve(aboutSection);
                }
            });
        }, { threshold: 0.1 });
        observer.observe(aboutSection);
    }
    */
    
   const aboutSection = document.getElementById('about');
    const observerOptions = {
        threshold: 0.2 // Trigger when 20% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    if (aboutSection) {
        observer.observe(aboutSection);
    }
    // Contact form submission
    const form = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (form && formMessage) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            formMessage.classList.add('hidden');
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            try {
                const response = await fetch('/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                
                formMessage.textContent = result.message;
                formMessage.classList.remove('hidden');
                formMessage.classList.toggle('text-green-400', result.success);
                formMessage.classList.toggle('text-red-400', !result.success);
                
                if (result.success) form.reset();
            } catch (error) {
                formMessage.textContent = 'An error occurred. Please try again.';
                formMessage.classList.remove('hidden');
                formMessage.classList.add('text-red-400');
            }
        });
    }
});
