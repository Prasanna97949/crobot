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