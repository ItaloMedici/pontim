import { Player } from "@/lib/schemas/player";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function buildPlayerFallbackImage(player: Player) {
  return player.nickname
    .toUpperCase()
    .split(" ")
    .map((name) => name[0])
    .slice(0, 2)
    .join("");
}
