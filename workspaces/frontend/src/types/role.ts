import type { Permission } from '@/types/permission';

export type Role = {
    id: string;
    name: string;
    description?: string;
    permissions?: Permission[];
};

export type CreateRoleDto = Omit<Role, 'id' | 'permissions'>;
export type UpdateRoleDto = Omit<Role, 'id' | 'permissions'>;
