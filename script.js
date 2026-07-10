/**
 * ============================================
 * MILITARISMO E INFANTARIA NO BRASIL
 * Forças de Emprego Estratégico
 * JavaScript Puro (Vanilla JS) - Sem Dependências
 * ============================================
 */

'use strict';

// ============================================
// INICIALIZAÇÃO PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Previne problemas de carregamento
    initAllSystems();
});

/**
 * Inicializa todos os sistemas do site
 */
function initAllSystems() {
    initNavigation();
    initFETabs();
    initMapInteractions();
    initTimelineScanner();
    initGallerySystem();
    initDesafiosGlitch();
    initLiveConsole();
    initRadarCanvas();
    initClock();
    initGlitchOverlay();
    initQuickCommands();
    initKeyboardShortcuts();
    initSmoothScroll();
    initPerformanceOptimizations();
    console.log('%c[SISCOMIS] %cTodos os sistemas operacionais. Prontidão confirmada.', 
        'color: #00ff41; font-weight: bold;', 'color: #8b9a8b;');
}

// ============================================
// 1. SISTEMA DE NAVEGAÇÃO PRINCIPAL
// ============================================
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const contentSections = document.querySelectorAll('.content-section');
    const navIndicator = document.getElementById('navIndicator');
    
    if (!navLinks.length || !contentSections.length) {
        console.warn('[SISCOMIS] Navegação: Elementos não encontrados');
        return;
    }
    
    /**
     * Atualiza o indicador de navegação
     */
    function updateNavIndicator(activeLink) {
        if (!navIndicator || !activeLink) return;
        
        const linkRect = activeLink.getBoundingClientRect();
        const navRect = activeLink.closest('.main-navigation').getBoundingClientRect();
        
        navIndicator.style.left = (linkRect.left - navRect.left) + 'px';
        navIndicator.style.width = linkRect.width + 'px';
    }
    
    /**
     * Ativa uma seção específica
     */
    function activateSection(sectionName, linkElement) {
        // Desativa todas as seções
        contentSections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Desativa todos os links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Ativa a seção correspondente
        const targetSection = document.getElementById('section-' + sectionName);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Trigger reflow para animação
            void targetSection.offsetWidth;
        }
        
        // Ativa o link
        if (linkElement) {
            linkElement.classList.add('active');
            updateNavIndicator(linkElement);
        }
        
        // Dispara evento personalizado
        document.dispatchEvent(new CustomEvent('sectionChanged', {
            detail: { section: sectionName }
        }));
    }
    
    /**
     * Manipulador de clique nos links de navegação
     */
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const sectionName = this.getAttribute('data-section');
            if (!sectionName) return;
            
            // Efeito de glitch rápido na transição
            triggerQuickGlitch();
            
            // Pequeno delay para o efeito visual
            setTimeout(() => {
                activateSection(sectionName, this);
                
                // Scroll suave para o topo da seção
                const targetSection = document.getElementById('section-' + sectionName);
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            }, 100);
        });
    });
    
    // Inicializa o indicador com o link ativo
    const initialActiveLink = document.querySelector('.nav-link.active');
    if (initialActiveLink) {
        setTimeout(() => updateNavIndicator(initialActiveLink), 200);
    }
    
    // Atualiza indicador no resize
    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) updateNavIndicator(activeLink);
    });
    
    // Atualiza indicador quando seção muda por outros meios
    document.addEventListener('sectionChanged', function(e) {
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) updateNavIndicator(activeLink);
    });
}

