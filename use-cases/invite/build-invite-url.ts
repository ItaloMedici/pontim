export const buildInviteUrl = (
  roomId: string,
  origin: string,
  date = Date.now(),
) => {
  const url = new URL(`${origin}/invite`);

  const base64 = Buffer.from(`${roomId}:${date}`).toString("base64");

  url.searchParams.set("code", base64);

  return url.toString();
};
