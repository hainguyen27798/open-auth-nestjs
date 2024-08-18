import { PartialType, PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { CreatePermissionDto } from '@/modules/role/dto/create-permission.dto';

@Exclude()
export class UpdatePermissionDto extends PartialType(
    PickType(CreatePermissionDto, ['action', 'attributes', 'description']),
) {}
