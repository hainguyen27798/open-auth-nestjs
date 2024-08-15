import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleAndPermissionTables1723741081559 implements MigrationInterface {
    name = 'AddRoleAndPermissionTables1723741081559';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE permissions (
                id varchar(36) NOT NULL,
                created_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                updated_at timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                name varchar(255) NOT NULL,
                service_name varchar(255) NOT NULL,
                permission_access_path varchar(255) NOT NULL,
                permission_access_method enum ('*', 'GET', 'PUT', 'DELETE', 'POST', 'PATCH', 'OPTIONS', 'HEAD') NOT NULL,
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
                description text NULL,
                PRIMARY KEY (id)
           ) ENGINE=InnoDB`,
        );
        await queryRunner.query(
            `CREATE TABLE roles_permissions (
                roles_id varchar(36) NOT NULL,
                permissions_id varchar(36) NOT NULL,
                INDEX IDX_9f90c4016cfda36339727cf606 (roles_id),
                INDEX IDX_41b3afc511193728bf544e2617 (permissions_id),
                PRIMARY KEY (roles_id, permissions_id)
           ) ENGINE=InnoDB`,
        );
        await queryRunner.query(`ALTER TABLE users ADD role_id varchar(36) NULL`);
        await queryRunner.query(
            `ALTER TABLE users ADD CONSTRAINT FK_a2cecd1a3531c0b041e29ba46e1 FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE NO ACTION ON UPDATE NO ACTION`,
        );
        await queryRunner.query(
            `ALTER TABLE roles_permissions ADD CONSTRAINT FK_9f90c4016cfda36339727cf6061 FOREIGN KEY (roles_id) REFERENCES roles(id) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
        await queryRunner.query(
            `ALTER TABLE roles_permissions ADD CONSTRAINT FK_41b3afc511193728bf544e26171 FOREIGN KEY (permissions_id) REFERENCES permissions(id) ON DELETE CASCADE ON UPDATE CASCADE`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE roles_permissions DROP FOREIGN KEY FK_41b3afc511193728bf544e26171`);
        await queryRunner.query(`ALTER TABLE roles_permissions DROP FOREIGN KEY FK_9f90c4016cfda36339727cf6061`);
        await queryRunner.query(`ALTER TABLE users DROP FOREIGN KEY FK_a2cecd1a3531c0b041e29ba46e1`);
        await queryRunner.query(`ALTER TABLE users DROP COLUMN role_id`);
        await queryRunner.query(`DROP INDEX IDX_41b3afc511193728bf544e2617 ON roles_permissions`);
        await queryRunner.query(`DROP INDEX IDX_9f90c4016cfda36339727cf606 ON roles_permissions`);
        await queryRunner.query(`DROP TABLE roles_permissions`);
        await queryRunner.query(`DROP TABLE roles`);
        await queryRunner.query(`DROP TABLE permissions`);
    }
}
