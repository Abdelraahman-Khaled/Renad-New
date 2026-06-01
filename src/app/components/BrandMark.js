// Typographic wordmarks for the two hero brands. Real logos drop in later;
// these read as distinct, premium brand identities.

export function PaperMintsMark({ className = "", light = false }) {
  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      <span className={light ? "text-white/75" : "text-[#1f9d57]/70"}>Paper</span>
      <span className={light ? "text-white" : "text-[#1f9d57]"}>Mints</span>
    </span>
  );
}

export function TungMark({ className = "", light = false }) {
  return (
    <span
      className={`font-display font-bold uppercase tracking-[0.14em] ${className} ${
        light ? "text-white" : "text-[#1c8fd6]"
      }`}
    >
      TUNG
    </span>
  );
}
