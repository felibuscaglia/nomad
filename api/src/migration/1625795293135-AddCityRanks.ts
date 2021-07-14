import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCityRanks1625795293135 implements MigrationInterface {
    name = 'AddCityRanks1625795293135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" ADD "rank" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "city" ADD "voteCount" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "voteCount"`);
        await queryRunner.query(`ALTER TABLE "city" DROP COLUMN "rank"`);
    }

}
