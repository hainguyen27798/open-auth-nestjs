import { plainToClass } from 'class-transformer';
import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { AbstractDto } from '@/common';
import { Constructor } from '@/types';

export abstract class AbstractEntity<DTO extends AbstractDto = AbstractDto> {
    @PrimaryGeneratedColumn('uuid')
    id!: UUID;

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
    updatedAt!: Date;

    private dtoClass?: Constructor<DTO, [AbstractEntity]>;

    toDto(): DTO {
        const dtoClass = this.dtoClass;

        if (!dtoClass) {
            throw new Error(
                `You need to use @UseDto on class (${this.constructor.name}) be able to call toDto function`,
            );
        }

        return plainToClass(dtoClass, this);
    }
}
