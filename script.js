/* ============================================ */
/* ADITIVO DE INTERATIVIDADE TOTAL             */
/* COLE ESTE CÓDIGO NO FINAL DO SEU SCRIPT.JS  */
/* ============================================ */

// ===== BANCO DE DADOS COMPLETO DE INFORMAÇÕES =====
const AGRO_INFO = {
    // Header e Logo
    'logo': {
        title: '🌱 AgroForte 5.0',
        desc: 'Líder em agricultura regenerativa desde 2020. Certificada B Corp, Carbon Trust e Rainforest Alliance. Nossa missão é alimentar o mundo regenerando o planeta.',
        stats: [
            { value: '+580', label: 'Fazendas Certificadas' },
            { value: '12', label: 'Países' },
            { value: 'R$2.1Bi', label: 'Créditos de Carbono' },
            { value: '99.8%', label: 'Satisfação' }
        ],
        link: '#impacto'
    },
    'badge': {
        title: '🏷️ Versão 5.0 · Plataforma',
        desc: 'A versão mais avançada da nossa plataforma integra IA preditiva, blockchain para rastreabilidade total e gêmeos digitais de cada hectare cultivado.',
        stats: [
            { value: '99.9%', label: 'Uptime' },
            { value: '24/7', label: 'Suporte' },
            { value: '5ms', label: 'Latência' },
            { value: '1M+', label: 'Dados/dia' }
        ]
    },
    'theme-toggle': {
        title: '🍃 Modo Natureza',
        desc: 'Clique 5 vezes para ativar o easter egg do modo natureza suprema! Personalize a experiência visual do site.',
        stats: [
            { value: '5', label: 'Cliques' },
            { value: '🎉', label: 'Surpresa' }
        ]
    },
    'nav-home': {
        title: '🏠 Visão Geral · Home',
        desc: 'Ponto de partida da nossa jornada sustentável. Aqui você encontra nossa missão, visão e os números que comprovam nosso impacto.',
        link: '#home'
    },
    'nav-tecnologias': {
        title: '🔬 Tecnologias · Inovação',
        desc: 'Satélites, drones, robôs autônomos, biotecnologia e IoT. Conheça as ferramentas que estão revolucionando o campo.',
        link: '#tecnologias'
    },
    'nav-impacto': {
        title: '📊 Impacto · Resultados',
        desc: 'Dados auditados dos últimos 5 anos. Mais de 500 propriedades monitoradas. Resultados que falam por si.',
        link: '#impacto'
    },
    'nav-jogo': {
        title: '🎮 Jogo Verde · Memória',
        desc: 'Aprenda sobre sustentabilidade de forma divertida! Encontre os pares e descubra curiosidades sobre o agro regenerativo.',
        link: '#jogo'
    },
    'nav-cases': {
        title: '🏆 Cases · Sucesso',
        desc: 'Histórias reais de produtores que transformaram suas propriedades com práticas sustentáveis.',
        link: '#cases'
    },
    'nav-contato': {
        title: '📬 Contato · Newsletter',
        desc: 'Receba conteúdo exclusivo sobre agricultura sustentável diretamente no seu e-mail.',
        link: '#contato'
    },

    // Hero Section
    'badge-hero': {
        title: '🌍 AGRO 5.0 · Carbono Negativo · ESG',
        desc: 'Agricultura 5.0: a quinta revolução agrícola. Integramos Inteligência Artificial, Internet das Coisas, Blockchain e Biotecnologia para criar a agricultura mais sustentável da história.',
        stats: [
            { value: '5ª', label: 'Revolução Agrícola' },
            { value: '2030', label: 'Meta Global' },
            { value: 'ODS', label: '12 Objetivos ONU' }
        ]
    },
    'title-equilibrio': {
        title: '⚖️ Equilíbrio · Palavra-Chave',
        desc: 'O equilíbrio é o princípio fundamental da agricultura regenerativa. Produzir alimentos de qualidade enquanto restauramos ecossistemas inteiros.',
        stats: [
            { value: '50%', label: 'Alimentos mundiais' },
            { value: '70%', label: 'Água doce usada' }
        ]
    },
    'title-producao': {
        title: '🌽 Produção · Alimentar o Mundo',
        desc: 'Até 2050, precisaremos alimentar 10 bilhões de pessoas. Nossas técnicas aumentam a produtividade em 42% sem expandir a área plantada.',
        stats: [
            { value: '10Bi', label: 'Pessoas em 2050' },
            { value: '+42%', label: 'Produtividade' },
            { value: '0%', label: 'Expansão de área' }
        ]
    },
    'title-meioambiente': {
        title: '🌳 Meio Ambiente · Preservação',
        desc: 'Cada hectare cultivado com nossos métodos sequestra 3x mais carbono que a agricultura convencional. A natureza é nossa maior aliada.',
        stats: [
            { value: '3x', label: 'Mais carbono' },
            { value: '+65%', label: 'Biodiversidade' },
            { value: '-42%', label: 'Emissões' }
        ]
    },
    'hero-description': {
        title: '💚 Nossa Missão',
        desc: 'Unimos inteligência artificial de ponta, biotecnologia avançada e sabedoria ancestral dos povos do campo para criar um sistema agrícola que alimenta o planeta sem destruí-lo.',
        stats: [
            { value: 'IA', label: 'Inteligência Artificial' },
            { value: 'Bio', label: 'Biotecnologia' },
            { value: '🌾', label: 'Sabedoria Ancestral' }
        ]
    },
    'btn-jogar': {
        title: '🎮 Jogar Memória Verde',
        desc: 'Teste seus conhecimentos sobre agricultura sustentável neste jogo interativo! Encontre os pares: 🌱 Semente, 🌽 Milho, 💧 Água, ☀️ Sol.',
        link: '#jogo'
    },
    'btn-impacto': {
        title: '📊 Descobrir Impacto',
        desc: 'Veja os números reais do nosso trabalho. Dados auditados de mais de 500 propriedades que adotaram práticas regenerativas.',
        link: '#impacto'
    },
    'btn-cases': {
        title: '🏆 Ver Cases de Sucesso',
        desc: 'Conheça histórias inspiradoras de produtores que transformaram suas vidas e suas terras com agricultura sustentável.',
        link: '#cases'
    },

    // Stats do Hero
    'stat-co2': {
        title: '🌫️ Redução de 42% em CO₂',
        desc: 'Emissões de gases de efeito estufa reduzidas em 42% comparado à agricultura convencional. Resultado do plantio direto, bioinsumos e energia renovável.',
        stats: [
            { value: '1.250', label: 'Mil toneladas/ano' },
            { value: '42%', label: 'Redução comprovada' },
            { value: '2020', label: 'Ano base' }
        ]
    },
    'stat-bio': {
        title: '🦋 +65% em Biodiversidade',
        desc: 'Aumento de 65% na biodiversidade local graças aos corredores ecológicos, fim dos agrotóxicos e restauração de habitats naturais.',
        stats: [
            { value: '350+', label: 'Espécies recuperadas' },
            { value: '65%', label: 'Aumento' },
            { value: '500km', label: 'Corredores ecológicos' }
        ]
    },
    'stat-agua': {
        title: '💧 98% de Água Reutilizada',
        desc: 'Sistemas de irrigação inteligente com IoT e reuso de água tratada. Economia equivalente ao consumo de 8 milhões de pessoas por ano.',
        stats: [
            { value: '1.280', label: 'Milhões m³/ano' },
            { value: '98%', label: 'Reutilização' },
            { value: '8M', label: 'Pessoas equivalentes' }
        ]
    },

    // Globo e Órbitas
    'globe-3d': {
        title: '🌐 Globo Interativo',
        desc: 'Este globo representa nosso planeta e a responsabilidade que temos em preservá-lo. Cada elemento em órbita simboliza um pilar da sustentabilidade.',
        stats: [
            { value: '🌍', label: 'Planeta' },
            { value: '♻️', label: 'Sustentabilidade' }
        ]
    },
    'orbit-leaf': {
        title: '🌿 Fotossíntese',
        desc: 'A folha simboliza a capacidade das plantas de capturar CO₂ e transformar em oxigênio. Nossas práticas aumentam a biomassa verde em 40%.',
        stats: [
            { value: '+40%', label: 'Biomassa' },
            { value: 'CO₂', label: 'Capturado' }
        ]
    },
    'orbit-seed': {
        title: '🌱 Sementes Crioulas',
        desc: 'Preservamos mais de 2.000 variedades de sementes crioulas em nosso banco genético. A diversidade genética é essencial para a segurança alimentar.',
        stats: [
            { value: '2.000+', label: 'Variedades' },
            { value: '100%', label: 'Orgânicas' }
        ]
    },
    'orbit-water': {
        title: '💧 Água · Ouro Azul',
        desc: 'A água é o recurso mais precioso do planeta. Nossa irrigação inteligente economiza 60% de água comparado aos métodos tradicionais.',
        stats: [
            { value: '-60%', label: 'Consumo' },
            { value: 'IoT', label: 'Monitoramento' }
        ]
    },
    'orbit-sun': {
        title: '☀️ Energia Solar',
        desc: '100% das nossas operações são alimentadas por energia solar. Fazendas autossuficientes que geram mais energia do que consomem.',
        stats: [
            { value: '100%', label: 'Renovável' },
            { value: '50MW', label: 'Capacidade' }
        ]
    },
    'orbit-tree': {
        title: '🌳 Florestas',
        desc: 'Cada fazenda certificada mantém no mínimo 20% de sua área como reserva legal restaurada, criando corredores ecológicos.',
        stats: [
            { value: '20%', label: 'Reserva mínima' },
            { value: '350k', label: 'Hectares' }
        ]
    },
    'hint-globe': {
        title: '💡 Dica Interativa',
        desc: 'Clique em cada ícone em órbita ao redor do globo para aprender sobre os pilares da agricultura sustentável!',
        stats: [
            { value: '6', label: 'Ícones clicáveis' },
            { value: '🎯', label: 'Cada um tem info' }
        ]
    },
    'scroll-indicator': {
        title: '📜 Navegação',
        desc: 'Role para baixo para explorar todas as seções do site. Use a barra de progresso no topo para acompanhar sua leitura.',
        stats: [
            { value: '7', label: 'Seções' },
            { value: '100%', label: 'Interativo' }
        ]
    },

    // Pilares
    'section-pilares': {
        title: '🏛️ Pilares da Sustentabilidade',
        desc: 'Seis fundamentos que guiam todas as nossas ações. Cada pilar foi desenvolvido com base em décadas de pesquisa em agricultura regenerativa.',
        stats: [
            { value: '6', label: 'Pilares' },
            { value: '100%', label: 'Integrados' }
        ]
    },
    'pilar-solo': {
        title: '🌱 Solo Vivo · Pilar 1',
        desc: 'Um solo saudável contém bilhões de microrganismos por grama. Nossas práticas de plantio direto e compostagem aumentam a matéria orgânica em 40% em 3 anos. O solo é a base de tudo.',
        stats: [
            { value: '+40%', label: 'Matéria Orgânica' },
            { value: '3x', label: 'Mais Carbono' },
            { value: '1Bi', label: 'Microrganismos/g' }
        ],
        link: '#tecnologias'
    },
    'pilar-agua': {
        title: '💧 Água Consciente · Pilar 2',
        desc: 'Sistemas de irrigação por gotejamento com sensores IoT reduzem o desperdício em 60%. Cada gota é monitorada e utilizada com eficiência máxima. A água é vida.',
        stats: [
            { value: '-60%', label: 'Consumo' },
            { value: '98%', label: 'Eficiência' },
            { value: '24/7', label: 'Monitoramento' }
        ],
        link: '#tecnologias'
    },
    'pilar-biodiversidade': {
        title: '🦋 Biodiversidade · Pilar 3',
        desc: 'Corredores ecológicos conectam fragmentos de mata, permitindo o fluxo gênico de espécies nativas. A diversidade biológica é essencial para o equilíbrio do ecossistema.',
        stats: [
            { value: '+350', label: 'Espécies' },
            { value: '500km', label: 'Corredores' },
            { value: '65%', label: 'Aumento' }
        ],
        link: '#impacto'
    },
    'pilar-energia': {
        title: '☀️ Energia Limpa · Pilar 4',
        desc: 'Fazendas autossuficientes com painéis solares e biodigestores que transformam resíduos orgânicos em energia. 100% de energia renovável em todas as operações.',
        stats: [
            { value: '100%', label: 'Renovável' },
            { value: '50MW', label: 'Capacidade' },
            { value: '0', label: 'Emissões' }
        ],
        link: '#impacto'
    },
    'pilar-social': {
        title: '👥 Impacto Social · Pilar 5',
        desc: 'Apoiamos mais de 10.000 agricultores familiares com capacitação técnica, acesso a crédito e mercados justos. O desenvolvimento social é parte da sustentabilidade.',
        stats: [
            { value: '10k+', label: 'Famílias' },
            { value: 'R$50M', label: 'Crédito' },
            { value: '85%', label: 'Agricultura Familiar' }
        ],
        link: '#cases'
    },
    'pilar-carbono': {
        title: '☁️ Carbono Negativo · Pilar 6',
        desc: 'Nossas fazendas sequestram mais carbono do que emitem, gerando créditos de carbono de alta qualidade. Mais de 1,2 milhão de toneladas de CO₂ capturadas por ano.',
        stats: [
            { value: '1.250M', label: 't CO₂/ano' },
            { value: 'R$80M', label: 'Créditos' },
            { value: '-42%', label: 'Emissões líquidas' }
        ],
        link: '#impacto'
    },

    // Tecnologias
    'section-tech': {
        title: '🔬 Inovação no Campo',
        desc: 'Tecnologias de ponta que já estão revolucionando a agricultura mundial. Da semente à colheita, inovação e sustentabilidade andam juntas.',
        stats: [
            { value: '4', label: 'Categorias' },
            { value: '12', label: 'Tecnologias' }
        ]
    },
    'tab-satelite': {
        title: '🛰️ Monitoramento · Satélites e Drones',
        desc: 'Utilizamos constelações de satélites e drones equipados com sensores multiespectrais e hiperespectrais. Monitoramento 24/7 de cada centímetro da lavoura.',
        stats: [
            { value: '5cm', label: 'Resolução' },
            { value: '24/7', label: 'Monitoramento' },
            { value: '-30%', label: 'Insumos' }
        ]
    },
    'tab-robo': {
        title: '🤖 Robótica · Automação Inteligente',
        desc: 'Robôs autônomos equipados com visão computacional que plantam, capinam e colhem com precisão milimétrica. Redução de 90% no uso de herbicidas.',
        stats: [
            { value: '-90%', label: 'Herbicidas' },
            { value: '24h', label: 'Operação' },
            { value: '1mm', label: 'Precisão' }
        ]
    },
    'tab-bio': {
        title: '🧬 Biotecnologia · Bioinsumos',
        desc: 'Microrganismos benéficos (bactérias fixadoras de nitrogênio, fungos micorrízicos) que substituem fertilizantes químicos e regeneram o microbioma do solo.',
        stats: [
            { value: '100%', label: 'Orgânico' },
            { value: '+40%', label: 'Matéria Orgânica' },
            { value: '0', label: 'Químicos' }
        ]
    },
    'tab-iot': {
        title: '📡 IoT · Internet das Coisas',
        desc: 'Milhares de sensores conectados em tempo real. Umidade do solo, temperatura, umidade do ar, velocidade do vento. Tudo monitorado e otimizado por IA.',
        stats: [
            { value: '10k+', label: 'Sensores' },
            { value: '5ms', label: 'Latência' },
            { value: '-60%', label: 'Água' }
        ]
    },
    'feature-ndvi': {
        title: '📊 NDVI · Saúde da Planta',
        desc: 'Índice de Vegetação por Diferença Normalizada. Mede a saúde e vigor das plantas em tempo real, permitindo intervenções precisas antes que problemas apareçam.',
        stats: [
            { value: '95%', label: 'Precisão' },
            { value: 'Diário', label: 'Atualização' }
        ]
    },
    'feature-pragas': {
        title: '🐛 Alertas de Pragas · IA Preditiva',
        desc: 'Inteligência artificial identifica pragas em estágio inicial com 95% de precisão, permitindo controle biológico antes que causem danos econômicos.',
        stats: [
            { value: '95%', label: 'Precisão' },
            { value: '7 dias', label: 'Antecedência' }
        ]
    },
    'feature-aplicacao': {
        title: '🎯 Aplicação Localizada · Precisão',
        desc: 'Aplicação de bioinsumos apenas onde necessário. Redução de 40% no consumo de insumos e zero desperdício.',
        stats: [
            { value: '-40%', label: 'Insumos' },
            { value: '0%', label: 'Desperdício' }
        ]
    },
    'feature-capina': {
        title: '🌿 Capina Mecânica · Visão Computacional',
        desc: 'Robôs identificam ervas daninhas e as removem mecanicamente, eliminando a necessidade de herbicidas químicos.',
        stats: [
            { value: '-100%', label: 'Herbicidas' },
            { value: '99%', label: 'Precisão' }
        ]
    },
    'feature-bacterias': {
        title: '🦠 Bactérias Fixadoras',
        desc: 'Azospirillum, Rhizobium e outras bactérias que capturam nitrogênio atmosférico e o disponibilizam para as plantas, eliminando fertilizantes nitrogenados.',
        stats: [
            { value: '-100%', label: 'N sintético' },
            { value: '+30%', label: 'Produtividade' }
        ]
    },
    'feature-sensores': {
        title: '💧 Sensores de Umidade',
        desc: 'Sensores IoT em tempo real que monitoram a umidade do solo em múltiplas profundidades, acionando irrigação apenas quando necessário.',
        stats: [
            { value: '-60%', label: 'Água' },
            { value: 'Tempo Real', label: 'Dados' }
        ]
    },
    'visual-drone': {
        title: '🛸 Demonstração · Drones',
        desc: 'Nossos drones sobrevoam as lavouras capturando imagens em alta resolução. Processadas por IA, geram mapas de saúde da planta em minutos.',
        stats: [
            { value: '50km²', label: 'Cobertura/dia' },
            { value: '5cm', label: 'Resolução' }
        ]
    },
    'visual-robo': {
        title: '🤖 Demonstração · Robôs',
        desc: 'Robôs autônomos que navegam entre as plantas identificando e removendo ervas daninhas sem usar uma gota de herbicida.',
        stats: [
            { value: '24h', label: 'Autonomia' },
            { value: '100%', label: 'Elétrico' }
        ]
    },

    // Impacto
    'section-impacto': {
        title: '📊 Resultados Mensuráveis',
        desc: 'Dados auditados dos últimos 5 anos de operação em mais de 500 propriedades. Resultados que comprovam a eficácia da agricultura regenerativa.',
        stats: [
            { value: '500+', label: 'Propriedades' },
            { value: '5', label: 'Anos de dados' }
        ]
    },
    'metric-agua-impacto': {
        title: '💧 1.280 Milhões m³ · Água Economizada',
        desc: 'Volume equivalente ao consumo anual de água de 8 milhões de pessoas. Economia gerada por irrigação inteligente com IoT e cobertura do solo.',
        stats: [
            { value: '8M', label: 'Pessoas' },
            { value: '60%', label: 'Redução' },
            { value: '2020-2025', label: 'Período' }
        ]
    },
    'metric-area-impacto': {
        title: '🌳 350 Mil ha · Áreas Restauradas',
        desc: 'Área equivalente a 490 mil campos de futebol restaurados com vegetação nativa, corredores ecológicos e sistemas agroflorestais.',
        stats: [
            { value: '490k', label: 'Campos futebol' },
            { value: '+18%', label: 'ao ano' }
        ]
    },
    'metric-produtividade-impacto': {
        title: '📈 +42% · Aumento de Produtividade',
        desc: 'Aumento médio de produtividade nas fazendas que adotaram nossas práticas regenerativas. Em algumas culturas, o aumento chega a 85%.',
        stats: [
            { value: '42%', label: 'Média' },
            { value: '85%', label: 'Máximo' },
            { value: '0%', label: 'Expansão área' }
        ]
    },
    'metric-defensivos-impacto': {
        title: '🐛 -67% · Menos Defensivos',
        desc: 'Redução drástica no uso de defensivos químicos graças ao controle biológico, rotação de culturas e manejo integrado de pragas.',
        stats: [
            { value: '-67%', label: 'Químicos' },
            { value: '+100%', label: 'Biológicos' }
        ]
    },
    'metric-carbono-impacto': {
        title: '☁️ 1.250 Mil t · CO₂ Sequestrado',
        desc: 'Carbono capturado no solo graças ao plantio direto, compostagem e sistemas agroflorestais. Equivalente a tirar 270 mil carros das ruas.',
        stats: [
            { value: '270k', label: 'Carros' },
            { value: '+31%', label: 'ao ano' }
        ]
    },
    'metric-fazendas-impacto': {
        title: '🏡 580 Fazendas · Certificadas',
        desc: 'Propriedades que receberam o Selo AgroForte de Sustentabilidade, atestando conformidade com nossos rigorosos padrões ESG.',
        stats: [
            { value: '580', label: 'Certificadas' },
            { value: '+45%', label: 'em 2025' }
        ]
    },
    'chart-impacto': {
        title: '📊 Evolução 2020-2025',
        desc: 'Gráfico comparativo mostrando a evolução dos principais indicadores de sustentabilidade ao longo dos últimos 5 anos. Cada barra representa um indicador.',
        stats: [
            { value: '5', label: 'Anos' },
            { value: '4', label: 'Indicadores' }
        ]
    },

    // Jogo
    'section-jogo': {
        title: '🎮 Jogo da Memória Sustentável',
        desc: 'Aprenda sobre agricultura sustentável de forma divertida! Encontre os pares e descubra curiosidades sobre cada ícone do agro regenerativo.',
        stats: [
            { value: '4', label: 'Pares' },
            { value: '9', label: 'Cartas' }
        ]
    },
    'stat-pares-jogo': {
        title: '✅ Pares Encontrados',
        desc: 'Acompanhe quantos pares você já encontrou. Complete todos os 4 pares para vencer o jogo!',
        stats: [
            { value: '0/4', label: 'Progresso' },
            { value: '🏆', label: 'Meta' }
        ]
    },
    'stat-tentativas-jogo': {
        title: '🔄 Tentativas',
        desc: 'Número de jogadas realizadas. Tente completar o jogo no menor número possível de tentativas para bater o recorde!',
        stats: [
            { value: '🧠', label: 'Memória' },
            { value: '🏅', label: 'Recorde' }
        ]
    },
    'stat-recorde-jogo': {
        title: '🏆 Recorde',
        desc: 'O menor número de tentativas já registrado. Salvo no seu navegador. Desafie-se a bater seu próprio recorde!',
        stats: [
            { value: '💾', label: 'LocalStorage' },
            { value: '🏆', label: 'Desafio' }
        ]
    },
    'btn-reset-jogo': {
        title: '🔄 Reiniciar Jogo',
        desc: 'Comece um novo jogo do zero. Todas as cartas serão embaralhadas e o contador de tentativas será zerado.',
        stats: [
            { value: '🃏', label: 'Novo jogo' },
            { value: '0', label: 'Tentativas' }
        ]
    },
    'btn-shuffle-jogo': {
        title: '🔀 Embaralhar Cartas',
        desc: 'Embaralha apenas as cartas que ainda não foram encontradas. Útil se você quiser uma nova disposição sem perder o progresso.',
        stats: [
            { value: '🔀', label: 'Embaralha' },
            { value: '✅', label: 'Mantém pares' }
        ]
    },
    'hint-jogo': {
        title: '💡 Dica do Jogo',
        desc: 'Os pares são: Semente 🌱 (início do ciclo), Milho 🌽 (cultura regenerativa), Água 💧 (recurso vital), Sol ☀️ (energia limpa). Cada um representa um pilar da sustentabilidade.',
        stats: [
            { value: '🌱', label: 'Semente' },
            { value: '🌽', label: 'Milho' }
        ]
    },
    'card-semente-jogo': {
        title: '🌱 Semente da Sustentabilidade',
        desc: 'A semente simboliza o início de tudo. Trabalhamos com sementes crioulas e orgânicas, preservando a diversidade genética. Uma semente saudável é o primeiro passo.',
        stats: [
            { value: '2k+', label: 'Variedades' },
            { value: '100%', label: 'Crioulas' }
        ]
    },
    'card-milho-jogo': {
        title: '🌽 Milho Regenerativo',
        desc: 'O milho é uma das culturas mais importantes do mundo. Cultivado com práticas regenerativas, melhora o solo e produz alimentos mais nutritivos.',
        stats: [
            { value: '1Bi', label: 'Toneladas/ano' },
            { value: '+30%', label: 'Nutrientes' }
        ]
    },
    'card-agua-jogo': {
        title: '💧 Água Preservada',
        desc: 'A água é o recurso mais valioso do planeta. Nossa irrigação inteligente economiza 60% de água, preservando aquíferos e nascentes.',
        stats: [
            { value: '-60%', label: 'Consumo' },
            { value: '98%', label: 'Reuso' }
        ]
    },
    'card-sol-jogo': {
        title: '☀️ Energia Solar',
        desc: 'O sol é a fonte de energia mais abundante e limpa. 100% das nossas operações são alimentadas por energia solar, com zero emissões.',
        stats: [
            { value: '100%', label: 'Renovável' },
            { value: '0', label: 'Emissões' }
        ]
    },
    'game-progress-bar': {
        title: '📊 Progresso do Jogo',
        desc: 'Barra de progresso que mostra quanto você já completou do jogo. Chegue a 100% encontrando todos os pares!',
        stats: [
            { value: '0-100%', label: 'Progresso' },
            { value: '4', label: 'Pares totais' }
        ]
    },

    // Cases
    'section-cases': {
        title: '🏆 Histórias de Sucesso',
        desc: 'Conheça produtores reais que transformaram suas propriedades e suas vidas com agricultura sustentável. Histórias que inspiram.',
        stats: [
            { value: '3', label: 'Cases' },
            { value: '100%', label: 'Reais' }
        ]
    },
    'case-esperanca': {
        title: '🌾 Fazenda Esperança · MT',
        desc: 'João Carlos Mendes transformou 2.000 hectares de pastagem degradada em uma fazenda regenerativa modelo. Produtividade +45%, custos -60%.',
        stats: [
            { value: '+45%', label: 'Produtividade' },
            { value: '-60%', label: 'Custos' },
            { value: '2.000ha', label: 'Área' }
        ]
    },
    'case-bela-vista': {
        title: '🍃 Sítio Bela Vista · MG',
        desc: 'Maria Silva, agricultora familiar, adotou irrigação inteligente e bioinsumos. Hoje produz 100% orgânico e abastece a comunidade local.',
        stats: [
            { value: '-70%', label: 'Água' },
            { value: '100%', label: 'Orgânico' },
            { value: '200', label: 'Famílias' }
        ]
    },
    'case-agrotech': {
        title: '🤖 AgroTech Inovação · SP',
        desc: 'Robôs autônomos reduziram herbicidas em 95% e aumentaram precisão do plantio. Economia de R$ 500 mil por ano.',
        stats: [
            { value: '-95%', label: 'Herbicidas' },
            { value: 'R$500k', label: 'Economia/ano' },
            { value: '24/7', label: 'Operação' }
        ]
    },

    // Contato
    'section-contato': {
        title: '📬 Cultive o Futuro Conosco',
        desc: 'Junte-se a mais de 10.000 produtores que recebem conteúdo exclusivo sobre agricultura sustentável diretamente no e-mail.',
        stats: [
            { value: '10k+', label: 'Inscritos' },
            { value: 'Grátis', label: 'Sempre' }
        ]
    },
    'input-email': {
        title: '📧 Seu E-mail',
        desc: 'Digite seu melhor e-mail para receber nossa newsletter semanal. Não enviamos spam e você pode cancelar quando quiser.',
        stats: [
            { value: '🔒', label: 'Seguro' },
            { value: '📬', label: 'Semanal' }
        ]
    },
    'btn-newsletter': {
        title: '🚀 Inscrever-se',
        desc: 'Comece a receber conteúdo exclusivo sobre agricultura regenerativa, cases de sucesso e dicas práticas para sua propriedade.',
        stats: [
            { value: '📚', label: 'Conteúdo' },
            { value: '🎯', label: 'Focado' }
        ]
    },
    'newsletter-features': {
        title: '✅ Benefícios',
        desc: 'Conteúdo exclusivo semanal, acesso a webinars, e-books gratuitos, convites para eventos e muito mais.',
        stats: [
            { value: '📖', label: 'E-books' },
            { value: '🎥', label: 'Webinars' }
        ]
    },
    'social-linkedin': {
        title: '💼 LinkedIn',
        desc: 'Siga-nos no LinkedIn para novidades, artigos técnicos e vagas de trabalho na área de agricultura sustentável.',
        stats: [
            { value: '50k+', label: 'Seguidores' },
            { value: 'Diário', label: 'Posts' }
        ]
    },
    'social-instagram': {
        title: '📸 Instagram',
        desc: 'Fotos e stories diários do campo sustentável. Veja na prática como é a agricultura regenerativa.',
        stats: [
            { value: '100k+', label: 'Seguidores' },
            { value: '🌾', label: 'Conteúdo' }
        ]
    },
    'social-youtube': {
        title: '▶️ YouTube',
        desc: 'Webinars, tutoriais e documentários sobre agricultura sustentável. Conteúdo novo toda semana.',
        stats: [
            { value: '500+', label: 'Vídeos' },
            { value: '1M+', label: 'Visualizações' }
        ]
    },

    // Footer
    'footer-brand': {
        title: '🌱 AgroForte',
        desc: 'Empresa certificada B Corporation, Carbon Trust, Rainforest Alliance e ISO 14001. Compromisso total com a sustentabilidade.',
        stats: [
            { value: 'B Corp', label: 'Certificação' },
            { value: '2020', label: 'Fundação' }
        ]
    },
    'footer-esg': {
        title: '📄 Relatório ESG 2025',
        desc: 'Acesse nosso relatório completo de Environmental, Social and Governance. Dados auditados e transparentes.',
        stats: [
            { value: '150', label: 'Páginas' },
            { value: '📊', label: 'Gráficos' }
        ]
    },
    'footer-calculadora': {
        title: '🧮 Calculadora de Carbono',
        desc: 'Calcule a pegada de carbono da sua propriedade e descubra como reduzi-la com práticas regenerativas.',
        stats: [
            { value: 'CO₂', label: 'Cálculo' },
            { value: 'Grátis', label: 'Acesso' }
        ]
    },
    'footer-blog': {
        title: '📝 Blog Sustentável',
        desc: 'Artigos técnicos e cases sobre agricultura regenerativa. Novo conteúdo toda semana.',
        stats: [
            { value: '200+', label: 'Artigos' },
            { value: '50k', label: 'Leitores' }
        ]
    },
    'footer-sobre': {
        title: 'ℹ️ Sobre Nós',
        desc: 'Conheça nossa história, equipe e missão. Somos apaixonados por agricultura sustentável.',
        stats: [
            { value: '200+', label: 'Colaboradores' },
            { value: '12', label: 'Países' }
        ]
    }
};

