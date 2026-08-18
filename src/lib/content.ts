export type Level = "Iniciante" | "Intermediário" | "Avançado";

export type ContentItem = {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  level: Level;
  category: string;
  kind: "meditacao" | "ritual" | "limpeza" | "astrologia" | "ebook" | "audio";
  locked?: boolean;
  steps?: string[];
};

export const limpezas: ContentItem[] = [
  {
    id: "lp-ansiedade",
    title: "Limpeza para ansiedade",
    description: "Respiração do desaceleramento para reduzir a sensação de tensão.",
    duration: 7,
    level: "Iniciante",
    category: "Ansiedade",
    kind: "limpeza",
    steps: [
      "Sente-se confortavelmente e observe a respiração natural.",
      "Expire de maneira lenta, sem forçar o movimento do ar.",
      "Repita por alguns minutos mantendo a atenção no corpo.",
    ],
  },
  {
    id: "lp-estresse",
    title: "Limpeza para estresse",
    description: "Ritual de encerramento para soltar a sobrecarga do dia.",
    duration: 9,
    level: "Iniciante",
    category: "Estresse",
    kind: "limpeza",
    steps: [
      "Anote o que ficou pendente e escolha a primeira tarefa de amanhã.",
      "Relaxe ombros e mandíbula em cinco expirações.",
      "Encerre mentalmente o expediente.",
    ],
  },
  {
    id: "lp-cansaco",
    title: "Limpeza para cansaço",
    description: "Pausa restauradora para recuperar energia com gentileza.",
    duration: 8,
    level: "Iniciante",
    category: "Cansaço",
    kind: "limpeza",
    steps: [
      "Reduza estímulos e afaste-se das telas.",
      "Faça um escaneamento corporal do rosto aos pés.",
      "Permita-se descansar sem transformar em produtividade.",
    ],
  },
  {
    id: "lp-protecao",
    title: "Limpeza de proteção",
    description: "Visualização de campo luminoso e definição de limites.",
    duration: 11,
    level: "Intermediário",
    category: "Proteção",
    kind: "limpeza",
    steps: [
      "Imagine uma luz dourada contornando o seu corpo.",
      "Identifique uma situação em que precisa dizer não.",
      "Repita: eu posso escolher o que sustento.",
    ],
  },
  {
    id: "lp-prosperidade",
    title: "Limpeza para prosperidade",
    description: "Organização emocional e clareza sobre prioridades.",
    duration: 12,
    level: "Intermediário",
    category: "Prosperidade",
    kind: "limpeza",
    steps: [
      "Separe preocupações em resolver agora, planejar e depois.",
      "Escolha três prioridades reais para a semana.",
      "Feche a prática com uma intenção clara.",
    ],
  },
  {
    id: "lp-amor",
    title: "Limpeza para o amor",
    description: "Autocompaixão e reencontro com o próprio valor.",
    duration: 10,
    level: "Iniciante",
    category: "Amor",
    kind: "limpeza",
    steps: [
      "Escreva três qualidades suas.",
      "Fale consigo como falaria com alguém querido.",
      "Respire com a mão sobre o centro do peito.",
    ],
  },
  {
    id: "lp-autoconhecimento",
    title: "Limpeza para autoconhecimento",
    description: "Diário de equilíbrio para observar padrões internos.",
    duration: 14,
    level: "Avançado",
    category: "Autoconhecimento",
    kind: "limpeza",
    steps: [
      "Pergunte: como eu estou realmente?",
      "Registre o que sentiu e onde sentiu no corpo.",
      "Escolha um pequeno cuidado para hoje.",
    ],
  },
  {
    id: "lp-sono",
    title: "Limpeza para o sono",
    description: "Relaxamento progressivo e despejo de pensamentos.",
    duration: 15,
    level: "Iniciante",
    category: "Sono",
    kind: "limpeza",
    steps: [
      "Escreva o que precisa lembrar amanhã e feche o caderno.",
      "Relaxe pés, pernas, abdômen, mãos, ombros e rosto.",
      "Observe a respiração até a sonolência chegar.",
    ],
  },
];

export const rituais: ContentItem[] = [
  {
    id: "rt-limpeza",
    title: "Ritual de Limpeza Energética",
    description: "Uma sequência simples para renovar o ambiente e a mente.",
    duration: 18,
    level: "Iniciante",
    category: "Renovação",
    kind: "ritual",
  },
  {
    id: "rt-protecao",
    title: "Ritual de Proteção",
    description: "Fortaleça seus limites com presença e intenção.",
    duration: 16,
    level: "Intermediário",
    category: "Proteção",
    kind: "ritual",
  },
  {
    id: "rt-renovacao",
    title: "Ritual de Renovação",
    description: "Encerre ciclos e abra espaço para o novo.",
    duration: 20,
    level: "Intermediário",
    category: "Renovação",
    kind: "ritual",
  },
  {
    id: "rt-prosperidade",
    title: "Ritual para Prosperidade",
    description: "Clareza, organização e intenção de abundância.",
    duration: 22,
    level: "Avançado",
    category: "Prosperidade",
    kind: "ritual",
  },
  {
    id: "rt-lua-cheia",
    title: "Ritual de Lua Cheia",
    description: "Gratidão e liberação no auge do ciclo lunar.",
    duration: 25,
    level: "Intermediário",
    category: "Lunar",
    kind: "ritual",
  },
  {
    id: "rt-lua-nova",
    title: "Ritual de Lua Nova",
    description: "Semeie intenções no silêncio do novo ciclo.",
    duration: 19,
    level: "Iniciante",
    category: "Lunar",
    kind: "ritual",
    locked: true,
  },
];

