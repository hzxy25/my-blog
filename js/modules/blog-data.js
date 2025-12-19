// 模拟博客数据
export const blogPosts = [
  {
    id: 1,
    title: "HTML5语义化标签的最佳实践",
    excerpt: "语义化标签不仅提升SEO，还能增强代码可读性和可维护性...",
    tags: ["HTML5", "语义化", "前端基础"],
    date: "2025-01-10",
    image: "./assets/images/blog-1.jpg",
    content: `
# HTML5语义化标签的最佳实践

## 什么是语义化标签？
语义化标签是指具有明确含义的HTML标签，例如\<header\>、\<nav\>、\<main\>等，而非通用的\<div\>和\<span\>。

## 为什么要使用语义化标签？
1. 提升SEO效果：搜索引擎能更好地理解页面结构
2. 增强可访问性：屏幕阅读器能更好地解析内容
3. 提高代码可读性：开发者能快速理解页面结构

## 常用语义化标签
- \<header\>：页面头部
- \<nav\>：导航区域
- \<main\>：主要内容
- \<article\>：独立文章内容
- \<section\>：内容分区
- \<aside\>：侧边栏
- \<footer\>：页面底部
    `
  },
  {
    id: 2,
    title: "CSS3响应式布局实战指南",
    excerpt: "从媒体查询到Grid布局，掌握现代响应式设计的核心技巧...",
    tags: ["CSS3", "响应式", "布局"],
    date: "2025-01-15",
    image: "./assets/images/blog-2.jpg",
    content: `
# CSS3响应式布局实战指南

## 响应式设计的核心原则
- 移动优先
- 流体布局
- 媒体查询
- 弹性图片

## 媒体查询基础
\`\`\`css
@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
}
\`\`\`

## Grid vs Flexbox
- Flexbox：一维布局（行或列）
- Grid：二维布局（行和列）
    `
  },
  {
    id: 3,
    title: "JavaScript本地存储完全指南",
    excerpt: "详解localStorage、sessionStorage的使用场景和最佳实践...",
    tags: ["JavaScript", "本地存储", "前端存储"],
    date: "2025-01-20",
    image: "./assets/images/blog-3.jpg",
    content: `
# JavaScript本地存储完全指南

## 本地存储类型
1. localStorage：持久化存储，无过期时间
2. sessionStorage：会话存储，关闭标签页即失效
3. Cookie：小型存储，可设置过期时间

## 使用示例
\`\`\`javascript
// 存储数据
localStorage.setItem('user', JSON.stringify({name: '张三'}));

// 获取数据
const user = JSON.parse(localStorage.getItem('user'));

// 删除数据
localStorage.removeItem('user');
\`\`\`

## 注意事项
- 存储大小限制（约5MB）
- 仅存储字符串类型
- 不要存储敏感信息
    `
  }
];

// 渲染博客列表
export function renderBlogList(posts = blogPosts) {
  const blogList = document.querySelector('.blog-list');
  if (!blogList) return;

  blogList.innerHTML = '';

  if (posts.length === 0) {
    blogList.innerHTML = '<div class="search-results">未找到匹配的博客文章</div>';
    return;
  }

  posts.forEach(post => {
    const blogCard = document.createElement('article');
    blogCard.className = 'blog-card fade-in';
    blogCard.innerHTML = `
      <div class="blog-card-img img-zoom">
        <img data-src="${post.image}" alt="${post.title}" class="lazyload">
      </div>
      <div class="blog-card-content">
        <h3 class="blog-card-title">${post.title}</h3>
        <div class="blog-card-meta">
          <span>${post.date}</span>
          <span>阅读时长: ${Math.ceil(post.content.length / 500)} 分钟</span>
        </div>
        <div class="blog-card-tags">
          ${post.tags.map(tag => `<span class="blog-card-tag">${tag}</span>`).join('')}
        </div>
        <p class="blog-card-excerpt">${post.excerpt}</p>
        <a href="./blog-detail.html?id=${post.id}" class="btn">阅读全文</a>
      </div>
    `;
    blogList.appendChild(blogCard);
  });
}
