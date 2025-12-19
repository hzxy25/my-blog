import { Storage } from './storage.js';

// 初始化评论功能
export function initComments() {
  const commentForm = document.querySelector('.comment-form');
  const commentList = document.querySelector('.comment-list');
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!commentForm || !commentList || !postId) return;

  // 评论存储key
  const COMMENT_KEY = `comments_${postId}`;

  // 加载评论
  function loadComments() {
    const comments = Storage.get(COMMENT_KEY) || [];
    commentList.innerHTML = '';

    if (comments.length === 0) {
      commentList.innerHTML = '<div class="search-results">暂无评论，快来抢沙发吧！</div>';
      return;
    }

    comments.forEach(comment => {
      const commentItem = document.createElement('div');
      commentItem.className = 'comment-item fade-in';
      commentItem.innerHTML = `
        <div class="comment-author">${comment.name}</div>
        <div class="comment-date">${new Date(comment.date).toLocaleString()}</div>
        <div class="comment-content">${comment.content}</div>
      `;
      commentList.appendChild(commentItem);
    });
  }

  // 提交评论
  commentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = commentForm.querySelector('#comment-name');
    const contentInput = commentForm.querySelector('#comment-content');
    const submitBtn = commentForm.querySelector('.btn');
    const errorElement = commentForm.querySelector('.error-message');

    // 清空错误提示
    errorElement.textContent = '';

    // 获取值
    const name = nameInput.value.trim();
    const content = contentInput.value.trim();

    // 验证
    if (!name || !content) {
      errorElement.textContent = '姓名和评论内容不能为空';
      return;
    }

    if (content.length < 5) {
      errorElement.textContent = '评论内容至少5个字符';
      return;
    }

    // 禁用提交按钮
    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';

    // 创建评论对象
    const newComment = {
      id: Date.now(),
      name,
      content,
      date: new Date().toISOString()
    };

    // 获取现有评论并添加新评论
    const comments = Storage.get(COMMENT_KEY) || [];
    comments.unshift(newComment); // 最新评论在前
    Storage.set(COMMENT_KEY, comments);

    // 重置表单
    commentForm.reset();

    // 显示成功提示
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message fade-in';
    successMessage.textContent = '评论提交成功！';
    commentForm.appendChild(successMessage);

    // 重新加载评论
    loadComments();

    // 恢复按钮状态
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = '提交评论';
      successMessage.remove();
    }, 2000);
  });

  // 初始化加载评论
  loadComments();
}

// 渲染Markdown内容
export function renderMarkdownContent() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');
  const blogContent = document.querySelector('.blog-detail-content');

  if (!postId || !blogContent) return;

  import('./blog-data.js').then(({ blogPosts }) => {
    const post = blogPosts.find(p => p.id === parseInt(postId));

    if (!post) {
      blogContent.innerHTML = '<div class="error-message">该博客文章不存在</div>';
      return;
    }

    // 简单的Markdown解析
    let htmlContent = post.content
      // 标题
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      // 代码块
      .replace(/```([\s\S]*?)```/gm, '<pre><code>$1</code></pre>')
      // 换行
      .replace(/\n/g, '<br>');

    blogContent.innerHTML = htmlContent;

    // 设置标题
    document.querySelector('.blog-detail-title').textContent = post.title;
    document.querySelector('.blog-detail-date').textContent = post.date;
    document.querySelector('.blog-detail-tags').textContent = post.tags.join(' | ');
  });
}