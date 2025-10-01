"server only";

import { env } from "@/env";
import { User } from "@/lib/schemas/user";
import { CombinedSession, GuestTokenPayload } from "@/types/guest-auth";
import { getUserById } from "@/use-cases/user/get-user-by-id";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { GUEST_TOKEN_COOKIE, GUEST_USER_EMAIL_DOMAIN } from "../consts";
import { logger } from "../logger";

const secret = new TextEncoder().encode(env.NEXTAUTH_SECRET);

export async function createGuestToken(user: User): Promise<string> {
  const payload: Omit<GuestTokenPayload, "iat" | "exp"> = {
    userId: user.id,
    email: user.email,
    name: user.name,
    isGuest: true,
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);

  return token;
}

export async function signInGuest(user: User) {
  const token = await createGuestToken(user);
  console.log("Signing in guest user, setting token:", { token });
  setGuestToken(token);
}

export async function verifyGuestToken(
  token: string,
): Promise<GuestTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);

    if (
      typeof payload.userId === "string" &&
      typeof payload.email === "string" &&
      typeof payload.name === "string" &&
      payload.isGuest === true
    ) {
      return payload as unknown as GuestTokenPayload;
    }

    return null;
  } catch (error) {
    logger.error({
      message: "Failed to verify guest token",
      error,
    });
    return null;
  }
}

export function getGuestToken() {
  return cookies().get(GUEST_TOKEN_COOKIE)?.value;
}

export function setGuestToken(token: string) {
  cookies().set(GUEST_TOKEN_COOKIE, token, {
    maxAge: 60 * 60 * 24, // 24 hours,
    expires: new Date(Date.now() + 60 * 60 * 24 * 1000), // 24 hours
  });
}

export async function getGuestSession(
  token: string,
): Promise<CombinedSession | null> {
  const payload = await verifyGuestToken(token);

  if (!payload) {
    return null;
  }

  const user = await getUserById(payload.userId);

  if (!user || !user.email.includes(GUEST_USER_EMAIL_DOMAIN)) {
    return null;
  }

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      image: undefined,
      imageUrl: null,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      isGuest: true,
      expireAt: user.expireAt,
    },
    expires: payload.exp.toString(),
  };
}
