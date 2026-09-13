(function () {
  'use strict';

  /* ---------- Mobile menu ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var menuClose = document.getElementById('menuClose');
  var mobileMenu = document.getElementById('mobileMenu');
  var backdrop = document.getElementById('mobileMenuBackdrop');
  var body = document.body;

  function openMenu() {
    mobileMenu.classList.add('open');
    backdrop.classList.add('open');
    body.classList.add('menu-open');
    menuToggle.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    backdrop.classList.remove('open');
    body.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  if (menuToggle) menuToggle.addEventListener('click', openMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);
  if (backdrop) backdrop.addEventListener('click', closeMenu);

  document.querySelectorAll('.mobile-nav-links a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Theme toggle ---------- */
  var themeToggle = document.getElementById('themeToggle');
  var mobileThemeToggle = document.getElementById('mobileThemeToggle');
  var mobileThemeLabel = document.getElementById('mobileThemeLabel');

  function applyTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light');
    } else {
      body.classList.remove('light');
    }
    document.querySelectorAll('.theme-toggle i').forEach(function (icon) {
      icon.className = theme === 'light' ? 'ri-moon-line' : 'ri-sun-line';
    });
    if (mobileThemeLabel) {
      mobileThemeLabel.textContent = theme === 'light' ? 'DARK' : 'LIGHT';
    }
    if (mobileThemeToggle) {
      var icon = mobileThemeToggle.querySelector('i');
      if (icon) icon.className = theme === 'light' ? 'ri-moon-line' : 'ri-sun-line';
    }
  }

  function currentTheme() {
    return body.classList.contains('light') ? 'light' : 'dark';
  }

  function toggleTheme() {
    var next = currentTheme() === 'light' ? 'dark' : 'light';
    applyTheme(next);
    try { localStorage.setItem('selfclaw-theme', next); } catch (e) {}
  }

  try {
    var saved = localStorage.getItem('selfclaw-theme');
    if (saved) applyTheme(saved);
  } catch (e) {}

  if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
  if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      question.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  /* ---------- Get free API key (placeholder) ---------- */
  var getApiKeyBtn = document.getElementById('getApiKeyBtn');
  if (getApiKeyBtn) {
    getApiKeyBtn.addEventListener('click', function () {
      window.location.hash = '#developers';
    });
  }
})();
