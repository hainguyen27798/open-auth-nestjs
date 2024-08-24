'use server';

import type { Permission } from '@/types';
import { HttpClient, withToken } from '@/utils';

export async function getPermissions() {
    const rs = await withToken<Permission[]>(HttpClient.get)({ uri: '/v1/role-permissions' });
    return rs.data;
}
