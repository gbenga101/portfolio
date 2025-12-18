// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
} else {
    console.warn('Hamburger or nav menu not found — skipping mobile nav initialization.');
} 

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Typewriter Effect - Customize these words for your profession
const typewriterText = document.querySelector('.typewriter-text');
const typewriterCursor = document.querySelector('.typewriter-cursor');
const words = [
    'Frontend Engineer',
    'Wordpress Specialist',
    'AI Enthusiast',
    'Problem Solver',
    'Creative Thinker',
    'Tech Innovator'
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriterText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriterText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start typewriter effect
typeWriter();

// Particle.js Configuration
function initParticles() {
    if (typeof particlesJS === 'undefined') {
        console.error('particlesJS library not found. Ensure particles.min.js is loaded before script.js.');
        return;
    }

    try {
        console.log('Initializing particles...');
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
                    value: ['#b85324', '#3a231c', '#1a100a']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.11,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ede2d7',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
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
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });

        // Verify canvas creation shortly after init
        setTimeout(() => {
            const canvas = document.querySelector('#particles-js canvas');
            if (canvas) {
                console.log('particles canvas created:', canvas.width, 'x', canvas.height);
            } else {
                console.warn('particles canvas not found after initialization.');
            }
        }, 300);
    } catch (err) {
        console.error('particlesJS initialization failed:', err);
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initParticles();
} else {
    window.addEventListener('DOMContentLoaded', initParticles);
}

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.about-content, .skill-category, .project-card, .contact-content');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Simple form validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Here you would normally send the form data to your backend
        setTimeout(() => {
            alert('Thanks for reaching out! I\'ll get back to you soon.');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
} else {
    console.warn('Contact form (#contactForm) not found — skipping form handler.');
} 

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Project cards tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
});

// Dynamic cursor effect (optional - remove if too distracting)
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.position = 'fixed';
    cursor.style.width = '4px';
    cursor.style.height = '4px';
    cursor.style.background = 'var(--accent-primary)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.opacity = '0.8';
    cursor.style.transition = 'all 0.5s ease';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.style.transform = 'scale(0)';
        cursor.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        cursor.remove();
    }, 600);
});

// Easter egg: Konami Code (for fun!)
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        alert('🎉 Easter egg activated! You found the secret code!');
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Portfolio loaded in ${loadTime}ms - Performance optimized!`);
    });
}

// Lazy loading for images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add some NeoVim-style commands (just for fun!)
const commands = {
    ':q': () => {
        if (confirm('Are you sure you want to quit?')) {
            window.close();
        }
    },
    ':help': () => {
        alert('Available commands:\n:q - Quit\n:help - Show this help\n:w - Save (does nothing here)\n:e - Edit (opens GitHub)\n:about - Show info');
    },
    ':w': () => {
        alert('💾 "Portfolio saved" (not really, this is just for fun!)');
    },
    ':e': () => {
        window.open('https://github.com', '_blank');
    },
    ':about': () => {
        alert('🚀 Portfolio Website v1.0\nBuilt with HTML, CSS, and JavaScript\nInspired by ThePrimeagen\'s design');
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === ':' && e.ctrlKey === false && e.metaKey === false) {
        const command = prompt('Enter command:');
        if (command && commands[command]) {
            commands[command]();
        } else if (command) {
            alert(`Unknown command: ${command}\nType :help for available commands`);
        }
    }
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Portfolio website loaded successfully!');
    console.log('💡 Try pressing ":" for some NeoVim-style commands!');
    console.log('🎯 Hint: There\'s an easter egg... try the Konami code!');
    
    // Add some fun console messages
    console.log('%c👋 Hey there! Welcome to my portfolio!', 'color: #00ff88; font-size: 16px; font-weight: bold;');
    console.log('%c💻 Built with passion and lots of coffee!', 'color: #ff0080; font-size: 14px;');
    console.log('%c🌟 Feel free to explore the code!', 'color: #0088ff; font-size: 12px;');

    // Initialize FAQ toggles (collapsible + / -)
    initFAQ();
});

// FAQ initialization and toggling
function initFAQ() {
    const faqButtons = document.querySelectorAll('.faq-question');
    if (!faqButtons || faqButtons.length === 0) return;

    faqButtons.forEach(btn => {
        btn.addEventListener('click', () => toggleFAQ(btn));
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFAQ(btn);
            }
        });
    });
}

function toggleFAQ(btn) {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));

    const answer = btn.nextElementSibling;
    const toggle = btn.querySelector('.faq-toggle');
    if (!answer) return;

    if (!expanded) {
        answer.hidden = false;
        requestAnimationFrame(() => answer.classList.add('open'));
        if (toggle) toggle.textContent = '-';
    } else {
        answer.classList.remove('open');
        if (toggle) toggle.textContent = '+';
        const onEnd = () => { answer.hidden = true; answer.removeEventListener('transitionend', onEnd); };
        answer.addEventListener('transitionend', onEnd);
    }
}

// Smooth page transitions
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Utility functions for future enhancements
const utils = {
    // Debounce function for performance
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function for scroll events
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },
    
    // Check if element is in viewport
    isInViewport: (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Export utils for potential use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = utils;
}