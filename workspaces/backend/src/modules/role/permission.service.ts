import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SuccessDto } from '@/common';
import { GRANT_ALL_SERVICE, GRANT_ANY, GRANT_ANY_ATTRIBUTES, GRANT_OPERATION } from '@/modules/role/constants/grant';
import { CreatePermissionDto, UpdatePermissionDto } from '@/modules/role/dto';
import { Permission } from '@/modules/role/entities/permission.entity';

@Injectable()
export class PermissionService {
    constructor(@InjectRepository(Permission) private readonly _PermissionsRepository: Repository<Permission>) {}

    createSuperRole() {
        return this._PermissionsRepository.create({
            serviceName: GRANT_ALL_SERVICE,
            resource: GRANT_ANY,
            action: `${GRANT_OPERATION.ANY}:${GRANT_ANY}`,
            attributes: GRANT_ANY_ATTRIBUTES,
        });
    }

    async getAll() {
        const permissions = await this._PermissionsRepository.find();
        return new SuccessDto(null, HttpStatus.OK, permissions.toDtos());
    }

    async getById(id: UUID) {
        const permission = await this._PermissionsRepository.findOneBy({ id });

        if (!permission) {
            throw new NotFoundException('permission_not_found');
        }

        return new SuccessDto(null, HttpStatus.OK, permission.toDto());
    }

    async create(payload: CreatePermissionDto) {
        const permission = await this._PermissionsRepository.save(this._PermissionsRepository.create(payload));
        return new SuccessDto('create_permission_success', HttpStatus.CREATED, permission.toDto());
    }

    async update(id: UUID, payload: UpdatePermissionDto) {
        await this._PermissionsRepository.save({
            id,
            ...payload,
        });
        return new SuccessDto('update_permission_success');
    }

    async delete(id: UUID) {
        const res = await this._PermissionsRepository.delete({
            id,
        });

        if (!res.affected) {
            throw new NotFoundException('permission_not_found');
        }

        return new SuccessDto('delete_permission_success');
    }
}
