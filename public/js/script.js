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
    pl: { flag: '/images/flags/pl.svg', code: 'PL', name: 'Polski' },
    en: { flag: '/images/flags/gb.svg', code: 'EN', name: 'English' },
    nl: { flag: '/images/flags/nl.svg', code: 'NL', name: 'Nederlands' }
};

// Ensure flag display with SVG images
function ensureFlagDisplay() {
    document.querySelectorAll('.flag-icon').forEach(flag => {
        if (flag.tagName !== 'IMG') {
            const lang = flag.closest('[data-lang]')?.dataset.lang || 'pl';
            if (languageData[lang]) {
                const imgElement = document.createElement('img');
                imgElement.src = languageData[lang].flag;
                imgElement.alt = languageData[lang].code;
                imgElement.className = 'flag-icon';
                flag.parentNode.replaceChild(imgElement, flag);
            }
        }
    });
}

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
        // Update flag image
        if (flagIcon.tagName === 'IMG') {
            flagIcon.src = languageData[lang].flag;
            flagIcon.alt = languageData[lang].code;
        } else {
            // Replace text element with img element
            const imgElement = document.createElement('img');
            imgElement.src = languageData[lang].flag;
            imgElement.alt = languageData[lang].code;
            imgElement.className = 'flag-icon';
            flagIcon.parentNode.replaceChild(imgElement, flagIcon);
        }
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

// Initialize language on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    // Ensure language button is initialized
    if (languageButton) {
        updateLanguageButton('pl');
    }
    // Ensure all flags are displayed correctly
    ensureFlagDisplay();
});

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

// Rotating hero subtitle text
function initRotatingText() {
    const rotatingElement = document.getElementById('rotatingText');
    if (!rotatingElement) return;
    
    const messages = [
        'Tworzymy niepowtarzalne projekty graficzne, które <span class="subtitle-emphasis">wyróżniają Twoją markę</span>',
        'Twój partner w tworzeniu <span class="subtitle-emphasis">innowacyjnych rozwiązań cyfrowych</span>',
        'Wykorzystujemy najnowsze technologie, aby pomóc Ci <span class="subtitle-emphasis">osiągnąć sukces</span>',
        'Doświadczeni specjaliści gotowi do <span class="subtitle-emphasis">realizacji Twoich projektów</span>'
    ];
    
    let currentIndex = 0;
    
    function changeText() {
        rotatingElement.style.opacity = '0';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % messages.length;
            rotatingElement.innerHTML = messages[currentIndex];
            rotatingElement.style.opacity = '1';
        }, 500);
    }
    
    // Start rotation after initial animation completes
    setTimeout(() => {
        setInterval(changeText, 3000);
    }, 3000);
}

// Initialize rotating text when DOM is loaded
document.addEventListener('DOMContentLoaded', initRotatingText);

// Scroll indicator functionality
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Section title underline animation on scroll
document.addEventListener('DOMContentLoaded', function() {
    const sectionUnderlines = document.querySelectorAll('.section-title-underline');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    sectionUnderlines.forEach(underline => {
        observer.observe(underline);
    });
});