import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { SuccessDto } from '@/common';
import { SUPERUSER } from '@/constants';
import { CreateRoleDto, UpdateRoleDto } from '@/modules/role/dto';
import { Permission } from '@/modules/role/entities/permission.entity';
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

    async getById(id: UUID) {
        const role = await this._RoleRepository.findOne({
            where: { id },
            relations: {
                permissions: true,
            },
        });

        if (!role) {
            throw new NotFoundException('role_not_found');
        }

        return new SuccessDto(null, HttpStatus.OK, role.toDto());
    }

    async create(payload: CreateRoleDto) {
        const roleExisting = await this._RoleRepository.findOneBy({ name: payload.name });
        let permissions: Permission[];

        if (roleExisting) {
            throw new BadRequestException('role_is_exist');
        }

        if (payload.permissionIds) {
            permissions = await this._PermissionService.checkPermissionIdsExists(payload.permissionIds);
        }

        const newRole = await this._RoleRepository.save(
            this._RoleRepository.create({
                name: payload.name,
                permissions: permissions,
                description: payload.description,
            }),
            {
                transaction: true,
            },
        );

        return new SuccessDto('create_role_success', HttpStatus.CREATED, newRole.toDto());
    }

    async update(id: UUID, payload: UpdateRoleDto) {
        let permissions: Permission[];
        const role = await this._RoleRepository.findOneBy({
            id,
        });

        if (!role) {
            throw new NotFoundException('role_not_found');
        }

        if (payload.permissionIds) {
            permissions = await this._PermissionService.checkPermissionIdsExists(payload.permissionIds);
        }

        await this._RoleRepository.save(
            {
                id,
                permissions: permissions,
                description: payload.description,
            },
            {
                transaction: true,
            },
        );

        return new SuccessDto('update_role_success');
    }

    async delete(id: UUID) {
        const res = await this._RoleRepository.delete({
            id,
        });

        if (!res.affected) {
            throw new NotFoundException('role_not_found');
        }

        return new SuccessDto('delete_role_success');
    }
}
