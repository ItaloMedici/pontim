import { Logo } from "@/components/logo";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/login-form";

export const metadata = {
  title: "Login",
  description: "Faça login na sua conta",
};

async function LoginPage() {
  const t = await getTranslations("auth.login");
  const session = await getServerSession();

  if (session?.user) {
    redirect("/home");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-muted/40">
      <div className="flex flex-col items-center justify-center px-6 py-8 m-auto h-full min-h-screen lg:py-0">
        <div className="w-full bg-card rounded-2xl border-border border shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 flex flex-col">
            <Logo.Text size="sm" />
            <h1 className="text-lg font-medium leading-tight tracking-tight text-foreground md:text-2xl mb-2 mt-8">
              {t("welcome")}
            </h1>
            <span className="text-sm text-muted-foreground mb-8">
              {t("subtitle")}
            </span>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
