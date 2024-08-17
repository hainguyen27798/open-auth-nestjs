import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { JwtConfig } from '@/config';
import { handlers } from '@/modules/token/commands';
import { ClearTokenCron } from '@/modules/token/cron/clear-token.cron';
import { RefreshTokenUsed } from '@/modules/token/entities/refresh-token-used.entity';
import { Token } from '@/modules/token/entities/token.entity';
import { JwtStrategy } from '@/modules/token/strategies/jwt.strategy';

import { TokenService } from './token.service';

@Module({
    providers: [TokenService, ClearTokenCron, JwtStrategy, ...handlers],
    imports: [
        TypeOrmModule.forFeature([Token, RefreshTokenUsed]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useClass: JwtConfig,
        }),
    ],
})
export class TokenModule {}
