const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;
let slideWidth;
let autoSlideInterval;

function updateSlideWidth() {
  slideWidth = slides[0].getBoundingClientRect().width;
}

function updateCarousel() {
  track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function showNextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
}

function showPrevSlide() {
  currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
  updateCarousel();
}

function startAutoSlide() {
  autoSlideInterval = setInterval(showNextSlide, 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Touch support
let startX = 0;
track.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
track.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    showNextSlide();
    resetAutoSlide();
  } else if (endX - startX > 50) {
    showPrevSlide();
    resetAutoSlide();
  }
});

prevBtn.addEventListener('click', () => {
  showPrevSlide();
  resetAutoSlide();
});

nextBtn.addEventListener('click', () => {
  showNextSlide();
  resetAutoSlide();
});

window.addEventListener('resize', () => {
  updateSlideWidth();
  updateCarousel();
});

// Initialize when page loads fully
window.addEventListener('load', () => {
  updateSlideWidth();
  updateCarousel();
  startAutoSlide();
});