// ============================================
// 2. SISTEMA DE ABAS DAS FORÇAS ESTRATÉGICAS
// ============================================
function initFETabs() {
    const feTabs = document.querySelectorAll('.fe-tab-button');
    const fePanels = document.querySelectorAll('.fe-content-panel');
    const feScanline = document.getElementById('feScanline');
    const feTabsContent = document.getElementById('feTabsContent');
    
    if (!feTabs.length || !fePanels.length) {
        console.warn('[SISCOMIS] Abas FE: Elementos não encontrados');
        return;
    }
    
    let isTransitioning = false;
    
    /**
     * Efeito de scanline durante transição
     */
    function triggerScanline(callback) {
        if (!feScanline) {
            if (callback) callback();
            return;
        }
        
        feScanline.classList.remove('scanning');
        void feScanline.offsetWidth; // Trigger reflow
        feScanline.classList.add('scanning');
        
        setTimeout(() => {
            if (callback) callback();
        }, 300);
    }
    
    /**
     * Ativa painel específico
     */
    function activateFEPanel(panelName, tabElement) {
        if (isTransitioning) return;
        isTransitioning = true;
        
        // Desativa todos os painéis
        fePanels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Desativa todas as abas
        feTabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Executa scanline
        triggerScanline(() => {
            // Ativa o painel correspondente
            const targetPanel = document.getElementById('panel-' + panelName);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
            
            // Ativa a aba
            if (tabElement) {
                tabElement.classList.add('active');
            }
            
            // Efeito de flicker no conteúdo
            if (feTabsContent) {
                feTabsContent.style.opacity = '0.8';
                setTimeout(() => {
                    feTabsContent.style.opacity = '1';
                }, 50);
            }
            
            isTransitioning = false;
        });
    }
    
    /**
     * Manipulador de clique nas abas
     */
    feTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            if (isTransitioning) return;
            if (this.classList.contains('active')) return;
            
            const panelName = this.getAttribute('data-fe');
            if (!panelName) return;
            
            activateFEPanel(panelName, this);
        });
    });
    
    // Suporte a teclado para acessibilidade
    feTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', function(e) {
            let targetTab = null;
            
            switch(e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    targetTab = feTabs[(index + 1) % feTabs.length];
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    targetTab = feTabs[(index - 1 + feTabs.length) % feTabs.length];
                    break;
                case 'Home':
                    e.preventDefault();
                    targetTab = feTabs[0];
                    break;
                case 'End':
                    e.preventDefault();
                    targetTab = feTabs[feTabs.length - 1];
                    break;
            }
            
            if (targetTab) {
                targetTab.focus();
                targetTab.click();
            }
        });
    });
}

// ============================================
// 3. MAPA INTERATIVO DE COMANDOS
// ============================================
function initMapInteractions() {
    const mapRegions = document.querySelectorAll('.cm-region');
    const holoPanel = document.getElementById('holoPanel');
    const holoContent = document.getElementById('holoContent');
    const holoCoords = document.getElementById('holoCoords');
    
    if (!mapRegions.length) {
        console.warn('[SISCOMIS] Mapa: Regiões não encontradas');
        return;
    }
    
    /**
     * Atualiza o painel holográfico
     */
    function updateHoloPanel(dataInfo, cmElement) {
        if (!holoContent || !dataInfo) return;
        
        const infoParts = dataInfo.split('|');
        if (infoParts.length < 5) return;
        
        const [nome, sigla, sede, descricao, extra] = infoParts;
        
        holoContent.innerHTML = `
            <div class="holo-data-row">
                <span class="holo-label">COMANDO</span>
                <span class="holo-value highlight">${nome}</span>
            </div>
            <div class="holo-data-row">
                <span class="holo-label">SIGLA</span>
                <span class="holo-value">${sigla}</span>
            </div>
            <div class="holo-data-row">
                <span class="holo-label">SEDE</span>
                <span class="holo-value">${sede}</span>
            </div>
            <div class="holo-data-row">
                <span class="holo-label">MISSÃO</span>
                <span class="holo-value">${descricao}</span>
            </div>
            <div class="holo-data-row">
                <span class="holo-label">INFO ADICIONAL</span>
                <span class="holo-value">${extra}</span>
            </div>
        `;
        
        // Adiciona classe de destaque
        if (holoPanel) {
            holoPanel.classList.add('data-received');
            setTimeout(() => {
                holoPanel.classList.remove('data-received');
            }, 500);
        }
    }
    
    /**
     * Atualiza coordenadas simuladas
     */
    function updateCoords(event) {
        if (!holoCoords) return;
        
        const mapContainer = document.querySelector('.map-brazil-svg');
        if (!mapContainer) return;
        
        const rect = mapContainer.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width * 100).toFixed(1);
        const y = ((event.clientY - rect.top) / rect.height * 100).toFixed(1);
        
        const lat = (5.2744 + (y / 100) * 28.0).toFixed(2);
        const lon = (-73.9831 + (x / 100) * 38.0).toFixed(2);
        
        holoCoords.textContent = `LAT: ${lat}°S | LON: ${lon}°W`;
    }
    
    /**
     * Limpa o painel holográfico
     */
    function clearHoloPanel() {
        if (!holoContent) return;
        
        holoContent.innerHTML = `
            <p class="holo-placeholder">
                Passe o mouse sobre uma região do mapa para visualizar 
                informações detalhadas do Comando Militar.
            </p>
        `;
        
        if (holoCoords) {
            holoCoords.textContent = 'LAT: --.--°S | LON: --.--°W';
        }
    }
    
    // Adiciona event listeners para cada região
    mapRegions.forEach(region => {
        region.addEventListener('mouseenter', function(e) {
            const dataInfo = this.getAttribute('data-info');
            updateHoloPanel(dataInfo, this);
            
            // Efeito de highlight na região
            this.style.zIndex = '10';
        });
        
        region.addEventListener('mousemove', function(e) {
            updateCoords(e);
        });
        
        region.addEventListener('mouseleave', function() {
            clearHoloPanel();
            this.style.zIndex = '1';
        });
        
        // Suporte a toque para dispositivos móveis
        region.addEventListener('touchstart', function(e) {
            e.preventDefault();
            const dataInfo = this.getAttribute('data-info');
            updateHoloPanel(dataInfo, this);
            
            const touch = e.touches[0];
            updateCoords(touch);
        });
        
        region.addEventListener('touchend', function() {
            setTimeout(clearHoloPanel, 2000);
        });
    });
    
    // Suporte a teclado para acessibilidade
    mapRegions.forEach(region => {
        region.setAttribute('tabindex', '0');
        region.setAttribute('role', 'button');
        region.setAttribute('aria-label', region.getAttribute('data-cm') || 'Comando Militar');
        
        region.addEventListener('focus', function() {
            const dataInfo = this.getAttribute('data-info');
            updateHoloPanel(dataInfo, this);
        });
        
        region.addEventListener('blur', function() {
            clearHoloPanel();
        });
    });
}

