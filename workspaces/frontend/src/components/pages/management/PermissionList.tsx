'use client';

import type { TableProps } from 'antd';
import { Table } from 'antd';
import useSWR from 'swr';

import { getPermissions } from '@/_actions/permission.action';
import type { Permission } from '@/types';

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
];

export default function PermissionList() {
    const { data } = useSWR({}, getPermissions);

    return <Table columns={columns} dataSource={data} rowKey="id" />;
}
