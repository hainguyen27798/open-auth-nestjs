import { SocialProvider } from '@/modules/user/constants';

export type JwtPayload = {
    name: string;
    userId: UUID;
    email: string;
    provider?: SocialProvider;
    permissions: unknown;
};

export type TAuthUser = JwtPayload & {
    session: string;
};
