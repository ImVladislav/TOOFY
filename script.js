document.getElementById("buyButton").addEventListener("click", () => {
  window.open("https://uniswap.org", "_blank");
});

document.getElementById("buyToken").addEventListener("click", () => {
  window.open("https://uniswap.org", "_blank");
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');

mobileMenuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    const spans = mobileMenuBtn.querySelectorAll('span');
    spans[0].style.transform = navList.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navList.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navList.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navList.classList.remove('active');
        }
    });
});

// Scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
            element.classList.add('visible');
        }
    });
};

// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// GSAP Animations
gsap.from('.hero-content h1', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.hero-character', {
    duration: 1,
    scale: 0,
    opacity: 0,
    ease: 'back.out(1.7)',
    delay: 0.5
});

// Tokenomics cards animation
gsap.from('.tokenomics-card', {
    scrollTrigger: {
        trigger: '.tokenomics-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2
});

// Roadmap items animation
gsap.from('.roadmap-item', {
    scrollTrigger: {
        trigger: '.roadmap-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    x: -50,
    opacity: 0,
    stagger: 0.2
});

// Social cards animation
gsap.from('.social-card', {
    scrollTrigger: {
        trigger: '.social-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.6,
    y: 50,
    opacity: 0,
    stagger: 0.1,
    ease: 'back.out(1.2)'
});

// How to buy steps animation
gsap.from('.step-card', {
    scrollTrigger: {
        trigger: '.how-to-buy-section',
        start: 'top center',
        toggleActions: 'play none none reverse'
    },
    duration: 0.8,
    scale: 0.8,
    opacity: 0,
    stagger: 0.2,
    ease: 'back.out(1.7)'
});

// Add animation classes to elements
document.querySelectorAll('section:not(.hero-section)').forEach(section => {
    section.classList.add('animate-on-scroll');
});

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load

// Contract copy functionality
function copyContract() {
    const contractAddress = '0x123...abc'; // Replace with actual contract address
    navigator.clipboard.writeText(contractAddress).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.backgroundColor = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
    });
}

// Add hover animations for social cards
document.querySelectorAll('.social-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.social-icon'), {
            scale: 1.1,
            duration: 0.3,
            ease: 'back.out(1.5)'
        });
    });
    
    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.social-icon'), {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Add pulse animation to step numbers
gsap.to('.step-number', {
    scale: 1.1,
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    stagger: {
        each: 0.2,
        repeat: -1
    }
});

// Constants
const API_URL = 'https://tvsmback.onrender.com';

// Функція для оновлення статистики
function updateStats(stats) {
    // Оновлюємо відсотки
    $('.trump-percentage').text(`${stats.trump.percentage}%`);
    $('.musk-percentage').text(`${stats.musk.percentage}%`);
    
    // Оновлюємо прогрес бари
    $('.trump-progress').css('width', `${stats.trump.percentage}%`);
    $('.musk-progress').css('width', `${stats.musk.percentage}%`);
    
    // Оновлюємо кількість голосів
    $('.trump-count').text(`${stats.trump.total_votes} votes`);
    $('.musk-count').text(`${stats.musk.total_votes} votes`);
}

// Функція для показу повідомлення
function showMessage(text, type = 'success') {
    const messageEl = $('#vote-message');
    messageEl.text(text)
        .removeClass('success error')
        .addClass(type)
        .fadeIn();
    
    setTimeout(() => messageEl.fadeOut(), 3000);
}

// Функція для голосування
async function vote(candidate) {
    try {
        // Генеруємо унікальний ID для пристрою
        const deviceId = 'dev_' + Math.random().toString(36).substr(2, 9);
        
        // Відправляємо запит на голосування
        const response = await fetch(`${API_URL}/api/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                candidate,
                device_id: deviceId
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Показуємо повідомлення про успіх
            showMessage('Your vote has been counted!');
            
            // Отримуємо і оновлюємо статистику
            const statsResponse = await fetch(`${API_URL}/api/stats`);
            const stats = await statsResponse.json();
            updateStats(stats);
            
            // Анімуємо кнопку, за яку проголосували
            const btn = $(`.${candidate}-btn`);
            btn.css('background', '#28a745')
               .prop('disabled', true);
            
            setTimeout(() => {
                btn.css('background', '');
            }, 1000);
        } else {
            showMessage(data.error, 'error');
        }
    } catch (error) {
        console.error('Error voting:', error);
        showMessage('Error while voting. Please try again.', 'error');
    }
}

// Ініціалізація при завантаженні сторінки
$(document).ready(async function() {
    try {
        // Отримуємо початкову статистику
        const response = await fetch(`${API_URL}/api/stats`);
        const stats = await response.json();
        updateStats(stats);
    } catch (error) {
        console.error('Error loading initial stats:', error);
        showMessage('Error loading voting data', 'error');
    }
});