// ===== FUNÇÃO PARA CRIAR MODAL MELHORADO =====
function createEnhancedModal() {
    // Remove modal antigo se existir
    const oldModal = document.getElementById('agro-info-modal');
    if (oldModal) oldModal.remove();

    const modal = document.createElement('div');
    modal.id = 'agro-info-modal';
    modal.style.cssText = `
        position: fixed;
        inset: 0;
        z-index: 100000;
        display: none;
        align-items: center;
        justify-content: center;
        padding: 20px;
    `;

    modal.innerHTML = `
        <div style="position:absolute;inset:0;background:rgba(0,0,0,0.7);backdrop-filter:blur(15px);" id="modal-overlay"></div>
        <div style="
            position:relative;
            background:rgba(8,25,10,0.95);
            backdrop-filter:blur(30px);
            border:1px solid rgba(139,195,74,0.3);
            border-radius:40px;
            padding:40px;
            max-width:550px;
            width:100%;
            box-shadow:0 30px 60px rgba(0,0,0,0.5),0 0 60px rgba(76,175,80,0.2),inset 0 0 40px rgba(76,175,80,0.05);
            transform:scale(0.9) translateY(20px);
            transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
            max-height:90vh;
            overflow-y:auto;
        " id="modal-container">
            <button style="
                position:absolute;
                top:20px;
                right:20px;
                background:rgba(27,94,32,0.5);
                border:1px solid rgba(139,195,74,0.3);
                color:white;
                width:40px;
                height:40px;
                border-radius:14px;
                font-size:1.2rem;
                cursor:pointer;
                transition:all 0.3s;
                display:flex;
                align-items:center;
                justify-content:center;
            " id="modal-close-btn" onmouseover="this.style.background='#2e7d32';this.style.borderColor='#8bc34a'" onmouseout="this.style.background='rgba(27,94,32,0.5)';this.style.borderColor='rgba(139,195,74,0.3)'">
                <i class="fas fa-times"></i>
            </button>
            <div style="text-align:center;font-size:3.5rem;margin-bottom:20px;" id="modal-icon">
                <i class="fas fa-leaf"></i>
            </div>
            <h2 style="font-family:'Syne',sans-serif;font-size:1.8rem;margin-bottom:15px;color:#e8f5e9;" id="modal-title">
                Informação
            </h2>
            <p style="color:#a5d6a7;margin-bottom:25px;line-height:1.8;" id="modal-description">
                Carregando...
            </p>
            <div style="display:flex;gap:15px;margin-bottom:25px;flex-wrap:wrap;" id="modal-stats"></div>
            <div style="display:flex;gap:15px;flex-wrap:wrap;">
                <button id="modal-action-btn" style="
                    padding:14px 28px;
                    background:linear-gradient(135deg,#2e7d32,#1b5e20);
                    border:1px solid #4caf50;
                    border-radius:50px;
                    color:white;
                    font-weight:600;
                    cursor:pointer;
                    transition:all 0.3s;
                    display:flex;
                    align-items:center;
                    gap:10px;
                " onmouseover="this.style.background='#3a8a3a';this.style.transform='translateY(-2px)';this.style.boxShadow='0 10px 25px rgba(27,94,32,0.5)'" onmouseout="this.style.background='linear-gradient(135deg,#2e7d32,#1b5e20)';this.style.transform='';this.style.boxShadow=''">
                    <span>Saiba Mais</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
                <button id="modal-close-btn2" style="
                    padding:14px 28px;
                    background:transparent;
                    border:1px solid rgba(139,195,74,0.3);
                    border-radius:50px;
                    color:#c8e6c9;
                    font-weight:500;
                    cursor:pointer;
                    transition:all 0.3s;
                " onmouseover="this.style.borderColor='#8bc34a';this.style.background='rgba(139,195,74,0.05)'" onmouseout="this.style.borderColor='rgba(139,195,74,0.3)';this.style.background='transparent'">
                    Fechar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    return modal;
}

// ===== INICIALIZAR MODAL MELHORADO =====
const infoModal = createEnhancedModal();
const modalOverlay = document.getElementById('modal-overlay');
const modalContainer = document.getElementById('modal-container');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalCloseBtn2 = document.getElementById('modal-close-btn2');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalStats = document.getElementById('modal-stats');
const modalActionBtn = document.getElementById('modal-action-btn');

function openInfoModal(infoKey) {
    const info = AGRO_INFO[infoKey];
    if (!info) return;

    modalTitle.textContent = info.title;
    modalDescription.textContent = info.desc;

    // Renderizar estatísticas
    if (info.stats && info.stats.length > 0) {
        modalStats.innerHTML = info.stats.map(stat => `
            <div style="
                text-align:center;
                padding:12px 16px;
                background:rgba(27,94,32,0.3);
                border-radius:20px;
                border:1px solid rgba(139,195,74,0.2);
                min-width:80px;
            ">
                <div style="font-size:1.3rem;font-weight:700;color:#cddc39;text-shadow:0 0 15px rgba(205,220,57,0.5);">${stat.value}</div>
                <div style="font-size:0.75rem;color:#81c784;text-transform:uppercase;letter-spacing:1px;">${stat.label}</div>
            </div>
        `).join('');
        modalStats.style.display = 'flex';
    } else {
        modalStats.style.display = 'none';
    }

    // Configurar botão de ação
    if (info.link) {
        modalActionBtn.style.display = 'flex';
        modalActionBtn.onclick = () => {
            closeInfoModal();
            document.querySelector(info.link).scrollIntoView({ behavior: 'smooth' });
        };
    } else {
        modalActionBtn.style.display = 'none';
    }

    infoModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
        modalContainer.style.transform = 'scale(1) translateY(0)';
    }, 10);
}

function closeInfoModal() {
    modalContainer.style.transform = 'scale(0.9) translateY(20px)';
    setTimeout(() => {
        infoModal.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

modalCloseBtn.addEventListener('click', closeInfoModal);
modalCloseBtn2.addEventListener('click', closeInfoModal);
modalOverlay.addEventListener('click', closeInfoModal);

// Fechar com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && infoModal.style.display === 'flex') {
        closeInfoModal();
    }
});

// ===== TOOLTIP MELHORADO =====
function createEnhancedTooltip() {
    const oldTooltip = document.getElementById('agro-tooltip');
    if (oldTooltip) oldTooltip.remove();

    const tooltip = document.createElement('div');
    tooltip.id = 'agro-tooltip';
    tooltip.style.cssText = `
        position: fixed;
        background: rgba(8,25,10,0.95);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(139,195,74,0.4);
        border-radius: 30px;
        padding: 12px 20px;
        color: #e8f5e9;
        font-size: 0.9rem;
        pointer-events: none;
        z-index: 99999;
        opacity: 0;
        transition: opacity 0.2s;
        box-shadow: 0 15px 35px rgba(0,0,0,0.5), 0 0 25px rgba(76,175,80,0.15);
        max-width: 280px;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    document.body.appendChild(tooltip);
    return tooltip;
}

