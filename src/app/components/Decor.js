/*
  Decorative, on-brand SVG accents for section side-whitespace.
  Purely aesthetic: pointer-events-none, aria-hidden, hidden below lg,
  low opacity, gentle motion (auto-disabled under prefers-reduced-motion
  via the global rule in globals.css).
*/

function Dots({ className = "", color = "#1799bc" }) {
  return (
    <svg viewBox="0 0 80 80" className={className} aria-hidden fill={color}>
      {Array.from({ length: 6 }).map((_, r) =>
        Array.from({ length: 6 }).map((_, c) => (
          <circle key={`${r}-${c}`} cx={6 + c * 14} cy={6 + r * 14} r="2.4" />
        ))
      )}
    </svg>
  );
}

function Rings({ className = "", color = "#1799bc" }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden fill="none" stroke={color}>
      <circle cx="60" cy="60" r="56" strokeWidth="1.5" strokeDasharray="4 7" />
      <circle cx="60" cy="60" r="38" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="20" strokeWidth="1.5" strokeDasharray="3 6" />
    </svg>
  );
}

function Plus({ className = "", color = "#e0241c" }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden stroke={color} strokeWidth="2.5" strokeLinecap="round">
      <path d="M14 6v16M6 14h16" />
      <path d="M46 34v20M36 44h20" opacity="0.6" />
    </svg>
  );
}

function Wave({ className = "", color = "#34b7d6" }) {
  return (
    <svg viewBox="0 0 60 200" className={className} aria-hidden fill="none" stroke={color} strokeWidth="2">
      <path d="M30 0 C50 25 10 50 30 75 C50 100 10 125 30 150 C50 175 10 195 30 200" strokeDasharray="2 8" strokeLinecap="round" />
    </svg>
  );
}

/* Soft color blob for ambient warmth */
function Blob({ className = "", color = "#1799bc" }) {
  return (
    <span
      className={`block rounded-full blur-3xl ${className}`}
      style={{ backgroundColor: color }}
      aria-hidden
    />
  );
}

/*
  Side decoration layer. Place as the first child of a `relative overflow-hidden`
  section; give the section's content wrapper `relative z-10` so content sits above.
  `variant` lightly changes the motif mix so sections don't all look identical.
*/
export default function SideDecor({ variant = "a" }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden lg:block" aria-hidden>
      {variant === "a" && (
        <>
          <Blob className="absolute -left-24 top-10 h-56 w-56 opacity-[0.06]" color="#1799bc" />
          <Rings className="absolute -left-10 top-28 h-32 w-32 opacity-[0.10] [animation:spin-slow_40s_linear_infinite]" color="#1799bc" />
          <Dots className="absolute bottom-16 left-8 h-20 w-20 opacity-[0.18]" color="#1799bc" />
          <Plus className="absolute right-10 top-24 h-12 w-12 opacity-30 [animation:floaty_7s_ease-in-out_infinite]" color="#e0241c" />
          <Dots className="absolute -right-2 bottom-24 h-24 w-24 opacity-[0.16]" color="#34b7d6" />
          <Blob className="absolute -right-24 bottom-0 h-56 w-56 opacity-[0.06]" color="#34b7d6" />
        </>
      )}
      {variant === "b" && (
        <>
          <Dots className="absolute left-2 top-20 h-24 w-24 opacity-[0.16]" color="#1799bc" />
          <Wave className="absolute left-10 top-1/3 h-44 w-12 opacity-30 [animation:floaty_9s_ease-in-out_infinite]" color="#34b7d6" />
          <Blob className="absolute -right-24 top-12 h-56 w-56 opacity-[0.06]" color="#1799bc" />
          <Rings className="absolute -right-12 bottom-16 h-36 w-36 opacity-[0.10] [animation:spin-slow_50s_linear_infinite]" color="#34b7d6" />
          <Plus className="absolute bottom-20 left-1/3 h-10 w-10 opacity-25 [animation:floaty_6s_ease-in-out_infinite]" color="#e0241c" />
        </>
      )}
    </div>
  );
}
