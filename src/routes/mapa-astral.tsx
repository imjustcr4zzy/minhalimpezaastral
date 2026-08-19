import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/astral/AppLayout";
import { PageHeading } from "@/components/astral/Ui";
import { posicionamentos, zodiaco } from "@/lib/content";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/mapa-astral")({
  head: () => ({
    meta: [
      { title: "Meu Mapa Astral — LimpezaAstral" },
      {
        name: "description",
        content:
          "Visualize seu círculo astrológico com signos, casas, planetas e seus principais posicionamentos.",
      },
      { property: "og:title", content: "Meu Mapa Astral — LimpezaAstral" },
      {
        property: "og:description",
        content: "Signos, casas, planetas e aspectos do seu mapa astral.",
      },
    ],
  }),
  component: MapaAstralPage,
});

function Wheel() {
  const r = 150;
  const center = 170;
  const point = (angle: number, radius: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return [center + radius * Math.cos(rad), center + radius * Math.sin(rad)] as const;
  };

  return (
    <svg viewBox="0 0 340 340" className="w-full text-gold" fill="none">
      <g className="animate-orbit" style={{ transformOrigin: "170px 170px" }}>
        <circle cx={center} cy={center} r={r} stroke="currentColor" strokeWidth="0.7" opacity="0.55" />
        <circle cx={center} cy={center} r={r - 26} stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
        {zodiaco.map((glyph, i) => {
          const [x1, y1] = point(i * 30, r - 26);
          const [x2, y2] = point(i * 30, r);
          const [tx, ty] = point(i * 30 + 15, r - 13);
          return (
            <g key={glyph}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="0.4" opacity="0.5" />
              <text
                x={tx}
                y={ty + 4}
                textAnchor="middle"
                fontSize="11"
                fill="currentColor"
                opacity="0.85"
              >
                {glyph}
              </text>
            </g>
          );
        })}
      </g>

      <circle cx={center} cy={center} r={r - 62} stroke="currentColor" strokeWidth="0.4" opacity="0.35" />
      <circle cx={center} cy={center} r={r - 95} stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 5" opacity="0.4" />

      {Array.from({ length: 12 }, (_, i) => {
        const [x1, y1] = point(i * 30 + 8, r - 62);
        const [tx, ty] = point(i * 30 + 23, r - 52);
        return (
          <g key={i}>
            <line x1={center} y1={center} x2={x1} y2={y1} stroke="currentColor" strokeWidth="0.25" opacity="0.3" />
            <text x={tx} y={ty} textAnchor="middle" fontSize="6" fill="currentColor" opacity="0.5">
              {i + 1}
            </text>
          </g>
        );
      })}

      <g opacity="0.75">
        {[
          [18, "☉"],
          [96, "☽"],
          [152, "☿"],
          [214, "♀"],
          [268, "♂"],
          [330, "♄"],
        ].map(([angle, glyph]) => {
          const [x, y] = point(Number(angle), r - 78);
          return (
            <text key={String(glyph)} x={x} y={y + 4} textAnchor="middle" fontSize="12" fill="currentColor">
              {glyph}
            </text>
          );
        })}
      </g>

      <g stroke="currentColor" strokeWidth="0.35" opacity="0.45">
        {[
          [18, 152],
          [96, 268],
          [214, 330],
          [18, 214],
        ].map(([a, b], i) => {
          const [x1, y1] = point(a, r - 88);
          const [x2, y2] = point(b, r - 88);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      <circle cx={center} cy={center} r="2" fill="currentColor" />
    </svg>
  );
}

function MapaAstralPage() {
  const { profile } = useStore();

  return (
    <AppLayout>
      <PageHeading
        eyebrow="Astrologia"
        title="SEU MAPA ASTRAL"
        subtitle={
          profile?.birthDate
            ? `Calculado a partir de ${profile.birthDate}${profile.birthCity ? ` · ${profile.birthCity}` : ""}.`
            : "Complete seus dados de nascimento no perfil para personalizar as leituras."
        }
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <div className="card-astral flex items-center justify-center p-6 sm:p-10">
          <Wheel />
        </div>

        <div>
          <h2 className="text-base text-foreground">Seus principais posicionamentos</h2>
          <div className="hairline-gold mt-4 h-px w-24" />
          <div className="mt-6 space-y-4">
            {posicionamentos.map((p) => (
              <article key={p.planeta} className="card-astral p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/25 text-sm text-gold">
                    {p.glifo}
                  </span>
                  <p className="text-sm tracking-[0.14em] text-foreground uppercase">
                    {p.planeta}: <span className="text-gold">{p.signo}</span>
                  </p>
                </div>
                <p className="mt-3 font-serif text-base leading-relaxed text-muted-foreground">
                  {p.texto}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
