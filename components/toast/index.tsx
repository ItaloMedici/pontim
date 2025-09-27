import {
  ExternalToast,
  Toaster as ToasterSonner,
  toast as toastSonner,
} from "sonner";

export const Toaster = () => {
  return <ToasterSonner />;
};

type ToastOptions = ExternalToast;

const basicToast = (message: string, options?: ToastOptions) => {
  toastSonner(message, options);
};

const success = (message: string, options?: ToastOptions) => {
  toastSonner.success(message, {
    ...options,
    icon: options?.icon ?? "🎉",
  });
};

const error = (message?: string, options?: ToastOptions) => {
  const errorMessage = message ?? "Algo deu errado";

  toastSonner.error(errorMessage, {
    ...options,
    icon: options?.icon ?? "🚨",
  });
};

export const toast = Object.assign(basicToast, { success, error });
