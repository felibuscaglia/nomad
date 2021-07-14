import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAdTable1626093882840 implements MigrationInterface {
    name = 'AddAdTable1626093882840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ad" ("id" SERIAL NOT NULL, "companyName" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "local" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_0193d5ef09746e88e9ea92c634d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "ad"`);
    }

}
