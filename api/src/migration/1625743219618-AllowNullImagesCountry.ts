import {MigrationInterface, QueryRunner} from "typeorm";

export class AllowNullImagesCountry1625743219618 implements MigrationInterface {
    name = 'AllowNullImagesCountry1625743219618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "country" ALTER COLUMN "image" SET NOT NULL`);
    }

}
