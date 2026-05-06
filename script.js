/* ============================================ */
/* AGRO FORTE · SCRIPT.JS · 2500+ LINHAS       */
/* ANIMAÇÕES GSAP · JOGO 3D · CANVAS · CURSOR  */
/* PARTÍCULAS DE PÓLEN · CONQUISTAS · EFEITOS   */
/* ============================================ */

(function() {
    'use strict';
    
    // ===== CONFIGURAÇÕES GLOBAIS =====
    const CONFIG = {
        preloaderDuration: 2800,
        cursorLerpFactor: 0.085,
        particleCount: 150,
        connectionDistance: 140,
        memoryPairs: 4,
        counterSpeed: 45,
        scrollThreshold: 50,
        pollenCount: 40,
        butterflyCount: 5
    };
    
    // ===== ESTADO GLOBAL =====
    const State = {
        mouseX: 0, mouseY: 0,
        cursorCoreX: 0, cursorCoreY: 0,
        cursorOuterX: 0, cursorOuterY: 0,
        cursorTrailX: 0, cursorTrailY: 0,
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isLoading: true,
        currentTab: 'tab1',
        memoryCards: [], memoryFlipped: [], memoryMatched: 0, memoryAttempts: 0, memoryLocked: false,
        memoryBest: null, memoryLevel: 1,
        canvasCtx: null, canvasWidth: 0, canvasHeight: 0,
        particles: [], pollenParticles: [], butterflies: [],
        mouseInfluence: { x: 0, y: 0 },
        scrollProgress: 0,
        themeMode: 'dark',
        achievements: [],
        rafId: null
    };
    
    // ===== BANCO DE DADOS DE CONHECIMENTO AGRO =====
    const AGRO_KNOWLEDGE = {
        'logo': {
            title: '🌱 AgroForte 5.0',
            description: 'Líder em agricultura regenerativa desde 2020. Certificada B Corp, Carbon Trust e Rainforest Alliance. Nossa missão é alimentar o mundo regenerando o planeta.',
            stats: [
                { value: '+580', label: 'Fazendas Certificadas' },
                { value: '12', label: 'Países' },
                { value: 'R$2.1Bi', label: 'Créditos de Carbono' }
            ],
            link: '#impacto'
        },
        'badge': {
            title: '🏷️ Versão 5.0 · Plataforma',
            description: 'A versão mais avançada da nossa plataforma integra IA preditiva, blockchain para rastreabilidade total e gêmeos digitais de cada hectare cultivado.',
            stats: [
                { value: '99.9%', label: 'Uptime' },
                { value: '24/7', label: 'Suporte' },
                { value: '5ms', label: 'Latência' }
            ]
        },
        'badge-hero': {
            title: '🌍 AGRO 5.0 · Carbono Negativo',
            description: 'Agricultura 5.0: a quinta revolução agrícola. Integramos Inteligência Artificial, Internet das Coisas, Blockchain e Biotecnologia para criar a agricultura mais sustentável da história.',
            stats: [
                { value: '5ª', label: 'Revolução Agrícola' },
                { value: '2030', label: 'Meta Global' },
                { value: 'ODS', label: '12 Objetivos ONU' }
            ]
        },
        'title-equilibrio': {
            title: '⚖️ Equilíbrio · Palavra-Chave',
            description: 'O equilíbrio é o princípio fundamental da agricultura regenerativa. Produzir alimentos de qualidade enquanto restauramos ecossistemas inteiros.',
            stats: [
                { value: '50%', label: 'Alimentos mundiais' },
                { value: '70%', label: 'Água doce usada' }
            ]
        },
        'title-producao': {
            title: '🌽 Produção · Alimentar o Mundo',
            description: 'Até 2050, precisaremos alimentar 10 bilhões de pessoas. Nossas técnicas aumentam a produtividade em 42% sem expandir a área plantada.',
            stats: [
                { value: '10Bi', label: 'Pessoas em 2050' },
                { value: '+42%', label: 'Produtividade' }
            ]
        },
        'title-meioambiente': {
            title: '🌳 Meio Ambiente · Preservação',
            description: 'Cada hectare cultivado com nossos métodos sequestra 3x mais carbono que a agricultura convencional. A natureza é nossa maior aliada.',
            stats: [
                { value: '3x', label: 'Mais carbono' },
                { value: '+65%', label: 'Biodiversidade' }
            ]
        },
        'hero-description': {
            title: '💚 Nossa Missão',
            description: 'Unimos inteligência artificial de ponta, biotecnologia avançada e sabedoria ancestral dos povos do campo para criar um sistema agrícola que alimenta o planeta sem destruí-lo.'
        },
        'globe-3d': {
            title: '🌐 Globo Interativo',
            description: 'Este globo representa nosso planeta e a responsabilidade que temos em preservá-lo. Cada elemento em órbita simboliza um pilar da sustentabilidade.',
            stats: [
                { value: '🌍', label: 'Planeta' },
                { value: '♻️', label: 'Sustentabilidade' }
            ]
        },
        'orbit-leaf': {
            title: '🌿 Fotossíntese',
            description: 'A folha simboliza a capacidade das plantas de capturar CO₂ e transformar em oxigênio. Nossas práticas aumentam a biomassa verde em 40%.',
            stats: [
                { value: '+40%', label: 'Biomassa' },
                { value: 'CO₂', label: 'Capturado' }
            ]
        },
        'orbit-seed': {
            title: '🌱 Sementes Crioulas',
            description: 'Preservamos mais de 2.000 variedades de sementes crioulas em nosso banco genético. A diversidade genética é essencial para a segurança alimentar.',
            stats: [
                { value: '2.000+', label: 'Variedades' },
                { value: '100%', label: 'Orgânicas' }
            ]
        },
        'orbit-water': {
            title: '💧 Água · Ouro Azul',
            description: 'A água é o recurso mais precioso do planeta. Nossa irrigação inteligente economiza 60% de água comparado aos métodos tradicionais.',
            stats: [
                { value: '-60%', label: 'Consumo' },
                { value: 'IoT', label: 'Monitoramento' }
            ]
        },
        'orbit-sun': {
            title: '☀️ Energia Solar',
            description: '100% das nossas operações são alimentadas por energia solar. Fazendas autossuficientes que geram mais energia do que consomem.',
            stats: [
                { value: '100%', label: 'Renovável' },
                { value: '50MW', label: 'Capacidade' }
            ]
        },
        'orbit-tree': {
            title: '🌳 Florestas',
            description: 'Cada fazenda certificada mantém no mínimo 20% de sua área como reserva legal restaurada, criando corredores ecológicos.',
            stats: [
                { value: '20%', label: 'Reserva mínima' },
                { value: '350k', label: 'Hectares' }
            ]
        },
        'stat-co2': {
            title: '🌫️ Redução de 42% em CO₂',
            description: 'Emissões de gases de efeito estufa reduzidas em 42% comparado à agricultura convencional. Resultado do plantio direto, bioinsumos e energia renovável.',
            stats: [
                { value: '1.250', label: 'Mil toneladas/ano' },
                { value: '42%', label: 'Redução comprovada' }
            ]
        },
        'stat-bio': {
            title: '🦋 +65% em Biodiversidade',
            description: 'Aumento de 65% na biodiversidade local graças aos corredores ecológicos, fim dos agrotóxicos e restauração de habitats naturais.',
            stats: [
                { value: '350+', label: 'Espécies recuperadas' },
                { value: '65%', label: 'Aumento' }
            ]
        },
        'stat-agua': {
            title: '💧 98% de Água Reutilizada',
            description: 'Sistemas de irrigação inteligente com IoT e reuso de água tratada. Economia equivalente ao consumo de 8 milhões de pessoas por ano.',
            stats: [
                { value: '1.280', label: 'Milhões m³/ano' },
                { value: '98%', label: 'Reutilização' }
            ]
        },
        'metric-agua': {
            title: '💧 1.280 Milhões m³ · Água Economizada',
            description: 'Volume equivalente ao consumo anual de água de 8 milhões de pessoas. Economia gerada por irrigação inteligente com IoT e cobertura do solo.',
            stats: [
                { value: '8M', label: 'Pessoas' },
                { value: '60%', label: 'Redução' }
            ],
            link: '#tecnologias'
        },
        'metric-area': {
            title: '🌳 350 Mil ha · Áreas Restauradas',
            description: 'Área equivalente a 490 mil campos de futebol restaurados com vegetação nativa, corredores ecológicos e sistemas agroflorestais.',
            stats: [
                { value: '490k', label: 'Campos futebol' },
                { value: '+18%', label: 'ao ano' }
            ],
            link: '#impacto'
        },
        'metric-produtividade': {
            title: '📈 +42% · Aumento de Produtividade',
            description: 'Aumento médio de produtividade nas fazendas que adotaram nossas práticas regenerativas. Em algumas culturas, o aumento chega a 85%.',
            stats: [
                { value: '42%', label: 'Média' },
                { value: '85%', label: 'Máximo' }
            ],
            link: '#cases'
        },
        'metric-defensivos': {
            title: '🐛 -67% · Menos Defensivos',
            description: 'Redução drástica no uso de defensivos químicos graças ao controle biológico, rotação de culturas e manejo integrado de pragas.',
            stats: [
                { value: '-67%', label: 'Químicos' },
                { value: '+100%', label: 'Biológicos' }
            ]
        },
        'metric-carbono': {
            title: '☁️ 1.250 Mil t · CO₂ Sequestrado',
            description: 'Carbono capturado no solo graças ao plantio direto, compostagem e sistemas agroflorestais. Equivalente a tirar 270 mil carros das ruas.',
            stats: [
                { value: '270k', label: 'Carros' },
                { value: '+31%', label: 'ao ano' }
            ]
        },
        'metric-fazendas': {
            title: '🏡 580 Fazendas · Certificadas',
            description: 'Propriedades que receberam o Selo AgroForte de Sustentabilidade, atestando conformidade com nossos rigorosos padrões ESG.',
            stats: [
                { value: '580', label: 'Certificadas' },
                { value: '+45%', label: 'em 2025' }
            ]
        },
        'section-jogo': {
            title: '🎮 Jogo da Memória Sustentável',
            description: 'Aprenda sobre agricultura sustentável de forma divertida! Encontre os pares e descubra curiosidades sobre cada ícone do agro regenerativo.',
            stats: [
                { value: '4', label: 'Pares' },
                { value: '9', label: 'Cartas' }
            ]
        },
        'card-semente': {
            title: '🌱 Semente da Sustentabilidade',
            description: 'A semente simboliza o início de tudo. Trabalhamos com sementes crioulas e orgânicas, preservando a diversidade genética.',
            stats: [
                { value: '2k+', label: 'Variedades' },
                { value: '100%', label: 'Crioulas' }
            ]
        },
        'card-milho': {
            title: '🌽 Milho Regenerativo',
            description: 'O milho é uma das culturas mais importantes do mundo. Cultivado com práticas regenerativas, melhora o solo e produz alimentos mais nutritivos.',
            stats: [
                { value: '1Bi', label: 'Toneladas/ano' },
                { value: '+30%', label: 'Nutrientes' }
            ]
        },
        'card-agua': {
            title: '💧 Água Preservada',
            description: 'A água é o recurso mais valioso do planeta. Nossa irrigação inteligente economiza 60% de água, preservando aquíferos e nascentes.',
            stats: [
                { value: '-60%', label: 'Consumo' },
                { value: '98%', label: 'Reuso' }
            ]
        },
        'card-sol': {
            title: '☀️ Energia Solar',
            description: 'O sol é a fonte de energia mais abundante e limpa. 100% das nossas operações são alimentadas por energia solar, com zero emissões.',
            stats: [
                { value: '100%', label: 'Renovável' },
                { value: '0', label: 'Emissões' }
            ]
        }
    };
    
    // ===== ELEMENTOS DOM =====
    const DOM = {
        preloader: document.getElementById('preloader-master'),
        progressFill: document.getElementById('preloader-progress-fill'),
        percentage: document.getElementById('preloader-percentage'),
        message: document.getElementById('preloader-message'),
        particles: document.getElementById('preloader-particles'),
        
        cursorCore: document.getElementById('cursor-core'),
        cursorOuter: document.getElementById('cursor-outer'),
        cursorTrail: document.getElementById('cursor-trail'),
        cursorGlow: document.getElementById('cursor-glow'),
        cursorParticle: document.getElementById('cursor-particle'),
        
        canvas: document.getElementById('canvas-3d-background'),
        
        header: document.querySelector('.header-premium'),
        scrollProgressBar: document.getElementById('scrollProgressBar'),
        mobileMenu: document.getElementById('mobileMenu'),
        mobileMenuBtn: document.getElementById('mobileMenuBtn'),
        closeMobileMenu: document.getElementById('closeMobileMenu'),
        
        navItems: document.querySelectorAll('.nav-item'),
        sections: document.querySelectorAll('section[id]'),
        
        tabBtns: document.querySelectorAll('.tab-btn-premium'),
        tabContents: document.querySelectorAll('.tab-content-premium'),
        
        counters: document.querySelectorAll('.counter-premium'),
        
        memoryBoard: document.getElementById('memory-board'),
        pairsDisplay: document.getElementById('pairs-matched-display'),
        attemptsDisplay: document.getElementById('attempts-display'),
        bestDisplay: document.getElementById('best-score-display'),
        levelDisplay: document.getElementById('level-display'),
        progressBar: document.getElementById('game-progress-bar'),
        progressPercentage: document.getElementById('progress-percentage'),
        resetGameBtn: document.getElementById('reset-game-btn'),
        shuffleGameBtn: document.getElementById('shuffle-game-btn'),
        
        newsletterForm: document.getElementById('newsletterForm'),
        themeToggle: document.getElementById('themeToggle'),
        
        scrollIndicator: document.querySelector('.scroll-indicator-premium')
    };
    
    // ===== SISTEMA DE NOTIFICAÇÕES TOAST =====
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = 'agro-toast';
        const icons = {
            success: 'fa-check-circle',
            info: 'fa-info-circle',
            warning: 'fa-exclamation-triangle',
            achievement: 'fa-trophy'
        };
        const colors = {
            success: '#4caf50',
            info: '#8bc34a',
            warning: '#ff9800',
            achievement: '#ffd700'
        };
        toast.innerHTML = `
            <i class="fas ${icons[type] || icons.info}"></i>
            <span>${message}</span>
        `;
        toast.style.cssText = `
            position: fixed;
            top: 120px;
            right: 30px;
            background: linear-gradient(135deg, rgba(10,30,10,0.95), rgba(5,20,5,0.95));
            backdrop-filter: blur(25px);
            border: 1px solid ${colors[type] || colors.info};
            border-radius: 60px;
            padding: 16px 28px;
            color: white;
            font-weight: 600;
            font-size: 0.95rem;
            z-index: 100000;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 30px ${colors[type] || colors.info}40;
            animation: slideInRight 0.5s cubic-bezier(0.34,1.56,0.64,1);
            cursor: pointer;
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 3500);
        
        toast.addEventListener('click', () => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        });
    }
    
    // ===== SISTEMA DE CONQUISTAS =====
    const Achievements = {
        list: [
            { id: 'first_game', name: '🌱 Primeira Partida', description: 'Completar o jogo da memória pela primeira vez', icon: 'fa-seedling', condition: () => State.memoryMatched >= 4 },
            { id: 'speed_demon', name: '⚡ Relâmpago Verde', description: 'Completar o jogo em menos de 10 tentativas', icon: 'fa-bolt', condition: () => State.memoryMatched >= 4 && State.memoryAttempts <= 10 },
            { id: 'explorer', name: '🔍 Explorador', description: 'Clicar em 10 elementos interativos diferentes', icon: 'fa-compass', condition: () => clickedElements.size >= 10 },
            { id: 'nature_lover', name: '💚 Amante da Natureza', description: 'Passar o mouse sobre todos os itens da órbita', icon: 'fa-heart', condition: () => hoveredOrbits.size >= 6 },
            { id: 'scroll_master', name: '📜 Navegador', description: 'Rolar até o final da página', icon: 'fa-scroll', condition: () => window.scrollY + window.innerHeight >= document.body.scrollHeight - 100 }
        ],
        unlocked: JSON.parse(localStorage.getItem('agro_achievements') || '[]'),
        
        check() {
            this.list.forEach(achievement => {
                if (!this.unlocked.includes(achievement.id) && achievement.condition()) {
                    this.unlocked.push(achievement.id);
                    localStorage.setItem('agro_achievements', JSON.stringify(this.unlocked));
                    showToast(`🏆 Conquista: ${achievement.name}!`, 'achievement');
                }
            });
        }
    };
    
    const clickedElements = new Set();
    const hoveredOrbits = new Set();
    
    // ===== PRELOADER CINEMATOGRÁFICO =====
    function initPreloader() {
        if (!DOM.preloader) return;
        
        // Criar partículas flutuantes
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'preloader-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 5 + 2}px;
                height: ${particle.style.width};
                background: hsl(${80 + Math.random() * 40}, 70%, ${50 + Math.random() * 30}%);
                border-radius: 50%;
                box-shadow: 0 0 15px #8bc34a;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${Math.random() * 10 + 8}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
            `;
            DOM.particles.appendChild(particle);
        }
        
        const messages = [
            'Preparando o solo...',
            'Plantando as sementes...',
            'Regenerando ecossistemas...',
            'Nutrindo a terra...',
            'Conectando com a natureza...',
            'Cultivando o futuro...',
            'Colhendo sustentabilidade...',
            'Florescendo ideias...',
            'Germinando inovação...',
            'Brotando esperança...'
        ];
        
        let progress = 0;
        let messageIndex = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 4 + 1.5;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                
                setTimeout(() => {
                    DOM.preloader.style.opacity = '0';
                    DOM.preloader.style.visibility = 'hidden';
                    
                    setTimeout(() => {
                        DOM.preloader.style.display = 'none';
                        State.isLoading = false;
                        showToast('🌍 Bem-vindo à Revolução Sustentável! Explore à vontade.', 'success');
                    }, 1400);
                }, 300);
            }
            
            DOM.progressFill.style.width = progress + '%';
            DOM.percentage.textContent = Math.round(progress) + '%';
            
            const newMessageIndex = Math.floor(progress / 10);
            if (newMessageIndex < messages.length && newMessageIndex !== messageIndex) {
                messageIndex = newMessageIndex;
                DOM.message.textContent = messages[messageIndex];
            }
        }, 35);
    }
    
    // ===== CURSOR CUSTOMIZADO AVANÇADO =====
    function initCustomCursor() {
        if (State.isMobile) {
            document.body.style.cursor = 'auto';
            return;
        }
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);
        
        const hoverElements = document.querySelectorAll('a, button, .memory-card-premium, .nav-item, .tab-btn-premium, .metric-card-premium, .case-card-premium, .social-link, .orbit-item, .interactive');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
                createCursorParticles(5);
            });
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
        
        animateCursor();
    }
    
    function onMouseMove(e) {
        State.mouseX = e.clientX;
        State.mouseY = e.clientY;
        
        if (DOM.cursorCore) {
            DOM.cursorCore.style.left = State.mouseX + 'px';
            DOM.cursorCore.style.top = State.mouseY + 'px';
        }
        
        if (DOM.cursorGlow) {
            DOM.cursorGlow.style.left = State.mouseX + 'px';
            DOM.cursorGlow.style.top = State.mouseY + 'px';
        }
        
        if (State.canvasWidth && State.canvasHeight) {
            State.mouseInfluence.x = (e.clientX / State.canvasWidth) * 2 - 1;
            State.mouseInfluence.y = (e.clientY / State.canvasHeight) * 2 - 1;
        }
    }
    
    function onMouseDown() {
        document.body.classList.add('cursor-click');
        createCursorParticles(12);
    }
    
    function onMouseUp() {
        document.body.classList.remove('cursor-click');
    }
    
    function onMouseLeave() {
        if (DOM.cursorCore) DOM.cursorCore.style.opacity = '0';
        if (DOM.cursorOuter) DOM.cursorOuter.style.opacity = '0';
        if (DOM.cursorTrail) DOM.cursorTrail.style.opacity = '0';
        if (DOM.cursorGlow) DOM.cursorGlow.style.opacity = '0';
    }
    
    function onMouseEnter() {
        if (DOM.cursorCore) DOM.cursorCore.style.opacity = '1';
        if (DOM.cursorOuter) DOM.cursorOuter.style.opacity = '1';
        if (DOM.cursorTrail) DOM.cursorTrail.style.opacity = '1';
        if (DOM.cursorGlow) DOM.cursorGlow.style.opacity = '1';
    }
    
    function createCursorParticles(count) {
        if (!DOM.cursorParticle) return;
        
        for (let i = 0; i < count; i++) {
            const particle = DOM.cursorParticle.cloneNode();
            particle.style.opacity = '1';
            particle.style.left = State.mouseX + (Math.random() - 0.5) * 40 + 'px';
            particle.style.top = State.mouseY + (Math.random() - 0.5) * 40 + 'px';
            particle.style.width = (Math.random() * 6 + 2) + 'px';
            particle.style.height = particle.style.width;
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 600);
        }
    }
    
    function animateCursor() {
        if (State.isMobile) return;
        
        State.cursorOuterX += (State.mouseX - State.cursorOuterX) * CONFIG.cursorLerpFactor;
        State.cursorOuterY += (State.mouseY - State.cursorOuterY) * CONFIG.cursorLerpFactor;
        
        if (DOM.cursorOuter) {
            DOM.cursorOuter.style.left = State.cursorOuterX + 'px';
            DOM.cursorOuter.style.top = State.cursorOuterY + 'px';
        }
        
        State.cursorTrailX += (State.mouseX - State.cursorTrailX) * (CONFIG.cursorLerpFactor * 0.35);
        State.cursorTrailY += (State.mouseY - State.cursorTrailY) * (CONFIG.cursorLerpFactor * 0.35);
        
        if (DOM.cursorTrail) {
            DOM.cursorTrail.style.left = State.cursorTrailX + 'px';
            DOM.cursorTrail.style.top = State.cursorTrailY + 'px';
        }
        
        requestAnimationFrame(animateCursor);
    }
    
    // ===== CANVAS 3D BACKGROUND COM PÓLEN =====
    function initCanvas3D() {
        if (!DOM.canvas) return;
        
        const ctx = DOM.canvas.getContext('2d');
        State.canvasCtx = ctx;
        
        function resizeCanvas() {
            State.canvasWidth = window.innerWidth;
            State.canvasHeight = window.innerHeight;
            DOM.canvas.width = State.canvasWidth;
            DOM.canvas.height = State.canvasHeight;
            initParticles();
            initPollen();
            initButterflies();
        }
        
        function initParticles() {
            State.particles = [];
            for (let i = 0; i < CONFIG.particleCount; i++) {
                State.particles.push({
                    x: Math.random() * State.canvasWidth,
                    y: Math.random() * State.canvasHeight,
                    vx: (Math.random() - 0.5) * 0.25,
                    vy: (Math.random() - 0.5) * 0.25,
                    size: Math.random() * 3.5 + 1.5,
                    baseSize: Math.random() * 3.5 + 1.5,
                    color: `hsla(${80 + Math.random() * 40}, ${60 + Math.random() * 30}%, ${50 + Math.random() * 30}%, ${0.12 + Math.random() * 0.2})`,
                    angle: Math.random() * Math.PI * 2,
                    angleSpeed: (Math.random() - 0.5) * 0.02
                });
            }
        }
        
        function initPollen() {
            State.pollenParticles = [];
            for (let i = 0; i < CONFIG.pollenCount; i++) {
                State.pollenParticles.push({
                    x: Math.random() * State.canvasWidth,
                    y: Math.random() * State.canvasHeight,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4 - 0.2,
                    size: Math.random() * 2 + 1,
                    color: `hsla(${50 + Math.random() * 20}, 80%, ${70 + Math.random() * 20}%, ${0.6 + Math.random() * 0.3})`,
                    life: Math.random() * 300 + 200,
                    age: 0
                });
            }
        }
        
        function initButterflies() {
            State.butterflies = [];
            for (let i = 0; i < CONFIG.butterflyCount; i++) {
                State.butterflies.push({
                    x: Math.random() * State.canvasWidth,
                    y: Math.random() * State.canvasHeight,
                    vx: (Math.random() - 0.5) * 0.8,
                    vy: (Math.random() - 0.5) * 0.8,
                    size: Math.random() * 8 + 6,
                    color: `hsl(${Math.random() * 60 + 30}, 80%, 60%)`,
                    wingAngle: Math.random() * Math.PI * 2,
                    wingSpeed: Math.random() * 0.1 + 0.05
                });
            }
        }
        
        function drawBackground() {
            if (!State.canvasCtx || !State.canvasWidth || !State.canvasHeight) return;
            
            const ctx = State.canvasCtx;
            
            const gradient = ctx.createRadialGradient(
                State.canvasWidth / 2 + State.mouseInfluence.x * 80,
                State.canvasHeight / 2 + State.mouseInfluence.y * 80,
                0,
                State.canvasWidth / 2,
                State.canvasHeight / 2,
                Math.max(State.canvasWidth, State.canvasHeight) / 1.3
            );
            gradient.addColorStop(0, '#030a03');
            gradient.addColorStop(0.5, '#061406');
            gradient.addColorStop(1, '#010301');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, State.canvasWidth, State.canvasHeight);
            
            // Desenhar partículas principais
            State.particles.forEach(p => {
                const dx = State.mouseX - p.x;
                const dy = State.mouseY - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 180) {
                    const force = (180 - dist) / 180;
                    p.vx -= (dx / dist) * force * 0.04;
                    p.vy -= (dy / dist) * force * 0.04;
                    p.size = p.baseSize + force * 2.5;
                } else {
                    p.size = p.baseSize;
                }
                
                p.vx += (Math.random() - 0.5) * 0.015;
                p.vy += (Math.random() - 0.5) * 0.015;
                p.vx *= 0.985;
                p.vy *= 0.985;
                p.x += p.vx;
                p.y += p.vy;
                p.angle += p.angleSpeed;
                
                if (p.x < -20) p.x = State.canvasWidth + 20;
                if (p.x > State.canvasWidth + 20) p.x = -20;
                if (p.y < -20) p.y = State.canvasHeight + 20;
                if (p.y > State.canvasHeight + 20) p.y = -20;
                
                const maxSpeed = 0.6;
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > maxSpeed) {
                    p.vx = (p.vx / speed) * maxSpeed;
                    p.vy = (p.vy / speed) * maxSpeed;
                }
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.shadowColor = '#8bc34a';
                ctx.shadowBlur = 12;
                ctx.fill();
            });
            
            ctx.shadowBlur = 0;
            ctx.lineWidth = 0.6;
            
            // Conexões
            for (let i = 0; i < State.particles.length; i++) {
                for (let j = i + 1; j < State.particles.length; j++) {
                    const p1 = State.particles[i];
                    const p2 = State.particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    
                    if (dist < CONFIG.connectionDistance) {
                        const opacity = (1 - dist / CONFIG.connectionDistance) * 0.12;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(139, 195, 74, ${opacity})`;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            
            // Desenhar pólen
            State.pollenParticles.forEach((p, index) => {
                p.age++;
                p.x += p.vx + Math.sin(p.age * 0.05) * 0.3;
                p.y += p.vy;
                
                if (p.age > p.life || p.y < -20 || p.y > State.canvasHeight + 20) {
                    State.pollenParticles[index] = {
                        x: Math.random() * State.canvasWidth,
                        y: State.canvasHeight + 20,
                        vx: (Math.random() - 0.5) * 0.4,
                        vy: -(Math.random() * 0.3 + 0.1),
                        size: Math.random() * 2 + 1,
                        color: `hsla(${50 + Math.random() * 20}, 80%, ${70 + Math.random() * 20}%, ${0.6 + Math.random() * 0.3})`,
                        life: Math.random() * 300 + 200,
                        age: 0
                    };
                }
                
                const alpha = p.age < 30 ? p.age / 30 : (p.life - p.age < 30 ? (p.life - p.age) / 30 : 1);
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha * 0.8})`);
                ctx.fill();
                
                // Brilho
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${alpha * 0.2})`);
                ctx.fill();
            });
            
            // Desenhar borboletas
            State.butterflies.forEach(b => {
                b.x += b.vx + Math.sin(Date.now() * 0.001 + b.x) * 0.5;
                b.y += b.vy + Math.cos(Date.now() * 0.0015 + b.y) * 0.5;
                b.wingAngle += b.wingSpeed;
                
                if (b.x < -30) b.x = State.canvasWidth + 30;
                if (b.x > State.canvasWidth + 30) b.x = -30;
                if (b.y < -30) b.y = State.canvasHeight + 30;
                if (b.y > State.canvasHeight + 30) b.y = -30;
                
                // Asas
                const wingFlap = Math.sin(b.wingAngle) * 0.5;
                
                ctx.save();
                ctx.translate(b.x, b.y);
                
                // Asa esquerda
                ctx.beginPath();
                ctx.ellipse(-b.size * 0.6, 0, b.size, b.size * 0.4 + wingFlap * b.size * 0.3, -0.3, 0, Math.PI * 2);
                ctx.fillStyle = b.color.replace('60%', '40%');
                ctx.fill();
                
                // Asa direita
                ctx.beginPath();
                ctx.ellipse(b.size * 0.6, 0, b.size, b.size * 0.4 + wingFlap * b.size * 0.3, 0.3, 0, Math.PI * 2);
                ctx.fillStyle = b.color.replace('60%', '40%');
                ctx.fill();
                
                // Corpo
                ctx.beginPath();
                ctx.ellipse(0, 0, b.size * 0.25, b.size * 0.5, 0, 0, Math.PI * 2);
                ctx.fillStyle = '#333';
                ctx.fill();
                
                ctx.restore();
            });
            
            requestAnimationFrame(drawBackground);
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        drawBackground();
    }
    
    // ===== AOS INIT =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 900,
            once: false,
            mirror: true,
            offset: 100,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
    }
    
    // ===== GSAP SCROLLTRIGGER =====
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        gsap.to('.globe-3d-premium', {
            scrollTrigger: {
                trigger: '.hero-masterpiece',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.5
            },
            rotateY: 360,
            rotateX: 15,
            scale: 0.7,
            opacity: 0.5,
            ease: 'none'
        });
        
        gsap.from('.metric-card-premium', {
            scrollTrigger: {
                trigger: '.metrics-grid-premium',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            y: 60,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'back.out(1.2)'
        });
        
        gsap.from('.case-card-premium', {
            scrollTrigger: {
                trigger: '.cases-grid',
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: 'play none none reverse'
            },
            y: 80,
            opacity: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out'
        });
    }
    
    // ===== JOGO DA MEMÓRIA 3D =====
    const MemoryGame = {
        icons: ['🌱', '🌽', '💧', '☀️', '🌿', '🍃'],
        deck: [],
        cards: [],
        flippedCards: [],
        matchedPairs: 0,
        attempts: 0,
        locked: false,
        level: 1,
        
        init() {
            this.loadBestScore();
            this.createDeck();
            this.render();
            this.attachEvents();
        },
        
        loadBestScore() {
            const saved = localStorage.getItem('agroforte_memory_best_v3');
            State.memoryBest = saved ? parseInt(saved) : null;
            if (DOM.bestDisplay) {
                DOM.bestDisplay.textContent = State.memoryBest || '—';
            }
        },
        
        saveBestScore(score) {
            if (!State.memoryBest || score < State.memoryBest) {
                State.memoryBest = score;
                localStorage.setItem('agroforte_memory_best_v3', score);
                if (DOM.bestDisplay) DOM.bestDisplay.textContent = score;
                return true;
            }
            return false;
        },
        
        createDeck() {
            const pairCount = Math.min(4 + Math.floor((this.level - 1) / 2), this.icons.length);
            const selectedIcons = this.icons.slice(0, pairCount);
            this.deck = [...selectedIcons, ...selectedIcons];
            
            while (this.deck.length < 9) {
                this.deck.push('🌾');
            }
            
            this.shuffle();
        },
        
        shuffle() {
            for (let i = this.deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
            }
            
            this.cards = this.deck.map((value, index) => ({
                id: index,
                value: value,
                matched: false,
                flipped: false,
                element: null
            }));
        },
        
        render() {
            if (!DOM.memoryBoard) return;
            
            DOM.memoryBoard.innerHTML = '';
            
            this.cards.forEach((card, index) => {
                const cardEl = document.createElement('div');
                cardEl.className = 'memory-card-premium';
                if (card.matched) cardEl.classList.add('matched');
                if (card.flipped) cardEl.classList.add('flipped');
                
                const content = document.createElement('div');
                content.className = 'card-content';
                content.textContent = card.value;
                
                cardEl.appendChild(content);
                cardEl.dataset.index = index;
                
                cardEl.addEventListener('click', (e) => this.handleClick(e, index));
                
                // Efeito 3D hover
                cardEl.addEventListener('mousemove', (e) => {
                    if (card.matched || card.flipped) return;
                    const rect = cardEl.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 10;
                    const rotateY = (centerX - x) / 10;
                    cardEl.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.98)`;
                });
                
                cardEl.addEventListener('mouseleave', () => {
                    if (!card.matched && !card.flipped) {
                        cardEl.style.transform = '';
                    }
                });
                
                DOM.memoryBoard.appendChild(cardEl);
                card.element = cardEl;
            });
            
            this.updateStats();
            this.updateProgress();
        },
        
        handleClick(e, index) {
            if (this.locked) return;
            
            const card = this.cards[index];
            if (card.matched || card.flipped) return;
            if (this.flippedCards.length === 2) return;
            
            // Feedback tátil
            const cardEl = e.currentTarget;
            cardEl.style.transform = 'scale(0.92)';
            setTimeout(() => {
                if (cardEl && !card.matched) cardEl.style.transform = '';
            }, 150);
            
            card.flipped = true;
            this.flippedCards.push(index);
            this.render();
            
            if (this.flippedCards.length === 2) {
                this.attempts++;
                this.updateStats();
                this.checkMatch();
            }
        },
        
        checkMatch() {
            this.locked = true;
            
            const [idx1, idx2] = this.flippedCards;
            const card1 = this.cards[idx1];
            const card2 = this.cards[idx2];
            
            const isMatch = card1.value === card2.value && card1.value !== '🌾';
            
            if (isMatch) {
                card1.matched = true;
                card2.matched = true;
                this.matchedPairs++;
                this.flippedCards = [];
                this.locked = false;
                this.render();
                
                this.celebrateMatch(card1.element, card2.element);
                
                const totalPairs = Math.floor(this.deck.filter(c => c !== '🌾').length / 2);
                
                if (this.matchedPairs === totalPairs) {
                    const isNewRecord = this.saveBestScore(this.attempts);
                    
                    setTimeout(() => {
                        if (isNewRecord) {
                            showToast(`🏆 NOVO RECORDE! ${this.attempts} tentativas!`, 'achievement');
                        } else {
                            showToast(`🎉 Parabéns! Completou em ${this.attempts} tentativas!`, 'success');
                        }
                        
                        if (this.level < 3) {
                            this.level++;
                            if (DOM.levelDisplay) DOM.levelDisplay.textContent = this.level;
                            showToast(`⬆️ Avançou para o Nível ${this.level}!`, 'info');
                        }
                        
                        Achievements.check();
                    }, 400);
                }
            } else {
                setTimeout(() => {
                    card1.flipped = false;
                    card2.flipped = false;
                    this.flippedCards = [];
                    this.locked = false;
                    this.render();
                }, 700);
            }
        },
        
        celebrateMatch(el1, el2) {
            [el1, el2].forEach(el => {
                for (let i = 0; i < 8; i++) {
                    const particle = document.createElement('div');
                    particle.style.cssText = `
                        position: absolute;
                        width: 8px;
                        height: 8px;
                        background: #cddc39;
                        border-radius: 50%;
                        left: 50%;
                        top: 50%;
                        pointer-events: none;
                        z-index: 100;
                        box-shadow: 0 0 15px #8bc34a;
                        animation: matchParticle 0.7s ease-out forwards;
                        transform: translate(-50%, -50%) rotate(${i * 45}deg) translateY(-25px);
                    `;
                    el.appendChild(particle);
                    setTimeout(() => particle.remove(), 700);
                }
            });
        },
        
        updateStats() {
            const totalPairs = Math.floor(this.deck.filter(c => c !== '🌾').length / 2);
            if (DOM.pairsDisplay) DOM.pairsDisplay.textContent = `${this.matchedPairs}/${totalPairs}`;
            if (DOM.attemptsDisplay) DOM.attemptsDisplay.textContent = this.attempts;
        },
        
        updateProgress() {
            const totalPairs = Math.floor(this.deck.filter(c => c !== '🌾').length / 2);
            const progress = totalPairs > 0 ? (this.matchedPairs / totalPairs) * 100 : 0;
            if (DOM.progressBar) DOM.progressBar.style.width = progress + '%';
            if (DOM.progressPercentage) DOM.progressPercentage.textContent = Math.round(progress) + '%';
        },
        
        reset() {
            this.matchedPairs = 0;
            this.attempts = 0;
            this.flippedCards = [];
            this.locked = false;
            this.level = 1;
            if (DOM.levelDisplay) DOM.levelDisplay.textContent = '1';
            this.createDeck();
            this.render();
            showToast('🔄 Jogo reiniciado! Boa sorte!', 'info');
        },
        
        shuffleOnly() {
            if (this.locked) return;
            this.flippedCards = [];
            this.locked = false;
            this.cards.forEach(c => { if (!c.matched) c.flipped = false; });
            
            const unmatched = this.cards.filter(c => !c.matched);
            for (let i = unmatched.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [unmatched[i].value, unmatched[j].value] = [unmatched[j].value, unmatched[i].value];
            }
            
            this.render();
            showToast('🃏 Cartas embaralhadas!', 'info');
        },
        
        attachEvents() {
            if (DOM.resetGameBtn) {
                DOM.resetGameBtn.addEventListener('click', () => this.reset());
            }
            if (DOM.shuffleGameBtn) {
                DOM.shuffleGameBtn.addEventListener('click', () => this.shuffleOnly());
            }
        }
    };
    
    // ===== TABS SISTEMA =====
    function initTabs() {
        DOM.tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.getAttribute('data-tab');
                
                DOM.tabBtns.forEach(b => b.classList.remove('active'));
                DOM.tabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                const target = document.getElementById(tabId);
                if (target) {
                    target.classList.add('active');
                    State.currentTab = tabId;
                }
            });
        });
    }
    
    // ===== CONTADORES ANIMADOS =====
    function initCounters() {
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.textContent.replace(/[0-9.-]/g, '').trim();
            let current = 0;
            const increment = target / CONFIG.counterSpeed;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.textContent = target + (suffix ? ' ' + suffix : '');
                    clearInterval(timer);
                } else {
                    counter.textContent = Math.round(current) + (suffix ? ' ' + suffix : '');
                }
            }, 20);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    if (!counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        animateCounter(counter);
                    }
                }
            });
        }, { threshold: 0.3 });
        
        DOM.counters.forEach(counter => observer.observe(counter));
    }
    
    // ===== INTERATIVIDADE COM ELEMENTOS =====
    function initInteractivity() {
        document.querySelectorAll('.interactive, [data-info]').forEach(el => {
            const infoKey = el.getAttribute('data-info');
            if (!infoKey) return;
            
            el.addEventListener('click', (e) => {
                e.stopPropagation();
                clickedElements.add(infoKey);
                
                const info = AGRO_KNOWLEDGE[infoKey];
                if (!info) return;
                
                // Não abrir modal se for link de navegação
                if (el.tagName === 'A' && el.getAttribute('href')?.startsWith('#') && el.getAttribute('href') !== '#') {
                    return;
                }
                if (el.closest('#memory-board')) return;
                if (el.tagName === 'BUTTON' && el.type === 'submit') return;
                if (el.tagName === 'INPUT') return;
                
                showToast(`${info.title} · ${info.description.substring(0, 80)}...`, 'info');
                Achievements.check();
            });
            
            // Rastrear hover em órbitas
            if (el.closest('.floating-orbit')) {
                el.addEventListener('mouseenter', () => {
                    hoveredOrbits.add(infoKey);
                    Achievements.check();
                });
            }
        });
    }
    
    // ===== NAVEGAÇÃO SUAVE =====
    function initNavigation() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    if (DOM.mobileMenu) {
                        DOM.mobileMenu.classList.remove('active');
                    }
                }
            });
        });
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            
            if (DOM.scrollProgressBar) {
                DOM.scrollProgressBar.style.width = scrollPercent + '%';
            }
            
            let current = '';
            DOM.sections.forEach(section => {
                const sectionTop = section.offsetTop - 200;
                const sectionBottom = sectionTop + section.offsetHeight;
                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    current = section.getAttribute('id');
                }
            });
            
            DOM.navItems.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href && href.substring(1) === current) {
                    link.classList.add('active');
                }
            });
            
            if (DOM.header) {
                if (scrollY > 50) {
                    DOM.header.style.background = 'rgba(3, 12, 3, 0.5)';
                } else {
                    DOM.header.style.background = 'rgba(3, 12, 3, 0.3)';
                }
            }
            
            if (DOM.scrollIndicator && scrollY > 150) {
                DOM.scrollIndicator.style.opacity = '0';
                DOM.scrollIndicator.style.pointerEvents = 'none';
            } else if (DOM.scrollIndicator) {
                DOM.scrollIndicator.style.opacity = '1';
            }
            
            Achievements.check();
        });
    }
    
    // ===== MENU MOBILE =====
    function initMobileMenu() {
        if (DOM.mobileMenuBtn) {
            DOM.mobileMenuBtn.addEventListener('click', () => {
                DOM.mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        if (DOM.closeMobileMenu) {
            DOM.closeMobileMenu.addEventListener('click', () => {
                DOM.mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        const backdrop = document.querySelector('.mobile-menu-backdrop');
        if (backdrop) {
            backdrop.addEventListener('click', () => {
                DOM.mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        document.querySelectorAll('.mobile-nav a').forEach(link => {
            link.addEventListener('click', () => {
                DOM.mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // ===== NEWSLETTER FORM =====
    function initNewsletter() {
        if (DOM.newsletterForm) {
            DOM.newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = DOM.newsletterForm.querySelector('input[type="email"]')?.value || 'seu e-mail';
                showToast(`🌱 Obrigado, ${email}! Em breve você receberá nossas novidades.`, 'success');
                DOM.newsletterForm.reset();
            });
        }
    }
    
    // ===== THEME TOGGLE (EASTER EGG) =====
    function initThemeToggle() {
        if (DOM.themeToggle) {
            let clickCount = 0;
            DOM.themeToggle.addEventListener('click', () => {
                clickCount++;
                DOM.themeToggle.style.transform = `rotate(${clickCount * 360}deg)`;
                
                if (clickCount === 5) {
                    showToast('🌍 Modo Natureza Suprema ativado! A terra agradece! 🌍', 'achievement');
                    document.body.style.animation = 'ambientBreathing 3s ease-in-out';
                    clickCount = 0;
                }
            });
        }
    }
    
    // ===== EFEITO PARALLAX NO GLOBO =====
    function initParallax() {
        const globe = document.querySelector('.globe-3d-premium');
        const orbitItems = document.querySelectorAll('.orbit-item');
        
        if (globe) {
            document.addEventListener('mousemove', (e) => {
                const moveX = (e.clientX - window.innerWidth / 2) * 0.003;
                const moveY = (e.clientY - window.innerHeight / 2) * 0.003;
                globe.style.transform = `translateY(0) rotateY(${moveX}deg) rotateX(${-moveY}deg)`;
            });
        }
        
        orbitItems.forEach(item => {
            const speed = item.getAttribute('data-speed') || 1;
            item.style.animationDuration = `${4 / speed}s`;
        });
    }
    
    // ===== EFEITOS DE HOVER NOS CARDS =====
    function initCardEffects() {
        const cards = document.querySelectorAll('.metric-card-premium, .case-card-premium');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
    
    // ===== INICIALIZAÇÃO PRINCIPAL =====
    function init() {
        console.log('%c🌍 AGRO FORTE · REVOLUÇÃO SUSTENTÁVEL', 'font-size: 24px; font-weight: bold; color: #8bc34a; text-shadow: 0 0 20px #4caf50;');
        console.log('%c✨ Interface 10X carregada! Partículas de pólen, borboletas, conquistas e muito mais!', 'font-size: 14px; color: #a5d6a7;');
        console.log('%c📚 ' + Object.keys(AGRO_KNOWLEDGE).length + ' tópicos de conhecimento agro disponíveis.', 'font-size: 12px; color: #81c784;');
        
        initPreloader();
        
        if (!State.isMobile) {
            initCustomCursor();
        } else {
            document.body.style.cursor = 'auto';
        }
        
        initCanvas3D();
        initTabs();
        initCounters();
        initNavigation();
        initMobileMenu();
        initNewsletter();
        initThemeToggle();
        initParallax();
        initCardEffects();
        initInteractivity();
        
        MemoryGame.init();
        
        // Fallback do preloader
        setTimeout(() => {
            if (State.isLoading && DOM.preloader) {
                DOM.preloader.style.opacity = '0';
                DOM.preloader.style.visibility = 'hidden';
                setTimeout(() => {
                    DOM.preloader.style.display = 'none';
                    State.isLoading = false;
                }, 1000);
            }
        }, 5000);
        
        // Verificar conquistas periodicamente
        setInterval(() => Achievements.check(), 5000);
    }
    
    // Iniciar quando DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Adicionar estilos de animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { opacity: 0; transform: translateX(100px); }
            to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideOutRight {
            from { opacity: 1; transform: translateX(0); }
            to { opacity: 0; transform: translateX(100px); }
        }
        @keyframes matchParticle {
            0% { opacity: 1; transform: translate(-50%, -50%) rotate(0deg) translateY(0); }
            100% { opacity: 0; transform: translate(-50%, -50%) rotate(0deg) translateY(-50px); }
        }
    `;
    document.head.appendChild(style);
    
})();
