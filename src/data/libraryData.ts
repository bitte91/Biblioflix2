export interface Verse {
  number: number;
  text: string;
}

export interface Chapter {
  number: number;
  title?: string;
  subtitle?: string;
  verses?: Verse[];
  content?: string[]; // for books formatted in paragraphs
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year?: string;
  category: string;
  type: 'bible' | 'book' | 'original';
  coverUrl: string;
  rating: number;
  ratingCount: string;
  synopsis: string;
  description?: string;
  aiInsights: string;
  readingTime: string;
  format: string;
  tags: string[];
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  progressPercent?: number;
  audioDuration?: string;
  chapters: Chapter[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  borderGlow: 'red' | 'blue' | 'green' | 'amber' | 'purple';
}

export const CATEGORIES: Category[] = [
  {
    id: 'biblia-teologia',
    name: 'Bíblias & Teologia',
    description: 'Bíblias de estudo, comentários exegéticos e planos devocionais.',
    icon: 'menu_book',
    color: 'from-amber-500 to-orange-700',
    borderGlow: 'amber',
  },
  {
    id: 'ia-trabalho',
    name: 'IA no Trabalho',
    description: 'Produtividade e ferramentas de inteligência artificial aplicadas.',
    icon: 'smart_toy',
    color: 'from-cyan-500 to-blue-700',
    borderGlow: 'blue',
  },
  {
    id: 'administracao',
    name: 'Administração',
    description: 'Gestão, processos e governança corporativa de alto nível.',
    icon: 'work',
    color: 'from-red-600 to-rose-800',
    borderGlow: 'red',
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Vendas, tráfego, copywriting e presença digital estratégica.',
    icon: 'campaign',
    color: 'from-emerald-500 to-teal-700',
    borderGlow: 'green',
  },
  {
    id: 'financas',
    name: 'Finanças',
    description: 'Investimentos, controle financeiro e gestão de patrimônio.',
    icon: 'payments',
    color: 'from-blue-500 to-indigo-700',
    borderGlow: 'blue',
  },
  {
    id: 'rh',
    name: 'Recursos Humanos',
    description: 'Gestão de pessoas, cultura e liderança transformacional.',
    icon: 'groups',
    color: 'from-purple-500 to-pink-700',
    borderGlow: 'purple',
  },
  {
    id: 'produtividade',
    name: 'Produtividade',
    description: 'Métodos ágeis, gestão de tempo e foco no resultado.',
    icon: 'rocket_launch',
    color: 'from-orange-500 to-amber-600',
    borderGlow: 'amber',
  },
  {
    id: 'classicos-misterio',
    name: 'Clássicos & Mistério',
    description: 'Obras-primas da literatura mundial e mistérios envolventes.',
    icon: 'auto_stories',
    color: 'from-red-700 to-black',
    borderGlow: 'red',
  },
];

export const BOOKS_DATABASE: Book[] = [
  // 1. FIXED BIBLE: BÍBLIA DE ESTUDO GLOBAL (ARA)
  {
    id: 'biblia-estudo-global',
    title: 'Bíblia de Estudo Global',
    author: 'Versão ARA (Almeida Revista e Atualizada)',
    year: '2024',
    category: 'Bíblias & Teologia',
    type: 'bible',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    rating: 5.0,
    ratingCount: '48.2k',
    synopsis: 'A Bíblia de Estudo Global oferece uma abordagem profunda com mapas arqueológicos, notas de rodapé interativas, concordância temática e recursos visuais para um estudo transformador das Sagradas Escrituras.',
    aiInsights: 'Ideal para leitura diária, estudos teológicos aprofundados, sermões e consultas arqueológicas com auxílio de IA.',
    readingTime: 'Ano Bíblico Completo',
    format: 'Bíblia Interativa com Áudio e Notas de Estudo',
    tags: ['Bíblia', 'Teologia', 'Antigo Testamento', 'Novo Testamento', 'Estudo'],
    isFeatured: true,
    isBestSeller: true,
    progressPercent: 35,
    audioDuration: '80h 45m',
    chapters: [
      {
        number: 1,
        title: 'Gênesis - Capítulo 1',
        subtitle: 'A Criação dos Céus e da Terra',
        verses: [
          { number: 1, text: 'No princípio, criou Deus os céus e a terra.' },
          { number: 2, text: 'A terra, porém, estava sem forma e vazia; havia trevas sobre a face do abismo, e o Espírito de Deus pairava por sobre as águas.' },
          { number: 3, text: 'Disse Deus: Haja luz; e houve luz.' },
          { number: 4, text: 'Viu Deus que a luz era boa; e fez separação entre a luz e as trevas.' },
          { number: 5, text: 'Chamou Deus à luz Dia e às trevas, Noite. Houve tarde e manhã, o primeiro dia.' },
          { number: 6, text: 'E disse Deus: Haja um firmamento no meio das águas e separação entre águas e águas.' },
          { number: 7, text: 'Fez, pois, Deus o firmamento e separou as águas debaixo do firmamento das águas que estavam sobre o firmamento. E assim se fez.' },
          { number: 8, text: 'E chamou Deus ao firmamento CÉUS. Houve tarde e manhã, o segundo dia.' },
          { number: 9, text: 'Disse também Deus: Ajuntem-se as águas debaixo dos céus num só lugar, e apareça a porção seca. E assim se fez.' },
          { number: 10, text: 'E chamou Deus à porção seca Terra; e ao ajuntamento das águas chamou Mares. E viu Deus que isso era bom.' },
          { number: 26, text: 'Também disse Deus: Façamos o homem à nossa imagem, conforme a nossa semelhança; tenha ele domínio sobre os peixes do mar, sobre as aves dos céus, sobre os animais domésticos, sobre toda a terra e sobre todos os répteis que rastejam pela terra.' },
          { number: 27, text: 'Criou Deus, pois, o homem à sua imagem, à imagem de Deus o criou; homem e mulher os criou.' },
          { number: 31, text: 'Viu Deus tudo quanto fizera, e eis que era muito bom. Houve tarde e manhã, o sexto dia.' },
        ],
      },
      {
        number: 23,
        title: 'Salmos - Capítulo 23',
        subtitle: 'O Senhor é o meu Pastor',
        verses: [
          { number: 1, text: 'O SENHOR é o meu pastor; nada me faltará.' },
          { number: 2, text: 'Ele me faz repousar em pastos verdejantes; leva-me para junto das águas de descanso;' },
          { number: 3, text: 'refrigera-me a alma. Guia-me pelas veredas da justiça por amor do seu nome.' },
          { number: 4, text: 'Ainda que eu ande pelo vale da sombra da morte, não temerei mal nenhum, porque tu estás comigo; a tua vara e o teu cajado me consolam.' },
          { number: 5, text: 'Preparas-me uma mesa na presença dos meus adversários, unges-me a cabeça com óleo; o meu cálice transborda.' },
          { number: 6, text: 'Com certeza que a bondade e a misericórdia me seguirão todos os dias da minha vida; e habitarei na Casa do SENHOR para todo o sempre.' },
        ],
      },
      {
        number: 1,
        title: 'Evangelho de João - Capítulo 1',
        subtitle: 'O Verbo se Fez Carne',
        verses: [
          { number: 1, text: 'No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus.' },
          { number: 2, text: 'Ele estava no princípio com Deus.' },
          { number: 3, text: 'Todas as coisas foram feitas por intermédio dele, e, sem ele, nada do que foi feito se fez.' },
          { number: 4, text: 'Nele estava a vida e a vida era a luz dos homens.' },
          { number: 5, text: 'A luz resplandece nas trevas, e as trevas não prevaleceram contra ela.' },
          { number: 14, text: 'E o Verbo se fez carne e habitou entre nós, cheio de graça e de verdade, e vimos a sua glória, glória como do Unigênito do Pai.' },
        ],
      },
      {
        number: 8,
        title: 'Romanos - Capítulo 8',
        subtitle: 'Nenhuma Condenação em Cristo',
        verses: [
          { number: 1, text: 'Agora, pois, já nenhuma condenação há para os que estão em Cristo Jesus, que não andam segundo a carne, mas segundo o Espírito.' },
          { number: 28, text: 'Sabemos que todas as coisas cooperam para o bem daqueles que amam a Deus, daqueles que são chamados segundo o seu propósito.' },
          { number: 31, text: 'Que diremos, pois, à vista destas coisas? Se Deus é por nós, quem será contra nós?' },
          { number: 38, text: 'Porque estou bem certo de que nem a morte, nem a vida, nem os anjos, nem os principados, nem as coisas do presente, nem do porvir, nem os poderes,' },
          { number: 39, text: 'nem a altura, nem a profundidade, nem qualquer outra criatura poderá separar-nos do amor de Deus, que está em Cristo Jesus, nosso Senhor.' },
        ],
      },
    ],
  },

  // 2. FIXED BIBLE: BÍBLIA ALMEIDA 21
  {
    id: 'biblia-almeida-21',
    title: 'Bíblia Almeida 21',
    author: 'Edição Século XXI',
    year: '2023',
    category: 'Bíblias & Teologia',
    type: 'bible',
    coverUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    ratingCount: '31.5k',
    synopsis: 'A tradução Almeida 21 combina a fidelidade histórica do texto tradicional com a fluidez e clareza do português contemporâneo do século XXI.',
    aiInsights: 'Apresenta linguagem refinada sem perder a solidez doutrinária das versões clássicas de João Ferreira de Almeida.',
    readingTime: 'Leitura Fluida',
    format: 'Ebook Interativo & Audiobíblia',
    tags: ['Bíblia', 'Almeida 21', 'Devocional', 'Novo Testamento'],
    isFeatured: true,
    progressPercent: 12,
    audioDuration: '72h 10m',
    chapters: [
      {
        number: 1,
        title: 'Mateus - Capítulo 5',
        subtitle: 'O Sermão do Monte e as Bem-Aventuranças',
        verses: [
          { number: 1, text: 'Vendo Jesus as multidões, subiu ao monte; e, assentando-se, aproximaram-se dele os seus discípulos.' },
          { number: 2, text: 'E, abrindo a boca, os ensinava, dizendo:' },
          { number: 3, text: 'Bem-aventurados os pobres de espírito, porque deles é o Reino dos céus;' },
          { number: 4, text: 'bem-aventurados os que choram, porque serão consolados;' },
          { number: 5, text: 'bem-aventurados os mansos, porque herdarão a terra;' },
          { number: 6, text: 'bem-aventurados os que têm fome e sede de justiça, porque serão fartos;' },
          { number: 14, text: 'Vós sois a luz do mundo; não se pode esconder uma cidade edificada sobre um monte;' },
          { number: 16, text: 'Assim resplandeça a vossa luz diante dos homens, para que vejam as vossas boas obras e glorifiquem a vosso Pai, que está nos céus.' },
        ],
      },
      {
        number: 1,
        title: 'Provérbios - Capítulo 3',
        subtitle: 'Exortação à Sabedoria e Confiança',
        verses: [
          { number: 1, text: 'Filho meu, não te esqueças da minha lei, e o teu coração guarde os meus mandamentos.' },
          { number: 5, text: 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.' },
          { number: 6, text: 'Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.' },
          { number: 7, text: 'Não sejas sábio aos teus próprios olhos; teme ao Senhor e aparta-te do mal.' },
        ],
      },
    ],
  },

  // 3. PAI RICO, PAI POBRE
  {
    id: 'pai-rico-pai-pobre',
    title: 'Pai Rico, Pai Pobre',
    author: 'Robert T. Kiyosaki',
    year: '1997',
    category: 'Finanças',
    type: 'book',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUEHjCvsNrAG6JsZSXSmUa-iq16c56Q_v4yAVZEXBflEyQjRIn2jtJpDoJFTSUawmxtOJB_2HgnqGKWq4N9ZbByYz1QhOT-xQDwdSUCDpC6_IYMQ5Wr-hrBF3SuPXt4912mMGWQ35IDe-wFJJDW5RB5dTDk-adGPqBxoORipx48zf5JPSr3KvvVWPkO0PzbtcxnBE2Ygomv2B18VleaVeGeCQETVnP2vpXXNwGVun9LflAsJbcL4Hxow',
    rating: 4.8,
    ratingCount: '12.4k',
    synopsis: 'Pai Rico, Pai Pobre é um dos livros de finanças pessoais mais lidos no mundo. Robert Kiyosaki compartilha as lições que aprendeu com seu "pai rico" e seu "pai pobre", desafiando a maneira convencional de pensar sobre dinheiro e investimento. O livro ensina como fazer o dinheiro trabalhar para você, em vez de você trabalhar pelo dinheiro.',
    aiInsights: 'Este livro é ideal para quem busca mudar o mindset sobre acumulação de riqueza, inteligência financeira e liberdade de ativos.',
    readingTime: '5h 30m',
    format: 'Ebook Interativo & Audiobook Premium',
    tags: ['Best Seller', 'Finanças', 'Investimentos', 'Mindset'],
    isBestSeller: true,
    isFeatured: true,
    isTrending: true,
    progressPercent: 65,
    audioDuration: '6h 12m',
    chapters: [
      {
        number: 1,
        title: 'Lição 1: Os ricos não trabalham pelo dinheiro',
        content: [
          'A maioria das pessoas passa a vida toda presa na corrida dos ratos: acordando, indo trabalhar, pagando contas e repetindo o ciclo no dia seguinte.',
          'O pai pobre dizia: "Estude bastante para encontrar uma boa empresa para trabalhar". O pai rico dizia: "Estude bastante para encontrar uma boa empresa para comprar".',
          'A verdadeira riqueza vem da criação de ativos que geram renda passiva recorrente. Quando seus ativos cobrem suas despesas diárias, você alcança a verdadeira liberdade financeira.',
        ],
      },
      {
        number: 2,
        title: 'Lição 2: Por que ensinar alfabetização financeira?',
        content: [
          'Você precisa saber a diferença entre um ativo e um passivo e comprar ativos. É só isso o que você precisa saber. Se deseja ser rico, isso é tudo.',
          'Um ativo coloca dinheiro no seu bolso. Um passivo tira dinheiro do seu bolso. As pessoas de classe média compram passivos acreditando que são ativos.',
        ],
      },
    ],
  },

  // 4. MINDSET
  {
    id: 'mindset',
    title: 'Mindset: A Nova Psicologia do Sucesso',
    author: 'Carol S. Dweck',
    year: '2006',
    category: 'IA no Trabalho',
    type: 'book',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFVLp4hJpX7iT7QnCqDHbMeQTi_keXF9p-4ywpdz92I-yHN17VqnePx3yaI0BADlEtetbDo823kdLwkJ7hYl8nhjL2Ro1GOENfOeSGdxYuYjUUAReM0CasvWpUbazSFnwVosRRjIbOOd1gNZ8YAgNRv_ipZX_NBqjVAxxP9li19Om5m-ya4kz1aZNvioBxz8q048cHb924Hi0TUvo_DKmTXfpSBoNk1Yqyf2PdRcudri26axqdEO5Xlg',
    rating: 4.9,
    ratingCount: '18.9k',
    synopsis: 'Carol Dweck revela como nossas atitudes mentais determinam nossa capacidade de aprender e superar desafios. O mindset fixo limita o potencial, enquanto o mindset de crescimento abre portas para realizações ilimitadas.',
    aiInsights: 'Essencial para líderes, educadores e profissionais de tecnologia que buscam resiliência e adaptação em tempos de mudança acelerada.',
    readingTime: '6h 15m',
    format: 'Ebook Interativo',
    tags: ['Psicologia', 'Desenvolvimento', 'Sucesso'],
    isTrending: true,
    progressPercent: 32,
    audioDuration: '7h 00m',
    chapters: [
      {
        number: 1,
        title: 'Os Dois Mindsets',
        content: [
          'A atitude mental não é mero traço de personalidade. É a chave para desenvolver habilidades no trabalho, nos relacionamentos e nos estudos.',
          'No mindset de crescimento, o fracasso não é uma identidade ("eu sou um fracasso"), mas sim uma informação ("isso não deu certo, vou aprender e tentar diferente").',
        ],
      },
    ],
  },

  // 5. HÁBITOS ATÔMICOS
  {
    id: 'habitos-atomicos',
    title: 'Hábitos Atômicos',
    author: 'James Clear',
    year: '2018',
    category: 'Produtividade',
    type: 'book',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsPh4g84b2bYb_TwVMI1d4RMAPXGUCPQcTnagOS9miP4XVJbenLFkTWNLpVD0zTRWdgnqYKvVH48c92hgTSpeg7Q1X65pLaqpe3NIB_JkRSgV9C0uTg9hmOZ7hTN4dyhfiwR6pGuzruND2UKCPYWINoFZtGUUxs_U-rbjHa8EG2i19GfO7d7EanoM1IJR0E_-TF3op5gMWETxxhylwFx6MOh5CXdBUohU32BGe89KrDLJLnkuRGilrnw',
    rating: 4.9,
    ratingCount: '29.1k',
    synopsis: 'Um método comprovado para construir bons hábitos e eliminar os maus através de melhorias de 1% a cada dia.',
    aiInsights: 'Foco na engenharia do ambiente e sistemas comportamentais contínuos.',
    readingTime: '5h 45m',
    format: 'Ebook Interativo',
    tags: ['Produtividade', 'Hábitos', 'Foco'],
    isTrending: true,
    progressPercent: 78,
    audioDuration: '5h 50m',
    chapters: [
      {
        number: 1,
        title: 'O Poder Surpreendente dos Hábitos Atômicos',
        content: [
          'Se você melhorar 1% a cada dia durante um ano, terminará 37 vezes melhor no final do período.',
          'Mudanças que parecem pequenas e insignificantes no início se transformarão em resultados notáveis se você estiver disposto a mantê-las por anos.',
        ],
      },
    ],
  },

  // 6. FOCO E ALTA PERFORMANCE
  {
    id: 'foco',
    title: 'Foco e Alta Performance',
    author: 'Daniel Goleman',
    year: '2013',
    category: 'Produtividade',
    type: 'book',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuy06nr_mPF9C1sVA0jwFdlF0lb1ugkV8dxr-XSTYj1-dE8VWQMyM0wT0WRVwyYYAggK5YTRp7TW4ckfCDaIb956lagZMfyPHAeSPCj_2A3tynaWddxMC7mrgyYk0dnIXr6T4F6_fxuiww4nmgUSKqimgYFmWDczTT_vgmRE2HRePsynSPsiJ-Qq0wyV3EROfQ_woc-dMcyrTIaXrBNf8TwDfoPvk12O74XIEAnF79L902WvRxuJfxuw',
    rating: 4.7,
    ratingCount: '8.3k',
    synopsis: 'Como a atenção concentrada determina a excelência no trabalho e na vida pessoal na era das distrações digitais.',
    aiInsights: 'Apresenta a tríade da atenção: foco interno, foco no outro e foco externo.',
    readingTime: '6h 00m',
    format: 'Ebook Interativo',
    tags: ['Foco', 'Mente', 'Liderança'],
    isTrending: true,
    progressPercent: 40,
    audioDuration: '6h 30m',
    chapters: [
      {
        number: 1,
        title: 'A Capacidade de Concentração',
        content: [
          'A atenção funciona muito como um músculo: se a usamos mal, definha; se a usamos bem, se desenvolve.',
          'Em um mundo sobrecarregado de estímulos, o foco é o ativo mais escasso e valioso.',
        ],
      },
    ],
  },

  // 7. MARKETING PARA VENDER MAIS
  {
    id: 'marketing-vender-mais',
    title: 'Marketing para Vender Mais',
    author: 'Carlos Mendonça',
    year: '2024',
    category: 'Marketing',
    type: 'original',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkVIyxkRrKbqBTT1qV8S4119i6BL5ftaS7hXLHLNZWvWfWp3rbIiQ7x-LS3_bvbNE9IWZ8Pg0dEWo2ClyrxLGrKTWVlRR7Q1xZenR0ODn8bWpXNayuwRsg7WLX-bcQPP5gV9-nYH5tnENkWWXpxbwXafgK3FQOkoPFwbYz8XVfD6vPWv3L_xoH3nR7OmYJ3IBAQXAJVOOIaHJzUmnA7JdHmmAFY13THTSUnoSdEbJlw0bsx5F4pw1eig',
    rating: 4.9,
    ratingCount: '15.2k',
    synopsis: 'O guia definitivo para transformar tráfego em vendas reais através de copywriting estratégico e análise de dados em tempo real.',
    aiInsights: 'Estratégias de funil direto, persuasão ética e automação com inteligência artificial.',
    readingTime: '4h 15m',
    format: 'Biblioflix Original',
    tags: ['Lançamento', 'Marketing', 'Vendas', 'Copywriting'],
    isFeatured: true,
    audioDuration: '4h 45m',
    chapters: [
      {
        number: 1,
        title: 'A Ciência da Conversão Direct-to-Consumer',
        content: [
          'Para vender mais, pare de tentar agradar a todos e foque na dor específica do seu cliente ideal.',
          'Anúncios de alta performance combinam gancho visual instantâneo com narrativa de identificação rápida.',
        ],
      },
    ],
  },

  // 8. AS AVENTURAS DE SHERLOCK HOLMES (FULL TEXT INCLUDED)
  {
    id: 'sherlock-holmes',
    title: 'As Aventuras de Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    year: '1892',
    category: 'Clássicos & Mistério',
    type: 'book',
    coverUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    ratingCount: '42.1k',
    synopsis: 'Doze casos narrados pelo Dr. Watson, do escândalo de um rei da Boêmia ao enigma da Liga dos Cabeças-Vermelhas — o método de dedução de Sherlock Holmes em sua forma mais célebre.',
    aiInsights: 'Obra clássica essencial para amantes de mistério, observação lógica e resolução de problemas.',
    readingTime: '8h 20m',
    format: 'Livro Clássico de Domínio Público',
    tags: ['Clássico', 'Mistério', 'Dedução', 'Londres'],
    audioDuration: '9h 15m',
    chapters: [
      {
        number: 1,
        title: 'Caso I: Um Escândalo na Boêmia',
        subtitle: 'A Scandal in Bohemia',
        content: [
          'Para Sherlock Holmes, ela era sempre A Mulher. Raras vezes o ouvi mencioná-la sob qualquer outro nome. Aos seus olhos, ela eclipsava e se destacava de todo o seu sexo.',
          'Não que ele sentisse uma emoção parecida com o amor por Irene Adler. Todas as emoções, e essa em particular, eram abomináveis para sua mente fria, precisa, mas admiravelmente equilibrada.',
          'Ele era a máquina de raciocinar e observar mais perfeita que o mundo já viu. Mas como amante, ele se colocaria em uma posição falsa. Ele nunca falava das paixões humanas sem um tom de zombaria.',
          'E contudo, só existiu uma mulher para ele: a falecida Irene Adler, de memória duvidosa e questionável.',
        ],
      },
      {
        number: 2,
        title: 'Caso II: A Liga dos Cabeças-Vermelhas',
        subtitle: 'The Red-Headed League',
        content: [
          'Visitei meu amigo, o Sr. Sherlock Holmes, certo dia no outono do ano passado e o encontrei em profunda conversa com um senhor idoso bastante corpulento, de rosto corado e cabelos vermelhos flamejantes.',
          'Holmes convidou-me a sentar e ouvir a extraordinária narrativa do Sr. Jabez Wilson sobre a misteriosa vaga na Liga dos Cabeças-Vermelhas.',
        ],
      },
      {
        number: 3,
        title: 'Caso III: A Faixa Pintada',
        subtitle: 'The Adventure of the Speckled Band',
        content: [
          'Ao examinar minhas notas sobre os mais de setenta casos nos quais estudei os métodos do meu amigo Sherlock Holmes durante os últimos oito anos, encontro muitos episódios trágicos e estranhos.',
          'Helen Stoner chegou em Baker Street em um estado de absoluto terror, falando sobre os assobios noturnos no Solar de Stoke Moran e a misteriosa morte de sua irmã Julia.',
        ],
      },
    ],
  },

  // 9. DRÁCULA (FULL TEXT INCLUDED)
  {
    id: 'dracula',
    title: 'Drácula',
    author: 'Bram Stoker',
    year: '1897',
    category: 'Clássicos & Mistério',
    type: 'book',
    coverUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    ratingCount: '53.0k',
    synopsis: 'Um romance epistolar — diários, cartas, telegramas e recortes de jornal — que reconstrói, fragmento a fragmento, o avanço do Conde Drácula da Transilvânia até a Inglaterra.',
    aiInsights: 'Obra monumental do terror gótico, explorando mistério, espiritualidade e a luta do bem contra o mal.',
    readingTime: '12h 00m',
    format: 'Livro Clássico de Domínio Público',
    tags: ['Terror', 'Gótico', 'Clássico', 'Vampiros'],
    audioDuration: '14h 30m',
    chapters: [
      {
        number: 1,
        title: 'Capítulo I: Diário de Jonathan Harker',
        subtitle: 'Bistritz & Passagem de Borgo',
        content: [
          '3 de Maio. Bistritz. — Saí de Munique às 20h35 do dia 1º de maio, chegando a Viena na manhã seguinte. Buda-Pesth parece um lugar maravilhoso pela vista que tive do trem.',
          'Eu estava me dirigindo para o leste, prestes a cruzar uma das pontes mais ocidentais sobre o Danúbio para entrar nas tradições do domínio turco.',
          'Encontrei uma carta do Conde Drácula no hotel: "Meu amigo — Bem-vindo aos Cárpatos. Estou ansiosamente à sua espera. Diga ao cocheiro para levá-lo até o Passo de Borgo onde minha carruagem o aguarda..."',
          'A velha senhora do hotel implorou para que eu não fosse: "Você sabe que dia é hoje? É a véspera do Dia de São Jorge. À meia-noite todas as coisas más do mundo terão pleno domínio!" Ela colocou um rosário com crucifixo no meu pescoço.',
        ],
      },
      {
        number: 2,
        title: 'Capítulo II: O Castelo do Conde',
        subtitle: 'Castle Dracula',
        content: [
          '5 de Maio. O Castelo. — Dentro da grande porta de carvalho estava um homem idoso, alto, de bigode branco e vestido de preto da cabeça aos pés.',
          'Ele disse em excelente inglês: "Bem-vindo à minha casa! Entre livremente e por sua própria vontade!" Sua mão parecia um torno de aço, fria como gelo — mais parecida com a mão de um morto do que de um vivo.',
        ],
      },
    ],
  },

  // 10. IA NO TRABALHO
  {
    id: 'ia-no-trabalho',
    title: 'IA no Trabalho: O Guia Prático de Produtividade',
    author: 'Biblioflix Originals',
    year: '2024',
    category: 'IA no Trabalho',
    type: 'original',
    coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtqpjyNck9DP-UmVSMt57ROKRML_Uxs5tnQ2-VapxNw8V5V2_MI0Nz_3TL1gmzclCe0jsqBAjLCgV8KHLvzM7bo8CHD44Yh-4B4uLXE_X89-q7A-oLb0hVzKbMMn552Rw2zD3o6q4UrkmddnUqX77LZE7KjBqJPXc4OOvTN9qslfC3WwPtiFGAQAaphMWqJ6hoOU3xix6IYDpKXvmSv6A5xd2Y29F8kVkJD-Fi7ru4L-7E_B-A5dHXlQ',
    rating: 4.9,
    ratingCount: '11.8k',
    synopsis: 'Como utilizar inteligência artificial generativa, agentes autônomos e modelos de linguagem para multiplicar sua velocidade de execução profissional por 10x.',
    aiInsights: 'Aplicações reais em programação, análise financeira, relatórios corporativos e automação diária.',
    readingTime: '3h 30m',
    format: 'Exclusivo Biblioflix',
    tags: ['IA', 'Tecnologia', 'Produtividade', 'Futuro'],
    isFeatured: true,
    audioDuration: '3h 45m',
    chapters: [
      {
        number: 1,
        title: 'Capítulo 1: A Nova Era dos Agentes Autônomos',
        content: [
          'A IA não é apenas um chatbot para tirar dúvidas; é um colaborador de alta capacidade operacional que pode ler documentos, processar dados e gerar soluções em segundos.',
          'Dominar a engenharia de contexto e o raciocínio em cadeia é a nova habilidade mais valorizada pelas lideranças globais.',
        ],
      },
    ],
  },
];

export const initialLibrary = BOOKS_DATABASE;
export const INITIAL_BOOKS = BOOKS_DATABASE;
export const fixedBibles = BOOKS_DATABASE.filter((b) => b.type === 'bible');
export const CATEGORIES_LIST = CATEGORIES;
