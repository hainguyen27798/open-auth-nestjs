'use client';

import { ChevronsLeft, ShieldCheck, UserCheck2, UsersRound } from 'lucide-react';
import { useState } from 'react';

import { Link } from '@/navigation';

export default function Navigation() {
    const [collapsed, setCollapsed] = useState(false);

    const items = [
        { key: '1', icon: <UsersRound size={20} />, route: 'users', label: 'Users' },
        { key: '2', icon: <UserCheck2 size={20} />, route: 'roles', label: 'Roles' },
        { key: '3', icon: <ShieldCheck size={20} />, route: 'permissions', label: 'Permissions' },
    ];

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div
            className="flex h-full flex-col justify-between overflow-hidden border-r border-gray-300 bg-white pt-3 transition-all"
            style={{ width: collapsed ? '65px' : '180px' }}
        >
            <div className="flex flex-col gap-2">
                {items.map((item) => (
                    <Link
                        href={item.route}
                        key={item.key}
                        className="flex h-8 min-w-16 cursor-pointer items-center gap-2 px-[22px] text-default hover:text-violet-500"
                    >
                        <div className="flex justify-center">{item.icon}</div>
                        <div className={`text-nowrap transition-opacity ${collapsed ? 'hidden opacity-0' : 'opacity'}`}>
                            {item.label}
                        </div>
                    </Link>
                ))}
            </div>
            <div
                className={`flex h-16 items-center ${collapsed ? 'justify-center' : 'justify-end'} border-t border-gray-300 px-4`}
                onClick={toggleCollapsed}
            >
                <ChevronsLeft />
            </div>
        </div>
    );
}
