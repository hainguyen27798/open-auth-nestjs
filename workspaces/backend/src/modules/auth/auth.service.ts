import { BadRequestException, ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

import { SuccessDto } from '@/common';
import { BcryptHelper } from '@/helpers';
import { GenerateTokenCommand } from '@/modules/token/commands';
import { JwtPayload, PairSecretToken, PairSecretTokenType } from '@/modules/token/types';
import { FindUserByCommand } from '@/modules/user/commands';
import { User } from '@/modules/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(private readonly _CommandBus: CommandBus) {}

    async validateUser(email: string, password: string): Promise<SuccessDto> {
        const currentAccount = await this.findUserByEmail(email);

        // Todo: it will be enable later
        // if (currentAccount.status !== UserStatus.ACTIVE) {
        //     throw new BadRequestException('account_is_inactivated_or_blocked');
        // }

        if (currentAccount) {
            if (await BcryptHelper.validatePassword(password, currentAccount.password)) {
                const payload: JwtPayload = {
                    name: currentAccount.name,
                    userId: currentAccount.id,
                    email: currentAccount.email,
                };

                // create jwt token
                const tokenObj: PairSecretToken = await this.generateToken(payload, true);

                if (tokenObj) {
                    return new SuccessDto('login_successfully', HttpStatus.OK, {
                        ...payload,
                        ...tokenObj,
                    });
                }
                throw new ConflictException('account_is_logged');
            }
        }
        throw new BadRequestException('email_or_password_is_incorrect');
    }

    private async findUserByEmail(email: string): Promise<User> {
        return this._CommandBus.execute(new FindUserByCommand({ email }));
    }

    private async generateToken(payload: JwtPayload, createNew = false): Promise<PairSecretTokenType> {
        return this._CommandBus.execute(new GenerateTokenCommand(payload, createNew));
    }
}
