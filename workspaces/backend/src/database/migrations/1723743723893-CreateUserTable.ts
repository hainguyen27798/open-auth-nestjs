import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1723743723893 implements MigrationInterface {
    name = 'CreateUserTable1723743723893';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE users (
                id varchar(36) NOT NULL,
                created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                name varchar(255) NOT NULL,
                email varchar(255) NOT NULL,
                password varchar(255) NULL,
                status enum ('active', 'inActive', 'request') NOT NULL DEFAULT 'inActive',
                social_provider enum ('google', 'linkedin') NULL,
                image text NULL,
                verify tinyint NOT NULL DEFAULT 0,
                verification_code varchar(6) NULL,
                UNIQUE INDEX IDX_97672ac88f789774dd47f7c8be (email),
                PRIMARY KEY (id)
            ) ENGINE=InnoDB`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX IDX_97672ac88f789774dd47f7c8be ON users`);
        await queryRunner.query(`DROP TABLE users`);
    }
}
