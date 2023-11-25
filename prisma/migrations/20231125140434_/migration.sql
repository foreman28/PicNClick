/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `url` to the `Tags` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tags" ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Tags_url_key" ON "Tags"("url");
