import { Logo } from "@/components/logo";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";

const MarketingPage = () => {
  return (
    <>
      <Header />

      <main>
        <Hero />
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
