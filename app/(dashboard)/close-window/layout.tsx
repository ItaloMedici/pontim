import { Suspense } from "react";

export default function CloseWindowLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
