import _ from 'lodash-es';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales } from '@/constants';

const protectedRoutes = ['/'];
const publicRoutes = ['/login'];

const intlMiddleware = createMiddleware({
    locales,
    defaultLocale,
});

const regex = /^\/(en|vi)(.*)?$/;

export default function middleware(request: NextRequest) {
    const pathsMatch = request.nextUrl?.pathname?.match(regex);
    const path = _.get(pathsMatch, 2) || '/';
    const locale = _.get(pathsMatch, 1);
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    // const cookie = cookies().get('session')?.value;

    if (isProtectedRoute && !isPublicRoute && locale) {
        return NextResponse.redirect(new URL(`/${_.get(pathsMatch, 1)}/login`, request.url));
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ['/', '/(en|vi)/:path*'],
};
