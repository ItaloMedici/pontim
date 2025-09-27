import blogPosts from "@/blog-posts.json";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/ui/blur-fade";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, CalendarDays, User } from "lucide-react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog - Pontim | Dicas e insights sobre Planning Poker",
  description:
    "Artigos sobre planning poker, story points, estimativas ágeis e melhores práticas para times de desenvolvimento.",
  openGraph: {
    title: "Blog - Pontim",
    description:
      "Artigos sobre planning poker, story points, estimativas ágeis e melhores práticas para times de desenvolvimento.",
    type: "website",
  },
};

export default async function BlogPage() {
  const t = await getTranslations("marketing.blog");
  const posts = Object.entries(blogPosts).map(([path, post]) => ({
    path,
    ...post,
  }));

  const sortedPosts = posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const buildDate = (dateString: string) => {
    const date = format(dateString, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    return date;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <BlurFade delay={0.25} inView>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              {t("badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>
        </BlurFade>

        <div className="grid gap-8">
          {sortedPosts.map((post, index) => (
            <BlurFade key={post.path} delay={0.25 + index * 0.1} inView>
              <Card className="group hover:shadow-lg transition-all duration-300 border-border hover:border-foreground/20">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="w-4 h-4" />
                      {buildDate(post.date)}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </div>
                  </div>
                  <h2 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.description}
                  </p>
                  <Link
                    href={`/blog/${post.path}`}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {t("readMore")}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </CardContent>
              </Card>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.5} inView>
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">{t("cta.description")}</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {t("cta.button")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </BlurFade>
      </div>
    </div>
  );
}
