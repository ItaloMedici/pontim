import { Logo } from "@/components/logo";
import { UserButton } from "@/components/user-button";
import { Poppins } from "next/font/google";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export function NavBar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md border-b">
        <div className="max-w-screen-lg flex items-center justify-between mx-auto py-2 px-6 z-10">
          <Link href={"/"} className="flex gap-2">
            <Logo.Text color="black" size="sm" />
          </Link>
          <UserButton />
        </div>
      </nav>
    </>
  );
}
