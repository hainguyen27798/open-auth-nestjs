import { ApiProperty, PickType } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { AbstractDto } from '@/common';
import { PermissionDto } from '@/modules/role/dto/permission.dto';

@Exclude()
class RolePermissionDto extends PickType(PermissionDto, ['action', 'serviceName', 'attributes', 'description']) {}

@Exclude()
export class RoleDto extends AbstractDto {
    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiProperty()
    @Type(() => RolePermissionDto)
    permissions: RolePermissionDto[];

    @Expose()
    @ApiProperty()
    description: string;
}
