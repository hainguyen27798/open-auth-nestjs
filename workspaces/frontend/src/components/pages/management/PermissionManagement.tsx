'use client';

import { Button } from 'antd';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import PermissionList from '@/components/pages/management/PermissionList';

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
            <PermissionList />
        </>
    );
}
