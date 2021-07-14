import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAdTable1626094049806 implements MigrationInterface {
    name = 'AddAdTable1626094049806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "companyName" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "description" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "description" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ad" ALTER COLUMN "companyName" SET NOT NULL`);
    }

}
