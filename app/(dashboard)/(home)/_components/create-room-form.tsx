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
import { useAction } from "@/hooks/use-action";
import { CreateRoom, createRoomSchema } from "@/lib/schemas/create-room";
import { createRoom } from "@/use-cases/room";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function CreateRoomForm() {
  const router = useRouter();
  const { data } = useSession();
  const { mutation, isPending } = useAction(createRoom);

  const form = useForm<CreateRoom>({
    resolver: zodResolver(createRoomSchema),
    defaultValues: {
      name: "",
      onwer: data?.user?.email,
    },
  });

  const onSubmit = async (roomData: CreateRoom) => {
    if (!data?.user) return router.push("/login");

    mutation({
      user: data?.user,
      name: roomData.name,
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
