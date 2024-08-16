import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

import { handlers } from '@/modules/user/commands';
import { User } from '@/modules/user/entities/user.entity';

import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
    providers: [UserService, ...handlers],
    imports: [TypeOrmModule.forFeature([User]), CqrsModule],
})
export class UserModule {}
