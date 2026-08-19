import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Constellations, StarField } from "@/components/astral/StarField";
import { Field, GoldButton } from "@/components/astral/Ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/criar-conta")({
  head: () => ({
    meta: [
      { title: "Criar minha conta — LimpezaAstral" },
      {
        name: "description",
        content: "Crie sua conta e comece sua jornada de autoconhecimento na LimpezaAstral.",
      },
      { property: "og:title", content: "Criar minha conta — LimpezaAstral" },
      {
        property: "og:description",
        content: "Conecte-se com seu universo. Reencontre seu equilíbrio.",
      },
    ],
  }),
  component: SignUpPage,
});

function SignUpPage() {
  const { signUp } = useStore();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-14">
      <StarField dense />
      <Constellations className="top-10 right-0 h-80 w-80 text-gold/20" />

      <div className="animate-rise panel relative w-full max-w-md p-8 sm:p-10">
        <div className="text-center">
          <span className="text-gold">✦</span>
          <h1 className="mt-4 text-xl text-gold-gradient">CRIAR MINHA CONTA</h1>
          <div className="hairline-gold mx-auto mt-5 h-px w-20" />
          <p className="mt-5 font-serif text-lg text-muted-foreground">
            Comece agora sua jornada de equilíbrio e autoconhecimento.
          </p>
        </div>

        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            const res = signUp(form.name, form.email, form.password, form.confirm);
            if (!res.ok) {
              setError(res.error ?? "Não foi possível criar a conta.");
              return;
            }
            setError(null);
            navigate({ to: "/dashboard" });
          }}
        >
          <Field label="Nome" value={form.name} onChange={set("name")} placeholder="Seu nome" />
          <Field
            label="E-mail"
            type="email"
            value={form.email}
            onChange={set("email")}
            placeholder="seu@email.com"
          />
          <Field
            label="Senha"
            type="password"
            value={form.password}
            onChange={set("password")}
            placeholder="••••••••"
          />
          <Field
            label="Confirmar senha"
            type="password"
            value={form.confirm}
            onChange={set("confirm")}
            placeholder="••••••••"
          />
          {error ? <p className="text-xs text-gold/80">{error}</p> : null}
          <GoldButton type="submit" className="w-full">
            Criar minha conta
          </GoldButton>
        </form>

        <p className="mt-8 text-center text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase">
          Já tem acesso?{" "}
          <Link to="/" className="text-gold hover:text-gold-light">
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
