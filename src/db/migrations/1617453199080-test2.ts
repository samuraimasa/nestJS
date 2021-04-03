import {MigrationInterface, QueryRunner} from "typeorm";

export class test21617453199080 implements MigrationInterface {
    name = 'test21617453199080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skills" DROP CONSTRAINT "FK_60177dd93dcdc055e4eaa93bade"`);
        await queryRunner.query(`ALTER TABLE "user_skills" DROP CONSTRAINT "FK_b19f190afaada3852e0f56566bc"`);
        await queryRunner.query(`DROP INDEX "IDX_b19f190afaada3852e0f56566b"`);
        await queryRunner.query(`DROP INDEX "IDX_60177dd93dcdc055e4eaa93bad"`);
        await queryRunner.query(`ALTER TABLE "user_skills" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_skills" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD "hogehoge" character varying`);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE INDEX "IDX_60177dd93dcdc055e4eaa93bad" ON "user_skills" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b19f190afaada3852e0f56566b" ON "user_skills" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD CONSTRAINT "FK_60177dd93dcdc055e4eaa93bade" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD CONSTRAINT "FK_b19f190afaada3852e0f56566bc" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_skills" DROP CONSTRAINT "FK_b19f190afaada3852e0f56566bc"`);
        await queryRunner.query(`ALTER TABLE "user_skills" DROP CONSTRAINT "FK_60177dd93dcdc055e4eaa93bade"`);
        await queryRunner.query(`DROP INDEX "IDX_b19f190afaada3852e0f56566b"`);
        await queryRunner.query(`DROP INDEX "IDX_60177dd93dcdc055e4eaa93bad"`);
        await queryRunner.query(`ALTER TABLE "user_skills" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_skills" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user_skills" DROP COLUMN "hogehoge"`);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`CREATE INDEX "IDX_60177dd93dcdc055e4eaa93bad" ON "user_skills" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b19f190afaada3852e0f56566b" ON "user_skills" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD CONSTRAINT "FK_b19f190afaada3852e0f56566bc" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_skills" ADD CONSTRAINT "FK_60177dd93dcdc055e4eaa93bade" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
