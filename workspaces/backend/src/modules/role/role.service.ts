import { BadRequestException, ConflictException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, FindOptionsWhere, Like, Repository } from 'typeorm';

import { PageOptionsDto, SuccessDto } from '@/common';
import { SUPERUSER } from '@/constants';
import { CreateRoleDto, UpdateRoleDto, UpdateRolePermissionDto } from '@/modules/role/dto';
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
            const permission = this._PermissionService.createSuperPermission();

            await entityManager.save(permission);

            return entityManager.save(
                this._RoleRepository.create({
                    name: SUPERUSER,
                    permissions: [permission],
                    canModify: false,
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

    async getAll(pageOption: PageOptionsDto) {
        const where: FindOptionsWhere<Role> = {};

        if (pageOption.by) {
            where[pageOption.by] = Like(`%${pageOption.search}%`);
        }

        const [roles, total] = await this._RoleRepository.findAndCount({
            where,
            take: pageOption.take,
            skip: pageOption.skip,
        });

        return new SuccessDto(null, HttpStatus.OK, {
            data: roles.toDtos(),
            metadata: { total },
        });
    }

    async create(payload: CreateRoleDto) {
        const roleExisting = await this._RoleRepository.findOneBy({ name: payload.name });

        if (roleExisting) {
            throw new BadRequestException('role_is_exist');
        }

        const newRole = await this._RoleRepository.save(
            this._RoleRepository.create({
                name: payload.name,
                permissions: [],
                description: payload.description,
            }),
        );

        return new SuccessDto('create_role_success', HttpStatus.CREATED, newRole.toDto());
    }

    async update(id: UUID, payload: UpdateRoleDto) {
        const role = await this._RoleRepository.findOneBy({
            id,
        });

        if (!role) {
            throw new NotFoundException('role_not_found');
        }

        if (!role.canModify && role.name !== payload.name) {
            throw new BadRequestException('can_not_modify');
        }

        role.name = payload.name;
        role.description = payload.description;

        await this._RoleRepository.save(role);

        return new SuccessDto('update_role_success');
    }

    async addPermissionForRole(id: UUID, payload: UpdateRolePermissionDto) {
        const role = await this._RoleRepository.findOne({
            where: { id },
            relations: {
                permissions: true,
            },
        });

        if (!role) {
            throw new NotFoundException('role_not_found');
        }

        if (!role.canModify) {
            throw new BadRequestException('can_not_modify');
        }

        if (role.permissions.some((permission) => permission.id === payload.permissionId)) {
            throw new ConflictException('role_permission_exists');
        }

        const permission = await this._PermissionService.checkPermissionIdsExists(payload.permissionId);

        await this._RoleRepository.save(
            {
                id,
                permissions: [...role.permissions, permission],
            },
            {
                transaction: true,
            },
        );

        return new SuccessDto('add_permission_for_role_success');
    }

    async deleteRolePermission(id: UUID, permissionId: UUID) {
        const role = await this._RoleRepository.findOne({
            where: { id },
            relations: {
                permissions: true,
            },
        });

        if (!role) {
            throw new NotFoundException('role_or_permission_not_found');
        }

        if (!role.canModify) {
            throw new BadRequestException('can_not_delete_role_permission');
        }

        const permissions = role.permissions.filter((permission) => permission.id !== permissionId);

        await this._RoleRepository.save(
            { id, permissions },
            {
                transaction: true,
            },
        );

        return new SuccessDto('delete_role_permission_success');
    }

    async delete(id: UUID) {
        const res = await this._RoleRepository.delete({
            id,
            canModify: true,
        });

        if (!res.affected) {
            throw new BadRequestException('role_not_found_or_can_not_delete');
        }

        return new SuccessDto('delete_role_success');
    }
}
