/*
  Warnings:

  - You are about to drop the column `index` on the `PostSection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostSection" DROP COLUMN "index",
ADD COLUMN     "keyIndex" INTEGER NOT NULL DEFAULT 0;
