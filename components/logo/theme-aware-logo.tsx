"use client";

import { useTheme } from "next-themes";
import { Logo } from "./index";

type ThemeAwareLogoProps = {
  size?: "sm" | "md" | "lg";
  color?: "white" | "black";
};

export const ThemeAwareLogoText = ({
  size = "md",
  color,
}: ThemeAwareLogoProps) => {
  const { theme } = useTheme();

  const effectiveColor = color || (theme === "dark" ? "white" : "black");

  return <Logo.Text size={size} color={effectiveColor} />;
};

export const ThemeAwareLogoIcon = ({
  size = "md",
  color,
}: ThemeAwareLogoProps) => {
  const { theme } = useTheme();

  const effectiveColor = color || (theme === "dark" ? "white" : "black");

  console.log({ theme, effectiveColor });

  return <Logo.Icon size={size} color={effectiveColor} />;
};

export const ThemeAwareLogo = {
  Text: ThemeAwareLogoText,
  Icon: ThemeAwareLogoIcon,
};
