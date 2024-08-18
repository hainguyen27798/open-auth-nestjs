import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

import { AbstractDto } from '@/common';
import { UserStatus } from '@/modules/user/constants';

@Exclude()
export class UserDto extends AbstractDto {
    @Expose()
    @ApiProperty()
    email: string;

    @Expose()
    @ApiProperty()
    name: string;

    @Expose()
    @ApiProperty({ enum: UserStatus, default: UserStatus.ACTIVE })
    status: UserStatus;
}
