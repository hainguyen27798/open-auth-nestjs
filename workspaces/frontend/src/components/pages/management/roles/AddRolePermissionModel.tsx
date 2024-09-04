import { App, Button, Form, Modal } from 'antd';
import { filter, includes, map } from 'lodash-es';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { DefaultOptionType } from 'rc-select/es/Select';
import { useCallback, useMemo, useState } from 'react';
import useSWRImmutable from 'swr/immutable';

import { getPermissions } from '@/_actions/permission.action';
import { addPermissionForRole } from '@/_actions/role.action';
import { LoadingWrapper, Selector } from '@/components/ui';
import type { Role } from '@/types';

type AddRolePermissionModelProps = {
    isOpen?: boolean;
    close?: (ok: boolean) => void;
    role: Role | null;
};

type TForm = {
    permissionId: string;
};

export default function AddRolePermissionModel({ isOpen, close, role }: AddRolePermissionModelProps) {
    const $t = useTranslations('roles.details.add_role_permission_model');
    const [isModalOpen, setIsModalOpen] = useState<boolean | undefined>(false);
    const [form] = Form.useForm<TForm>();
    const { data, isLoading } = useSWRImmutable({}, getPermissions);
    const { notification } = App.useApp();

    const onClose = useCallback(
        (ok: boolean = false) => {
            setIsModalOpen(false);
            form.resetFields();
            if (close) {
                close(ok);
            }
        },
        [close, form],
    );

    useMemo(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    const permissionIdExiting: string[] = useMemo(() => {
        return map(role?.permissions, 'id');
    }, [role?.permissions]);

    const permissionList: DefaultOptionType[] = useMemo(() => {
        return (
            map(
                filter(data, (item) => !includes(permissionIdExiting, item.id)),
                (item) => ({
                    value: item.id,
                    label: `${item.serviceName} - ${item.resource}:${item.action}`,
                }),
            ) || []
        );
    }, [data, permissionIdExiting]);

    const renderHeader = () => (
        <div className="flex items-center justify-between text-xl">
            {$t('title')}
            <X onClick={() => onClose()} className="cursor-pointer" />
        </div>
    );

    const onAddPermission = (form: TForm) => {
        if (role?.id) {
            addPermissionForRole(role.id, form.permissionId).then((rs) => {
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
                    onClose(true);
                }
            });
        }
    };

    return (
        <Modal
            open={isModalOpen}
            onCancel={() => onClose()}
            closable={false}
            title={renderHeader()}
            footer={null}
            width={420}
        >
            <LoadingWrapper loading={isLoading}>
                <Form className="pt-4" layout="vertical" onFinish={onAddPermission} form={form}>
                    <div className="mb-2">{$t('title_select')}</div>
                    <Form.Item<TForm> name="permissionId" rules={[{ required: true }]}>
                        <Selector
                            options={permissionList}
                            onSelect={(value) => {
                                form.setFieldValue('permissionId', value);
                            }}
                        />
                    </Form.Item>
                    <div className="flex justify-end">
                        <Button type="primary" className="px-6" htmlType="submit">
                            {$t('add_btn')}
                        </Button>
                    </div>
                </Form>
            </LoadingWrapper>
        </Modal>
    );
}
