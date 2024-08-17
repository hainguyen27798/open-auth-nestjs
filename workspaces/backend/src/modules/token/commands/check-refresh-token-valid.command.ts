import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { TokenService } from '@/modules/token/token.service';
import { TAuthUser } from '@/types';

export class CheckRefreshTokenValidCommand implements ICommand {
    constructor(
        public readonly payload: TAuthUser,
        public readonly oldRefreshToken: string,
    ) {}
}

@CommandHandler(CheckRefreshTokenValidCommand)
export class CheckRefreshTokenValidHandler implements ICommandHandler<CheckRefreshTokenValidCommand, boolean> {
    constructor(private _TokenService: TokenService) {}

    execute(command: CheckRefreshTokenValidCommand) {
        return this._TokenService.checkRefreshTokenValid(command.payload, command.oldRefreshToken);
    }
}
