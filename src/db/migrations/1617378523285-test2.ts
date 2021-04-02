import {MigrationInterface, QueryRunner} from "typeorm";

export class test21617378523285 implements MigrationInterface {
    name = 'test21617378523285'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" ADD "userId" bigint`);
        await queryRunner.query(`ALTER TABLE "task" ADD "hogehoe" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_1e982e43f63a98ad9918a86035c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_1e982e43f63a98ad9918a86035c"`);
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "hogehoe"`);
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "userId"`);
    }

}
