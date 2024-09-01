'use client';

import { App, Button, Table } from 'antd';
import { PencilLine, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { deletePermission, getPermissions } from '@/_actions/permission.action';
import PermissionEditor from '@/components/pages/management/PermissionEditor';
import { useAppDispatch, useAppSelector } from '@/lib/store/hook';
import { changeSearchPermissionAction, selectSearchPermissionState } from '@/lib/store/reducers/permission.reducer';
import type { Permission } from '@/types';

export default function PermissionList() {
    const searchState = useAppSelector(selectSearchPermissionState);
    const { data } = useSWRImmutable(searchState, getPermissions);
    const $t = useTranslations('permission.table');
    const { notification, modal } = App.useApp();
    const dispatch = useAppDispatch();
    const [permission, setPermission] = useState<Permission | undefined>(undefined);

    const deleteAction = (id: string) => {
        modal.confirm({
            title: $t('confirm_delete'),
            okType: 'danger',
            okText: $t('delete_btn'),
            onOk: async () => {
                const rs = await deletePermission(id);

                if (rs?.error) {
                    notification.error({
                        message: rs.message,
                        showProgress: true,
                    });
                } else {
                    notification.success({
                        message: rs.message,
                        showProgress: true,
                    });
                    dispatch(changeSearchPermissionAction({ reload: Date.now() }));
                }
            },
        });
    };

    return (
        <>
            <Table dataSource={data} rowKey="id">
                <Table.Column<Permission> key="serviceName" title={$t('serviceName')} dataIndex="serviceName" />
                <Table.Column<Permission> key="resource" title={$t('resource')} dataIndex="resource" />
                <Table.Column<Permission> key="action" title={$t('action')} dataIndex="action" />
                <Table.Column<Permission> key="attributes" title={$t('attributes')} dataIndex="attributes" />
                <Table.Column<Permission>
                    key="action_btn"
                    dataIndex="id"
                    render={(id, record) => (
                        <div className="flex items-center justify-end gap-2">
                            <Button
                                size="small"
                                className="!text-indigo-500"
                                type="text"
                                icon={<PencilLine size={20} />}
                                onClick={() => setPermission(record)}
                            />
                            <Button
                                size="small"
                                className="!text-rose-400"
                                type="text"
                                icon={<Trash2 size={20} />}
                                onClick={() => deleteAction(id)}
                            />
                        </div>
                    )}
                ></Table.Column>
            </Table>
            <PermissionEditor isOpen={!!permission} permission={permission} close={() => setPermission(undefined)} />
        </>
    );
}
