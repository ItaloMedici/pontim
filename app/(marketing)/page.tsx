import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Footer } from "./_components/footer";
import { HowItWorks } from "./_components/how-it-works";

const MarketingPage = () => {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <HowItWorks />
      </main>

      <Footer />
    </>
  );
};

export default MarketingPage;
