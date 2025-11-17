// nav location
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPath) {
    link.classList.add("text-[#E25010]", "font-bold");
  }
});

// nav bar
const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
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

  // Gallery

  (function () {
  const carousel = document.getElementById('carousel');
  const track = document.getElementById('carousel-track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;  // index of first visible slide
  let slideWidth = 0;
  let maxIndex = 0;

  // Responsive visible count
  function getVisibleCount() {
    const w = window.innerWidth;
    if (w >= 1200) return 4;   // desktop large
    if (w >= 900) return 4;    // desktop
    if (w >= 640) return 3;    // tablet
    if (w >= 480) return 2;    // small tablet
    return 1;                  // mobile
  }

  // compute sizes and bounds
  function recalc() {
    const visibleCount = getVisibleCount();

    // Prefer computing slide width from a slide's actual width if available
    const firstSlide = track.children[0];
    if (firstSlide) {
      // Ensure slides are set to not shrink
      Array.from(track.children).forEach(el => el.style.flex = '0 0 auto');

      // If the slide has percentage width (w-1/4), derive width as carousel width / visibleCount
      slideWidth = carousel.clientWidth / visibleCount;

      // Apply explicit width to each slide wrapper so transform math is consistent
      Array.from(track.children).forEach(el => {
        el.style.width = `${slideWidth}px`;
      });
    } else {
      slideWidth = carousel.clientWidth / visibleCount;
    }

    const totalSlides = track.children.length;
    // allow looping: maxIndex = totalSlides - visibleCount
    maxIndex = Math.max(0, totalSlides - visibleCount);

    // clamp currentIndex within bounds
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
    applyTransform(false);
    updateButtons();
  }

  function applyTransform(animate = true) {
    if (!animate) track.style.transition = 'none';
    else track.style.transition = 'transform 0.45s ease';
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    // re-enable transition after a frame if we temporarily turned it off
    if (!animate) {
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.45s ease';
      });
    }
  }

  function updateButtons() {
    // For looping carousel, we keep buttons always enabled (but style them)
    prevBtn.classList.toggle('opacity-50', false);
    nextBtn.classList.toggle('opacity-50', false);
  }

  function goTo(index) {
    // Looping behavior: wrap around
    const totalSlides = track.children.length;
    const visibleCount = getVisibleCount();
    const max = Math.max(0, totalSlides - visibleCount);

    if (index > max) index = 0;         // wrap forward
    if (index < 0) index = max;         // wrap backward

    currentIndex = index;
    applyTransform(true);
  }

  // handlers
  nextBtn.addEventListener('click', () => {
    goTo(currentIndex + 1);
  });

  prevBtn.addEventListener('click', () => {
    goTo(currentIndex - 1);
  });

  // Recalculate when images load
  function imagesLoadedCallback() {
    const imgs = track.querySelectorAll('img');
    let loaded = 0;
    if (imgs.length === 0) {
      recalc(); return;
    }
    imgs.forEach(img => {
      if (img.complete) {
        loaded++;
      } else {
        img.addEventListener('load', () => {
          loaded++;
          if (loaded === imgs.length) recalc();
        });
        img.addEventListener('error', () => {
          loaded++;
          if (loaded === imgs.length) recalc();
        });
      }
    });
    if (loaded === imgs.length) recalc();
  }

  // Responsive: recalc on resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(recalc, 120);
  });

  // init on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    imagesLoadedCallback();
    // fallback recalc
    setTimeout(recalc, 300);
  });

  // keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
  });

  // Optional: autoplay (uncomment to enable)
  /*
  let autoplayTimer;
  function startAutoplay() {
    autoplayTimer = setInterval(() => goTo(currentIndex + 1), 3500);
  }
  function stopAutoplay() {
    clearInterval(autoplayTimer);
  }
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  startAutoplay();
  */
})();
