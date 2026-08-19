import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AppLayout } from "@/components/astral/AppLayout";
import { PracticeCard, PracticePlayer, useplayer } from "@/components/astral/PracticeCard";
import { PageHeading } from "@/components/astral/Ui";
import { biblioteca } from "@/lib/content";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/biblioteca")({
  head: () => ({
    meta: [
      { title: "Biblioteca — LimpezaAstral" },
      {
        name: "description",
        content:
          "Todo o acervo LimpezaAstral: astrologia, rituais, meditações, limpeza energética, e-books e áudios.",
      },
      { property: "og:title", content: "Biblioteca — LimpezaAstral" },
      { property: "og:description", content: "O que você deseja encontrar?" },
    ],
  }),
  component: BibliotecaPage,
});

const filtros = [
  "Todos",
  "Astrologia",
  "Rituais",
  "Meditações",
  "Limpeza Energética",
  "E-books",
  "Áudios",
  "Favoritos",
] as const;

const kindByFilter: Record<string, string> = {
  Astrologia: "astrologia",
  Rituais: "ritual",
  Meditações: "meditacao",
  "Limpeza Energética": "limpeza",
  "E-books": "ebook",
  Áudios: "audio",
};

function BibliotecaPage() {
  const player = useplayer();
  const { favorites } = useStore();
  const [filtro, setFiltro] = useState<string>("Todos");
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    let items = biblioteca;
    if (filtro === "Favoritos") items = items.filter((i) => favorites.includes(i.id));
    else if (filtro !== "Todos") items = items.filter((i) => i.kind === kindByFilter[filtro]);
    const q = query.trim().toLowerCase();
    if (q)
      items = items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q),
      );
    return items;
  }, [filtro, query, favorites]);

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Acervo"
        title="BIBLIOTECA"
        subtitle="Todo o conteúdo da plataforma reunido em um só lugar."
      />

      <div className="mt-8 flex items-center gap-3 rounded-full border border-input bg-card/60 px-5 py-3">
        <Search size={15} className="shrink-0 text-gold/70" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="O que você deseja encontrar?"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {filtros.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFiltro(f)}
            className={`rounded-full border px-4 py-2 text-[0.68rem] tracking-[0.16em] uppercase transition-colors ${
              filtro === f
                ? "border-gold/60 bg-gold/10 text-gold"
                : "border-border text-muted-foreground hover:border-gold/30 hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="mt-12 font-serif text-lg text-muted-foreground">
          Nenhum conteúdo encontrado para esta busca.
        </p>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {list.map((item) => (
            <PracticeCard key={item.id} item={item} cta="Acessar" onStart={player.start} />
          ))}
        </div>
      )}

      {player.active ? <PracticePlayer item={player.active} onClose={player.close} /> : null}
    </AppLayout>
  );
}
