document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initMap();
  initTabs();
  initTimeline();
  initGallery();
  initGlitch();
  initConsole();
});

/* ========== RELÓGIO ========== */
function initClock() {
  const clock = document.getElementById('live-clock');
  function update() {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString('pt-BR', { hour12: false });
    requestAnimationFrame(() => setTimeout(update, 1000));
  }
  update();
}

/* ========== MAPA INTERATIVO ========== */
function initMap() {
  const zones = document.querySelectorAll('.map-zone, .map-dot');
  const holoBody = document.getElementById('holo-body');
  const holoCoords = document.getElementById('holo-coords');
  const listButtons = document.querySelectorAll('.quick-command-list button');

  const data = {
    CMN:  { sigla:'CMN',  nome:'Comando Militar do Norte',     sede:'Belém (PA)',        abrang:'Defesa da Amazônia Oriental' },
    CMA:  { sigla:'CMA',  nome:'Comando Militar da Amazônia',  sede:'Manaus (AM)',       abrang:'Faixa de fronteira amazônica' },
    CMNE: { sigla:'CMNE', nome:'Comando Militar do Nordeste',  sede:'Recife (PE)',       abrang:'Segurança regional e apoio a GLO' },
    CMP:  { sigla:'CMP',  nome:'Comando Militar do Planalto',  sede:'Brasília (DF)',     abrang:'Proteção da capital e entorno' },
    CML:  { sigla:'CML',  nome:'Comando Militar do Leste',     sede:'Rio de Janeiro (RJ)', abrang:'Centro de poder e F Emp Estrtg' },
    CMSE: { sigla:'CMSE', nome:'Comando Militar do Sudeste',   sede:'São Paulo (SP)',    abrang:'Maior efetivo e estrutura industrial' },
    CMS:  { sigla:'CMS',  nome:'Comando Militar do Sul',       sede:'Porto Alegre (RS)', abrang:'Fronteira sul e tradição blindada' },
    CMO:  { sigla:'CMO',  nome:'Comando Militar do Oeste',     sede:'Campo Grande (MS)', abrang:'Pantanal e defesa da fronteira oeste' }
  };

  function showInfo(comando) {
    const d = data[comando];
    if (!d) return;
    holoBody.innerHTML = `<p><strong>${d.sigla}</strong> · ${d.nome}</p><p>Sede: ${d.sede}</p><p>${d.abrang}</p>`;
    holoCoords.textContent = `COORD: ${comando}`;
    listButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.comando === comando) btn.classList.add('active');
    });
  }

  zones.forEach(el => {
    el.addEventListener('mouseenter', () => showInfo(el.dataset.comando));
  });

  listButtons.forEach(btn => {
    btn.addEventListener('click', () => showInfo(btn.dataset.comando));
  });
}

/* ========== TABS ========== */
function initTabs() {
  const buttons = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');
  const highlighter = document.getElementById('tab-highlighter');

  function moveHighlighter(btn) {
    highlighter.style.left = btn.offsetLeft + 'px';
    highlighter.style.width = btn.offsetWidth + 'px';
  }

  const activeBtn = document.querySelector('.tab-btn.active');
  if (activeBtn) moveHighlighter(activeBtn);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      moveHighlighter(btn);
      const targetId = 'panel-' + btn.dataset.tab;
      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === targetId) p.classList.add('active');
      });
    });
  });

  window.addEventListener('resize', () => {
    const current = document.querySelector('.tab-btn.active');
    if (current) moveHighlighter(current);
  });
}

/* ========== LINHA DO TEMPO ========== */
function initTimeline() {
  const items = document.querySelectorAll('.timeline-entry[data-animate]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.3 });
  items.forEach(item => observer.observe(item));
}

/* ========== GALERIA COM IMAGENS REAIS ========== */
function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const overlay = document.getElementById('lightbox-overlay');
  const imgEl = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close');

  // Imagens reais de domínio público ou divulgação oficial do Exército Brasileiro
  const images = [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Exercito_brasileiro_paraquedista.jpg/640px-Exercito_brasileiro_paraquedista.jpg',
      caption: 'Paraquedistas do Exército Brasileiro'
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Brazilian_Army_Aviation_Command_Helicopter.jpg/640px-Brazilian_Army_Aviation_Command_Helicopter.jpg',
      caption: 'Helicóptero do Comando de Aviação do Exército'
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Brazilian_special_forces_operators.jpg/640px-Brazilian_special_forces_operators.jpg',
      caption: 'Operadores das Forças Especiais do Exército'
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/MINUSTAH_Brazilian_troops.jpg/640px-MINUSTAH_Brazilian_troops.jpg',
      caption: 'Tropas brasileiras na MINUSTAH (Haiti)'
    }
  ];

  images.forEach(img => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `<img src="${img.src}" alt="${img.caption}" loading="lazy" />`;
    div.addEventListener('click', () => {
      imgEl.src = img.src;
      caption.textContent = img.caption;
      overlay.classList.add('active');
    });
    grid.appendChild(div);
  });

  closeBtn.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

/* ========== GLITCH AUTOMÁTICO ========== */
function initGlitch() {
  const cards = document.querySelectorAll('.glitch-card[data-glitch]');
  if (cards.length === 0) return;

  setInterval(() => {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
    randomCard.classList.add('glitch-active');
    setTimeout(() => {
      randomCard.classList.remove('glitch-active');
    }, 350);
  }, 5000);
}

/* ========== CONSOLE TÁTICO AO VIVO ========== */
function initConsole() {
  const output = document.getElementById('console-output');
  const messages = [
    '> SISCOMIS: Link Verde...',
    '> Bda Inf Pqdt: Prontidão 48h',
    '> Conexão com CIGS: Estável',
    '> CAvEx: Pronto para missão',
    '> C Op Esp: Canal seguro ativo',
    '> PPIF: Varredura de fronteira ok'
  ];

  let msgIndex = 0;
  let charIndex = 0;
  let currentText = '';

  function typeWriter() {
    if (charIndex < messages[msgIndex].length) {
      currentText += messages[msgIndex].charAt(charIndex);
      output.textContent = currentText;
      charIndex++;
      setTimeout(typeWriter, 50);
    } else {
      setTimeout(eraseText, 2000);
    }
  }

  function eraseText() {
    if (currentText.length > 0) {
      currentText = currentText.slice(0, -1);
      output.textContent = currentText;
      setTimeout(eraseText, 20);
    } else {
      msgIndex = (msgIndex + 1) % messages.length;
      charIndex = 0;
      setTimeout(typeWriter, 300);
    }
  }

  typeWriter();
}