// ============================================
// 4. TIMELINE SCANNER (FORMAÇÃO E ADESTRAMENTO)
// ============================================
function initTimelineScanner() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const scanBeam = document.getElementById('scanBeam');
    const timelineContainer = document.getElementById('timelineScanner');
    
    if (!timelineItems.length) {
        console.warn('[SISCOMIS] Timeline: Itens não encontrados');
        return;
    }
    
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    /**
     * Atualiza a posição do feixe de scan
     */
    function updateScanBeam() {
        if (!scanBeam || !timelineContainer) return;
        
        const containerRect = timelineContainer.getBoundingClientRect();
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;
        const windowHeight = window.innerHeight;
        
        // Calcula a posição relativa do scan
        let scanPosition = ((windowHeight / 2 - containerTop) / containerHeight) * 100;
        scanPosition = Math.max(0, Math.min(100, scanPosition));
        
        scanBeam.style.top = scanPosition + '%';
        
        // Ajusta opacidade baseado na visibilidade
        if (containerTop + containerHeight < 0 || containerTop > windowHeight) {
            scanBeam.style.opacity = '0';
        } else {
            scanBeam.style.opacity = '0.8';
        }
    }
    
    /**
     * Revela itens da timeline baseado na posição do scroll
     */
    function revealTimelineItems() {
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calcula quanto do item está visível
            const visiblePortion = Math.max(0, 
                Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
            ) / rect.height;
            
            if (visiblePortion > 0.3) {
                item.classList.add('reveal');
                
                // Efeito cascata baseado na posição
                const delay = (rect.top / windowHeight) * 200;
                item.style.transitionDelay = delay + 'ms';
            } else {
                item.classList.remove('reveal');
                item.style.transitionDelay = '0ms';
            }
        });
    }
    
    /**
     * Handler de scroll otimizado com requestAnimationFrame
     */
    function onScroll() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScanBeam();
                revealTimelineItems();
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    // Adiciona listener de scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Inicializa na carga
    setTimeout(() => {
        updateScanBeam();
        revealTimelineItems();
    }, 300);
    
    // Re-verifica em resize
    window.addEventListener('resize', () => {
        updateScanBeam();
        revealTimelineItems();
    });
}

