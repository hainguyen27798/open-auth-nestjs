import '@/polyfills';

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Configuration, MysqlConfig } from '@/config';
import { AuthModule } from '@/modules/auth/auth.module';
import { RoleModule } from '@/modules/role/role.module';
import { TokenModule } from '@/modules/token/token.module';
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
        }),
        AuthModule,
        UserModule,
        RoleModule,
        TokenModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
