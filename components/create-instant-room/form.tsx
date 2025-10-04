"use client";

import { useTemporaryRoomContext } from "@/app/(marketing)/_components/temporary-room-context";
import { toast } from "@/components/toast";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAction } from "@/hooks/use-action";
import { DefaultDecks } from "@/lib/consts";
import {
  CreateInstantRoom,
  createInstantRoomSchema,
} from "@/lib/schemas/create-instant-room";
import { cn } from "@/lib/utils";
import { createInstantRoom } from "@/use-cases/room/temporary-room";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function CreateInstantRoomForm() {
  const t = useTranslations();
  const router = useRouter();
  const { decks } = useTemporaryRoomContext();

  const [showCustomDeskInfo, setShowCustomDeskInfo] = useState(false);

  const { mutation, isPending } = useAction(createInstantRoom);

  const form = useForm<CreateInstantRoom>({
    resolver: zodResolver(createInstantRoomSchema(t)),
    defaultValues: {
      name: "",
      ownername: "",
      deckOption: decks[0].value,
    },
  });

  const onSubmit = async (roomData: CreateInstantRoom) => {
    if (roomData.deckOption === DefaultDecks.CUSTOM) {
      router.push("/login");
      return;
    }

    mutation({
      name: roomData.name,
      userName: roomData.ownername,
      deckId: roomData.deckOption,
    })
      .then((room) => {
        toast.success(t("components.createInstantRoom.form.toast.success"), {
          icon: "🥳",
        });
        router.push(`/room/${room.id}`);
      })
      .catch(() => {
        toast.error(t("components.createInstantRoom.form.toast.error"), {
          icon: "😢",
        });
      });
  };

  const onDeckChange = (value: string) => {
    const isCustomDeck = value === DefaultDecks.CUSTOM;

    setShowCustomDeskInfo(isCustomDeck);

    if (isCustomDeck) return;

    form.setValue("deckOption", value);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="ownername"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.createInstantRoom.form.ownerName.label")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "components.createInstantRoom.form.ownerName.placeholder",
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.createInstantRoom.form.roomName.label")}
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t(
                    "components.createInstantRoom.form.roomName.placeholder",
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deckOption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("components.createInstantRoom.form.deckOption.label")}
              </FormLabel>
              <FormControl>
                <Select onValueChange={onDeckChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={t(
                          "components.createInstantRoom.form.deckOption.placeholder",
                        )}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {decks.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {showCustomDeskInfo ? (
          <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-muted-foreground/30 rounded-lg">
            <div className="text-center space-y-4 max-w-md">
              <h3 className="text-md font-semibold text-foreground">
                {t("components.createInstantRoom.form.customDeckInfo.title")}
              </h3>
              <p className="text-sm leading-relaxed">
                {t("components.createInstantRoom.form.customDeckInfo.message")}
              </p>
              <Link
                href={"/login"}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                {t("components.createInstantRoom.form.customDeckInfo.button")}
              </Link>
            </div>
          </div>
        ) : null}
        <Button
          type="submit"
          className="float-end"
          size={"lg"}
          disabled={isPending || showCustomDeskInfo}
        >
          {t("components.createInstantRoom.form.submitButton")}
        </Button>
      </form>
    </Form>
  );
}
