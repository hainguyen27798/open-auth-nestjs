'use client';

import { Button } from 'antd';
import { PlusIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { DefaultOptionType } from 'rc-select/es/Select';
import { useState } from 'react';

import RoleEditor from '@/components/pages/management/roles/RoleEditor';
import RoleList from '@/components/pages/management/roles/RoleList';
import { DashboardFilter } from '@/components/ui';
import { useAppDispatch } from '@/lib/store/hook';
import { changeSearchRoleAction } from '@/lib/store/slices';

const searchByOptions: DefaultOptionType[] = [
    {
        label: 'Name',
        value: 'name',
    },
    {
        label: 'Description',
        value: 'description',
    },
];

export default function RoleManagement() {
    const $t = useTranslations('roles');
    const [isRoleEditorOpen, setIsRoleEditorOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    return (
        <>
            <div className="flex w-full items-center justify-between">
                <div className="text-3xl font-semibold">{$t('title')}</div>
                <Button type="primary" icon={<PlusIcon size={18} />} onClick={() => setIsRoleEditorOpen(true)}>
                    {$t('create_role')}
                </Button>
            </div>
            <div className="mt-6 text-gray-500">{$t('description')}</div>
            <div className="mt-10">
                <DashboardFilter
                    searchByOptions={searchByOptions}
                    defaultSearchBy="name"
                    searchPlaceholder={$t('search_for')}
                    filterChange={(value) => dispatch(changeSearchRoleAction(value))}
                />
                <div className="mt-6">
                    <RoleList />
                </div>
            </div>
            <RoleEditor isOpen={isRoleEditorOpen} close={() => setIsRoleEditorOpen(false)} />
        </>
    );
}
