// ============= INIT =============
let isFirstLoad = true;

// ------------  Theme and Color ------------
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const colorToggle = document.getElementById('color-toggle');

// Define color schemes
const accentModes = ['default', 'blue', 'green', 'orange'];
let currentColorIndex = 0;

// Load saved preferences or use defaults
const savedTheme = localStorage.getItem('theme') || 'dark';
const savedColor = localStorage.getItem('accent') || 'default';

// Apply saved theme
if (savedTheme === 'light') {
  body.classList.add('light-theme');
  updateThemeIcon('light');
} else {
  body.classList.remove('light-theme');
  updateThemeIcon('dark');
}

// Apply saved color
currentColorIndex = accentModes.indexOf(savedColor);
applyAccentColor(savedColor);

// Theme toggle
themeToggle?.addEventListener('click', () => {
  body.classList.toggle('light-theme');
  const isLight = body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
  updateThemeIcon(isLight ? 'light' : 'dark');
});

function updateThemeIcon(theme) {
  const icon = themeToggle?.querySelector('i');
  if (icon) {
    icon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
  }
}

// Color toggle (cycle through options)
colorToggle?.addEventListener('click', () => {
  currentColorIndex = (currentColorIndex + 1) % accentModes.length;
  const nextColor = accentModes[currentColorIndex];
  applyAccentColor(nextColor);
  localStorage.setItem('accent', nextColor);
});

function applyAccentColor(color) {
  body.classList.remove('accent-blue', 'accent-green', 'accent-orange');
  if (color === 'blue') body.classList.add('accent-blue');
  else if (color === 'green') body.classList.add('accent-green');
  else if (color === 'orange') body.classList.add('accent-orange');
}

// ============= Section: Navigation =============
function showSection(sectionId, animate = true) {
  const sections = document.querySelectorAll('.section');
  const targetSection = document.getElementById(sectionId);

  // Update active nav link
  document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
  if (activeLink) activeLink.classList.add('active');

  // Hide current section
  sections.forEach(section => {
    if (section.classList.contains('active-section')) {
      if (animate) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => section.classList.remove('active-section'), 500);
      } else {
        section.classList.remove('active-section');
      }
    }
  });

  // Show target section
  if (targetSection) {
    targetSection.classList.add('active-section');
    if (animate) {
      void targetSection.offsetWidth;
      setTimeout(() => {
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateY(0)';
      }, 10);
    } else {
      targetSection.style.opacity = '1';
      targetSection.style.transform = 'translateY(0)';
    }
  }
}

// ============= Typping Effect =============
function initTypingEffect() {
  const texts = [
    "Técnico de Suporte Informático",
    "Desenvolvedor Web",
    "Administrador de Redes",
    "Estudante de TI"
  ];

  const typingText = document.getElementById('typing-text');
  if (!typingText) return;

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 100;
  const deleteSpeed = 50;
  const pauseDelay = 2000;

  function type() {
    const currentText = texts[textIndex];
    if (isDeleting) {
      // Remove one character
      typingText.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add one character
      typingText.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentText.length) {
      // Pause after full text
      delay = pauseDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next text
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
    }

    setTimeout(type, delay);
  }

  // Start the effect
  type();
}

// Call it when the page loads
document.addEventListener('DOMContentLoaded', function () {
  // ... your existing code ...

  // Initialize typing effect
  initTypingEffect();
});

// ------------ Tabs (About Me) ------------
window.opentab = function (tabname) {
  const tablinks = document.getElementsByClassName('tab-links');
  const tabcontents = document.getElementsByClassName('tab-contents');

  for (let tablink of tablinks) tablink.classList.remove('active-link');
  for ( let tabcontent of tabcontents) tabcontent.classList.remove('active-tab');

  event.currentTarget.classList.add('active-link');
  const targetTab = document.getElementById(tabname);
  if (targetTab) targetTab.classList.add('active-tab');
};

// ------------ MOBILE MENU ------------
window.openmenu = function () {
  const menu = document.getElementById('menu');
  if (menu) menu.style.right = '0';
};

window.closemenu = function () {
  const menu = document.getElementById('menu');
  if (menu) menu.style.right = '-250px';
};

// ------------ Form Submission  ------------
const scriptURL = 'https://script.google.com/macros/s/AKfycbwSdmCEC-xf6hQqOHkdijtEhBt90S7N06j_h9aI-AmE4FvItUvTHNyy82qU1vgmpJOvcA/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById('msg');

if (form && msg) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(response => {
        msg.innerHTML = 'Mensagem enviada com sucesso.';
        form.reset();
        setTimeout(() => msg.innerHTML = '', 5000);
      })
      .catch(error => {
        console.error('Erro:', error.message);
        msg.innerHTML = 'Erro ao enviar. Tente novamente.';
        setTimeout(() => msg.innerHTML = '', 5000);
      });
  });
}

// ------------ DOM READY ------------
document.addEventListener('DOMContentLoaded', function () {
  // Set up nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      if (document.getElementById(targetId)?.classList.contains('active-section')) {
        closemenu();
        return;
      }
      showSection(targetId, true);
      closemenu();
    });
  });

  // Initial section (no animation)
  showSection('home', false);
});