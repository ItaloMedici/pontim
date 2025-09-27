import { DefineUserLocale } from "@/components/define-user-locale";
import { env } from "@/env";
import {
  baseMetadata,
  faqSchema,
  organizationSchema,
  softwareApplicationSchema,
} from "@/lib/seo";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  ...baseMetadata,
  title: {
    template: "%s | Pontim",
    default: "Pontim - Plataforma de Scrum Poker para Estimativas Ágeis",
  },
  description:
    "Pontim é a plataforma open-source de Scrum Poker para estimativas ágeis em tempo real. Crie salas, vote com Fibonacci e melhore suas estimativas de story points.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasDefinedLocale = typeof cookies().get("locale")?.value === "string";

  return (
    <html lang="pt-BR">
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}`}
          crossOrigin="anonymous"
        ></script>
        <meta
          name="google-adsense-account"
          content={env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        ></meta>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareApplicationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      </head>
      <body className={inter.className}>
        {!hasDefinedLocale && <DefineUserLocale />}
        <NextIntlClientProvider>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics gaId={env.GA_ID} />
    </html>
  );
}
