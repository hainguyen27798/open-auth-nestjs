'use client';

import { App, Button, Table } from 'antd';
import { PencilLine, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import useSWRImmutable from 'swr/immutable';

import { deleteRole, getRoles } from '@/_actions/role.action';
import { useAppDispatch, useAppSelector } from '@/lib/store/hook';
import { changeSearchRoleAction, selectSearchRoleState } from '@/lib/store/slices';
import type { Permission } from '@/types';

export default function RoleList() {
    const searchState = useAppSelector(selectSearchRoleState);
    const { data } = useSWRImmutable(searchState, getRoles);
    const $t = useTranslations('roles.table');
    const { notification, modal } = App.useApp();
    const dispatch = useAppDispatch();

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

    return (
        <>
            <Table dataSource={data} rowKey="id">
                <Table.Column<Permission> key="name" title={$t('name')} dataIndex="name" />
                <Table.Column<Permission>
                    key="description"
                    title={$t('description')}
                    dataIndex="description"
                    render={(value) => value || '-'}
                />
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
                                onClick={() => {}}
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
        </>
    );
}
