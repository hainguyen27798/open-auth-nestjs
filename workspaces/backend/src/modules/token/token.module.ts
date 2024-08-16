import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RefreshTokenUsed } from '@/modules/token/entities/refresh-token-used.entity';
import { Token } from '@/modules/token/entities/token.entity';

import { TokenService } from './token.service';

@Module({
    providers: [TokenService],
    imports: [TypeOrmModule.forFeature([Token, RefreshTokenUsed])],
})
export class TokenModule {}
