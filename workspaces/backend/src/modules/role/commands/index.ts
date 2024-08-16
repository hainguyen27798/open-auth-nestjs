export * from './find-or-create-super-role.command';

import { FindOrCreateSuperRoleHandler } from '@/modules/role/commands/find-or-create-super-role.command';

export const handlers = [FindOrCreateSuperRoleHandler];
