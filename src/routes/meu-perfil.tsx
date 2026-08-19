import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AppLayout } from "@/components/astral/AppLayout";
import { Field, GoldButton, PageHeading } from "@/components/astral/Ui";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/meu-perfil")({
  head: () => ({
    meta: [
      { title: "Meu Perfil — LimpezaAstral" },
      {
        name: "description",
        content:
          "Atualize seus dados de nascimento para personalizar as leituras do seu mapa astral.",
      },
      { property: "og:title", content: "Meu Perfil — LimpezaAstral" },
      { property: "og:description", content: "Seus dados, salvos automaticamente." },
    ],
  }),
  component: PerfilPage,
});

function PerfilPage() {
  const { profile, updateProfile } = useStore();
  const [form, setForm] = useState({
    name: "",
    email: "",
    birthDate: "",
    birthTime: "",
    birthCity: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) setForm({ ...profile });
  }, [profile]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [k]: value }));
    updateProfile({ [k]: value });
    setSaved(true);
  };

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Conta"
        title="MEU PERFIL"
        subtitle="Estes dados são utilizados para personalizar o seu mapa astral."
      />

      <form
        className="card-astral mt-10 max-w-2xl p-8 sm:p-10"
        onSubmit={(e) => {
          e.preventDefault();
          updateProfile(form);
          setSaved(true);
        }}
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Nome" value={form.name} onChange={set("name")} />
          <Field label="E-mail" type="email" value={form.email} onChange={set("email")} />
          <Field
            label="Data de nascimento"
            type="date"
            value={form.birthDate}
            onChange={set("birthDate")}
          />
          <Field
            label="Horário de nascimento"
            type="time"
            value={form.birthTime}
            onChange={set("birthTime")}
          />
          <div className="sm:col-span-2">
            <Field
              label="Cidade de nascimento"
              value={form.birthCity}
              onChange={set("birthCity")}
              placeholder="Cidade, estado"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <GoldButton type="submit">Salvar alterações</GoldButton>
          {saved ? (
            <span className="eyebrow text-gold/80">Salvo automaticamente ✦</span>
          ) : null}
        </div>
      </form>
    </AppLayout>
  );
}
