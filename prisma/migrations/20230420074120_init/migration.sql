/*
  Warnings:

  - You are about to drop the column `keyIndex` on the `PostSection` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PostSection" DROP COLUMN "keyIndex",
ADD COLUMN     "index" INTEGER NOT NULL DEFAULT 0;
