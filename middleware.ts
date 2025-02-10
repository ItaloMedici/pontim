import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const openRoutes = ["/", "/api/stripe/webhook"];

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    if (path === "/" && token) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  },
  {
    pages: {
      signIn: "/login",
    },
    callbacks: {
      authorized({ req, token }) {
        const url = new URL(req.url).pathname;

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
