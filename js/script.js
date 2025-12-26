let isFirstLoad = true;

// Função para mostrar uma seção com ou sem animação
function showSection(sectionId, animate = true) {
  const sections = document.querySelectorAll('.section');
  const targetSection = document.getElementById(sectionId);

  // Atualizar link ativo na navbar
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add('active');
  }

  // Esconder seções ativas
  sections.forEach(section => {
    if (section.classList.contains('active-section')) {
      if (animate) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
          section.classList.remove('active-section');
        }, 500);
      } else {
        section.classList.remove('active-section');
      }
    }
  });

  // Mostrar nova seção
  if (targetSection) {
    targetSection.classList.add('active-section');
    if (animate) {
      void targetSection.offsetWidth; // Forçar reflow
      setTimeout(() => {
        targetSection.style.opacity = '1';
        targetSection.style.transform = 'translateY(0)';
      }, 10);
    } else {
      // Sem animação: definir estado final imediatamente
      targetSection.style.opacity = '1';
      targetSection.style.transform = 'translateY(0)';
    }
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
  // Configurar navegação
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      showSection(targetId, true); // ← sempre animar ao clicar
      closemenu();
    });
  });

  // Mostrar a seção inicial SEM ANIMAÇÃO na primeira carga
  showSection('home', false);
  isFirstLoad = false;

  //  Tabs (About me)
  window.opentab = function (tabname) {
    const tablinks = document.getElementsByClassName('tab-links');
    const tabcontents = document.getElementsByClassName('tab-contents');

    for (let tablink of tablinks) {
      tablink.classList.remove('active-link');
    }
    for (let tabcontent of tabcontents) {
      tabcontent.classList.remove('active-tab');
    }

    event.currentTarget.classList.add('active-link');
    const targetTab = document.getElementById(tabname);
    if (targetTab) {
      targetTab.classList.add('active-tab');
    }
  };

  // Formulário
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
});

// === Menu mobile ===
window.openmenu = function () {
  const menu = document.getElementById('menu');
  if (menu) menu.style.right = '0';
};

window.closemenu = function () {
  const menu = document.getElementById('menu');
  if (menu) menu.style.right = '-250px';
};