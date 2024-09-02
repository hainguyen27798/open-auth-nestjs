'use client';

import type { TabsProps } from 'antd';
import { Skeleton, Tabs } from 'antd';
import { last, split } from 'lodash-es';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useMemo } from 'react';
import useSWRImmutable from 'swr/immutable';

import { getRole } from '@/_actions/role.action';
import { useAppDispatch } from '@/lib/store/hook';
import { changeCurrentRoleAction } from '@/lib/store/slices';
import { usePathname, useRouter } from '@/navigation';

export default function RoleDetails({ children }: React.PropsWithChildren) {
    const $t = useTranslations('roles.details');
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const dispatch = useAppDispatch();
    const { data, isLoading } = useSWRImmutable(
        params.id,
        async (id: string) => {
            dispatch(
                changeCurrentRoleAction({
                    isLoading: true,
                }),
            );

            const rs = await getRole(id);
            dispatch(
                changeCurrentRoleAction({
                    data: rs,
                    isLoading: false,
                }),
            );
            return rs;
        },
        {
            revalidateOnMount: true,
        },
    );

    const path = useMemo(() => {
        return last(split(pathname, '/'));
    }, [pathname]);

    const roleDetailsTabItems: TabsProps['items'] = [
        {
            key: 'settings',
            label: $t('tabs.settings'),
        },
        {
            key: 'permissions',
            label: $t('tabs.permissions'),
        },
        {
            key: 'users',
            label: $t('tabs.users'),
        },
    ];

    return (
        <>
            <div onClick={() => router.push('../')} className="flex cursor-pointer items-center gap-1 text-gray-500">
                <ArrowLeft size={16} /> {$t('back_btn')}
            </div>
            <div className="mt-6 flex flex-col gap-2">
                {isLoading ? <Skeleton.Input active={true} /> : <div className="text-3xl font-bold">{data?.name}</div>}
                {isLoading ? (
                    <Skeleton.Input size="small" active={true} />
                ) : (
                    <div className="leading-[27px] text-gray-500">
                        {$t('role_id')}: <span className="rounded-md bg-zinc-200 px-1.5 py-0.5">{data?.id}</span>
                    </div>
                )}
            </div>
            <div className="mt-10">
                <Tabs
                    items={roleDetailsTabItems}
                    onChange={(key) => {
                        router.push(key);
                    }}
                    activeKey={path}
                ></Tabs>
                {children}
            </div>
        </>
    );
}
