import { BadRequestException, ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import _ from 'lodash';

import { SuccessDto } from '@/common';
import { BcryptHelper } from '@/helpers';
import { GetPermissionsByRoleIdCommand } from '@/modules/role/commands';
import { Role } from '@/modules/role/entities/role.entity';
import { GenerateTokenCommand, RemoveTokenCommand } from '@/modules/token/commands';
import { RemoveTokenByKey } from '@/modules/token/constants';
import { PairSecretToken, PairSecretTokenType } from '@/modules/token/types';
import { FindUserByCommand } from '@/modules/user/commands';
import { User } from '@/modules/user/entities/user.entity';
import { JwtPayload } from '@/types';

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

                const groupPermissionsByMethod = _.groupBy(role.permissions, 'permissionAccessMethod');
                const permissions = _.reduce(
                    _.keys(groupPermissionsByMethod),
                    (rs, method) => ({
                        ...rs,
                        [method]: _.reduce(
                            groupPermissionsByMethod[method],
                            (rsMethod, permission) => ({
                                ...rsMethod,
                                [permission?.permissionAccessPath]: true,
                            }),
                            {},
                        ),
                    }),
                    {},
                );

                const payload: JwtPayload = {
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

    private async generateToken(payload: JwtPayload, createNew = false): Promise<PairSecretTokenType> {
        return this._CommandBus.execute(new GenerateTokenCommand(payload, createNew));
    }

    private async removeToken(by: RemoveTokenByKey, value: string): Promise<boolean> {
        return this._CommandBus.execute(new RemoveTokenCommand(by, value));
    }
}
