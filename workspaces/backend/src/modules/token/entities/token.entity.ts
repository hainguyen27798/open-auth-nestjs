import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { AbstractEntity } from '@/common';
import { RefreshTokenUsed } from '@/modules/token/entities/refresh-token-used.entity';
import { User } from '@/modules/user/entities/user.entity';

const TABLE_NAME = 'tokens';

@Entity(TABLE_NAME)
export class Token extends AbstractEntity {
    @Column({ name: 'user_id', type: 'uuid' })
    userId: UUID;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column({ type: 'varchar', length: 255 })
    session: string;

    @OneToMany(() => RefreshTokenUsed, (refreshTokenUsed) => refreshTokenUsed.token)
    refreshTokensUsed: RefreshTokenUsed[];

    @Column({ name: 'refresh_token', type: 'text' })
    refreshToken: string;
}
