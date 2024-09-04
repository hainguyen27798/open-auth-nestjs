'use client';

import { App, Button, Form, Modal } from 'antd';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import { createRole } from '@/_actions/role.action';
import { FormField } from '@/components/ui';
import { useAppDispatch } from '@/lib/store/hook';
import { changeSearchRoleAction } from '@/lib/store/slices';
import type { CreateRoleDto } from '@/types';

type RoleEditorProps = {
    isOpen?: boolean;
    close?: () => void;
};

export default function RoleEditor({ isOpen = false, close }: RoleEditorProps) {
    const { notification } = App.useApp();
    const $t = useTranslations('roles.form');
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
        <div className="flex items-center justify-between text-xl">
            {$t('title')}
            <X onClick={onClose} className="cursor-pointer" />
        </div>
    );

    const onCreateRole = (form: CreateRoleDto) => {
        createRole(form).then((rs) => {
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
                onClose();
            }
        });
    };

    return (
        <Modal open={isModalOpen} onCancel={onClose} closable={false} title={renderHeader()} footer={null} width={420}>
            <Form className="pt-4" layout="vertical" onFinish={onCreateRole}>
                <FormField<CreateRoleDto> name="name" label={$t('name')} rules={[{ required: true }]} />
                <FormField<CreateRoleDto> name="description" type="textarea" label={$t('description')} />
                <div className="flex justify-end">
                    <Button type="primary" className="px-6" htmlType="submit">
                        {$t('create_btn')}
                    </Button>
                </div>
            </Form>
        </Modal>
    );
}
