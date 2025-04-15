import { Logger } from "pino";

const _logger = globalThis.logger as Logger;

const error = ({
  error,
  message,
  metadata,
}: {
  error?: Error | unknown;
  message: string;
  metadata?: Record<string, unknown>;
}) => {
  _logger.error({
    err: error,
    message,
    ...metadata,
  });
};

const info = (message: string, metadata?: Record<string, unknown>) => {
  _logger.info({
    message,
    ...metadata,
  });
};

export const logger = {
  error,
  info,
};
