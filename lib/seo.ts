import { env } from "@/env";
import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const keywords = [
  "scrum poker",
  "planning poker",
  "estimativas ágeis",
  "story points",
  "fibonacci",
  "t-shirt sizing",
  "metodologia ágil",
  "desenvolvimento software",
  "gestão projetos",
  "planning",
  "poker",
  "scrum",
  "agile",
  "ferramenta scrum poker online",
  "estimativa story points fibonacci",
  "planning poker gratuito",
  "scrum poker em tempo real",
  "ferramenta agile estimation",
  "votação fibonacci online",
  "scrum poker brasileiro",
  "planning poker português",
  "como fazer planning poker online",
  "ferramenta estimativa story points",
  "scrum poker brasileiro grátis",
  "planning poker para equipes remotas",
  "estimativa ágil fibonacci online",
  "ferramenta scrum master",
  "votação anônima planning poker",
  "scrum poker com notificações",
  "planning poker tempo real",
  "estimativa complexidade tarefas",
];

export const openGraph: OpenGraph = {
  type: "website",
  locale: "pt_BR",
  url: env.SITE_URL,
  title: "Pontim - Plataforma de Scrum Poker para Estimativas Ágeis",
  description:
    "Pontim é a plataforma open-source de Scrum Poker para estimativas ágeis em tempo real. Crie salas, vote com Fibonacci e melhore suas estimativas de story points.",
  siteName: "Pontim",
  images: [
    {
      url: `${env.SITE_URL}/marketing/hero.webp`,
      width: 1920,
      height: 1080,
      alt: "Pontim - Interface do Scrum Poker",
    },
  ],
};

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pontim",
  description:
    "Plataforma open-source de Scrum Poker para estimativas ágeis em tempo real",
  url: env.SITE_URL,
  logo: `${env.SITE_URL}/marketing/logo-vertical.webp`,
  foundingDate: "2024",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: env.SITE_URL,
  },
};

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Pontim",
  description:
    "Plataforma de Scrum Poker para estimativas ágeis em tempo real com votação Fibonacci",
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "BRL",
    description: "Plano gratuito disponível",
  },
  softwareVersion: "1.0.0",
  downloadUrl: env.SITE_URL,
  screenshot: `${env.SITE_URL}/marketing/hero.webp`,
  featureList: [
    "Votação em tempo real",
    "Salas privadas personalizáveis",
    "Notificações interativas com som",
    "Scrum poker",
    "Planning poker",
    "Votação Fibonacci",
    "Estimativas ágeis",
    "Gestão de projetos",
    "Votação em grupo",
    "Story points",
  ],
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
  inLanguage: "pt-BR",
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

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "O que é Scrum Poker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Scrum Poker (também conhecido como Planning Poker) é uma técnica de estimativa ágil onde os membros da equipe votam simultaneamente usando cartas numeradas para estimar a complexidade das tarefas. É amplamente usado em metodologias ágeis como Scrum para melhorar a precisão das estimativas de story points.",
      },
    },
    {
      "@type": "Question",
      name: "Como funciona o Pontim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Pontim permite criar salas de estimativa onde sua equipe pode votar em tempo real usando números Fibonacci. Todos votam simultaneamente e os resultados são revelados juntos para discussão. A plataforma oferece notificações sonoras, salas personalizáveis e uma interface intuitiva para facilitar o processo de estimativa.",
      },
    },
    {
      "@type": "Question",
      name: "É gratuito usar o Pontim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sim, o Pontim oferece um plano gratuito com funcionalidades básicas para equipes pequenas. Também temos planos pagos com recursos avançados como salas ilimitadas, histórico de votações e integrações para equipes maiores.",
      },
    },
    {
      "@type": "Question",
      name: "Quais são os benefícios do Planning Poker?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "O Planning Poker melhora a precisão das estimativas ao combinar múltiplas perspectivas da equipe, reduz vieses individuais, promove discussões produtivas sobre complexidade das tarefas e ajuda a identificar riscos e dependências não óbvias.",
      },
    },
    {
      "@type": "Question",
      name: "Como criar uma sala no Pontim?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Para criar uma sala no Pontim, clique em 'Criar Sala', defina um nome para sua sessão, escolha o sistema de votação (Fibonacci, T-shirt sizing, etc.) e compartilhe o link com sua equipe. É simples e não requer cadastro.",
      },
    },
  ],
};

export const baseMetadata: Metadata = {
  title: "Pontim - Plataforma de Scrum Poker para Estimativas Ágeis",
  description:
    "Pontim é a plataforma open-source de Scrum Poker para estimativas ágeis em tempo real. Crie salas, vote com Fibonacci e melhore suas estimativas de story points.",
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
  openGraph: openGraph,
  twitter: {
    card: "summary_large_image",
    title: "Pontim - Plataforma de Scrum Poker para Estimativas Ágeis",
    description:
      "Plataforma open-source de Scrum Poker para estimativas ágeis em tempo real.",
    images: [`${env.SITE_URL}/marketing/hero.webp`],
  },
  alternates: {
    canonical: env.SITE_URL,
  },
  category: "technology",
  other: {
    "script:ld+json": JSON.stringify([
      organizationSchema,
      softwareApplicationSchema,
      faqSchema,
    ]),
  },
};
