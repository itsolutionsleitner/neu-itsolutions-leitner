// === SCROLL-REVEAL ANIMATIONEN ===
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((el) => observer.observe(el));

  // === MOBILE NAVIGATION ===
  const navToggle = document.querySelector('.nav-toggle');
  const body = document.body;

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = body.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.addEventListener('click', () => {
        body.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // === AKTIVEN NAV-LINK MARKIEREN ===
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // === MAUS-SPOTLIGHT (Hero, Page-Hero, CTA-Banner) ===
  const spotlightTargets = document.querySelectorAll('.hero, .page-hero, .cta-banner');
  let spotlightTicking = false;

  spotlightTargets.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      if (spotlightTicking) return;
      spotlightTicking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty('--mx', x + '%');
        el.style.setProperty('--my', y + '%');
        spotlightTicking = false;
      });
    });
  });

  // === CODE-RAIN HINTERGRUND-ANIMATION ===
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const chars = '01{}[]()<>/;:=+-*#&|!?_'.split('');

  document.querySelectorAll('.code-rain').forEach((canvas) => {
    if (reduceMotion) return;

    const ctx = canvas.getContext('2d');
    const isDark = canvas.dataset.theme === 'dark';
    const fontSize = 15;
    const dropColor = isDark ? '94, 168, 255' : '42, 92, 224';
    const fadeColor = isDark ? '15, 20, 32' : '255, 255, 255';
    let columns = 0;
    let drops = [];

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      columns = Math.floor(canvas.width / fontSize);
      drops = new Array(columns).fill(0).map(() => Math.random() * -50);
    }

    resize();
    window.addEventListener('resize', resize);

    let lastFrame = 0;
    function draw(timestamp) {
      requestAnimationFrame(draw);
      if (timestamp - lastFrame < 90) return;
      lastFrame = timestamp;

      ctx.fillStyle = `rgba(${fadeColor}, 0.12)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;
      ctx.fillStyle = `rgba(${dropColor}, 0.4)`;

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] = y + 1;
        }
      });
    }

    requestAnimationFrame(draw);
  });

  // === FAQ AKKORDEON ===
  document.querySelectorAll('.faq-item').forEach((item) => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach((openItem) => {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
});
