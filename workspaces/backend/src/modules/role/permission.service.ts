import { BadRequestException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Like, Repository } from 'typeorm';

import { PageOptionsDto, SuccessDto } from '@/common';
import { GRANT_ALL_SERVICE, GRANT_ANY, GRANT_ANY_ATTRIBUTES, GRANT_OPERATION } from '@/modules/role/constants/grant';
import { CreatePermissionDto, UpdatePermissionDto } from '@/modules/role/dto';
import { Permission } from '@/modules/role/entities/permission.entity';

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private readonly _PermissionRepository: Repository<Permission>) {}

    createSuperPermission() {
        return this._PermissionRepository.create({
            serviceName: GRANT_ALL_SERVICE,
            resource: GRANT_ANY,
            action: `${GRANT_OPERATION.ANY}:${GRANT_ANY}`,
            attributes: GRANT_ANY_ATTRIBUTES,
            canModify: false,
        });
    }

    async getAll(pageOption: PageOptionsDto) {
        const where: FindOptionsWhere<Permission> = {};

        if (pageOption.by) {
            where[pageOption.by] = Like(`%${pageOption.search}%`);
        }

        const [permissions, total] = await this._PermissionRepository.findAndCount({
            where,
            take: pageOption.take,
            skip: pageOption.skip,
        });

        return new SuccessDto(null, HttpStatus.OK, {
            data: permissions.toDtos(),
            metadata: { total },
        });
    }

    async getById(id: UUID) {
        const permission = await this._PermissionRepository.findOneBy({ id });

        if (!permission) {
            throw new NotFoundException('permission_not_found');
        }

        return new SuccessDto(null, HttpStatus.OK, permission.toDto());
    }

    async create(payload: CreatePermissionDto) {
        const permission = await this._PermissionRepository.save(this._PermissionRepository.create(payload));
        return new SuccessDto('create_permission_success', HttpStatus.CREATED, permission.toDto());
    }

    async update(id: UUID, payload: UpdatePermissionDto) {
        const permission = await this._PermissionRepository.findOneBy({ id });

        if (!permission) {
            throw new NotFoundException('permission_not_found');
        }

        if (!permission.canModify) {
            throw new BadRequestException('can_not_modify');
        }

        await this._PermissionRepository.save({
            id,
            ...payload,
        });

        return new SuccessDto('update_permission_success');
    }

    async delete(id: UUID) {
        const res = await this._PermissionRepository.delete({
            id,
            canModify: true,
        });

        if (!res.affected) {
            throw new BadRequestException('permission_not_found_or_can_not_delete');
        }

        return new SuccessDto('delete_permission_success');
    }

    async checkPermissionIdsExists(id: UUID) {
        const permission = await this._PermissionRepository.findOneBy({ id });

        if (!permission) {
            throw new NotFoundException('permission_not_found');
        }

        return permission;
    }
}
