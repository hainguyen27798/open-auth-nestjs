'use client';

import { Button } from 'antd';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { DefaultOptionType } from 'rc-select/es/Select';
import { useState } from 'react';

import PermissionEditor from '@/components/pages/management/permission/PermissionEditor';
import PermissionList from '@/components/pages/management/permission/PermissionList';
import { DashboardFilter } from '@/components/ui';
import { useAppDispatch } from '@/lib/store/hook';
import { changeSearchPermissionAction } from '@/lib/store/slices';

const searchByOptions: DefaultOptionType[] = [
    {
        label: 'Service Name',
        value: 'serviceName',
    },
    {
        label: 'Resource',
        value: 'resource',
    },
    {
        label: 'Action',
        value: 'action',
    },
    {
        label: 'Attributes',
        value: 'attributes',
    },
];

export default function PermissionManagement() {
    const $t = useTranslations('permission');
    const [isPermissionEditorOpen, setIsPermissionEditorOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="flex w-full items-center justify-between">
                <div className="text-3xl font-semibold">{$t('title')}</div>
                <Button type="primary" icon={<PlusIcon size={18} />} onClick={() => setIsPermissionEditorOpen(true)}>
                    {$t('create_permission')}
                </Button>
            </div>
            <div className="mt-6 text-gray-500">{$t('description')}</div>
            <div className="mt-10">
                <DashboardFilter
                    searchByOptions={searchByOptions}
                    defaultSearchBy="resource"
                    searchPlaceholder={$t('search_for')}
                    filterChange={(value) => dispatch(changeSearchPermissionAction(value))}
                />
                <div className="mt-6">
                    <PermissionList />
                </div>
            </div>
            <PermissionEditor isOpen={isPermissionEditorOpen} close={() => setIsPermissionEditorOpen(false)} />
        </>
    );
}
