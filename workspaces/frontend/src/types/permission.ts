import type { DefaultModel } from '@/types/default-model';

export type Permission = DefaultModel & {
    serviceName: string;
    resource: string;
    action: string;
    attributes: string;
    description?: string;
};

export type CreatePermissionDto = Pick<
    Permission,
    'resource' | 'action' | 'attributes' | 'description' | 'serviceName'
>;
export type UpdatePermissionDto = Omit<CreatePermissionDto, 'serviceName' | 'resource'>;
