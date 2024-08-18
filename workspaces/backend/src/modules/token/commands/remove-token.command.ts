import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { RemoveTokenByKey } from '@/modules/token/constants';
import { TokenService } from '@/modules/token/token.service';

export class RemoveTokenCommand implements ICommand {
    constructor(
        public readonly by: RemoveTokenByKey,
        public readonly value: string,
    ) {}
}

@CommandHandler(RemoveTokenCommand)
export class RemoveTokenHandler implements ICommandHandler<RemoveTokenCommand, boolean> {
    constructor(private _TokenService: TokenService) {}

    execute(command: RemoveTokenCommand): Promise<boolean> {
        return this._TokenService.removeToken(command.by, command.value);
    }
}
