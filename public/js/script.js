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

// Mobile language dropdown toggle
const mobileLanguageBtn = document.getElementById('mobileLanguageBtn');
const mobileLanguageOptions = document.getElementById('mobileLanguageOptions');

if (mobileLanguageBtn && mobileLanguageOptions) {
    mobileLanguageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        mobileLanguageBtn.classList.toggle('active');
    });

    // Close mobile language dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileLanguageBtn.contains(e.target) && !mobileLanguageOptions.contains(e.target)) {
            mobileLanguageBtn.classList.remove('active');
        }
    });

    // Handle mobile language option clicks
    mobileLanguageOptions.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', () => {
            mobileLanguageBtn.classList.remove('active');
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

// Enhanced Loading animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        // Show loading for much longer to appreciate the animation
        setTimeout(() => {
            loading.classList.add('hidden');
            // Allow more time for the fade-out animation
            setTimeout(() => {
                loading.style.display = 'none';
                // Enable body scroll after loading is completely hidden
                document.body.style.overflow = 'auto';
            }, 1200); // Increased fade-out time
        }, 4000); // Increased from 2500ms to 4000ms for better visibility
    }
    
    // Prevent scrolling during loading
    document.body.style.overflow = 'hidden';
});

// Show preloader immediately when page starts loading
document.addEventListener('DOMContentLoaded', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'flex';
        loading.style.opacity = '1';
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
    
    // Check if this stat should have a + sign
    const shouldHavePlus = target === 500 || target === 1000;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        const displayValue = Math.floor(current);
        element.textContent = shouldHavePlus ? displayValue + '+' : displayValue;
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

// Portfolio filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    item.style.opacity = '1';
                } else {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === filterValue) {
                        item.style.display = 'block';
                        item.style.opacity = '1';
                    } else {
                        item.style.display = 'none';
                        item.style.opacity = '0';
                    }
                }
            });
            
            // Update mobile filter toggle text if mobile dropdown is visible
            const mobileToggle = document.getElementById('mobileFilterToggle');
            const filterText = mobileToggle?.querySelector('.filter-text');
            if (filterText && window.innerWidth <= 768) {
                filterText.textContent = button.textContent;
                // Close mobile menu after selection
                const mobileMenu = document.getElementById('mobileFilterMenu');
                const mobileToggleBtn = document.getElementById('mobileFilterToggle');
                if (mobileMenu && mobileToggleBtn) {
                    mobileMenu.classList.remove('show');
                    mobileToggleBtn.classList.remove('active');
                }
            }
        });
    });
}

// Mobile filter dropdown functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.getElementById('mobileFilterToggle');
    const mobileMenu = document.getElementById('mobileFilterMenu');
    
    if (mobileToggle && mobileMenu) {
        // Toggle dropdown menu
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('show');
            mobileToggle.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('show');
                mobileToggle.classList.remove('active');
            }
        });
        
        // Close dropdown on window resize if switching to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                mobileMenu.classList.remove('show');
                mobileToggle.classList.remove('active');
            }
        });
        
        // Handle mobile filter selection
        const mobileFilterButtons = mobileMenu.querySelectorAll('.filter-btn');
        const desktopFilterButtons = document.querySelectorAll('.desktop-filters .filter-btn');
        
        mobileFilterButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                // Sync with desktop filters
                if (desktopFilterButtons[index]) {
                    desktopFilterButtons.forEach(btn => btn.classList.remove('active'));
                    desktopFilterButtons[index].classList.add('active');
                }
            });
        });
    }
});

// Logo Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
    const logoModal = document.getElementById('logoModal');
    const aboutLogo = document.querySelector('.about-logo');
    const closeBtn = document.querySelector('.modal .close');
    
    // Open modal when clicking on the logo
    if (aboutLogo && logoModal) {
        aboutLogo.addEventListener('click', (e) => {
            e.preventDefault();
            logoModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            
            // Add entrance animation
            setTimeout(() => {
                logoModal.classList.add('show');
            }, 10);
        });
    }
    
    // Close modal when clicking the X button
    if (closeBtn && logoModal) {
        closeBtn.addEventListener('click', () => {
            closeModal();
        });
    }
    
    // Close modal when clicking outside the modal content
    if (logoModal) {
        logoModal.addEventListener('click', (e) => {
            if (e.target === logoModal) {
                closeModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && logoModal && logoModal.style.display === 'block') {
            closeModal();
        }
    });
    
    // Function to close modal with animation
    function closeModal() {
        if (logoModal) {
            logoModal.classList.remove('show');
            document.body.style.overflow = 'auto';
            
            // Hide modal after animation completes
            setTimeout(() => {
                logoModal.style.display = 'none';
            }, 300);
        }
    }
    
    // Add hover effect to owner avatars for future image upload functionality
    const ownerAvatars = document.querySelectorAll('.owner-avatar');
    ownerAvatars.forEach(avatar => {
        avatar.addEventListener('click', () => {
            // Placeholder for future image upload functionality
            console.log('Avatar clicked - future image upload functionality');
        });
    });
});

