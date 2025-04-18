import BlurFade from "@/components/ui/blur-fade";
import { buttonVariants } from "@/components/ui/button";
import WordPullUp from "@/components/ui/word-pull-up";
import { Glow } from "@/components/ui/glow";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="relative flex w-full flex-col items-center justify-start px-4 pt-20 sm:px-6 sm:pt-20 lg:px-8">
      <div className="flex w-full max-w-2xl flex-col space-y-4 overflow-hidden pt-8">
        <h1>
          <BlurFade delay={0.25} inView>
            <WordPullUp
              delayMultiple={0.15}
              className="text-center text-4xl font-medium leading-8 text-foreground sm:text-5xl"
              words="O jeito inteligente de estimar cada pontim dos story points!"
            />
          </BlurFade>
        </h1>
        <BlurFade delay={0.5} inView>
          <p className="mx-auto max-w-xl text-center text-md leading-7 text-muted-foreground sm:text-lg sm:leading-8 text-balance">
            Vote em tempo real, conecte-se com seu time e use sons para manter
            todos focados.
          </p>
        </BlurFade>
      </div>

      <div className="mx-auto mt-6 flex w-full max-w-2xl flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <BlurFade delay={0.75} inView>
          <Link className={cn(buttonVariants({ size: "lg" }))} href={"/login"}>
            Experimente o Pontim Gratuitamente!
          </Link>
        </BlurFade>
      </div>

      <div className="relative pt-12">
        <BlurFade delay={0.7} inView>
          <div className="p-1 border rounded-lg shadow-xl">
            <Image
              priority
              src="/marketing/hero.webp"
              alt="Board do pontim"
              width={1920}
              height={1080}
              className="relative w-full h-full rounded-md border object-contain"
            />
          </div>
        </BlurFade>

        <div className="absolute inset-x-0 top-0 -z-10">
          <BlurFade delay={1} inView>
            <Glow variant="top" />
          </BlurFade>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 -bottom-12 h-1/3 bg-gradient-to-t from-background/50 via-background/30 to-transparent lg:h-1/4" />
    </section>
  );
};
