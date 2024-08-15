import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Permission } from '@/modules/role/entities/permission.entity';
import { Role } from '@/modules/role/entities/role.entity';

import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
    controllers: [RoleController],
    providers: [RoleService],
    imports: [TypeOrmModule.forFeature([Role, Permission])],
})
export class RoleModule {}
