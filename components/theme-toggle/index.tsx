"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FEATURE_FLAGS } from "@/lib/consts";
import { cn } from "@/lib/utils";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({
  variant = "ghost",
  size = "default",
  className,
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!FEATURE_FLAGS.ENABLE_THEME_SWITCHER) {
    return null;
  }

  if (!mounted) {
    return (
      <Button
        variant={variant}
        size={size}
        className={cn("relative", className)}
        disabled
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        {showLabel && <span className="ml-2">Theme</span>}
      </Button>
    );
  }

  const getThemeIcon = (themeName: string) => {
    const map = {
      light: <Sun className="h-[1.2rem] w-[1.2rem]" />,
      dark: <Moon className="h-[1.2rem] w-[1.2rem]" />,
      system: <Laptop className="h-[1.2rem] w-[1.2rem]" />,
    };

    return map[themeName] || map.system;
  };

  const getThemeLabel = (themeName: string) => {
    const map = {
      light: "Light",
      dark: "Dark",
      system: "System",
    };

    return map[themeName] || map.system;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={cn("relative", className)}
        >
          {getThemeIcon(theme || "system")}
          {showLabel && (
            <span className="ml-2">{getThemeLabel(theme || "system")}</span>
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px] z-[100]">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn("cursor-pointer", {
            "bg-accent": theme === "light",
          })}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn("cursor-pointer", {
            "bg-accent": theme === "dark",
          })}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn("cursor-pointer", {
            "bg-accent": theme === "system",
          })}
        >
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
