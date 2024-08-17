import { JwtModuleOptions } from '@nestjs/jwt';
import { AuthOptions } from 'express-oauth2-jwt-bearer';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import { ENV_MODE } from '@/constants';

export type TConfig = {
    env: ENV_MODE;
    port: number;
    mysql: MysqlConnectionOptions;
    superuser: {
        email: string;
        pass: string;
    };
    auth0Config: AuthOptions;
    jwtOptions: JwtModuleOptions;
};
