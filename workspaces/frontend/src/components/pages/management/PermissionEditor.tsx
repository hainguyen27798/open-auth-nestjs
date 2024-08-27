'use client';

import { App, Button, Form, Modal } from 'antd';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import { createNewPermission } from '@/_actions/permission.action';
import { FormField } from '@/components/ui';
import { useAppDispatch } from '@/lib/store/hook';
import { reloadPermissionAction } from '@/lib/store/reducers/permission.reducer';
import type { CreatePermission } from '@/types';

type PermissionEditorProps = {
    isOpen?: boolean;
    close?: () => void;
};

export default function PermissionEditor({ isOpen = false, close }: PermissionEditorProps) {
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

    const renderHeader = () => (
        <div className="flex items-center justify-between text-2xl">
            {$t('title')}
            <X onClick={onClose} className="cursor-pointer" />
        </div>
    );

    const createPermission = (form: CreatePermission) => {
        createNewPermission(form).then((rs) => {
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
                dispatch(reloadPermissionAction());
                onClose();
            }
        });
    };

    return (
        <Modal open={isModalOpen} onCancel={onClose} closable={false} title={renderHeader()} footer={null} width={420}>
            <Form className="pt-4" layout="vertical" onFinish={createPermission}>
                <FormField<CreatePermission>
                    name="serviceName"
                    label={$t('serviceName')}
                    rules={[{ required: true }]}
                />
                <FormField<CreatePermission> name="resource" label={$t('resource')} rules={[{ required: true }]} />
                <FormField<CreatePermission> name="action" label={$t('action')} rules={[{ required: true }]} />
                <FormField<CreatePermission> name="attributes" label={$t('attributes')} />
                <FormField<CreatePermission> name="description" label={$t('description')} />
                <div className="flex justify-end">
                    <Button type="primary" className="px-6" htmlType="submit">
                        {$t('create_btn')}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
