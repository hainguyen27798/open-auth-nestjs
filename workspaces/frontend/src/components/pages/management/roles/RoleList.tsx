'use client';

import type { MenuProps } from 'antd';
import { App, Button, Dropdown, Table } from 'antd';
import { Ellipsis, Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import useSWRImmutable from 'swr/immutable';

import { deleteRole, getRoles } from '@/_actions/role.action';
import { useAppDispatch, useAppSelector } from '@/lib/store/hook';
import { changeSearchRoleAction, selectSearchRoleState } from '@/lib/store/slices';
import { useRouter } from '@/navigation';
import type { Role } from '@/types';

export default function RoleList() {
    const searchState = useAppSelector(selectSearchRoleState);
    const { data, isLoading } = useSWRImmutable(searchState, getRoles, { revalidateOnMount: true });
    const $t = useTranslations('roles.table');
    const { notification, modal } = App.useApp();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const actionItems: MenuProps['items'] = [
        {
            label: $t('actions.view_details'),
            key: 'view_role_details',
        },
        {
            type: 'divider',
        },
        {
            label: $t('actions.delete'),
            danger: true,
            key: 'delete_role',
            icon: <Trash size={16} />,
        },
    ];

    const deleteAction = (id: string) => {
        modal.confirm({
            title: $t('confirm_delete'),
            okType: 'danger',
            okText: $t('delete_btn'),
            onOk: async () => {
                const rs = await deleteRole(id);

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
                    dispatch(changeSearchRoleAction({ reload: Date.now() }));
                }
            },
        });
    };

    const viewDetails = (id: string) => {
        router.push(`roles/${id}/settings`);
    };

    const renderActionButton = (id: string, record: Role) => {
        return (
            <Dropdown
                menu={{
                    items: record.canModify ? actionItems : [actionItems[0]],
                    onClick: ({ key }) => {
                        switch (key) {
                            case 'delete_role':
                                deleteAction(id);
                                break;
                            case 'view_role_details':
                                viewDetails(id);
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
                <Table.Column<Role>
                    key="name"
                    title={$t('name')}
                    dataIndex="name"
                    render={(name, record) => (
                        <div className="cursor-pointer text-indigo-500" onClick={() => viewDetails(record.id)}>
                            {name}
                        </div>
                    )}
                />
                <Table.Column<Role>
                    key="description"
                    title={$t('description')}
                    dataIndex="description"
                    render={(value) => value || '-'}
                />
                <Table.Column<Role>
                    key="action_btn"
                    dataIndex="id"
                    render={(id, record) => (
                        <div className="flex items-center justify-end gap-2">{renderActionButton(id, record)}</div>
                    )}
                ></Table.Column>
            </Table>
        </>
    );
}
