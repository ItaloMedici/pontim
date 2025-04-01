import { Player } from "@/types/player";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildPlayerFallbackImage(player: Player) {
  if (!player.nickname) return "";

  return player.nickname
    .toUpperCase()
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("");
}
