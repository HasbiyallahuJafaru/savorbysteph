import Image from "next/image";
import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

const plates = ["jollof-rice", "egusi-soup", "suya", "puff-puff", "ofada-rice"];

export function InstagramCta() {
  return (
    <section className="px-5 md:px-8" aria-labelledby="ig-title">
      <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-[var(--radius-panel)] bg-accent-tint px-6 py-16 text-center md:px-12 md:py-20">
        <div aria-hidden className="mx-auto flex max-w-md justify-center -space-x-5">
          {plates.map((p, i) => (
            <span
              key={p}
              className="relative block size-16 overflow-hidden rounded-full ring-4 ring-accent-tint md:size-20"
              style={{ transform: `translateY(${i % 2 ? 10 : 0}px)` }}
            >
              <Image src={`/images/dishes/${p}.webp`} alt="" fill sizes="80px" className="object-cover" />
            </span>
          ))}
        </div>
        <h2 id="ig-title" className="mx-auto mt-10 max-w-2xl text-4xl leading-tight md:text-5xl">
          Hungry yet? See what is cooking this week.
        </h2>
        <p className="mx-auto mt-4 max-w-[48ch] text-[17px] text-muted">
          Weekly specials, fresh batches and party tray drops are posted first on Instagram.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button href="/menu">Order now</Button>
          <Button href={site.instagram} external variant="light">
            <InstagramLogo size={20} /> @{site.instagramHandle}
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
