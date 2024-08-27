import { UserButton } from "@/components/user-button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export function NavBar() {
  return (
    <>
      <div
        className="absolute left-1/2 transform -translate-x-1/2 w-7/12 h-4 bg-sky-400 rounded-full backdrop-filter blur-3xl z-0"
        aria-hidden
      />
      <nav className="fixed top-0 left-0 right-0 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md">
        <div className="max-w-screen-lg flex items-center justify-between mx-auto py-2 px-6 z-10">
          <Link href={"/"} className="flex gap-2">
            <Image src={"/logo.svg"} width={25} height={25} alt="Pontim Logo" />
            <span
              className={cn(
                "hidden sm:block font-bold text-lg",
                poppins.className,
              )}
            >
              Pontim
            </span>
          </Link>
          <UserButton />
        </div>
      </nav>
    </>
  );
}
