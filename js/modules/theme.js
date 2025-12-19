import { Storage } from './storage.js';

// 主题切换
export function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;
  const THEME_KEY = 'preferred_theme';

  // 获取保存的主题
  const savedTheme = Storage.get(THEME_KEY) || 'light';

  // 设置初始主题
  if (savedTheme === 'dark') {
    root.classList.add('dark-theme');
    themeToggle.textContent = '☀️';
  } else {
    root.classList.remove('dark-theme');
    themeToggle.textContent = '🌙';
  }

  // 切换主题
  themeToggle.addEventListener('click', () => {
    const isDark = root.classList.contains('dark-theme');

    if (isDark) {
      root.classList.remove('dark-theme');
      themeToggle.textContent = '🌙';
      Storage.set(THEME_KEY, 'light');
    } else {
      root.classList.add('dark-theme');
      themeToggle.textContent = '☀️';
      Storage.set(THEME_KEY, 'dark');
    }
  });
}