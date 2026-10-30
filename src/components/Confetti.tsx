import { seeded } from "@/lib/seeded";

const rnd = seeded(2026);
const PIECES = Array.from({ length: 48 }, (_, i) => ({
  left: (rnd() * 100).toFixed(2),
  w: (5 + rnd() * 6).toFixed(1),
  h: (8 + rnd() * 10).toFixed(1),
  dur: (4 + rnd() * 4).toFixed(2),
  delay: (rnd() * 3).toFixed(2),
  drift: ((rnd() - 0.5) * 200).toFixed(1),
  r: Math.round(360 + rnd() * 720),
  color: ["#F3DFA2", "#D4AF5A", "#9C7A2B", "#F4EEE3", "#E07A3F"][i % 5],
}));

// Pluie de confettis dorés (CSS pur), jouée deux fois puis arrêtée
export default function Confetti() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {PIECES.map((p, i) => (
        <span
          key={i}
          className="confetti absolute -top-6 rounded-[2px]"
          style={{
            left: `${p.left}%`,
            width: `${p.w}px`,
            height: `${p.h}px`,
            background: p.color,
            ["--dur" as string]: `${p.dur}s`,
            ["--delay" as string]: `${p.delay}s`,
            ["--drift" as string]: `${p.drift}px`,
            ["--r" as string]: `${p.r}deg`,
          }}
        />
      ))}
    </div>
  );
}
