// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
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
        // this.startAutoSlide();
        
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

// Navbar scroll behavior
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
        
        if (window.scrollY > lastScrollY) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        navbar.classList.remove('hidden');
    }
    
    lastScrollY = window.scrollY;
});

// Intersection Observer for animations
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

// Animate metric items
const metricItems = document.querySelectorAll('.metric-item');
createObserver(metricItems, (item) => {
    item.classList.add('animated');
}, { threshold: 0.5, rootMargin: '0px 0px -50px 0px' });

// Animate service cards
const serviceCards = document.querySelectorAll('.service-card');
createObserver(serviceCards, (card) => {
    card.classList.add('animated');
}, { threshold: 0.3, rootMargin: '0px 0px -50px 0px' });

// Trust metrics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.metric-item h3');
    
    counters.forEach(counter => {
        const target = 100;
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current) + '+';
        }, 30);
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ComparisonTabs();
    new StagesSlider();
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
});