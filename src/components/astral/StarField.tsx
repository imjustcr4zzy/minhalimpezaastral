const stars = Array.from({ length: 46 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const r = seed / 233280;
  const r2 = ((i * 4093 + 1) % 977) / 977;
  return {
    left: `${(r * 100).toFixed(2)}%`,
    top: `${(r2 * 100).toFixed(2)}%`,
    size: r2 > 0.85 ? 2.5 : 1.5,
    delay: `${(r * 6).toFixed(2)}s`,
    duration: `${(3 + r2 * 5).toFixed(2)}s`,
  };
});

export function StarField({ dense = false }: { dense?: boolean }) {
  const list = dense ? stars : stars.slice(0, 28);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {list.map((s, i) => (
        <span
          key={i}
          className="animate-twinkle absolute rounded-full bg-gold-light"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
            boxShadow: "0 0 6px currentColor",
          }}
        />
      ))}
    </div>
  );
}

export function Constellations({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className={`pointer-events-none absolute ${className}`}
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="0.6" opacity="0.5">
        <path d="M30 60 L90 40 L140 75 L200 55 L250 95" />
        <path d="M90 40 L110 100 L170 130" />
        <path d="M250 95 L310 70 L360 110" />
        <path d="M60 250 L120 290 L190 265 L240 310 L320 280" />
        <path d="M120 290 L140 350" />
      </g>
      <g fill="currentColor">
        {[
          [30, 60],
          [90, 40],
          [140, 75],
          [200, 55],
          [250, 95],
          [110, 100],
          [170, 130],
          [310, 70],
          [360, 110],
          [60, 250],
          [120, 290],
          [190, 265],
          [240, 310],
          [320, 280],
          [140, 350],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 4 === 0 ? 2.4 : 1.5} />
        ))}
      </g>
    </svg>
  );
}

export function MoonMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden className={className} fill="none">
      <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke="currentColor"
        strokeWidth="0.4"
        strokeDasharray="2 6"
        opacity="0.5"
      />
      <path
        d="M58 26a26 26 0 1 0 16 44 21 21 0 0 1-16-44Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  );
}
