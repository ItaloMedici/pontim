"use client";

import { LoadingLogo } from "@/components/loading-logo/loading";
import { Suspense } from "react";

const LogoutLayout = ({ children }) => {
  return <Suspense fallback={<LoadingLogo />}>{children}</Suspense>;
};

export default LogoutLayout;
