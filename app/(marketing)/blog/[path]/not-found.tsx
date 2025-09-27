import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileX } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("errors.notFound.blog");
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
            {t("title")}
          </h1>
        </BlurFade>

        <BlurFade delay={0.3} inView>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            {t("description")}
          </p>
        </BlurFade>

        <BlurFade delay={0.4} inView>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" size="lg">
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("viewAllPosts")}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">{t("goHome")}</Link>
            </Button>
          </div>
        </BlurFade>

        <BlurFade delay={0.5} inView>
          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">{t("contact")}</p>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
