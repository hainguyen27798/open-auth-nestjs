import { Column, Entity } from 'typeorm';

import { AbstractEntity } from '@/common/abstract.entity';
import { SocialProvider, UserStatus } from '@/modules/user/constants';

const TABLE_NAME = 'users';

@Entity({ name: TABLE_NAME })
export class User extends AbstractEntity {
    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255 })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    password: string | null;

    @Column({ type: 'enum', enum: UserStatus, default: UserStatus.IN_ACTIVE })
    status: UserStatus;

    @Column({ type: 'enum', enum: SocialProvider, nullable: true, default: null })
    socialProvider: SocialProvider;

    @Column({ type: 'text', nullable: true })
    image: string | null;

    @Column({ type: 'bool', default: false })
    verify: boolean;

    @Column({ type: 'varchar', length: 6, nullable: true })
    verificationCode: string | null;
}
