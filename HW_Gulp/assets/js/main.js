// Головний файл для ініціалізації функціоналу на сторінці

document.addEventListener('DOMContentLoaded', () => {
  console.log('main.js запущено');

  // Приклад: плавний скрол до секції
  const scrollToSection = document.querySelector('[data-scroll]');
  if (scrollToSection) {
    scrollToSection.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = scrollToSection.getAttribute('href');
      document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
    });
  }
});