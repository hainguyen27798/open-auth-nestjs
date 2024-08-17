import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Role } from '@/modules/role/entities/role.entity';
import { RoleService } from '@/modules/role/role.service';

export class GetPermissionsByRoleIdCommand implements ICommand {
    constructor(public readonly id: UUID) {}
}

@CommandHandler(GetPermissionsByRoleIdCommand)
export class GetPermissionsByRoleIdHandler implements ICommandHandler<GetPermissionsByRoleIdCommand, Role> {
    constructor(private readonly _RoleService: RoleService) {}

    execute(command: GetPermissionsByRoleIdCommand) {
        return this._RoleService.getPermissionsByRoleId(command.id);
    }
}
