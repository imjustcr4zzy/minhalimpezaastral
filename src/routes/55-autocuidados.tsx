import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/astral/AppLayout";
import { PageHeading } from "@/components/astral/Ui";

export const Route = createFileRoute("/55-autocuidados")({
  head: () => ({
    meta: [
      { title: "55 Autocuidados — LimpezaAstral" },
      {
        name: "description",
        content:
          "55 práticas simples de equilíbrio, relaxamento e bem-estar para integrar no seu dia a dia.",
      },
      { property: "og:title", content: "55 Autocuidados — LimpezaAstral" },
      {
        property: "og:description",
        content:
          "Um guia prático de pequenos rituais para acalmar a mente, cuidar do corpo e reconectar-se consigo.",
      },
    ],
  }),
  component: AutocuidadosPage,
});

type Autocuidado = {
  id: number;
  title: string;
  description: string;
  indication: string;
  highlight?: boolean;
};

const autocuidados: Autocuidado[] = [
  { id: 1, title: "Respiração de 3 Minutos", description: "Sente-se confortavelmente e faça respirações lentas e naturais durante 3 minutos, concentrando-se exclusivamente no ar entrando e saindo.", indication: "momentos de tensão e ansiedade" },
  { id: 2, title: "Pés no Chão", description: "Coloque os dois pés no chão, perceba o contato com a superfície e faça cinco respirações tranquilas.", indication: "sensação de agitação" },
  { id: 3, title: "Banho Consciente", description: "Durante o banho, desligue o celular e concentre-se na temperatura da água, nos sons e nas sensações do corpo.", indication: "desacelerar após um dia intenso" },
  { id: 4, title: "Relaxamento dos Ombros", description: "Eleve os ombros por alguns segundos e solte lentamente. Repita cinco vezes.", indication: "tensão acumulada" },
  { id: 5, title: "Mandíbula Relaxada", description: "Deixe os dentes desencostados e relaxe a língua. Observe se está apertando a mandíbula.", indication: "tensão facial e hábitos relacionados ao estresse" },
  { id: 6, title: "Escaneamento Corporal", description: "Passe a atenção lentamente pelos pés, pernas, abdômen, braços, ombros, pescoço e rosto, relaxando cada região.", indication: "percepção corporal" },
  { id: 7, title: "Caminhada Consciente", description: "Caminhe por 10 minutos observando seus passos, a respiração e o ambiente.", indication: "estresse e mente acelerada" },
  { id: 8, title: "Pausa Sem Celular", description: "Reserve 10 minutos do dia completamente longe das telas.", indication: "excesso de estímulos" },
  { id: 9, title: "Diário de Pensamentos", description: "Escreva durante três minutos tudo que estiver ocupando sua mente, sem tentar organizar.", indication: "pensamentos acelerados" },
  { id: 10, title: "Caixa das Preocupações", description: "Anote uma preocupação, dobre o papel e coloque-o em uma caixa. Determine um horário específico para lidar com ela.", indication: "preocupações recorrentes" },
  { id: 11, title: "Visualização do Lugar Seguro", description: "Imagine um lugar onde você se sinta tranquilo. Observe mentalmente cores, sons, temperatura e detalhes.", indication: "relaxamento" },
  { id: 12, title: "Música de Relaxamento", description: "Escolha uma música calma e escute até o final sem realizar outra atividade.", indication: "desacelerar" },
  { id: 13, title: "Alongamento Matinal", description: "Faça movimentos suaves de braços, pernas, pescoço e ombros durante alguns minutos.", indication: "começar o dia com consciência corporal" },
  { id: 14, title: "Ritual de Encerramento do Trabalho", description: "Anote as tarefas pendentes, escolha a primeira tarefa do dia seguinte e encerre o expediente conscientemente.", indication: "dificuldade de desligar do trabalho" },
  { id: 15, title: "Respiração Antes de uma Decisão", description: "Antes de tomar uma decisão importante, pare por dois minutos e respire naturalmente.", indication: "impulsividade e tensão" },
  { id: 16, title: "Gratidão Noturna", description: "Antes de dormir, escreva três acontecimentos pelos quais você se sente grato.", indication: "reflexão positiva" },
  { id: 17, title: "Descarrego Mental", description: "Pegue papel e caneta e escreva tudo que precisa lembrar no dia seguinte.", indication: "preocupação na hora de dormir" },
  { id: 18, title: "Ambiente de Sono", description: "Deixe o quarto silencioso, confortável, escuro e com temperatura agradável.", indication: "higiene do sono" },
  { id: 19, title: "Desconexão Digital", description: "Crie um período antes de dormir sem redes sociais, notícias ou conteúdos estimulantes.", indication: "preparação para o sono" },
  { id: 20, title: "Ritual da Lua", description: "Em uma noite tranquila, observe a Lua por alguns minutos e use esse momento como oportunidade de reflexão pessoal.", indication: "conexão e contemplação" },
  { id: 21, title: "Intenção do Dia", description: "Ao acordar, complete: “Hoje eu escolho...” Escreva uma intenção simples para o dia.", indication: "foco" },
  { id: 22, title: "Uma Coisa de Cada Vez", description: "Escolha uma única tarefa e dedique 15 minutos exclusivamente a ela.", indication: "dispersão e procrastinação" },
  { id: 23, title: "Regra dos Cinco Minutos", description: "Quando estiver adiando uma tarefa, comprometa-se a realizá-la somente por cinco minutos.", indication: "procrastinação" },
  { id: 24, title: "Mesa Organizada", description: "Antes de iniciar uma tarefa, retire da mesa tudo que não será utilizado.", indication: "concentração" },
  { id: 25, title: "Caminhada ao Ar Livre", description: "Passe alguns minutos em um ambiente externo observando árvores, céu, sons e movimento.", indication: "pausa mental" },
  { id: 26, title: "Abraço Consciente", description: "Se for confortável e apropriado, abrace alguém querido e permaneça alguns segundos percebendo a sensação de conexão.", indication: "acolhimento emocional" },
  { id: 27, title: "Conversa de Apoio", description: "Procure uma pessoa de confiança e compartilhe como você realmente está se sentindo.", indication: "isolamento emocional" },
  { id: 28, title: "Carta Para Si Mesmo", description: "Escreva uma carta para você utilizando o mesmo carinho que ofereceria a alguém querido.", indication: "autocompaixão" },
  { id: 29, title: "Três Qualidades", description: "Liste três qualidades ou características suas que você reconhece e valoriza.", indication: "autoestima" },
  { id: 30, title: "Pequena Vitória", description: "No final do dia, registre uma coisa que conseguiu realizar.", indication: "reconhecer progresso" },
  { id: 31, title: "Pausa de Cinco Respirações", description: "Interrompa o que está fazendo e faça cinco respirações conscientes.", indication: "momentos de tensão" },
  { id: 32, title: "Relaxamento das Mãos", description: "Abra as mãos lentamente, estique os dedos e relaxe.", indication: "tensão corporal" },
  { id: 33, title: "Massagem nas Mãos", description: "Massageie suavemente as palmas e os dedos durante dois minutos.", indication: "relaxamento" },
  { id: 34, title: "Relaxamento Facial", description: "Feche os olhos e relaxe conscientemente testa, olhos, mandíbula e boca.", indication: "tensão facial" },
  { id: 35, title: "Silêncio Restaurador", description: "Fique cinco minutos em silêncio, sem música, celular ou televisão.", indication: "excesso de estímulos" },
  { id: 36, title: "Ritual do Chá", description: "Prepare uma bebida quente adequada à sua rotina e tome lentamente, prestando atenção ao aroma e à temperatura.", indication: "criar uma pausa consciente" },
  { id: 37, title: "Diário das Emoções", description: "Anote: O que aconteceu? O que senti? O que pensei? Como reagi?", indication: "autoconhecimento" },
  { id: 38, title: "Fato ou Interpretação?", description: "Quando algo incomodar, escreva: Fato: o que realmente aconteceu. Interpretação: o que sua mente concluiu.", indication: "pensamentos negativos" },
  { id: 39, title: "Pergunta do Controle", description: "Pergunte: “O que está sob meu controle neste momento?” Concentre-se somente nisso.", indication: "sensação de perda de controle" },
  { id: 40, title: "Limite Saudável", description: "Antes de aceitar uma nova obrigação, pergunte: “Eu realmente tenho espaço para isso?”", indication: "sobrecarga" },
  { id: 41, title: "Um “Não” Consciente", description: "Pratique dizer não a uma pequena solicitação que ultrapasse seus limites.", indication: "excesso de compromissos" },
  { id: 42, title: "Pausa Entre Atividades", description: "Ao terminar uma atividade, faça uma pausa de dois minutos antes de iniciar outra.", indication: "rotina acelerada" },
  { id: 43, title: "Ritual da Água", description: "Beba um copo de água lentamente, sem mexer no celular, concentrando-se no momento.", indication: "criar pequenas pausas durante o dia" },
  { id: 44, title: "Observação das Estrelas", description: "À noite, observe o céu por alguns minutos. Respire e permita-se contemplar.", indication: "relaxamento e reflexão" },
  { id: 45, title: "Diário da Lua", description: "Registre como você está se sentindo durante diferentes fases da Lua. Use como ferramenta de observação pessoal, sem interpretar isso como diagnóstico.", indication: "autoconhecimento" },
  { id: 46, title: "Ritual de Renovação", description: "Organize um pequeno espaço da casa e descarte ou guarde aquilo que não precisa permanecer à vista.", indication: "sensação de renovação" },
  { id: 47, title: "Arrumação Consciente", description: "Escolha uma gaveta, mesa ou pequeno espaço e organize durante 10 minutos.", indication: "sensação de desordem" },
  { id: 48, title: "Desligamento das Redes", description: "Escolha um período do dia para ficar longe das redes sociais.", indication: "comparação excessiva e sobrecarga digital" },
  { id: 49, title: "Manhã Sem Pressa", description: "Sempre que possível, acorde alguns minutos antes para iniciar o dia sem correr.", indication: "estresse matinal" },
  { id: 50, title: "Ritual de Autocuidado", description: "Reserve 15 minutos para uma atividade agradável e saudável: leitura, banho, caminhada, música ou contemplação.", indication: "recuperar energia emocional" },
  { id: 51, title: "Pergunta do Espelho", description: "Olhe para si mesmo e pergunte: “Do que eu preciso hoje?” Não procure uma resposta perfeita. Apenas observe.", indication: "conexão consigo mesmo" },
  { id: 52, title: "Três Coisas Que Posso Soltar", description: "Escreva três preocupações que você não precisa resolver hoje.", indication: "excesso de responsabilidades" },
  { id: 53, title: "Ritual do Perdão", description: "Escreva algo que ainda pesa emocionalmente e complete: “Eu não posso mudar o que aconteceu, mas posso escolher o que farei daqui para frente.”", indication: "reflexão emocional" },
  { id: 54, title: "Ritual de Recomeço", description: "Ao iniciar uma nova semana, escreva: O que quero manter? O que quero deixar para trás? O que quero começar?", indication: "renovação de objetivos" },
  { id: 55, title: "Limpeza Astral — Ritual Completo", description: "Reserve 10 minutos. Sente-se confortavelmente, faça cinco respirações lentas e relaxe o corpo começando pelos pés. Imagine uma luz dourada envolvendo seu corpo como símbolo de tranquilidade e renovação. Pense em algo que deseja deixar para trás e em algo que deseja cultivar. Termine dizendo: “Eu libero o que não preciso carregar e abro espaço para aquilo que me faz bem.” Finalize respirando profundamente e voltando lentamente a atenção para o ambiente.", indication: "renovação energética e equilíbrio", highlight: true },
];

