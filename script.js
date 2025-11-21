// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Add to cart animation
const addToCartButtons = document.querySelectorAll('.btn-add-cart');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Animation effect
        this.style.transform = 'scale(0.95)';
        this.textContent = 'Added!';
        
        setTimeout(() => {
            this.style.transform = 'scale(1)';
            this.textContent = 'Add to Cart';
        }, 1000);
        
        // Here you would typically add the item to a cart
        console.log('Product added to cart');
    });
});

// Intersection Observer for fade-in animations with better visibility
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.visibility = 'visible';
            entry.target.classList.add('visible');
            // Stop observing once animated in
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe product cards and category cards with better initial state
// Only animate the container, keep text fully visible
document.querySelectorAll('.product-card, .category-card, .feature-item, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.visibility = 'hidden';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Ensure all text elements inside are always visible
    const textElements = el.querySelectorAll('h3, h2, h4, p, span, a');
    textElements.forEach(textEl => {
        textEl.style.opacity = '1';
        textEl.style.color = 'inherit';
    });
    
    observer.observe(el);
});

// Category card hover effect
const categoryCards = document.querySelectorAll('.category-card');

categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Product card hover effect enhancement
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        const badge = this.querySelector('.product-badge');
        if (badge) {
            badge.style.transform = 'rotate(5deg) scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const badge = this.querySelector('.product-badge');
        if (badge) {
            badge.style.transform = 'rotate(0) scale(1)';
        }
    });
});

// Subtle parallax effect for hero section (removed opacity fade for better text visibility)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        // Only move background slightly, keep content fully visible
        // Use translateY only (not translate which could affect X axis)
        hero.style.transform = `translate(0, ${scrolled * 0.3}px)`;
        // Keep content fully opaque and readable, centered
        if (heroContent) {
            heroContent.style.opacity = 1;
            heroContent.style.transform = `translate(0, ${scrolled * 0.1}px)`;
            heroContent.style.left = 'auto';
            heroContent.style.right = 'auto';
        }
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
});

console.log('Kitchen Essentials website loaded! 🍳');

