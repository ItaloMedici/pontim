import { getLocaleOrDefault } from "@/i18n/utils";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { env } from "../../../env";
import { getKeywords, getOpenGraph } from "../../../lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleOrDefault();
  const t = await getTranslations("marketing.scrumPoker");
  const openGraph = getOpenGraph(t, locale);
  const keywords = await getKeywords();
  const seoKeywords = Array.from(t("seo.keywords"));

  return {
    description: t("seo.description"),
    keywords: [...keywords, ...seoKeywords],
    openGraph: {
      ...openGraph,
      title: t("seo.openGraph.title"),
      description: t("seo.openGraph.description"),
      url: `${env.SITE_URL}/como-funciona`,
      images: [`${env.SITE_URL}/marketing/como-funciona.webp`],
    },
    alternates: {
      canonical: `${env.SITE_URL}/scrum-poker`,
    },
  };
}

export default function ScrumPokerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
