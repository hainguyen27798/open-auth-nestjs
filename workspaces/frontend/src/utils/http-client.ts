const HOST = process.env.API_HOST;

const headersInit: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export class HttpClient {
    static async get(uri: string) {
        return await fetch(`${HOST}${uri}`, {
            headers: headersInit,
            method: 'GET',
        });
    }

    static async post(uri: string, body: unknown, headers: HeadersInit = {}) {
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
            };
        }

        return {
            error: false,
            message: raw.message,
            data: raw.data,
        };
    }
}
