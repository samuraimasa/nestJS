import { MigrationInterface, QueryRunner } from 'typeorm';

export class test31617588362269 implements MigrationInterface {
  name = 'test31617588362269';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "miro"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "miro"
       (
           "id"        BIGSERIAL         NOT NULL,
           "name"      character varying NOT NULL,
           "createdAt" TIMESTAMP         NOT NULL DEFAULT now(),
           "updatedAt" TIMESTAMP         NOT NULL DEFAULT now(),
           CONSTRAINT "PK_d2e74b97b51829d6f3e7442476c" PRIMARY KEY ("id")
       )`,
    );
  }
}
