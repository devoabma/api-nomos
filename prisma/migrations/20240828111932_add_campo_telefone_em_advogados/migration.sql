/*
  Warnings:

  - Added the required column `name` to the `lawyers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telephone` to the `lawyers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lawyers" ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "telephone" TEXT NOT NULL;
