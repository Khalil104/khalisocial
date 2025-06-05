    // Initialize AOS animations
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
    
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous errors
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.style.display = 'none';
            msg.textContent = '';
        });
        
        let isValid = true;
        
        // Validate name
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '' || !/^[a-zA-Z\s]+$/.test(nameInput.value.trim())) {
            showError(nameInput, 'Please enter a valid name (letters only)');
            isValid = false;
        }
        
        // Validate email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate message
        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '' || messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // Validate terms checkbox
        const termsInput = document.getElementById('terms');
        if (!termsInput.checked) {
            showError(termsInput, 'You must accept the terms of use');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate form submission (in a real scenario, you would use AJAX)
            contactForm.style.display = 'none';
            successMessage.style.display = 'flex';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.style.display = 'none';
            }, 3000);
        }
    });
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Add error class to input
        input.style.border = '2px solid #ff6b6b';
        
        // Remove error class when user starts typing
        input.addEventListener('input', function() {
            errorElement.style.display = 'none';
            input.style.border = 'none';
        }, { once: true });
    }
});