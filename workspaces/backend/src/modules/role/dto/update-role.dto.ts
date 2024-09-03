import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';

import { CreateRoleDto } from '@/modules/role/dto/create-role.dto';

@Exclude()
export class UpdateRoleDto extends CreateRoleDto {}

@Exclude()
export class UpdateRolePermissionDto {
    @Expose()
    @ApiProperty()
    @IsUUID('4')
    permissionId: UUID;
}
