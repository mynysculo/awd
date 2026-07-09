/**
 * SISTEMA TÁTICO DE INTERATIVIDADE - EXÉRCITO BRASILEIRO (SIMULADO)
 * Desenvolvido em JS Puro (Vanilla) sob a escuta DOMContentLoaded.
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // BANCO DE DADOS OFICIAIS (Fonte Estrita do Prompt)
    // ==========================================================================
    const DB_COMANDOS = {
        CMA: {
            nome: "Comando Militar da Amazônia",
            sigla: "CMA",
            sede: "Manaus (AM)",
            abrangencia: "Presença estratégica contínua na faixa de fronteira amazônica."
        },
        CMN: {
            nome: "Comando Militar do Norte",
            sigla: "CMN",
            sede: "Belém (PA)",
            abrangencia: "Operações dedicadas à Defesa da Amazônia Oriental."
        },
        CMNE: {
            nome: "Comando Militar do Nordeste",
            sigla: "CMNE",
            sede: "Recife (PE)",
            abrangencia: "Segurança estratégica regional e apoio a missões de GLO."
        },
        CMO: {
            nome: "Comando Militar do Oeste",
            sigla: "CMO",
            sede: "Campo Grande (MS)",
            abrangencia: "Salvaguarda do Pantanal e defesa perimetral da fronteira oeste."
        },
        CMP: {
            nome: "Comando Militar do Planalto",
            sigla: "CMP",
            sede: "Brasília (DF)",
            abrangencia: "Proteção da capital federal e das áreas territoriais de entorno."
        },
        CML: {
            nome: "Comando Militar do Leste",
            sigla: "CML",
            sede: "Rio de Janeiro (RJ)",
            abrangencia: "Centro de poder e sede operacional das Forças de Emprego Estratégico."
        },
        CMSE: {
            nome: "Comando Militar do Sudeste",
            sigla: "CMSE",
            sede: "São Paulo (SP)",
            abrangencia: "Concentração do maior efetivo e vinculação à estrutura industrial de defesa."
        },
        CMS: {
            nome: "Comando Militar do Sul",
            sigla: "CMS",
            sede: "Porto Alegre (RS)",
            abrangencia: "Defesa da fronteira sul e manutenção da robusta tradição blindada."
        }
    };

    // ==========================================================================
    // FUNCIONALIDADE 1: GERENCIAMENTO E REVELAÇÃO DO MAPA INTERATIVO
    // ==========================================================================
    const mapRegions = document.querySelectorAll(".map-region");
    const mapPanel = document.getElementById("map-panel");
    const lblComando = document.getElementById("lbl-comando");
    const lblSigla = document.getElementById("lbl-sigla");
    const lblSede = document.getElementById("lbl-sede");
    const lblAbrangencia = document.getElementById("lbl-abrangencia");

    mapRegions.forEach(region => {
        region.addEventListener("mouseenter", (e) => {
            const comandoId = e.target.getAttribute("data-comando");
            const dados = DB_COMANDOS[comandoId];
            
            if (dados) {
                // Ativa o estado holográfico do painel
                mapPanel.classList.add("active-intel");
                mapPanel.querySelector(".panel-header").textContent = "INTERCEPÇÃO DE SINAL ADQUIRIDA";
                
                // Transmite os dados estruturados para o DOM
                lblComando.textContent = dados.nome;
                lblSigla.textContent = dados.sigla;
                lblSede.textContent = dados.sede;
                lblAbrangencia.textContent = dados.abrangencia;
            }
        });

        region.addEventListener("mouseleave", () => {
            // Retorna o painel para o estado padrão de escuta ativa
            mapPanel.classList.remove("active-intel");
            mapPanel.querySelector(".panel-header").textContent = "AGUARDANDO SELEÇÃO DE VETOR...";
            
            lblComando.textContent = "-";
            lblSigla.textContent = "-";
            lblSede.textContent = "-";
            lblAbrangencia.textContent = "-";
        });
    });

    // ==========================================================================
    // FUNCIONALIDADE 2: NAV ABAS COM TRANSICAO SCANLINE & FLICKER
    // ==========================================================================
    const tabTriggers = document.querySelectorAll(".tab-trigger");
    const tabContents = document.querySelectorAll(".tab-content");
    const tabScanner = document.getElementById("tab-scanner");
    let isTabTransitioning = false;

    tabTriggers.forEach(trigger => {
        trigger.addEventListener("click", function() {
            // Bloqueia cliques simultâneos rápidos para evitar quebra de animação
            if (isTabTransitioning || this.classList.contains("active")) return;
            isTabTransitioning = true;

            const targetTabId = this.getAttribute("data-tab");

            // Dispara efeito visual de varredura vertical na caixa das abas
            tabScanner.classList.add("scan-triggered");

            // Aguarda o meio da varredura para trocar o conteúdo de forma invisível
            setTimeout(() => {
                // Remove estados anteriores
                tabTriggers.forEach(t => {
                    t.classList.remove("active");
                    t.setAttribute("aria-selected", "false");
                });
                tabContents.forEach(c => c.classList.remove("active"));

                // Ativa a nova seleção
                this.classList.add("active");
                this.setAttribute("aria-selected", "true");
                const activeContent = document.getElementById(targetTabId);
                activeContent.classList.add("active");
            }, 200);

            // Finaliza o ciclo de transição removendo a classe do scanner
            setTimeout(() => {
                tabScanner.classList.remove("scan-triggered");
                isTabTransitioning = false;
            }, 400);
        });
    });

    // ==========================================================================
    // FUNCIONALIDADE 3: LINHA DO TEMPO SCANNER (MONITORAMENTO DE ROLAGEM)
    // ==========================================================================
    const timelineItems = document.querySelectorAll(".timeline-item");
    const timelinePointer = document.getElementById("timeline-pointer");
    const timelineContainer = document.querySelector(".timeline-container");

    function processTimelineScanner() {
        if (!timelineContainer) return;

        const containerRect = timelineContainer.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // O ponto de varredura ideal do scanner fica no centro da tela
        const triggerLine = viewportHeight / 2;

        // Calcula a posição relativa do cursor marcador na linha
        let pointerOffset = triggerLine - containerRect.top;
        // Limita o cursor dentro das margens reais do container físico da linha
        if (pointerOffset < 0) pointerOffset = 0;
        if (pointerOffset > containerRect.height) pointerOffset = containerRect.height;
        
        timelinePointer.style.top = `${pointerOffset}px`;

        // Avalia a colisão do scanner com cada card de instrução
        timelineItems.forEach(item => {
            const itemRect = item.getBoundingClientRect();
            // Ativa o elemento assim que o centro da tela ultrapassar o topo do card
            if (itemRect.top < triggerLine) {
                item.classList.add("scanned-active");
            } else {
                item.classList.remove("scanned-active");
            }
        });
    }

    // Vincula o processamento ao scroll e ao redimensionamento do painel
    window.addEventListener("scroll", processTimelineScanner);
    window.addEventListener("resize", processTimelineScanner);
    // Executa uma chamada inicial para estabelecer posições vigentes
    processTimelineScanner();

    // ==========================================================================
    // FUNCIONALIDADE 4: MONITOR DE DESAFIOS AUTOMÁTICO COM GLITCH
    // ==========================================================================
    const challengeCards = document.querySelectorAll("[data-glitch-card='true']");
    
    function triggerRandomGlitch() {
        if (challengeCards.length === 0) return;
        
        // Sorteia um índice dos cards disponíveis para sofrer a instabilidade
        const randomIndex = Math.floor(Math.random() * challengeCards.length);
        const selectedCard = challengeCards[randomIndex];
        
        // Insere a classe de animação de ruído CSS
        selectedCard.classList.add("glitch-visual-active");
        
        // Remove a classe após a conclusão exata da animação
        setTimeout(() => {
            selectedCard.classList.remove("glitch-visual-active");
        }, 260);
    }

    // Intervalo cíclico rígido de 5 segundos determinado nos requisitos
    setInterval(triggerRandomGlitch, 5000);

    // ==========================================================================
    // FUNCIONALIDADE 5: CONSOLE DE STATUS COM TEXTO EM LOOP (DIGITAÇÃO)
    // ==========================================================================
    const consoleStrings = [
        "SISCOMIS: Link Verde estabelecido...",
        "Bda Inf Pqdt: Prontidão operacional 48h...",
        "Conexão com CIGS: Estável e operacional...",
        "COTER: Monitoramento estratégico ativo...",
        "PPIF: Patrulhamento de fronteira em andamento..."
    ];

    const consoleOutput = document.getElementById("console-output");
    let currentStringIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 60;

    function executionConsoleLoop() {
        const fullText = consoleStrings[currentStringIndex];

        if (!isDeleting) {
            // Modo de digitação progressiva
            consoleOutput.textContent = fullText.substring(0, currentCharIndex + 1);
            currentCharIndex++;

            if (currentCharIndex === fullText.length) {
                // Texto completo exibido, aguarda pausa de leitura antes de apagar
                isDeleting = true;
                typingSpeed = 3000; // Tempo de permanência do texto em tela
            } else {
                typingSpeed = 60; // Velocidade padrão por caractere
            }
        } else {
            // Modo de deleção progressiva
            consoleOutput.textContent = fullText.substring(0, currentCharIndex - 1);
            currentCharIndex--;

            if (currentCharIndex === 0) {
                isDeleting = false;
                // Avança para o próximo índice do array de transmissão
                currentStringIndex = (currentStringIndex + 1) % consoleStrings.length;
                typingSpeed = 400; // Pequena pausa antes de iniciar nova frase
            } else {
                typingSpeed = 30; // Velocidade acelerada para apagar texto
            }
        }

        setTimeout(executionConsoleLoop, typingSpeed);
    }

    // Inicializa o laço as síncrono do terminal
    setTimeout(executionConsoleLoop, 1000);
});
