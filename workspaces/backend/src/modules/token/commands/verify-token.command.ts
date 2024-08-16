import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { TokenService } from '@/modules/token/token.service';
import { JwtPayload } from '@/types';

export class VerifyTokenCommand implements ICommand {
    constructor(public readonly token: string) {}
}

@CommandHandler(VerifyTokenCommand)
export class VerifyTokenHandler implements ICommandHandler<VerifyTokenCommand, JwtPayload> {
    constructor(private _TokenService: TokenService) {}

    async execute(command: VerifyTokenCommand): Promise<JwtPayload> {
        return this._TokenService.verifyToken(command.token);
    }
}
