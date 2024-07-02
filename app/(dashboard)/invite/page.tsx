import { LoadingLogo } from "@/components/loading-logo/loading";
import { handleInvite } from "@/use-cases/invite/handle-invite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Convite Especial",
  description: "Você foi convidado para participar de uma sala do pontim 🎉.",
};

async function InvitePage({
  searchParams,
}: {
  searchParams: { code: string };
}) {
  await handleInvite(searchParams.code);

  return <LoadingLogo />;
}

export default InvitePage;
