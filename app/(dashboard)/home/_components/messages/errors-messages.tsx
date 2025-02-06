"use client";

import { toast } from "@/components/toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export const ErrorsMessages = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (typeof error === "string") {
      toast.error(error);
    }
  }, [error]);

  return null;
};
