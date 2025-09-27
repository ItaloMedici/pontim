import { getTranslations } from "next-intl/server";
import ReportForm from "./report-form";

export default async function ReportPage() {
  const t = await getTranslations();

  return (
    <div className="container mx-auto py-10 max-w-screen-md">
      <h1 className="text-2xl font-bold mb-6">{t("dashboard.report.title")}</h1>
      <ReportForm />
    </div>
  );
}
