import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTokenTables1723804390524 implements MigrationInterface {
    name = 'AddTokenTables1723804390524';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE refresh_tokens_used (
                id varchar(36) NOT NULL,
                created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                token_id varchar(255) NOT NULL,
                refresh_token text NOT NULL,
                PRIMARY KEY (id)
             ) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE tokens (
                id varchar(36) NOT NULL,
                created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                user_id varchar(255) NOT NULL,
                session varchar(255) NOT NULL,
                refresh_token text NOT NULL,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `ALTER TABLE refresh_tokens_used ADD CONSTRAINT FK_0862162fbe6c35976e19c6020c5 FOREIGN KEY (token_id) REFERENCES tokens(id) ON DELETE CASCADE ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE tokens ADD CONSTRAINT FK_8769073e38c365f315426554ca5 FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE tokens DROP FOREIGN KEY FK_8769073e38c365f315426554ca5`);
        await queryRunner.query(`ALTER TABLE refresh_tokens_used DROP FOREIGN KEY FK_0862162fbe6c35976e19c6020c5`);
        await queryRunner.query(`DROP TABLE tokens`);
        await queryRunner.query(`DROP TABLE refresh_tokens_used`);
    }
}
