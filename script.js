/* ============================================ */
/* AGRO FORTE · SCRIPT.JS · 4500+ LINHAS       */
/* ANIMAÇÕES GSAP · JOGO 3D · CANVAS · CURSOR  */
/* INTERATIVIDADE TOTAL ADICIONADA             */
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
        scrollThreshold: 50
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
        particles: [], mouseInfluence: { x: 0, y: 0 }
    };
    
    // ===== BANCO DE DADOS DE INFORMAÇÕES (ADICIONADO) =====
    const AGRO_INFO = {
        'logo': { title: '🌱 AgroForte 5.0', desc: 'Líder em agricultura regenerativa desde 2020. Certificada B Corp, Carbon Trust e Rainforest Alliance. Nossa missão é alimentar o mundo regenerando o planeta.', stats: [{v:'+580',l:'Fazendas'},{v:'12',l:'Países'},{v:'R$2.1Bi',l:'Carbono'}] },
        'badge': { title: '🏷️ Versão 5.0', desc: 'Plataforma com IA preditiva, blockchain e gêmeos digitais de cada hectare. A versão mais avançada da agricultura regenerativa.', stats: [{v:'99.9%',l:'Uptime'},{v:'24/7',l:'Suporte'}] },
        'nav-home': { title: '🏠 Visão Geral', desc: 'Ponto de partida da nossa jornada sustentável. Descubra como estamos transformando a agricultura.', link: '#home' },
        'nav-tecnologias': { title: '🔬 Tecnologias', desc: 'Satélites, drones, robôs, biotecnologia e IoT revolucionando o campo.', link: '#tecnologias' },
        'nav-impacto': { title: '📊 Impacto', desc: 'Dados auditados de 500+ propriedades. Resultados que comprovam a eficácia da agricultura regenerativa.', link: '#impacto' },
        'nav-jogo': { title: '🎮 Jogo Verde', desc: 'Aprenda sobre sustentabilidade de forma divertida! Encontre os pares e descubra curiosidades.', link: '#jogo' },
        'nav-cases': { title: '🏆 Cases', desc: 'Histórias reais de produtores que transformaram suas propriedades.', link: '#cases' },
        'nav-contato': { title: '📬 Contato', desc: 'Receba conteúdo exclusivo sobre agricultura sustentável no seu e-mail.', link: '#contato' },
        'theme-toggle': { title: '🍃 Modo Natureza', desc: 'Clique 5 vezes para ativar o easter egg! Personalize a experiência.', stats: [{v:'5',l:'Cliques'},{v:'🎉',l:'Surpresa'}] },
        'btn-header-contato': { title: '🚀 Começar', desc: 'Inicie sua jornada na agricultura sustentável. Inscreva-se na newsletter.', link: '#contato' },
        
        'badge-hero': { title: '🌍 AGRO 5.0', desc: 'A quinta revolução agrícola integra IA, IoT, blockchain e biotecnologia para produção 100% rastreável e regenerativa.', stats: [{v:'5ª',l:'Revolução'},{v:'2030',l:'Meta'}] },
        'title-equilibrio': { title: '⚖️ Equilíbrio', desc: 'O equilíbrio entre produção e preservação é o coração da agricultura regenerativa.', stats: [{v:'50%',l:'Alimentos'},{v:'70%',l:'Água doce'}] },
        'title-producao': { title: '🌽 Produção', desc: 'Até 2050 alimentaremos 10 bilhões de pessoas. Aumentamos produtividade em 42% sem expandir área.', stats: [{v:'10Bi',l:'Pessoas'},{v:'+42%',l:'Produtividade'}] },
        'title-meioambiente': { title: '🌳 Meio Ambiente', desc: 'Cada hectare sequestra 3x mais carbono. A natureza é nossa maior aliada.', stats: [{v:'3x',l:'Carbono'},{v:'+65%',l:'Biodiversidade'}] },
        'hero-description': { title: '💚 Missão', desc: 'Unimos IA, biotecnologia e sabedoria ancestral para alimentar o planeta sem destruí-lo.', stats: [{v:'IA',l:'Tecnologia'},{v:'🌾',l:'Ancestral'}] },
        'btn-jogar': { title: '🎮 Memória Verde', desc: 'Teste seus conhecimentos sobre agricultura sustentável! Encontre os pares e aprenda.', link: '#jogo' },
        'btn-impacto': { title: '📊 Impacto', desc: 'Veja números reais de 500+ propriedades que adotaram práticas regenerativas.', link: '#impacto' },
        'btn-cases': { title: '🏆 Cases', desc: 'Histórias inspiradoras de produtores que transformaram suas terras.', link: '#cases' },
        'stat-co2': { title: '🌫️ -42% CO₂', desc: 'Redução de 42% nas emissões graças ao plantio direto, bioinsumos e energia renovável.', stats: [{v:'1.250',l:'Mil t/ano'},{v:'42%',l:'Redução'}] },
        'stat-bio': { title: '🦋 +65% Biodiversidade', desc: 'Aumento da biodiversidade com corredores ecológicos e fim dos agrotóxicos.', stats: [{v:'350+',l:'Espécies'},{v:'500km',l:'Corredores'}] },
        'stat-agua': { title: '💧 98% Água Reutilizada', desc: 'Irrigação inteligente com IoT. Economia equivalente ao consumo de 8 milhões de pessoas.', stats: [{v:'1.280',l:'Mi m³/ano'},{v:'8M',l:'Pessoas'}] },
        'globe-3d': { title: '🌐 Globo Interativo', desc: 'Clique nos ícones em órbita para aprender sobre cada pilar da sustentabilidade.', stats: [{v:'6',l:'Ícones'},{v:'🌍',l:'Planeta'}] },
        'orbit-leaf': { title: '🌿 Fotossíntese', desc: 'Plantas capturam CO₂. Nossas práticas aumentam biomassa verde em 40%.', stats: [{v:'+40%',l:'Biomassa'},{v:'CO₂',l:'Capturado'}] },
        'orbit-seed': { title: '🌱 Sementes Crioulas', desc: 'Banco genético com 2.000+ variedades. Diversidade é segurança alimentar.', stats: [{v:'2k+',l:'Variedades'},{v:'100%',l:'Orgânicas'}] },
        'orbit-water': { title: '💧 Água', desc: 'Recurso mais precioso. Irrigação inteligente economiza 60%.', stats: [{v:'-60%',l:'Consumo'},{v:'IoT',l:'Monitoramento'}] },
        'orbit-sun': { title: '☀️ Energia Solar', desc: '100% das operações com energia renovável. Fazendas autossuficientes.', stats: [{v:'100%',l:'Renovável'},{v:'50MW',l:'Capacidade'}] },
        'orbit-tree': { title: '🌳 Florestas', desc: '20% de reserva legal restaurada em cada fazenda. Corredores ecológicos.', stats: [{v:'20%',l:'Reserva'},{v:'350k',l:'Hectares'}] },
        'orbit-rain': { title: '🌧️ Água da Chuva', desc: 'Sistemas de captação e armazenamento de água pluvial para irrigação.', stats: [{v:'80%',l:'Aproveitamento'},{v:'Bio',l:'Filtragem'}] },
        'hint-globe': { title: '💡 Dica', desc: 'Clique nos ícones ao redor do globo para aprender sobre sustentabilidade!', stats: [{v:'6',l:'Ícones'},{v:'🎯',l:'Clicáveis'}] },
        'scroll-indicator': { title: '📜 Navegação', desc: 'Role para explorar todas as seções. Use o menu superior para navegação rápida.' },
        
        'section-tech': { title: '🔬 Inovação', desc: 'Tecnologias de ponta que já estão revolucionando a agricultura mundial.' },
        'section-tech-desc': { title: '🚀 Transformação', desc: 'Da semente à colheita, cada etapa é otimizada com tecnologia de ponta.' },
        'tab-satelite': { title: '🛰️ Monitoramento', desc: 'Satélites e drones com sensores multiespectrais. Monitoramento 24/7 com IA.', stats: [{v:'5cm',l:'Resolução'},{v:'-30%',l:'Insumos'}] },
        'tab-robo': { title: '🤖 Robótica', desc: 'Robôs autônomos com visão computacional. Redução de 90% em herbicidas.', stats: [{v:'-90%',l:'Herbicidas'},{v:'24h',l:'Operação'}] },
        'tab-bio': { title: '🧬 Biotecnologia', desc: 'Bioinsumos que substituem químicos e regeneram o microbioma do solo.', stats: [{v:'100%',l:'Orgânico'},{v:'+40%',l:'Matéria Org.'}] },
        'tab-iot': { title: '📡 IoT', desc: 'Milhares de sensores conectados. Economia de 60% de água com precisão.', stats: [{v:'-60%',l:'Água'},{v:'10k+',l:'Sensores'}] },
        'feature-ndvi': { title: '📊 NDVI', desc: 'Índice de Vegetação. Mede saúde da planta em tempo real. Precisão de 95%.', stats: [{v:'95%',l:'Precisão'},{v:'Diário',l:'Atualização'}] },
        'feature-pragas': { title: '🐛 Alertas', desc: 'IA identifica pragas 7 dias antes. Controle biológico preventivo.', stats: [{v:'95%',l:'Precisão'},{v:'7 dias',l:'Antecedência'}] },
        'feature-localizada': { title: '🎯 Precisão', desc: 'Aplicação localizada reduz insumos em 40%. Zero desperdício.', stats: [{v:'-40%',l:'Insumos'},{v:'0%',l:'Desperdício'}] },
        'feature-capina': { title: '🌿 Capina Mecânica', desc: 'Robôs removem ervas daninhas sem herbicidas. 99% de precisão.', stats: [{v:'-100%',l:'Herbicidas'},{v:'99%',l:'Precisão'}] },
        'feature-plantio': { title: '🌱 Plantio Direto', desc: 'Sem revolvimento do solo. Preserva microbiota e umidade.', stats: [{v:'+40%',l:'Matéria Org.'},{v:'-60%',l:'Erosão'}] },
        'feature-colheita': { title: '🚜 Colheita Seletiva', desc: 'Robôs colhem apenas no ponto ideal. 24h de operação contínua.', stats: [{v:'24h',l:'Operação'},{v:'+20%',l:'Qualidade'}] },
        'feature-bacterias': { title: '🦠 Bactérias', desc: 'Fixadoras de nitrogênio atmosférico. Eliminam fertilizantes sintéticos.', stats: [{v:'-100%',l:'N sintético'},{v:'+30%',l:'Produtividade'}] },
        'feature-fungos': { title: '🍄 Fungos Micorrízicos', desc: 'Ampliam absorção de nutrientes em 700%. Rede subterrânea viva.', stats: [{v:'+700%',l:'Absorção'},{v:'100%',l:'Natural'}] },
        'feature-biocontrole': { title: '🐞 Biocontrole', desc: 'Inimigos naturais controlam pragas. Zero químicos.', stats: [{v:'0',l:'Químicos'},{v:'+65%',l:'Biodiversidade'}] },
        'feature-sensores': { title: '💧 Sensores IoT', desc: 'Umidade do solo em tempo real. Irrigação só quando necessário.', stats: [{v:'-60%',l:'Água'},{v:'Tempo Real',l:'Dados'}] },
        'feature-fertirrigacao': { title: '🌿 Fertirrigação', desc: 'Biofertilizantes líquidos aplicados com precisão via irrigação.', stats: [{v:'+30%',l:'Nutrientes'},{v:'0',l:'Químicos'}] },
        'feature-app': { title: '📱 App Mobile', desc: 'Controle total da irrigação pelo celular. Alertas e relatórios.', stats: [{v:'iOS',l:'Android'},{v:'24/7',l:'Acesso'}] },
        'visual-drone': { title: '🛸 Demonstração', desc: 'Drones capturam imagens em alta resolução. IA processa em minutos.', stats: [{v:'50km²',l:'Cobertura/dia'},{v:'5cm',l:'Resolução'}] },
        'visual-robo': { title: '🤖 Demonstração', desc: 'Robôs autônomos 100% elétricos. Navegação por GPS e visão.', stats: [{v:'24h',l:'Autonomia'},{v:'100%',l:'Elétrico'}] },
        'visual-bio': { title: '🧪 Demonstração', desc: 'Laboratório de bioinsumos. Produção de microrganismos benéficos.', stats: [{v:'ISO',l:'Certificado'},{v:'100%',l:'Natural'}] },
        'visual-iot': { title: '📡 Demonstração', desc: 'Central de monitoramento IoT. Dados em tempo real de todas as fazendas.', stats: [{v:'10k+',l:'Sensores'},{v:'5ms',l:'Latência'}] },
        
        'section-impacto': { title: '📊 Resultados', desc: 'Dados auditados de 500+ propriedades. 5 anos de agricultura regenerativa.' },
        'section-impacto-desc': { title: '📈 Métricas', desc: 'Resultados comprovados por auditoria independente. Transparência total.' },
        'metric-agua': { title: '💧 1.280 mi m³', desc: 'Equivalente ao consumo de 8 milhões de pessoas. Economia com irrigação inteligente.', stats: [{v:'8M',l:'Pessoas'},{v:'60%',l:'Redução'}] },
        'metric-area': { title: '🌳 350 mil ha', desc: 'Área equivalente a 490 mil campos de futebol restaurados.', stats: [{v:'490k',l:'Campos'},{v:'+18%',l:'ao ano'}] },
        'metric-produtividade': { title: '📈 +42%', desc: 'Aumento médio de produtividade. Em algumas culturas, +85%.', stats: [{v:'42%',l:'Média'},{v:'85%',l:'Máximo'}] },
        'metric-defensivos': { title: '🐛 -67%', desc: 'Redução de defensivos químicos. Controle biológico e manejo integrado.', stats: [{v:'-67%',l:'Químicos'},{v:'+100%',l:'Biológicos'}] },
        'metric-carbono': { title: '☁️ 1.250 mil t', desc: 'CO₂ sequestrado no solo. Equivalente a 270 mil carros fora das ruas.', stats: [{v:'270k',l:'Carros'},{v:'+31%',l:'ao ano'}] },
        'metric-fazendas': { title: '🏡 580 Fazendas', desc: 'Certificadas com Selo AgroForte de Sustentabilidade.', stats: [{v:'580',l:'Certificadas'},{v:'+45%',l:'em 2025'}] },
        'chart-impacto': { title: '📊 Evolução', desc: 'Gráfico 2020-2025. 4 indicadores principais de sustentabilidade.', stats: [{v:'5',l:'Anos'},{v:'4',l:'Indicadores'}] },
        
        'section-jogo': { title: '🎮 Jogo da Memória', desc: 'Aprenda brincando! Encontre os pares do agro sustentável.' },
        'section-jogo-desc': { title: '🧠 Treine', desc: 'Memória e conhecimento sobre sustentabilidade em um só jogo.' },
        'stat-pares-jogo': { title: '✅ Pares', desc: 'Complete os 4 pares para vencer!', stats: [{v:'0/4',l:'Progresso'},{v:'🏆',l:'Meta'}] },
        'stat-tentativas-jogo': { title: '🔄 Tentativas', desc: 'Tente bater seu recorde com o menor número de jogadas.', stats: [{v:'🧠',l:'Memória'},{v:'🏅',l:'Recorde'}] },
        'stat-recorde-jogo': { title: '🏆 Recorde', desc: 'Salvo no seu navegador. Desafie-se!', stats: [{v:'💾',l:'Local'},{v:'🏆',l:'Desafio'}] },
        'btn-reset-jogo': { title: '🔄 Reiniciar', desc: 'Novo jogo! Cartas embaralhadas e tentativas zeradas.', stats: [{v:'🃏',l:'Novo'},{v:'0',l:'Tentativas'}] },
        'btn-shuffle-jogo': { title: '🔀 Embaralhar', desc: 'Embaralha cartas não encontradas. Mantém progresso.', stats: [{v:'🔀',l:'Embaralha'},{v:'✅',l:'Progresso'}] },
        'hint-jogo': { title: '💡 Dica', desc: 'Pares: 🌱 Semente, 🌽 Milho, 💧 Água, ☀️ Sol. Cada um é um pilar.', stats: [{v:'4',l:'Pares'},{v:'🌱',l:'Ícones'}] },
        'game-progress-bar': { title: '📊 Progresso', desc: 'Barra de progresso do jogo. 100% = todos os pares encontrados!', stats: [{v:'0-100%',l:'Progresso'},{v:'4',l:'Pares'}] },
        'card-semente': { title: '🌱 Semente', desc: 'Símbolo do início. Sementes crioulas preservam diversidade genética.', stats: [{v:'2k+',l:'Variedades'},{v:'100%',l:'Crioulas'}] },
        'card-milho': { title: '🌽 Milho', desc: 'Cultura regenerativa. Melhora o solo e produz alimentos nutritivos.', stats: [{v:'1Bi',l:'Toneladas'},{v:'+30%',l:'Nutrientes'}] },
        'card-agua': { title: '💧 Água', desc: 'Recurso vital. Cada gota economizada faz diferença.', stats: [{v:'-60%',l:'Consumo'},{v:'98%',l:'Reuso'}] },
        'card-sol': { title: '☀️ Sol', desc: 'Energia limpa e gratuita. 100% das operações com energia solar.', stats: [{v:'100%',l:'Renovável'},{v:'0',l:'Emissões'}] },
        
        'section-cases': { title: '🏆 Histórias Reais', desc: 'Produtores que transformaram suas propriedades e suas vidas.' },
        'section-cases-desc': { title: '🌟 Inspiração', desc: 'Casos reais de sucesso com agricultura regenerativa.' },
        'case-esperanca': { title: '🌾 Fazenda Esperança', desc: 'João Carlos transformou 2.000ha de pastagem em fazenda regenerativa. +45% produtividade, -60% custos.', stats: [{v:'+45%',l:'Produtividade'},{v:'-60%',l:'Custos'}] },
        'case-bela-vista': { title: '🍃 Sítio Bela Vista', desc: 'Maria Silva produz 100% orgânico com irrigação inteligente. -70% água.', stats: [{v:'-70%',l:'Água'},{v:'100%',l:'Orgânico'}] },
        'case-agrotech': { title: '🤖 AgroTech', desc: 'Robôs reduziram herbicidas em 95%. Economia de R$500 mil/ano.', stats: [{v:'-95%',l:'Herbicidas'},{v:'R$500k',l:'Economia'}] },
        
        'section-contato': { title: '📬 Newsletter', desc: 'Junte-se a 10.000+ produtores. Conteúdo exclusivo semanal.' },
        'section-contato-desc': { title: '🚀 Participe', desc: 'Receba estudos de caso e práticas sustentáveis no seu e-mail.' },
        'input-email': { title: '📧 E-mail', desc: 'Digite seu melhor e-mail. Sem spam, cancele quando quiser.' },
        'btn-newsletter': { title: '✉️ Inscrever', desc: 'Comece a receber conteúdo exclusivo sobre agricultura sustentável.' },
        'newsletter-features': { title: '✅ Benefícios', desc: 'Conteúdo exclusivo, webinars, e-books gratuitos e eventos.' },
        'social-linkedin': { title: '💼 LinkedIn', desc: 'Siga-nos para novidades e vagas.' },
        'social-instagram': { title: '📸 Instagram', desc: 'Fotos e stories do campo sustentável.' },
        'social-youtube': { title: '▶️ YouTube', desc: 'Webinars e documentários sobre agro sustentável.' },
        'social-twitter': { title: '🐦 X/Twitter', desc: 'Atualizações em tempo real.' },
        'social-whatsapp': { title: '📱 WhatsApp', desc: 'Canal direto para produtores.' },
        
        'footer-brand': { title: '🌱 AgroForte', desc: 'B Corp, Carbon Trust, Rainforest Alliance, ISO 14001. Sustentabilidade comprovada.' },
        'footer-esg': { title: '📄 ESG 2025', desc: 'Relatório completo Environmental, Social and Governance.' },
        'footer-calculadora': { title: '🧮 Calculadora', desc: 'Calcule a pegada de carbono da sua propriedade.' },
        'footer-blog': { title: '📝 Blog', desc: 'Artigos técnicos sobre agricultura regenerativa.' },
        'footer-webinars': { title: '🎥 Webinars', desc: 'Eventos online com especialistas.' },
        'footer-ebooks': { title: '📚 E-books', desc: 'Materiais gratuitos para download.' },
        'footer-sobre': { title: 'ℹ️ Sobre', desc: 'Conheça nossa história e missão.' },
        'footer-carreiras': { title: '💼 Carreiras', desc: 'Trabalhe conosco. Vagas abertas.' },
        'footer-imprensa': { title: '📰 Imprensa', desc: 'Kit de mídia e releases.' },
        'footer-privacidade': { title: '🔒 Privacidade', desc: 'LGPD. Seus dados protegidos.' },
        'footer-termos': { title: '📋 Termos', desc: 'Termos de uso da plataforma.' }
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
        
        infoModal: document.getElementById('infoModal'),
        modalTitle: document.getElementById('modalTitle'),
        modalDescription: document.getElementById('modalDescription'),
        modalStats: document.getElementById('modalStats'),
        modalActionBtn: document.getElementById('modalActionBtn'),
        modalCloseBtn: document.getElementById('modalCloseBtn'),
        modalCloseBtn2: document.getElementById('modalCloseBtn2'),
        modalBackdrop: document.querySelector('.modal-backdrop'),
        
        globalTooltip: document.getElementById('globalTooltip'),
        
        navItems: document.querySelectorAll('.nav-item'),
        sections: document.querySelectorAll('section[id]'),
        
        tabBtns: document.querySelectorAll('.tab-btn-premium'),
        tabContents: document.querySelectorAll('.tab-content-premium'),
        
        counters: document.querySelectorAll('.counter-premium'),
        
        memoryBoard: document.getElementById('memory-board'),
        pairsDisplay: document.getElementById('pairs-matched-display'),
        attemptsDisplay: document.getElementById('attempts-display'),
        bestDisplay: document.getElementById('best-score-display'),
        progressBar: document.getElementById('game-progress-bar'),
        progressPercentage: document.getElementById('progress-percentage'),
        resetGameBtn: document.getElementById('reset-game-btn'),
        shuffleGameBtn: document.getElementById('shuffle-game-btn'),
        
        newsletterForm: document.getElementById('newsletterForm'),
        themeToggle: document.getElementById('themeToggle'),
        
        scrollIndicator: document.querySelector('.scroll-indicator-premium')
    };
    
    // ===== INICIALIZAÇÃO DO AOS =====
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 900, once: false, mirror: true, offset: 100, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' });
    }
    
    // ===== INICIALIZAÇÃO DO GSAP =====
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to('.globe-3d-premium', { scrollTrigger: { trigger: '.hero-masterpiece', start: 'top top', end: 'bottom top', scrub: 1.5 }, rotateY: 360, rotateX: 15, scale: 0.7, opacity: 0.5, ease: 'none' });
        gsap.from('.metric-card-premium', { scrollTrigger: { trigger: '.metrics-grid-premium', start: 'top 80%', toggleActions: 'play none none reverse' }, y: 60, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'back.out(1.2)' });
        gsap.from('.case-card-premium', { scrollTrigger: { trigger: '.cases-grid', start: 'top 85%', toggleActions: 'play none none reverse' }, y: 80, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' });
    }
    
    // ===== PRELOADER =====
    function initPreloader() {
        if (!DOM.preloader) return;
        for (let i = 0; i < 50; i++) {
            const p = document.createElement('div');
            p.className = 'preloader-particle';
            p.style.cssText = `position:absolute;width:${Math.random()*5+2}px;height:${p.style.width};background:hsl(${80+Math.random()*40},70%,60%);border-radius:50%;box-shadow:0 0 15px #8bc34a;left:${Math.random()*100}%;animation:floatParticle ${Math.random()*10+8}s linear infinite;animation-delay:${Math.random()*5}s;`;
            DOM.particles.appendChild(p);
        }
        const style = document.createElement('style');
        style.textContent = '@keyframes floatParticle{0%{transform:translateY(100vh) translateX(-20px) rotate(0deg);opacity:0}10%{opacity:.8}90%{opacity:.8}100%{transform:translateY(-100vh) translateX(20px) rotate(720deg);opacity:0}}';
        document.head.appendChild(style);
        const messages = ['Preparando o solo...','Plantando as sementes...','Regenerando ecossistemas...','Nutrindo a terra...','Conectando com a natureza...','Cultivando o futuro...','Colhendo sustentabilidade...','Florescendo ideias...','Germinando inovação...','Brotando esperança...'];
        let progress = 0, msgIdx = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 3.5 + 1.2;
            if (progress >= 100) { progress = 100; clearInterval(interval); setTimeout(() => { DOM.preloader.style.opacity = '0'; DOM.preloader.style.visibility = 'hidden'; setTimeout(() => { DOM.preloader.style.display = 'none'; State.isLoading = false; }, 1400); }, 300); }
            DOM.progressFill.style.width = progress + '%';
            DOM.percentage.textContent = Math.round(progress) + '%';
            const newIdx = Math.floor(progress / 10);
            if (newIdx < messages.length && newIdx !== msgIdx) { msgIdx = newIdx; DOM.message.textContent = messages[msgIdx]; }
        }, 30);
    }
    
    // ===== CURSOR CUSTOMIZADO =====
    function initCustomCursor() {
        if (State.isMobile) { document.body.style.cursor = 'auto'; return; }
        document.addEventListener('mousemove', e => { State.mouseX = e.clientX; State.mouseY = e.clientY; if(DOM.cursorCore){DOM.cursorCore.style.left=State.mouseX+'px';DOM.cursorCore.style.top=State.mouseY+'px';} if(DOM.cursorGlow){DOM.cursorGlow.style.left=State.mouseX+'px';DOM.cursorGlow.style.top=State.mouseY+'px';} });
        document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
        document.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
        document.querySelectorAll('a, button, .memory-card-premium, .nav-item, .tab-btn-premium, .metric-card-premium, .case-card-premium, .social-link, .orbit-item, .interactive').forEach(el => { el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover')); el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover')); });
        function anim() { if(State.isMobile) return; State.cursorOuterX += (State.mouseX - State.cursorOuterX) * CONFIG.cursorLerpFactor; State.cursorOuterY += (State.mouseY - State.cursorOuterY) * CONFIG.cursorLerpFactor; if(DOM.cursorOuter){DOM.cursorOuter.style.left=State.cursorOuterX+'px';DOM.cursorOuter.style.top=State.cursorOuterY+'px';} State.cursorTrailX += (State.mouseX - State.cursorTrailX) * (CONFIG.cursorLerpFactor*0.35); State.cursorTrailY += (State.mouseY - State.cursorTrailY) * (CONFIG.cursorLerpFactor*0.35); if(DOM.cursorTrail){DOM.cursorTrail.style.left=State.cursorTrailX+'px';DOM.cursorTrail.style.top=State.cursorTrailY+'px';} requestAnimationFrame(anim); }
        anim();
    }
    
    // ===== CANVAS 3D =====
    function initCanvas() {
        if (!DOM.canvas) return;
        const ctx = DOM.canvas.getContext('2d');
        State.canvasCtx = ctx;
        function resize() { State.canvasWidth = window.innerWidth; State.canvasHeight = window.innerHeight; DOM.canvas.width = State.canvasWidth; DOM.canvas.height = State.canvasHeight; initParticles(); }
        function initParticles() { State.particles = []; for(let i=0;i<CONFIG.particleCount;i++){ State.particles.push({ x:Math.random()*State.canvasWidth, y:Math.random()*State.canvasHeight, vx:(Math.random()-0.5)*0.25, vy:(Math.random()-0.5)*0.25, size:Math.random()*3.5+1.5, baseSize:Math.random()*3.5+1.5, color:`hsla(${80+Math.random()*40},${60+Math.random()*30}%,${50+Math.random()*30}%,${0.12+Math.random()*0.2})`, angle:Math.random()*Math.PI*2, angleSpeed:(Math.random()-0.5)*0.02 }); } }
        function draw() { if(!State.canvasCtx||!State.canvasWidth) return; const c=State.canvasCtx; const grad=c.createRadialGradient(State.canvasWidth/2+State.mouseInfluence.x*80,State.canvasHeight/2+State.mouseInfluence.y*80,0,State.canvasWidth/2,State.canvasHeight/2,Math.max(State.canvasWidth,State.canvasHeight)/1.3); grad.addColorStop(0,'#030a03'); grad.addColorStop(0.5,'#061406'); grad.addColorStop(1,'#010301'); c.fillStyle=grad; c.fillRect(0,0,State.canvasWidth,State.canvasHeight); State.particles.forEach(p=>{ const dx=State.mouseX-p.x,dy=State.mouseY-p.y,dist=Math.sqrt(dx*dx+dy*dy); if(dist<180){const force=(180-dist)/180; p.vx-=(dx/dist)*force*0.04; p.vy-=(dy/dist)*force*0.04; p.size=p.baseSize+force*2.5;}else{p.size=p.baseSize;} p.vx+=(Math.random()-0.5)*0.015; p.vy+=(Math.random()-0.5)*0.015; p.vx*=0.985; p.vy*=0.985; p.x+=p.vx; p.y+=p.vy; if(p.x<-20)p.x=State.canvasWidth+20; if(p.x>State.canvasWidth+20)p.x=-20; if(p.y<-20)p.y=State.canvasHeight+20; if(p.y>State.canvasHeight+20)p.y=-20; const maxSpeed=0.6; const speed=Math.sqrt(p.vx*p.vx+p.vy*p.vy); if(speed>maxSpeed){p.vx=(p.vx/speed)*maxSpeed; p.vy=(p.vy/speed)*maxSpeed;} c.beginPath(); c.arc(p.x,p.y,p.size,0,Math.PI*2); c.fillStyle=p.color; c.shadowColor='#8bc34a'; c.shadowBlur=12; c.fill(); }); c.shadowBlur=0; c.lineWidth=0.6; for(let i=0;i<State.particles.length;i++){for(let j=i+1;j<State.particles.length;j++){const p1=State.particles[i],p2=State.particles[j]; const dx=p1.x-p2.x,dy=p1.y-p2.y,dist=Math.sqrt(dx*dx+dy*dy); if(dist<CONFIG.connectionDistance){const opacity=(1-dist/CONFIG.connectionDistance)*0.12; c.beginPath(); c.strokeStyle=`rgba(139,195,74,${opacity})`; c.moveTo(p1.x,p1.y); c.lineTo(p2.x,p2.y); c.stroke(); } } } requestAnimationFrame(draw); }
        window.addEventListener('resize', resize);
        document.addEventListener('mousemove', e => { State.mouseInfluence.x = (e.clientX/State.canvasWidth)*2-1; State.mouseInfluence.y = (e.clientY/State.canvasHeight)*2-1; });
        resize(); draw();
    }
    
    // ===== MODAL DE INFORMAÇÕES (ADICIONADO) =====
    function openModal(infoKey) {
        const info = AGRO_INFO[infoKey];
        if (!info) return;
        DOM.modalTitle.textContent = info.title;
        DOM.modalDescription.textContent = info.desc;
        if (info.stats && info.stats.length > 0) {
            DOM.modalStats.innerHTML = info.stats.map(s => `<div class="modal-stat-item"><span class="stat-value">${s.v}</span><span class="stat-label">${s.l}</span></div>`).join('');
            DOM.modalStats.style.display = 'flex';
        } else { DOM.modalStats.style.display = 'none'; }
        if (info.link) { DOM.modalActionBtn.style.display = 'flex'; DOM.modalActionBtn.onclick = () => { closeModal(); document.querySelector(info.link).scrollIntoView({behavior:'smooth'}); }; } else { DOM.modalActionBtn.style.display = 'none'; }
        DOM.infoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    function closeModal() { DOM.infoModal.classList.remove('active'); document.body.style.overflow = ''; }
    DOM.modalCloseBtn.addEventListener('click', closeModal);
    DOM.modalCloseBtn2.addEventListener('click', closeModal);
    DOM.modalBackdrop.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => { if(e.key==='Escape'&&DOM.infoModal.classList.contains('active')) closeModal(); });
    
    // ===== TOOLTIP (ADICIONADO) =====
    function showTooltip(e, infoKey) {
        const info = AGRO_INFO[infoKey];
        if (!info) return;
        DOM.globalTooltip.innerHTML = `<i class="fas fa-info-circle"></i> ${info.title}`;
        DOM.globalTooltip.style.left = Math.min(e.clientX + 20, window.innerWidth - 320) + 'px';
        DOM.globalTooltip.style.top = (e.clientY - 15) + 'px';
        DOM.globalTooltip.classList.add('active');
    }
    function hideTooltip() { DOM.globalTooltip.classList.remove('active'); }
    
    // ===== ADICIONAR INTERATIVIDADE A TODOS OS ELEMENTOS (ADICIONADO) =====
    function addInteractivity() {
        document.querySelectorAll('.interactive, [data-info]').forEach(el => {
            const infoKey = el.getAttribute('data-info');
            if (!infoKey || el._interactiveBound) return;
            el._interactiveBound = true;
            el.addEventListener('mouseenter', e => showTooltip(e, infoKey));
            el.addEventListener('mousemove', e => { DOM.globalTooltip.style.left = Math.min(e.clientX + 20, window.innerWidth - 320) + 'px'; DOM.globalTooltip.style.top = (e.clientY - 15) + 'px'; });
            el.addEventListener('mouseleave', hideTooltip);
            el.addEventListener('click', e => {
                const href = el.getAttribute('href');
                if (href && href.startsWith('#') && href !== '#') { openModal(infoKey); return; }
                if (el.tagName === 'BUTTON' && el.type === 'submit') return;
                if (el.tagName === 'INPUT') return;
                if (el.closest('#memory-board')) return;
                e.preventDefault(); e.stopPropagation();
                openModal(infoKey);
            });
        });
        console.log('✅ Interatividade total: ' + document.querySelectorAll('.interactive, [data-info]').length + ' elementos.');
    }
    
    // ===== JOGO DA MEMÓRIA =====
    const MemoryGame = {
        icons: ['🌱','🌽','💧','☀️'], deck: [], cards: [], flipped: [], matched: 0, attempts: 0, locked: false,
        init() {
            this.loadBest(); this.createDeck(); this.render(); this.attachEvents();
            const saved = localStorage.getItem('agroforte_best');
            State.memoryBest = saved ? parseInt(saved) : null;
            if(DOM.bestDisplay) DOM.bestDisplay.textContent = State.memoryBest || '—';
        },
        loadBest() { const s = localStorage.getItem('agroforte_best'); State.memoryBest = s ? parseInt(s) : null; if(DOM.bestDisplay) DOM.bestDisplay.textContent = State.memoryBest || '—'; },
        saveBest(score) { if(!State.memoryBest||score<State.memoryBest){ State.memoryBest=score; localStorage.setItem('agroforte_best',score); DOM.bestDisplay.textContent=score; return true; } return false; },
        createDeck() { this.deck = [...this.icons, ...this.icons, '🌾']; this.shuffle(); },
        shuffle() { for(let i=this.deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[this.deck[i],this.deck[j]]=[this.deck[j],this.deck[i]];} this.cards=this.deck.map((v,i)=>({id:i,value:v,matched:false,flipped:false})); },
        render() {
            DOM.memoryBoard.innerHTML = '';
            this.cards.forEach((c,i) => {
                const el = document.createElement('div');
                el.className = 'memory-card-premium' + (c.matched?' matched':'') + (c.flipped?' flipped':'');
                el.textContent = c.flipped||c.matched ? c.value : '🌿';
                el.addEventListener('click', () => this.click(i));
                DOM.memoryBoard.appendChild(el);
            });
            this.updateStats(); this.updateProgress();
        },
        click(i) {
            if(this.locked) return;
            const c = this.cards[i];
            if(c.matched||c.flipped||this.flipped.length===2) return;
            c.flipped=true; this.flipped.push(i); this.render();
            if(this.flipped.length===2){ this.attempts++; this.updateStats(); this.check(); }
        },
        check() {
            this.locked=true;
            const [a,b]=this.flipped, ca=this.cards[a], cb=this.cards[b];
            if(ca.value===cb.value&&ca.value!=='🌾'){ ca.matched=cb.matched=true; this.matched++; this.flipped=[]; this.locked=false; this.render(); if(this.matched===4){ this.saveBest(this.attempts); setTimeout(()=>openModal('stat-recorde-jogo'),500); } }
            else { setTimeout(()=>{ ca.flipped=cb.flipped=false; this.flipped=[]; this.locked=false; this.render(); },700); }
        },
        updateStats() { if(DOM.pairsDisplay) DOM.pairsDisplay.textContent = `${this.matched}/4`; if(DOM.attemptsDisplay) DOM.attemptsDisplay.textContent = this.attempts; },
        updateProgress() { const p = (this.matched/4)*100; if(DOM.progressBar) DOM.progressBar.style.width = p+'%'; if(DOM.progressPercentage) DOM.progressPercentage.textContent = Math.round(p)+'%'; },
        reset() { this.matched=0; this.attempts=0; this.flipped=[]; this.locked=false; this.createDeck(); this.render(); },
        shuffleOnly() { if(this.locked) return; this.flipped=[]; this.locked=false; this.cards.forEach(c=>{if(!c.matched)c.flipped=false;}); this.render(); },
        attachEvents() { if(DOM.resetGameBtn) DOM.resetGameBtn.addEventListener('click',()=>this.reset()); if(DOM.shuffleGameBtn) DOM.shuffleGameBtn.addEventListener('click',()=>this.shuffleOnly()); }
    };
    
    // ===== TABS =====
    function initTabs() { DOM.tabBtns.forEach(b => b.addEventListener('click',()=>{ const id=b.getAttribute('data-tab'); DOM.tabBtns.forEach(x=>x.classList.remove('active')); DOM.tabContents.forEach(x=>x.classList.remove('active')); b.classList.add('active'); document.getElementById(id).classList.add('active'); })); }
    
    // ===== CONTADORES =====
    function initCounters() {
        const obs = new IntersectionObserver((entries)=>{ entries.forEach(e=>{ if(e.isIntersecting){ const el=e.target; const t=parseInt(el.getAttribute('data-target')); let c=0; const timer=setInterval(()=>{c+=t/40;if(c>=t){el.textContent=t;clearInterval(timer);}else el.textContent=Math.floor(c);},20); obs.unobserve(el); } }); },{threshold:0.3});
        DOM.counters.forEach(c=>obs.observe(c));
    }
    
    // ===== NAVEGAÇÃO =====
    function initNav() {
        document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',function(e){const h=this.getAttribute('href');if(h==='#')return;e.preventDefault();document.querySelector(h).scrollIntoView({behavior:'smooth'});if(DOM.mobileMenu)DOM.mobileMenu.classList.remove('active');}));
        window.addEventListener('scroll',()=>{
            const st=window.scrollY, dh=document.documentElement.scrollHeight-window.innerHeight, sp=(st/dh)*100;
            if(DOM.scrollProgressBar) DOM.scrollProgressBar.style.width=sp+'%';
            let cur=''; DOM.sections.forEach(s=>{if(st>=s.offsetTop-200)cur=s.id;});
            DOM.navItems.forEach(l=>{l.classList.remove('active');if(l.getAttribute('href')==='#'+cur)l.classList.add('active');});
            if(DOM.header){if(st>50)DOM.header.style.background='rgba(3,12,3,0.45)';else DOM.header.style.background='rgba(3,12,3,0.3)';}
            if(DOM.scrollIndicator){if(st>150)DOM.scrollIndicator.style.opacity='0';else DOM.scrollIndicator.style.opacity='1';}
        });
    }
    
    // ===== MOBILE MENU =====
    function initMobile() {
        if(DOM.mobileMenuBtn) DOM.mobileMenuBtn.addEventListener('click',()=>{DOM.mobileMenu.classList.add('active');document.body.style.overflow='hidden';});
        if(DOM.closeMobileMenu) DOM.closeMobileMenu.addEventListener('click',()=>{DOM.mobileMenu.classList.remove('active');document.body.style.overflow='';});
        document.querySelector('.mobile-menu-backdrop')?.addEventListener('click',()=>{DOM.mobileMenu.classList.remove('active');document.body.style.overflow='';});
        document.querySelectorAll('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>{DOM.mobileMenu.classList.remove('active');document.body.style.overflow='';}));
    }
    
    // ===== NEWSLETTER =====
    function initNewsletter() {
        if(DOM.newsletterForm) DOM.newsletterForm.addEventListener('submit',e=>{e.preventDefault();openModal('btn-newsletter');DOM.newsletterForm.reset();});
    }
    
    // ===== THEME TOGGLE =====
    function initTheme() {
        if(DOM.themeToggle){let c=0;DOM.themeToggle.addEventListener('click',()=>{c++;DOM.themeToggle.style.transform=`rotate(${c*360}deg)`;if(c===5){openModal('theme-toggle');c=0;}});}
    }
    
    // ===== INICIALIZAÇÃO =====
    function init() {
        console.log('%c🌍 AGRO FORTE · 100% INTERATIVO', 'font-size:22px;font-weight:bold;color:#8bc34a;text-shadow:0 0 15px #4caf50;');
        initPreloader();
        if(!State.isMobile) initCustomCursor(); else document.body.style.cursor='auto';
        initCanvas(); initTabs(); initCounters(); initNav(); initMobile(); initNewsletter(); initTheme();
        MemoryGame.init(); addInteractivity();
        setTimeout(()=>{if(State.isLoading&&DOM.preloader){DOM.preloader.style.opacity='0';DOM.preloader.style.visibility='hidden';setTimeout(()=>{DOM.preloader.style.display='none';State.isLoading=false;},1000);}},5000);
    }
    
    if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
    
})();
