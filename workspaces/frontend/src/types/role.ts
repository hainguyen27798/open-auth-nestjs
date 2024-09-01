export type Role = {
    id: string;
    name: string;
    description?: string;
};

export type CreateRoleDto = Omit<Role, 'id'>;
export type UpdateRoleDto = Omit<Role, 'id'>;
