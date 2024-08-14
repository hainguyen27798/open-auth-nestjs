import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { UUID } from '@/types';

export abstract class AbstractEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: UUID;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt!: Date;
}
