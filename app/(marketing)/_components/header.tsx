"use client";

import { Logo } from "@/components/logo";
import { buttonVariants } from "@/components/ui/button";
import { useUser } from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Header = () => {
  const [userScroll, setUserScroll] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setUserScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 py-2 bg-background/60 backdrop-blur transition-all",
        {
          "pt-4": !userScroll,
        },
      )}
    >
      <div className="flex justify-between items-center container">
        <Link href={"/"}>
          <Logo.Text color="black" />
        </Link>

        <div className="gap-2 flex">
          {user ? (
            <Link className={cn(buttonVariants())} href={"/home"}>
              Entrar
            </Link>
          ) : (
            <>
              <Link
                className={cn(buttonVariants({ variant: "outline" }))}
                href={"/login"}
              >
                Entrar
              </Link>

              <Link className={cn(buttonVariants())} href={"/login"}>
                Cadastre-se
              </Link>
            </>
          )}
        </div>
      </div>
      {userScroll && (
        <hr className="absolute w-full bottom-0 transition-opacity duration-300 ease-in-out opacity-100" />
      )}
    </header>
  );
};
