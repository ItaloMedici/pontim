import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "./_components/login-form";

export const metadata = {
  title: "Login",
  description: "Faça login na sua conta",
};

async function LoginPage() {
  const session = await getServerSession();

  if (session?.user) {
    redirect("/");
  }

  return (
    <main className="bg-gray-50 dark:bg-gray-900 h-screen w-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 m-auto h-full lg:py-0">
        <div className="w-full bg-white rounded-xl border-sky-600 border-2 shadow-sm dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 sm:p-8 flex flex-col ">
            <Image
              src="/logo.svg"
              alt="logo"
              width={24}
              height={24}
              className="mb-8"
            />
            <h1 className="text-lg font-medium leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-2">
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
