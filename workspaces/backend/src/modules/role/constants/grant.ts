export const GRANT_ALL_SERVICE = 'all';
export const GRANT_ANY = 'any';
export const GRANT_ANY_ATTRIBUTES = '*';

export enum GRANT_OPERATION {
    ANY = '*',
    READ = 'read',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
}

export enum GRANT_OPERATION_METHOD {
    GET = GRANT_OPERATION.READ,
    POST = GRANT_OPERATION.CREATE,
    PATCH = GRANT_OPERATION.UPDATE,
    DELETE = GRANT_OPERATION.DELETE,
}
