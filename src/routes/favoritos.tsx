import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/astral/AppLayout";
import { PracticeCard, PracticePlayer, useplayer } from "@/components/astral/PracticeCard";
import { GhostButton, PageHeading } from "@/components/astral/Ui";
import { biblioteca } from "@/lib/content";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Meus Favoritos — LimpezaAstral" },
      {
        name: "description",
        content: "Meditações, rituais e práticas que você salvou na sua área de membros.",
      },
      { property: "og:title", content: "Meus Favoritos — LimpezaAstral" },
      { property: "og:description", content: "Seu acervo pessoal de práticas salvas." },
    ],
  }),
  component: FavoritosPage,
});

function FavoritosPage() {
  const { favorites } = useStore();
  const player = useplayer();
  const list = biblioteca.filter((i) => favorites.includes(i.id));

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Seleção"
        title="MEUS FAVORITOS"
        subtitle="As práticas e conteúdos que você quer manter por perto."
      />

      {list.length === 0 ? (
        <div className="card-astral mt-10 p-10 text-center">
          <span className="text-gold">✦</span>
          <p className="mt-4 font-serif text-lg text-muted-foreground">
            Você ainda não salvou nada. Toque na estrela de qualquer conteúdo para guardá-lo aqui.
          </p>
          <Link to="/biblioteca" className="mt-6 inline-block">
            <GhostButton>Explorar biblioteca</GhostButton>
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((item) => (
            <PracticeCard key={item.id} item={item} cta="Acessar" onStart={player.start} />
          ))}
        </div>
      )}

      {player.active ? <PracticePlayer item={player.active} onClose={player.close} /> : null}
    </AppLayout>
  );
}
