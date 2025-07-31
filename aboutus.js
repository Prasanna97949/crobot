// nav bar
const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
// counter animation
document.addEventListener("DOMContentLoaded", () => {
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const plus = counter.getAttribute('data-plus') || '';
      let count = 0;
      const increment = target / 100;

      const updateCounter = () => {
        if (count < target) {
          count += increment;
          counter.textContent = Math.ceil(count) + plus;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + plus;
        }
      };
      updateCounter();
    });
  }

  // Ensures section exists before observing
  const highlightsSection = document.getElementById('highlights');
  if (highlightsSection) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.3 });

    observer.observe(highlightsSection);
  }
});