import { getPlanPricings } from "@/use-cases/plan/get-pricings";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { HowItWorks } from "./_components/how-it-works";
import { Pricings } from "./_components/pricings";

export const dynamic = "force-dynamic";

const MarketingPage = async () => {
  const pricings = await getPlanPricings();

  return (
    <>
      <Header />

      <main>
        <Hero />
        <HowItWorks />
        <Pricings pricings={pricings} />
      </main>

      <Footer />
    </>
  );
};

export default MarketingPage;
