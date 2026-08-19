import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Constellations, StarField } from "@/components/astral/StarField";
import { Field, GoldButton } from "@/components/astral/Ui";

export const Route = createFileRoute("/recuperar-senha")({
  head: () => ({
    meta: [
      { title: "Recuperar senha — LimpezaAstral" },
      {
        name: "description",
        content: "Recupere o acesso à sua área de membros LimpezaAstral.",
      },
      { property: "og:title", content: "Recuperar senha — LimpezaAstral" },
      { property: "og:description", content: "Recupere o acesso à sua área de membros." },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  const [sent, setSent] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center px-5 py-14">
      <StarField />
      <Constellations className="bottom-0 -left-10 h-72 w-72 text-gold/20" />

      <div className="animate-rise panel relative w-full max-w-md p-8 sm:p-10">
        <div className="text-center">
          <span className="text-gold">✦</span>
          <h1 className="mt-4 text-xl text-gold-gradient">RECUPERAR ACESSO</h1>
          <div className="hairline-gold mx-auto mt-5 h-px w-20" />
        </div>

        {sent ? (
          <p className="mt-8 text-center font-serif text-lg leading-relaxed text-muted-foreground">
            Se este e-mail estiver cadastrado, você receberá as instruções para redefinir sua
            senha.
          </p>
        ) : (
          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <p className="font-serif text-lg text-muted-foreground">
              Informe seu e-mail e enviaremos as instruções de redefinição.
            </p>
            <Field label="E-mail" type="email" required placeholder="seu@email.com" />
            <GoldButton type="submit" className="w-full">
              Enviar instruções
            </GoldButton>
          </form>
        )}

        <p className="mt-8 text-center text-[0.7rem] tracking-[0.16em] text-muted-foreground uppercase">
          <Link to="/" className="text-gold hover:text-gold-light">
            Voltar para o login
          </Link>
        </p>
      </div>
    </div>
  );
}
