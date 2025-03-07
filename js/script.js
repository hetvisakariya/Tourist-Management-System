document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(`${tabId}-tab`);
            
            // Remove active class from all buttons and content
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
    
    // Toggle password visibility
    const togglePasswordBtns = document.querySelectorAll('.toggle-password');
    
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            } else {
                passwordInput.type = 'password';
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            }
        });
    });
    
    // Price range slider
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const priceRangeValue = document.getElementById('price-range-value');
    
    if (minPriceInput && maxPriceInput && priceRangeValue) {
        function updatePriceRange() {
            priceRangeValue.textContent = `$${minPriceInput.value} - $${maxPriceInput.value}`;
        }
        
        minPriceInput.addEventListener('input', function() {
            if (parseInt(minPriceInput.value) > parseInt(maxPriceInput.value)) {
                minPriceInput.value = maxPriceInput.value;
            }
            updatePriceRange();
        });
        
        maxPriceInput.addEventListener('input', function() {
            if (parseInt(maxPriceInput.value) < parseInt(minPriceInput.value)) {
                maxPriceInput.value = minPriceInput.value;
            }
            updatePriceRange();
        });
    }
    
    // Set minimum date for date inputs to today
    const dateInputs = document.querySelectorAll('input[type="date"]');
    const today = new Date().toISOString().split('T')[0];
    
    dateInputs.forEach(input => {
        input.min = today;
        
        // Set default value to today if not already set
        if (!input.value) {
            input.value = today;
        }
    });
    
    // Handle form submissions
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Only prevent default for forms without action attribute
            // or for filter forms that should not navigate away
            if (!form.getAttribute('action') || form.id.includes('filter')) {
                e.preventDefault();
            }
        });
    });
});