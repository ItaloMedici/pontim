import { Logo } from "@/components/logo";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/login-form";

export const metadata = {
  title: "Login",
  description: "Faça login na sua conta",
};

async function LoginPage() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/home");
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-900 h-screen w-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 m-auto h-full lg:py-0">
        <div className="w-full bg-white rounded-2xl border-gray-950 border-2 shadow-sm dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 flex flex-col">
            <Logo.Text size="sm" />
            <h1 className="text-lg font-medium leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2 mt-8">
              Olá, bom ver você por aqui! 👋
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400 mb-8">
              Faça login com sua conta para continuar
            </span>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
