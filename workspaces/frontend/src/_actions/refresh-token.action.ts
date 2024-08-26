'use server';

import { get, split } from 'lodash-es';
import { cookies } from 'next/headers';

import { CookiesKey, HeaderKey } from '@/constants';
import type { Token } from '@/types';
import { HttpClient } from '@/utils';

export async function refreshAction() {
    if (!shouldRefreshToken()) {
        return;
    }

    const refreshToken = cookies().get(CookiesKey.refreshToken)?.value || '';
    const { data, error } = await HttpClient.post<Token>({
        uri: '/v1/auth/refresh-token',
        headers: {
            [HeaderKey.RefreshToken]: refreshToken,
        },
    });

    if (!error) {
        cookies().set(CookiesKey.refreshToken, data.refreshToken, { secure: true });
        cookies().set(CookiesKey.accessToken, data.accessToken, { secure: true });
    }
}

function shouldRefreshToken() {
    const accessToken = cookies().get(CookiesKey.accessToken)?.value || '';

    if (!accessToken) {
        return false;
    }

    const payloadToken = get(split(accessToken, '.'), 1);

    if (!payloadToken) {
        return false;
    }

    try {
        const payload = JSON.parse(atob(payloadToken));
        const expiredAt = payload.exp * 1000;
        return expiredAt <= Date.now() + 60000;
    } catch {
        return false;
    }
}
