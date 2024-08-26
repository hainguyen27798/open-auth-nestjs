'use client';

import { Modal } from 'antd';
import { useCallback, useMemo, useState } from 'react';

type PermissionEditorProps = {
    isOpen?: boolean;
    close?: () => void;
};

export default function PermissionEditor({ isOpen = false, close }: PermissionEditorProps) {
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

    return (
        <Modal open={isModalOpen} onCancel={onClose}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Modal>
    );
}
