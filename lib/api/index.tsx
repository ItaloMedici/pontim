import { toast } from "@/components/toast";

const isServer = typeof window === "undefined";

const createHttpHandler = async <T,>(fn: () => Promise<Response>) => {
  const result = await fn();

  if (result.ok) {
    return result.json() as T;
  }

  const error = result?.statusText ?? (await result.json());

  if (isServer || process.env.NODE_ENV === "development") {
    console.error(error);
  }

  toast.error();

  return null;
};

const get = <T,>(url: string) =>
  createHttpHandler<T>(async () => {
    return await fetch(`/api/${url}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  });

const post = <T,>(url: string, body?: any) =>
  createHttpHandler<T>(async () => {
    return await fetch(`/api/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });
  });

const put = <T,>(url: string, body?: any) =>
  createHttpHandler<T>(async () => {
    return await fetch(`/api/${url}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });
  });

const _delete = <T,>(url: string, body?: any) => {
  return createHttpHandler<T>(async () => {
    return await fetch(`/api/${url}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : null,
    });
  });
};

export const http = {
  get,
  post,
  put,
  delete: _delete,
};

export const fetcher = (input: RequestInfo | URL, init?: RequestInit) =>
  fetch(input, init).then((res) => res.json());
