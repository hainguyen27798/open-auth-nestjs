'use client';

import { App, Button, Form, Modal } from 'antd';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import { createPermission, updatePermission } from '@/_actions/permission.action';
import { FormField } from '@/components/ui';
import { useAppDispatch } from '@/lib/store/hook';
import { changeSearchPermissionAction } from '@/lib/store/slices';
import type { CreatePermissionDto, Permission } from '@/types';

type PermissionEditorProps = {
    isOpen?: boolean;
    close?: () => void;
    permission?: Permission;
};

export default function PermissionEditor({ isOpen = false, close, permission }: PermissionEditorProps) {
    const { notification } = App.useApp();
    const $t = useTranslations('permission.form');
    const dispatch = useAppDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClose = useCallback(() => {
        setIsModalOpen(false);
        if (close) {
            close();
        }
    }, [close]);

    useMemo(() => {
        setIsModalOpen(isOpen);
    }, [isOpen]);

    const isEdit = useMemo(() => {
        return !!permission?.id;
    }, [permission?.id]);

    const renderHeader = () => (
        <div className="flex items-center justify-between text-xl">
            {isEdit ? $t('title_edit') : $t('title')}
            <X onClick={onClose} className="cursor-pointer" />
        </div>
    );

    const savePermission = (form: CreatePermissionDto) => {
        const promise = permission?.id
            ? updatePermission(permission.id, {
                  action: form.action,
                  attributes: form.attributes,
                  description: form.description,
              })
            : createPermission(form);
        promise.then((rs) => {
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
                onClose();
            }
        });
    };

    return (
        <Modal open={isModalOpen} onCancel={onClose} closable={false} title={renderHeader()} footer={null} width={420}>
            <Form className="pt-4" layout="vertical" onFinish={savePermission}>
                <FormField<CreatePermissionDto>
                    name="serviceName"
                    label={$t('serviceName')}
                    rules={[{ required: true }]}
                    disable={isEdit}
                    defaultValue={permission?.serviceName}
                />
                <FormField<CreatePermissionDto>
                    defaultValue={permission?.resource}
                    name="resource"
                    label={$t('resource')}
                    disable={isEdit}
                    rules={[{ required: true }]}
                />
                <FormField<CreatePermissionDto>
                    defaultValue={permission?.action}
                    name="action"
                    label={$t('action')}
                    rules={[{ required: true }]}
                />
                <FormField<CreatePermissionDto>
                    defaultValue={permission?.attributes || '*'}
                    name="attributes"
                    label={$t('attributes')}
                />
                <FormField<CreatePermissionDto>
                    defaultValue={permission?.description}
                    name="description"
                    label={$t('description')}
                />
                <div className="flex justify-end">
                    <Button type="primary" className="px-6" htmlType="submit">
                        {isEdit ? $t('save_btn') : $t('create_btn')}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
