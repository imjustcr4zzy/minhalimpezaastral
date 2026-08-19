import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Bell, LogOut, Menu, Settings, Star, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { StarField } from "./StarField";
import { useStore } from "@/lib/store";

const nav = [
  { to: "/dashboard", label: "Início" },
  { to: "/mapa-astral", label: "Meu Mapa Astral" },
  { to: "/limpeza-energetica", label: "Limpeza Energética" },
  { to: "/astrologia", label: "Astrologia" },
  { to: "/meditacoes", label: "Meditações" },
  { to: "/rituais", label: "Rituais" },
  { to: "/biblioteca", label: "Biblioteca" },
  { to: "/55-autocuidados", label: "55 Autocuidados" },
  { to: "/meu-progresso", label: "Meu Progresso" },
  { to: "/favoritos", label: "Favoritos" },
  { to: "/meu-perfil", label: "Meu Perfil" },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const { profile, ready, signOut, favorites } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (ready && !profile) navigate({ to: "/" });
  }, [ready, profile, navigate]);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [path]);

  if (!ready || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="eyebrow animate-glow">Alinhando o céu…</span>
      </div>
    );
  }

  const initials = profile.name.slice(0, 1).toUpperCase();

  const sidebar = (
    <div className="flex h-full flex-col justify-between px-5 py-7">
      <div>
        <Link to="/dashboard" className="flex items-center gap-2">
          <span className="text-gold">✦</span>
          <span className="font-display text-[0.78rem] tracking-[0.26em] text-foreground">
            LIMPEZAASTRAL
          </span>
        </Link>
        <div className="hairline-gold mt-6 h-px w-full" />
        <nav className="mt-6 space-y-0.5">
          {nav.map((item) => {
            const active = path === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-300 ${
                  active
                    ? "bg-secondary/40 text-foreground"
                    : "text-sidebar-foreground/70 hover:bg-secondary/25 hover:text-foreground"
                }`}
              >
                <span
                  className={`text-[0.65rem] transition-colors ${active ? "text-gold" : "text-gold/35 group-hover:text-gold/70"}`}
                >
                  ✦
                </span>
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/configuracoes"
            className={`mt-2 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              path === "/configuracoes"
                ? "bg-secondary/40 text-foreground"
                : "text-sidebar-foreground/70 hover:text-foreground"
            }`}
          >
            <Settings size={13} className="text-gold/50" />
            Configurações
          </Link>
        </nav>
      </div>
      <div>
        <div className="hairline-gold mb-4 h-px w-full" />
        <button
          type="button"
          onClick={() => {
            signOut();
            navigate({ to: "/" });
          }}
          className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-gold"
        >
          <LogOut size={14} />
          Sair da conta
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <StarField dense />
      <aside className="fixed top-0 left-0 hidden h-screen w-64 border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl lg:block">
        {sidebar}
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-0 left-0 h-full w-72 border-r border-sidebar-border bg-sidebar">
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="absolute top-6 right-4 text-muted-foreground"
            >
              <X size={18} />
            </button>
            {sidebar}
          </div>
        </div>
      ) : null}

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Abrir menu"
                onClick={() => setOpen(true)}
                className="text-muted-foreground lg:hidden"
              >
                <Menu size={20} />
              </button>
              <Link to="/dashboard" className="flex items-center gap-2 lg:hidden">
                <span className="text-gold">✦</span>
                <span className="font-display text-[0.7rem] tracking-[0.24em]">
                  LIMPEZAASTRAL
                </span>
              </Link>
              <p className="hidden font-serif text-sm text-muted-foreground italic lg:block">
                Conecte-se com seu universo. Reencontre seu equilíbrio.
              </p>
            </div>

            <div className="flex items-center gap-1 sm:gap-3">
              <button
                type="button"
                aria-label="Notificações"
                className="relative rounded-full p-2 text-muted-foreground transition-colors hover:text-gold"
              >
                <Bell size={16} />
                <span className="absolute top-1.5 right-2 h-1.5 w-1.5 rounded-full bg-gold" />
              </button>
              <Link
                to="/favoritos"
                aria-label="Favoritos"
                className="relative rounded-full p-2 text-muted-foreground transition-colors hover:text-gold"
              >
                <Star size={16} />
                {favorites.length > 0 ? (
                  <span className="absolute top-0.5 right-0 text-[0.6rem] text-gold">
                    {favorites.length}
                  </span>
                ) : null}
              </Link>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenu((m) => !m)}
                  className="flex items-center gap-3 rounded-full border border-border py-1.5 pr-4 pl-1.5 transition-colors hover:border-gold/40"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/40 bg-secondary/50 font-display text-xs text-gold">
                    {initials}
                  </span>
                  <span className="hidden text-xs tracking-[0.12em] text-foreground sm:block">
                    {profile.name}
                  </span>
                </button>
                {menu ? (
                  <div className="panel absolute right-0 mt-3 w-48 overflow-hidden p-1.5">
                    <Link
                      to="/meu-perfil"
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                    >
                      Meu Perfil
                    </Link>
                    <Link
                      to="/meu-progresso"
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                    >
                      Meu Progresso
                    </Link>
                    <Link
                      to="/configuracoes"
                      className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/40 hover:text-foreground"
                    >
                      Configurações
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        signOut();
                        navigate({ to: "/" });
                      }}
                      className="block w-full rounded-md px-3 py-2 text-left text-sm text-gold/80 hover:bg-secondary/40"
                    >
                      Sair da conta
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </header>

        <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-8 sm:py-14">{children}</main>

        <footer className="border-t border-border/60 px-4 py-8 text-center sm:px-8">
          <p className="text-[0.7rem] leading-relaxed text-muted-foreground/70">
            Conteúdo educativo e complementar de autocuidado. Não substitui avaliação, diagnóstico
            ou tratamento profissional.
          </p>
        </footer>
      </div>
    </div>
  );
}
