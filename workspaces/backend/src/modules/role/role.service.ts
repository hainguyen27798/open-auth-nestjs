import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { SUPERUSER } from '@/constants';
import { Role } from '@/modules/role/entities/role.entity';
import { PermissionService } from '@/modules/role/permission.service';

@Injectable()
export class RoleService {
    constructor(
        @InjectRepository(Role) private readonly _RoleRepository: Repository<Role>,
        private readonly _PermissionService: PermissionService,
    ) {}

    async createAdminRole(entityManager: EntityManager) {
        const role = await this._RoleRepository.findOneBy({ name: SUPERUSER });

        if (!role) {
            const permission = this._PermissionService.createSuperRole();

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
                id,
            },
            relations: {
                permissions: true,
            },
        });
    }
}
