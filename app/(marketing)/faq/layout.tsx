import { Metadata } from "next";
import { env } from "../../../env";
import { faqSchema, organizationSchema } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "FAQ - Perguntas Frequentes sobre Scrum Poker",
  description:
    "Respostas para as principais dúvidas sobre Scrum Poker, Planning Poker, Story Points e estimativas ágeis. Tudo que você precisa saber sobre o Pontim.",
  keywords: [
    "faq scrum poker",
    "perguntas planning poker",
    "duvidas story points",
    "como usar pontim",
    "planning poker duvidas",
    "scrum poker faq",
    "estimativas ageis faq",
    "pontim help",
    "ajuda planning poker",
  ],
  openGraph: {
    title: "FAQ - Perguntas Frequentes sobre Scrum Poker",
    description:
      "Respostas para suas dúvidas sobre Planning Poker e estimativas ágeis",
    url: `${env.SITE_URL}/faq`,
    images: [`${env.SITE_URL}/marketing/faq.webp`],
  },
  alternates: {
    canonical: `${env.SITE_URL}/faq`,
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([faqSchema, organizationSchema]),
        }}
      />
      {children}
    </>
  );
}