export const meditacoes: ContentItem[] = [
  {
    id: "md-relaxamento",
    title: "Escaneamento corporal",
    description: "Relaxe cada região do corpo em três minutos.",
    duration: 12,
    level: "Iniciante",
    category: "Relaxamento",
    kind: "meditacao",
  },
  {
    id: "md-ansiedade",
    title: "Âncora 5-4-3-2-1",
    description: "Traga a atenção de volta ao momento presente.",
    duration: 8,
    level: "Iniciante",
    category: "Ansiedade",
    kind: "meditacao",
  },
  {
    id: "md-sono",
    title: "Respiração noturna",
    description: "Prepare corpo e mente para uma noite tranquila.",
    duration: 20,
    level: "Iniciante",
    category: "Sono",
    kind: "meditacao",
  },
  {
    id: "md-autoconhecimento",
    title: "Lugar seguro",
    description: "Visualização guiada de acolhimento interno.",
    duration: 15,
    level: "Intermediário",
    category: "Autoconhecimento",
    kind: "meditacao",
  },
  {
    id: "md-energia",
    title: "Respiração ao acordar",
    description: "Três minutos para começar o dia com presença.",
    duration: 6,
    level: "Iniciante",
    category: "Energia",
    kind: "meditacao",
  },
  {
    id: "md-foco",
    title: "Bloco de foco",
    description: "Atenção plena para uma única tarefa por vez.",
    duration: 10,
    level: "Intermediário",
    category: "Foco",
    kind: "meditacao",
  },
];

export const biblioteca: ContentItem[] = [
  ...limpezas,
  ...rituais,
  ...meditacoes,
  {
    id: "eb-100-receitas",
    title: "100+ Receitas Holísticas de Autocuidado",
    description:
      "Guia complementar de respiração, relaxamento, visualização, sono e organização emocional.",
    duration: 60,
    level: "Iniciante",
    category: "E-books",
    kind: "ebook",
  },
  {
    id: "eb-80-praticas",
    title: "Guia Prático de Autocuidado Energético",
    description: "80 práticas para aliviar tensões e desconfortos ligados ao estresse.",
    duration: 45,
    level: "Iniciante",
    category: "E-books",
    kind: "ebook",
  },
  {
    id: "as-mapa-basico",
    title: "Fundamentos do Mapa Astral",
    description: "Signos, casas e planetas explicados com sobriedade.",
    duration: 30,
    level: "Iniciante",
    category: "Astrologia",
    kind: "astrologia",
  },
  {
    id: "as-lunar",
    title: "Ciclos Lunares na Prática",
    description: "Como acompanhar as fases da lua na sua rotina.",
    duration: 25,
    level: "Intermediário",
    category: "Astrologia",
    kind: "astrologia",
    locked: true,
  },
  {
    id: "au-frequencias",
    title: "Áudio de Frequências Suaves",
    description: "Paisagem sonora tranquila para acompanhar as práticas.",
    duration: 30,
    level: "Iniciante",
    category: "Áudios",
    kind: "audio",
  },
];

export const posicionamentos = [
  {
    planeta: "Sol",
    signo: "Escorpião",
    glifo: "☉",
    texto:
      "Sua essência se expressa pela profundidade. Você percebe camadas que passam despercebidas e transforma o que atravessa.",
  },
  {
    planeta: "Lua",
    signo: "Peixes",
    glifo: "☽",
    texto:
      "Sua vida emocional é sensível e receptiva. Silêncio, água e arte funcionam como formas de reorganização interna.",
  },
  {
    planeta: "Ascendente",
    signo: "Capricórnio",
    glifo: "↑",
    texto:
      "Você se apresenta ao mundo com sobriedade e constância. Estrutura e método sustentam sua confiança.",
  },
  {
    planeta: "Mercúrio",
    signo: "Sagitário",
    glifo: "☿",
    texto:
      "Pensamento amplo e curioso. Aprende melhor quando enxerga o sentido maior por trás da informação.",
  },
  {
    planeta: "Vênus",
    signo: "Libra",
    glifo: "♀",
    texto:
      "Você valoriza beleza, harmonia e reciprocidade. Vínculos equilibrados alimentam a sua energia.",
  },
  {
    planeta: "Marte",
    signo: "Virgem",
    glifo: "♂",
    texto:
      "Sua força age pelo cuidado com os detalhes. A constância é mais poderosa em você do que a pressa.",
  },
];

export const zodiaco = [
  "♈",
  "♉",
  "♊",
  "♋",
  "♌",
  "♍",
  "♎",
  "♏",
  "♐",
  "♑",
  "♒",
  "♓",
];

export const ritualDoDia = {
  lua: "Lua Crescente",
  signoLunar: "Lua em Peixes",
  objetivo: "Serenar a mente e restaurar a energia",
  duracao: "18 min",
};
