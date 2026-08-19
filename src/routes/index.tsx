import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import capa from "@/assets/limpeza-astral-capa.png.asset.json";
import { Constellations, StarField } from "@/components/astral/StarField";
import { Field, GoldButton } from "@/components/astral/Ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Entrar — LimpezaAstral" },
      {
        name: "description",
        content:
          "Acesse sua área de membros LimpezaAstral: mapa astral, rituais, meditações e limpeza energética.",
      },
      { property: "og:title", content: "Entrar — LimpezaAstral" },
      {
        property: "og:description",
        content: "Seu espaço para equilíbrio, autoconhecimento e transformação.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn, profile, ready } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (ready && profile) navigate({ to: "/dashboard" });
  }, [ready, profile, navigate]);

  return (
    <div className="relative grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <StarField dense />

      <div className="relative flex items-center justify-center px-5 py-14 sm:px-10">
        <Constellations className="top-6 -left-16 h-72 w-72 text-gold/25" />
        <div className="animate-rise relative w-full max-w-sm">
          <div className="text-center">
            <span className="text-gold">✦</span>
            <h1 className="mt-4 text-2xl leading-tight text-gold-gradient sm:text-[1.7rem]">
              LIMPEZAASTRAL
            </h1>
            <div className="hairline-gold mx-auto mt-5 h-px w-24" />
            <p className="mt-5 font-serif text-lg leading-relaxed text-muted-foreground">
              Seu espaço para equilíbrio, autoconhecimento e transformação.
            </p>
          </div>

          <form
            className="mt-10 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              const res = signIn(email, password);
              if (!res.ok) {
                setError(res.error ?? "Não foi possível entrar.");
                return;
              }
              setError(null);
              navigate({ to: "/dashboard" });
            }}
          >
            <Field
              label="E-mail"
              type="email"
              required
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Field
              label="Senha"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error ? <p className="text-xs text-gold/80">{error}</p> : null}
            <GoldButton type="submit" className="w-full">
              Entrar na minha área
            </GoldButton>
          </form>

          <div className="mt-8 flex items-center justify-between text-[0.7rem] tracking-[0.16em] uppercase">
            <Link to="/recuperar-senha" className="text-muted-foreground hover:text-gold">
              Esqueci minha senha
            </Link>
            <Link to="/criar-conta" className="text-gold hover:text-gold-light">
              Criar minha conta
            </Link>
          </div>
        </div>
      </div>

      <div className="relative hidden items-center justify-center overflow-hidden border-l border-border p-10 lg:flex">
        <img
          src={capa.url}
          alt="Céu noturno com lua, constelações e roda do zodíaco — LimpezaAstral"
          className="max-h-[78vh] w-auto rounded-xl border border-gold/20 object-contain shadow-[0_30px_80px_-40px_var(--gold)]"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      </div>
    </div>
  );
}
