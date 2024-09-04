'use client';

import { Button } from 'antd';
import { useTranslations } from 'next-intl';

import RolePermissionList from '@/components/pages/management/roles/RolePermissionList';

export default function RolePermission() {
    const $t = useTranslations('roles.details.permissions');

    return (
        <>
            <div className="mt-6 flex items-center justify-between gap-4">
                <div className="text-gray-500">{$t('description')}</div>
                <Button type="primary" className="px-5">
                    {$t('add_permissions')}
                </Button>
            </div>
            <div className="mt-6">
                <RolePermissionList />
            </div>
        </>
    );
}
