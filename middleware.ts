import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getGuestToken, verifyGuestToken } from "./lib/auth/guest-auth";

const openRoutes = [
  "/",
  "/api/stripe/webhook",
  "/api/metrics",
  "/pricing",
  "/scrum-poker",
  "/faq",
  "/story-points",
  "/fibonacci",
  "/politica-de-privacidade",
  "/termos-de-uso",
  "/blog",
];

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    const query = req.nextUrl.search;

    if (path === "/" && token) {
      if (query.includes("from=home")) {
        return NextResponse.next();
      }

      return NextResponse.redirect(new URL("/home", req.url));
    }
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      async authorized({ req, token }) {
        const guestToken = getGuestToken();

        if (guestToken) {
          const isValid = await verifyGuestToken(guestToken);
          return Boolean(isValid);
        }

        const url = new URL(req.url).pathname;

        if (url.startsWith("/blog")) {
          return true;
        }

        if (openRoutes.includes(url)) {
          return true;
        }

        return !!token;
      },
    },
  },
);
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
