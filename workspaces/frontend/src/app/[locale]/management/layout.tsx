import React from 'react';

import { MainLayout } from '@/components/layouts';

export default function DashboardLayout({ children }: React.PropsWithChildren) {
    return <MainLayout>{children}</MainLayout>;
}
