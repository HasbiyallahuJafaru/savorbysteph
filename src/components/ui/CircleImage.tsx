import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  ring?: boolean;
};

export function CircleImage({ src, alt, sizes, priority, className = "", ring = true }: Props) {
  return (
    <div
      className={`relative aspect-square overflow-hidden rounded-full bg-shell ${
        ring ? "shadow-[0_24px_60px_-28px_rgba(120,53,15,0.45)] ring-[6px] ring-white" : ""
      } ${className}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  );
}
