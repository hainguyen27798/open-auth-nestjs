export type Permission = {
    id: string;
    serviceName: string;
    resource: string;
    action: string;
    attributes: string;
    description?: string;
};

export type CreatePermission = Omit<Permission, 'id'>;
