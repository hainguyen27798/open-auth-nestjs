import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { FindOptionsWhere } from 'typeorm';

import { User } from '@/modules/user/entities/user.entity';
import { UserService } from '@/modules/user/user.service';

export class FindUserByCommand implements ICommand {
    constructor(public readonly query: FindOptionsWhere<User>) {}
}

@CommandHandler(FindUserByCommand)
export class FindUserByHandler implements ICommandHandler<FindUserByCommand, User> {
    constructor(private _UserService: UserService) {}

    execute(command: FindUserByCommand) {
        return this._UserService.findUserBy(command.query);
    }
}
