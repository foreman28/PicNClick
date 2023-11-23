/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ForumPostToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ForumPostToTag" DROP CONSTRAINT "_ForumPostToTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_ForumPostToTag" DROP CONSTRAINT "_ForumPostToTag_B_fkey";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_ForumPostToTag";

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ForumPostToTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ForumPostToTags_AB_unique" ON "_ForumPostToTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ForumPostToTags_B_index" ON "_ForumPostToTags"("B");

-- AddForeignKey
ALTER TABLE "_ForumPostToTags" ADD CONSTRAINT "_ForumPostToTags_A_fkey" FOREIGN KEY ("A") REFERENCES "ForumPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ForumPostToTags" ADD CONSTRAINT "_ForumPostToTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tags"("id") ON DELETE CASCADE ON UPDATE CASCADE;
