import '@/polyfills';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

import { Configuration, MysqlConfig } from '@/config';
import { UserModule } from '@/modules/user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
            isGlobal: true,
            load: [Configuration.init],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useClass: MysqlConfig,
            dataSourceFactory: (options) => {
                if (!options) {
                    throw new Error('Invalid options passed');
                }

                return Promise.resolve(addTransactionalDataSource(new DataSource(options)));
            },
        }),
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
