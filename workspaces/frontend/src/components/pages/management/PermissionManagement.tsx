'use client';

import { Button } from 'antd';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { DefaultOptionType } from 'rc-select/es/Select';

import PermissionList from '@/components/pages/management/PermissionList';
import { DashboardFilter } from '@/components/ui';

const searchByOptions: DefaultOptionType[] = [
    {
        label: 'Server Name',
        value: 'serverName',
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
    return (
        <>
            <div className="flex w-full items-center justify-between">
                <div className="text-3xl font-semibold">{$t('title')}</div>
                <Button
                    size="large"
                    className="!border-indigo-500 !bg-indigo-500 text-sm !text-white"
                    icon={<PlusIcon size={18} />}
                >
                    {$t('create_permission')}
                </Button>
            </div>
            <div className="mt-6 text-gray-500">{$t('description')}</div>
            <div className="mt-10">
                <DashboardFilter
                    searchByOptions={searchByOptions}
                    defaultSearchBy="resource"
                    searchPlaceholder={$t('search_for')}
                />
                <div className="mt-6">
                    <PermissionList />
                </div>
            </div>
        </>
    );
}
