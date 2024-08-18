export * from './find-or-create-super-role.command';
export * from './get-permissions-by-role-id.command';

import { FindOrCreateSuperRoleHandler } from '@/modules/role/commands/find-or-create-super-role.command';
import { GetPermissionsByRoleIdHandler } from '@/modules/role/commands/get-permissions-by-role-id.command';

export const handlers = [FindOrCreateSuperRoleHandler, GetPermissionsByRoleIdHandler];
