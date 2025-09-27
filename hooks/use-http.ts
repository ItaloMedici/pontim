import { toast } from "@/components/toast";
import { useCallback, useEffect, useRef } from "react";

type Methods = "GET" | "POST" | "PUT" | "DELETE";

type FetchCallback = {
  url: string;
  payload?: object;
  method?: Methods;
};

type Options = {
  baseUrl: string;
};

export const useHttp = (options?: Options) => {
  const aborts = useRef(new Map<string, AbortController>());
  const isMounted = useRef(true);
  const optionsRef = useRef<Options | undefined>(options);

  useEffect(() => {
    const _aborts = aborts.current;
    return () => {
      _aborts.forEach((abortController) => {
        abortController.abort();
      });
      _aborts.clear();
      isMounted.current = false;
    };
  }, []);

  const fetchData = useCallback(
    async <T>({ method, payload, url }: FetchCallback) => {
      try {
        let abortController = aborts.current.get(url);

        if (abortController) {
          abortController.abort();
        }

        abortController = new AbortController();

        aborts.current.set(url, abortController);

        const body = payload ? JSON.stringify(payload) : undefined;

        let _method = method;

        if (!_method) {
          _method = body ? "POST" : "GET";
        }

        const fetchOptions: RequestInit = {
          signal: abortController.signal,
          body,
          method: _method,
          headers: {
            "Content-Type": "application/json",
          },
        };

        const baseUrl = optionsRef.current?.baseUrl ?? "";

        const _url = `${baseUrl}/${url}`.replace("//", "/");

        const response = await fetch(_url, fetchOptions);

        if (!isMounted.current) return;

        if (!response.ok) {
          toast.error("Erro na requisição");
          return;
        }

        const data = (await response.json()) as T;
        return data;
      } catch (error: unknown) {
        if (!isMounted.current) return;

        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        if (error && typeof error === "object" && "message" in error) {
          const errorMessage = (error as Error).message;
          toast.error(errorMessage);
        }

        if (typeof error === "string") {
          toast.error(error);
        }
      }
    },
    [],
  );

  const get = useCallback(
    async <T>(url: string) => {
      return await fetchData<T>({ method: "GET", url });
    },
    [fetchData],
  );

  const put = useCallback(
    <T>(url: string, body?: object) => {
      return fetchData<T>({
        url,
        payload: body,
        method: "PUT",
      });
    },
    [fetchData],
  );

  const post = useCallback(
    <T>(url: string, body?: object) => {
      return fetchData<T>({
        url,
        payload: body,
        method: "POST",
      });
    },
    [fetchData],
  );

  return { get, post, put };
};
