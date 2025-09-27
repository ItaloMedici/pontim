import { DefineUserLocale } from "@/components/define-user-locale";
import { env } from "@/env";
import { getCookieLocale, getLocaleOrDefault, htmlLang } from "@/i18n/utils";
import {
  getBaseMetadata,
  getFaqSchema,
  getOrganizationSchema,
  getSoftwareApplicationSchema,
} from "@/lib/seo";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const locale = getLocaleOrDefault();
  const t = await getTranslations({ locale, namespace: "" });

  const baseMetadata = getBaseMetadata(t, locale);

  return {
    ...baseMetadata,
    title: {
      template: "%s | Pontim",
      default: t("seo.site.title"),
    },
    description: t("seo.site.description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const hasDefinedLocale = typeof getCookieLocale() === "string";
  const locale = getLocaleOrDefault();

  const t = await getTranslations({ locale, namespace: "" });

  return (
    <html lang={htmlLang()}>
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
            __html: JSON.stringify(getOrganizationSchema(t)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSoftwareApplicationSchema(t, locale)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getFaqSchema(t)),
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
