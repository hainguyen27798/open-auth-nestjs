import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { SUPERUSER } from '@/constants';
import { PermissionAccessMethod } from '@/modules/role/constants';
import { Permission } from '@/modules/role/entities/permission.entity';
import { Role } from '@/modules/role/entities/role.entity';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly _RoleRepository: Repository<Role>,
        @InjectRepository(Permission) private readonly _PermissionsRepository: Repository<Permission>,
    ) {}

    async createAdminRole(entityManager: EntityManager) {
        const role = await this._RoleRepository.findOneBy({ name: SUPERUSER });

        if (!role) {
            const permission = this._PermissionsRepository.create({
                serviceName: '*',
                permissionAccessPath: '*',
                permissionAccessMethod: PermissionAccessMethod['*'],
            });

            await entityManager.save(permission);

            return entityManager.save(
                this._RoleRepository.create({
                    name: SUPERUSER,
                    permissions: [permission],
                }),
            );
        }

        return role;
    }

    async getPermissionsByRoleId(id: UUID) {
        return this._RoleRepository.findOne({
            where: {
                id
            },
            relations: {
                permissions: true
            }
        })
    }
}
