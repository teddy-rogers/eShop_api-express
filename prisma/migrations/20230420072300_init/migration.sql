/*
  Warnings:

  - Made the column `postId` on table `PostSection` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PostSection" DROP CONSTRAINT "PostSection_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "isActive" SET DEFAULT true;

-- AlterTable
ALTER TABLE "PostSection" ADD COLUMN     "index" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Selection" ALTER COLUMN "isActive" SET DEFAULT true;

-- AddForeignKey
ALTER TABLE "PostSection" ADD CONSTRAINT "PostSection_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
