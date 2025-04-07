document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const dotsContainer = document.querySelector(".dots-container");
  const caption = document.querySelector(".caption");

  const captions = ["Banff 2024", "Banff 2024", "Banff 2024", "Banff 2024"];

  let currentIndex = 0;

  // Create dots for navigation
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  // Function to update the carousel
  function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active dot
    document.querySelectorAll(".dot").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });

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

  // Auto-play (optional)
  let interval = setInterval(nextSlide, 3000);

  // Pause auto-play on hover
  carousel.addEventListener("mouseenter", () => {
    clearInterval(interval);
  });

  carousel.addEventListener("mouseleave", () => {
    interval = setInterval(nextSlide, 3000);
  });

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
