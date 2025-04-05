const _metrics = globalThis.instrumentationMetrics;

export const register = _metrics?.register;

const sseConnections = _metrics?.sseConnections;

export function registerSseConnection(roomId: string) {
  sseConnections?.inc({ room_id: roomId });
}

export function unregisterSseConnection(roomId: string) {
  sseConnections?.dec({ room_id: roomId });
}
