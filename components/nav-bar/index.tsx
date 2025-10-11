import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserButton } from "@/components/user-button";
import Link from "next/link";

export function NavBar() {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/30 dark:bg-slate-900/30 backdrop-blur-md border-b">
        <div className="max-w-screen-lg flex items-center justify-between mx-auto py-2 px-6 z-10">
          <Link href={"/?from=home"} className="flex gap-2">
            <span className="dark:hidden">
              <Logo.Text color="black" size="sm" />
            </span>
            <span className="hidden dark:block">
              <Logo.Text color="white" size="sm" />
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle variant="ghost" size="icon" />
            <UserButton />
          </div>
        </div>
      </nav>
    </>
  );
}
