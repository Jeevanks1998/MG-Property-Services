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
const consultationModal = document.getElementById('consultationModal');
const closeBtn = document.querySelector('.close');
const consultationForm = document.getElementById('consultationForm');

function openConsultationModal() {
    consultationModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeConsultationModal() {
    consultationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

closeBtn.addEventListener('click', closeConsultationModal);

window.addEventListener('click', (e) => {
    if (e.target === consultationModal) {
        closeConsultationModal();
    }
});

// Smooth scrolling functions
function scrollToConsultation() {
    openConsultationModal();
}

// Form submission
consultationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(consultationForm);
    const data = Object.fromEntries(formData);
    
    // Here you would typically send the data to your backend
    console.log('Consultation form submitted:', data);
    
    // Show success message
    alert('Thank you! Our real estate expert will contact you within 30 minutes to schedule your free consultation.');
    closeConsultationModal();
    consultationForm.reset();
});

// WhatsApp integration
function openWhatsApp() {
    const phoneNumber = '919880166879';
    const message = 'Hello! I would like to get more information about MG Property Services and book a free consultation.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Enhanced Navbar scroll behavior
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
        
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        navbar.classList.remove('hidden');
    }
    
    lastScrollY = currentScrollY;
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

// Animate elements on scroll
const animateOnScroll = () => {
    const animatedElements = document.querySelectorAll('.value-card, .process-step, .feature-item, .stat-card, .team-member, .problem-item, .benefit-item');
    
    createObserver(animatedElements, (element) => {
        element.style.animation = 'fadeInUp 0.6s ease-out forwards';
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
};

// Particles.js configuration
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#d4af37'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.3,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#d4af37',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    }
                }
            }
        });
    }
}

// Add ripple effect to buttons
function addRippleEffect() {
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
}

// Simplified Map functionality
function initMapInteractions() {
    const markers = document.querySelectorAll('.map-marker');
    
    // Marker click functionality
    markers.forEach(marker => {
        marker.addEventListener('click', (e) => {
            e.stopPropagation();
            const area = marker.getAttribute('data-area');
            openConsultationModal();
            
            // Set the selected area in the form
            setTimeout(() => {
                const locationSelect = document.querySelector('select');
                if (locationSelect) {
                    for (let option of locationSelect.options) {
                        if (option.text.toLowerCase().includes(area.toLowerCase()) || 
                            area.toLowerCase().includes(option.text.toLowerCase())) {
                            locationSelect.value = option.value;
                            break;
                        }
                    }
                    
                    // If no match found, set to "Other Areas" and populate textarea
                    if (locationSelect.value === '') {
                        locationSelect.value = 'other';
                        const textarea = document.querySelector('textarea');
                        if (textarea) {
                            textarea.value = `Interested in properties in ${area}`;
                        }
                    }
                }
            }, 100);
        });
        
        // Add hover effects
        marker.addEventListener('mouseenter', () => {
            marker.style.zIndex = '100';
        });
        
        marker.addEventListener('mouseleave', () => {
            marker.style.zIndex = '5';
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    animateOnScroll();
    initParticles();
    addRippleEffect();
    initMapInteractions();
    
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
        
        /* AOS animations */
        [data-aos] {
            opacity: 0;
            transition: all 0.6s ease;
        }
        
        [data-aos].aos-animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        [data-aos="fade-up"] {
            transform: translateY(30px);
        }
    `;
    document.head.appendChild(style);
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});