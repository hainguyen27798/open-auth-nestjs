import { SocialProvider, UserMappingRoles, UserRoles } from '@/modules/user/constants';

export type UserInfoType = {
    name: string;
    email: string;
    password: string;
    roleMapping?: UserMappingRoles;
};

export type CreateUserType = Omit<UserInfoType, 'roleMapping'> & {
    role: UserRoles;
};

export type SocialUserInfoType = Omit<UserInfo, 'password' | 'role'> & {
    provider: SocialProvider;
    image: string;
};
