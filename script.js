// Mobile menu functionality
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navList = document.querySelector(".nav-list");

// Initialize all functionality
function init() {
  // Burger menu functionality
  const burgerMenu = document.querySelector(".burger-menu");
  const navLinks = document.querySelector(".nav-links");

  if (burgerMenu && navLinks) {
    burgerMenu.addEventListener("click", () => {
      burgerMenu.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
      if (!burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
        burgerMenu.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });

    // Close menu when clicking on links
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        burgerMenu.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  // Scroll animation
  const scrollContainer = document.querySelector(".scroll-container");
  
  if (scrollContainer) {
    function handleScroll() {
      const rect = scrollContainer.getBoundingClientRect();
      const parentRect = scrollContainer.parentElement.getBoundingClientRect();
      
      // Збільшуємо чутливість анімації
      const startPoint = window.innerHeight * 0.9; // Починаємо раніше
      const endPoint = window.innerHeight * 0.01; // Закінчуємо пізніше
      
      // Поточна позиція елементу відносно вікна
      const currentPoint = rect.top;
      
      // Розрахунок прогресу анімації (від 0 до 1)
      const progress = Math.max(
          0,
          Math.min(1, 1 - (currentPoint - endPoint) / (startPoint - endPoint))
      );
      
      // Збільшуємо діапазон руху для повного приховування
      const translateX = progress * 120; // Збільшуємо до 120% для повного приховування
      scrollContainer.style.transform = `translateX(${translateX}%)`;
    }

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
  }

  // Image hover effect for navigation
  document.querySelectorAll(".nav-image.default").forEach((icon) => {
    const parent = icon.parentElement;
    const hoverImage = parent.querySelector(".nav-image.hover");

    parent.addEventListener("mouseenter", () => {
      icon.style.opacity = "0";
      hoverImage.style.opacity = "1";
    });

    parent.addEventListener("mouseleave", () => {
      icon.style.opacity = "1";
      hoverImage.style.opacity = "0";
    });
});
}

// Run initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
        } else {
  init();
}
