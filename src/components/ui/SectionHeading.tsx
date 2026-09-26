type Props = {
  title: React.ReactNode;
  intro?: string;
  align?: "center" | "left";
  as?: "h1" | "h2";
};

export function SectionHeading({ title, intro, align = "left", as: Tag = "h2" }: Props) {
  const center = align === "center";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Tag className="text-4xl leading-[1.08] md:text-5xl">{title}</Tag>
      <Ornament center={center} />
      {intro && <p className={`mt-5 text-[17px] leading-relaxed text-muted ${center ? "mx-auto" : ""} max-w-[58ch]`}>{intro}</p>}
    </div>
  );
}

function Ornament({ center }: { center: boolean }) {
  return (
    <div aria-hidden className={`mt-5 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
      <span className="h-px w-10 bg-accent/40" />
      <span className="size-1.5 rotate-45 bg-accent" />
      <span className="h-px w-10 bg-accent/40" />
    </div>
  );
}
