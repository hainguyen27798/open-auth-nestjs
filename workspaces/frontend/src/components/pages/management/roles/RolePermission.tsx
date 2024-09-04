'use client';

import { Button } from 'antd';
import { useTranslations } from 'next-intl';

import RolePermissionList from '@/components/pages/management/roles/RolePermissionList';
import { useAppSelector } from '@/lib/store/hook';
import { selectCurrentRoleState } from '@/lib/store/slices';

export default function RolePermission() {
    const $t = useTranslations('roles.details.permissions');
    const role = useAppSelector(selectCurrentRoleState);

    return (
        <>
            <div className="mt-6 flex items-center justify-between gap-4">
                <div className="text-gray-500">
                    {role.data?.canModify ? $t('description') : $t('description_view_only')}
                </div>
                {role.data?.canModify && (
                    <Button type="primary" className="px-5">
                        {$t('add_permissions')}
                    </Button>
                )}
            </div>
            <div className="mt-6">
                <RolePermissionList />
            </div>
        </>
    );
}
