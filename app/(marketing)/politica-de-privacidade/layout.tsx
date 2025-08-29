import { Metadata } from "next";
import { env } from "../../../env";
import { organizationSchema } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como o Pontim coleta, usa e protege seus dados pessoais. Política de privacidade em conformidade com a LGPD.",
  keywords: [
    "política de privacidade",
    "pontim",
    "lgpd",
    "proteção de dados",
    "privacidade",
    "cookies",
    "dados pessoais",
    "scrum poker",
  ],
  openGraph: {
    title: "Política de Privacidade | Pontim",
    description:
      "Saiba como o Pontim coleta, usa e protege seus dados pessoais.",
    url: `${env.SITE_URL}/politica-de-privacidade`,
    siteName: "Pontim",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidade | Pontim",
    description:
      "Saiba como o Pontim coleta, usa e protege seus dados pessoais.",
  },
};

export default function PoliticaDePrivacidadeLayout({
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
