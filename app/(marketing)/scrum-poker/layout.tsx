import { Metadata } from "next";
import { env } from "../../../env";
import { keywords, organizationSchema } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Como Funciona o Scrum Poker",
  description:
    "Aprenda como funciona o Scrum Poker passo a passo. Guia completo com exemplos práticos, técnicas de Planning Poker e estimativas ágeis com Fibonacci.",
  keywords: [
    ...keywords,
    "como funciona scrum poker",
    "tutorial planning poker",
    "guia scrum poker",
    "passo a passo planning poker",
    "como usar fibonacci estimativas",
    "tutorial estimativas ágeis",
    "planning poker brasileiro",
    "scrum poker para iniciantes",
  ],
  openGraph: {
    title: "Como Funciona o Scrum Poker | Guia Completo",
    description: "Aprenda Scrum Poker passo a passo com exemplos práticos",
    url: `${env.SITE_URL}/como-funciona`,
    images: [`${env.SITE_URL}/marketing/como-funciona.webp`],
  },
  alternates: {
    canonical: `${env.SITE_URL}/scrum-poker`,
  },
};

export default function ScrumPokerLayout({
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
