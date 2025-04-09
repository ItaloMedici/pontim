import { EventAction, EventEnvelope } from "@/lib/consts";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  roomId: string;
  handlers: Partial<Record<EventAction, (data: any, from: string) => void>>;
  onBeforeSubscribe: () => Promise<unknown>;
  onUnsubscribe: () => Promise<unknown>;
};

export function useBoardEvents(props: Props) {
  const eventSource = useRef<EventSource | null>(null);
  const isInitialized = useRef(false);
  const propsRef = useRef(props);
  const [isLoading, setIsLoading] = useState(true);
  const firstLoadAttempt = useRef(true);

  useEffect(() => {
    propsRef.current = props;
  }, [props]);

  const establishConnection = useCallback(async () => {
    if (eventSource.current) return;
    if (isInitialized.current) return;

    await propsRef.current.onBeforeSubscribe();

    isInitialized.current = true;

    const url = `/api/${propsRef.current.roomId}/board/events`;

    eventSource.current = new EventSource(url);

    eventSource.current.onmessage = (event: MessageEvent) => {
      if (firstLoadAttempt.current) {
        setIsLoading(false);
        firstLoadAttempt.current = false;
      }

      const data = JSON.parse(event.data) as EventEnvelope;

      const action = data.action as EventAction;
      const eventData = data.data.length ? JSON.parse(data.data) : "";

      console.log("Event received", action, eventData);

      propsRef.current.handlers[action]?.(eventData, data.from);
    };

    eventSource.current.onerror = () => {
      eventSource.current?.close();
      propsRef.current.onUnsubscribe();
    };
  }, []);

  useEffect(() => {
    establishConnection();
  }, [establishConnection]);

  useEffect(() => {
    return () => {
      if (!isInitialized.current) return;

      eventSource.current?.close();
      propsRef.current.onUnsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleClose = () => eventSource.current?.close();
    window.addEventListener("beforeunload", handleClose);
    return () => window.removeEventListener("beforeunload", handleClose);
  }, []);

  return {
    close: () => eventSource.current?.close(),
    isLoading,
  };
}
