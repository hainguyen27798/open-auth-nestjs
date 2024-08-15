import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { Configuration } from '@/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env${process.env.NODE_ENV ? `.${process.env.NODE_ENV}` : ''}`,
            isGlobal: true,
            load: [Configuration.init],
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
