import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <BlurFade delay={0.1} inView>
          <div className="mb-8">
            <FileX className="w-24 h-24 text-muted-foreground mx-auto mb-6" />
          </div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Post não encontrado
          </h1>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            O artigo que você está procurando não existe ou pode ter sido
            removido. Que tal explorar outros conteúdos do nosso blog?
          </p>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ver todos os posts
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Ir para home</Link>
            </Button>
          </div>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Se você acredita que isso é um erro, entre em contato conosco.
            </p>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
