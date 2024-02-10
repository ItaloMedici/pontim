import { ConvexClientProvider } from "@/providers/convex-client-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pontim",
  description: "Pontue seus cards de forma divertida e rápida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>
          <Toaster />
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
