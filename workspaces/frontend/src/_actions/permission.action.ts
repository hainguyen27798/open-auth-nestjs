'use server';

import type { CreatePermissionDto, InputSearchDto, Permission, UpdatePermissionDto } from '@/types';
import { HttpClient, withToken } from '@/utils';

export async function getPermissions({ search = '', by = '' }: InputSearchDto) {
    const rs = await withToken<Permission[]>(HttpClient.get)({
        uri: `/role-permissions?search=${search}&by=${by}`,
    });
    return rs.data;
}

export async function createPermission(form: CreatePermissionDto) {
    const rs = await withToken<Permission[]>(HttpClient.post)({
        uri: '/role-permissions',
        body: form,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}

export async function updatePermission(id: string, form: UpdatePermissionDto) {
    const rs = await withToken<Permission[]>(HttpClient.patch)({
        uri: `/role-permissions/${id}`,
        body: form,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}

export async function deletePermission(id: string) {
    const rs = await withToken<Permission[]>(HttpClient.delete)({
        uri: `/role-permissions/${id}`,
    });

    return {
        error: rs.error,
        message: rs.message,
    };
}
