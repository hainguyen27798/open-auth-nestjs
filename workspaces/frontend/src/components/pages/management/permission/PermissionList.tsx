'use client';

import { App, Button, Dropdown, type MenuProps, Table } from 'antd';
import { Ellipsis, PencilLine, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { deletePermission, getPermissions } from '@/_actions/permission.action';
import PermissionEditor from '@/components/pages/management/permission/PermissionEditor';
import { useAppDispatch, useAppSelector } from '@/lib/store/hook';
import { changeSearchPermissionAction, selectSearchPermissionState } from '@/lib/store/slices';
import type { Permission } from '@/types';

export default function PermissionList() {
    const searchState = useAppSelector(selectSearchPermissionState);
    const { data, isLoading } = useSWRImmutable(searchState, getPermissions);
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

    const actionItems: MenuProps['items'] = [
        {
            label: $t('actions.edit_permission'),
            key: 'edit_permission',
            icon: <PencilLine size={16} />,
        },
        {
            type: 'divider',
        },
        {
            label: $t('actions.delete'),
            danger: true,
            key: 'delete_permission',
            icon: <Trash size={16} />,
        },
    ];

    const renderActionButton = (id: string, record: Permission) => {
        return (
            <Dropdown
                menu={{
                    items: actionItems,
                    onClick: ({ key }) => {
                        switch (key) {
                            case 'delete_permission':
                                deleteAction(id);
                                break;
                            case 'edit_permission':
                                setPermission(record);
                                break;
                            default:
                                break;
                        }
                    },
                }}
                placement="bottomRight"
            >
                <Button size="small" className="!border-gray-300 !text-gray-500" icon={<Ellipsis size={16} />} />
            </Dropdown>
        );
    };

    return (
        <>
            <Table dataSource={data} rowKey="id" loading={isLoading}>
                <Table.Column<Permission> key="serviceName" title={$t('serviceName')} dataIndex="serviceName" />
                <Table.Column<Permission> key="resource" title={$t('resource')} dataIndex="resource" />
                <Table.Column<Permission> key="action" title={$t('action')} dataIndex="action" />
                <Table.Column<Permission> key="attributes" title={$t('attributes')} dataIndex="attributes" />
                <Table.Column<Permission>
                    key="action_btn"
                    dataIndex="id"
                    render={(id, record) => (
                        <div className="flex items-center justify-end gap-2">
                            {record.canModify && renderActionButton(id, record)}
                        </div>
                    )}
                ></Table.Column>
            </Table>
            <PermissionEditor isOpen={!!permission} permission={permission} close={() => setPermission(undefined)} />
        </>
    );
}
