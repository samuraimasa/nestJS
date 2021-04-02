import {MigrationInterface, QueryRunner} from "typeorm";

export class test31617378790914 implements MigrationInterface {
    name = 'test31617378790914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_987cb7876b875ab0066a952cc13" UNIQUE ("encryptedId")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_987cb7876b875ab0066a952cc13"`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "userId" bigint`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
