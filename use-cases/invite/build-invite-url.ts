export const buildInviteUrl = (roomId: string, origin: string) => {
  const url = new URL(`${origin}/room/invite`);

  const date = Date.now();
  const base64 = Buffer.from(`${roomId}:${date}`).toString("base64");

  url.searchParams.set("code", base64);

  return url.toString();
};
