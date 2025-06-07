// Mobile menu functionality
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navList = document.querySelector(".nav-list");

// Initialize all functionality
function init() {
    // Burger menu functionality
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });

        // Close menu when clicking on links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navLinks.classList.remove('active');
    });
});
    }

    // Scroll animation
    const scrollImage = document.querySelector('.scroll-image');
    
    if (scrollImage) {
        function handleScroll() {
            const rect = scrollImage.getBoundingClientRect();
            const triggerPoint = window.innerHeight * 0.7;
            
            if (rect.top <= triggerPoint) {
                scrollImage.classList.add('scrolled');
            } else {
                scrollImage.classList.remove('scrolled');
            }
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll();
    }

    // Image hover effect
    document.querySelectorAll('.nav-icon').forEach(icon => {
        const hoverSrc = icon.getAttribute('data-hover');
        const defaultSrc = icon.src;

        icon.addEventListener('mouseenter', () => {
            icon.src = hoverSrc;
        });

        icon.addEventListener('mouseleave', () => {
            icon.src = defaultSrc;
        });
    });
}

// Run initialization
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
        } else {
    init();
}
