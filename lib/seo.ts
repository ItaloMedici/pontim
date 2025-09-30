import { env } from "@/env";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

// Type for translation function
type TranslationFunction = (key: string) => any;

export const getKeywords = async (): Promise<string[]> => {
  const messages = await getMessages();
  return (messages as any)?.seo?.keywords || [];
};

const openGraphLocale = {
  pt: "pt_BR",
  en: "en_US",
};

export const getOpenGraph = (
  t: TranslationFunction,
  locale: string,
): OpenGraph => ({
  type: "website",
  locale: openGraphLocale[locale] || openGraphLocale.pt,
  url: env.SITE_URL,
  title: t("seo.site.title") as string,
  description: t("seo.site.description") as string,
  siteName: "Pontim",
  images: [
    {
      url: `${env.SITE_URL}/marketing/hero.webp`,
      width: 1920,
      height: 1080,
      alt: t("seo.site.imageAlt") as string,
    },
  ],
});

export const getOrganizationSchema = (t: TranslationFunction) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pontim",
  description: t("seo.organization.description") as string,
  url: env.SITE_URL,
  logo: `${env.SITE_URL}/marketing/logo-vertical.webp`,
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: env.SITE_URL,
  },
});

export const getSoftwareApplicationSchema = async (
  t: TranslationFunction,
  locale: string,
) => {
  const messages = await getMessages();
  const features = (messages as any)?.seo?.softwareApplication?.features || [];

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pontim",
    description: t("seo.softwareApplication.description") as string,
    applicationCategory: "ProductivityApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
      description: t("seo.softwareApplication.offerDescription") as string,
    },
    softwareVersion: "1.0.0",
    downloadUrl: env.SITE_URL,
    screenshot: `${env.SITE_URL}/marketing/hero.webp`,
    featureList: features,
    author: {
      "@type": "Organization",
      name: "Pontim",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
      bestRating: "5",
    },
    datePublished: "2024-01-01",
    dateModified: new Date().toISOString().split("T")[0],
    inLanguage: locale === "pt" ? "pt-BR" : "en",
  };
};

export const breadcrumbSchema = (
  items: Array<{ name: string; url: string }>,
) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const getFaqSchema = async () => {
  const messages = await getMessages();
  const questions = (messages as any)?.seo?.faq?.questions || [];

  if (!Array.isArray(questions)) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [],
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item: any) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
};

export const getBaseMetadata = async (
  t: TranslationFunction,
  locale: string,
): Promise<Metadata> => {
  const keywords = await getKeywords();

  return {
    title: t("seo.site.title"),
    description: t("seo.site.description"),
    keywords: keywords,
    publisher: "Pontim",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: getOpenGraph(t, locale),
    twitter: {
      card: "summary_large_image",
      title: t("seo.twitter.title"),
      description: t("seo.twitter.description"),
      images: [`${env.SITE_URL}/marketing/hero.webp`],
    },
    alternates: {
      canonical: env.SITE_URL,
    },
    category: "technology",
    other: {
      "script:ld+json": JSON.stringify([
        getOrganizationSchema(t),
        await getSoftwareApplicationSchema(t, locale),
        await getFaqSchema(),
      ]),
    },
  };
};

// Backward compatibility - default Portuguese versions for existing usage
const defaultT = (key: string): any => {
  const ptTranslations: Record<string, any> = {
    "seo.site.title":
      "Pontim - Plataforma de Scrum Poker para Estimativas Ágeis",
    "seo.site.description":
      "Pontim é a plataforma open-source de Scrum Poker para estimativas ágeis em tempo real. Crie salas, vote com Fibonacci e melhore suas estimativas de story points.",
    "seo.organization.description":
      "Plataforma open-source de Scrum Poker para estimativas ágeis em tempo real",
    "seo.keywords": [
      "scrum poker",
      "planning poker",
      "estimativas ágeis",
      "story points",
      "fibonacci",
      "metodologia ágil",
    ],
    "seo.faq.questions": [
      {
        question: "O que é Scrum Poker?",
        answer:
          "Scrum Poker é uma técnica de estimativa ágil onde os membros da equipe votam simultaneamente usando cartas numeradas para estimar a complexidade das tarefas.",
      },
    ],
  };
  return ptTranslations[key] || "";
};

export const organizationSchema = getOrganizationSchema(defaultT);
export const openGraph = getOpenGraph(defaultT, "pt");