// Add CSS class for modal show animation
if (!document.querySelector('style[data-modal-styles]')) {
    const modalStyles = document.createElement('style');
    modalStyles.setAttribute('data-modal-styles', 'true');
    modalStyles.textContent = `
        .modal.show {
            opacity: 1 !important;
        }
        .modal.show .modal-content {
            transform: translateY(0) scale(1) !important;
        }
    `;
    document.head.appendChild(modalStyles);
}

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
        'tworzenie-logo': {
            title: 'Tworzenie Logo',
            description: 'Profesjonalne projektowanie logo i identyfikacji wizualnej dla firm z różnych branż. Tworzymy unikalne znaki graficzne, które wyróżniają Twoją markę na rynku.',
            tags: ['Logo Design', 'Branding', 'Identyfikacja Wizualna']
        },
        'projekty-graficzne': {
            title: 'Projekty Graficzne',
            description: 'Kompleksowe rozwiązania graficzne dla Twojej marki - od wizytówek, przez ulotki, po banery reklamowe. Każdy projekt dostosowany do indywidualnych potrzeb klienta.',
            tags: ['Graphic Design', 'Print Design', 'Marketing']
        },
        'druk-3d': {
            title: 'Druk 3D',
            description: 'Innowacyjne rozwiązania w technologii druku 3D. Realizujemy prototypy, elementy dekoracyjne, funkcjonalne części oraz personalizowane gadżety.',
            tags: ['3D Printing', 'Prototyping', 'Innovation']
        },
        'grawer-laserowy': {
            title: 'Grawer Laserowy',
            description: 'Precyzyjne grawerowanie laserowe na różnych materiałach - drewno, metal, szkło, skóra. Idealne do personalizacji gadżetów i tworzenia pamiątek.',
            tags: ['Laser Engraving', 'Personalization', 'Precision']
        },
        'nadruki-dtf': {
            title: 'Nadruki DTF',
            description: 'Wysokiej jakości nadruki DTF na odzieży i akcesoriach. Trwałe, żywe kolory i możliwość nadruku na różnych materiałach tekstylnych.',
            tags: ['DTF Printing', 'Textile', 'Custom Apparel']
        },
        'naklejki': {
            title: 'Naklejki',
            description: 'Personalizowane naklejki w różnych formatach i materiałach. Od naklejek reklamowych, przez etykiety produktowe, po naklejki dekoracyjne.',
            tags: ['Stickers', 'Labels', 'Advertising']
        },
        'breloczki': {
            title: 'Breloczki',
            description: 'Unikalne breloczki personalizowane według Twoich potrzeb. Różne materiały i techniki wykonania - od grawerowania po druk 3D.',
            tags: ['Keychains', 'Personalization', 'Accessories']
        },
        'kubki': {
            title: 'Kubki',
            description: 'Personalizowane kubki z indywidualnymi projektami. Idealne jako gadżety firmowe, prezenty lub elementy brandingu kawiarni i restauracji.',
            tags: ['Mugs', 'Custom Design', 'Corporate Gifts']
        },
        'fotografia-video-dron': {
            title: 'Fotografia/Video/Dron',
            description: 'Profesjonalne usługi fotograficzne i filmowe z wykorzystaniem dronów. Zdjęcia z lotu ptaka, filmy promocyjne i dokumentacja eventów.',
            tags: ['Photography', 'Video', 'Drone Services']
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
                
                // Update project images
                updateProjectImages(projectId);
                
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
    
    // Function to update project images
    async function updateProjectImages(projectId) {
        const mainImageContainer = document.querySelector('.project-image-placeholder');
        const thumbnailsContainer = document.querySelector('.project-thumbnails');
        
        if (mainImageContainer && thumbnailsContainer) {
            // Clear existing content
            mainImageContainer.innerHTML = '';
            thumbnailsContainer.innerHTML = '';
            
            // Dynamically detect available images first
            const availableImages = await detectAvailableImages(projectId);
            console.log(`Found ${availableImages.length} images for project: ${projectId}`, availableImages);
            
            // Create main image with zoom functionality
            if (availableImages.length > 0) {
                const mainImg = document.createElement('img');
                mainImg.src = availableImages[0].src; // Use first available image
                mainImg.alt = availableImages[0].alt;
                mainImg.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 15px; cursor: zoom-in;';
                
                // Add zoom functionality to main image
                mainImg.addEventListener('click', () => {
                    openImageZoom(mainImg.src, mainImg.alt);
                });
                
                // Handle image load error
                mainImg.onerror = function() {
                    mainImageContainer.innerHTML = `
                        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                            <polyline points="21,15 16,10 5,21" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    `;
                };
                
                mainImageContainer.appendChild(mainImg);
            } else {
                // No images found, show placeholder
                mainImageContainer.innerHTML = `
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                        <polyline points="21,15 16,10 5,21" stroke="currentColor" stroke-width="2"/>
                    </svg>
                `;
            }
            
            // Create thumbnails for all available images (availableImages already detected above)
            
            // Create thumbnails for all available images
            availableImages.forEach((imageInfo, index) => {
                const thumbnail = document.createElement('div');
                thumbnail.className = `project-thumbnail ${index === 0 ? 'active' : ''}`;
                
                const thumbImg = document.createElement('img');
                thumbImg.src = imageInfo.src;
                thumbImg.alt = imageInfo.alt;
                thumbImg.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 10px;';
                
                // Handle thumbnail error - show SVG fallback
                thumbImg.onerror = function() {
                    thumbnail.innerHTML = `
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                        </svg>
                    `;
                };
                
                thumbnail.appendChild(thumbImg);
                
                // Add click handler for thumbnail
                thumbnail.addEventListener('click', () => {
                    // Remove active class from all thumbnails
                    document.querySelectorAll('.project-thumbnail').forEach(thumb => thumb.classList.remove('active'));
                    // Add active class to clicked thumbnail
                    thumbnail.classList.add('active');
                    
                    // Update main image
                    const newMainImg = document.createElement('img');
                    newMainImg.src = imageInfo.src;
                    newMainImg.alt = imageInfo.alt;
                    newMainImg.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 15px; cursor: zoom-in;';
                    
                    // Add zoom functionality to new main image
                    newMainImg.addEventListener('click', () => {
                        openImageZoom(newMainImg.src, newMainImg.alt);
                    });
                    
                    newMainImg.onerror = function() {
                        mainImageContainer.innerHTML = `
                            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2"/>
                                <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" stroke-width="2"/>
                                <polyline points="21,15 16,10 5,21" stroke="currentColor" stroke-width="2"/>
                            </svg>
                        `;
                    };
                    
                    mainImageContainer.innerHTML = '';
                    mainImageContainer.appendChild(newMainImg);
                });
                
                thumbnailsContainer.appendChild(thumbnail);
            });
        }
    }
    
    // Function to detect available images in a project folder
    async function detectAvailableImages(projectId) {
        const availableImages = [];
        
        // Define realistic maximum images for each project based on actual content
        const projectImageLimits = {
            'tworzenie-logo': 2,
            'projekty-graficzne': 18,
            'druk-3d': 8,
            'grawer-laserowy': 14,
            'nadruki-dtf': 30,
            'naklejki': 7,
            'breloczki': 8,
            'kubki': 11,
            'fotografia-video-dron': 22
        };
        
        const maxImages = projectImageLimits[projectId] || 5; // Default to 5 if project not found
        const extensions = ['jpg', 'jpeg', 'png', 'webp'];
        
        // First, add the main image
        for (const ext of extensions) {
            const mainImageSrc = `/images/portfolio/${projectId}/main.${ext}`;
            const exists = await checkImageExists(mainImageSrc);
            if (exists) {
                availableImages.push({
                    src: mainImageSrc,
                    alt: `${projectData[projectId]?.title || 'Project'} - Główne zdjęcie`
                });
                break; // Found main image, stop checking other extensions
            }
        }
        
        // Then check numbered images (1.jpg, 2.jpg, etc.)
        for (let i = 1; i <= maxImages; i++) {
            for (const ext of extensions) {
                const imageSrc = `/images/portfolio/${projectId}/${i}.${ext}`;
                const exists = await checkImageExists(imageSrc);
                if (exists) {
                    availableImages.push({
                        src: imageSrc,
                        alt: `${projectData[projectId]?.title || 'Project'} ${i}`
                    });
                    break; // Found image with this number, move to next number
                }
            }
        }
        
        return availableImages;
    }
    
    // Function to check if an image exists
    function checkImageExists(src) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = src;
        });
    }
    
    // Function to open image zoom modal
    function openImageZoom(imageSrc, imageAlt) {
        // Create zoom modal if it doesn't exist
        let zoomModal = document.getElementById('imageZoomModal');
        if (!zoomModal) {
            zoomModal = document.createElement('div');
            zoomModal.id = 'imageZoomModal';
            zoomModal.className = 'image-zoom-modal';
            zoomModal.innerHTML = `
                <div class="image-zoom-overlay"></div>
                <div class="image-zoom-container">
                    <button class="image-zoom-close">&times;</button>
                    <img class="image-zoom-img" src="" alt="">
                </div>
            `;
            document.body.appendChild(zoomModal);
            
            // Add close functionality
            const closeBtn = zoomModal.querySelector('.image-zoom-close');
            const overlay = zoomModal.querySelector('.image-zoom-overlay');
            
            closeBtn.addEventListener('click', () => {
                zoomModal.classList.remove('show');
                document.body.style.overflow = '';
            });
            
            overlay.addEventListener('click', () => {
                zoomModal.classList.remove('show');
                document.body.style.overflow = '';
            });
            
            // Close on Escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && zoomModal.classList.contains('show')) {
                    zoomModal.classList.remove('show');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Update image and show modal
        const zoomImg = zoomModal.querySelector('.image-zoom-img');
        zoomImg.src = imageSrc;
        zoomImg.alt = imageAlt;
        
        zoomModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    // Add click handlers to existing portfolio items for direct access
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            // Get project ID from data-category attribute (use category as project ID)
            const projectId = item.dataset.category;
            
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
                
                // Update project images
                updateProjectImages(projectId);
                
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
