"use client";

import { signOut } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    signOut({
      redirect: true,
      callbackUrl,
    });
  });

  return null;
};

export default LogoutPage;
