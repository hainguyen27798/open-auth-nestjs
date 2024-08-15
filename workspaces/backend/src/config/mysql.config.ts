import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { Configuration } from '@/config';
import { ENV_MODE } from '@/constants';

@Injectable()
export class MysqlConfig implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            ...Configuration.instance.mysql,
            logging: Configuration.instance.env !== ENV_MODE.PRO,
            subscribers: [],
            migrations: ['dist/database/migrations/*{.ts,.js}'],
            synchronize: true,
        };
    }
}
