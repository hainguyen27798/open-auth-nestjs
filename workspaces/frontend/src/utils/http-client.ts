import { cookies } from 'next/headers';

import { CookiesKey, HeaderKey } from '@/constants';

const HOST = process.env.API_HOST;

const headersInit: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

type HttpOptions = {
    uri: string;
    body?: unknown;
    headers?: HeadersInit;
};

type TResponse<T = unknown> = {
    error: boolean;
    message: string;
    data: T;
};

export class HttpClient {
    static async get<T = unknown>({ uri, headers }: HttpOptions): Promise<TResponse<T>> {
        const rs = await fetch(`${HOST}${uri}`, {
            headers: { ...headersInit, ...headers },
            method: 'GET',
        });

        return await rs.json();
    }

    static async post<T = unknown>({ uri, body, headers = {} }: HttpOptions): Promise<TResponse<T>> {
        const res = await fetch(`${HOST}${uri}`, {
            headers: { ...headersInit, ...headers },
            method: 'POST',
            body: body ? JSON.stringify(body) : null,
        });
        const raw = await res.json();

        if (res.status !== 200 && res.status !== 201) {
            return {
                error: true,
                message: raw.message,
                data: null as T,
            };
        }

        return {
            error: false,
            message: raw.message,
            data: raw.data,
        };
    }

    static async patch<T = unknown>({ uri, body, headers = {} }: HttpOptions): Promise<TResponse<T>> {
        const res = await fetch(`${HOST}${uri}`, {
            headers: { ...headersInit, ...headers },
            method: 'PATCH',
            body: body ? JSON.stringify(body) : null,
        });
        const raw = await res.json();

        return {
            error: res.status !== 200,
            message: raw.message,
            data: raw.data,
        };
    }

    static async delete<T = unknown>({ uri, body, headers = {} }: HttpOptions): Promise<TResponse<T>> {
        const res = await fetch(`${HOST}${uri}`, {
            headers: { ...headersInit, ...headers },
            method: 'DELETE',
            body: body ? JSON.stringify(body) : null,
        });
        const raw = await res.json();

        return {
            error: res.status !== 200,
            message: raw.message,
            data: null as T,
        };
    }
}

export function withToken<T = unknown>(httpFunction: (args: HttpOptions) => Promise<TResponse<T>>) {
    const accessToken = cookies().get(CookiesKey.accessToken)?.value || '';
    return (args: HttpOptions): Promise<TResponse<T>> => {
        return httpFunction({
            ...args,
            headers: { ...args.headers, [HeaderKey.Authorization]: `Bearer ${accessToken}` },
        });
    };
}
