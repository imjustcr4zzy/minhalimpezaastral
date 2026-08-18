import { Star } from "lucide-react";
import type { ReactNode } from "react";
import { useStore } from "@/lib/store";

export function GoldButton({
  children,
  onClick,
  type = "button",
  className = "",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-light to-gold px-6 py-3 text-[0.7rem] font-medium tracking-[0.22em] text-primary-foreground uppercase transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-8px_var(--gold)] disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-transparent px-6 py-3 text-[0.7rem] font-medium tracking-[0.22em] text-gold uppercase transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 ${className}`}
    >
      {children}
    </button>
  );
}

export function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        {...props}
        className="mt-2 w-full rounded-lg border border-input bg-background/60 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold/60 focus:ring-1 focus:ring-ring"
      />
    </label>
  );
}

export function PageHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="animate-rise">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1 className="mt-3 text-2xl text-gold-gradient sm:text-3xl">{title}</h1>
      <div className="hairline-gold mt-4 h-px w-28" />
      {subtitle ? (
        <p className="mt-4 max-w-2xl font-serif text-lg text-muted-foreground">{subtitle}</p>
      ) : null}
    </header>
  );
}

export function FavoriteStar({ id }: { id: string }) {
  const { isFavorite, toggleFavorite } = useStore();
  const active = isFavorite(id);
  return (
    <button
      type="button"
      aria-label={active ? "Remover dos favoritos" : "Salvar nos favoritos"}
      onClick={() => toggleFavorite(id)}
      className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:border-gold/50 hover:text-gold"
    >
      <Star size={14} className={active ? "fill-gold text-gold" : ""} />
    </button>
  );
}

export function Meta({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] tracking-[0.18em] text-muted-foreground uppercase">
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-3">
          {i > 0 ? <span className="text-gold/40">✦</span> : null}
          {item}
        </span>
      ))}
    </div>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary/60">
      <div
        className="h-full rounded-full bg-gradient-to-r from-gold/70 via-gold-light to-gold transition-[width] duration-1000"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
