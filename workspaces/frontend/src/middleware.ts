import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { refreshAction } from '@/_actions/refresh-token.action';
import { CookiesKey, defaultLocale, locales } from '@/constants';

const protectedRoutes = [/.*\/management\/.*/];
const publicRoutes = [/.*\/login/];

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
});

const regex = /^\/(en|vi)(.*)?$/;

export default async function middleware(request: NextRequest) {
    const pathsMatch = request.nextUrl?.pathname?.match(regex);
    const path = request.nextUrl?.pathname;
    const locale = pathsMatch?.[1];

    if (/^\/(en|vi)$/.test(path)) {
        return NextResponse.redirect(new URL(`/${locale}/management/users`, request.url));
    }

    const isProtectedRoute = protectedRoutes.some((permission) => permission.test(path));
    const isPublicRoute = publicRoutes.some((permission) => permission.test(path));

    const accessToken = cookies().get(CookiesKey.refreshToken)?.value;

    if (isProtectedRoute && !isPublicRoute && locale && !accessToken) {
        return NextResponse.redirect(new URL(`/${locale}/login`, request.url));
    }

    const res = intlMiddleware(request);
    const newToken = await refreshAction();

    if (newToken) {
        res.cookies.set(CookiesKey.refreshToken, newToken.refreshToken);
        res.cookies.set(CookiesKey.accessToken, newToken.accessToken);
    }

    return res;
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/(en|vi)/:path*'],
};
