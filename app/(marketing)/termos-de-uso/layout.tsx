import { Metadata } from "next";
import { env } from "../../../env";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Conheça os termos e condições de uso da plataforma Pontim. Direitos, deveres e responsabilidades dos usuários.",
  keywords: [
    "termos de uso",
    "pontim",
    "condições de uso",
    "acordo de usuário",
    "termos serviço",
    "scrum poker",
    "legal",
  ],
  openGraph: {
    title: "Termos de Uso | Pontim",
    description: "Conheça os termos e condições de uso da plataforma Pontim.",
    url: `${env.SITE_URL}/termos-de-uso`,
    siteName: "Pontim",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Termos de Uso | Pontim",
    description: "Conheça os termos e condições de uso da plataforma Pontim.",
  },
};

export default function TermosDeUsoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
