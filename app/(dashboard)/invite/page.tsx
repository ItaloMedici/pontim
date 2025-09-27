import { LoadingLogo } from "@/components/loading-logo/loading";
import { handleInvite } from "@/use-cases/invite/handle-invite";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t("dashboard.invite.title"),
    description: t("dashboard.invite.description"),
  };
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
