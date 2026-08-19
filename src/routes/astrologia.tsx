import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/astral/AppLayout";
import { MoonMark } from "@/components/astral/StarField";
import { PracticeCard, PracticePlayer, useplayer } from "@/components/astral/PracticeCard";
import { GhostButton, PageHeading } from "@/components/astral/Ui";
import { biblioteca, posicionamentos, ritualDoDia } from "@/lib/content";

export const Route = createFileRoute("/astrologia")({
  head: () => ({
    meta: [
      { title: "Astrologia — LimpezaAstral" },
      {
        name: "description",
        content:
          "Fundamentos do mapa astral, ciclos lunares e leituras sobre seus posicionamentos.",
      },
      { property: "og:title", content: "Astrologia — LimpezaAstral" },
      { property: "og:description", content: "Observe o céu de hoje e o que ele move em você." },
    ],
  }),
  component: AstrologiaPage,
});

function AstrologiaPage() {
  const player = useplayer();
  const conteudos = biblioteca.filter((c) => c.kind === "astrologia");

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Observatório"
        title="ASTROLOGIA"
        subtitle="Uma leitura sóbria dos ciclos do céu aplicada à sua rotina."
      />

      <section className="card-astral mt-10 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 p-7 sm:p-9">
        <div className="min-w-0">
          <p className="eyebrow">Céu de hoje</p>
          <h2 className="mt-3 text-lg text-gold-gradient">
            {ritualDoDia.lua} · {ritualDoDia.signoLunar}
          </h2>
          <p className="mt-3 font-serif text-lg leading-relaxed text-muted-foreground">
            Momento favorável para {ritualDoDia.objetivo.toLowerCase()}.
          </p>
          <Link to="/mapa-astral" className="mt-5 inline-block">
            <GhostButton>Ver meu mapa</GhostButton>
          </Link>
        </div>
        <MoonMark className="animate-glow h-16 w-16 shrink-0 text-gold sm:h-20 sm:w-20" />
      </section>

      <h2 className="mt-12 text-base text-foreground">Seus posicionamentos em síntese</h2>
      <div className="hairline-gold mt-4 h-px w-24" />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {posicionamentos.map((p) => (
          <article key={p.planeta} className="card-astral p-5">
            <span className="text-gold">{p.glifo}</span>
            <p className="mt-3 text-sm tracking-[0.14em] uppercase">
              {p.planeta} em <span className="text-gold">{p.signo}</span>
            </p>
            <p className="mt-2 font-serif text-base leading-relaxed text-muted-foreground">
              {p.texto}
            </p>
          </article>
        ))}
      </div>

      <h2 className="mt-12 text-base text-foreground">Estudos de astrologia</h2>
      <div className="hairline-gold mt-4 h-px w-24" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {conteudos.map((item) => (
          <PracticeCard key={item.id} item={item} cta="Acessar conteúdo" onStart={player.start} />
        ))}
      </div>

      {player.active ? <PracticePlayer item={player.active} onClose={player.close} /> : null}
    </AppLayout>
  );
}
