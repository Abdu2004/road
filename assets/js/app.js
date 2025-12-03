// RoadBite - Main JavaScript

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });
}

// Toggle Switch Handler
function initToggles() {
    const toggles = document.querySelectorAll('.toggle-switch input');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', (e) => {
            const settingName = e.target.id;
            const isEnabled = e.target.checked;
            console.log(`${settingName}: ${isEnabled}`);
            showToast(`${settingName} ${isEnabled ? 'enabled' : 'disabled'}`);
        });
    });
}

// Form Validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;

    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'var(--danger-color)';
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });

    return isValid;
}

// Toast Notification
function showToast(message, duration = 3000) {
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Login Handler
function handleLogin(e, userType) {
    e.preventDefault();
    
    if (!validateForm('loginForm')) {
        showToast('Please fill in all fields');
        return;
    }

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate login
    console.log('Login:', { email, password, userType });
    showToast('Logging in...');

    setTimeout(() => {
        if (userType === 'customer') {
            window.location.href = 'home.html';
        } else if (userType === 'vendor') {
            window.location.href = 'home.html';
        }
    }, 1000);
}

// Signup Handler
function handleSignup(e) {
    e.preventDefault();
    
    if (!validateForm('signupForm')) {
        showToast('Please fill in all fields');
        return;
    }

    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;

    // Simulate signup
    console.log('Signup:', { fullname, email, phone, dob });
    showToast('Creating account...');

    setTimeout(() => {
        window.location.href = 'home.html';
    }, 1000);
}

// Map Initialization
function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    // Check if Leaflet is loaded
    if (typeof L !== 'undefined') {
        const map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Add sample markers
        const vendors = [
            { lat: 51.505, lng: -0.09, name: 'Vendor 1' },
            { lat: 51.515, lng: -0.1, name: 'Vendor 2' },
            { lat: 51.495, lng: -0.08, name: 'Vendor 3' }
        ];

        vendors.forEach(vendor => {
            L.marker([vendor.lat, vendor.lng])
                .addTo(map)
                .bindPopup(`<b>${vendor.name}</b>`);
        });
    } else {
        mapElement.innerHTML = '<p style="text-align: center; padding: 40px;">Map loading... (Leaflet.js required)</p>';
    }
}

// Detect Current Location
function detectLocation() {
    if (navigator.geolocation) {
        showToast('Detecting location...');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log('Location:', { latitude, longitude });
                showToast('Location detected!');
            },
            (error) => {
                console.error('Location error:', error);
                showToast('Unable to detect location');
            }
        );
    } else {
        showToast('Geolocation not supported');
    }
}

// Logout Handler
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        showToast('Logging out...');
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1000);
    }
}

// Active Navigation Highlighting
function setActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initFAQ();
    initToggles();
    setActiveNav();
    
    // Check if map page
    if (document.getElementById('map')) {
        initMap();
    }
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('ServiceWorker registered:', registration);
            })
            .catch(error => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}
