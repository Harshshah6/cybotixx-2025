import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request: NextRequest) {
    const session = getSessionCookie(request);
    const pathname = request.nextUrl.pathname;

    // If user is authenticated and trying to access /sign-in or /sign-up, redirect to /
    if (session && (pathname === "/sign-in" || pathname === "/sign-up")) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};