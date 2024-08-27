"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { updateNickname } from "@/use-cases/player/update-nickname";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type NicknameDialogFormProps = {
  roomId: string;
};

export const NicknameDialogForm = ({ roomId }: NicknameDialogFormProps) => {
  const [dialogOpen, setDialogOpen] = useState(true);
  const { mutation, isPending } = useAction(updateNickname);

  const form = useForm({
    resolver: zodResolver(
      z.object({
        nickname: z
          .string()
          .max(10, "Muito grande ✋")
          .min(1, "Vamo lá, pode ser um basiquinho mesmo 😅"),
      }),
    ),
    defaultValues: {
      nickname: "",
    },
  });

  const onSubmit = async ({ nickname }: { nickname: string }) => {
    mutation({
      nickname,
      roomId,
    })
      .then(() => {
        setDialogOpen(false);
        toast.success(`Bem vindo a bordo ${nickname}`);
      })
      .catch(() => {
        toast.error("Algo deu errado ao criar o apelido", {
          icon: "😢",
        });
      });
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ei, você! 🫵</DialogTitle>
          <DialogDescription>
            Vamos definir um nome bacana antes de entrar na sala!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apelido</FormLabel>
                  <FormControl>
                    <Input placeholder="Meu apelido é..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Entrar na sala</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
