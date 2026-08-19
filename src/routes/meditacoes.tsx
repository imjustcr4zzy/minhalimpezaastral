import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/astral/AppLayout";
import { PracticeCard, PracticePlayer, useplayer } from "@/components/astral/PracticeCard";
import { PageHeading } from "@/components/astral/Ui";
import { meditacoes } from "@/lib/content";

export const Route = createFileRoute("/meditacoes")({
  head: () => ({
    meta: [
      { title: "Meditações — LimpezaAstral" },
      {
        name: "description",
        content:
          "Meditações guiadas para relaxamento, ansiedade, sono, autoconhecimento, energia e foco.",
      },
      { property: "og:title", content: "Meditações — LimpezaAstral" },
      { property: "og:description", content: "Player elegante para suas práticas diárias." },
    ],
  }),
  component: MeditacoesPage,
});

const categorias = [
  "Todas",
  "Relaxamento",
  "Ansiedade",
  "Sono",
  "Autoconhecimento",
  "Energia",
  "Foco",
];

function MeditacoesPage() {
  const player = useplayer();
  const [cat, setCat] = useState("Todas");
  const list = cat === "Todas" ? meditacoes : meditacoes.filter((m) => m.category === cat);

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Áudio"
        title="MEDITAÇÕES"
        subtitle="Sente-se, respire e deixe o tempo desacelerar por alguns minutos."
      />

      <div className="mt-8 flex flex-wrap gap-2">
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            className={`rounded-full border px-4 py-2 text-[0.68rem] tracking-[0.16em] uppercase transition-colors ${
              cat === c
                ? "border-gold/60 bg-gold/10 text-gold"
                : "border-border text-muted-foreground hover:border-gold/30 hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {list.map((item) => (
          <PracticeCard key={item.id} item={item} cta="Reproduzir" onStart={player.start} />
        ))}
      </div>

      {player.active ? <PracticePlayer item={player.active} onClose={player.close} /> : null}
    </AppLayout>
  );
}
