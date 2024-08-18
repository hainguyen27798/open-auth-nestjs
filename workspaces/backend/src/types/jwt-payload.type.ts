import { SocialProvider } from '@/modules/user/constants';

export type TAuthUser = {
    name: string;
    userId: UUID;
    email: string;
    provider?: SocialProvider;
    permissions: unknown;
    session?: string;
};
