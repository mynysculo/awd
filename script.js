/**
 * ============================================
 * GORRO PESADO - SISTEMA DE CONTROLE TÁTICO
 * FORÇAS DE EMPREGO ESTRATÉGICO
 * EXÉRCITO BRASILEIRO
 * ============================================
 * JavaScript Puro - Vanilla JS
 * Sem dependências externas
 * ============================================
 */

'use strict';

// ============================================
// INICIALIZAÇÃO PRINCIPAL DO SISTEMA
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c[GORRO PESADO] %cInicializando sistemas operacionais...', 
        'color: #d4b020; font-weight: bold; font-size: 16px;', 
        'color: #8b7d6b;');
    
    // Inicializa todos os módulos
    initNavigation();
    initForceCards();
    initMapSystem();
    initTimeline();
    initGallery();
    initDesafiosGlitch();
    initStatusConsole();
    initDustCanvas();
    initLightbox();
    initQuickButtons();
    initKeyboardCommands();
    
    console.log('%c[GORRO PESADO] %cTodos os sistemas prontos. Prontidão operacional confirmada.', 
        'color: #d4b020; font-weight: bold;', 
        'color: #6b8c42;');
});

// ============================================
// 1. SISTEMA DE NAVEGAÇÃO MUSCULAR
// ============================================
function initNavigation() {
    const tabs = document.querySelectorAll('.muscle-tab');
    const sections = document.querySelectorAll('.war-section');
    
    if (!tabs.length || !sections.length) {
        console.warn('[GORRO PESADO] Navegação: Elementos não encontrados');
        return;
    }
    
    /**
     * Ativa uma seção específica
     */
    function activateSection(targetName) {
        // Desativa todas as seções
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Desativa todas as tabs
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Ativa a seção correspondente
        const targetSection = document.getElementById('sec-' + targetName);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Ativa a tab correspondente
        const targetTab = document.querySelector(`.muscle-tab[data-target="${targetName}"]`);
        if (targetTab) {
            targetTab.classList.add('active');
        }
        
        // Scroll para o topo da seção
        if (targetSection) {
            setTimeout(() => {
                targetSection.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
        
        // Efeito de impacto
        triggerScreenShake();
    }
    
    /**
     * Efeito de tremor na tela
     */
    function triggerScreenShake() {
        const container = document.querySelector('.war-container');
        if (!container) return;
        
        container.style.transform = 'translateX(3px)';
        setTimeout(() => {
            container.style.transform = 'translateX(-3px)';
            setTimeout(() => {
                container.style.transform = 'translateX(0)';
            }, 50);
        }, 50);
    }
    
    // Adiciona eventos de clique nas tabs
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            if (target) {
                activateSection(target);
            }
        });
    });
    
    // Suporte a teclado para tabs
    tabs.forEach((tab, index) => {
        tab.setAttribute('tabindex', '0');
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
        
        tab.addEventListener('keydown', function(e) {
            let targetTab = null;
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                targetTab = tabs[(index + 1) % tabs.length];
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                targetTab = tabs[(index - 1 + tabs.length) % tabs.length];
            }
            
            if (targetTab) {
                targetTab.focus();
                targetTab.click();
            }
        });
    });
}

// ============================================
// 2. CARDS DAS FORÇAS ESTRATÉGICAS (FLIP)
// ============================================
function initForceCards() {
    const forceCards = document.querySelectorAll('.force-card');
    const detailBtns = document.querySelectorAll('.force-detail-btn');
    
    if (!forceCards.length) {
        console.warn('[GORRO PESADO] Force Cards: Não encontrados');
        return;
    }
    
    /**
     * Faz o flip de um card específico
     */
    function flipCard(card) {
        // Fecha outros cards abertos
        forceCards.forEach(otherCard => {
            if (otherCard !== card && otherCard.classList.contains('flipped')) {
                otherCard.classList.remove('flipped');
            }
        });
        
        // Alterna o estado do card
        card.classList.toggle('flipped');
        
        // Som tático (visual)
        createImpactEffect(card);
    }
    
    /**
     * Cria efeito visual de impacto
     */
    function createImpactEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border: 2px solid #d4b020;
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: rippleEffect 0.6s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'visible';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // Eventos de clique nos botões de detalhe
    detailBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.force-card');
            if (card) {
                flipCard(card);
            }
        });
    });
    
    // Eventos de clique no card inteiro
    forceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Não faz flip se clicou no botão
            if (e.target.closest('.force-detail-btn')) return;
            flipCard(this);
        });
        
        // Suporte a teclado
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', 'Card de força estratégica - clique para detalhes');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                flipCard(this);
            }
        });
    });
}

