'use client';

import {Table, TableProps} from 'antd';

import type { Permission } from '@/types';

type PermissionListProps = {
    permissions: Permission[];
};

const columns: TableProps<Permission>['columns'] = [
    {
        title: 'Service Name',
        dataIndex: 'serviceName',
        key: 'serviceName',
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
    },
    {
        title: 'Attributes',
        dataIndex: 'attributes',
        key: 'attributes',
    },
]

export default function PermissionList({ permissions }: PermissionListProps) {
    return <Table columns={columns} dataSource={permissions} rowKey="id" />;
}
