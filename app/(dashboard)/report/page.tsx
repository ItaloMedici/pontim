import ReportForm from "./report-form";

export default function ReportPage() {
  return (
    <div className="container mx-auto py-10 max-w-screen-md">
      <h1 className="text-2xl font-bold mb-6">Enviar um Report</h1>
      <ReportForm />
    </div>
  );
}
