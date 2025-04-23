document.addEventListener("DOMContentLoaded", () => {
  const carouselItems = document.querySelector('.carousel-items');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');

  prevBtn.addEventListener('click', () => {
    const itemWidth = carouselItems.querySelector('*').clientWidth;
    carouselItems.scrollBy({
      left: -itemWidth,
      behavior: 'smooth'
    });
  });

  nextBtn.addEventListener('click', () => {
    const itemWidth = carouselItems.querySelector('*').clientWidth;
    carouselItems.scrollBy({
      left: itemWidth,
      behavior: 'smooth'
    });
  });

  function updateButtonStates() {
    prevBtn.disabled = carouselItems.scrollLeft <= 0;
    nextBtn.disabled = carouselItems.scrollLeft + carouselItems.clientWidth >= carouselItems.scrollWidth;
  }

  carouselItems.addEventListener('scroll', updateButtonStates);
  updateButtonStates();
})