import { Exclude } from 'class-transformer';

import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

@Exclude()
export class RequestUserDto extends CreateUserDto {}
