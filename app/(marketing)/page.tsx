import { Logo } from "@/components/logo";
import { PricingSection } from "@/components/pricing";
import { getPlanPricings } from "@/use-cases/plan/get-pricings";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";

const MarketingPage = async () => {
  const pricings = await getPlanPricings();

  return (
    <>
      <Header />

      <main>
        <Hero />

        <section>
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
        </section>
      </main>
      <footer className="mt-32 w-full h-64 bg-gray-950 p-4 flex items-start">
        <div className="container mx-auto">
          <Logo.Text color="white" />
        </div>
      </footer>
    </>
  );
};

export default MarketingPage;
