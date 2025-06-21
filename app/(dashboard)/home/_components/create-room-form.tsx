"use client";

import { toast } from "@/components/toast";
import { Button } from "@/components/ui/button";
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
import { CreateRoom, createRoomSchema } from "@/lib/schemas/create-room";
import { ChoiceSelectOptions } from "@/types/choice-options";
import { createRoom } from "@/use-cases/room";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateDeckForm } from "./create-deck-form";

type CreateRoomForm = {
  decks: ChoiceSelectOptions[];
};

export function CreateRoomForm({ decks }: CreateRoomForm) {
  const router = useRouter();
  const { data } = useSession();
  const { mutation, isPending } = useAction(createRoom);
  const [showCustomDeckForm, setShowCustomDeckForm] = useState(false);

  const form = useForm<CreateRoom>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      onwer: data?.user?.email,
      deckOption: decks[0].value,
      deckname: "",
      values: "1,2,3,4,5",
    },
  });

  const onSubmit = async (roomData: CreateRoom) => {
    if (!data?.user) return router.push("/login");

    const customDeck =
      roomData.deckOption === DefaultDecks.CUSTOM
        ? {
            name: roomData.deckname,
            values: roomData.values,
          }
        : undefined;

    mutation({
      user: data?.user,
      name: roomData.name,
      deckId: roomData.deckOption,
      customDeck,
    })
      .then((room) => {
        toast.success("Sala criada com sucesso!", {
          icon: "🥳",
        });
        router.push(`/room/${room.id}`);
      })
      .catch(() => {
        toast.error("Algo deu errado ao criar a sala", {
          icon: "😢",
        });
      });
  };

  const onDeckChange = (value: string) => {
    form.setValue("deckOption", value);

    setShowCustomDeckForm(value === DefaultDecks.CUSTOM);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da sala</FormLabel>
              <FormControl>
                <Input placeholder="Um nome legal" {...field} />
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
              <FormLabel>Escolha seu deck</FormLabel>
              <FormControl>
                <Select onValueChange={onDeckChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um tipo de deck" />
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
        {showCustomDeckForm ? <CreateDeckForm /> : null}
        <Button
          type="submit"
          className="float-end"
          size={"lg"}
          disabled={isPending}
        >
          Criar sala
        </Button>
      </form>
    </Form>
  );
}
