'use server';

import { getPermissions } from '@/actions/permission.action';
import { PermissionManagement } from '@/pages/management';

export default async function PermissionsPage() {
    const permissions = await getPermissions();
    return <PermissionManagement permissions={permissions} />;
}
