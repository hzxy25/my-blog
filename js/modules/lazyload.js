// 图片懒加载
export function initLazyLoad() {
  // 检查浏览器支持
  if (!('IntersectionObserver' in window)) {
    // 降级处理：直接加载所有图片
    document.querySelectorAll('.lazyload').forEach(img => {
      img.src = img.dataset.src;
    });
    return;
  }

  // 创建观察器
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('fade-in');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '100px 0px' // 提前100px加载
  });

  // 观察所有懒加载图片
  document.querySelectorAll('.lazyload').forEach(img => {
    observer.observe(img);
  });
}