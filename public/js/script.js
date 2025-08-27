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

// Rotating text functionality
function initRotatingText() {
    const textItems = document.querySelectorAll('.text-item');
    let currentIndex = 0;
    
    if (textItems.length === 0) return;
    
    function rotateText() {
        // Remove active class from current item
        textItems[currentIndex].classList.remove('active');
        textItems[currentIndex].classList.add('fade-out');
        
        // Move to next item
        currentIndex = (currentIndex + 1) % textItems.length;
        
        // Add active class to next item after a short delay
        setTimeout(() => {
            textItems.forEach(item => item.classList.remove('fade-out'));
            textItems[currentIndex].classList.add('active');
        }, 400);
    }
    
    // Start rotation after initial delay
    setTimeout(() => {
        setInterval(rotateText, 4000); // Change text every 4 seconds
    }, 3000); // Wait 3 seconds before starting rotation
}

// Initialize rotating text when page loads
window.addEventListener('load', () => {
    setTimeout(initRotatingText, 2000); // Start after hero animations
    
    // Initialize scroll down indicator functionality
    const scrollDownIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollDownIndicator) {
        scrollDownIndicator.addEventListener('click', () => {
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

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Initialize counter animations when stats come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && statNumber.dataset.target) {
                const target = parseInt(statNumber.dataset.target);
                // Add a small delay for better visual effect
                setTimeout(() => {
                    animateCounter(statNumber, target);
                }, 200);
                // Unobserve after animation starts to prevent re-triggering
                statsObserver.unobserve(entry.target);
            }
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all stat items for counter animation
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stat-item').forEach(item => {
        statsObserver.observe(item);
    });
});

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Timeline slider controls
document.addEventListener('DOMContentLoaded', () => {
    const timelineInfo = document.querySelector('.timeline-info');
    
    if (timelineInfo) {
        const timelineItems = timelineInfo.querySelectorAll('.timeline-item');
        let currentIndex = 0;
        
        // Create slider controls
        const sliderContainer = document.createElement('div');
        sliderContainer.className = 'timeline-slider-controls';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'timeline-nav-btn timeline-prev';
        prevBtn.innerHTML = '‹';
        prevBtn.setAttribute('aria-label', 'Poprzednia karta');
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'timeline-nav-btn timeline-next';
        nextBtn.innerHTML = '›';
        nextBtn.setAttribute('aria-label', 'Następna karta');
        
        // Dots indicator
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'timeline-dots';
        
        // Create dots
        timelineItems.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'timeline-dot';
            if (index === 0) dot.classList.add('active');
            dot.setAttribute('aria-label', `Przejdź do karty ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        sliderContainer.appendChild(prevBtn);
        sliderContainer.appendChild(dotsContainer);
        sliderContainer.appendChild(nextBtn);
        
        // Insert controls after timeline
        timelineInfo.parentNode.insertBefore(sliderContainer, timelineInfo.nextSibling);
        
        function updateSlider() {
             const itemWidth = timelineItems[0].offsetWidth + parseInt(getComputedStyle(timelineInfo).gap);
             const scrollPosition = currentIndex * itemWidth;
             
             timelineInfo.scrollTo({
                 left: scrollPosition,
                 behavior: 'auto'
             });
            
            // Update dots
            document.querySelectorAll('.timeline-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Update button states
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === timelineItems.length - 1;
        }
        
        function goToSlide(index) {
            currentIndex = Math.max(0, Math.min(index, timelineItems.length - 1));
            updateSlider();
        }
        
        function nextSlide() {
            if (currentIndex < timelineItems.length - 1) {
                currentIndex++;
                updateSlider();
            }
        }
        
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Keyboard navigation
        timelineInfo.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextSlide();
            }
        });
        
        // Initial setup
        updateSlider();
        
        // Auto-advance slider (optional)
        let autoAdvanceInterval;
        
        function startAutoAdvance() {
            autoAdvanceInterval = setInterval(() => {
                if (currentIndex < timelineItems.length - 1) {
                    nextSlide();
                } else {
                    goToSlide(0); // Loop back to start
                }
            }, 2500); // Change slide every 2.5 seconds
        }
        
        function stopAutoAdvance() {
            clearInterval(autoAdvanceInterval);
        }
        
        // Start auto-advance
        startAutoAdvance();
        
        // Pause auto-advance on hover
        timelineInfo.addEventListener('mouseenter', stopAutoAdvance);
        timelineInfo.addEventListener('mouseleave', startAutoAdvance);
        sliderContainer.addEventListener('mouseenter', stopAutoAdvance);
        sliderContainer.addEventListener('mouseleave', startAutoAdvance);
    }
});

// Progress percentage animation
function initProgressAnimation() {
    const progressPercentage = document.querySelector('.progress-percentage');
    if (!progressPercentage) return;
    
    // Set initial value to 0%
    progressPercentage.textContent = '0%';
    
    // Start animation after delay (matching CSS animation)
    setTimeout(() => {
        animatePercentage(progressPercentage, 0, 87, 2500);
    }, 1200);
}

function animatePercentage(element, start, end, duration) {
    const startTime = performance.now();
    const range = end - start;
    
    function updatePercentage(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (cubic-bezier equivalent)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = Math.round(start + (range * easeProgress));
        element.textContent = currentValue + '%';
        
        if (progress < 1) {
            requestAnimationFrame(updatePercentage);
        }
    }
    
    requestAnimationFrame(updatePercentage);
}

// Initialize progress animation when page loads
window.addEventListener('load', () => {
    setTimeout(initProgressAnimation, 500);
    
    // Initialize newsletter modal
    initNewsletterModal();
});

// Newsletter Modal Functions
function initNewsletterModal() {
    const modal = document.getElementById('newsletterModal');
    const openBtn = document.getElementById('openNewsletterModal');
    const closeBtn = document.querySelector('.newsletter-close');
    const form = document.getElementById('newsletterForm');
    
    if (!modal || !openBtn) return;
    
    // Open modal
    openBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus first input after animation
        setTimeout(() => {
            const firstInput = modal.querySelector('input[type="text"], input[type="email"]');
            if (firstInput) firstInput.focus();
        }, 400);
    });
    
    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Reset form after close animation
        setTimeout(() => {
            if (form) form.reset();
            const submitBtn = form?.querySelector('.btn-submit');
            if (submitBtn) {
                submitBtn.classList.remove('loading');
            }
        }, 300);
    }
    
    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Click outside modal to close
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.btn-submit');
            const formData = new FormData(form);
            
            // Show loading state
            submitBtn.classList.add('loading');
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Success feedback
                const modalBody = modal.querySelector('.newsletter-modal-body');
                modalBody.innerHTML = `
                    <div class="newsletter-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                    </div>
                    <h4 style="color: #2d3748; margin-bottom: 1rem; font-size: 1.4rem;">Dziękujemy!</h4>
                    <p style="color: #4a5568; font-size: 1.1rem; line-height: 1.6;">Twoja rejestracja została pomyślnie wysłana. Skontaktujemy się z Tobą wkrótce z aktualizacjami o naszych projektach.</p>
                    <button onclick="document.getElementById('newsletterModal').classList.remove('show'); document.body.style.overflow = '';" 
                            style="margin-top: 2rem; padding: 1rem 2rem; background: linear-gradient(135deg, #ff6b9d 0%, #ff8fab 50%, #ff6b9d 100%); color: white; border: none; border-radius: 12px; cursor: pointer; font-weight: 600; transition: all 0.3s ease;"
                            onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 25px rgba(255, 107, 157, 0.4)';" 
                            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none';">
                        Zamknij
                    </button>
                `;
                
                // Auto close after 5 seconds
                setTimeout(() => {
                    if (modal.classList.contains('show')) {
                        closeModal();
                    }
                }, 5000);
                
            }, 2000); // Simulate 2 second processing time
        });
    }
}

// Scroll to Top Button functionality
document.addEventListener('DOMContentLoaded', () => {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (scrollToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });
        
        // Scroll to top when button is clicked
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});

// Gallery Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const openGalleryBtn = document.getElementById('openGalleryModal');
    const galleryModal = document.getElementById('galleryModal');
    const closeGalleryBtn = document.getElementById('closeGalleryModal');
    const projectModal = document.getElementById('projectModal');
    const closeProjectBtn = document.getElementById('closeProjectModal');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const projectThumbnails = document.querySelectorAll('.project-thumbnail');
    
    // Project data for different projects
    const projectData = {
        'tech-startup': {
            title: 'Logo "TechStart"',
            description: 'Minimalistyczne logo dla startupu technologicznego z nowoczesnymi elementami. Projekt obejmuje pełną identyfikację wizualną z logo, wizytówkami i papeterią firmową.',
            tags: ['Logo Design', 'Tech', 'Startup']
        },
        'restaurant-smakow': {
             title: 'Logo Restauracji "Smaków"',
             description: 'Eleganckie logo dla restauracji z tradycyjnymi smakami. Projekt łączy klasyczne elementy kulinarne z nowoczesnym designem, podkreślając autentyczność i jakość potraw.',
             tags: ['Logo Design', 'Restaurant', 'Traditional']
         },
         'fitness-powergym': {
             title: 'Logo Fitness "PowerGym"',
             description: 'Dynamiczne logo dla siłowni i centrum fitness. Projekt charakteryzuje się energetycznymi elementami graficznymi, które motywują do aktywności fizycznej i podkreślają siłę marki.',
             tags: ['Logo Design', 'Fitness', 'Sport']
         },
        'ecolife-brand': {
            title: 'Branding "EcoLife"',
            description: 'Kompleksowy branding dla firmy ekologicznej. Projekt obejmuje logo, wizytówki, papeterię, oraz materiały marketingowe. Wykorzystano naturalne kolory i organiczne kształty.',
            tags: ['Branding', 'Eco', 'Nature']
        },
        'luxury-spa': {
            title: 'Branding "Luxury Spa"',
            description: 'Elegancka identyfikacja wizualna dla ekskluzywnego spa i wellness. Projekt podkreśla luksusowy charakter marki poprzez wyrafinowane elementy graficzne i premium kolorystykę.',
            tags: ['Branding', 'Luxury', 'Spa']
        },
        'business-cards': {
            title: 'Wizytówki Premium',
            description: 'Eleganckie wizytówki biznesowe wykonane na wysokiej jakości papierze. Projekt łączy klasyczną elegancję z nowoczesnymi elementami graficznymi. Dostępne w różnych wariantach kolorystycznych.',
            tags: ['Print Design', 'Business Cards', 'Premium']
        },
        'brochure-design': {
             title: 'Broszura Informacyjna',
             description: 'Profesjonalne materiały drukowane dla centrum medycznego. Projekt charakteryzuje się przejrzystym layoutem, czytelną typografią i profesjonalną prezentacją informacji medycznych.',
             tags: ['Print Design', 'Brochure', 'Medical']
         },
         'creative-studio': {
             title: 'Branding "Creative Studio"',
             description: 'Kreatywna identyfikacja dla studia projektowego z artystycznymi elementami. Projekt łączy nowoczesność z kreatywnością, tworząc unikalną tożsamość wizualną.',
             tags: ['Branding', 'Creative', 'Studio']
         },
         'furniture-catalog': {
             title: 'Katalog "Meble Design"',
             description: 'Profesjonalny katalog produktów dla firmy meblarskiej z eleganckimi zdjęciami. Projekt charakteryzuje się wysoką jakością prezentacji produktów i przejrzystym układem.',
             tags: ['Print Design', 'Katalog', 'Furniture']
         },
         'festival-flyers': {
             title: 'Ulotki "Summer Festival"',
             description: 'Kolorowe ulotki promocyjne dla festiwalu muzycznego z żywymi grafikami. Projekt przyciąga uwagę dynamicznymi elementami i energetyczną kolorystyką.',
             tags: ['Print Design', 'Event', 'Festival']
         }
    };
    
    // Open gallery modal
    if (openGalleryBtn) {
        openGalleryBtn.addEventListener('click', () => {
            galleryModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }
    
    // Close gallery modal
    if (closeGalleryBtn) {
        closeGalleryBtn.addEventListener('click', () => {
            galleryModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close project modal
    if (closeProjectBtn) {
        closeProjectBtn.addEventListener('click', () => {
            projectModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modals when clicking outside
    [galleryModal, projectModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (galleryModal.classList.contains('show')) {
                galleryModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
            if (projectModal.classList.contains('show')) {
                projectModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Handle gallery item clicks
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const projectId = item.dataset.project;
            const project = projectData[projectId];
            
            if (project) {
                // Update project modal content
                document.getElementById('projectModalTitle').textContent = project.title;
                document.getElementById('projectInfoTitle').textContent = project.title;
                document.getElementById('projectInfoDescription').textContent = project.description;
                
                // Update tags
                const tagsContainer = document.getElementById('projectInfoTags');
                tagsContainer.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'tag';
                    tagElement.textContent = tag;
                    tagsContainer.appendChild(tagElement);
                });
                
                // Close gallery modal and open project modal
                galleryModal.classList.remove('show');
                setTimeout(() => {
                    projectModal.classList.add('show');
                }, 300);
            }
        });
    });
    
    // Handle project thumbnail clicks
    projectThumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            projectThumbnails.forEach(thumb => thumb.classList.remove('active'));
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            // Here you could update the main image based on the thumbnail
            // For now, we'll just show the selection
        });
    });
    
    // Add click handlers to existing portfolio items for direct access
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get category and create a project ID based on the title
            const category = item.dataset.category;
            const title = item.querySelector('.portfolio-overlay h4')?.textContent;
            
            // Map existing portfolio items to project data
            let projectId = null;
            if (title?.includes('TechStart') || title?.includes('Tech Startup')) projectId = 'tech-startup';
            else if (title?.includes('Smaków')) projectId = 'restaurant-smakow';
            else if (title?.includes('PowerGym')) projectId = 'fitness-powergym';
            else if (title?.includes('EcoLife')) projectId = 'ecolife-brand';
            else if (title?.includes('Luxury Spa')) projectId = 'luxury-spa';
            else if (title?.includes('Creative Studio')) projectId = 'creative-studio';
            else if (title?.includes('Katalog') || title?.includes('Meble')) projectId = 'furniture-catalog';
            else if (title?.includes('Ulotki') || title?.includes('Festival')) projectId = 'festival-flyers';
            else if (title?.includes('Broszura') || title?.includes('Medical')) projectId = 'brochure-design';
            else if (title?.includes('Wizytówki') || title?.includes('Business')) projectId = 'business-cards';
            
            if (projectId && projectData[projectId]) {
                const project = projectData[projectId];
                
                // Update project modal content
                document.getElementById('projectModalTitle').textContent = project.title;
                document.getElementById('projectInfoTitle').textContent = project.title;
                document.getElementById('projectInfoDescription').textContent = project.description;
                
                // Update tags
                const tagsContainer = document.getElementById('projectInfoTags');
                tagsContainer.innerHTML = '';
                project.tags.forEach(tag => {
                    const tagElement = document.createElement('span');
                    tagElement.className = 'tag';
                    tagElement.textContent = tag;
                    tagsContainer.appendChild(tagElement);
                });
                
                // Open project modal
                projectModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });
});

// Testimonials Slider
document.addEventListener('DOMContentLoaded', () => {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.testimonials-dots .dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    
    let currentSlide = 0;
    let autoSlideInterval;
    
    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all items and dots
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        if (testimonialItems[index]) {
            testimonialItems[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }
    
    // Function to go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % testimonialItems.length;
        showSlide(nextIndex);
    }
    
    // Function to go to previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + testimonialItems.length) % testimonialItems.length;
        showSlide(prevIndex);
    }
    
    // Function to start auto-slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    // Function to stop auto-slide
    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }
    
    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(index);
            startAutoSlide();
        });
    });
    
    // Pause auto-slide on hover
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', stopAutoSlide);
        testimonialsSection.addEventListener('mouseleave', startAutoSlide);
    }
    
    // Start auto-slide when page loads
    if (testimonialItems.length > 1) {
        startAutoSlide();
    }
    
    // Handle touch/swipe gestures for mobile
    let startX = 0;
    let endX = 0;
    
    if (testimonialsSection) {
        testimonialsSection.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        testimonialsSection.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    }
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            stopAutoSlide();
            if (diff > 0) {
                // Swipe left - next slide
                nextSlide();
            } else {
                // Swipe right - previous slide
                prevSlide();
            }
            startAutoSlide();
        }
    }
});

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';
