// ============================================================
// STICKY HEADER — Show after scrolling past the first fold
// The header starts hidden (translated off-screen via CSS).
// It becomes visible (.visible) once the user scrolls past
// the viewport height (i.e. beyond the first fold).
// It hides again when the user scrolls back near the top.
// ============================================================
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  const scrollY = window.pageYOffset;
  const firstFold = window.innerHeight; // height of the initial viewport

  if (scrollY > firstFold) {
    // Past the first fold — show the header
    header.classList.add("visible");
    header.classList.remove("hidden");
  } else {
    // Back near the top — hide the header
    header.classList.remove("visible");
    header.classList.add("hidden");
  }
});

// ============================================================
// PRODUCT DROPDOWN MENU — Toggle open/close on click
// ============================================================
const dropdown = document.getElementById("productDropdown");

dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("active");
});

// ============================================================
// IMAGE CAROUSEL + ZOOM — Thumbnail click switches the main image
// ============================================================

const images = [
  "assets/images/imageCarousel.jpg",
  "assets/images/ic1.jpg",

  "assets/images/ic3.webp",
  "assets/images/ic4.jpg",
  "assets/images/ic5.jpg",
  "assets/images/ic6.jpg",
];

let currentImageIndex = 0;

const img = document.getElementById("mainImg");
const lens = document.getElementById("lens");
const preview = document.getElementById("zoomPreview");
const container = document.getElementById("mainImageContainer");

const prevBtn = document.getElementById("prevImage");
const nextBtn = document.getElementById("nextImage");
const thumbnails = document.querySelectorAll(".thumbnail");

const zoom = 3;

function updateImage(index) {
  currentImageIndex = index;
  img.src = images[currentImageIndex];

  thumbnails.forEach((thumbnail, thumbnailIndex) => {
    thumbnail.classList.toggle("active", thumbnailIndex === currentImageIndex);
  });

  preview.style.backgroundImage = `url(${img.src})`;
}

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  const newIndex =
    currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;

  updateImage(newIndex);
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  const newIndex =
    currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;

  updateImage(newIndex);
});

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    updateImage(index);
  });
});

// ============================================================
// IMAGE ZOOM — Magnifier lens on product main image hover
// ============================================================

container.addEventListener("mousemove", moveLens);

container.addEventListener("mouseenter", () => {
  lens.style.display = "block";
  preview.style.display = "block";
});

container.addEventListener("mouseleave", () => {
  lens.style.display = "none";
  preview.style.display = "none";
});

function moveLens(e) {
  const rect = container.getBoundingClientRect();

  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  x = x - lens.offsetWidth / 2;
  y = y - lens.offsetHeight / 2;

  if (x > container.offsetWidth - lens.offsetWidth) {
    x = container.offsetWidth - lens.offsetWidth;
  }

  if (x < 0) x = 0;

  if (y > container.offsetHeight - lens.offsetHeight) {
    y = container.offsetHeight - lens.offsetHeight;
  }

  if (y < 0) y = 0;

  lens.style.left = x + "px";
  lens.style.top = y + "px";

  preview.style.backgroundImage = `url(${img.src})`;
  preview.style.backgroundSize = `${img.offsetWidth * zoom}px ${
    img.offsetHeight * zoom
  }px`;
  preview.style.backgroundPosition = `-${x * zoom}px -${y * zoom}px`;
}

updateImage(currentImageIndex);

// ============================================================
// FAQ ACCORDION — Toggle open/close; only one item open at once
// ============================================================
function toggleFaq(btn) {
  const item = btn.closest(".faq-item");
  const isOpen = item.classList.contains("open");

  // Close all items first
  document
    .querySelectorAll(".faq-section .faq-item")
    .forEach((el) => el.classList.remove("open"));

  // Re-open the clicked item if it was previously closed
  if (!isOpen) item.classList.add("open");
}

