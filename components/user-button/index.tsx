"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUser } from "@/hooks/use-user";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export const UserButton = () => {
  const { user } = useUser();

  if (!user) return null;

  const fallback = () =>
    user.name
      .split(" ")
      .map((name) => name[0])
      .join("");

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <Avatar className="outline outline-2 mt-[6px] outline-offset-2 outline-sky-500">
            <AvatarImage src={user.image} />
            <AvatarFallback>{fallback()}</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent align="end" sideOffset={10}>
          <div className="p-2">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={user.image} />
                <AvatarFallback>{fallback()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-sm font-medium">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
            <div className="mt-6">
              <Button variant="outline" size={"sm"} onClick={() => signOut()}>
                <LogOutIcon className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
