import { Metadata } from "next";
import { env } from "../../../env";
import { organizationSchema } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Sequência de Fibonacci no Planning Poker | Guia Completo | Pontim",
  description:
    "Descubra por que a sequência de Fibonacci é usada no Planning Poker e Scrum. Entenda as vantagens dessa escala para estimativas ágeis.",
  keywords: [
    "fibonacci",
    "planning poker",
    "scrum poker",
    "estimativa ágil",
    "sequência fibonacci",
    "escala estimativa",
    "story points",
    "metodologia ágil",
    "números fibonacci",
    "estimativa software",
  ],
  openGraph: {
    title: "Sequência de Fibonacci no Planning Poker | Guia Completo",
    description:
      "Descubra por que a sequência de Fibonacci é usada no Planning Poker e suas vantagens.",
    url: `${env.SITE_URL}/fibonacci`,
    siteName: "Pontim",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sequência de Fibonacci no Planning Poker | Guia Completo",
    description:
      "Descubra por que a sequência de Fibonacci é usada no Planning Poker e suas vantagens.",
  },
};

export default function FibonacciLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema]),
        }}
      />
      {children}
    </>
  );
}
