import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/common';
import { UseDto } from '@/decorators';
import { PermissionDto } from '@/modules/role/dto';

const TABLE_NAME = 'permissions';

@Entity({ name: TABLE_NAME })
@UseDto(PermissionDto)
export class Permission extends AbstractEntity<PermissionDto> {
    @Column({ name: 'service_name', type: 'varchar', length: 255 })
    serviceName: string;

    @Column({ type: 'varchar', length: 255 })
    resource: string;

    @Column({ type: 'varchar', length: 255 })
    action: string;

    @Column({ type: 'text' })
    attributes: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'can_modify', type: 'boolean', default: true })
    canModify: boolean;
}
