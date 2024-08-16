import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/common';
import { PermissionAccessMethod } from '@/modules/role/constants';

const TABLE_NAME = 'permissions';

@Entity({ name: TABLE_NAME })
export class Permission extends AbstractEntity {
    @Column({ name: 'service_name', type: 'varchar', length: 255 })
    serviceName: string;

    @Column({ name: 'permission_access_path', type: 'varchar', length: 255 })
    permissionAccessPath: string;

    @Column({ name: 'permission_access_method', type: 'enum', enum: PermissionAccessMethod })
    permissionAccessMethod: PermissionAccessMethod;

    @Column({ type: 'text', nullable: true })
    description: string;
}
