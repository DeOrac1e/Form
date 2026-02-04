document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input, textarea');

    // 1. Prevent default browser tooltips
    form.setAttribute('novalidate', true);

    // 2. Real-time validation as the user types
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            validateField(input);
        });
    });

    // 3. Handle the final submit click
    form.addEventListener('submit', (e) => {
        let isFormValid = true;

        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            e.preventDefault(); // Stop form if there are errors
            console.log("Form has errors. Fix them!");
        } else {
            // UI UX: Show loading state on button
            const btn = form.querySelector('.submit');
            btn.innerText = "Sending...";
            btn.style.opacity = "0.7";
            btn.style.cursor = "not-allowed";
        }
    });

    function validateField(input) {
        // Find the error span for this specific input
        const errorSpan = document.getElementById(`${input.id}-error`);
        if (!errorSpan) return input.checkValidity();

        if (input.validity.valid) {
            errorSpan.textContent = "";
            errorSpan.classList.remove('error-active');
            return true;
        } else {
            showError(input, errorSpan);
            return false;
        }
    }

    function showError(input, errorSpan) {
        if (input.validity.valueMissing) {
            errorSpan.textContent = "This field is required.";
        } else if (input.validity.typeMismatch) {
            errorSpan.textContent = "Please enter a valid email address.";
        } else if (input.validity.tooShort) {
            errorSpan.textContent = `Too short! Minimum ${input.minLength} characters.`;
        }
        
        errorSpan.classList.add('error-active');
    }
});


setInterval(() => {
    const btn = document.querySelector('.submit');
    btn.classList.add('submit:hover::after');
    
    setTimeout(() => {
        btn.classList.remove('submit:hover::after');
    }, 500); 
}, 3000);