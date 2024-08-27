'use server';

import type { CreatePermissionDto, Permission, UpdatePermissionDto } from '@/types';
import { HttpClient, withToken } from '@/utils';

export async function getPermissions() {
    const rs = await withToken<Permission[]>(HttpClient.get)({
        uri: '/v1/role-permissions',
    });
    return rs.data;
}

export async function createPermission(form: CreatePermissionDto) {
    const rs = await withToken<Permission[]>(HttpClient.post)({
        uri: '/v1/role-permissions',
        body: form,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}

export async function updatePermission(id: string, form: UpdatePermissionDto) {
    const rs = await withToken<Permission[]>(HttpClient.patch)({
        uri: `/v1/role-permissions/${id}`,
        body: form,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}

export async function deletePermission(id: string) {
    const rs = await withToken<Permission[]>(HttpClient.delete)({
        uri: `/v1/role-permissions/${id}`,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}