// ============================================================
// APPLICATIONS SLIDER — Horizontal card scroll with prev/next
// ============================================================
(function () {
  const track = document.getElementById("appsTrack");
  const prevBtn = document.getElementById("appsPrev");
  const nextBtn = document.getElementById("appsNext");

  if (!track) return;

  const CARD_WIDTH = 420 + 16; // card width + gap
  let currentIndex = 0;

  // Max index so the last card is fully visible
  function getMaxIndex() {
    const cards = track.children.length;
    const visible = Math.floor(track.parentElement.offsetWidth / CARD_WIDTH);
    return Math.max(0, cards - visible);
  }

  // Translate the track to the target index
  function slideTo(index) {
    const max = getMaxIndex();
    currentIndex = Math.max(0, Math.min(index, max));
    track.style.transform = `translateX(-${currentIndex * CARD_WIDTH}px)`;
  }

  prevBtn.addEventListener("click", () => slideTo(currentIndex - 1));
  nextBtn.addEventListener("click", () => slideTo(currentIndex + 1));

  // Highlight the clicked card as active
  track.querySelectorAll(".app-card").forEach((card) => {
    card.addEventListener("click", () => {
      track
        .querySelectorAll(".app-card")
        .forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
    });
  });
})();

// ============================================================
// MANUFACTURING PROCESS TABS — Step tabs + prev/next arrows
// ============================================================
(function () {
  const tabs = document.querySelectorAll(".mfg-section .mfg-tab");
  const panels = document.querySelectorAll(".mfg-section .mfg-panel");

  // Activate clicked tab and its matching panel
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      panels.forEach((p) => {
        p.classList.remove("active");
        if (p.dataset.panel === target) p.classList.add("active");
      });
    });
  });

  const tabList = Array.from(tabs);

  // Left arrow → previous tab
  document.querySelectorAll(".mfg-section .mfg-img-prev").forEach((btn) => {
    btn.addEventListener("click", () => {
      const active = document.querySelector(".mfg-section .mfg-tab.active");
      const prev = tabList[tabList.indexOf(active) - 1];
      if (prev) prev.click();
    });
  });

  // Right arrow → next tab
  document.querySelectorAll(".mfg-section .mfg-img-next").forEach((btn) => {
    btn.addEventListener("click", () => {
      const active = document.querySelector(".mfg-section .mfg-tab.active");
      const next = tabList[tabList.indexOf(active) + 1];
      if (next) next.click();
    });
  });
})();

// ============================================================
// TESTIMONIALS SLIDER — Auto-slide with dot navigation
// Auto-advances every 4 s; stops when user clicks a dot.
// ============================================================
(function () {
  const track = document.getElementById("testiTrack");
  const dotsContainer = document.getElementById("testiDots");
  if (!track) return;

  const cards = Array.from(track.children);
  const CARD_WIDTH = 280 + 20; // card width + gap
  let current = 0;

  // How many cards fit in the current viewport width
  function getVisible() {
    return Math.floor((track.parentElement.offsetWidth - 80) / CARD_WIDTH) || 1;
  }

  // Total number of dot pages
  function totalDots() {
    return Math.ceil(cards.length / getVisible());
  }

  // Rebuild dot indicators
  function buildDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalDots(); i++) {
      const dot = document.createElement("button");
      dot.className = "testi-dot" + (i === current ? " active" : "");
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Scroll track to a dot page
  function goTo(index) {
    const max = totalDots() - 1;
    current = Math.max(0, Math.min(index, max));
    track.style.transform = `translateX(-${current * getVisible() * CARD_WIDTH}px)`;

    document
      .querySelectorAll(".testi-dot")
      .forEach((d, i) => d.classList.toggle("active", i === current));
  }

  // Auto-advance every 4 s
  let autoSlide = setInterval(() => {
    goTo(current + 1 < totalDots() ? current + 1 : 0);
  }, 4000);

  // Stop auto-slide when user clicks a dot
  dotsContainer.addEventListener("click", () => clearInterval(autoSlide));

  buildDots();

  // Recalculate on resize
  window.addEventListener("resize", () => {
    buildDots();
    goTo(0);
  });
})();

// ============================================================
// MODALS — Open and close popup dialogs
// ============================================================

// Open modal by ID and lock page scroll
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

// Close modal by ID and restore scroll
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }
}

// Close when clicking the dark backdrop (outside the modal box)
document.querySelectorAll(".modal-overlay").forEach((overlay) => {
  overlay.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
});

// Close any open modal on Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".modal-overlay.open").forEach((modal) => {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    });
  }
});
