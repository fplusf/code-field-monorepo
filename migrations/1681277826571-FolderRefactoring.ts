import { MigrationInterface, QueryRunner } from 'typeorm';

export class FolderRefactoring1681277826571 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "folders" RENAME COLUMN "documenId" TO "documents"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "folders" RENAME COLUMN "documents" TO "documenId"`
    );
  }
}
