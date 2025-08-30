import { PricingSection } from "@/components/pricing";
import { env } from "@/env";
import { keywords, openGraph } from "@/lib/seo";
import { getPlanPricings } from "@/use-cases/plan/get-pricings";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Preços e Planos",
  description:
    "Conheça os planos do Pontim para estimativas ágeis. Plano gratuito disponível com funcionalidades básicas. Planos premium para equipes maiores.",
  keywords: [
    ...keywords,
    "planning poker",
    "scrum poker",
    "preços pontim",
    "planos scrum poker",
    "assinatura planning poker",
    "preço estimativas ágeis",
  ],
  openGraph: openGraph,
  alternates: {
    canonical: `${env.SITE_URL}/pricing`,
  },
};

export default async function PricingPage() {
  const pricings = await getPlanPricings();

  if (!pricings) redirect("/");

  return (
    <div className="pt-[84px] max-w-screen-lg mx-auto px-4 h-full">
      <div className="relative flex justify-center items-center w-full scale-90">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        <PricingSection
          title="Escolha o Plano Perfeito para Sua Equipe"
          subtitle="Desbloqueie o poder das estimativas ágeis com o Pontim. Selecione o plano que melhor atende às necessidades da sua equipe."
          pricings={pricings}
        />
      </div>
    </div>
  );
}
