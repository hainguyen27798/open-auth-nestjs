'use client';

import { App, Button, Dropdown, type MenuProps, Table } from 'antd';
import { Ellipsis, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { deleteRolePermission, getRole } from '@/_actions/role.action';
import { useAppDispatch, useAppSelector } from '@/lib/store/hook';
import { changeCurrentRoleAction, selectCurrentRoleState } from '@/lib/store/slices';
import { useRouter } from '@/navigation';
import type { Permission } from '@/types';

export default function RolePermissionList() {
    const $t = useTranslations('roles.details.permissions.table');
    const role = useAppSelector(selectCurrentRoleState);
    const dispatch = useAppDispatch();
    const { notification, modal } = App.useApp();
    const router = useRouter();

    const actionItems: MenuProps['items'] = [
        {
            label: $t('view_permission_details'),
            key: 'view_permission_details',
        },
        {
            type: 'divider',
        },
        {
            label: $t('delete_role_permission'),
            danger: true,
            key: 'delete_role_permission',
            icon: <Trash size={16} />,
        },
    ];

    const onDeleteRolePermission = (permissionId: string) => {
        modal.confirm({
            title: $t('confirm_delete'),
            okType: 'danger',
            okText: $t('delete_btn'),
            onOk: async () => {
                if (role.data?.id) {
                    dispatch(changeCurrentRoleAction({ isLoading: true }));
                    const rs = await deleteRolePermission(role.data.id, permissionId);

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
                        const data = await getRole(role.data.id);
                        dispatch(changeCurrentRoleAction({ data }));
                    }
                    dispatch(changeCurrentRoleAction({ isLoading: false }));
                }
            },
        });
    };

    const viewPermissionDetails = (id: string) => {
        router.push(`../../permissions/${id}`);
    };

    const renderActionButton = (id: string) => {
        return (
            <Dropdown
                menu={{
                    items: actionItems,
                    onClick: ({ key }) => {
                        switch (key) {
                            case 'delete_role_permission':
                                onDeleteRolePermission(id);
                                break;
                            case 'view_permission_details':
                                viewPermissionDetails(id);
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
        <Table dataSource={role.data?.permissions} rowKey="id" loading={role.isLoading}>
            <Table.Column<Permission> key="serviceName" title={$t('serviceName')} dataIndex="serviceName" />
            <Table.Column<Permission> key="resource" title={$t('resource')} dataIndex="resource" />
            <Table.Column<Permission> key="action" title={$t('action')} dataIndex="action" />
            <Table.Column<Permission> key="attributes" title={$t('attributes')} dataIndex="attributes" />
            <Table.Column<Permission> key="description" title={$t('description')} dataIndex="description" />
            <Table.Column<Permission>
                key="action_btn"
                dataIndex="id"
                render={(id) => (
                    <div className="flex items-center justify-end gap-2">
                        {role.data?.canModify && renderActionButton(id)}
                    </div>
                )}
            ></Table.Column>
        </Table>
    );
}
