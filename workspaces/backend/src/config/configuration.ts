import { ENV_MODE } from '@/constants';
import { TConfig } from '@/types';

export class Configuration {
    private static _config: TConfig;

    static init(): TConfig {
        if (!Configuration._config) {
            const envMode = (process.env['NODE_ENV'] as ENV_MODE) || ENV_MODE.DEV;
            Configuration._config = {
                env: envMode,
                port: Number(process.env['AUTH_API_PORT']),
                mysql: {
                    type: 'mysql',
                    host: process.env['AUTH_MYSQL_HOST'],
                    port: Number(process.env['AUTH_MYSQL_PORT']),
                    username: process.env['AUTH_MYSQL_USERNAME'],
                    password: process.env['AUTH_MYSQL_PASSWORD'],
                    database: process.env['AUTH_MYSQL_DATABASE'],
                },
                superuser: {
                    email: process.env[`SUPERUSER_EMAIL`],
                    pass: process.env[`SUPERUSER_PASS`],
                },
                auth0Config: {
                    issuerBaseURL: process.env['AUTH0_ISSUER_BASE_URL'],
                    audience: process.env['AUTH0_AUDIENCE'],
                },
                jwtOptions: {
                    privateKey: process.env['AUTH_JWT_PRIVATE_KEY'],
                    publicKey: process.env['AUTH_JWT_PUBLIC_KEY'],
                    signOptions: {
                        algorithm: 'RS256',
                    },
                    verifyOptions: {
                        algorithms: ['RS256'],
                    },
                },
            };
        }
        return Configuration._config;
    }

    static get instance(): TConfig {
        return Configuration._config;
    }
}
