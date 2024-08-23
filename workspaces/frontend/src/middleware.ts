import _ from 'lodash-es';
import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { CookiesKey, defaultLocale, locales } from '@/constants';

const protectedRoutes = [/.*\/management\/.*/];
const publicRoutes = [/.*\/login/];

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
});

const regex = /^\/(en|vi)(.*)?$/;

export default function middleware(request: NextRequest) {
    const pathsMatch = request.nextUrl?.pathname?.match(regex);
    const path = request.nextUrl?.pathname;
    const locale = _.get(pathsMatch, 1);

    if (/^\/(en|vi)$/.test(path)) {
        return NextResponse.redirect(new URL(`/${_.get(pathsMatch, 1)}/management/users`, request.url));
    }

    const isProtectedRoute = protectedRoutes.some((permission) => permission.test(path));
    const isPublicRoute = publicRoutes.some((permission) => permission.test(path));

    const accessToken = cookies().get(CookiesKey.refreshToken)?.value;

    if (isProtectedRoute && !isPublicRoute && locale && !accessToken) {
        return NextResponse.redirect(new URL(`/${_.get(pathsMatch, 1)}/login`, request.url));
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/', '/(en|vi)/:path*'],
};
