"use server";

import { resend } from "@/lib/resend";

const getReportTypeEmoji = (type: string) => {
  switch (type) {
    case "BUG":
      return "🐞";
    case "FEEDBACK":
      return "💬";
    case "FEATURE":
      return "✨";
    default:
      return "";
  }
};

export async function sendReport(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const type = formData.get("type") as string;
  const message = formData.get("message") as string;
  const attachment = formData.get("attachment") as File | null;

  const emoji = getReportTypeEmoji(type);
  const typeTranslation = {
    BUG: "Bug",
    FEEDBACK: "Feedback",
    FEATURE: "Sugestão de Funcionalidade",
  }[type] as string;

  const emailContent = `
Um novo relatório de ${typeTranslation.toLowerCase()} foi enviado:

Nome: ${name}
E-mail: ${email}
Tipo: ${emoji} ${typeTranslation}

Mensagem:
${message}
  `;

  const emailOptions: any = {
    from: "Pontim Report <reports@pontim.org>",
    to: "contact@pontim.org",
    reply_to: email,
    subject: `Novo ${typeTranslation} ${emoji} de ${name}`,
    text: emailContent,
  };

  if (attachment && attachment.size > 0) {
    const buffer = Buffer.from(await attachment.arrayBuffer());
    emailOptions.attachments = [
      {
        filename: attachment.name,
        content: buffer,
      },
    ];
  }

  try {
    await resend.emails.send(emailOptions);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    throw new Error(
      "Falha ao enviar o relatório. Por favor, tente novamente mais tarde.",
    );
  }
}
