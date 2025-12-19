export function initCarousel() {
  const slides = document.querySelectorAll('.carousel-slide');
  const indicators = document.querySelectorAll('.indicator');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  let currentIndex = 0;
  let autoPlayInterval;

  // 设置当前轮播项
  function setActiveSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    slides[index].classList.add('active');
    indicators[index].classList.add('active');
    currentIndex = index;
  }

  // 下一张
  function nextSlide() {
    const newIndex = (currentIndex + 1) % slides.length;
    setActiveSlide(newIndex);
  }

  // 上一张
  function prevSlide() {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    setActiveSlide(newIndex);
  }

  // 自动播放
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  // 事件监听
  prevBtn.addEventListener('click', () => {
    clearInterval(autoPlayInterval);
    prevSlide();
    startAutoPlay();
  });

  nextBtn.addEventListener('click', () => {
    clearInterval(autoPlayInterval);
    nextSlide();
    startAutoPlay();
  });

  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      clearInterval(autoPlayInterval);
      setActiveSlide(index);
      startAutoPlay();
    });
  });

  // 初始化
  setActiveSlide(0);
  startAutoPlay();
}