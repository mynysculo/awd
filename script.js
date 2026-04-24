/* ============================================ */
/* AGRO FORTE · SCRIPT.JS · 4500+ LINHAS       */
/* ANIMAÇÕES · JOGO 3D · CANVAS · CURSOR · IA  */
/* ============================================ */

(function() {
    'use strict';
    
    const CONFIG = {
        preloaderDuration: 2800,
        cursorLerp: 0.085,
        particles: 150,
        connectionDist: 140,
        counterSpeed: 45
    };
    
    const State = {
        mx: 0, my: 0, ox: 0, oy: 0, tx: 0, ty: 0,
        isMobile: /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
        loading: true,
        memoryCards: [], flipped: [], matched: 0, attempts: 0, locked: false,
        bestScore: null,
        canvasCtx: null, cw: 0, ch: 0, parts: [], influence: {x:0, y:0}
    };
    
    // ===== BANCO DE DADOS (ADICIONADO) =====
    const INFO = {
        'logo':{t:'🌱 AgroForte 5.0',d:'Líder em agricultura regenerativa. Certificada B Corp, Carbon Trust e Rainforest Alliance.',s:[{v:'+580',l:'Fazendas'},{v:'12',l:'Países'}]},
        'badge':{t:'🏷️ Versão 5.0',d:'Plataforma com IA preditiva, blockchain e gêmeos digitais de cada hectare.',s:[{v:'99.9%',l:'Uptime'}]},
        'nav-home':{t:'🏠 Visão Geral',d:'Descubra como estamos transformando a agricultura com práticas regenerativas.',l:'#home'},
        'nav-tecnologias':{t:'🔬 Tecnologias',d:'Satélites, drones, robôs e biotecnologia revolucionando o campo.',l:'#tecnologias'},
        'nav-impacto':{t:'📊 Impacto',d:'Dados auditados de 500+ propriedades.',l:'#impacto'},
        'nav-jogo':{t:'🎮 Jogo Verde',d:'Aprenda sobre sustentabilidade de forma divertida!',l:'#jogo'},
        'nav-cases':{t:'🏆 Cases',d:'Histórias reais de produtores que transformaram suas propriedades.',l:'#cases'},
        'nav-contato':{t:'📬 Contato',d:'Newsletter com práticas sustentáveis.',l:'#contato'},
        'badge-hero':{t:'🌍 AGRO 5.0',d:'A quinta revolução agrícola. IA, IoT, blockchain e biotecnologia integradas.',s:[{v:'5ª',l:'Revolução'}]},
        'title-equilibrio':{t:'⚖️ Equilíbrio',d:'Produzir alimentos de qualidade enquanto restauramos ecossistemas inteiros.'},
        'title-producao':{t:'🌽 Produção',d:'Aumentamos produtividade em 42% sem expandir a área plantada.'},
        'title-meioambiente':{t:'🌳 Meio Ambiente',d:'Cada hectare sequestra 3x mais carbono que agricultura convencional.'},
        'hero-description':{t:'💚 Nossa Missão',d:'Unimos IA, biotecnologia e sabedoria ancestral para alimentar o planeta.'},
        'btn-jogar':{t:'🎮 Memória Verde',d:'Teste seus conhecimentos sobre agricultura sustentável!',l:'#jogo'},
        'btn-impacto':{t:'📊 Descobrir Impacto',d:'Veja números reais de 500+ propriedades.',l:'#impacto'},
        'btn-cases':{t:'🏆 Ver Cases',d:'Histórias inspiradoras de produtores.',l:'#cases'},
        'stat-co2':{t:'🌫️ -42% CO₂',d:'Redução de emissões com plantio direto e bioinsumos.',s:[{v:'1.250',l:'Mil t/ano'}]},
        'stat-bio':{t:'🦋 +65% Biodiversidade',d:'Corredores ecológicos e fim dos agrotóxicos.',s:[{v:'350+',l:'Espécies'}]},
        'stat-agua':{t:'💧 98% Água Reutilizada',d:'Irrigação inteligente com IoT. Economia de 60%.',s:[{v:'1.280',l:'Mi m³/ano'}]},
        'globe-3d':{t:'🌐 Globo Interativo',d:'Clique nos ícones em órbita para aprender sobre sustentabilidade!',s:[{v:'6',l:'Ícones'}]},
        'orbit-leaf':{t:'🌿 Fotossíntese',d:'Plantas capturam CO₂. Biomassa verde aumentada em 40%.',s:[{v:'+40%',l:'Biomassa'}]},
        'orbit-seed':{t:'🌱 Sementes Crioulas',d:'Banco genético com 2.000+ variedades preservadas.',s:[{v:'2k+',l:'Variedades'}]},
        'orbit-water':{t:'💧 Água',d:'Recurso mais precioso. Irrigação economiza 60%.',s:[{v:'-60%',l:'Consumo'}]},
        'orbit-sun':{t:'☀️ Energia Solar',d:'100% das operações com energia renovável.',s:[{v:'100%',l:'Renovável'}]},
        'orbit-tree':{t:'🌳 Florestas',d:'20% de reserva legal restaurada em cada fazenda.',s:[{v:'20%',l:'Reserva'}]},
        'orbit-rain':{t:'🌧️ Água da Chuva',d:'Sistemas de captação pluvial para irrigação.',s:[{v:'80%',l:'Aproveitamento'}]},
        'hint-globe':{t:'💡 Dica',d:'Clique nos ícones ao redor do globo para aprender!'},
        'scroll-indicator':{t:'📜 Navegação',d:'Role para explorar todas as seções do site.'},
        'section-tech':{t:'🔬 Inovação',d:'Tecnologias de ponta revolucionando o campo.'},
        'tab-satelite':{t:'🛰️ Monitoramento',d:'Satélites e drones com IA. Monitoramento 24/7.',s:[{v:'5cm',l:'Resolução'}]},
        'tab-robo':{t:'🤖 Robótica',d:'Robôs autônomos. Redução de 90% em herbicidas.',s:[{v:'-90%',l:'Herbicidas'}]},
        'tab-bio':{t:'🧬 Biotecnologia',d:'Bioinsumos que regeneram o solo naturalmente.',s:[{v:'100%',l:'Orgânico'}]},
        'tab-iot':{t:'📡 IoT',d:'Sensores inteligentes. Economia de 60% de água.',s:[{v:'-60%',l:'Água'}]},
        'feature-ndvi':{t:'📊 NDVI',d:'Índice de Vegetação. Saúde da planta em tempo real.',s:[{v:'95%',l:'Precisão'}]},
        'feature-pragas':{t:'🐛 Alertas',d:'IA identifica pragas 7 dias antes. Controle biológico.',s:[{v:'7 dias',l:'Antecedência'}]},
        'feature-localizada':{t:'🎯 Precisão',d:'Aplicação localizada reduz insumos em 40%.',s:[{v:'-40%',l:'Insumos'}]},
        'feature-capina':{t:'🌿 Capina Mecânica',d:'Robôs removem ervas daninhas sem herbicidas.',s:[{v:'-100%',l:'Herbicidas'}]},
        'feature-plantio':{t:'🌱 Plantio Direto',d:'Sem revolvimento. Preserva microbiota do solo.',s:[{v:'+40%',l:'Matéria Org.'}]},
        'feature-colheita':{t:'🚜 Colheita Seletiva',d:'Robôs colhem no ponto ideal. 24h de operação.',s:[{v:'24h',l:'Operação'}]},
        'feature-bacterias':{t:'🦠 Bactérias',d:'Fixadoras de nitrogênio. Eliminam fertilizantes.',s:[{v:'-100%',l:'N sintético'}]},
        'feature-fungos':{t:'🍄 Fungos',d:'Ampliam absorção de nutrientes em 700%.',s:[{v:'+700%',l:'Absorção'}]},
        'feature-biocontrole':{t:'🐞 Biocontrole',d:'Inimigos naturais controlam pragas.',s:[{v:'0',l:'Químicos'}]},
        'feature-sensores':{t:'💧 Sensores IoT',d:'Umidade do solo em tempo real.',s:[{v:'-60%',l:'Água'}]},
        'feature-fertirrigacao':{t:'🌿 Fertirrigação',d:'Biofertilizantes aplicados com precisão.',s:[{v:'+30%',l:'Nutrientes'}]},
        'feature-app':{t:'📱 App Mobile',d:'Controle total da irrigação pelo celular.',s:[{v:'24/7',l:'Acesso'}]},
        'visual-drone':{t:'🛸 Drones',d:'Imagens em alta resolução processadas por IA.',s:[{v:'50km²',l:'Cobertura'}]},
        'visual-robo':{t:'🤖 Robôs',d:'100% elétricos. Navegação por GPS e visão.',s:[{v:'100%',l:'Elétrico'}]},
        'visual-bio':{t:'🧪 Laboratório',d:'Produção de microrganismos benéficos.',s:[{v:'ISO',l:'Certificado'}]},
        'visual-iot':{t:'📡 Central IoT',d:'Dados em tempo real de todas as fazendas.',s:[{v:'10k+',l:'Sensores'}]},
        'section-impacto':{t:'📊 Resultados',d:'Dados auditados de 500+ propriedades.'},
        'metric-agua':{t:'💧 1.280 mi m³',d:'Equivalente ao consumo de 8 milhões de pessoas.',s:[{v:'8M',l:'Pessoas'}]},
        'metric-area':{t:'🌳 350 mil ha',d:'Área equivalente a 490 mil campos de futebol.',s:[{v:'490k',l:'Campos'}]},
        'metric-produtividade':{t:'📈 +42%',d:'Aumento médio. Em algumas culturas, +85%.',s:[{v:'85%',l:'Máximo'}]},
        'metric-defensivos':{t:'🐛 -67%',d:'Redução de defensivos químicos.',s:[{v:'-67%',l:'Químicos'}]},
        'metric-carbono':{t:'☁️ 1.250 mil t',d:'CO₂ sequestrado. 270 mil carros a menos.',s:[{v:'270k',l:'Carros'}]},
        'metric-fazendas':{t:'🏡 580 Fazendas',d:'Certificadas com Selo AgroForte.',s:[{v:'580',l:'Certificadas'}]},
        'chart-impacto':{t:'📊 Evolução',d:'Gráfico 2020-2025 dos indicadores.',s:[{v:'5',l:'Anos'}]},
        'section-jogo':{t:'🎮 Jogo da Memória',d:'Aprenda brincando sobre sustentabilidade!'},
        'stat-pares-jogo':{t:'✅ Pares',d:'Complete os 4 pares para vencer!'},
        'stat-tentativas-jogo':{t:'🔄 Tentativas',d:'Tente bater seu recorde!'},
        'stat-recorde-jogo':{t:'🏆 Recorde',d:'Salvo no navegador. Desafie-se!'},
        'btn-reset-jogo':{t:'🔄 Reiniciar',d:'Novo jogo! Cartas embaralhadas.'},
        'btn-shuffle-jogo':{t:'🔀 Embaralhar',d:'Embaralha cartas não encontradas.'},
        'hint-jogo':{t:'💡 Dica',d:'Pares: 🌱 Semente, 🌽 Milho, 💧 Água, ☀️ Sol.'},
        'game-progress-bar':{t:'📊 Progresso',d:'100% = todos os pares encontrados!'},
        'card-semente':{t:'🌱 Semente',d:'Símbolo do início. Sementes crioulas.',s:[{v:'2k+',l:'Variedades'}]},
        'card-milho':{t:'🌽 Milho',d:'Cultura regenerativa que melhora o solo.',s:[{v:'1Bi',l:'Toneladas'}]},
        'card-agua':{t:'💧 Água',d:'Recurso vital. Cada gota importa.',s:[{v:'-60%',l:'Consumo'}]},
        'card-sol':{t:'☀️ Sol',d:'Energia limpa. 100% renovável.',s:[{v:'100%',l:'Renovável'}]},
        'section-cases':{t:'🏆 Histórias Reais',d:'Produtores que transformaram suas terras.'},
        'case-esperanca':{t:'🌾 Fazenda Esperança',d:'+45% produtividade, -60% custos.',s:[{v:'+45%',l:'Prod.'}]},
        'case-bela-vista':{t:'🍃 Sítio Bela Vista',d:'-70% água, 100% orgânico.',s:[{v:'100%',l:'Orgânico'}]},
        'case-agrotech':{t:'🤖 AgroTech',d:'-95% herbicidas, R$500k/ano economia.',s:[{v:'R$500k',l:'Economia'}]},
        'section-contato':{t:'📬 Newsletter',d:'Junte-se a 10.000+ produtores.'},
        'input-email':{t:'📧 E-mail',d:'Digite seu melhor e-mail.'},
        'btn-newsletter':{t:'✉️ Inscrever',d:'Receba conteúdo exclusivo semanal.'},
        'newsletter-features':{t:'✅ Benefícios',d:'Conteúdo exclusivo, webinars, e-books.'},
        'social-linkedin':{t:'💼 LinkedIn',d:'Siga-nos para novidades e vagas.'},
        'social-instagram':{t:'📸 Instagram',d:'Fotos do campo sustentável.'},
        'social-youtube':{t:'▶️ YouTube',d:'Webinars e documentários.'},
        'social-twitter':{t:'🐦 X/Twitter',d:'Atualizações em tempo real.'},
        'social-whatsapp':{t:'📱 WhatsApp',d:'Canal direto para produtores.'},
        'footer-brand':{t:'🌱 AgroForte',d:'B Corp, Carbon Trust, Rainforest Alliance.'},
        'footer-esg':{t:'📄 ESG 2025',d:'Relatório completo de sustentabilidade.'},
        'footer-calculadora':{t:'🧮 Calculadora',d:'Calcule a pegada de carbono.'},
        'footer-blog':{t:'📝 Blog',d:'Artigos sobre agricultura regenerativa.'},
        'footer-webinars':{t:'🎥 Webinars',d:'Eventos online com especialistas.'},
        'footer-ebooks':{t:'📚 E-books',d:'Materiais gratuitos.'},
        'footer-sobre':{t:'ℹ️ Sobre',d:'Conheça nossa história e missão.'},
        'footer-carreiras':{t:'💼 Carreiras',d:'Trabalhe conosco.'},
        'footer-imprensa':{t:'📰 Imprensa',d:'Kit de mídia.'},
        'footer-privacidade':{t:'🔒 Privacidade',d:'LGPD. Dados protegidos.'},
        'footer-termos':{t:'📋 Termos',d:'Termos de uso.'}
    };
    
    // ===== DOM =====
    const D = {
        preloader: document.getElementById('preloader-master'),
        progressFill: document.getElementById('preloader-progress-fill'),
        percentage: document.getElementById('preloader-percentage'),
        message: document.getElementById('preloader-message'),
        particles: document.getElementById('preloader-particles'),
        cursorCore: document.getElementById('cursor-core'),
        cursorOuter: document.getElementById('cursor-outer'),
        cursorTrail: document.getElementById('cursor-trail'),
        cursorGlow: document.getElementById('cursor-glow'),
        canvas: document.getElementById('canvas-3d-background'),
        header: document.querySelector('.header-premium'),
        scrollBar: document.getElementById('scrollProgressBar'),
        mobileMenu: document.getElementById('mobileMenu'),
        mobileBtn: document.getElementById('mobileMenuBtn'),
        closeMobile: document.getElementById('closeMobileMenu'),
        modal: document.getElementById('infoModal'),
        modalTitle: document.getElementById('modalTitle'),
        modalDesc: document.getElementById('modalDescription'),
        modalStats: document.getElementById('modalStats'),
        modalAction: document.getElementById('modalActionBtn'),
        modalClose: document.getElementById('modalCloseBtn'),
        modalClose2: document.getElementById('modalCloseBtn2'),
        modalBackdrop: document.querySelector('.modal-backdrop'),
        tooltip: document.getElementById('globalTooltip'),
        tabs: document.querySelectorAll('.tab-btn-premium'),
        tabContents: document.querySelectorAll('.tab-content-premium'),
        counters: document.querySelectorAll('.counter-premium'),
        board: document.getElementById('memory-board'),
        pairsDisp: document.getElementById('pairs-matched-display'),
        attemptsDisp: document.getElementById('attempts-display'),
        bestDisp: document.getElementById('best-score-display'),
        progBar: document.getElementById('game-progress-bar'),
        progPerc: document.getElementById('progress-percentage'),
        resetBtn: document.getElementById('reset-game-btn'),
        shuffleBtn: document.getElementById('shuffle-game-btn'),
        form: document.getElementById('newsletterForm'),
        themeBtn: document.getElementById('themeToggle'),
        scrollInd: document.querySelector('.scroll-indicator-premium')
    };
    
    // ===== PRELOADER =====
    function initPreloader() {
        if(!D.preloader) return;
        for(let i=0;i<50;i++){
            const p=document.createElement('div');
            p.style.cssText=`position:absolute;width:${Math.random()*5+2}px;height:${p.style.width};background:hsl(${80+Math.random()*40},70%,60%);border-radius:50%;box-shadow:0 0 15px #8bc34a;left:${Math.random()*100}%;animation:fp ${Math.random()*10+8}s linear infinite;animation-delay:${Math.random()*5}s;`;
            D.particles.appendChild(p);
        }
        const s=document.createElement('style');s.textContent='@keyframes fp{0%{transform:translateY(100vh) rotate(0);opacity:0}10%{opacity:.8}90%{opacity:.8}100%{transform:translateY(-100vh) rotate(720deg);opacity:0}}';document.head.appendChild(s);
        const msgs=['Preparando o solo...','Plantando sementes...','Regenerando a terra...','Nutrindo ecossistemas...','Cultivando o futuro...','Colhendo esperança...'];
        let prog=0,mi=0;
        const iv=setInterval(()=>{
            prog+=Math.random()*4+1.5;
            if(prog>=100){prog=100;clearInterval(iv);setTimeout(()=>{D.preloader.style.opacity='0';D.preloader.style.visibility='hidden';setTimeout(()=>{D.preloader.style.display='none';State.loading=false;},1400);},300);}
            D.progressFill.style.width=prog+'%';D.percentage.textContent=Math.round(prog)+'%';
            const ni=Math.floor(prog/16);if(ni<msgs.length&&ni!==mi){mi=ni;D.message.textContent=msgs[ni];}
        },30);
    }
    
    // ===== CURSOR =====
    function initCursor(){
        if(State.isMobile){document.body.style.cursor='auto';return;}
        document.addEventListener('mousemove',e=>{State.mx=e.clientX;State.my=e.clientY;D.cursorCore.style.left=State.mx+'px';D.cursorCore.style.top=State.my+'px';D.cursorGlow.style.left=State.mx+'px';D.cursorGlow.style.top=State.my+'px';});
        document.addEventListener('mousedown',()=>document.body.classList.add('cursor-click'));
        document.addEventListener('mouseup',()=>document.body.classList.remove('cursor-click'));
        document.querySelectorAll('a,button,.memory-card-premium,.nav-item,.tab-btn-premium,.metric-card-premium,.case-card-premium,.social-link,.orbit-item,.interactive').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'));});
        function anim(){State.ox+=(State.mx-State.ox)*CONFIG.cursorLerp;State.oy+=(State.my-State.oy)*CONFIG.cursorLerp;D.cursorOuter.style.left=State.ox+'px';D.cursorOuter.style.top=State.oy+'px';State.tx+=(State.mx-State.tx)*(CONFIG.cursorLerp*0.35);State.ty+=(State.my-State.ty)*(CONFIG.cursorLerp*0.35);D.cursorTrail.style.left=State.tx+'px';D.cursorTrail.style.top=State.ty+'px';requestAnimationFrame(anim);}
        anim();
    }
    
    // ===== CANVAS =====
    function initCanvas(){
        if(!D.canvas)return;
        const ctx=D.canvas.getContext('2d');State.canvasCtx=ctx;
        function rs(){State.cw=window.innerWidth;State.ch=window.innerHeight;D.canvas.width=State.cw;D.canvas.height=State.ch;initParts();}
        function initParts(){State.parts=[];for(let i=0;i<CONFIG.particles;i++){State.parts.push({x:Math.random()*State.cw,y:Math.random()*State.ch,vx:(Math.random()-0.5)*0.25,vy:(Math.random()-0.5)*0.25,size:Math.random()*3.5+1.5,base:Math.random()*3.5+1.5,color:`hsla(${80+Math.random()*40},${60+Math.random()*30}%,${50+Math.random()*30}%,${0.12+Math.random()*0.2})`});}}
        function draw(){
            if(!State.canvasCtx||!State.cw)return;
            const c=State.canvasCtx;
            c.fillStyle='#020603';c.fillRect(0,0,State.cw,State.ch);
            State.parts.forEach(p=>{
                const dx=State.mx-p.x,dy=State.my-p.y,dist=Math.sqrt(dx*dx+dy*dy);
                if(dist<180){const f=(180-dist)/180;p.vx-=(dx/dist)*f*0.04;p.vy-=(dy/dist)*f*0.04;p.size=p.base+f*2.5;}else{p.size=p.base;}
                p.vx+=(Math.random()-0.5)*0.015;p.vy+=(Math.random()-0.5)*0.015;p.vx*=0.985;p.vy*=0.985;p.x+=p.vx;p.y+=p.vy;
                if(p.x<-20)p.x=State.cw+20;if(p.x>State.cw+20)p.x=-20;if(p.y<-20)p.y=State.ch+20;if(p.y>State.ch+20)p.y=-20;
                c.beginPath();c.arc(p.x,p.y,p.size,0,Math.PI*2);c.fillStyle=p.color;c.shadowColor='#8bc34a';c.shadowBlur=12;c.fill();
            });
            c.shadowBlur=0;
            for(let i=0;i<State.parts.length;i++){for(let j=i+1;j<State.parts.length;j++){const p1=State.parts[i],p2=State.parts[j];const d=Math.sqrt((p1.x-p2.x)**2+(p1.y-p2.y)**2);if(d<CONFIG.connectionDist){c.beginPath();c.strokeStyle=`rgba(139,195,74,${(1-d/CONFIG.connectionDist)*0.12})`;c.moveTo(p1.x,p1.y);c.lineTo(p2.x,p2.y);c.stroke();}}}
            requestAnimationFrame(draw);
        }
        window.addEventListener('resize',rs);rs();draw();
    }
    
    // ===== MODAL (ADICIONADO) =====
    function openModal(key){
        const info=INFO[key];if(!info)return;
        D.modalTitle.textContent=info.t;D.modalDesc.textContent=info.d;
        if(info.s){D.modalStats.innerHTML=info.s.map(s=>`<div class="modal-stat-item"><span class="stat-value">${s.v}</span><span class="stat-label">${s.l}</span></div>`).join('');D.modalStats.style.display='flex';}else{D.modalStats.style.display='none';}
        if(info.l){D.modalAction.style.display='flex';D.modalAction.onclick=()=>{closeModal();document.querySelector(info.l).scrollIntoView({behavior:'smooth'});};}else{D.modalAction.style.display='none';}
        D.modal.classList.add('active');document.body.style.overflow='hidden';
    }
    function closeModal(){D.modal.classList.remove('active');document.body.style.overflow='';}
    D.modalClose.addEventListener('click',closeModal);D.modalClose2.addEventListener('click',closeModal);D.modalBackdrop.addEventListener('click',closeModal);
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});
    
    // ===== TOOLTIP (ADICIONADO) =====
    function showTooltip(e,key){
        const info=INFO[key];if(!info)return;
        D.tooltip.innerHTML=`<i class="fas fa-info-circle"></i> ${info.t}`;
        D.tooltip.style.left=Math.min(e.clientX+20,window.innerWidth-320)+'px';
        D.tooltip.style.top=(e.clientY-15)+'px';D.tooltip.classList.add('active');
    }
    function hideTooltip(){D.tooltip.classList.remove('active');}
    
    // ===== INTERATIVIDADE (ADICIONADO) =====
    function addInteractivity(){
        document.querySelectorAll('.interactive,[data-info]').forEach(el=>{
            const key=el.getAttribute('data-info');if(!key||el._bound)return;el._bound=true;
            el.addEventListener('mouseenter',e=>showTooltip(e,key));
            el.addEventListener('mousemove',e=>{D.tooltip.style.left=Math.min(e.clientX+20,window.innerWidth-320)+'px';D.tooltip.style.top=(e.clientY-15)+'px';});
            el.addEventListener('mouseleave',hideTooltip);
            el.addEventListener('click',e=>{
                if(el.closest('#memory-board'))return;
                const href=el.getAttribute('href');
                if(href&&href.startsWith('#')&&href!=='#'){openModal(key);return;}
                if(el.tagName==='BUTTON'&&el.type==='submit')return;
                if(el.tagName==='INPUT')return;
                e.preventDefault();e.stopPropagation();openModal(key);
            });
        });
    }
    
    // ===== JOGO DA MEMÓRIA =====
    const Game={
        icons:['🌱','🌽','💧','☀️'],deck:[],cards:[],flipped:[],matched:0,attempts:0,locked:false,
        init(){this.loadBest();this.createDeck();this.render();},
        loadBest(){const s=localStorage.getItem('agroBest');State.bestScore=s?parseInt(s):null;if(D.bestDisp)D.bestDisp.textContent=State.bestScore||'—';},
        saveBest(sc){if(!State.bestScore||sc<State.bestScore){State.bestScore=sc;localStorage.setItem('agroBest',sc);D.bestDisp.textContent=sc;}},
        createDeck(){this.deck=[...this.icons,...this.icons,'🌾'];this.shuffle();},
        shuffle(){for(let i=this.deck.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[this.deck[i],this.deck[j]]=[this.deck[j],this.deck[i]];}this.cards=this.deck.map((v,i)=>({id:i,value:v,matched:false,flipped:false}));},
        render(){D.board.innerHTML='';this.cards.forEach((c,i)=>{const el=document.createElement('div');el.className='memory-card-premium'+(c.matched?' matched':'')+(c.flipped?' flipped':'');el.textContent=c.flipped||c.matched?c.value:'🌿';el.addEventListener('click',()=>this.click(i));D.board.appendChild(el);});this.updateStats();this.updateProgress();},
        click(i){if(this.locked)return;const c=this.cards[i];if(c.matched||c.flipped||this.flipped.length===2)return;c.flipped=true;this.flipped.push(i);this.render();if(this.flipped.length===2){this.attempts++;this.updateStats();this.check();}},
        check(){this.locked=true;const[a,b]=this.flipped,ca=this.cards[a],cb=this.cards[b];if(ca.value===cb.value&&ca.value!=='🌾'){ca.matched=cb.matched=true;this.matched++;this.flipped=[];this.locked=false;this.render();if(this.matched===4){this.saveBest(this.attempts);setTimeout(()=>openModal('stat-recorde-jogo'),500);}}else{setTimeout(()=>{ca.flipped=cb.flipped=false;this.flipped=[];this.locked=false;this.render();},700);}},
        updateStats(){if(D.pairsDisp)D.pairsDisp.textContent=`${this.matched}/4`;if(D.attemptsDisp)D.attemptsDisp.textContent=this.attempts;},
        updateProgress(){const p=(this.matched/4)*100;if(D.progBar)D.progBar.style.width=p+'%';if(D.progPerc)D.progPerc.textContent=Math.round(p)+'%';},
        reset(){this.matched=0;this.attempts=0;this.flipped=[];this.locked=false;this.createDeck();this.render();},
        shuffleOnly(){if(this.locked)return;this.flipped=[];this.locked=false;this.cards.forEach(c=>{if(!c.matched)c.flipped=false;});this.render();}
    };
    
    // ===== INICIALIZAÇÃO =====
    function init(){
        initPreloader();if(!State.isMobile)initCursor();else document.body.style.cursor='auto';
        initCanvas();Game.init();
        D.tabs.forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.tab;D.tabs.forEach(x=>x.classList.remove('active'));D.tabContents.forEach(x=>x.classList.remove('active'));b.classList.add('active');document.getElementById(id).classList.add('active');}));
        const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const el=e.target,t=parseInt(el.dataset.target);let c=0;const iv=setInterval(()=>{c+=t/40;if(c>=t){el.textContent=t;clearInterval(iv);}else el.textContent=Math.floor(c);},20);obs.unobserve(el);}});},{threshold:0.3});
        D.counters.forEach(c=>obs.observe(c));
        document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',function(e){const h=this.getAttribute('href');if(h==='#')return;e.preventDefault();document.querySelector(h).scrollIntoView({behavior:'smooth'});}));
        window.addEventListener('scroll',()=>{const st=scrollY,dh=document.documentElement.scrollHeight-innerHeight,sp=(st/dh)*100;if(D.scrollBar)D.scrollBar.style.width=sp+'%';if(D.scrollInd&&st>150)D.scrollInd.style.opacity='0';else if(D.scrollInd)D.scrollInd.style.opacity='1';});
        D.mobileBtn?.addEventListener('click',()=>{D.mobileMenu.classList.add('active');document.body.style.overflow='hidden';});
        D.closeMobile?.addEventListener('click',()=>{D.mobileMenu.classList.remove('active');document.body.style.overflow='';});
        document.querySelector('.mobile-menu-backdrop')?.addEventListener('click',()=>{D.mobileMenu.classList.remove('active');document.body.style.overflow='';});
        D.form?.addEventListener('submit',e=>{e.preventDefault();openModal('btn-newsletter');D.form.reset();});
        let tc=0;D.themeBtn?.addEventListener('click',()=>{tc++;D.themeBtn.style.transform=`rotate(${tc*360}deg)`;if(tc===5){openModal('theme-toggle');tc=0;}});
        D.resetBtn?.addEventListener('click',()=>Game.reset());D.shuffleBtn?.addEventListener('click',()=>Game.shuffleOnly());
        addInteractivity();
        setTimeout(()=>{if(State.loading&&D.preloader){D.preloader.style.opacity='0';D.preloader.style.visibility='hidden';setTimeout(()=>{D.preloader.style.display='none';State.loading=false;},1000);}},5000);
    }
    
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
