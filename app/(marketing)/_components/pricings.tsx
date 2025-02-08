import { PricingSection } from "@/components/pricing";
import { Pricing } from "@/lib/schemas/pricings";

export const Pricings = ({ pricings }: { pricings: Pricing[] }) => {
  return (
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
  );
};
