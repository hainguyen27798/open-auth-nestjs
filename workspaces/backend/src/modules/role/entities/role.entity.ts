import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { AbstractEntity } from '@/common';
import { UseDto } from '@/decorators';
import { RoleDto } from '@/modules/role/dto';
import { Permission } from '@/modules/role/entities/permission.entity';

const TABLE_NAME = 'roles';

@Entity({ name: TABLE_NAME })
@UseDto(RoleDto)
export class Role extends AbstractEntity<RoleDto> {
    @Column({ type: 'varchar', unique: true })
    name: string;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'roles_permissions',
        joinColumn: { name: 'role_id' },
        inverseJoinColumn: { name: 'permission_id' },
    })
    permissions: Permission[];

    @Column({ type: 'text', nullable: true })
    description: string;
}
