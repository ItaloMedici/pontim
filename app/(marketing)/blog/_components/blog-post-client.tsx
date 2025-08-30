"use client";

import { ContentRenderer } from "@/app/(marketing)/blog/_components/content-renderer";
import { Badge } from "@/components/ui/badge";
import BlurFade from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import Link from "next/link";

const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface BlogPostClientProps {
  post: {
    title: string;
    date: string;
    author: string;
    content: any[];
  };
  readingTime: number;
}

export function BlogPostClient({ post, readingTime }: BlogPostClientProps) {
  const buildDate = (dateString: string) => {
    const date = format(dateString, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    return date;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <BlurFade delay={0.1} inView>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o blog
          </Link>
        </BlurFade>

        <article>
          <header className="mb-8">
            <BlurFade delay={0.2} inView>
              <Badge variant="secondary" className="mb-4">
                Artigo
              </Badge>
            </BlurFade>

            <BlurFade delay={0.3} inView>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  {buildDate(post.date)}
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {readingTime} min de leitura
                </div>
              </div>
            </BlurFade>
          </header>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="prose prose-lg prose-gray dark:prose-invert max-w-none"
          >
            <ContentRenderer content={post.content} />
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <div className="bg-muted/50 rounded-lg p-6 text-center">
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Gostou do artigo?
              </h3>
              <p className="text-muted-foreground mb-4">
                Experimente o Pontim e melhore suas sessões de planning poker!
              </p>
              <Button asChild size="lg">
                <Link href="/login">Começar gratuitamente</Link>
              </Button>
            </div>
          </motion.div>
        </article>
      </div>
    </div>
  );
}
