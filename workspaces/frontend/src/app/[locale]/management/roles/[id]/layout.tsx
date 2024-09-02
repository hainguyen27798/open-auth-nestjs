import type React from 'react';

import { RoleDetails } from '@/components/pages/management/roles';

export default function RoleDetailsLayout({ children }: React.PropsWithChildren) {
    return <RoleDetails>{children}</RoleDetails>;
}
