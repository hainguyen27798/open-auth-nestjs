import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { handlers } from '@/modules/role/commands';
import { Permission } from '@/modules/role/entities/permission.entity';
import { Role } from '@/modules/role/entities/role.entity';

import { PermissionController } from './permission.controller';
import { PermissionService } from './permission.service';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
    controllers: [RoleController, PermissionController],
    providers: [RoleService, ...handlers, PermissionService],
    imports: [TypeOrmModule.forFeature([Role, Permission])],
})
export class RoleModule {}
