import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Savorbysteph home" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="grid size-9 place-items-center rounded-full bg-accent font-display text-lg italic text-white transition-transform duration-500 group-hover:rotate-[-12deg]">
        S
      </span>
      <span className="leading-none">
        <span className="block font-display text-[1.35rem] tracking-tight">Savorbysteph</span>
        <span className="mt-0.5 block text-[10px] uppercase tracking-[0.28em] text-muted">Nigerian kitchen</span>
      </span>
    </Link>
  );
}
