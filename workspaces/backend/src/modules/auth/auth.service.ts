import {
    BadRequestException,
    ConflictException,
    ForbiddenException,
    HttpStatus,
    Injectable,
    Logger,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import _ from 'lodash';

import { SuccessDto } from '@/common';
import { BcryptHelper } from '@/helpers';
import { GetPermissionsByRoleIdCommand } from '@/modules/role/commands';
import { GRANT_ANY_ATTRIBUTES } from '@/modules/role/constants/grant';
import { Role } from '@/modules/role/entities/role.entity';
import {
    CheckRefreshTokenValidCommand,
    GenerateTokenCommand,
    RemoveTokenCommand,
    VerifyTokenCommand,
} from '@/modules/token/commands';
import { RemoveTokenByKey } from '@/modules/token/constants';
import { PairSecretToken, PairSecretTokenType } from '@/modules/token/types';
import { FindUserByCommand } from '@/modules/user/commands';
import { User } from '@/modules/user/entities/user.entity';
import { TAuthUser } from '@/types';

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
                const role: Role = await this._CommandBus.execute(
                    new GetPermissionsByRoleIdCommand(currentAccount.roleId),
                );

                const permissions = _.map(
                    role.permissions,
                    (permission) =>
                        `${permission.resource}:${permission.action}${permission.attributes !== GRANT_ANY_ATTRIBUTES ? `[${permission.attributes}]` : ''}`,
                );

                const payload: TAuthUser = {
                    name: currentAccount.name,
                    userId: currentAccount.id,
                    email: currentAccount.email,
                    permissions,
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

    async handleRefreshToken(refreshToken: string) {
        let userPayload: TAuthUser;

        try {
            const payload = await this.verifyToken(refreshToken);

            userPayload = {
                userId: payload.userId,
                name: payload.name,
                email: payload.email,
                permissions: payload.permissions,
                session: payload.session,
            };

            await this.checkRefreshTokenValid(userPayload, refreshToken);
        } catch (e) {
            Logger.error(e.toString());
            // remove token
            await this.removeToken(RemoveTokenByKey.refreshToken, refreshToken);
            throw new ForbiddenException('token_is_expired_or_invalid');
        }

        const tokenObj: PairSecretToken = await this.generateToken(userPayload);

        return new SuccessDto(null, HttpStatus.OK, tokenObj);
    }

    async logout(refreshToken: string): Promise<SuccessDto> {
        const isSuccess: boolean = await this.removeToken(RemoveTokenByKey.refreshToken, refreshToken);
        if (isSuccess) {
            return new SuccessDto('logout_successfully');
        }
        throw new BadRequestException('Invalid Token');
    }

    private async findUserByEmail(email: string): Promise<User> {
        return this._CommandBus.execute(new FindUserByCommand({ email }));
    }

    private async generateToken(payload: TAuthUser, createNew = false): Promise<PairSecretTokenType> {
        return this._CommandBus.execute(new GenerateTokenCommand(payload, createNew));
    }

    private async removeToken(by: RemoveTokenByKey, value: string): Promise<boolean> {
        return this._CommandBus.execute(new RemoveTokenCommand(by, value));
    }

    private async verifyToken(token: string): Promise<TAuthUser> {
        return this._CommandBus.execute(new VerifyTokenCommand(token));
    }

    private async checkRefreshTokenValid(payload: TAuthUser, oldRefreshToken: string): Promise<boolean> {
        return this._CommandBus.execute(new CheckRefreshTokenValidCommand(payload, oldRefreshToken));
    }
}
