import { PricingSection } from "@/components/pricing";
import { Pricing } from "@/lib/schemas/pricings";
import { getTranslations } from "next-intl/server";

export const Pricings = async ({ pricings }: { pricings: Pricing[] }) => {
  const t = await getTranslations("marketing.homepage.pricing");
  return (
    <section>
      <div className="relative flex justify-center items-center w-full scale-90">
        <div className="absolute inset-0 -z-10">
          <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:35px_35px] opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        </div>
        <PricingSection
          title={t("title")}
          subtitle={t("subtitle")}
          pricings={pricings}
        />
      </div>
    </section>
  );
};
