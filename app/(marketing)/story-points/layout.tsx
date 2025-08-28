import { Metadata } from "next";
import { env } from "../../../env";
import { organizationSchema } from "../../../lib/seo";

export const metadata: Metadata = {
  title: "Story Points: Guia Completo para Estimativas Ágeis | Pontim",
  description:
    "Aprenda tudo sobre Story Points: o que são, como usar, vantagens e como aplicar essa técnica de estimativa ágil em seus projetos de software.",
  keywords: [
    "story points",
    "estimativa ágil",
    "scrum poker",
    "planning poker",
    "fibonacci",
    "estimativa software",
    "metodologia ágil",
    "scrum",
    "desenvolvimento ágil",
    "complexidade tarefas",
  ],
  openGraph: {
    title: "Story Points: Guia Completo para Estimativas Ágeis",
    description:
      "Aprenda tudo sobre Story Points e como usar essa técnica de estimativa ágil.",
    url: `${env.SITE_URL}/story-points`,
    siteName: "Pontim",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Story Points: Guia Completo para Estimativas Ágeis",
    description:
      "Aprenda tudo sobre Story Points e como usar essa técnica de estimativa ágil.",
  },
};

export default function StoryPointsLayout({
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
