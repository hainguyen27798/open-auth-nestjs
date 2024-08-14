import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const dataSource = new DataSource({
    type: 'mysql',
    host: process.env['AUTH_MYSQL_HOST'],
    port: Number(process.env['AUTH_MYSQL_PORT']),
    username: process.env['AUTH_MYSQL_USERNAME'],
    password: process.env['AUTH_MYSQL_PASSWORD'],
    database: process.env['AUTH_MYSQL_DATABASE'],
    subscribers: [],
    entities: ['src/modules/**/*.entity{.ts,.js}'],
    migrations: ['src/database/migrations/*{.ts,.js}'],
});
