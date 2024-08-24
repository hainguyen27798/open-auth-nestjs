'use client';

import { UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Divider, Dropdown } from 'antd';
import { LogOut, UserRound } from 'lucide-react';
import Image from 'next/image';

import { logoutAction } from '@/_actions/logout.action';
import { Link } from '@/navigation';

export default function Header() {
    const onLogout = () => {
        logoutAction().then();
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Link href={'/profile'} className="flex items-center gap-2">
                    <UserRound size={16} /> My Profile
                </Link>
            ),
        },
        {
            key: '2',
            label: (
                <div onClick={onLogout} className="flex items-center gap-2">
                    <LogOut size={16} /> Logout
                </div>
            ),
        },
    ];

    return (
        <div className="fixed z-50 flex h-14 w-full items-center justify-between bg-default px-4">
            <div className="flex items-center">
                <Image src="/img/logo-white.png" alt="logo" width="32" height="32" priority={true} />
                <Divider type="vertical" className="ml-4 h-6 border-gray-500" />
            </div>
            <div className="h-full">
                <Dropdown menu={{ items }} placement="bottomRight">
                    <div className="flex h-full items-center">
                        <Avatar icon={<UserOutlined />} className="bg-gray-500" />
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}
