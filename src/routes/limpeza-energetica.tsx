import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/astral/AppLayout";
import { PracticeCard, PracticePlayer, useplayer } from "@/components/astral/PracticeCard";
import { PageHeading } from "@/components/astral/Ui";
import { limpezas } from "@/lib/content";

export const Route = createFileRoute("/limpeza-energetica")({
  head: () => ({
    meta: [
      { title: "Limpeza Energética — LimpezaAstral" },
      {
        name: "description",
        content:
          "Práticas de limpeza energética para ansiedade, estresse, cansaço, proteção, prosperidade, amor, autoconhecimento e sono.",
      },
      { property: "og:title", content: "Limpeza Energética — LimpezaAstral" },
      {
        property: "og:description",
        content: "Escolha uma prática para o momento que você está vivendo.",
      },
    ],
  }),
  component: LimpezaPage,
});

const categorias = [
  "Todas",
  "Ansiedade",
  "Estresse",
  "Cansaço",
  "Proteção",
  "Prosperidade",
  "Amor",
  "Autoconhecimento",
  "Sono",
];

function LimpezaPage() {
  const player = useplayer();
  const [cat, setCat] = useState("Todas");
  const list = cat === "Todas" ? limpezas : limpezas.filter((l) => l.category === cat);

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Prática"
        title="LIMPEZA ASTRAL"
        subtitle="Escolha uma prática para o momento que você está vivendo."
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
          <PracticeCard key={item.id} item={item} onStart={player.start} />
        ))}
      </div>

      {player.active ? <PracticePlayer item={player.active} onClose={player.close} /> : null}
    </AppLayout>
  );
}