// ============================================
// 3. SISTEMA DE MAPA INTERATIVO
// ============================================
function initMapSystem() {
    const cmZones = document.querySelectorAll('.cm-zone');
    const mapInfoBody = document.getElementById('mapInfoBody');
    const mapInfoPanel = document.getElementById('mapInfoPanel');
    
    if (!cmZones.length || !mapInfoBody) {
        console.warn('[GORRO PESADO] Mapa: Elementos não encontrados');
        return;
    }
    
    let activeZone = null;
    
    /**
     * Atualiza o painel de informações
     */
    function updateInfoPanel(zoneElement) {
        const cmCode = zoneElement.getAttribute('data-cm');
        const cmName = zoneElement.getAttribute('data-name');
        const cmSede = zoneElement.getAttribute('data-sede');
        const cmInfo = zoneElement.getAttribute('data-info');
        
        mapInfoBody.innerHTML = `
            <div class="cm-data-row">
                <span class="cm-label">SIGLA</span>
                <span class="cm-value" style="font-size:1.5rem;color:#d4b020;">${cmCode}</span>
            </div>
            <div class="cm-data-row">
                <span class="cm-label">COMANDO</span>
                <span class="cm-value">${cmName}</span>
            </div>
            <div class="cm-data-row">
                <span class="cm-label">SEDE</span>
                <span class="cm-value">${cmSede}</span>
            </div>
            <div class="cm-data-row">
                <span class="cm-label">MISSÃO PRINCIPAL</span>
                <span class="cm-value">${cmInfo}</span>
            </div>
            <div class="cm-data-row">
                <span class="cm-label">STATUS</span>
                <span class="cm-value" style="color:#6b8c42;">OPERACIONAL</span>
            </div>
        `;
        
        // Efeito de atualização no painel
        if (mapInfoPanel) {
            mapInfoPanel.style.transform = 'scale(1.02)';
            setTimeout(() => {
                mapInfoPanel.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    /**
     * Limpa o painel de informações
     */
    function clearInfoPanel() {
        mapInfoBody.innerHTML = `
            <p class="map-placeholder">APROXIME O CURSOR DE UMA ZONA DE COMANDO</p>
        `;
    }
    
    /**
     * Ativa uma zona do mapa
     */
    function activateZone(zoneElement) {
        // Desativa zona anterior
        if (activeZone) {
            activeZone.classList.remove('active-zone');
        }
        
        // Ativa nova zona
        zoneElement.classList.add('active-zone');
        activeZone = zoneElement;
        
        // Atualiza painel
        updateInfoPanel(zoneElement);
        
        // Efeito de pulso no SVG
        const rect = zoneElement.querySelector('rect');
        if (rect) {
            const originalFill = rect.getAttribute('fill');
            rect.setAttribute('fill', 'rgba(139, 26, 26, 0.6)');
            setTimeout(() => {
                if (activeZone === zoneElement) {
                    rect.setAttribute('fill', 'rgba(139, 26, 26, 0.5)');
                }
            }, 300);
        }
    }
    
    /**
     * Desativa a zona ativa
     */
    function deactivateZone() {
        if (activeZone) {
            activeZone.classList.remove('active-zone');
            const rect = activeZone.querySelector('rect');
            if (rect) {
                rect.setAttribute('fill', 'rgba(60, 80, 40, 0.4)');
            }
            activeZone = null;
        }
        clearInfoPanel();
    }
    
    // Eventos para cada zona do mapa
    cmZones.forEach(zone => {
        // Mouse events
        zone.addEventListener('mouseenter', function() {
            activateZone(this);
        });
        
        zone.addEventListener('mouseleave', function() {
            // Pequeno delay para evitar flicker
            setTimeout(() => {
                if (!zone.matches(':hover')) {
                    deactivateZone();
                }
            }, 100);
        });
        
        zone.addEventListener('click', function() {
            // Mantém a zona ativa após clique
            activateZone(this);
            
            // Efeito de confirmação
            const dot = this.querySelector('.cm-dot');
            if (dot) {
                dot.setAttribute('r', '8');
                setTimeout(() => {
                    dot.setAttribute('r', '3');
                }, 300);
            }
        });
        
        // Touch events para mobile
        zone.addEventListener('touchstart', function(e) {
            e.preventDefault();
            activateZone(this);
        });
        
        zone.addEventListener('touchend', function() {
            setTimeout(deactivateZone, 3000);
        });
        
        // Acessibilidade
        zone.setAttribute('tabindex', '0');
        zone.setAttribute('role', 'button');
        zone.setAttribute('aria-label', zone.getAttribute('data-name') || 'Comando Militar');
        
        zone.addEventListener('focus', function() {
            activateZone(this);
        });
        
        zone.addEventListener('blur', function() {
            deactivateZone();
        });
        
        zone.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                activateZone(this);
            }
        });
    });
    
    // Fecha painel ao clicar fora do mapa
    document.addEventListener('click', function(e) {
        const mapContainer = document.querySelector('.map-war-container');
        if (mapContainer && !mapContainer.contains(e.target)) {
            deactivateZone();
        }
    });
}

// ============================================
// 4. TIMELINE DE FORMAÇÃO COM SCROLL
// ============================================
function initTimeline() {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    const progressBar = document.getElementById('timelineProgress');
    
    if (!timelineNodes.length) {
        console.warn('[GORRO PESADO] Timeline: Nós não encontrados');
        return;
    }
    
    let ticking = false;
    
    /**
     * Atualiza a barra de progresso e revela itens
     */
    function updateTimeline() {
        const windowHeight = window.innerHeight;
        const timelineContainer = document.querySelector('.timeline-war');
        
        if (!timelineContainer) return;
        
        const containerTop = timelineContainer.getBoundingClientRect().top;
        const containerHeight = timelineContainer.offsetHeight;
        
        // Atualiza barra de progresso
        if (progressBar) {
            const scrollProgress = Math.max(0, Math.min(1, 
                (windowHeight - containerTop) / (containerHeight + windowHeight)
            ));
            progressBar.style.height = (scrollProgress * 100) + '%';
        }
        
        // Revela itens da timeline
        timelineNodes.forEach((node, index) => {
            const rect = node.getBoundingClientRect();
            const nodeMiddle = rect.top + rect.height / 2;
            
            if (nodeMiddle < windowHeight * 0.85 && nodeMiddle > -rect.height * 0.5) {
                node.classList.add('reveal');
                
                // Delay em cascata
                node.style.transitionDelay = (index * 0.1) + 's';
            }
        });
    }
    
    /**
     * Handler de scroll otimizado
     */
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateTimeline();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    // Evento de scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Verificação inicial
    setTimeout(updateTimeline, 300);
    
    // Re-verifica em resize
    window.addEventListener('resize', updateTimeline);
    
    // Re-verifica quando muda de seção
    document.addEventListener('sectionChanged', () => {
        setTimeout(updateTimeline, 400);
    });
}

// ============================================
// 5. GALERIA - ACERVO PESADO (ARRASQUE PARA VIRAR)
// ============================================
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryItems.length) {
        console.warn('[GORRO PESADO] Galeria: Itens não encontrados');
        return;
    }
    
    /**
     * Configura interações de arraste para cada item
     */
    galleryItems.forEach((item, index) => {
        const flipper = item.querySelector('.gallery-flipper');
        if (!flipper) return;
        
        let startX = 0;
        let startY = 0;
        let isDragging = false;
        let hasMoved = false;
        let currentRotation = 0;
        
        const DRAG_THRESHOLD = 40;
        
        // ===== MOUSE EVENTS =====
        flipper.addEventListener('mousedown', function(e) {
            startX = e.clientX;
            startY = e.clientY;
            isDragging = true;
            hasMoved = false;
            
            // Remove transição durante arraste
            flipper.style.transition = 'none';
            
            // Se já estiver virado, começa de 180
            currentRotation = item.classList.contains('flipped') ? 180 : 0;
            
            e.preventDefault();
        });
        
        document.addEventListener('mousemove', function(e) {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                hasMoved = true;
            }
            
            // Rotação baseada no arraste horizontal
            const rotationAmount = deltaX * 0.8;
            let newRotation = currentRotation + rotationAmount;
            
            // Limita a rotação
            newRotation = Math.max(-30, Math.min(210, newRotation));
            
            flipper.style.transform = `rotateY(${newRotation}deg)`;
        });
        
        document.addEventListener('mouseup', function(e) {
            if (!isDragging) return;
            isDragging = false;
            
            const deltaX = e.clientX - startX;
            
            // Restaura transição
            flipper.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Decide se faz flip
            if (hasMoved && Math.abs(deltaX) > DRAG_THRESHOLD) {
                if (deltaX > 0 && !item.classList.contains('flipped')) {
                    // Arrastou para direita - revela
                    item.classList.add('flipped');
                    flipper.style.transform = 'rotateY(180deg)';
                    playFlipSound();
                } else if (deltaX < 0 && item.classList.contains('flipped')) {
                    // Arrastou para esquerda - esconde
                    item.classList.remove('flipped');
                    flipper.style.transform = 'rotateY(0deg)';
                    playFlipSound();
                } else {
                    // Retorna ao estado original
                    flipper.style.transform = item.classList.contains('flipped') ? 
                        'rotateY(180deg)' : 'rotateY(0deg)';
                }
            } else {
                // Retorna ao estado original
                flipper.style.transform = item.classList.contains('flipped') ? 
                    'rotateY(180deg)' : 'rotateY(0deg)';
            }
        });
        
        // ===== TOUCH EVENTS PARA MOBILE =====
        flipper.addEventListener('touchstart', function(e) {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            isDragging = true;
            hasMoved = false;
            flipper.style.transition = 'none';
            currentRotation = item.classList.contains('flipped') ? 180 : 0;
        }, { passive: false });
        
        flipper.addEventListener('touchmove', function(e) {
            if (!isDragging) return;
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            
            if (Math.abs(deltaX) > 5 || Math.abs(deltaY) > 5) {
                hasMoved = true;
                if (Math.abs(deltaX) > Math.abs(deltaY)) {
                    e.preventDefault(); // Previne scroll apenas em arraste horizontal
                }
            }
            
            const rotationAmount = deltaX * 0.8;
            let newRotation = currentRotation + rotationAmount;
            newRotation = Math.max(-30, Math.min(210, newRotation));
            
            flipper.style.transform = `rotateY(${newRotation}deg)`;
        }, { passive: false });
        
        flipper.addEventListener('touchend', function(e) {
            if (!isDragging) return;
            isDragging = false;
            
            const touch = e.changedTouches[0];
            const deltaX = touch.clientX - startX;
            
            flipper.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (hasMoved && Math.abs(deltaX) > DRAG_THRESHOLD) {
                if (deltaX > 0 && !item.classList.contains('flipped')) {
                    item.classList.add('flipped');
                    flipper.style.transform = 'rotateY(180deg)';
                    playFlipSound();
                } else if (deltaX < 0 && item.classList.contains('flipped')) {
                    item.classList.remove('flipped');
                    flipper.style.transform = 'rotateY(0deg)';
                    playFlipSound();
                } else {
                    flipper.style.transform = item.classList.contains('flipped') ? 
                        'rotateY(180deg)' : 'rotateY(0deg)';
                }
            } else {
                flipper.style.transform = item.classList.contains('flipped') ? 
                    'rotateY(180deg)' : 'rotateY(0deg)';
            }
        });
        
        // ===== DUPLO CLIQUE PARA FLIP RÁPIDO =====
        flipper.addEventListener('dblclick', function(e) {
            e.preventDefault();
            item.classList.toggle('flipped');
            flipper.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            flipper.style.transform = item.classList.contains('flipped') ? 
                'rotateY(180deg)' : 'rotateY(0deg)';
            playFlipSound();
        });
        
        // ===== TECLADO =====
        flipper.setAttribute('tabindex', '0');
        flipper.setAttribute('role', 'button');
        flipper.setAttribute('aria-label', 'Imagem tática - arraste para revelar');
        
        flipper.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.classList.toggle('flipped');
                flipper.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                flipper.style.transform = item.classList.contains('flipped') ? 
                    'rotateY(180deg)' : 'rotateY(0deg)';
                playFlipSound();
            }
        });
    });
    
    /**
     * Feedback sonoro visual (simulado)
     */
    function playFlipSound() {
        // Cria um flash visual como feedback
        const flash = document.createElement('div');
        flash.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            width: 40px;
            height: 40px;
            border: 3px solid #d4b020;
            transform: translate(-50%, -50%) rotate(45deg);
            pointer-events: none;
            z-index: 300;
            animation: flipFlash 0.4s ease-out forwards;
        `;
        
        document.body.appendChild(flash);
        
        setTimeout(() => {
            flash.remove();
        }, 400);
    }
}

// ============================================
// 6. GLITCH NOS DESAFIOS
// ============================================
function initDesafiosGlitch() {
    const desafioCards = document.querySelectorAll('[data-glitch]');
    
    if (!desafioCards.length) {
        console.warn('[GORRO PESADO] Desafios: Cards não encontrados');
        return;
    }
    
    let glitchInterval;
    
    /**
     * Aplica efeito de glitch em um card
     */
    function glitchCard(card) {
        card.classList.add('glitch-active');
        
        // Texto glitch
        const originalText = card.querySelector('p').textContent;
        const glitchChars = '!@#$%&*()_+-=[]{}|;:,.<>?/';
        
        // Substitui alguns caracteres aleatoriamente
        if (card.querySelector('p')) {
            const p = card.querySelector('p');
            let glitchedText = '';
            for (let i = 0; i < originalText.length; i++) {
                if (Math.random() < 0.08) {
                    glitchedText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                } else {
                    glitchedText += originalText[i];
                }
            }
            p.textContent = glitchedText;
            
            // Restaura texto original
            setTimeout(() => {
                p.textContent = originalText;
            }, 200);
        }
        
        // Remove classe após animação
        setTimeout(() => {
            card.classList.remove('glitch-active');
        }, 400);
    }
    
    /**
     * Executa glitch em todos os cards com stagger
     */
    function glitchAllCards() {
        desafioCards.forEach((card, index) => {
            setTimeout(() => {
                glitchCard(card);
            }, index * 150);
        });
    }
    
    /**
     * Inicia ciclo automático de glitch
     */
    function startGlitchCycle() {
        if (glitchInterval) clearInterval(glitchInterval);
        
        // Primeiro glitch após 4 segundos
        setTimeout(() => {
            glitchAllCards();
            // Ciclo a cada 6 segundos
            glitchInterval = setInterval(glitchAllCards, 6000);
        }, 4000);
    }
    
    /**
     * Para ciclo de glitch
     */
    function stopGlitchCycle() {
        if (glitchInterval) {
            clearInterval(glitchInterval);
            glitchInterval = null;
        }
    }
    
    // Inicia ciclo
    startGlitchCycle();
    
    // Pausa quando página não está visível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopGlitchCycle();
        } else {
            startGlitchCycle();
        }
    });
    
    // Hover nos cards
    desafioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '8px 12px 0 rgba(0,0,0,0.7)';
            this.style.borderColor = '#d4b020';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '8px 8px 0 rgba(0,0,0,0.6)';
            this.style.borderColor = '#6b8c42';
        });
    });
}

// ============================================
// 7. CONSOLE DE STATUS AO VIVO
// ============================================
function initStatusConsole() {
    const consoleLine1 = document.getElementById('consoleLine1');
    const consoleLine2 = document.getElementById('consoleLine2');
    
    if (!consoleLine1 || !consoleLine2) {
        console.warn('[GORRO PESADO] Console: Elementos não encontrados');
        return;
    }
    
    /**
     * Mensagens do console tático
     */
    const messages = [
        '> SISCOMIS: Link Estável - Conexão Estabelecida',
        '> Bda Inf Pqdt: Prontidão 48h - Status Verde',
        '> CAvEx: Mobilidade Tática - Alerta 3',
        '> C Op Esp: Canal Seguro - Operações Normais',
        '> CIGS: Monitoramento de Selva - Ativo',
        '> PPIF: Vigilância de Fronteira - Setor Norte',
        '> COTER: Comando Geral - Todas Unidades Prontas',
        '> CMA: Fronteira Amazônica - Patrulha em Curso',
        '> CML: Forças Estratégicas - Posicionadas',
        '> CMSE: Estrutura Industrial - Operacional',
        '> CMS: Fronteira Sul - Monitoramento Contínuo',
        '> CMO: Pantanal - Destacamento Ativo',
        '> CMN: Amazônia Oriental - Defesa Reforçada',
        '> CMNE: Segurança Regional - GLO Disponível',
        '> CMP: Capital Federal - Proteção Máxima',
        '> CIOpEsp: Operadores - Adestramento Concluído',
        '> ESA: Formação de Sargentos - Em Andamento',
        '> AMAN: Cadetes - Instrução Tática',
        '> COM: Criptografia AES-256 - Ativa',
        '> LOG: Suprimentos - Níveis Adequados',
        '> MED: Evacuação Aeromédica - Pronta',
        '> INTEL: Relatórios Atualizados - Última Hora',
        '> SAT: Link Satélite - Sinal Ótimo',
        '> DRONE: Reconhecimento - Em Operação'
    ];
    
    let currentLine1Index = 0;
    let currentLine2Index = 12;
    let charIndex1 = 0;
    let charIndex2 = 0;
    let isTyping1 = false;
    let isTyping2 = false;
    
    /**
     * Efeito de digitação máquina de escrever
     */
    function typeMessage(lineElement, message, callback) {
        let index = 0;
        lineElement.textContent = '> _';
        
        function type() {
            if (index < message.length) {
                lineElement.textContent = message.substring(0, index + 1) + '_';
                index++;
                setTimeout(type, 30 + Math.random() * 20);
            } else {
                lineElement.textContent = message;
                if (callback) {
                    setTimeout(callback, 2500 + Math.random() * 1500);
                }
            }
        }
        
        type();
    }
    
    /**
     * Ciclo de mensagens para uma linha
     */
    function cycleLine(lineElement, messageIndexRef, isTypingRef, otherLineElement, otherMessageIndexRef) {
        return function executeCycle() {
            if (isTypingRef) return;
            isTypingRef = true;
            
            const message = messages[messageIndexRef];
            
            // Evita mesma mensagem que a outra linha
            if (messageIndexRef === otherMessageIndexRef) {
                messageIndexRef = (messageIndexRef + 1) % messages.length;
            }
            
            typeMessage(lineElement, message, () => {
                isTypingRef = false;
                messageIndexRef = (messageIndexRef + 1) % messages.length;
                executeCycle();
            });
        };
    }
    
    // Inicia as duas linhas
    const cycle1 = cycleLine(consoleLine1, currentLine1Index, isTyping1, consoleLine2, currentLine2Index);
    const cycle2 = cycleLine(consoleLine2, currentLine2Index, isTyping2, consoleLine1, currentLine1Index);
    
    setTimeout(cycle1, 500);
    setTimeout(cycle2, 2500);
}

// ============================================
// 8. CANVAS DE PARTÍCULAS DE POEIRA
// ============================================
function initDustCanvas() {
    const canvas = document.getElementById('dustCanvas');
    if (!canvas) {
        console.warn('[GORRO PESADO] Dust Canvas: Não encontrado');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    const MAX_PARTICLES = 40;
    
    /**
     * Redimensiona canvas
     */
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    /**
     * Cria partícula de poeira
     */
    function createParticle() {
        return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3 - 0.2, // Tendência a subir
            opacity: Math.random() * 0.3 + 0.1,
            life: Math.random() * 300 + 200,
            maxLife: 500
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
     * Anima partículas
     */
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle, index) => {
            // Movimento
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life--;
            
            // Wrap horizontal
            if (particle.x < -10) particle.x = canvas.width + 10;
            if (particle.x > canvas.width + 10) particle.x = -10;
            
            // Respawn quando sai da tela ou vida acaba
            if (particle.y < -20 || particle.y > canvas.height + 20 || particle.life <= 0) {
                particles[index] = createParticle();
                particles[index].y = canvas.height + 10; // Começa de baixo
                return;
            }
            
            // Opacidade baseada na vida
            const lifeRatio = particle.life / particle.maxLife;
            const currentOpacity = particle.opacity * lifeRatio;
            
            // Desenha partícula
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 125, 107, ${currentOpacity})`;
            ctx.fill();
            
            // Rastro sutil
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(
                particle.x - particle.speedX * 10,
                particle.y - particle.speedY * 10
            );
            ctx.strokeStyle = `rgba(139, 125, 107, ${currentOpacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Inicialização
    resize();
    initParticles();
    animate();
    
    // Redimensionamento
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            resize();
            initParticles();
        }, 300);
    });
    
    // Pausa quando invisível
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        } else {
            if (!animationId) {
                animate();
            }
        }
    });
}

// ============================================
// 9. LIGHTBOX PARA IMAGENS
// ============================================
function initLightbox() {
    const lightbox = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxDesc = document.getElementById('lightboxDesc');
    const lightboxClose = document.querySelector('.lightbox-close');
    const galleryImages = document.querySelectorAll('.gallery-front img');
    
    if (!lightbox || !lightboxImg) return;
    
    /**
     * Abre lightbox
     */
    function openLightbox(imgElement) {
        const galleryItem = imgElement.closest('.gallery-item');
        const desc = galleryItem ? galleryItem.getAttribute('data-desc') : '';
        
        lightboxImg.src = imgElement.src;
        lightboxImg.alt = imgElement.alt;
        if (lightboxDesc) {
            lightboxDesc.textContent = desc;
        }
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Fecha lightbox
     */
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }
    
    // Eventos nas imagens da galeria
    galleryImages.forEach(img => {
        img.addEventListener('click', function(e) {
            e.stopPropagation();
            openLightbox(this);
        });
        
        img.style.cursor = 'zoom-in';
    });
    
    // Também nas imagens fallback
    document.querySelectorAll('.gallery-fallback').forEach(fallback => {
        fallback.addEventListener('click', function(e) {
            e.stopPropagation();
            // Não abre lightbox para fallback
        });
    });
    
    // Fechar lightbox
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Tecla ESC para fechar
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ============================================
// 10. BOTÕES RÁPIDOS DO HEADER
// ============================================
function initQuickButtons() {
    const qlBtns = document.querySelectorAll('.ql-btn');
    
    qlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            switch(action) {
                case 'alerta':
                    triggerAlertEffect();
                    break;
                case 'coms':
                    showComsStatus();
                    break;
                case 'info':
                    scrollToInfo();
                    break;
            }
        });
    });
    
    /**
     * Efeito de alerta
     */
    function triggerAlertEffect() {
        const statusStrip = document.querySelector('.status-strip');
        if (statusStrip) {
            statusStrip.style.background = 'rgba(139, 26, 26, 0.6)';
            statusStrip.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                statusStrip.style.background = 'rgba(139, 26, 26, 0.2)';
                statusStrip.style.transform = 'scale(1)';
            }, 500);
        }
        
        // Pisca a tela
        const overlay = document.querySelector('.vignette-overlay');
        if (overlay) {
            overlay.style.background = 'radial-gradient(ellipse at center, transparent 50%, rgba(139, 26, 26, 0.4) 100%)';
            setTimeout(() => {
                overlay.style.background = 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)';
            }, 300);
        }
    }
    
    /**
     * Status de comunicações
     */
    function showComsStatus() {
        const consoleDiv = document.getElementById('statusConsole');
        if (consoleDiv) {
            consoleDiv.style.transform = 'scale(1.05)';
            consoleDiv.style.borderColor = '#d4b020';
            
            setTimeout(() => {
                consoleDiv.style.transform = 'scale(1)';
                consoleDiv.style.borderColor = '#6b8c42';
            }, 400);
        }
    }
    
    /**
     * Scroll para informações
     */
    function scrollToInfo() {
        const footer = document.querySelector('.war-footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// ============================================
// 11. COMANDOS DE TECLADO
// ============================================
function initKeyboardCommands() {
    document.addEventListener('keydown', function(e) {
        // Ignora inputs
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || 
            e.target.isContentEditable) return;
        
        switch(e.key) {
            case '1':
                navigateTo('estrategicas');
                break;
            case '2':
                navigateTo('comandos');
                break;
            case '3':
                navigateTo('formacao');
                break;
            case '4':
                navigateTo('galeria');
                break;
            case '5':
                navigateTo('desafios');
                break;
            case 'f':
            case 'F':
                if (e.ctrlKey) {
                    e.preventDefault();
                    toggleFullscreen();
                }
                break;
            case 'Escape':
                closeAllModals();
                break;
            case 'ArrowUp':
                e.preventDefault();
                window.scrollBy({ top: -100, behavior: 'smooth' });
                break;
            case 'ArrowDown':
                e.preventDefault();
                window.scrollBy({ top: 100, behavior: 'smooth' });
                break;
        }
    });
    
    function navigateTo(section) {
        const tab = document.querySelector(`.muscle-tab[data-target="${section}"]`);
        if (tab) {
            tab.click();
        }
    }
    
    function toggleFullscreen() {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen().catch(() => {});
        }
    }
    
    function closeAllModals() {
        const lightbox = document.getElementById('lightboxOverlay');
        if (lightbox && lightbox.classList.contains('active')) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}

// ============================================
// 12. UTILITÁRIOS GLOBAIS
// ============================================
/**
 * Trigger screen shake global
 */
window.triggerScreenShake = function(intensity = 3) {
    const container = document.querySelector('.war-container');
    if (!container) return;
    
    const shakeSequence = [
        { x: intensity, y: 0 },
        { x: -intensity, y: 0 },
        { x: intensity / 2, y: -intensity / 2 },
        { x: -intensity / 2, y: intensity / 2 },
        { x: 0, y: 0 }
    ];
    
    let delay = 0;
    shakeSequence.forEach(pos => {
        setTimeout(() => {
            container.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        }, delay);
        delay += 40;
    });
};

/**
 * Notificação tática
 */
window.tacticalNotify = function(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 500;
        padding: 15px 25px;
        font-family: 'Oswald', sans-serif;
        font-size: 0.85rem;
        letter-spacing: 2px;
        background: #1a1a14;
        border: 2px solid ${type === 'alert' ? '#8b1a1a' : '#6b8c42'};
        color: ${type === 'alert' ? '#ff8888' : '#a89880'};
        box-shadow: 8px 8px 0 rgba(0,0,0,0.6);
        animation: slideInRight 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3500);
};

// ============================================
// 13. HANDLER DE ERROS
// ============================================
window.addEventListener('error', function(e) {
    console.error('[GORRO PESADO ERRO]', e.message, 'em', e.filename, 'linha', e.lineno);
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('[GORRO PESADO ERRO DE PROMESSA]', e.reason);
});

// ============================================
// 14. API GLOBAL
// ============================================
window.GORROPESADO = {
    navigate: function(section) {
        const tab = document.querySelector(`.muscle-tab[data-target="${section}"]`);
        if (tab) tab.click();
    },
    shake: function(intensity) {
        window.triggerScreenShake(intensity || 3);
    },
    notify: function(message, type) {
        window.tacticalNotify(message, type || 'info');
    },
    flipCard: function(index) {
        const cards = document.querySelectorAll('.force-card');
        if (cards[index]) {
            cards[index].classList.toggle('flipped');
        }
    }
};

// ============================================
// ANIMAÇÕES CSS INJETADAS DINAMICAMENTE
// ============================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes rippleEffect {
        0% { width: 0; height: 0; opacity: 1; }
        100% { width: 200px; height: 200px; opacity: 0; }
    }
    
    @keyframes flipFlash {
        0% { width: 40px; height: 40px; opacity: 1; border-color: #d4b020; }
        100% { width: 120px; height: 120px; opacity: 0; border-color: transparent; }
    }
    
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(dynamicStyles);

// ============================================
// LOG DE INICIALIZAÇÃO
// ============================================
console.log('%c' + '═'.repeat(50), 'color: #d4b020;');
console.log('%c GORRO PESADO - SISTEMA OPERACIONAL ', 'color: #d4b020; font-weight: bold; font-size: 18px;');
console.log('%c FORÇAS DE EMPREGO ESTRATÉGICO ', 'color: #6b8c42; font-weight: bold; font-size: 14px;');
console.log('%c EXÉRCITO BRASILEIRO - PRONTIDÃO TOTAL ', 'color: #a89880; font-weight: bold;');
console.log('%c' + '═'.repeat(50), 'color: #d4b020;');
