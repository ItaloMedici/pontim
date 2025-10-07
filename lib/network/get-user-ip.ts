import { headers } from "next/headers";

export function getUserIp() {
  const forwardedFor = headers().get("x-forwarded-for");

  if (typeof forwardedFor === "string") {
    return forwardedFor.split(",")[0].trim();
  }

  return headers().get("remote-addr");
}
