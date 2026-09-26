import { Button } from "@/components/ui/Button";
import { CircleImage } from "@/components/ui/CircleImage";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[80dvh] max-w-3xl flex-col items-center justify-center px-5 pt-[72px] text-center">
      <CircleImage src="/images/dishes/puff-puff.webp" alt="Puff puff" sizes="160px" className="w-40" />
      <h1 className="mt-10 text-5xl">This plate is empty.</h1>
      <p className="mt-4 max-w-[40ch] text-lg text-muted">The page you were looking for is not on the menu. The food still is.</p>
      <div className="mt-8">
        <Button href="/menu">Order now</Button>
      </div>
    </section>
  );
}
