const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navbar = document.getElementById("navbar");
const navItems = document.querySelectorAll(".nav-links li a"); // semua link
const sections = document.querySelectorAll("section"); // semua section di page
const fabMain = document.getElementById("fab-main");
const fabActions = document.querySelector(".fab-actions");
const fabContainer = document.querySelector(".fab-container");
const elements = document.querySelectorAll(".scroll-animate");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));

fabMain.addEventListener("click", () => {
  fabActions.classList.toggle("show");
  fabMain.classList.toggle("active");
  
  // rotasi icon "+"
  if (fabMain.classList.contains("active")) {
    fabMain.style.transform = "rotate(45deg)";
  } else {
    fabMain.style.transform = "rotate(0deg)";
  }
});

menuToggle.addEventListener("click", () => {
  if (navLinks.classList.contains("open")) {
    // Tutup menu
    navLinks.classList.remove("open");
    navLinks.classList.add("closing");
    menuToggle.classList.remove("open"); // span berubah silang -> hamburger

    setTimeout(() => {
      navLinks.classList.remove("closing");
    }, 350);
  } else {
    // Buka menu
    navLinks.classList.add("open");
    menuToggle.classList.add("open"); // span berubah hamburger -> silang
  }
});

// Tambahan: pastikan icon kembali ke hamburger jika nav-links bukan open
const observer_toggle = new MutationObserver(() => {
  if (!navLinks.classList.contains("open")) {
    menuToggle.classList.remove("open");
  }
});

// Amati perubahan class pada navLinks
observer_toggle.observe(navLinks, { attributes: true, attributeFilter: ["class"] });

window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
        if (!navbar.classList.contains("active")) {
            navbar.classList.add("active");

            // restart animasi tiap kali muncul
            const items = navbar.querySelectorAll(".logo, .nav-links li");
            items.forEach(el => {
                el.style.animation = "none";
                el.offsetHeight; // reflow hack
                el.style.animation = "";
            });
        }

        // === FAB muncul ===
        fabContainer.classList.add("show");

    } else {
        navbar.classList.remove("active");

        if (navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            navLinks.classList.add("closing");
            setTimeout(() => {
                navLinks.classList.remove("closing");
            }, 350);
        }

        // === FAB hilang ===
        fabContainer.classList.remove("show");
    }

    // ===== ScrollSpy (highlight nav) =====
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120; // offset biar gak telat
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active-link");
        if (link.getAttribute("href").substring(1) === current) {
            link.classList.add("active-link");
        }
    });
});

// ===== Smooth Scroll ketika klik nav link =====
navItems.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }

        // tutup menu kalau di mobile
        if (navLinks.classList.contains("open")) {
            navLinks.classList.remove("open");
            navLinks.classList.add("closing");
            setTimeout(() => {
                navLinks.classList.remove("closing");
            }, 350);
        }
    });
});
