import { getPlanPricings } from "@/use-cases/plan/get-pricings";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { Pricings } from "./_components/pricings";

export const dynamic = "force-dynamic";

const MarketingPage = async () => {
  const pricings = await getPlanPricings();

  return (
    <>
      <Hero />
      <HowItWorks />
      <Pricings pricings={pricings} />
    </>
  );
};

export default MarketingPage;
