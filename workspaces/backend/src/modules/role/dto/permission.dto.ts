import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { AbstractDto } from '@/common';

@Exclude()
export class PermissionDto extends AbstractDto {
    @Expose()
    @ApiProperty()
    serviceName: string;

    @Expose()
    @ApiProperty()
    resource: string;

    @Expose()
    @ApiProperty()
    action: string;

    @Expose()
    @ApiProperty()
    attributes: string;

    @Expose()
    @ApiProperty()
    description: string;
}
