import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/astral/AppLayout";
import { GhostButton, PageHeading } from "@/components/astral/Ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/configuracoes")({
  head: () => ({
    meta: [
      { title: "Configurações — LimpezaAstral" },
      {
        name: "description",
        content: "Preferências da sua área de membros: lembretes, som ambiente e sessão.",
      },
      { property: "og:title", content: "Configurações — LimpezaAstral" },
      { property: "og:description", content: "Ajuste sua experiência na plataforma." },
    ],
  }),
  component: ConfiguracoesPage,
});

function Toggle({ label, hint }: { label: string; hint: string }) {
  const [on, setOn] = useState(true);
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border py-5 last:border-0">
      <div className="min-w-0">
        <p className="text-sm text-foreground">{label}</p>
        <p className="mt-1 font-serif text-base text-muted-foreground">{hint}</p>
      </div>
      <button
        type="button"
        aria-label={label}
        aria-pressed={on}
        onClick={() => setOn((v) => !v)}
        className={`h-6 w-11 shrink-0 rounded-full border transition-colors ${
          on ? "border-gold/60 bg-gold/25" : "border-border bg-secondary/40"
        }`}
      >
        <span
          className={`block h-4 w-4 rounded-full bg-gold transition-transform ${
            on ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

function ConfiguracoesPage() {
  const { signOut, profile } = useStore();
  const navigate = useNavigate();

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Preferências"
        title="CONFIGURAÇÕES"
        subtitle="Ajuste a forma como a plataforma acompanha a sua rotina."
      />

      <section className="card-astral mt-10 max-w-2xl p-8">
        <Toggle label="Lembrete diário" hint="Um convite discreto para a prática do dia." />
        <Toggle label="Som ambiente" hint="Paisagem sonora suave durante as práticas." />
        <Toggle label="Novidades do acervo" hint="Avisos quando novos rituais forem liberados." />
      </section>

      <section className="card-astral mt-8 max-w-2xl p-8">
        <p className="eyebrow">Sessão</p>
        <p className="mt-3 font-serif text-lg text-muted-foreground">
          Conectado como {profile?.email}
        </p>
        <div className="mt-6">
          <GhostButton
            onClick={() => {
              signOut();
              navigate({ to: "/" });
            }}
          >
            Sair da conta
          </GhostButton>
        </div>
      </section>
    </AppLayout>
  );
}
