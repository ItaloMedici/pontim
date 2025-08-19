"use client";

import { AdBlockerFallback } from "@/components/ad-blocker-fallback";
import { GoogleAd } from "@/components/google-ad";
import { useAdBlockerDetection } from "@/hooks/use-ad-blocker-detection";
import { useUser } from "@/hooks/use-user";
import { Plans } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

const LEFT_BANNER_AD_SLOT = "4681337846";
const RIGHT_BANNER_AD_SLOT = "2306043568";

const AdBlockWrapper = ({
  children,
  pos,
}: {
  children: React.ReactNode;
  pos: "left" | "right";
}) => {
  const { isAdBlockerActive, isLoading } = useAdBlockerDetection();
  const { user } = useUser();

  if (isLoading) {
    return null;
  }

  if (user?.planName !== Plans.Free) {
    return null;
  }

  return (
    <div
      className={cn("absolute w-[150px] h-[600px] overflow-hidden", {
        "right-5 top-1/2 -translate-y-1/2 ": pos === "right",
        "left-5 top-1/2 -translate-y-1/2 ": pos === "left",
      })}
    >
      {isAdBlockerActive ? <AdBlockerFallback /> : children}
    </div>
  );
};

export const BoardAds = () => {
  return createPortal(
    <>
      <AdBlockWrapper pos="left">
        <GoogleAd
          adSlot={LEFT_BANNER_AD_SLOT}
          className="w-full h-full"
          style={{ width: "150px", height: "600px" }}
        />
      </AdBlockWrapper>

      <AdBlockWrapper pos="right">
        <GoogleAd
          adSlot={RIGHT_BANNER_AD_SLOT}
          className="w-full h-full"
          style={{ width: "150px", height: "600px" }}
        />
      </AdBlockWrapper>
    </>,
    document.body,
  );
};
