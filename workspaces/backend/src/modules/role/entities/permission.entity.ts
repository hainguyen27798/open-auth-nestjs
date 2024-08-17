import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/common';

const TABLE_NAME = 'permissions';

@Entity({ name: TABLE_NAME })
export class Permission extends AbstractEntity {
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
}
