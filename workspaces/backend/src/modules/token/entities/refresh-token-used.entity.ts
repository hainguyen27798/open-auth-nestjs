import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AbstractEntity } from '@/common';
import { Token } from '@/modules/token/entities/token.entity';

const TABLE_NAME = 'refresh_tokens_used';

@Entity(TABLE_NAME)
export class RefreshTokenUsed extends AbstractEntity {
    @Column({ name: 'token_id', type: 'text' })
    tokenId: UUID;

    @ManyToOne(() => Token, (token) => token.refreshTokensUsed, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'token_id' })
    token: Token;

    @Column({ name: 'refresh_token', type: 'text' })
    refreshToken: string;
}
