export type Permission = {
    id: string;
    serviceName: string;
    resource: string;
    action: string;
    attributes: string;
    description?: string;
};
