'use server';

import type { CreatePermission, Permission } from '@/types';
import { HttpClient, withToken } from '@/utils';

export async function createNewPermission(form: CreatePermission) {
    const rs = await withToken<Permission[]>(HttpClient.post)({
        uri: '/v1/role-permissions',
        body: form,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}
