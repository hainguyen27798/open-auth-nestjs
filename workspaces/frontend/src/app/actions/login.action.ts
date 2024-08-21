'use server';

import { cookies } from 'next/headers';

import { CookiesKey } from '@/constants';
import { HttpClient } from '@/utils';

export async function loginAction(email: string, password: string) {
    const { message, data, error } = await HttpClient.post('/v1/auth/login', { email, password });

    if (!error) {
        cookies().set(CookiesKey.name, data.name, { secure: true });
        cookies().set(CookiesKey.email, data.email, { secure: true });
        cookies().set(CookiesKey.refreshToken, data.refreshToken, { secure: true });
        cookies().set(CookiesKey.accessToken, data.accessToken, { secure: true });
    }

    return {
        error,
        message,
    };
}
