import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCanModifyToTables1725459149443 implements MigrationInterface {
    name = 'AddCanModifyToTables1725459149443';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE permissions ADD can_modify tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE roles ADD can_modify tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE users ADD can_modify tinyint NOT NULL DEFAULT 1`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE users DROP COLUMN can_modify`);
        await queryRunner.query(`ALTER TABLE roles DROP COLUMN can_modify`);
        await queryRunner.query(`ALTER TABLE permissions DROP COLUMN can_modify`);
    }
}
