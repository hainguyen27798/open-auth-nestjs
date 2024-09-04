import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class AbstractDto {
    @Expose()
    @ApiProperty({ default: 'UUID' })
    @IsUUID()
    id!: UUID;

    @Expose()
    @ApiProperty({ type: Boolean })
    canModify!: boolean;

    @Expose()
    @ApiProperty({ type: Date })
    createdAt!: Date;

    @Expose()
    @ApiProperty({ type: Date })
    updatedAt!: Date;
}
