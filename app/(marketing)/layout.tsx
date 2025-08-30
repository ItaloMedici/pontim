import { ReactNode } from "react";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { organizationSchema } from "@/lib/seo";

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema]),
        }}
      />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
