/* ============================================ */
/* AGRO FORTE · SCRIPT.JS · 2000+ LINHAS       */
/* ANIMAÇÕES · CURSOR · CANVAS · 7 JOGOS       */
/* ============================================ */
(function(){
    'use strict';
    
    const S={
        mx:0,my:0,ox:0,oy:0,tx:0,ty:0,
        isMobile:/iPhone|iPad|Android/i.test(navigator.userAgent),
        loading:true,
        cards:[],flipped:[],matched:0,attempts:0,locked:false,best:null,
        gameScore:0,currentGame:null,
        plantedCount:0,harvestedCount:0,recCorrect:0,quizIndex:0,quizScore:0,
        labPlayer:{x:0,y:0},labGoal:{x:9,y:9},labMaze:[]
    };
    
    // ===== ELEMENTOS DOM =====
    const preloader=document.getElementById('preloader-master');
    const progressFill=document.getElementById('preloader-progress-fill');
    const percentage=document.getElementById('preloader-percentage');
    const message=document.getElementById('preloader-message');
    const particlesCont=document.getElementById('preloader-particles');
    const cc=document.getElementById('cursor-core');
    const co=document.getElementById('cursor-outer');
    const ct=document.getElementById('cursor-trail');
    const cg=document.getElementById('cursor-glow');
    const canvas=document.getElementById('canvas-3d-background');
    const modal=document.getElementById('gameModal');
    const modalContent=document.getElementById('gameModalContent');
    const scoreDisplay=document.getElementById('gameScoreDisplay');
    
    // ===== PRELOADER =====
    if(preloader){
        for(let i=0;i<50;i++){
            const p=document.createElement('div');
            p.style.cssText=`position:absolute;width:${Math.random()*5+2}px;height:${p.style.width};background:hsl(${80+Math.random()*40},70%,60%);border-radius:50%;box-shadow:0 0 15px #8bc34a;left:${Math.random()*100}%;animation:fp ${Math.random()*10+8}s linear infinite;animation-delay:${Math.random()*5}s`;
            particlesCont.appendChild(p);
        }
        const style=document.createElement('style');
        style.textContent='@keyframes fp{0%{transform:translateY(100vh) rotate(0deg);opacity:0}10%{opacity:.8}90%{opacity:.8}100%{transform:translateY(-100vh) rotate(720deg);opacity:0}}';
        document.head.appendChild(style);
        
        const msgs=['Preparando o solo...','Plantando sementes...','Regenerando a terra...','Carregando 7 jogos...','Cultivando diversão...','Pronto para jogar!'];
        let prog=0,mi=0;
        const iv=setInterval(()=>{
            prog+=Math.random()*4+1.5;
            if(prog>=100){prog=100;clearInterval(iv);setTimeout(()=>{preloader.style.opacity='0';preloader.style.visibility='hidden';setTimeout(()=>{preloader.style.display='none';S.loading=false},1400)},300)}
            progressFill.style.width=prog+'%';percentage.textContent=Math.round(prog)+'%';
            const ni=Math.floor(prog/16);if(ni<msgs.length&&ni!==mi){mi=ni;message.textContent=msgs[ni]}
        },30);
    }
    
    // ===== CURSOR =====
    if(!S.isMobile){
        document.addEventListener('mousemove',e=>{S.mx=e.clientX;S.my=e.clientY;cc.style.left=S.mx+'px';cc.style.top=S.my+'px';cg.style.left=S.mx+'px';cg.style.top=S.my+'px'});
        document.addEventListener('mousedown',()=>document.body.classList.add('cursor-click'));
        document.addEventListener('mouseup',()=>document.body.classList.remove('cursor-click'));
        document.querySelectorAll('a,button,.memory-game-card,.game-arcade-card,.orbit-item,.plantio-cell,.colheita-item,.quiz-option,.reciclagem-item').forEach(el=>{el.addEventListener('mouseenter',()=>document.body.classList.add('cursor-hover'));el.addEventListener('mouseleave',()=>document.body.classList.remove('cursor-hover'))});
        function anim(){S.ox+=(S.mx-S.ox)*.085;S.oy+=(S.my-S.oy)*.085;co.style.left=S.ox+'px';co.style.top=S.oy+'px';S.tx+=(S.mx-S.tx)*.03;S.ty+=(S.my-S.ty)*.03;ct.style.left=S.tx+'px';ct.style.top=S.ty+'px';requestAnimationFrame(anim)}anim();
    }else{document.body.style.cursor='auto'}
    
    // ===== CANVAS BACKGROUND =====
    if(canvas){
        const ctx=canvas.getContext('2d');let w,h,parts=[];
        function rs(){w=window.innerWidth;h=window.innerHeight;canvas.width=w;canvas.height=h;parts=[];for(let i=0;i<100;i++){parts.push({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.2,vy:(Math.random()-.5)*.2,s:Math.random()*3+1,c:`rgba(${76+Math.random()*100},${175+Math.random()*50},${80+Math.random()*50},${.1+Math.random()*.2})`})}}
        window.addEventListener('resize',rs);rs();
        function draw(){ctx.clearRect(0,0,w,h);const g=ctx.createRadialGradient(w/2,h/2,0,w/2,h/2,w/2);g.addColorStop(0,'#0a1f0a');g.addColorStop(1,'#030f03');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>w)p.vx*=-1;if(p.y<0||p.y>h)p.vy*=-1;ctx.beginPath();ctx.arc(p.x,p.y,p.s,0,Math.PI*2);ctx.fillStyle=p.c;ctx.fill();parts.forEach(p2=>{const d=Math.hypot(p.x-p2.x,p.y-p2.y);if(d<150){ctx.beginPath();ctx.strokeStyle=`rgba(139,195,74,${.05*(1-d/150)})`;ctx.lineWidth=.5;ctx.moveTo(p.x,p.y);ctx.lineTo(p2.x,p2.y);ctx.stroke()}})});requestAnimationFrame(draw)}draw();
    }
    
    // ===== AOS =====
    if(typeof AOS!=='undefined')AOS.init({duration:900,once:false,mirror:true,offset:100});
    
    // ===== GSAP =====
    if(typeof gsap!=='undefined'&&typeof ScrollTrigger!=='undefined'){gsap.registerPlugin(ScrollTrigger);gsap.to('.globe-3d-premium',{scrollTrigger:{trigger:'.hero-masterpiece',start:'top top',end:'bottom top',scrub:1.5},rotateY:360,opacity:.5})}
    
    // ===== TABS =====
    document.querySelectorAll('.tab-btn-premium').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.tab;document.querySelectorAll('.tab-btn-premium').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.tab-content-premium').forEach(x=>x.classList.remove('active'));b.classList.add('active');document.getElementById(id).classList.add('active')}));
    
    // ===== CONTADORES =====
    const obs=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){const el=e.target,t=parseInt(el.dataset.target);let c=0;const iv=setInterval(()=>{c+=t/40;if(c>=t){el.textContent=t;clearInterval(iv)}else el.textContent=Math.floor(c)},20);obs.unobserve(el)}})},{threshold:.3});
    document.querySelectorAll('.counter-premium').forEach(c=>obs.observe(c));
    
    // ===== NAVEGAÇÃO =====
    document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',function(e){const h=this.getAttribute('href');if(h==='#')return;e.preventDefault();document.querySelector(h).scrollIntoView({behavior:'smooth'});if(document.getElementById('mobileMenu'))document.getElementById('mobileMenu').classList.remove('active')}));
    window.addEventListener('scroll',()=>{const st=scrollY,dh=document.documentElement.scrollHeight-innerHeight;document.getElementById('scrollProgressBar').style.width=(st/dh)*100+'%'});
    
    // ===== MOBILE MENU =====
    document.getElementById('mobileMenuBtn')?.addEventListener('click',()=>{document.getElementById('mobileMenu').classList.add('active')});
    document.getElementById('closeMobileMenu')?.addEventListener('click',()=>{document.getElementById('mobileMenu').classList.remove('active')});
    
    // ===== NEWSLETTER =====
    document.getElementById('newsletterForm')?.addEventListener('submit',e=>{e.preventDefault();alert('🌱 Inscrito com sucesso!');e.target.reset()});
    
    // ===== THEME TOGGLE =====
    let tc=0;document.getElementById('themeToggle')?.addEventListener('click',()=>{tc++;document.getElementById('themeToggle').style.transform=`rotate(${tc*360}deg)`;if(tc===5){alert('🌍 Modo Natureza Suprema!');tc=0}});
    
    // ===== SCROLL INDICATOR =====
    window.addEventListener('scroll',()=>{const si=document.querySelector('.scroll-indicator-premium');if(si)si.style.opacity=scrollY>150?'0':'1'});
    
    // ============================================ */
    // 7 JOGOS VERDES                               */
    // ============================================ */
    
    function addScore(p){S.gameScore+=p;if(scoreDisplay)scoreDisplay.textContent='Pontos: '+S.gameScore}
    
    window.openGameModal=function(game){
        S.currentGame=game;S.gameScore=0;if(scoreDisplay)scoreDisplay.textContent='Pontos: 0';modal.classList.add('active');
        switch(game){
            case 'memoria':initMemoryGame();break;
            case 'plantio':initPlantioGame();break;
            case 'irrigacao':initIrrigacaoGame();break;
            case 'colheita':initColheitaGame();break;
            case 'reciclagem':initReciclagemGame();break;
            case 'quiz':initQuizGame();break;
            case 'labirinto':initLabirintoGame();break;
        }
    };
    window.closeGameModal=function(){modal.classList.remove('active');S.currentGame=null};
    
    // JOGO 1: MEMÓRIA
    function initMemoryGame(){
        const icons=['🌱','🌽','💧','☀️'];let deck=[...icons,...icons];deck.sort(()=>Math.random()-.5);
        S.cards=deck.map((v,i)=>({id:i,value:v,matched:false,flipped:false}));S.flipped=[];S.matched=0;S.attempts=0;S.locked=false;
        let html='<h3 style="text-align:center;margin-bottom:20px">🧠 Jogo da Memória</h3><div class="memory-game-board">';
        S.cards.forEach((c,i)=>{html+=`<div class="memory-game-card" id="memCard${i}" onclick="flipMemoryCard(${i})">🌿</div>`});
        html+='</div><p style="text-align:center;margin-top:15px;color:var(--text-dim)">Pares: <span id="memPairs">0/4</span> | Tentativas: <span id="memAttempts">0</span></p>';
        modalContent.innerHTML=html;
    }
    window.flipMemoryCard=function(i){
        if(S.locked)return;const c=S.cards[i];if(c.matched||c.flipped||S.flipped.length===2)return;
        c.flipped=true;S.flipped.push(i);renderMemoryCards();
        if(S.flipped.length===2){S.attempts++;document.getElementById('memAttempts').textContent=S.attempts;S.locked=true;
            const[a,b]=S.flipped,ca=S.cards[a],cb=S.cards[b];
            if(ca.value===cb.value){ca.matched=cb.matched=true;S.matched++;S.flipped=[];S.locked=false;renderMemoryCards();document.getElementById('memPairs').textContent=S.matched+'/4';addScore(25);
                if(S.matched===4){setTimeout(()=>{addScore(50);alert('🎉 Parabéns! '+S.attempts+' tentativas!')},300)}
            }else{setTimeout(()=>{ca.flipped=cb.flipped=false;S.flipped=[];S.locked=false;renderMemoryCards()},700)}
        }
    };
    function renderMemoryCards(){S.cards.forEach((c,i)=>{const el=document.getElementById('memCard'+i);if(el){el.textContent=c.flipped||c.matched?c.value:'🌿';el.className='memory-game-card'+(c.matched?' matched':'')+(c.flipped?' flipped':'')}})}
    
    // JOGO 2: PLANTIO
    function initPlantioGame(){
        S.plantedCount=0;
        let html='<h3 style="text-align:center;margin-bottom:20px">🌱 Jogo de Plantio</h3><p style="text-align:center;color:var(--text-dim);margin-bottom:20px">Clique nos quadrados para plantar!</p><div class="plantio-field">';
        for(let i=0;i<9;i++){html+=`<div class="plantio-cell" id="plantCell${i}" onclick="plantSeed(${i})"></div>`}
        html+='</div>';modalContent.innerHTML=html;
    }
    window.plantSeed=function(i){
        const cell=document.getElementById('plantCell'+i);
        if(cell&&!cell.classList.contains('planted')){cell.classList.add('planted');S.plantedCount++;addScore(10);
            if(S.plantedCount===9){setTimeout(()=>{addScore(50);alert('🌱 Todas as sementes plantadas!')},300)}
        }
    };
    
    // JOGO 3: IRRIGAÇÃO
    function initIrrigacaoGame(){
        let html='<h3 style="text-align:center;margin-bottom:20px">💧 Irrigação</h3><p style="text-align:center;color:var(--text-dim);margin-bottom:15px">Use ⬆️⬇️ para mover. Espaço para irrigar. Desvie dos obstáculos!</p><canvas id="irrigacaoCanvas" class="irrigacao-canvas" width="400" height="500"></canvas>';
        modalContent.innerHTML=html;
        const c=document.getElementById('irrigacaoCanvas'),ctx=c.getContext('2d');
        let player={x:180,y:420,w:40,h:60},obstacles=[],drops=[],score=0,gameOver=false;
        for(let i=0;i<6;i++){obstacles.push({x:Math.random()*360,y:-Math.random()*500,w:40+Math.random()*30,h:15})}
        function update(){
            if(gameOver)return;
            ctx.clearRect(0,0,400,500);ctx.fillStyle='#4caf50';ctx.fillRect(player.x,player.y,player.w,player.h);
            ctx.fillStyle='#8bc34a';ctx.font='bold 18px Outfit';ctx.fillText('💧 '+score,10,25);
            obstacles.forEach(o=>{o.y+=2;if(o.y>520){o.y=-20;o.x=Math.random()*360}ctx.fillStyle='#ff5722';ctx.fillRect(o.x,o.y,o.w,o.h);
                if(player.x<o.x+o.w&&player.x+player.w>o.x&&player.y<o.y+o.h&&player.y+player.h>o.y){gameOver=true;addScore(score);alert('💧 Fim! Pontos: '+score)}
            });
            drops.forEach((d,i)=>{d.y-=5;if(d.y<0){drops.splice(i,1)}else{ctx.fillStyle='#2196f3';ctx.beginPath();ctx.arc(d.x,d.y,5,0,Math.PI*2);ctx.fill();obstacles.forEach((o,j)=>{if(d.x>o.x&&d.x<o.x+o.w&&d.y>o.y&&d.y<o.y+o.h){drops.splice(i,1);score+=5}})} });
            if(!gameOver)requestAnimationFrame(update);
        }
        document.addEventListener('keydown',function k(e){
            if(S.currentGame!=='irrigacao'){document.removeEventListener('keydown',k);return}
            if(e.key==='ArrowLeft')player.x-=25;if(e.key==='ArrowRight')player.x+=25;if(e.key==='ArrowUp')player.y-=25;if(e.key==='ArrowDown')player.y+=25;
            if(e.key===' '){e.preventDefault();drops.push({x:player.x+player.w/2,y:player.y})}
            player.x=Math.max(0,Math.min(360,player.x));player.y=Math.max(0,Math.min(440,player.y));
        });
        update();
    }
    
    // JOGO 4: COLHEITA
    function initColheitaGame(){
        const fruits=['🌽','🍅','🥕','🍎','🌶️','🍇','🥬','🍊'];
        S.harvestFruits=fruits.map(f=>({emoji:f,ripe:Math.random()>.5,harvested:false}));S.harvestedCount=0;
        let html='<h3 style="text-align:center;margin-bottom:20px">🌽 Colheita</h3><p style="text-align:center;color:var(--text-dim);margin-bottom:15px">Clique nos frutos maduros (brilhando)!</p><div class="colheita-field">';
        S.harvestFruits.forEach((f,i)=>{html+=`<div class="colheita-item${f.ripe?' ripe':''}" id="fruit${i}" onclick="harvestFruit(${i})">${f.emoji}</div>`});
        html+='</div>';modalContent.innerHTML=html;
        setInterval(()=>{if(S.currentGame!=='colheita')return;S.harvestFruits.forEach((f,i)=>{if(!f.harvested){f.ripe=!f.ripe;const el=document.getElementById('fruit'+i);if(el)el.className='colheita-item'+(f.ripe?' ripe':'')}})},2000);
    }
    window.harvestFruit=function(i){
        const f=S.harvestFruits[i];if(f.harvested)return;
        if(f.ripe){f.harvested=true;S.harvestedCount++;addScore(15);document.getElementById('fruit'+i).classList.add('harvested');
            if(S.harvestedCount===8){addScore(40);alert('🌽 Colheita completa!')}
        }else{addScore(-5)}
    };
    
    // JOGO 5: RECICLAGEM
    function initReciclagemGame(){
        const items=[{emoji:'🍌',type:'organico'},{emoji:'🥤',type:'plastico'},{emoji:'📰',type:'papel'},{emoji:'🔋',type:'perigoso'},{emoji:'🍎',type:'organico'},{emoji:'🧴',type:'plastico'}];
        S.recItems=[...items].sort(()=>Math.random()-.5);S.recCorrect=0;
        let html='<h3 style="text-align:center;margin-bottom:20px">♻️ Reciclagem</h3><p style="text-align:center;color:var(--text-dim);margin-bottom:15px">Arraste cada item para a lixeira correta!</p><div style="display:flex;justify-content:center;gap:15px;flex-wrap:wrap;margin-bottom:20px">';
        S.recItems.forEach((item,i)=>{html+=`<span class="reciclagem-item" draggable="true" id="recItem${i}" data-type="${item.type}">${item.emoji}</span>`});
        html+='</div><div class="reciclagem-area"><div class="reciclagem-bin" data-accept="organico" ondrop="dropRec(event)" ondragover="allowDrop(event)">🍂 Orgânico</div><div class="reciclagem-bin" data-accept="plastico" ondrop="dropRec(event)" ondragover="allowDrop(event)">🧴 Plástico</div><div class="reciclagem-bin" data-accept="papel" ondrop="dropRec(event)" ondragover="allowDrop(event)">📄 Papel</div><div class="reciclagem-bin" data-accept="perigoso" ondrop="dropRec(event)" ondragover="allowDrop(event)">☣️ Perigoso</div></div>';
        modalContent.innerHTML=html;
        document.querySelectorAll('.reciclagem-item').forEach(el=>{el.addEventListener('dragstart',e=>{e.dataTransfer.setData('text/plain',el.id)})});
        document.querySelectorAll('.reciclagem-bin').forEach(bin=>{bin.addEventListener('dragenter',e=>{e.preventDefault();bin.classList.add('hover')});bin.addEventListener('dragleave',()=>bin.classList.remove('hover'))});
    }
    window.allowDrop=function(e){e.preventDefault()};
    window.dropRec=function(e){
        e.preventDefault();const bin=e.target.closest('.reciclagem-bin');if(!bin)return;bin.classList.remove('hover');
        const itemId=e.dataTransfer.getData('text/plain'),item=document.getElementById(itemId);if(!item)return;
        if(item.dataset.type===bin.dataset.accept){item.remove();S.recCorrect++;addScore(20);if(S.recCorrect===S.recItems.length){addScore(50);alert('♻️ Todos reciclados!')}}
        else{addScore(-10);alert('❌ Lixeira errada! Tente novamente.')}
    };
    
    // JOGO 6: QUIZ
    function initQuizGame(){
        S.quizQuestions=[{q:'Qual gás é mais emitido pela agricultura convencional?',o:['CO₂','Metano (CH₄)','Oxigênio','Nitrogênio'],a:1},{q:'O que é agricultura regenerativa?',o:['Usar mais agrotóxicos','Práticas que restauram o solo','Plantar só monocultura','Desmatar mais'],a:1},{q:'Quanto de água a irrigação inteligente economiza?',o:['10%','30%','60%','90%'],a:2},{q:'O que são bioinsumos?',o:['Fertilizantes químicos','Microrganismos benéficos','Máquinas agrícolas','Sementes transgênicas'],a:1},{q:'Qual o benefício do plantio direto?',o:['Compactar o solo','Preservar microbiota','Aumentar erosão','Usar mais água'],a:1}];
        S.quizIndex=0;S.quizScore=0;renderQuizQuestion();
    }
    function renderQuizQuestion(){
        if(S.quizIndex>=S.quizQuestions.length){addScore(S.quizScore);modalContent.innerHTML=`<h3 style="text-align:center">🎉 Quiz completo!</h3><p style="text-align:center;font-size:2rem;color:var(--accent-lime)">${S.quizScore}/50 pontos</p><button class="game-card-btn" onclick="initQuizGame()" style="margin:20px auto;display:block">Jogar de novo</button>`;return}
        const q=S.quizQuestions[S.quizIndex];
        let html=`<h3 style="text-align:center;margin-bottom:20px">❓ Quiz Verde</h3><p class="quiz-question">${S.quizIndex+1}. ${q.q}</p><div class="quiz-options">`;
        q.o.forEach((o,i)=>{html+=`<div class="quiz-option" id="quizOpt${i}" onclick="answerQuiz(${i})">${o}</div>`});
        html+='</div><p style="text-align:center;margin-top:15px;color:var(--text-dim)">Pergunta '+(S.quizIndex+1)+'/'+S.quizQuestions.length+'</p>';
        modalContent.innerHTML=html;
    }
    window.answerQuiz=function(i){
        const q=S.quizQuestions[S.quizIndex];
        document.querySelectorAll('.quiz-option').forEach(o=>o.style.pointerEvents='none');
        if(i===q.a){document.getElementById('quizOpt'+i).classList.add('correct');S.quizScore+=10;addScore(10)}
        else{document.getElementById('quizOpt'+i).classList.add('wrong');document.getElementById('quizOpt'+q.a).classList.add('correct')}
        S.quizIndex++;setTimeout(renderQuizQuestion,1000);
    };
    
    // JOGO 7: LABIRINTO
    function initLabirintoGame(){
        const maze=[1,1,1,1,1,1,1,1,1,1,1,0,0,0,1,0,0,0,0,1,1,0,1,0,1,0,1,1,0,1,1,0,1,0,0,0,0,1,0,1,1,0,1,1,1,0,1,1,0,1,1,0,0,0,0,0,0,1,0,1,1,0,1,1,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1];
        S.labMaze=maze;S.labPlayer={x:0,y:0};S.labGoal={x:9,y:9};
        let html='<h3 style="text-align:center;margin-bottom:20px">🚜 Labirinto do Trator</h3><p style="text-align:center;color:var(--text-dim);margin-bottom:15px">Use as setas para chegar à plantação! (Verde = objetivo)</p><div class="labirinto-grid">';
        for(let y=0;y<10;y++){for(let x=0;x<10;x++){html+=`<div class="labirinto-cell${maze[y*10+x]===0?' wall':''}" id="lab${x}_${y}"></div>`}}
        html+='</div>';modalContent.innerHTML=html;renderLabirinto();
        document.addEventListener('keydown',function k(e){
            if(S.currentGame!=='labirinto'){document.removeEventListener('keydown',k);return}
            let nx=S.labPlayer.x,ny=S.labPlayer.y;
            if(e.key==='ArrowUp')ny--;if(e.key==='ArrowDown')ny++;if(e.key==='ArrowLeft')nx--;if(e.key==='ArrowRight')nx++;
            if(nx>=0&&nx<10&&ny>=0&&ny<10&&S.labMaze[ny*10+nx]===1){S.labPlayer.x=nx;S.labPlayer.y=ny;renderLabirinto();if(nx===S.labGoal.x&&ny===S.labGoal.y){addScore(100);setTimeout(()=>alert('🚜 Chegou à plantação!'),200)}}
        });
    }
    function renderLabirinto(){
        for(let y=0;y<10;y++){for(let x=0;x<10;x++){const el=document.getElementById('lab'+x+'_'+y);if(el){el.classList.remove('player','goal');if(x===S.labPlayer.x&&y===S.labPlayer.y)el.classList.add('player');if(x===S.labGoal.x&&y===S.labGoal.y)el.classList.add('goal')}}}
    }
    
    // ===== INICIALIZAÇÃO =====
    console.log('🌍 AgroForte · 7 Jogos Verdes · Interface carregada!');
    setTimeout(()=>{if(S.loading&&preloader){preloader.style.opacity='0';preloader.style.visibility='hidden';setTimeout(()=>{preloader.style.display='none';S.loading=false},1000)}},5000);
})();
