import {
  ExternalToast,
  Toaster as ToasterSonner,
  toast as toastSonner,
} from "sonner";

export const Toaster = () => {
  return <ToasterSonner />;
};

interface ToastOptions extends ExternalToast {}

const basicToast = (message: string, options?: ToastOptions) => {
  toastSonner(message, options);
};

const success = (message: string, options?: ToastOptions) => {
  toastSonner.success(message, {
    ...options,
    icon: options?.icon ?? "🎉",
  });
};

const randomErrorMessages = [
  "Ops, algo deu errado",
  "Puts, de novo?",
  "Vish, algo deu errado",
  "Vacilamos nessa, tenta de novo",
  "Deu ruim, algo deu errado",
];

const error = (message?: string, options?: ToastOptions) => {
  const errorMessage =
    message ??
    randomErrorMessages[Math.floor(Math.random() * randomErrorMessages.length)];

  toastSonner.error(errorMessage, {
    ...options,
    icon: options?.icon ?? "🚨",
  });
};

export const toast = Object.assign(basicToast, { success, error });
