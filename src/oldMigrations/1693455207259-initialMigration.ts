import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1693455207259 implements MigrationInterface {
    name = 'InitialMigration1693455207259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL, "updatedAt" date NOT NULL, "deletedAt" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "street" character varying(45) NOT NULL, "zipCode" character varying(8) NOT NULL, "number" integer NOT NULL, "city" character varying(20) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "realEstates" ("id" SERIAL NOT NULL, "sold" boolean NOT NULL DEFAULT false, "value" numeric(12,2) NOT NULL DEFAULT '0', "size" integer NOT NULL, "createdAt" date NOT NULL, "updatedAt" date NOT NULL, "categoryIdId" integer, CONSTRAINT "PK_57badbed001c9b97de867eaa976" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" SERIAL NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "userIdId" integer, "realEstateIdId" integer, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "realEstates" ADD CONSTRAINT "FK_958b95391291b7f19e9160a24e7" FOREIGN KEY ("categoryIdId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_39a75f0ad7d19e3f1238d6a4e9a" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_fbf218812039f56de7597d65fdc" FOREIGN KEY ("realEstateIdId") REFERENCES "realEstates"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_fbf218812039f56de7597d65fdc"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_39a75f0ad7d19e3f1238d6a4e9a"`);
        await queryRunner.query(`ALTER TABLE "realEstates" DROP CONSTRAINT "FK_958b95391291b7f19e9160a24e7"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "realEstates"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
