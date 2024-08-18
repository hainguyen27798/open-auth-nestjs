import { PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

import { CreateRoleDto } from '@/modules/role/dto/create-role.dto';

@Exclude()
export class UpdateRoleDto extends PickType(CreateRoleDto, ['permissionIds', 'description']) {}
