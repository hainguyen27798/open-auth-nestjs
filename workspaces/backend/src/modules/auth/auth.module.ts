import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { LocalAuthStrategy } from '@/modules/auth/strategies/local-auth.strategy';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalAuthStrategy],
    imports: [CqrsModule],
})
export class AuthModule {}
