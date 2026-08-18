import { Check, Lock, Pause, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { ContentItem } from "@/lib/content";
import { useStore } from "@/lib/store";
import { FavoriteStar, GhostButton, GoldButton, Meta, ProgressBar } from "./Ui";

const glyphs: Record<string, string> = {
  meditacao: "☾",
  ritual: "✦",
  limpeza: "☉",
  astrologia: "♄",
  ebook: "❋",
  audio: "♪",
};

export function PracticeCard({
  item,
  cta = "Começar prática",
  onStart,
}: {
  item: ContentItem;
  cta?: string;
  onStart: (item: ContentItem) => void;
}) {
  const { progress } = useStore();
  const done = progress.completed.includes(item.id);

  return (
    <article className="card-astral flex flex-col p-6">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full border border-gold/10"
      />
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 bg-secondary/30 text-gold">
          {glyphs[item.kind] ?? "✦"}
        </span>
        <div className="flex items-center gap-2">
          {done ? <Check size={14} className="text-gold" /> : null}
          {item.locked ? <Lock size={13} className="text-muted-foreground" /> : null}
          <FavoriteStar id={item.id} />
        </div>
      </div>

      <h3 className="mt-5 text-base leading-snug text-foreground">{item.title}</h3>
      <p className="mt-2 flex-1 font-serif text-[0.98rem] leading-relaxed text-muted-foreground">
        {item.description}
      </p>

      <div className="mt-5">
        <Meta items={[`${item.duration} min`, item.level, item.category]} />
      </div>

      <div className="mt-6">
        {item.locked ? (
          <span className="eyebrow flex items-center gap-2 text-gold/70">
            <Lock size={12} /> Conteúdo bloqueado
          </span>
        ) : (
          <GhostButton onClick={() => onStart(item)} className="w-full">
            {cta}
          </GhostButton>
        )}
      </div>
    </article>
  );
}

export function PracticePlayer({
  item,
  onClose,
}: {
  item: ContentItem;
  onClose: () => void;
}) {
  const { completePractice } = useStore();
  const total = item.duration * 60;
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setElapsed((e) => Math.min(total, e + 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [playing, total]);

  useEffect(() => {
    if (elapsed >= total) {
      setPlaying(false);
      completePractice(item.id, item.duration, item.kind);
    }
  }, [elapsed, total, completePractice, item]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={onClose} />
      <div className="panel animate-rise relative w-full max-w-lg p-8">
        <button
          type="button"
          aria-label="Fechar"
          onClick={onClose}
          className="absolute top-5 right-5 text-muted-foreground transition-colors hover:text-gold"
        >
          <X size={18} />
        </button>

        <p className="eyebrow">{item.category}</p>
        <h2 className="mt-3 text-xl text-gold-gradient">{item.title}</h2>
        <p className="mt-3 font-serif text-lg leading-relaxed text-muted-foreground">
          {item.description}
        </p>

        {item.steps ? (
          <ol className="mt-6 space-y-2 border-t border-border pt-5">
            {item.steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                <span className="text-[0.65rem] text-gold">✦</span>
                {step}
              </li>
            ))}
          </ol>
        ) : null}

        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pausar" : "Reproduzir"}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-colors hover:bg-gold/20"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
          <div className="flex-1">
            <ProgressBar value={(elapsed / total) * 100} />
            <div className="mt-2 flex justify-between text-[0.7rem] tracking-[0.16em] text-muted-foreground">
              <span>{fmt(elapsed)}</span>
              <span>{fmt(total)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <GoldButton
            onClick={() => {
              completePractice(item.id, item.duration, item.kind);
              onClose();
            }}
          >
            Concluir prática
          </GoldButton>
          <GhostButton onClick={onClose}>Voltar</GhostButton>
        </div>
      </div>
    </div>
  );
}

export function useplayer() {
  const [active, setActive] = useState<ContentItem | null>(null);
  return { active, start: setActive, close: () => setActive(null) };
}
