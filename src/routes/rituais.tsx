import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/astral/AppLayout";
import { PracticeCard, PracticePlayer, useplayer } from "@/components/astral/PracticeCard";
import { PageHeading } from "@/components/astral/Ui";
import { rituais } from "@/lib/content";

export const Route = createFileRoute("/rituais")({
  head: () => ({
    meta: [
      { title: "Rituais — LimpezaAstral" },
      {
        name: "description",
        content:
          "Biblioteca de rituais: limpeza energética, proteção, renovação, prosperidade, lua cheia e lua nova.",
      },
      { property: "og:title", content: "Rituais — LimpezaAstral" },
      { property: "og:description", content: "Rituais guiados para cada ciclo da sua jornada." },
    ],
  }),
  component: RituaisPage,
});

function RituaisPage() {
  const player = useplayer();

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Biblioteca"
        title="RITUAIS"
        subtitle="Práticas simbólicas para marcar intenções e encerrar ciclos com presença."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {rituais.map((item) => (
          <PracticeCard key={item.id} item={item} cta="Iniciar ritual" onStart={player.start} />
        ))}
      </div>

      {player.active ? <PracticePlayer item={player.active} onClose={player.close} /> : null}
    </AppLayout>
  );
}
