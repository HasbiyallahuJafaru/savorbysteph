import { Pepper } from "@phosphor-icons/react/dist/ssr";

const labels = ["Not spicy", "Mild", "Medium", "Hot"];

export function SpiceLevel({ level }: { level: 0 | 1 | 2 | 3 }) {
  return (
    <span className="flex items-center gap-0.5 text-xs text-muted" title={labels[level]}>
      <span className="sr-only">{labels[level]}</span>
      {[1, 2, 3].map((n) => (
        <Pepper key={n} aria-hidden size={13} weight={n <= level ? "fill" : "regular"} className={n <= level ? "text-accent" : "text-line"} />
      ))}
    </span>
  );
}
