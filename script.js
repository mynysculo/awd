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
  setInterval(() => {
    const d = new Date();
    clock.textContent = d.toLocaleTimeString('pt-BR', { hour12: false });
  }, 1000);
}

/* ========== MAPA INTERATIVO ========== */
function initMap() {
  const zones = document.querySelectorAll('.map-zone, .map-dot');
  const panelBody = document.getElementById('holo-body');
  const panelCoords = document.getElementById('holo-coords');
  const listButtons = document.querySelectorAll('.quick-command-list button');

  const data = {
    CMN: { sigla:'CMN', nome:'Comando Militar do Norte', sede:'Belém (PA)', abrang:'Defesa da Amazônia Oriental' },
    CMA: { sigla:'CMA', nome:'Comando Militar da Amazônia', sede:'Manaus (AM)', abrang:'Faixa de fronteira amazônica' },
    CMNE:{ sigla:'CMNE', nome:'Comando Militar do Nordeste', sede:'Recife (PE)', abrang:'Segurança regional e apoio a GLO' },
    CMP: { sigla:'CMP', nome:'Comando Militar do Planalto', sede:'Brasília (DF)', abrang:'Proteção da capital e entorno' },
    CML: { sigla:'CML', nome:'Comando Militar do Leste', sede:'Rio de Janeiro (RJ)', abrang:'Centro de poder e F Emp Estrtg' },
    CMSE:{ sigla:'CMSE', nome:'Comando Militar do Sudeste', sede:'São Paulo (SP)', abrang:'Maior efetivo e estrutura industrial' },
    CMS: { sigla:'CMS', nome:'Comando Militar do Sul', sede:'Porto Alegre (RS)', abrang:'Fronteira sul e tradição blindada' },
    CMO: { sigla:'CMO', nome:'Comando Militar do Oeste', sede:'Campo Grande (MS)', abrang:'Pantanal e defesa da fronteira oeste' }
  };

  function showInfo(comando) {
    const d = data[comando];
    if (!d) return;
    panelBody.innerHTML = `<p><strong>${d.sigla}</strong> · ${d.nome}</p><p>Sede: ${d.sede}</p><p>${d.abrang}</p>`;
    panelCoords.textContent = `COORD: ${comando}`;
    listButtons.forEach(b => {
      b.classList.remove('active');
      if (b.dataset.comando === comando) b.classList.add('active');
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

  const active = document.querySelector('.tab-btn.active');
  if (active) moveHighlighter(active);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      moveHighlighter(btn);
      panels.forEach(p => p.classList.remove('active'));
      document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
    });
  });

  window.addEventListener('resize', () => {
    const current = document.querySelector('.tab-btn.active');
    if (current) moveHighlighter(current);
  });
}

/* ========== TIMELINE SCANNER ========== */
function initTimeline() {
  const entries = document.querySelectorAll('.timeline-entry[data-animate]');
  const observer = new IntersectionObserver((entriesObs) => {
    entriesObs.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.3 });
  entries.forEach(e => observer.observe(e));
}

/* ========== GALERIA ========== */
function initGallery() {
  const grid = document.getElementById('gallery-grid');
  const overlay = document.getElementById('lightbox-overlay');
  const imgEl = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const close = document.getElementById('lightbox-close');

  // Imagens reais (domínio público ou divulgação oficial)
  const images = [
    { src:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Exercito_brasileiro_paraquedista.jpg/640px-Exercito_brasileiro_paraquedista.jpg', caption:'Paraquedistas do Exército Brasileiro' },
    { src:'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Brazilian_Army_Aviation_Command_Helicopter.jpg/640px-Brazilian_Army_Aviation_Command_Helicopter.jpg', caption:'Helicóptero do Comando de Aviação do Exército' },
    { src:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Brazilian_special_forces_operators.jpg/640px-Brazilian_special_forces_operators.jpg', caption:'Operadores das Forças Especiais' },
    { src:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/MINUSTAH_Brazilian_troops.jpg/640px-MINUSTAH_Brazilian_troops.jpg', caption:'Tropas brasileiras na MINUSTAH (Haiti)' }
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

  close.addEventListener('click', () => overlay.classList.remove('active'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('active');
  });
}

/* ========== GLITCH ========== */
function initGlitch() {
  const cards = document.querySelectorAll('.glitch-card[data-glitch]');
  setInterval(() => {
    const random = cards[Math.floor(Math.random() * cards.length)];
    random.classList.add('glitch-active');
    setTimeout(() => random.classList.remove('glitch-active'), 350);
  }, 5000);
}

/* ========== CONSOLE TÁTICO ========== */
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
  let idx = 0, char = 0, current = '';

  function type() {
    if (char < messages[idx].length) {
      current += messages[idx][char];
      output.textContent = current;
      char++;
      setTimeout(type, 50);
    } else {
      setTimeout(erase, 2000);
    }
  }

  function erase() {
    if (current.length > 0) {
      current = current.slice(0, -1);
      output.textContent = current;
      setTimeout(erase, 20);
    } else {
      idx = (idx + 1) % messages.length;
      char = 0;
      setTimeout(type, 300);
    }
  }

  type();
}
