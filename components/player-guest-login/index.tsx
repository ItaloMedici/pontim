"use client";

import { ThemeAwareLogo } from "@/components/logo/theme-aware-logo";
import { useAction } from "@/hooks/use-action";
import { createGuestUserAndSignIn } from "@/use-cases/guest/create-guest";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../toast";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const guestSchema = (
  t: (key: string, values?: Record<string, string>) => string,
) =>
  z.object({
    name: z
      .string()
      .min(
        1,
        t("shared.validations.fieldIsRequired", { field: t("shared.name") }),
      ),
  });

export const PlayerGuestLogin = ({ roomName }: { roomName: string }) => {
  const t = useTranslations();
  const router = useRouter();
  const { mutation, isPending } = useAction(createGuestUserAndSignIn);

  const form = useForm({
    resolver: zodResolver(guestSchema(t)),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = ({ name }: { name: string }) => {
    mutation({ userName: name })
      .then(() => {
        router.refresh();
      })
      .catch(() => {
        toast.error(t("shared.errors.tryAgain"));
      });
  };

  return (
    <div className="bg-background h-screen w-screen">
      <header className="px-6 py-4 md:px-8 md:py-6">
        <div className="flex items-center">
          <ThemeAwareLogo.Text />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          {/* Hero Text */}
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance text-foreground">
              {t("components.playerGuestLogin.title", {
                roomName,
              })}
            </h2>
            <p className="text-md text-muted-foreground text-pretty leading-relaxed">
              {t("components.playerGuestLogin.description")}
            </p>
          </div>

          {/* Form Card */}
          <Card className="p-4 shadow-sm border-border/50 rounded-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("components.playerGuestLogin.nameLabel")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-11 px-4 py-3"
                          placeholder={t(
                            "components.playerGuestLogin.namePlaceholder",
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size={"lg"}
                  className="w-full"
                  disabled={isPending}
                >
                  {t("components.playerGuestLogin.submitButton")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </main>
    </div>
  );
};
