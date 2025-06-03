document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const resetBtn = document.getElementById('resetBtn');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModal');

    // Error message elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Validation patterns and messages from data
    const validationRules = {
        name: {
            required: true,
            minLength: 2,
            errorMessages: {
                required: "Name is required",
                minLength: "Name must be at least 2 characters"
            }
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorMessages: {
                required: "Email is required",
                invalid: "Please enter a valid email address"
            }
        },
        message: {
            required: true,
            minLength: 10,
            errorMessages: {
                required: "Message is required",
                minLength: "Message must be at least 10 characters"
            }
        }
    };

    // Validation state
    let validationState = {
        name: false,
        email: false,
        message: false
    };

    // Initialize animations and interactions
    initializeAnimations();
    initializeFormInteractions();
    initializeButtonEffects();

    function initializeAnimations() {
        // Stagger form field animations
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach((group, index) => {
            group.style.animationDelay = `${0.6 + (index * 0.2)}s`;
        });

        // Initialize floating elements
        createParticleEffect();
    }

    function createParticleEffect() {
        // Additional floating particles for enhanced visual appeal
        const floatingElements = document.querySelector('.floating-elements');
        
        // Create additional subtle particles
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 3px;
                height: 3px;
                background: #9CAF88;
                border-radius: 50%;
                opacity: 0.2;
                animation: float ${4 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
            `;
            floatingElements.appendChild(particle);
        }
    }

    function initializeFormInteractions() {
        // Real-time validation
        nameInput.addEventListener('input', () => validateField('name', nameInput.value));
        nameInput.addEventListener('blur', () => validateField('name', nameInput.value));
        
        emailInput.addEventListener('input', () => validateField('email', emailInput.value));
        emailInput.addEventListener('blur', () => validateField('email', emailInput.value));
        
        messageInput.addEventListener('input', () => validateField('message', messageInput.value));
        messageInput.addEventListener('blur', () => validateField('message', messageInput.value));

        // Focus animations
        const inputs = document.querySelectorAll('.creative-input');
        inputs.forEach(input => {
            input.addEventListener('focus', handleInputFocus);
            input.addEventListener('blur', handleInputBlur);
        });

        // Form submission
        form.addEventListener('submit', handleFormSubmit);
        
        // Reset functionality
        resetBtn.addEventListener('click', handleFormReset);
        
        // Modal close
        closeModalBtn.addEventListener('click', closeModal);
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) closeModal();
        });
    }

    function initializeButtonEffects() {
        const buttons = document.querySelectorAll('.creative-btn');
        buttons.forEach(button => {
            button.addEventListener('click', createRippleEffect);
        });
    }

    function createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = button.querySelector('.btn-ripple');
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('animate');
        
        setTimeout(() => {
            ripple.classList.remove('animate');
        }, 600);
    }

    function handleInputFocus(e) {
        const inputWrapper = e.target.closest('.input-wrapper');
        const formGroup = e.target.closest('.form-group');
        
        // Add focus class for enhanced styling
        inputWrapper.classList.add('focused');
        formGroup.classList.add('focused');
        
        // Animate label decoration
        const labelDecoration = formGroup.querySelector('.label-decoration');
        if (labelDecoration) {
            labelDecoration.style.width = '100%';
        }
    }

    function handleInputBlur(e) {
        const inputWrapper = e.target.closest('.input-wrapper');
        const formGroup = e.target.closest('.form-group');
        
        // Remove focus class
        inputWrapper.classList.remove('focused');
        formGroup.classList.remove('focused');
        
        // Reset label decoration if input is empty
        if (!e.target.value.trim()) {
            const labelDecoration = formGroup.querySelector('.label-decoration');
            if (labelDecoration) {
                labelDecoration.style.width = '0';
            }
        }
    }

    function validateField(fieldName, value) {
        const rules = validationRules[fieldName];
        const errorElement = document.getElementById(`${fieldName}-error`);
        let isValid = true;
        let errorMessage = '';

        // Check if required
        if (rules.required && !value.trim()) {
            isValid = false;
            errorMessage = rules.errorMessages.required;
        }
        // Check minimum length
        else if (rules.minLength && value.trim().length < rules.minLength) {
            isValid = false;
            errorMessage = rules.errorMessages.minLength;
        }
        // Check pattern (for email)
        else if (rules.pattern && !rules.pattern.test(value.trim())) {
            isValid = false;
            errorMessage = rules.errorMessages.invalid;
        }

        // Update validation state
        validationState[fieldName] = isValid;

        // Show/hide error message with animation
        if (isValid) {
            hideErrorMessage(errorElement);
        } else {
            showErrorMessage(errorElement, errorMessage);
        }

        // Update field styling
        updateFieldStyling(fieldName, isValid);

        return isValid;
    }

    function showErrorMessage(errorElement, message) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }

    function hideErrorMessage(errorElement) {
        errorElement.classList.remove('show');
        setTimeout(() => {
            if (!errorElement.classList.contains('show')) {
                errorElement.textContent = '';
            }
        }, 300);
    }

    function updateFieldStyling(fieldName, isValid) {
        const input = document.getElementById(fieldName);
        const inputWrapper = input.closest('.input-wrapper');
        
        if (isValid) {
            inputWrapper.classList.remove('error');
            inputWrapper.classList.add('valid');
        } else {
            inputWrapper.classList.remove('valid');
            inputWrapper.classList.add('error');
        }
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Validate all fields
        const nameValid = validateField('name', nameInput.value);
        const emailValid = validateField('email', emailInput.value);
        const messageValid = validateField('message', messageInput.value);
        
        // Check if all fields are valid
        if (nameValid && emailValid && messageValid) {
            // Show loading state
            showLoadingState();
            
            // Simulate form submission delay
            setTimeout(() => {
                hideLoadingState();
                showSuccessModal();
            }, 1500);
        } else {
            // Shake form to indicate errors
            shakeForm();
        }
    }

    function showLoadingState() {
        const submitBtn = document.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        btnText.textContent = 'Sending...';
        
        // Add loading animation
        submitBtn.style.background = 'linear-gradient(135deg, #8DA076 0%, #7E9165 100%)';
    }

    function hideLoadingState() {
        const submitBtn = document.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');
        btnText.textContent = 'Send Message';
        
        // Reset button styling
        submitBtn.style.background = '';
    }

    function shakeForm() {
        const formContainer = document.querySelector('.form-container');
        formContainer.style.animation = 'none';
        
        setTimeout(() => {
            formContainer.style.animation = 'shake 0.5s ease-in-out';
        }, 10);
        
        setTimeout(() => {
            formContainer.style.animation = '';
        }, 500);
        
        // Add shake animation to CSS if not exists
        if (!document.querySelector('#shake-animation')) {
            const style = document.createElement('style');
            style.id = 'shake-animation';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    function showSuccessModal() {
        successModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Focus trap for accessibility
        closeModalBtn.focus();
    }

    function closeModal() {
        successModal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Reset form after successful submission
        handleFormReset();
    }

    function handleFormReset() {
        // Reset form with cascading animation
        const formGroups = document.querySelectorAll('.form-group');
        
        formGroups.forEach((group, index) => {
            setTimeout(() => {
                const input = group.querySelector('.creative-input');
                const errorElement = group.querySelector('.error-message');
                const inputWrapper = group.querySelector('.input-wrapper');
                const labelDecoration = group.querySelector('.label-decoration');
                
                // Clear input
                input.value = '';
                
                // Hide error messages
                hideErrorMessage(errorElement);
                
                // Reset styling
                inputWrapper.classList.remove('error', 'valid', 'focused');
                
                // Reset label decoration
                if (labelDecoration) {
                    labelDecoration.style.width = '0';
                }
                
                // Add reset animation
                input.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    input.style.transform = 'scale(1)';
                }, 150);
                
            }, index * 100);
        });
        
        // Reset validation state
        validationState = {
            name: false,
            email: false,
            message: false
        };
        
        // Focus first input
        setTimeout(() => {
            nameInput.focus();
        }, formGroups.length * 100 + 200);
    }

    // Add additional CSS for enhanced interactions
    function addEnhancedStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .input-wrapper.error .creative-input {
                border-color: #C0152F !important;
                box-shadow: 0 0 0 3px rgba(192, 21, 47, 0.1) !important;
            }
            
            .input-wrapper.valid .creative-input {
                border-color: #9CAF88 !important;
            }
            
            .creative-btn.loading {
                cursor: not-allowed;
                opacity: 0.8;
            }
            
            .floating-particle {
                pointer-events: none;
            }
            
            .form-container:hover .floating-elements .floating-circle {
                animation-duration: 4s;
            }
            
            .creative-input {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .creative-input:focus {
                transform: translateY(-2px) scale(1.02);
            }
            
            .btn-primary.creative-btn:active {
                transform: translateY(0px) scale(0.98);
            }
            
            .btn-secondary.creative-btn:active {
                transform: translateY(0px) scale(0.98);
            }
        `;
        document.head.appendChild(style);
    }

    addEnhancedStyles();

    document.documentElement.style.scrollBehavior = 'smooth';

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successModal.classList.contains('show')) {
            closeModal();
        }
    });

    const floatingElements = document.querySelectorAll('.floating-circle, .floating-triangle');
    floatingElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.style.animationDuration = '3s';
            element.style.opacity = '0.15';
        });
        
        element.addEventListener('mouseleave', () => {
            element.style.animationDuration = '';
            element.style.opacity = '';
        });
    });

    if (window.innerWidth <= 768) {
        const style = document.createElement('style');
        style.textContent = `
            .floating-circle, .floating-triangle {
                animation-duration: 8s !important;
            }
            
            .floating-dots .dot {
                animation-duration: 4s !important;
            }
        `;
        document.head.appendChild(style);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });

    const keyboardStyle = document.createElement('style');
    keyboardStyle.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #9CAF88 !important;
            outline-offset: 2px !important;
        }
    `;
    document.head.appendChild(keyboardStyle);
});