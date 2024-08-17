import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import crypto from 'crypto';
import dayjs from 'dayjs';
import { DurationUnitType } from 'dayjs/plugin/duration';
import _ from 'lodash';
import { DataSource, LessThan, Repository } from 'typeorm';

import { RemoveTokenByKey, TokenExpires } from '@/modules/token/constants';
import { RefreshTokenUsed } from '@/modules/token/entities/refresh-token-used.entity';
import { Token } from '@/modules/token/entities/token.entity';
import { PairSecretTokenType, TToken } from '@/modules/token/types';
import { TAuthUser } from '@/types';

@Injectable()
export class TokenService {
    constructor(
        @InjectRepository(Token) private _TokenRepository: Repository<Token>,
        @InjectRepository(RefreshTokenUsed) private _RefreshTokenUsedRepository: Repository<RefreshTokenUsed>,
        private readonly _DataSource: DataSource,
        private _JwtService: JwtService,
    ) {}

    async findToken(session: string): Promise<Token> {
        return this._TokenRepository.findOneBy({ session });
    }

    async removeToken(by: RemoveTokenByKey, value: string): Promise<boolean> {
        const tokenData = await this._TokenRepository.delete({ [by]: value });

        return !!tokenData.affected;
    }

    async generateToken(payload: TAuthUser, createNew = false): Promise<PairSecretTokenType> {
        if (createNew) {
            payload.session = this.createSession();
        }

        // create pair jwt token
        const accessToken: string = this.createJwtToken(payload, TokenExpires.ACCESS_TOKEN);
        const refreshToken: string = this.createJwtToken(payload, TokenExpires.REFRESH_TOKEN);

        // update refresh token
        await this.saveToken(
            {
                userId: payload.userId,
                refreshToken: refreshToken,
                session: payload.session,
            },
            createNew,
        );

        return { refreshToken, accessToken };
    }

    async checkRefreshTokenValid(payload: TAuthUser, oldRefreshToken: string): Promise<boolean> {
        const oldRefreshTokenExisting = await this._RefreshTokenUsedRepository.findOneBy({
            refreshToken: oldRefreshToken,
        });

        if (!!oldRefreshTokenExisting) {
            // remove token
            await this.removeToken(RemoveTokenByKey.session, payload.session);
            throw new BadRequestException('account_was_stolen');
        }

        await this._TokenRepository.findOneByOrFail({
            userId: payload.userId,
            session: payload.session,
            refreshToken: oldRefreshToken,
        });

        return true;
    }

    private createJwtToken(payload: TAuthUser, expiresIn: string) {
        return this._JwtService.sign(payload, {
            expiresIn,
        });
    }

    private createSession(): string {
        return crypto.randomBytes(32).toString('hex');
    }

    async verifyToken(token: string): Promise<TAuthUser> {
        return this._JwtService.verify(token);
    }

    extractToken(token: string): TAuthUser {
        return this._JwtService.decode(token) as TAuthUser;
    }

    async clearTokens() {
        const regex = /^(\d+)([a-z]+)$/i;
        const matches = TokenExpires.REFRESH_TOKEN.match(regex);
        const amount = _.get(matches, 1);
        const unit = _.get(matches, 2) as DurationUnitType;

        const duration = dayjs.duration(_.toNumber(amount), unit);
        const time = dayjs().subtract(duration).toDate();
        await this._TokenRepository.delete({
            updatedAt: LessThan(time),
        });
    }

    private async saveToken(token: TToken, createNew = false): Promise<Token> {
        if (createNew) {
            return this._TokenRepository.save(this._TokenRepository.create(token));
        }

        const { userId, session } = token;
        const tokenExisted = await this._TokenRepository.findOneBy({ userId, session });

        return this._DataSource.manager.transaction(async (entityManager) => {
            const refreshTokenUsed = this._RefreshTokenUsedRepository.create({
                tokenId: tokenExisted.id,
                refreshToken: tokenExisted.refreshToken,
            });
            await entityManager.save(refreshTokenUsed);

            tokenExisted.refreshToken = token.refreshToken;
            return entityManager.save(tokenExisted);
        });
    }
}
