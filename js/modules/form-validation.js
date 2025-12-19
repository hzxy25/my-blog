// 表单验证
export function initFormValidation() {
  const contactForm = document.querySelector('.contact-form');

  if (!contactForm) return;

  // 验证规则
  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      message: '姓名至少2个字符'
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '请输入有效的邮箱地址'
    },
    message: {
      required: true,
      minLength: 10,
      maxLength: 500,
      message: '留言内容需在10-500字符之间'
    }
  };

  // 验证单个字段
  function validateField(field) {
    const { name, value } = field;
    const rules = validationRules[name];
    const errorElement = contactForm.querySelector(`#${name}-error`);

    if (!rules) return true;

    // 检查必填
    if (rules.required && !value.trim()) {
      errorElement.textContent = '此字段为必填项';
      return false;
    }

    // 检查最小长度
    if (rules.minLength && value.length < rules.minLength) {
      errorElement.textContent = rules.message;
      return false;
    }

    // 检查最大长度
    if (rules.maxLength && value.length > rules.maxLength) {
      errorElement.textContent = rules.message;
      return false;
    }

    // 检查正则
    if (rules.pattern && !rules.pattern.test(value)) {
      errorElement.textContent = rules.message;
      return false;
    }

    // 验证通过
    errorElement.textContent = '';
    return true;
  }

  // 实时验证
  contactForm.querySelectorAll('.form-input, .form-textarea').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => validateField(field));
  });

  // 表单提交验证
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn');
    const successBox = contactForm.querySelector('.success-box');

    // 禁用提交按钮
    submitBtn.disabled = true;
    submitBtn.textContent = '提交中...';

    // 验证所有字段
    let isFormValid = true;
    contactForm.querySelectorAll('.form-input, .form-textarea').forEach(field => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      submitBtn.disabled = false;
      submitBtn.textContent = '提交留言';
      return;
    }

    // 模拟提交
    setTimeout(() => {
      // 显示成功提示
      successBox.classList.add('show');

      // 重置表单
      contactForm.reset();

      // 恢复按钮
      submitBtn.disabled = false;
      submitBtn.textContent = '提交留言';

      // 3秒后隐藏成功提示
      setTimeout(() => {
        successBox.classList.remove('show');
      }, 3000);
    }, 1000);
  });
}