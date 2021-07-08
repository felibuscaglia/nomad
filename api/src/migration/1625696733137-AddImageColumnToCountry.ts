import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImageColumnToCountry1625696733137 implements MigrationInterface {
    name = 'AddImageColumnToCountry1625696733137'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" ADD "image" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" DROP COLUMN "image"`);
    }

}
