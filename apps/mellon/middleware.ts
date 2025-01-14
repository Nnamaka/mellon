import authConfig from "@/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  publicRoutes,
  protectedRoutes,
  authRoutes,
} from "@/routes";

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isLoggedIn = !!req.auth;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) {
    return;
  }


  if (!isLoggedIn && !isPublicRoute) {
    // return Response.redirect(new URL("/", nextUrl));
    return;
  }

  if (!isLoggedIn && isProtectedRoute) {
    // Redirect to the login page if accessing protected routes without being logged in
    return Response.redirect(new URL("/", nextUrl));
  }
  return;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
