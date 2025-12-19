// 导入所有模块
import { initNavbar } from './modules/navbar.js';
import { initCarousel } from './modules/carousel.js';
import { initThemeToggle } from './modules/theme.js';
import { renderBlogList } from './modules/blog-data.js';
import { initSearch } from './modules/search.js';
import { initFormValidation } from './modules/form-validation.js';
import { initComments, renderMarkdownContent } from './modules/comments.js';
import { initLazyLoad } from './modules/lazyload.js';
import { initVisitCounter, initWeatherWidget } from './modules/visit-counter.js';

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  // 通用模块（不含懒加载，懒加载需要在内容渲染后执行）
  initNavbar();
  initThemeToggle();
  initVisitCounter();

  // 根据页面初始化对应模块
  const path = window.location.pathname;

  if (path.includes('index.html') || path === '/' || path === '') {
    initCarousel();
    renderBlogList(); // 先渲染博客列表（生成图片元素）
    initSearch();
    initLazyLoad(); // 再初始化懒加载（识别已渲染的图片）
  }

  if (path.includes('blog-detail.html')) {
    renderMarkdownContent(); // 先渲染详情页内容
    initComments();
    initLazyLoad(); // 再初始化懒加载
  }

  if (path.includes('contact.html')) {
    initFormValidation();
    initLazyLoad(); // 联系页若有懒加载图片也需调用
  }

  if (path.includes('about.html')) {
    initWeatherWidget();
    initLazyLoad(); // 关于页的头像图片需要懒加载
  }
});