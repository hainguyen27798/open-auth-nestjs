import type React from 'react';

import Header from '@/components/layouts/Header';

export default function MainLayout({ children }: React.PropsWithChildren) {
    return (
        <div>
            <Header />
            <div className="pt-14">{children}</div>
        </div>
    );
}
