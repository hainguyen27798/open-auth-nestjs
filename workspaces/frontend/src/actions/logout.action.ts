'use server';

import { cookies } from 'next/headers';

import { CookiesKey, HeaderKey } from '@/constants';
import { HttpClient } from '@/utils';

export async function logoutAction() {
    const refreshToken = cookies().get(CookiesKey.refreshToken)?.value;

    if (!refreshToken) {
        return {
            error: true,
            message: '',
        };
    }

    const { message, error } = await HttpClient.post('/v1/auth/logout', null, {
        [HeaderKey.RefreshToken]: refreshToken,
    });

    if (!error) {
        cookies().delete(CookiesKey.name);
        cookies().delete(CookiesKey.email);
        cookies().delete(CookiesKey.refreshToken);
        cookies().delete(CookiesKey.accessToken);
    }

    return {
        error,
        message,
    };
}
