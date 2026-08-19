import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/astral/AppLayout";
import { PageHeading, ProgressBar } from "@/components/astral/Ui";
import { progressPercent, useStore } from "@/lib/store";

export const Route = createFileRoute("/meu-progresso")({
  head: () => ({
    meta: [
      { title: "Meu Progresso — LimpezaAstral" },
      {
        name: "description",
        content:
          "Acompanhe práticas concluídas, minutos de meditação, rituais realizados e sequência de dias.",
      },
      { property: "og:title", content: "Meu Progresso — LimpezaAstral" },
      { property: "og:description", content: "Sua rotina de autocuidado em números." },
    ],
  }),
  component: ProgressoPage,
});

function ProgressoPage() {
  const { progress } = useStore();
  const percent = progressPercent(progress);

  const stats = [
    { label: "Práticas concluídas", value: progress.practices },
    { label: "Minutos de práticas", value: progress.minutes },
    { label: "Rituais realizados", value: progress.rituais ?? progress.rituals },
    { label: "Conteúdos acessados", value: progress.contents },
  ];

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Jornada"
        title="MEU PROGRESSO"
        subtitle="Cada pequena pausa constrói a sua rotina de autocuidado."
      />

      <section className="card-astral mt-10 p-8 sm:p-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Percentual de progresso</p>
            <p className="mt-3 font-display text-4xl text-gold">{percent}%</p>
          </div>
          <div className="text-right">
            <p className="eyebrow">Sequência</p>
            <p className="mt-3 font-display text-2xl text-foreground">
              {progress.streak} dias consecutivos
            </p>
          </div>
        </div>
        <div className="mt-6">
          <ProgressBar value={percent} />
        </div>
      </section>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <article key={s.label} className="card-astral p-6 text-center">
            <p className="font-display text-3xl text-gold-gradient">{s.value}</p>
            <p className="eyebrow mt-3">{s.label}</p>
          </article>
        ))}
      </div>

      <section className="card-astral mt-8 p-8">
        <h2 className="text-base text-foreground">Últimos 21 dias</h2>
        <div className="hairline-gold mt-4 h-px w-24" />
        <div className="mt-6 grid grid-cols-7 gap-2 sm:gap-3">
          {Array.from({ length: 21 }, (_, i) => {
            const done = i < progress.streak + progress.completed.length;
            return (
              <span
                key={i}
                title={`Dia ${i + 1}`}
                className={`flex aspect-square items-center justify-center rounded-lg border text-[0.65rem] transition-colors ${
                  done
                    ? "border-gold/50 bg-gold/15 text-gold"
                    : "border-border text-muted-foreground/50"
                }`}
              >
                {done ? "✦" : i + 1}
              </span>
            );
          })}
        </div>
        <p className="mt-6 font-serif text-lg text-muted-foreground">
          Escolha uma prática por dia. Não é necessário realizar todas.
        </p>
      </section>
    </AppLayout>
  );
}