function AutocuidadosPage() {
  return (
    <AppLayout>
      <PageHeading
        eyebrow="Entregável exclusivo"
        title="55 AUTOCUIDADOS"
        subtitle="Práticas simples para equilíbrio, relaxamento e bem-estar."
      />

      <div className="card-astral mt-8 p-6 sm:p-8">
        <p className="font-serif text-base leading-relaxed text-muted-foreground">
          Importante: estas práticas são complementares e não substituem acompanhamento médico ou
          psicológico. Em caso de sintomas persistentes, intensos ou preocupantes, procure um
          profissional de saúde.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {autocuidados.map((item) => (
          <article
            key={item.id}
            className={`card-astral flex flex-col p-6 ${item.highlight ? "border-gold/40 bg-gold/[0.04]" : ""}`}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-display ${
                  item.highlight
                    ? "border-gold/40 bg-gold/15 text-gold"
                    : "border-gold/20 bg-secondary/30 text-gold/80"
                }`}
              >
                {String(item.id).padStart(2, "0")}
              </span>
              {item.highlight ? (
                <span className="eyebrow text-[0.6rem] text-gold">Ritual completo</span>
              ) : null}
            </div>

            <h3 className="mt-5 text-base leading-snug text-foreground">{item.title}</h3>
            <p className="mt-3 flex-1 font-serif text-[0.98rem] leading-relaxed text-muted-foreground">
              {item.description}
            </p>

            <div className="mt-5 border-t border-border/60 pt-4">
              <p className="text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground/70">
                Indicado para
              </p>
              <p className="mt-1 text-sm text-gold/90">{item.indication}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="card-astral mt-10 p-8 text-center">
        <p className="font-display text-lg text-gold">SEU MOMENTO LIMPEZAASTRAL</p>
        <div className="mx-auto my-5 h-px w-24 bg-gold/20" />
        <p className="mx-auto max-w-2xl font-serif text-base leading-relaxed text-muted-foreground">
          Você não precisa transformar sua vida inteira de uma vez. Comece com 5 minutos por dia.
          Escolha uma prática. Faça com presença. Observe como você se sente. E, principalmente,
          respeite seus limites.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/limpeza-energetica"
            className="rounded-full border border-gold/40 bg-gold/10 px-6 py-2.5 text-sm text-gold transition-colors hover:bg-gold/20"
          >
            Explorar limpezas energéticas
          </Link>
          <Link
            to="/rituais"
            className="rounded-full border border-border px-6 py-2.5 text-sm text-muted-foreground transition-colors hover:border-gold/30 hover:text-foreground"
          >
            Ver rituais
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
