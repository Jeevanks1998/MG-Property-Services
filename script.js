// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
}

hamburger.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Modal functionality
const modal = document.getElementById('bookingModal');
const closeBtn = document.querySelector('.close');
const bookingForm = document.getElementById('bookingForm');

function openModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Smooth scrolling
function scrollToBooking() {
    openModal();
}

function scrollToStages() {
    document.getElementById('stages').scrollIntoView({
        behavior: 'smooth'
    });
}

// Form submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(bookingForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your backend
    console.log('Form submitted:', data);
    
    // Show success message
    alert('Thank you! Our property expert will contact you within 24 hours to start your home buying journey.');
    closeModal();
    bookingForm.reset();
});

// Comparison Tabs
class ComparisonTabs {
    constructor() {
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        
        this.init();
    }
    
    init() {
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                this.switchTab(tabId);
            });
        });
    }
    
    switchTab(tabId) {
        // Update buttons
        this.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });
        
        // Update contents
        this.tabContents.forEach(content => {
            content.classList.toggle('active', content.id === tabId);
        });
    }
}

// Stages Slider
class StagesSlider {
    constructor() {
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.stage-card').length;
        this.track = document.querySelector('.slider-track');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.dots = document.querySelectorAll('.dot');
        
        this.init();
    }
    
    init() {
        // Event listeners for navigation buttons
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Event listeners for dots
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Auto-advance slides (optional)
        this.startAutoSlide();
        
        this.updateSlider();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }
    
    updateSlider() {
        // Update track position
        this.track.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        
        // Update active states
        document.querySelectorAll('.stage-card').forEach((card, index) => {
            card.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update button states
        this.prevBtn.disabled = this.currentSlide === 0;
        this.nextBtn.disabled = this.currentSlide === this.totalSlides - 1;
    }
    
    startAutoSlide() {
        setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
}

// Enhanced Navbar scroll behavior
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
        navbar.style.padding = '0';
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        navbar.style.padding = '0';
        navbar.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
});

// Enhanced Intersection Observer for animations
const createObserver = (elements, callback, options = {}) => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback(entry.target);
            }
        });
    }, options);
    
    elements.forEach(el => observer.observe(el));
    return observer;
};

// Animate metric items with staggered delay
const metricItems = document.querySelectorAll('.metric-item');
createObserver(metricItems, (item, index) => {
    setTimeout(() => {
        item.classList.add('animated');
    }, index * 200);
}, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });

// Animate service cards with staggered delay
const serviceCards = document.querySelectorAll('.service-card');
createObserver(serviceCards, (card, index) => {
    setTimeout(() => {
        card.classList.add('animated');
    }, index * 150);
}, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

// Enhanced Trust metrics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.metric-item h3');
    
    counters.forEach((counter, index) => {
        const target = 100;
        let current = 0;
        const increment = target / 50;
        
        setTimeout(() => {
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                counter.textContent = Math.floor(current) + '+';
            }, 30);
        }, index * 300);
    });
}

// Initialize counters when metrics section is in view
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            metricsObserver.unobserve(entry.target);
        }
    });
});

const trustMetrics = document.querySelector('.trust-metrics');
if (trustMetrics) {
    metricsObserver.observe(trustMetrics);
}

// Add loading animation with enhanced effects
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Add subtle animation to hero elements
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButtons = document.querySelector('.hero-buttons');
        
        if (heroTitle) heroTitle.style.animation = 'slideInLeft 1s ease-out';
        if (heroSubtitle) heroSubtitle.style.animation = 'slideInLeft 1s ease-out 0.2s both';
        if (heroButtons) heroButtons.style.animation = 'slideInLeft 1s ease-out 0.4s both';
    }, 100);
});

// Enhanced parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroVisual = document.querySelector('.hero-visual');
    
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
    
    if (heroVisual) {
        const rate = scrolled * 0.3;
        heroVisual.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects to interactive elements
document.addEventListener('DOMContentLoaded', () => {
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .nav-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ComparisonTabs();
    new StagesSlider();
    
    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn-primary, .btn-secondary, .nav-button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});
