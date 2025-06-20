//MOBILE ANIMATIONS
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".grow.underline-slide");
  const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  if (isTouchDevice) {
    navItems.forEach((item) => {
      let touchTimeout;

      item.addEventListener("touchstart", function (e) {
        this.classList.add("touch-hover");

        // Clear any existing timeout
        clearTimeout(touchTimeout);
      });

      item.addEventListener("touchend", function () {
        // Keep animation for a short time, then remove
        touchTimeout = setTimeout(() => {
          this.classList.remove("touch-hover");
        }, 300);
      });

      item.addEventListener("touchcancel", function () {
        this.classList.remove("touch-hover");
        clearTimeout(touchTimeout);
      });
    });
  }
});

//CAROUSEL
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const caption = document.querySelector(".caption");

  const captions = ["Banff 2024", "Banff 2024", "Banff 2024", "Banff 2024"];

  let currentIndex = 0;

  // Function to update the carousel
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update caption
    caption.textContent = captions[currentIndex];
  }

  // Function to go to a specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  // Function to go to the next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
  }

  // Function to go to the previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  }

  // Event listeners
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  /*
  // Auto-play

  let interval = setInterval(nextSlide, 4000);

  // Pause auto-play on hover
  carousel.addEventListener("mouseenter", () => {
    clearInterval(interval);
  });

  carousel.addEventListener("mouseleave", () => {
    interval = setInterval(nextSlide, 4000);
  });
  */

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      prevSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    }
  });

  // Swipe functionality for touch devices
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50; // minimum distance for swipe
    if (touchEndX < touchStartX - threshold) {
      nextSlide(); // swipe left
    } else if (touchEndX > touchStartX + threshold) {
      prevSlide(); // swipe right
    }
  }
});

//MAIN IMAGE SHINE ANIMATION
const imageContainer = document.getElementById("main-image");

imageContainer.addEventListener("mouseenter", () => {
  // Add the animate class
  imageContainer.classList.add("animate");

  // Remove it after animation completes (to allow retrigger)
  setTimeout(() => {
    imageContainer.classList.remove("animate");
  }, 850); // match duration of shine animation
});
