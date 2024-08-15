import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

import { AbstractEntity } from '@/common';
import { Permission } from '@/modules/role/entities/permission.entity';

const TABLE_NAME = 'roles';

@Entity({ name: TABLE_NAME })
export class Role extends AbstractEntity {
    @Column({ type: 'varchar' })
    name: string;

    @ManyToMany(() => Permission)
    @JoinTable({
        name: 'roles_permissions',
    })
    permissions: Permission[];

    @Column({ type: 'text', nullable: true })
    description: string;
}
