import { createFileRoute, Link } from "@tanstack/react-router";
import capa from "@/assets/limpeza-astral-capa.png.asset.json";
import { AppLayout } from "@/components/astral/AppLayout";
import { MoonMark } from "@/components/astral/StarField";
import { PracticePlayer, useplayer } from "@/components/astral/PracticeCard";
import { GhostButton, GoldButton, Meta, ProgressBar } from "@/components/astral/Ui";
import { limpezas, ritualDoDia, rituais } from "@/lib/content";
import { greeting, progressPercent, useStore } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Meu painel — LimpezaAstral" },
      {
        name: "description",
        content:
          "Seu painel LimpezaAstral: mapa astral, limpeza do dia, ritual recomendado e progresso.",
      },
      { property: "og:title", content: "Meu painel — LimpezaAstral" },
      { property: "og:description", content: "Seu momento de conexão começa agora." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { profile, progress } = useStore();
  const player = useplayer();
  const percent = progressPercent(progress);
  const limpezaHoje = limpezas[0]!;
  const ritual = rituais[4]!;

  return (
    <AppLayout>
      <section className="animate-rise relative overflow-hidden rounded-2xl border border-border">
        <img
          src={capa.url}
          alt="Lua, constelações e roda do zodíaco em céu noturno dourado"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-6 p-7 sm:p-10">
          <div className="min-w-0">
            <p className="eyebrow">{ritualDoDia.lua} · {ritualDoDia.signoLunar}</p>
            <h1 className="mt-4 text-2xl text-gold-gradient sm:text-3xl">
              {greeting()}, {profile?.name} ✦
            </h1>
            <p className="mt-4 font-serif text-lg text-muted-foreground">
              Seu momento de conexão começa agora.
            </p>
          </div>
          <MoonMark className="animate-glow h-16 w-16 shrink-0 text-gold sm:h-24 sm:w-24" />
        </div>
      </section>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="card-astral p-7">
          <p className="eyebrow">Astrologia</p>
          <h2 className="mt-3 text-lg text-foreground">Seu Mapa Astral</h2>
          <p className="mt-3 font-serif text-lg leading-relaxed text-muted-foreground">
            Descubra os principais aspectos da sua personalidade através da astrologia.
          </p>
          <Link to="/mapa-astral" className="mt-6 inline-block">
            <GoldButton>Ver meu mapa</GoldButton>
          </Link>
        </article>

        <article className="card-astral p-7">
          <p className="eyebrow">Prática de hoje</p>
          <h2 className="mt-3 text-lg text-foreground">Limpeza Astral do Dia</h2>
          <p className="mt-3 font-serif text-lg leading-relaxed text-muted-foreground">
            Reserve alguns minutos para renovar sua energia e desacelerar a mente.
          </p>
          <div className="mt-5">
            <Meta items={[`${limpezaHoje.duration} min`, limpezaHoje.level]} />
          </div>
          <div className="mt-6">
            <GoldButton onClick={() => player.start(limpezaHoje)}>Começar</GoldButton>
          </div>
        </article>

        <article className="card-astral p-7">
          <p className="eyebrow">Recomendado para você</p>
          <h2 className="mt-3 text-lg text-foreground">Ritual recomendado para você</h2>
          <dl className="mt-5 space-y-3 border-t border-border pt-5 text-sm">
            {[
              ["Lua atual", ritualDoDia.lua],
              ["Signo lunar", ritualDoDia.signoLunar],
              ["Objetivo", ritualDoDia.objetivo],
              ["Duração", ritualDoDia.duracao],
            ].map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-4">
                <dt className="eyebrow">{k}</dt>
                <dd className="text-right font-serif text-base text-foreground">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6">
            <GhostButton onClick={() => player.start(ritual)}>Ver ritual</GhostButton>
          </div>
        </article>

        <article className="card-astral p-7">
          <p className="eyebrow">Jornada</p>
          <h2 className="mt-3 text-lg text-foreground">Seu progresso</h2>
          <div className="mt-6 flex items-end justify-between">
            <span className="font-display text-3xl text-gold">{percent}%</span>
            <span className="eyebrow">concluído</span>
          </div>
          <div className="mt-3">
            <ProgressBar value={percent} />
          </div>
          <p className="mt-5 font-serif text-lg leading-relaxed text-muted-foreground">
            Você está construindo uma rotina de autocuidado.
          </p>
          <Link
            to="/meu-progresso"
            className="mt-5 inline-block text-[0.7rem] tracking-[0.2em] text-gold uppercase hover:text-gold-light"
          >
            Ver detalhes ✦
          </Link>
        </article>
      </div>

      {player.active ? <PracticePlayer item={player.active} onClose={player.close} /> : null}
    </AppLayout>
  );
}
