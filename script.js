// GSAP Registration
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Global Variables
let customCursor = {
    outer: null,
    inner: null,
    isHovering: false
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initNavigation();
    initHeroAnimations();
    initScrollAnimations();
    initPortfolioTabs();
    initContactForm();
    initLightbox();
    initSmoothScroll();
});

// Custom Cursor Implementation
function initCustomCursor() {
    customCursor.outer = document.querySelector('.cursor-outer');
    customCursor.inner = document.querySelector('.cursor-inner');
    
    // Check if device supports hover (desktop)
    if (window.matchMedia("(hover: hover)").matches) {
        // Mouse move event
        document.addEventListener('mousemove', function(e) {
            // Inner cursor follows immediately
            gsap.to(customCursor.inner, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1,
                ease: "power2.out"
            });
            
            // Outer cursor follows with delay
            gsap.to(customCursor.outer, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        // Hover effects for clickable elements
        const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .service-card, .nav-link, .tab-btn');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', function() {
                document.body.classList.add('cursor-hover');
                customCursor.isHovering = true;
            });
            
            element.addEventListener('mouseleave', function() {
                document.body.classList.remove('cursor-hover');
                customCursor.isHovering = false;
            });
        });
    } else {
        // Hide custom cursor on touch devices
        customCursor.outer.style.display = 'none';
        customCursor.inner.style.display = 'none';
        document.body.style.cursor = 'auto';
    }
}

// Navigation Functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Hero Section Animations
function initHeroAnimations() {
    const heroName = document.querySelector('.hero-name');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroCta = document.querySelector('.hero-cta');
    const heroScroll = document.querySelector('.hero-scroll');
    
    // Timeline for hero animations
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animate name with smooth reveal
    tl.to(heroName, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power2.out"
    })
    .to(heroSubtitle, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.4")
    .to(heroCta, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.3")
    .to(heroScroll, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.out"
    }, "-=0.2");
    
    // Set initial positions
    gsap.set([heroName, heroSubtitle, heroCta], { y: 30 });
}

// Scroll-triggered Animations
function initScrollAnimations() {
    // Section fade-in animations
    const sections = document.querySelectorAll('section:not(.hero)');
    
    sections.forEach(section => {
        gsap.fromTo(section, {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    });
    
    // Service cards animation
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        gsap.fromTo(card, {
            opacity: 0,
            y: 50,
            scale: 0.9
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                end: "bottom 15%",
                toggleActions: "play none none reverse"
            },
            delay: index * 0.1
        });
    });
    
    // Portfolio items animation
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        gsap.fromTo(item, {
            opacity: 0,
            y: 30,
            scale: 0.9
        }, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "bottom 10%",
                toggleActions: "play none none reverse"
            },
            delay: index * 0.1
        });
    });
    
    // About intro animation
    const aboutIntro = document.querySelector('.about-intro');
    if (aboutIntro) {
        gsap.to(aboutIntro, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: aboutIntro,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
            }
        });
    }
}

// Portfolio Tab Functionality
function initPortfolioTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active tab
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide portfolio items
            portfolioItems.forEach(item => {
                if (item.dataset.category === category) {
                    item.style.display = 'block';
                    gsap.fromTo(item, {
                        opacity: 0,
                        scale: 0.9
                    }, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.5,
                        ease: "power2.out"
                    });
                } else {
                    gsap.to(item, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 0.3,
                        ease: "power2.out",
                        onComplete: () => {
                            item.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

// Contact Form Functionality
function initContactForm() {
    const form = document.querySelector('.contact-form');
    const submitBtn = document.querySelector('.submit-btn');
    const successMessage = document.querySelector('.success-message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        const formData = new FormData(form);
        const errors = validateForm(formData);
        
        if (Object.keys(errors).length > 0) {
            displayErrors(errors);
            return;
        }
        
        // Simulate form submission
        submitBtn.style.pointerEvents = 'none';
        submitBtn.innerHTML = '<span class="btn-text">Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        
        setTimeout(() => {
            // Reset form
            form.reset();
            
            // Show success message
            successMessage.classList.add('show');
            
            // Reset button
            submitBtn.style.pointerEvents = 'auto';
            submitBtn.innerHTML = '<span class="btn-text">Send Message</span><i class="fas fa-paper-plane"></i>';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 5000);
        }, 2000);
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

// Form Validation Functions
function validateForm(formData) {
    const errors = {};
    
    // Name validation
    const name = formData.get('name').trim();
    if (!name) {
        errors.name = 'Name is required';
    } else if (name.length < 2) {
        errors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    const email = formData.get('email').trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    // Subject validation
    const subject = formData.get('subject').trim();
    if (!subject) {
        errors.subject = 'Subject is required';
    } else if (subject.length < 5) {
        errors.subject = 'Subject must be at least 5 characters';
    }
    
    // Message validation
    const message = formData.get('message').trim();
    if (!message) {
        errors.message = 'Message is required';
    } else if (message.length < 10) {
        errors.message = 'Message must be at least 10 characters';
    }
    
    return errors;
}

function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (!fieldValue) {
                errorMessage = 'Name is required';
            } else if (fieldValue.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!fieldValue) {
                errorMessage = 'Email is required';
            } else if (!emailRegex.test(fieldValue)) {
                errorMessage = 'Please enter a valid email address';
            }
            break;
        case 'subject':
            if (!fieldValue) {
                errorMessage = 'Subject is required';
            } else if (fieldValue.length < 5) {
                errorMessage = 'Subject must be at least 5 characters';
            }
            break;
        case 'message':
            if (!fieldValue) {
                errorMessage = 'Message is required';
            } else if (fieldValue.length < 10) {
                errorMessage = 'Message must be at least 10 characters';
            }
            break;
    }
    
    if (errorMessage) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
        field.style.borderColor = '#ff4444';
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        field.style.borderColor = 'rgba(0, 162, 255, 0.2)';
    }
}

function displayErrors(errors) {
    Object.keys(errors).forEach(fieldName => {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const fieldElement = document.getElementById(fieldName);
        
        errorElement.textContent = errors[fieldName];
        errorElement.classList.add('show');
        fieldElement.style.borderColor = '#ff4444';
    });
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    const inputElements = document.querySelectorAll('.form-group input, .form-group textarea');
    
    errorElements.forEach(element => {
        element.textContent = '';
        element.classList.remove('show');
    });
    
    inputElements.forEach(element => {
        element.style.borderColor = 'rgba(0, 162, 255, 0.2)';
    });
}

// Lightbox Functionality
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxTitle = document.getElementById('lightbox-title');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    // Open lightbox
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const title = this.dataset.title;
            lightboxTitle.textContent = title;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for navbar height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Window Resize Handler
window.addEventListener('resize', debounce(function() {
    // Refresh ScrollTrigger on resize
    ScrollTrigger.refresh();
}, 250));

// Page Visibility API - Pause animations when tab is not visible
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause GSAP animations
        gsap.globalTimeline.pause();
    } else {
        // Resume GSAP animations
        gsap.globalTimeline.play();
    }
});