// ============================================
// 5. SISTEMA DE GALERIA COM FLIP
// ============================================
function initGallerySystem() {
    const galleryCards = document.querySelectorAll('.gallery-card');
    
    if (!galleryCards.length) {
        console.warn('[SISCOMIS] Galeria: Cards não encontrados');
        return;
    }
    
    /**
     * Configura interações de arraste para cada card
     */
    galleryCards.forEach((card, index) => {
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        let hasMoved = false;
        const DRAG_THRESHOLD = 30;
        
        // Mouse Events
        card.addEventListener('mousedown', function(e) {
            startX = e.clientX;
            startY = e.clientY;
            isDragging = true;
            hasMoved = false;
            card.style.cursor = 'grabbing';
            card.style.transition = 'none';
        });
        
        card.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                hasMoved = true;
            }
            
            // Rotação 3D sutil durante o arraste
            const rotateY = Math.max(-15, Math.min(15, deltaX * 0.5));
            const rotateX = Math.max(-10, Math.min(10, -deltaY * 0.5));
            
            card.querySelector('.gallery-card-inner').style.transform = 
                `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        });
        
        card.addEventListener('mouseup', function(e) {
            if (!isDragging) return;
            isDragging = false;
            card.style.cursor = 'grab';
            
            const deltaX = e.clientX - startX;
            
            // Restaura transformação
            card.querySelector('.gallery-card-inner').style.transform = '';
            card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Se arrastou horizontalmente o suficiente, faz o flip
            if (hasMoved && Math.abs(deltaX) > DRAG_THRESHOLD) {
                card.classList.toggle('flipped');
                
                // Efeito sonoro tático (opcional)
                playTacticalClick();
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (isDragging) {
                isDragging = false;
                card.style.cursor = 'grab';
                card.querySelector('.gallery-card-inner').style.transform = '';
                card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
        
        // Touch Events para mobile
        card.addEventListener('touchstart', function(e) {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            isDragging = true;
            hasMoved = false;
            card.style.transition = 'none';
        }, { passive: false });
        
        card.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                hasMoved = true;
                e.preventDefault(); // Previne scroll durante arraste
            }
            
            const rotateY = Math.max(-15, Math.min(15, deltaX * 0.5));
            card.querySelector('.gallery-card-inner').style.transform = 
                `rotateY(${rotateY}deg)`;
        }, { passive: false });
        
        card.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            isDragging = false;
            
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - startX;
            
            card.querySelector('.gallery-card-inner').style.transform = '';
            card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (hasMoved && Math.abs(deltaX) > DRAG_THRESHOLD) {
                card.classList.toggle('flipped');
                playTacticalClick();
            }
        });
        
        // Suporte a teclado
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Imagem tática - arraste para revelar detalhes');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.classList.toggle('flipped');
                playTacticalClick();
            }
        });
    });
    
    /**
     * Simula um clique tático (feedback visual)
     */
    function playTacticalClick() {
        // Cria um efeito visual de confirmação
        const indicator = document.createElement('div');
        indicator.className = 'tactical-click-indicator';
        indicator.style.cssText = `
            position: fixed;
            pointer-events: none;
            width: 20px;
            height: 20px;
            border: 2px solid #00ff41;
            border-radius: 50%;
            animation: tacticalPop 0.4s ease-out forwards;
            z-index: 9999;
        `;
        
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.remove();
        }, 400);
    }
}

// ============================================
// 6. SISTEMA DE GLITCH NOS DESAFIOS
// ============================================
function initDesafiosGlitch() {
    const desafioCards = document.querySelectorAll('[data-glitch]');
    
    if (!desafioCards.length) {
        console.warn('[SISCOMIS] Desafios: Cards não encontrados');
        return;
    }
    
    let glitchInterval;
    let isGlitching = false;
    
    /**
     * Aplica efeito glitch em um card específico
     */
    function applyGlitch(card) {
        if (isGlitching) return;
        
        const originalTransform = card.style.transform;
        const originalFilter = card.style.filter;
        
        // Sequência de glitch
        const glitchSequence = [
            { transform: 'translate(2px, 0) skew(0deg)', filter: 'hue-rotate(90deg) brightness(1.2)', duration: 50 },
            { transform: 'translate(-2px, 0) skew(2deg)', filter: 'hue-rotate(-90deg) brightness(0.9)', duration: 50 },
            { transform: 'translate(1px, -1px) skew(-1deg)', filter: 'hue-rotate(45deg) brightness(1.1)', duration: 40 },
            { transform: 'translate(-1px, 1px) skew(1deg)', filter: 'hue-rotate(-45deg) brightness(1)', duration: 40 },
            { transform: 'translate(3px, 0) skew(3deg)', filter: 'hue-rotate(180deg) brightness(1.3)', duration: 30 },
            { transform: 'translate(0, 0) skew(0)', filter: 'none', duration: 60 }
        ];
        
        let totalDelay = 0;
        
        glitchSequence.forEach(step => {
            setTimeout(() => {
                card.style.transform = step.transform;
                card.style.filter = step.filter;
            }, totalDelay);
            
            totalDelay += step.duration;
        });
        
        // Restaura estado original
        setTimeout(() => {
            card.style.transform = originalTransform;
            card.style.filter = originalFilter;
        }, totalDelay + 50);
    }
    
    /**
     * Executa glitch em todos os cards
     */
    function glitchAllCards() {
        if (isGlitching) return;
        isGlitching = true;
        
        desafioCards.forEach((card, index) => {
            setTimeout(() => {
                applyGlitch(card);
            }, index * 100); // Stagger effect
        });
        
        setTimeout(() => {
            isGlitching = false;
        }, desafioCards.length * 100 + 300);
    }
    
    /**
     * Inicia o ciclo de glitch automático
     */
    function startGlitchCycle() {
        // Limpa intervalo existente
        if (glitchInterval) {
            clearInterval(glitchInterval);
        }
        
        // Primeiro glitch após 3 segundos
        setTimeout(() => {
            glitchAllCards();
            
            // Ciclo a cada 5 segundos
            glitchInterval = setInterval(() => {
                glitchAllCards();
            }, 5000);
        }, 3000);
    }
    
    /**
     * Para o ciclo de glitch
     */
    function stopGlitchCycle() {
        if (glitchInterval) {
            clearInterval(glitchInterval);
            glitchInterval = null;
        }
    }
    
    // Inicia o ciclo
    startGlitchCycle();
    
    // Pausa quando a página não está visível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopGlitchCycle();
        } else {
            startGlitchCycle();
        }
    });
    
    // Adiciona hover effect que cancela glitch naquele card
    desafioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.15s ease';
            this.style.borderColor = 'var(--amber-alert)';
            this.style.boxShadow = '0 0 20px rgba(255, 140, 0, 0.4)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'rgba(255, 140, 0, 0.4)';
            this.style.boxShadow = 'none';
        });
    });
}

// ============================================
// 7. CONSOLE DE STATUS AO VIVO
// ============================================
function initLiveConsole() {
    const consoleLine1 = document.getElementById('consoleLine1');
    const consoleLine2 = document.getElementById('consoleLine2');
    const consoleLine3 = document.getElementById('consoleLine3');
    
    if (!consoleLine1 || !consoleLine2 || !consoleLine3) {
        console.warn('[SISCOMIS] Console: Elementos não encontrados');
        return;
    }
    
    /**
     * Mensagens do console de status
     */
    const statusMessages = [
        '> SISCOMIS: Link Verde - Conexão Estabelecida',
        '> Bda Inf Pqdt: Prontidão 48h - Status Operacional',
        '> Conexão com CIGS: Estável - Selva Monitorada',
        '> CAvEx: Alerta 3 - Mobilidade Tática Ativa',
        '> 1º BFEsp: Sincronizado - Canal Seguro',
        '> PPIF: Monitorando Fronteira - Setor Norte',
        '> MINUSTAH: Dados Históricos - Missão Encerrada',
        '> COTER: Comando Geral - Operações Normais',
        '> CML: Forças Estratégicas - Prontas',
        '> CMA: Fronteira Amazônica - Vigilância Ativa',
        '> CMSE: Estrutura Industrial - Operacional',
        '> CMO: Pantanal - Patrulha em Curso',
        '> CMS: Fronteira Sul - Monitoramento',
        '> CMN: Amazônia Oriental - Defesa Ativa',
        '> CMNE: Segurança Regional - GLO Disponível',
        '> CMP: Capital Federal - Proteção Reforçada',
        '> CIOpEsp: Operadores Especiais - Em Adestramento',
        '> ESA: Formação de Sargentos - Turma Atual',
        '> AMAN: Cadetes - Instrução em Andamento',
        '> CIB: Comunicações - Criptografia AES-256',
        '> LOG: Suprimentos - Níveis Adequados',
        '> MED: Evacuação Aeromédica - Disponível',
        '> INTEL: Inteligência - Relatórios Atualizados',
        '> SAT: Link Satélite - Sinal Forte',
        '> DRONE: Reconhecimento Aéreo - Em Operação'
    ];
    
    let messageIndex1 = 0;
    let messageIndex2 = 5;
    let messageIndex3 = 10;
    let charIndex1 = 0;
    let charIndex2 = 0;
    let charIndex3 = 0;
    let isTyping1 = false;
    let isTyping2 = false;
    let isTyping3 = false;
    
    /**
     * Efeito de digitação para uma linha
     */
    function typeLine(lineElement, message, charIndex, callback) {
        if (charIndex < message.length) {
            lineElement.textContent = message.substring(0, charIndex + 1) + '█';
            
            // Velocidade variável para realismo
            const delay = Math.random() * 30 + 20;
            
            setTimeout(() => {
                typeLine(lineElement, message, charIndex + 1, callback);
            }, delay);
        } else {
            lineElement.textContent = message;
            if (callback) callback();
        }
    }
    
    /**
     * Ciclo de mensagens para uma linha
     */
    function cycleMessage(lineElement, messageIndexRef, isTypingRef) {
        return function() {
            if (isTypingRef) return;
            isTypingRef = true;
            
            const message = statusMessages[messageIndexRef];
            
            // Efeito de apagar
            const currentText = lineElement.textContent;
            if (currentText && currentText !== '> ') {
                let eraseIndex = currentText.length;
                
                function eraseText() {
                    if (eraseIndex > 2) {
                        lineElement.textContent = currentText.substring(0, eraseIndex - 1) + '█';
                        eraseIndex--;
                        setTimeout(eraseText, 15);
                    } else {
                        lineElement.textContent = '> █';
                        setTimeout(() => {
                            typeLine(lineElement, message, 0, () => {
                                isTypingRef = false;
                                
                                // Próxima mensagem após pausa
                                setTimeout(() => {
                                    messageIndexRef = (messageIndexRef + 3) % statusMessages.length;
                                    cycleMessage(lineElement, messageIndexRef, isTypingRef)();
                                }, 2500 + Math.random() * 2000);
                            });
                        }, 200);
                    }
                }
                
                eraseText();
            } else {
                typeLine(lineElement, message, 0, () => {
                    isTypingRef = false;
                    
                    setTimeout(() => {
                        messageIndexRef = (messageIndexRef + 3) % statusMessages.length;
                        cycleMessage(lineElement, messageIndexRef, isTypingRef)();
                    }, 2500 + Math.random() * 2000);
                });
            }
        };
    }
    
    // Inicia as três linhas com delays diferentes
    setTimeout(() => {
        cycleMessage(consoleLine1, messageIndex1, isTyping1)();
    }, 500);
    
    setTimeout(() => {
        cycleMessage(consoleLine2, messageIndex2, isTyping2)();
    }, 2000);
    
    setTimeout(() => {
        cycleMessage(consoleLine3, messageIndex3, isTyping3)();
    }, 3500);
}

// ============================================
// 8. CANVAS DE PARTÍCULAS RADAR
// ============================================
function initRadarCanvas() {
    const canvas = document.getElementById('radarCanvas');
    if (!canvas) {
        console.warn('[SISCOMIS] Radar Canvas: Não encontrado');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    const MAX_PARTICLES = 50;
    
    /**
     * Redimensiona o canvas
     */
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    /**
     * Cria uma partícula
     */
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            life: Math.random() * 200 + 100,
            maxLife: 300,
            opacity: Math.random() * 0.5 + 0.2
        };
    }
    
    /**
     * Inicializa partículas
     */
    function initParticles() {
        particles = [];
        for (let i = 0; i < MAX_PARTICLES; i++) {
            particles.push(createParticle());
        }
    }
    
    /**
     * Desenha o radar
     */
    function drawRadar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Desenha grade de radar
        ctx.strokeStyle = 'rgba(0, 255, 65, 0.05)';
        ctx.lineWidth = 0.5;
        
        const gridSize = 60;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
        
        // Desenha círculos concêntricos
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const maxRadius = Math.sqrt(centerX * centerX + centerY * centerY);
        
        for (let r = 100; r < maxRadius; r += 100) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 255, 65, 0.08)';
            ctx.stroke();
        }
        
        // Atualiza e desenha partículas
        particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life--;
            
            // Wrap around
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Respawn quando vida acaba
            if (particle.life <= 0) {
                particles[index] = createParticle();
                return;
            }
            
            // Desenha partícula
            const opacity = (particle.life / particle.maxLife) * particle.opacity;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 65, ${opacity})`;
            ctx.fill();
            
            // Linha de rastro
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(
                particle.x - particle.speedX * 20,
                particle.y - particle.speedY * 20
            );
            ctx.strokeStyle = `rgba(0, 255, 65, ${opacity * 0.3})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        });
        
        animationId = requestAnimationFrame(drawRadar);
    }
    
    // Inicialização
    resizeCanvas();
    initParticles();
    drawRadar();
    
    // Redimensiona com debounce
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resizeCanvas();
            initParticles();
        }, 200);
    });
    
    // Para animação quando página não está visível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        } else {
            if (!animationId) {
                drawRadar();
            }
        }
    });
}

// ============================================
// 9. RELÓGIO ZULU
// ============================================
function initClock() {
    const clockElement = document.querySelector('.clock-time');
    if (!clockElement) return;
    
    /**
     * Atualiza o relógio
     */
    function updateClock() {
        const now = new Date();
        const hours = String(now.getUTCHours()).padStart(2, '0');
        const minutes = String(now.getUTCMinutes()).padStart(2, '0');
        const seconds = String(now.getUTCSeconds()).padStart(2, '0');
        
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
    
    // Atualiza imediatamente
    updateClock();
    
    // Atualiza a cada segundo
    setInterval(updateClock, 1000);
}

// ============================================
// 10. OVERLAY DE GLITCH
// ============================================
function initGlitchOverlay() {
    const glitchOverlay = document.getElementById('globalGlitch');
    if (!glitchOverlay) return;
    
    /**
     * Dispara um glitch rápido
     */
    window.triggerQuickGlitch = function() {
        if (!glitchOverlay) return;
        
        glitchOverlay.classList.add('active');
        
        setTimeout(() => {
            glitchOverlay.classList.remove('active');
        }, 150);
    };
    
    // Glitch aleatório ocasional
    function randomGlitch() {
        if (Math.random() < 0.1) { // 10% de chance
            triggerQuickGlitch();
        }
        
        setTimeout(randomGlitch, 3000 + Math.random() * 7000);
    }
    
    setTimeout(randomGlitch, 5000);
}

// ============================================
// 11. COMANDOS RÁPIDOS
// ============================================
function initQuickCommands() {
    const btnRefresh = document.getElementById('btnRefresh');
    const btnDarkMode = document.getElementById('btnDarkMode');
    const btnCrypto = document.getElementById('btnCrypto');
    const btnFullscreen = document.getElementById('btnFullscreen');
    
    /**
     * Botão Refresh - Recarrega dados
     */
    if (btnRefresh) {
        btnRefresh.addEventListener('click', function() {
            triggerQuickGlitch();
            
            // Animação de rotação
            const icon = this.querySelector('.cmd-icon');
            if (icon) {
                icon.style.transition = 'transform 0.6s ease';
                icon.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    icon.style.transform = 'rotate(0deg)';
                }, 600);
            }
            
            // Feedback visual
            showNotification('SISTEMA ATUALIZADO', 'success');
        });
    }
    
    /**
     * Botão Dark Mode - Alterna tema
     */
    if (btnDarkMode) {
        btnDarkMode.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            
            const isLight = document.body.classList.contains('light-mode');
            showNotification(
                isLight ? 'MODO CLARO ATIVADO' : 'MODO ESCURO ATIVADO',
                'info'
            );
        });
    }
    
    /**
     * Botão Crypto - Status de criptografia
     */
    if (btnCrypto) {
        btnCrypto.addEventListener('click', function() {
            showNotification('CRIPTOGRAFIA AES-256 • CANAL SEGURO', 'secure');
        });
    }
    
    /**
     * Botão Fullscreen
     */
    if (btnFullscreen) {
        btnFullscreen.addEventListener('click', function() {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                showNotification('MODO TELA CHEIA DESATIVADO', 'info');
            } else {
                document.documentElement.requestFullscreen();
                showNotification('MODO TELA CHEIA ATIVADO', 'info');
            }
        });
    }
}

// ============================================
// 12. ATALHOS DE TECLADO
// ============================================
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ignora se estiver em um input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        switch(e.key) {
            case '1':
                navigateToSection('estrategicas');
                break;
            case '2':
                navigateToSection('comandos');
                break;
            case '3':
                navigateToSection('formacao');
                break;
            case '4':
                navigateToSection('galeria');
                break;
            case '5':
                navigateToSection('desafios');
                break;
            case 'Escape':
                // Fecha qualquer overlay aberto
                document.querySelectorAll('.active').forEach(el => {
                    if (el.classList.contains('modal') || el.classList.contains('overlay')) {
                        el.classList.remove('active');
                    }
                });
                break;
            case 'f':
                if (e.ctrlKey) {
                    e.preventDefault();
                    // Toggle fullscreen
                    if (document.fullscreenElement) {
                        document.exitFullscreen();
                    } else {
                        document.documentElement.requestFullscreen();
                    }
                }
                break;
        }
    });
    
    function navigateToSection(sectionName) {
        const link = document.querySelector(`.nav-link[data-section="${sectionName}"]`);
        if (link) {
            link.click();
        }
    }
}

// ============================================
// 13. NOTIFICAÇÕES DO SISTEMA
// ============================================
function showNotification(message, type = 'info') {
    // Remove notificações existentes
    document.querySelectorAll('.system-notification').forEach(n => n.remove());
    
    const notification = document.createElement('div');
    notification.className = 'system-notification';
    notification.setAttribute('data-type', type);
    notification.textContent = message;
    
    // Estilos inline para a notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 12px 20px;
        font-family: 'JetBrains Mono', monospace;
        font-size: 0.75rem;
        letter-spacing: 1px;
        background: rgba(5, 10, 5, 0.95);
        border: 1px solid #00ff41;
        color: #00ff41;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        animation: slideInNotification 0.3s ease;
        max-width: 400px;
    `;
    
    if (type === 'success') {
        notification.style.borderColor = '#00ff41';
    } else if (type === 'secure') {
        notification.style.borderColor = '#ff8c00';
        notification.style.color = '#ff8c00';
    }
    
    document.body.appendChild(notification);
    
    // Remove após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// 14. SCROLL SUAVE
// ============================================
function initSmoothScroll() {
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// 15. OTIMIZAÇÕES DE PERFORMANCE
// ============================================
function initPerformanceOptimizations() {
    // Debounce para funções pesadas
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle para eventos de scroll
    function throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
    
    // Lazy loading para imagens
    if ('loading' in HTMLImageElement.prototype) {
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            img.src = img.dataset.src || img.src;
        });
    } else {
        // Fallback para navegadores antigos
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
    
    // Prefetch de seções importantes
    if (document.querySelector('.nav-link[data-section="estrategicas"]')) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = '#section-estrategicas';
        document.head.appendChild(link);
    }
}

// ============================================
// 16. HANDLER DE ERROS GLOBAL
// ============================================
window.addEventListener('error', function(e) {
    console.error('[SISCOMIS ERROR]', e.message, e.filename, e.lineno);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('[SISCOMIS PROMISE ERROR]', e.reason);
});

// ============================================
// 17. EXPORTAR FUNÇÕES ÚTEIS GLOBALMENTE
// ============================================
window.SISCOMIS = {
    refresh: function() {
        triggerQuickGlitch();
        showNotification('SISTEMA ATUALIZADO', 'success');
    },
    navigate: function(section) {
        const link = document.querySelector(`.nav-link[data-section="${section}"]`);
        if (link) link.click();
    },
    notify: showNotification,
    glitch: triggerQuickGlitch
};

// ============================================
// FIM DO SCRIPT
// ============================================
console.log('%c▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓', 'color: #00ff41;');
console.log('%c█ SISCOMIS v3.7 - TODOS OS SISTEMAS OPERACIONAIS █', 'color: #00ff41; font-weight: bold;');
console.log('%c█ PRONTIDÃO CONFIRMADA - DEFESA ATIVA          █', 'color: #00ff41;');
console.log('%c▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓', 'color: #00ff41;');
