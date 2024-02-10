import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const poppins = Poppins({ subsets: ["latin"], weight: ["600"] });

export function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 px-6 py-4 flex items-center justify-between">
      <Link href={"/"} className="flex gap-2">
        <Image src={"/logo.svg"} width={25} height={25} alt="Pontim Logo" />
        <span
          className={cn("hidden sm:block font-bold text-lg", poppins.className)}
        >
          Pontim
        </span>
      </Link>
      <UserButton />
    </nav>
  );
}