const agroTooltip = createEnhancedTooltip();

function showTooltip(e, infoKey) {
    const info = AGRO_INFO[infoKey];
    if (!info) return;

    agroTooltip.innerHTML = `<i class="fas fa-info-circle" style="color:#8bc34a;font-size:1.1rem;"></i> <span>${info.title}</span>`;
    agroTooltip.style.left = Math.min(e.clientX + 20, window.innerWidth - 300) + 'px';
    agroTooltip.style.top = (e.clientY - 10) + 'px';
    agroTooltip.style.opacity = '1';
}

function hideTooltip() {
    agroTooltip.style.opacity = '0';
}

// ===== ADICIONAR INTERATIVIDADE A TODOS OS ELEMENTOS =====
function addInteractivityToAllElements() {
    // Selecionar TODOS os elementos interativos possíveis
    const interactiveElements = document.querySelectorAll(`
        .interactive,
        [data-info],
        .logo, .logo-badge, .nav-link, .theme-toggle-premium,
        .hero-badge-premium, .hero-title .line, .hero-description-master,
        .btn-primary-master, .btn-outline-master, .btn-ghost-master,
        .stat-item-master, .orbit-item,
        .pilar-card, .tab-btn-premium, .feature-list-premium li,
        .tech-visual, .btn-learn,
        .metric-card-premium, .impact-chart,
        .memory-card-premium, .game-stat, .game-btn, .game-hint-premium,
        .info-card, .game-progress,
        .case-card-premium,
        .newsletter-form input, .newsletter-btn, .newsletter-features span,
        .social-link, .footer-links a, .footer-brand,
        .globe-3d-premium, .scroll-indicator-premium,
        [onclick], button, a[href="#"]
    `);

    const processed = new Set();

    interactiveElements.forEach(el => {
        // Evitar processar o mesmo elemento duas vezes
        if (processed.has(el)) return;
        processed.add(el);

        // Determinar a chave de informação
        let infoKey = el.getAttribute('data-info');
        if (!infoKey) {
            // Tentar inferir por classes
            if (el.classList.contains('logo')) infoKey = 'logo';
            else if (el.classList.contains('logo-badge')) infoKey = 'badge';
            else if (el.classList.contains('nav-link')) {
                const href = el.getAttribute('href');
                if (href === '#home') infoKey = 'nav-home';
                else if (href === '#tecnologias') infoKey = 'nav-tecnologias';
                else if (href === '#impacto') infoKey = 'nav-impacto';
                else if (href === '#jogo') infoKey = 'nav-jogo';
                else if (href === '#cases') infoKey = 'nav-cases';
                else if (href === '#contato') infoKey = 'nav-contato';
            }
            else if (el.classList.contains('theme-toggle-premium')) infoKey = 'theme-toggle';
            else if (el.classList.contains('hero-badge-premium')) infoKey = 'badge-hero';
            else if (el.closest('.hero-title')) {
                if (el.textContent.includes('Equilíbrio')) infoKey = 'title-equilibrio';
                else if (el.textContent.includes('produção')) infoKey = 'title-producao';
                else if (el.textContent.includes('meio ambiente')) infoKey = 'title-meioambiente';
            }
            else if (el.classList.contains('hero-description-master')) infoKey = 'hero-description';
            else if (el.classList.contains('btn-primary-master')) infoKey = 'btn-jogar';
            else if (el.classList.contains('btn-outline-master')) infoKey = 'btn-impacto';
            else if (el.classList.contains('btn-ghost-master')) infoKey = 'btn-cases';
            else if (el.closest('.hero-stats-master')) {
                if (el.textContent.includes('CO₂')) infoKey = 'stat-co2';
                else if (el.textContent.includes('Biodiversidade')) infoKey = 'stat-bio';
                else if (el.textContent.includes('Água')) infoKey = 'stat-agua';
            }
            else if (el.closest('.globe-3d-premium') && !el.closest('.orbit-item')) infoKey = 'globe-3d';
            else if (el.classList.contains('orbit-item')) {
                const icon = el.querySelector('i');
                if (icon) {
                    if (icon.classList.contains('fa-leaf')) infoKey = 'orbit-leaf';
                    else if (icon.classList.contains('fa-seedling')) infoKey = 'orbit-seed';
                    else if (icon.classList.contains('fa-tint')) infoKey = 'orbit-water';
                    else if (icon.classList.contains('fa-sun')) infoKey = 'orbit-sun';
                    else if (icon.classList.contains('fa-tree')) infoKey = 'orbit-tree';
                }
            }
            else if (el.classList.contains('scroll-indicator-premium')) infoKey = 'scroll-indicator';
            else if (el.closest('.pilares-grid')) {
                if (el.textContent.includes('Solo')) infoKey = 'pilar-solo';
                else if (el.textContent.includes('Água')) infoKey = 'pilar-agua';
                else if (el.textContent.includes('Biodiversidade')) infoKey = 'pilar-biodiversidade';
                else if (el.textContent.includes('Energia')) infoKey = 'pilar-energia';
                else if (el.textContent.includes('Social')) infoKey = 'pilar-social';
                else if (el.textContent.includes('Carbono')) infoKey = 'pilar-carbono';
            }
            else if (el.classList.contains('metric-card-premium')) {
                if (el.textContent.includes('Água')) infoKey = 'metric-agua-impacto';
                else if (el.textContent.includes('Áreas')) infoKey = 'metric-area-impacto';
                else if (el.textContent.includes('Produtividade')) infoKey = 'metric-produtividade-impacto';
                else if (el.textContent.includes('Defensivos')) infoKey = 'metric-defensivos-impacto';
                else if (el.textContent.includes('CO₂')) infoKey = 'metric-carbono-impacto';
                else if (el.textContent.includes('Fazendas')) infoKey = 'metric-fazendas-impacto';
            }
            else if (el.classList.contains('game-container')) infoKey = 'section-jogo';
            else if (el.closest('.game-stats-premium')) {
                if (el.textContent.includes('Pares')) infoKey = 'stat-pares-jogo';
                else if (el.textContent.includes('Tentativas')) infoKey = 'stat-tentativas-jogo';
                else if (el.textContent.includes('Recorde')) infoKey = 'stat-recorde-jogo';
            }
            else if (el.id === 'reset-game-btn') infoKey = 'btn-reset-jogo';
            else if (el.id === 'shuffle-game-btn') infoKey = 'btn-shuffle-jogo';
            else if (el.classList.contains('game-hint-premium')) infoKey = 'hint-jogo';
            else if (el.closest('.game-info-cards')) {
                if (el.textContent.includes('Semente')) infoKey = 'card-semente-jogo';
                else if (el.textContent.includes('Milho')) infoKey = 'card-milho-jogo';
                else if (el.textContent.includes('Água')) infoKey = 'card-agua-jogo';
                else if (el.textContent.includes('Sol')) infoKey = 'card-sol-jogo';
            }
            else if (el.closest('.game-progress')) infoKey = 'game-progress-bar';
            else if (el.closest('.cases-grid')) {
                if (el.textContent.includes('Esperança')) infoKey = 'case-esperanca';
                else if (el.textContent.includes('Bela Vista')) infoKey = 'case-bela-vista';
                else if (el.textContent.includes('AgroTech')) infoKey = 'case-agrotech';
            }
            else if (el.closest('.contact-container')) {
                if (el.tagName === 'INPUT') infoKey = 'input-email';
                else if (el.tagName === 'BUTTON' && el.type === 'submit') infoKey = 'btn-newsletter';
                else if (el.closest('.newsletter-features')) infoKey = 'newsletter-features';
            }
            else if (el.closest('.social-links-premium')) {
                const icon = el.querySelector('i');
                if (icon) {
                    if (icon.classList.contains('fa-linkedin-in')) infoKey = 'social-linkedin';
                    else if (icon.classList.contains('fa-instagram')) infoKey = 'social-instagram';
                    else if (icon.classList.contains('fa-youtube')) infoKey = 'social-youtube';
                }
            }
            else if (el.closest('.footer-brand-premium')) infoKey = 'footer-brand';
            else if (el.closest('.footer-links-premium')) {
                if (el.textContent.includes('ESG')) infoKey = 'footer-esg';
                else if (el.textContent.includes('Calculadora')) infoKey = 'footer-calculadora';
                else if (el.textContent.includes('Blog')) infoKey = 'footer-blog';
                else if (el.textContent.includes('Sobre')) infoKey = 'footer-sobre';
            }
            else if (el.closest('.impact-chart')) infoKey = 'chart-impacto';
            else if (el.closest('section')) {
                const sectionId = el.closest('section').id;
                if (sectionId === 'tecnologias') infoKey = 'section-tech';
                else if (sectionId === 'impacto') infoKey = 'section-impacto';
                else if (sectionId === 'jogo') infoKey = 'section-jogo';
                else if (sectionId === 'cases') infoKey = 'section-cases';
                else if (sectionId === 'contato') infoKey = 'section-contato';
            }
        }

        if (!infoKey) return;

        // Adicionar estilo de cursor
        el.style.cursor = 'pointer';
        
        // Adicionar tooltip no hover
        el.addEventListener('mouseenter', (e) => {
            showTooltip(e, infoKey);
            el.style.transform = el.style.transform || '';
            el.style.transition = 'all 0.3s cubic-bezier(0.23,1,0.32,1)';
        });
        
        el.addEventListener('mousemove', (e) => {
            agroTooltip.style.left = Math.min(e.clientX + 20, window.innerWidth - 300) + 'px';
            agroTooltip.style.top = (e.clientY - 10) + 'px';
        });
        
        el.addEventListener('mouseleave', () => {
            hideTooltip();
        });

        // Abrir modal no clique
        el.addEventListener('click', (e) => {
            // Não impedir navegação de links internos
            const href = el.getAttribute('href');
            if (href && href.startsWith('#') && href !== '#') {
                // Permite navegação mas também mostra info
                openInfoModal(infoKey);
                return;
            }
            
            // Não disparar em botões de formulário
            if (el.tagName === 'BUTTON' && el.type === 'submit') return;
            if (el.tagName === 'INPUT') return;
            
            e.preventDefault();
            e.stopPropagation();
            openInfoModal(infoKey);
        });

        // Adicionar indicador visual de interatividade
        if (!el.querySelector('.interactive-indicator') && !el.closest('.memory-board-premium')) {
            const indicator = document.createElement('span');
            indicator.className = 'interactive-indicator';
            indicator.style.cssText = `
                position: absolute;
                top: 8px;
                right: 8px;
                width: 8px;
                height: 8px;
                background: #cddc39;
                border-radius: 50%;
                opacity: 0;
                transition: opacity 0.3s;
                box-shadow: 0 0 10px #8bc34a;
                pointer-events: none;
                z-index: 10;
            `;
            el.style.position = el.style.position || 'relative';
            el.appendChild(indicator);
            
            el.addEventListener('mouseenter', () => { indicator.style.opacity = '1'; });
            el.addEventListener('mouseleave', () => { indicator.style.opacity = '0'; });
        }
    });

    console.log('✅ AgroForte · Interatividade total ativada! ' + processed.size + ' elementos interativos mapeados.');
}

// ===== INICIALIZAR QUANDO O DOM ESTIVER PRONTO =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addInteractivityToAllElements);
} else {
    addInteractivityToAllElements();
}

// ===== RE-ESCANEAR APÓS MUDANÇAS NO DOM =====
const domObserver = new MutationObserver(() => {
    addInteractivityToAllElements();
});

domObserver.observe(document.body, {
    childList: true,
    subtree: true
});

console.log('🌱 AgroForte · Módulo de interatividade total carregado!');
console.log('📚 ' + Object.keys(AGRO_INFO).length + ' tópicos informativos disponíveis.');
console.log('🖱️ Clique em qualquer elemento para aprender sobre sustentabilidade!');s
