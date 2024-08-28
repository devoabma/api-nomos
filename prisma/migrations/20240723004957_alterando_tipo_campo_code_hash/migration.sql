/*
  Warnings:

  - You are about to drop the column `code` on the `administrators` table. All the data in the column will be lost.
  - Added the required column `code_hash` to the `administrators` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "administrators" DROP COLUMN "code",
ADD COLUMN     "code_hash" TEXT NOT NULL;
