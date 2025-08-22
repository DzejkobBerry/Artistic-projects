// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
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

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Loading animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    }
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
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Hero parallax effect
const hero = document.querySelector('.hero');
const particles = document.querySelector('.particles');

if (hero && particles) {
    // Mouse move parallax
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        const moveX = (x - 0.5) * 20;
        const moveY = (y - 0.5) * 20;
        
        particles.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    
    // Reset on mouse leave
    hero.addEventListener('mouseleave', () => {
        particles.style.transform = 'translate(0, 0)';
    });
}

// Hero elements animation
const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-buttons');

const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

heroElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
    heroObserver.observe(el);
});

// Parallax scrolling effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero-background');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Language Switcher Dropdown Functionality
const languageButton = document.getElementById('languageBtn');
const languageOptions = document.getElementById('languageOptions');
const languageOptionItems = document.querySelectorAll('.language-option');
let currentLanguage = 'pl';

// Language data
const languageData = {
    pl: { 
        flag: '<svg viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#FFFFFF"/><rect width="24" height="8" fill="#DC143C"/></svg>', 
        code: 'PL', 
        name: 'Polski' 
    },
    en: { 
        flag: '<svg viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#012169"/><path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" stroke-width="1.6"/><path d="M0 0L24 16M24 0L0 16" stroke="#C8102E" stroke-width="1"/><path d="M12 0V16M0 8H24" stroke="#FFFFFF" stroke-width="2.7"/><path d="M12 0V16M0 8H24" stroke="#C8102E" stroke-width="1.6"/></svg>', 
        code: 'EN', 
        name: 'English' 
    },
    nl: { 
        flag: '<svg viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="24" height="16" fill="#21468B"/><rect width="24" height="10.67" fill="#FFFFFF"/><rect width="24" height="5.33" fill="#AE1C28"/></svg>', 
        code: 'NL', 
        name: 'Nederlands' 
    }
};

if (languageButton && languageOptions) {
    // Toggle dropdown
    languageButton.addEventListener('click', (e) => {
        e.stopPropagation();
        languageButton.classList.toggle('active');
        languageOptions.classList.toggle('show');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        languageButton.classList.remove('active');
        languageOptions.classList.remove('show');
    });

    // Handle language selection
    languageOptionItems.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Remove active class from all options
            languageOptionItems.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to selected option
            option.classList.add('active');
            
            // Update current language
            const selectedLang = option.dataset.lang;
            currentLanguage = selectedLang;
            
            // Update button display
            updateLanguageButton(selectedLang);
            
            // Update translations
            updateLanguage(selectedLang);
            
            // Close dropdown
            languageButton.classList.remove('active');
            languageOptions.classList.remove('show');
            
            // Store preference
            localStorage.setItem('preferredLanguage', selectedLang);
        });
    });
}

// Update language button display
function updateLanguageButton(lang) {
    const flagIcon = languageButton.querySelector('.flag-icon');
    const langCode = languageButton.querySelector('.language-code');
    
    if (flagIcon && langCode && languageData[lang]) {
        flagIcon.innerHTML = languageData[lang].flag;
        langCode.textContent = languageData[lang].code;
    }
}

// Language translations
const translations = {
    pl: {
        'Strona Główna': 'Strona Główna',
        'O Nas': 'O Nas',
        'Usługi': 'Usługi',
        'Portfolio': 'Portfolio',
        'Kontakt': 'Kontakt',
        'Rozpocznij Projekt': 'Rozpocznij Projekt'
    },
    en: {
        'Strona Główna': 'Home',
        'O Nas': 'About Us',
        'Usługi': 'Services',
        'Portfolio': 'Portfolio',
        'Kontakt': 'Contact',
        'Rozpocznij Projekt': 'Start Project'
    },
    nl: {
        'Strona Główna': 'Startpagina',
        'O Nas': 'Over Ons',
        'Usługi': 'Diensten',
        'Portfolio': 'Portfolio',
        'Kontakt': 'Contact',
        'Rozpocznij Projekt': 'Start Project'
    }
};

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
            // POPRAWKA: użyj languageOptionItems zamiast languageOptions
            languageOptionItems.forEach(opt => opt.classList.remove('active'));
            targetOption.classList.add('active');
            currentLanguage = savedLanguage;
            updateLanguage(savedLanguage);
            // DODAJ: aktualizuj przycisk języka
            updateLanguageButton(savedLanguage);
        }
    } else {
        // DODAJ: inicjalizuj domyślny język polski
        updateLanguageButton('pl');
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
