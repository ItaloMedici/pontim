import { toast } from "sonner";

const isServer = typeof window === "undefined";

const createHttpHandler = async <T,>(fn: () => Promise<Response>) => {
  const result = await fn();

  if (result.ok) {
    return result.json() as T;
  }

  const error = await result.json();

  if (isServer || process.env.NODE_ENV === "development") {
    console.error(error);
  }

  const message = "Algo deu errado 😥";
  toast.error(message);

  return null;
};

const get = <T,>(url: string) =>
  createHttpHandler<T>(async () => {
    return await fetch(`/api/${url}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  });

const post = <T,>(url: string, body: any) =>
  createHttpHandler<T>(async () => {
    return await fetch(`/api/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  });

export const http = {
  get,
  post,
};
