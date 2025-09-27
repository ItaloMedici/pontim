"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { sendReport } from "./actions";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export default function ReportForm() {
  const t = useTranslations();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, { message: t("dashboard.report.form.name.error") }),
    email: z
      .string()
      .email({ message: t("dashboard.report.form.email.error") }),
    type: z.enum(["BUG", "FEEDBACK", "FEATURE"], {
      required_error: t("dashboard.report.form.type.error"),
    }),
    message: z
      .string()
      .min(10, { message: t("dashboard.report.form.message.error") }),
    attachment: z
      .instanceof(File)
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        t("dashboard.report.form.attachment.error"),
      )
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      type: undefined,
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value instanceof File ? value : String(value));
      });

      await sendReport(formData);

      toast.success(t("dashboard.report.form.success.title"), {
        description: t("dashboard.report.form.success.description"),
        icon: "🙏",
      });
      form.reset();
    } catch (error) {
      toast.error(t("dashboard.report.form.error.title"), {
        description:
          error instanceof Error
            ? error.message
            : t("dashboard.report.form.error.description"),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.report.form.name.label")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("dashboard.report.form.name.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.report.form.email.label")}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={t("dashboard.report.form.email.placeholder")}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.report.form.type.label")}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={t("dashboard.report.form.type.placeholder")}
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BUG">
                    {t("dashboard.report.form.type.options.bug")}
                  </SelectItem>
                  <SelectItem value="FEEDBACK">
                    {t("dashboard.report.form.type.options.feedback")}
                  </SelectItem>
                  <SelectItem value="FEATURE">
                    {t("dashboard.report.form.type.options.feature")}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dashboard.report.form.message.label")}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("dashboard.report.form.message.placeholder")}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attachment"
          render={({ field: { onChange, ...field } }) => (
            <FormItem>
              <FormLabel>
                {t("dashboard.report.form.attachment.label")}
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  name={field.name}
                  ref={field.ref}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                {t("dashboard.report.form.attachment.description")}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("dashboard.report.form.submit.submitting")}
            </>
          ) : (
            t("dashboard.report.form.submit.idle")
          )}
        </Button>
      </form>
    </Form>
  );
}
