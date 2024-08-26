import type React from 'react';

import Header from '@/components/layouts/Header';
import Navigation from '@/components/layouts/Navigation';

export default function MainLayout({ children }: React.PropsWithChildren) {
    return (
        <div className="flex h-screen flex-col">
            <Header />
            <div className="flex w-full flex-1 pt-14">
                <Navigation />
                <div className="flex-1">
                    <div className="container m-auto px-6 py-10 text-sm">{children}</div>
                </div>
            </div>
        </div>
    );
}
