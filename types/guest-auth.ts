import { Session } from "next-auth";

export interface GuestTokenPayload {
  userId: string;
  email: string;
  name: string;
  isGuest: true;
  exp: number;
  iat: number;
}

export interface CombinedSession extends Session {
  user: Session["user"] & { isGuest?: boolean };
}
