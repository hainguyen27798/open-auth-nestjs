import type { DefaultModel } from '@/types/default-model';
import type { Permission } from '@/types/permission';

export type Role = DefaultModel & {
    name: string;
    description?: string;
    permissions?: Permission[];
};

export type CreateRoleDto = Pick<Role, 'name' | 'description'>;
export type UpdateRoleDto = CreateRoleDto;
