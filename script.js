document.addEventListener('DOMContentLoaded', () => {
  // --- Navegação principal por abas ---
  const navLinks = document.querySelectorAll('.nav-link');
  const tabPanes = document.querySelectorAll('.tab-pane');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-tab-target');
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      tabPanes.forEach(pane => pane.classList.remove('active'));
      document.getElementById(`tab-${target}`).classList.add('active');
    });
  });

  // --- Abas internas Forças Estratégicas com scanline ---
  const feTabs = document.querySelectorAll('.estrategica-tab');
  const fePanels = document.querySelectorAll('.fe-panel');
  feTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      feTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.getAttribute('data-fe-target');
      fePanels.forEach(p => p.classList.remove('active'));
      document.getElementById(`fe-${target}`).classList.add('active');
      // Simula scanline no glitch overlay
      const overlay = document.getElementById('glitch-overlay');
      overlay.style.opacity = '0.3';
      setTimeout(() => { overlay.style.opacity = '0'; }, 150);
    });
  });

  // --- Mapa Interativo com tooltip holográfico ---
  const mapAreas = document.querySelectorAll('.map-area');
  const tooltip = document.getElementById('map-tooltip');
  mapAreas.forEach(area => {
    area.addEventListener('mouseenter', (e) => {
      const info = area.getAttribute('data-info').split('|');
      tooltip.innerHTML = `<strong>${info[0]}</strong><br>${info[1]}<br>${info[2]}`;
      tooltip.style.opacity = '1';
    });
    area.addEventListener('mousemove', (e) => {
      tooltip.style.left = (e.pageX + 15) + 'px';
      tooltip.style.top = (e.pageY + 15) + 'px';
    });
    area.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
    });
  });

  // --- Timeline Scanner (Intersection Observer) ---
  const timelineItems = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
      }
    });
  }, { threshold: 0.2 });
  timelineItems.forEach(item => observer.observe(item));

  // --- Galeria: arrastar para virar (arraste horizontal) ---
  const galleryCards = document.querySelectorAll('.gallery-card');
  galleryCards.forEach(card => {
    let startX = 0;
    card.addEventListener('mousedown', (e) => {
      startX = e.clientX;
      card.style.cursor = 'grabbing';
    });
    card.addEventListener('mouseup', (e) => {
      const diff = e.clientX - startX;
      if (Math.abs(diff) > 40) {
        card.classList.toggle('flipped');
      }
      card.style.cursor = 'grab';
    });
    card.addEventListener('mouseleave', () => {
      card.style.cursor = 'grab';
    });
    // Suporte touch
    card.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    card.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - startX;
      if (Math.abs(diff) > 30) {
        card.classList.toggle('flipped');
      }
    });
  });

  // --- Glitch automático nos desafios a cada 5s ---
  const desafioCards = document.querySelectorAll('.desafio-card');
  setInterval(() => {
    desafioCards.forEach(card => {
      card.classList.add('glitch-effect');
      setTimeout(() => card.classList.remove('glitch-effect'), 300);
    });
  }, 5000);

  // --- Console de Status ao Vivo com digitação ---
  const consoleOutput = document.getElementById('console-text');
  const messages = [
    '> SISCOMIS: Link Verde...',
    '> Bda Inf Pqdt: Prontidão 48h...',
    '> Conexão com CIGS: Estável',
    '> CAvEx: Alerta 3 - Mobilidade',
    '> 1º BFEsp: Sincronizado',
    '> PPIF: Monitorando fronteira',
    '> MINUSTAH: Dados históricos'
  ];
  let msgIndex = 0;
  let charIndex = 0;
  function typeWriter() {
    if (charIndex < messages[msgIndex].length) {
      consoleOutput.textContent += messages[msgIndex].charAt(charIndex);
      charIndex++;
      setTimeout(typeWriter, 50);
    } else {
      setTimeout(() => {
        consoleOutput.textContent = '';
        charIndex = 0;
        msgIndex = (msgIndex + 1) % messages.length;
        typeWriter();
      }, 2500);
    }
  }
  typeWriter();

  // Inicializa primeira aba visível
  document.querySelector('.nav-link.active').click();
});
