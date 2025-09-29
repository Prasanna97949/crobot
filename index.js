// nav location
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("text-[#E25010]", "font-bold");
  }
});

// loading
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("preloader").classList.add("hidden");
  }, 2000); // 2000ms = 2 seconds
});

// nav bar
const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

// services


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
// FAQ
document.querySelectorAll('.faq-toggle').forEach(button => {
  button.addEventListener('click', () => {
  const answer = button.nextElementSibling;
  const symbol = button.querySelector('span:last-child');
  
  answer.classList.toggle('hidden');
  symbol.textContent = answer.classList.contains('hidden') ? '+' : '-';
  });
  });
  // video effect
  document.querySelectorAll("video").forEach(video => {
    video.closest(".group").addEventListener("mouseenter", () => video.play());
    video.closest(".group").addEventListener("mouseleave", () => video.pause());
  });

// Always load page from top
window.history.scrollRestoration = "manual"; 
window.scrollTo(0, 0);

  window.addEventListener("load", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Toggle submenus in mobile
  function toggleMenu(menu) {
    const submenu = document.getElementById("submenu-" + menu);
    const icon = document.getElementById("icon-" + menu);

    submenu.classList.toggle("hidden");
    icon.textContent = submenu.classList.contains("hidden") ? "+" : "-";
  }

  // Toggle entire products dropdown (if needed)
  document.getElementById("mobile-products-btn").addEventListener("click", () => {
    document.getElementById("mobile-products-menu").classList.toggle("hidden");
  });