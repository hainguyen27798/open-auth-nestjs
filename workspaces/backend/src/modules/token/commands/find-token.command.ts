import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';

import { Token } from '@/modules/token/entities/token.entity';
import { TokenService } from '@/modules/token/token.service';

export class FindTokenCommand implements ICommand {
    constructor(public readonly session: string) {}
}

@CommandHandler(FindTokenCommand)
export class FindTokenHandler implements ICommandHandler<FindTokenCommand, Token> {
    constructor(private _TokenService: TokenService) {}

    execute(command: FindTokenCommand): Promise<Token> {
        return this._TokenService.findToken(command.session);
    }
}
