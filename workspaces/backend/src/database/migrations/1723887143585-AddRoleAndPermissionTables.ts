import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleAndPermissionTables1723887143585 implements MigrationInterface {
    name = 'AddRoleAndPermissionTables1723887143585';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE permissions (
                id varchar(36) NOT NULL,
                created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                service_name varchar(255) NOT NULL,
                resource varchar(255) NOT NULL,
                action varchar(255) NOT NULL,
                attributes text NOT NULL,
                description text NULL,
                PRIMARY KEY (id)
            ) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE roles (
                id varchar(36) NOT NULL,
                created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                name varchar(255) NOT NULL,
                description text NULL, UNIQUE INDEX IDX_648e3f5447f725579d7d4ffdfb (name),
                PRIMARY KEY (id)
            ) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE roles_permissions (
                role_id varchar(36) NOT NULL,
                permission_id varchar(36) NOT NULL,
                INDEX IDX_7d2dad9f14eddeb09c256fea71 (role_id),
                INDEX IDX_337aa8dba227a1fe6b73998307 (permission_id),
                PRIMARY KEY (role_id, permission_id)
            ) ENGINE=InnoDB`,
        );
        await queryRunner.query(`ALTER TABLE users ADD role_id varchar(36) NULL`);
        await queryRunner.query(
            `ALTER TABLE users ADD CONSTRAINT FK_a2cecd1a3531c0b041e29ba46e1 FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE roles_permissions ADD CONSTRAINT FK_7d2dad9f14eddeb09c256fea719 FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE roles_permissions ADD CONSTRAINT FK_337aa8dba227a1fe6b73998307b FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE roles_permissions DROP FOREIGN KEY FK_337aa8dba227a1fe6b73998307b`);
        await queryRunner.query(`ALTER TABLE roles_permissions DROP FOREIGN KEY FK_7d2dad9f14eddeb09c256fea719`);
        await queryRunner.query(`ALTER TABLE users DROP FOREIGN KEY FK_a2cecd1a3531c0b041e29ba46e1`);
        await queryRunner.query(`ALTER TABLE users DROP COLUMN role_id`);
        await queryRunner.query(`DROP INDEX IDX_337aa8dba227a1fe6b73998307 ON roles_permissions`);
        await queryRunner.query(`DROP INDEX IDX_7d2dad9f14eddeb09c256fea71 ON roles_permissions`);
        await queryRunner.query(`DROP TABLE roles_permissions`);
        await queryRunner.query(`DROP INDEX IDX_648e3f5447f725579d7d4ffdfb ON roles`);
        await queryRunner.query(`DROP TABLE roles`);
        await queryRunner.query(`DROP TABLE permissions`);
    }
}
