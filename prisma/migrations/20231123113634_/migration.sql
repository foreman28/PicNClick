/*
  Warnings:

  - You are about to drop the column `tags` on the `ForumPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ForumPost" DROP COLUMN "tags";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" TEXT;

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ForumPostToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ForumPostToTag_AB_unique" ON "_ForumPostToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ForumPostToTag_B_index" ON "_ForumPostToTag"("B");

-- AddForeignKey
ALTER TABLE "_ForumPostToTag" ADD CONSTRAINT "_ForumPostToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "ForumPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ForumPostToTag" ADD CONSTRAINT "_ForumPostToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
