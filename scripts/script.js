window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("loaded");
});

document.addEventListener("DOMContentLoaded", function () {
  //CAROUSEL
  const carousel = document.querySelector(".carousel");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  const caption = document.querySelector(".caption");
  const captionText = document.querySelector(".caption-text");

  const captions = [
    ["Alberta 2024", "Johnston Canyon"],
    ["Alberta 2024", "Johnston Canyon"],
    ["Alberta 2024", "Lake Louise"],
    ["New York 2025", "Central Park"],
    ["New York 2025", "Central Park"],
    ["Italy 2025", "Amalfi"],
    ["Italy 2025", "Amalfi"],
    ["Italy 2025", "Maiori"],
    ["Costa Rica 2025", "Rio Colorado"],
    ["Costa Rica 2025", "Rio Colorado"],
    ["Costa Rica 2025", "Rio Colorado"],
  ];

  let currentIndex = 0;

  caption.textContent = captions[currentIndex][0];
  captionText.textContent = captions[currentIndex][1];

  // Function to update the carousel
  function updateCarousel() {
    const [newTitle, newSubtitle] = captions[currentIndex];
    const prevTitle = caption.textContent;
    const prevSubtitle = captionText.textContent;

    //Fade out caption
    if (newTitle !== prevTitle) caption.classList.add("invisible");
    if (newSubtitle !== prevSubtitle) captionText.classList.add("invisible");

    setTimeout(() => {
      //Change slide
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;

      // Update caption
      caption.textContent = captions[currentIndex][0];
      captionText.textContent = captions[currentIndex][1];

      //Fade in new caption
      if (newTitle !== prevTitle) caption.classList.remove("invisible");
      if (newSubtitle !== prevSubtitle)
        captionText.classList.remove("invisible");
    }, 400);
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

let shineLocked = true; // Prevent early mouseenter triggers

function triggerShine() {
  if (shineLocked) return;

  imageContainer.classList.add("animate");
  setTimeout(() => {
    imageContainer.classList.remove("animate");
  }, 850);
}

// Initial shine on load
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    imageContainer.classList.add("animate");

    // Remove animation class after animation ends
    setTimeout(() => {
      imageContainer.classList.remove("animate");

      // Unlock hover shine after initial animation is done
      shineLocked = false;
    }, 850);
  }, 2000); // Initial delay
});

// Hover interaction
imageContainer.addEventListener("mouseenter", triggerShine);
