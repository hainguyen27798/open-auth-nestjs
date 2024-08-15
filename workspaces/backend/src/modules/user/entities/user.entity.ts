import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/common';
import { UseDto } from '@/decorators';
import { SocialProvider, UserStatus } from '@/modules/user/constants';
import { UserDto } from '@/modules/user/dto';

const TABLE_NAME = 'users';

@Entity({ name: TABLE_NAME })
@UseDto(UserDto)
export class User extends AbstractEntity<UserDto> {
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    password: string | null;

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.IN_ACTIVE })
    status: UserStatus;

    @Column({ name: 'social_provider', type: 'enum', enum: SocialProvider, nullable: true, default: null })
    socialProvider: SocialProvider;

    @Column({ type: 'text', nullable: true })
    image: string | null;

    @Column({ type: 'bool', default: false })
    verify: boolean;

    @Column({ name: 'verification_code', type: 'varchar', length: 6, nullable: true })
    verificationCode: string | null;
}
