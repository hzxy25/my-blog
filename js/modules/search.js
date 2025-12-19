import { blogPosts, renderBlogList } from './blog-data.js';

export function initSearch() {
  const searchInput = document.querySelector('.search-input');

  if (!searchInput) return;

  // 实时搜索
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();

    if (!searchTerm) {
      renderBlogList(blogPosts);
      return;
    }

    // 搜索匹配的博客
    const filteredPosts = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    renderBlogList(filteredPosts);
  });
}