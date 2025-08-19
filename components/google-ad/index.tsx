"use client";

import { env } from "@/env";
import { useEffect, useRef } from "react";

interface GoogleAdProps {
  adSlot: string;
  className?: string;
  style?: React.CSSProperties;
  format?: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export const GoogleAd = ({
  adSlot,
  className = "",
  style = {},
  format = "auto",
}: GoogleAdProps) => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (error) {
      console.error("Erro ao carregar anúncio:", error);
    }
  }, []);

  return (
    <div ref={adRef} className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={adSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
