export type Permission = {
    id: string;
    serviceName: string;
    resource: string;
    action: string;
    attributes: string;
    description?: string;
};

export type CreatePermissionDto = Omit<Permission, 'id'>;
export type UpdatePermissionDto = Omit<Permission, 'id' | 'serviceName' | 'resource'>;
