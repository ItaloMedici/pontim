import { Logger } from "pino";

const _logger = globalThis.logger as Logger;

type ErrorConfig = {
  message: string;
  [key: string]: unknown;
};

const error = (
  error: unknown,
  message: string,
  metadata: Record<string, unknown>,
) => {
  _logger.error({
    err: error,
    message,
    ...metadata,
  });
};

const info = (message: string) => {
  _logger.info(message);
};

export const logger = {
  error,
  info,
};
