class PreRegistrationForm {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.init();
    }

    init() {
        this.render();
        this.attachEventListeners();
    }

    render() {
        const formHTML = `
            <div class="pre-registration-section">
                <div class="pre-reg-title">Wanna Be First?</div>
                <div class="pre-reg-subtitle">Hop in early and we’ll ping you when the magic drops.</div>
                
                <form class="pre-reg-form" id="preRegForm">
                    <!-- Row 1: Name and Gender -->
                    <div class="form-row">
                        <div class="form-group">
                            <input 
                                type="text" 
                                id="fullName" 
                                name="fullName" 
                                class="form-input" 
                                placeholder="Enter your full name"
                                required
                            >
                            <div class="error-message" id="fullNameError"></div>
                        </div>
                        
                        <div class="form-group">
                            <select id="gender" name="gender" class="form-select gender-input" required>
                                <option value="">Select your gender</option>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                            <div class="error-message" id="genderError"></div>
                        </div>
                    </div>
                    
                    <!-- Row 2: Mobile and Email -->
                    <div class="form-row">
                        <div class="form-group">
                            <input 
                                type="tel" 
                                id="mobile" 
                                name="mobile" 
                                class="form-input" 
                                placeholder="Mobile number (e.g., +917500617407)"
                                required
                            >
                            <div class="error-message" id="mobileError"></div>
                        </div>
                        
                        <div class="form-group email-input">
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                class="form-input" 
                                placeholder="Enter your email"
                                required
                            >
                            <div class="error-message" id="emailError"></div>
                        </div>
                    </div>
                    
                    <!-- Row 3: Register Button -->
                    <div class="form-row button-row">
                        <button type="submit" class="pre-reg-btn">
                            <span class="btn-text">Register</span>
                        </button>
                    </div>
                </form>
                
                <div class="success-message" id="successMessage" style="display: none;">
                    <div class="success-header">
                        <div class="success-icon">🎉</div>
                        <h3>Thank you for your interest in Voicle!</h3>
                    </div>
                    
                    <div class="success-content">
                        <p class="success-main-text">
                            Your pre-registration has been successfully confirmed. You'll be among the first to know when we launch and get early access to our exciting features.
                        </p>
                        
                        <div class="registration-info">
                            <strong>Registration Number: <span id="regNumber"></span></strong>
                        </div>
                        
                        <div class="next-steps">
                            <h4>What happens next?</h4>
                            <ul class="next-steps-list">
                                <li>You'll receive a confirmation email shortly</li>
                                <li>We'll keep you updated on our development progress</li>
                                <li>You'll get early access when we launch</li>
                                <li>Exclusive updates and behind-the-scenes content</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = formHTML;
    }

    attachEventListeners() {
        const form = document.getElementById('preRegForm');
        const emailInput = document.getElementById('email');
        const mobileInput = document.getElementById('mobile');
        const genderSelect = document.getElementById('gender');
        
        form.addEventListener('submit', (e) => this.handleSubmit(e));
        emailInput.addEventListener('blur', () => this.validateEmail());
        emailInput.addEventListener('input', () => this.clearError('emailError'));
        mobileInput.addEventListener('blur', () => this.validateMobile());
        mobileInput.addEventListener('input', () => this.clearError('mobileError'));
        genderSelect.addEventListener('change', () => this.clearError('genderError'));
    }

    async validateEmail() {
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const email = emailInput.value.trim();
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showError('emailError', 'Email is required');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            return false;
        }
        
        // Check email availability
        try {
            const response = await fetch('https://api.live.voicle.app/api/user-services/api/pre-registration/check-email/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();
            
            if (data.success && !data.available) {
                this.showError('emailError', data.message || 'Email already registered');
                return false;
            }
        } catch (error) {
            console.error('Email validation error:', error);
            // Don't block form submission if API is unavailable
        }
        
        this.clearError('emailError');
        return true;
    }

    async validateMobile() {
        const mobileInput = document.getElementById('mobile');
        const mobileError = document.getElementById('mobileError');
        const mobile = mobileInput.value.trim();
        
        if (!mobile) {
            this.showError('mobileError', 'Mobile number is required');
            return false;
        }
        
        // Basic mobile number validation
        const mobileRegex = /^\+?[1-9]\d{1,14}$/;
        if (!mobileRegex.test(mobile)) {
            this.showError('mobileError', 'Please enter a valid mobile number with country code (e.g., +917500617407)');
            return false;
        }
        
        // Check mobile availability
        try {
            const response = await fetch('https://api.live.voicle.app/api/user-services/api/pre-registration/check-mobile/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mobile_number: mobile })
            });
            
            const data = await response.json();
            
            if (data.success && !data.available) {
                this.showError('mobileError', data.message || 'Mobile number already registered');
                return false;
            }
        } catch (error) {
            console.error('Mobile validation error:', error);
            // Don't block form submission if API is unavailable
        }
        
        this.clearError('mobileError');
        return true;
    }

    validateGender() {
        const genderSelect = document.getElementById('gender');
        const genderError = document.getElementById('genderError');
        
        if (!genderSelect.value) {
            this.showError('genderError', 'Please select your gender');
            return false;
        }
        
        this.clearError('genderError');
        return true;
    }

    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        // Add full name validation
        const fullNameInput = document.getElementById('fullName');
        const fullName = fullNameInput.value.trim();
        
        if (!fullName) {
            this.showError('fullNameError', 'Full name is required');
            return;
        } else {
            this.clearError('fullNameError');
        }
        
        const isEmailValid = await this.validateEmail();
        const isMobileValid = await this.validateMobile();
        const isGenderValid = this.validateGender();
        
        console.log('Form validation results:', { 
            fullName: !!fullName, 
            isEmailValid, 
            isMobileValid, 
            isGenderValid 
        });
        
        if (fullName && isEmailValid && isMobileValid && isGenderValid) {
            this.submitForm();
        }
    }

    async submitForm() {
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const mobile = document.getElementById('mobile').value.trim();
        const gender = document.getElementById('gender').value;
        const submitBtn = document.querySelector('.pre-reg-btn');
        const successMessage = document.getElementById('successMessage');
        const form = document.getElementById('preRegForm');
        
        // Show loading state
        submitBtn.innerHTML = '<span class="btn-text">Registering...</span><span class="btn-spinner">⏳</span>';
        submitBtn.disabled = true;
        
        try {
            console.log('Submitting form with data:', {
                full_name: fullName,
                email: email,
                mobile_number: mobile,
                gender: gender
            });
            
            const response = await fetch('https://api.live.voicle.app/api/user-services/api/pre-registration/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    full_name: fullName,
                    email: email,
                    mobile_number: mobile,
                    gender: gender
                })
            });
            
            const data = await response.json();
            console.log('API Response:', data);
            
            if (data.success) {
                console.log('Success! Hiding form and showing success message');
                
                // Hide form and show success message
                form.style.display = 'none';
                successMessage.style.display = 'flex';
                successMessage.style.visibility = 'visible';
                
                // Update success message with registration number
                const regNumberElement = document.getElementById('regNumber');
                if (regNumberElement) {
                    regNumberElement.textContent = data.data.registration_number;
                    console.log('Registration number set:', data.data.registration_number);
                }
                
                console.log('Registration successful:', data.data);
            } else {
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            
            // Reset button and show error
            submitBtn.innerHTML = '<span class="btn-text">Register</span>';
            submitBtn.disabled = false;
            
            // Show error message (you might want to add a general error div)
            alert('Registration failed. Please try again.');
        }
    }

    // Method to send data to backend (implement as needed)
    async sendToBackend(data) {
        try {
            const response = await fetch('https://api.live.voicle.app/api/user-services/api/pre-registration/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Registration failed');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            // Handle error (show error message to user)
        }
    }
}

// Export for use in other files
window.PreRegistrationForm = PreRegistrationForm;
