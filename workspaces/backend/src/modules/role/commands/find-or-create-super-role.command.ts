import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { EntityManager } from 'typeorm';

import { Role } from '@/modules/role/entities/role.entity';
import { RoleService } from '@/modules/role/role.service';

export class FindOrCreateSuperRoleCommand implements ICommand {
    constructor(public readonly entityManager: EntityManager) {}
}

@CommandHandler(FindOrCreateSuperRoleCommand)
export class FindOrCreateSuperRoleHandler implements ICommandHandler<FindOrCreateSuperRoleCommand, Role> {
    constructor(private readonly _RoleService: RoleService) {}

    execute(command: FindOrCreateSuperRoleCommand) {
        return this._RoleService.createAdminRole(command.entityManager);
    }
}
