/*
  Warnings:

  - The `imageURL` column on the `ForumPost` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ForumPost" DROP COLUMN "imageURL",
ADD COLUMN     "imageURL" BYTEA;
