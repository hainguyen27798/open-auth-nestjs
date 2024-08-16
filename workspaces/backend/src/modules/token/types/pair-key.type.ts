export type PairKey = {
    publicKey: string;
    privateKey: string;
};

export type PairSecretToken = {
    accessToken: string;
    refreshToken: string;
};

export type TToken = {
    userId: UUID;
    session: string;
    refreshToken: string;
};

export type PairSecretTokenType = PairSecretToken | null;
