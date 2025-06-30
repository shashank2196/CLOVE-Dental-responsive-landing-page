// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize form handlers
    initializeFormHandlers();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize animations
    initializeAnimations();
}

// Form handling functionality
function initializeFormHandlers() {
    const heroForm = document.getElementById('heroForm');
    const bookingForm = document.getElementById('bookingForm');
    
    if (heroForm) {
        heroForm.addEventListener('submit', handleFormSubmit);
    }
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add real-time validation
    addRealTimeValidation();
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const formId = form.id;
    
    // Validate form
    if (!validateForm(form)) {
        showErrorMessage(form, 'Please fill in all required fields correctly.');
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    
    // Simulate form submission (static website)
    setTimeout(() => {
        showSuccessMessage(form, 'Thank you! Your consultation request has been submitted. We will contact you shortly.');
        form.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Track form submission (analytics could be added here)
        console.log('Form submitted:', formId, Object.fromEntries(formData));
    }, 1500);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const formGroup = input.closest('.form-group');
        
        // Remove previous error states
        formGroup.classList.remove('error');
        
        // Validate based on input type
        if (!validateInput(input)) {
            formGroup.classList.add('error');
            isValid = false;
        }
    });
    
    return isValid;
}

function validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    const name = input.name;
    
    // Check if required field is empty
    if (input.hasAttribute('required') && !value) {
        return false;
    }
    
    // Specific validations
    switch (type) {
        case 'tel':
            return validatePhone(value);
        case 'email':
            return validateEmail(value);
        case 'text':
            if (name === 'name') {
                return validateName(value);
            }
            if (name === 'captcha') {
                return validateCaptcha(value);
            }
            return value.length > 0;
        case 'checkbox':
            return input.checked;
        default:
            return value.length > 0;
    }
}

function validatePhone(phone) {
    // Indian phone number validation (10 digits)
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    return phoneRegex.test(cleanPhone);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateName(name) {
    // Name should be at least 2 characters and contain only letters and spaces
    const nameRegex = /^[a-zA-Z\s]{2,}$/;
    return nameRegex.test(name);
}

function validateCaptcha(captcha) {
    // Simple captcha validation (should match the displayed code)
    return captcha === '1514';
}

function addRealTimeValidation() {
    const inputs = document.querySelectorAll('input[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            const formGroup = this.closest('.form-group');
            
            if (validateInput(this)) {
                formGroup.classList.remove('error');
            } else {
                formGroup.classList.add('error');
            }
        });
        
        // Remove error state on focus
        input.addEventListener('focus', function() {
            const formGroup = this.closest('.form-group');
            formGroup.classList.remove('error');
        });
    });
}

function showSuccessMessage(form, message) {
    removeMessages(form);
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successDiv.style.display = 'none';
    }, 5000);
}

function showErrorMessage(form, message) {
    removeMessages(form);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    form.insertBefore(errorDiv, form.firstChild);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

function removeMessages(form) {
    const existingMessages = form.querySelectorAll('.success-message, .error-message');
    existingMessages.forEach(msg => msg.remove());
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    // Add smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll to booking section
function scrollToBooking() {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
        bookingSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Animation functionality
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.stat-item, .treatment-card, .testimonial-card, .feature-item, .review-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Add animation styles
    addAnimationStyles();
}

function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .stat-item,
        .treatment-card,
        .testimonial-card,
        .feature-item,
        .review-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        
        /* Stagger animation for grid items */
        .stats-grid .stat-item:nth-child(1) { transition-delay: 0.1s; }
        .stats-grid .stat-item:nth-child(2) { transition-delay: 0.2s; }
        .stats-grid .stat-item:nth-child(3) { transition-delay: 0.3s; }
        .stats-grid .stat-item:nth-child(4) { transition-delay: 0.4s; }
        .stats-grid .stat-item:nth-child(5) { transition-delay: 0.5s; }
        
        .treatment-cards .treatment-card:nth-child(1) { transition-delay: 0.1s; }
        .treatment-cards .treatment-card:nth-child(2) { transition-delay: 0.3s; }
    `;
    document.head.appendChild(style);
}

// Utility functions
function formatPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return `${match[1]}-${match[2]}-${match[3]}`;
    }
    return phoneNumber;
}

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

// Header scroll effect
window.addEventListener('scroll', debounce(function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#fff';
        header.style.backdropFilter = 'none';
    }
}, 10));

// Handle consultation button clicks
document.addEventListener('click', function(e) {
    if (e.target.matches('.cta-btn.secondary')) {
        e.preventDefault();
        scrollToBooking();
    }
});

// Phone number formatting
document.addEventListener('input', function(e) {
    if (e.target.type === 'tel') {
        e.target.value = formatPhoneNumber(e.target.value);
    }
});

// Prevent form submission on Enter key for specific inputs
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.matches('input[type="text"], input[type="tel"]')) {
        e.preventDefault();
        const form = e.target.closest('form');
        const inputs = Array.from(form.querySelectorAll('input'));
        const currentIndex = inputs.indexOf(e.target);
        const nextInput = inputs[currentIndex + 1];
        
        if (nextInput) {
            nextInput.focus();
        }
    }
});

// Global error handler
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Expose global functions
window.scrollToBooking = scrollToBooking;
