// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    if (loading) {
        loading.classList.add('hidden');
        // Opcjonalnie: całkowite usunięcie po animacji
        setTimeout(() => {
            loading.style.display = 'none';
        }, 500);
    }
    document.body.classList.add('loaded');
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Interaktywne animacje tła hero
const hero = document.querySelector('.hero');
const particles = document.querySelector('.particles');

if (hero && particles) {
    // Animacja ruchu myszy
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        
        particles.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // Reset pozycji gdy mysz opuszcza hero
    hero.addEventListener('mouseleave', () => {
        particles.style.transform = 'translate(0, 0)';
    });
}

// Animacje fade-in dla elementów hero
const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}, { threshold: 0.1 });

heroElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    heroObserver.observe(el);
});

// Dodatkowe efekty przy scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Language Switcher Functionality
const languageOptions = document.querySelectorAll('.language-option');
const languageIndicator = document.querySelector('.language-indicator');
let currentLanguage = 'pl';

// Language translations
const translations = {
    pl: {
        'Strona Główna': 'Strona Główna',
        'O Nas': 'O Nas',
        'Usługi': 'Usługi',
        'Portfolio': 'Portfolio',
        'Proces': 'Proces',
        'Rozpocznij Projekt': 'Rozpocznij Projekt'
    },
    en: {
        'Strona Główna': 'Home',
        'O Nas': 'About Us',
        'Usługi': 'Services',
        'Portfolio': 'Portfolio',
        'Proces': 'Process',
        'Rozpocznij Projekt': 'Start Project'
    },
    nl: {
        'Strona Główna': 'Startpagina',
        'O Nas': 'Over Ons',
        'Usługi': 'Diensten',
        'Portfolio': 'Portfolio',
        'Proces': 'Proces',
        'Rozpocznij Projekt': 'Start Project'
    }
};

// Initialize language switcher
if (languageOptions.length > 0) {
    languageOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            languageOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Update current language
            currentLanguage = option.dataset.lang;
            
            // Update translations
            updateLanguage(currentLanguage);
            
            // Add animation effect
            option.style.transform = 'scale(1.1)';
            setTimeout(() => {
                option.style.transform = 'scale(1.05)';
            }, 150);
            
            // Store language preference
            localStorage.setItem('preferredLanguage', currentLanguage);
        });
    });
}

// Function to update language
function updateLanguage(lang) {
    const elementsToTranslate = document.querySelectorAll('[data-pl]');
    
    elementsToTranslate.forEach(element => {
        const key = element.dataset.pl;
        if (translations[lang] && translations[lang][key]) {
            // Add fade effect
            element.style.opacity = '0.5';
            
            setTimeout(() => {
                element.textContent = translations[lang][key];
                element.style.opacity = '1';
            }, 150);
        }
    });
    
    // Update document language
    document.documentElement.lang = lang;
}

// Load saved language preference
window.addEventListener('load', () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage && savedLanguage !== 'pl') {
        const targetOption = document.querySelector(`[data-lang="${savedLanguage}"]`);
        if (targetOption) {
            languageOptions.forEach(opt => opt.classList.remove('active'));
            targetOption.classList.add('active');
            currentLanguage = savedLanguage;
            updateLanguage(savedLanguage);
        }
    }
});

// Enhanced navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrolled = window.scrollY > 50;
    
    if (scrolled) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth language transition animation
function animateLanguageChange() {
    const navLinks = document.querySelectorAll('.nav-link span');
    
    navLinks.forEach((link, index) => {
        setTimeout(() => {
            link.style.transform = 'translateY(-10px)';
            link.style.opacity = '0';
            
            setTimeout(() => {
                link.style.transform = 'translateY(0)';
                link.style.opacity = '1';
            }, 200);
        }, index * 50);
    });
}