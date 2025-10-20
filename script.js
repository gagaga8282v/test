// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    element.scrollIntoView({ behavior: 'smooth' });
}

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
    }
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Open booking with pre-selected service
function openBooking(service) {
    scrollToSection('kontakt');
    document.getElementById('service').value = service;
    document.getElementById('message').focus();
}

// Send email function
function sendEmail(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const car = formData.get('car');
    const service = formData.get('service');
    const message = formData.get('message');
    
    // Create email subject and body
    const subject = `Neue Terminanfrage - ${name}`;
    const body = `
Name: ${name}
E-Mail: ${email}
Telefon: ${phone || 'Nicht angegeben'}
Fahrzeug: ${car || 'Nicht angegeben'}
Gewünschter Service: ${service || 'Noch auswählen'}

Nachricht:
${message}

--
Diese Anfrage wurde über die Royal Detail Website gesendet.
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:Royal.detail@gmx.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success modal
    showModal();
    
    // Reset form
    event.target.reset();
}

// Modal functions
function showModal() {
    document.getElementById('successModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Add scroll animations to service cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add typing effect to hero subtitle
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        typeWriter(subtitle, text, 100);
    }
});

// Add hover effect to price cards
document.querySelectorAll('.price-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(0) scale(1)';
        } else {
            card.style.transform = 'scale(1.05)';
        }
    });
});

// Add loading animation to submit button
const submitButton = document.querySelector('.submit-button');
if (submitButton) {
    submitButton.addEventListener('click', function() {
        const originalText = this.querySelector('span').textContent;
        const originalIcon = this.querySelector('i').className;
        
        this.querySelector('span').textContent = 'Wird gesendet...';
        this.querySelector('i').className = 'fas fa-spinner fa-spin';
        this.disabled = true;
        
        setTimeout(() => {
            this.querySelector('span').textContent = originalText;
            this.querySelector('i').className = originalIcon;
            this.disabled = false;
        }, 2000);
    });
}

// Add interactive map effect to service areas
const areaTags = document.querySelectorAll('.area-tag');
areaTags.forEach(tag => {
    tag.addEventListener('click', () => {
        // Remove active class from all tags
        areaTags.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tag
        tag.classList.add('active');
        
        // Add a subtle animation
        tag.style.transform = 'scale(1.1)';
        setTimeout(() => {
            tag.style.transform = 'scale(1)';
        }, 200);
    });
});

// Add CSS for active area tag
const style = document.createElement('style');
style.textContent = `
    .area-tag.active {
        background: var(--primary-gold) !important;
        color: var(--primary-black) !important;
        transform: scale(1.05);
    }
    
    .area-tag {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .area-tag:hover {
        transform: scale(1.05);
        background: var(--primary-gold);
        color: var(--primary-black);
    }
`;
document.head.appendChild(style);