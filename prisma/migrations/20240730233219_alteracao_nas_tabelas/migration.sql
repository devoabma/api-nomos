/*
  Warnings:

  - You are about to drop the column `oab_hash` on the `lawyers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cpf]` on the table `lawyers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[oab]` on the table `lawyers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birth` to the `lawyers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `lawyers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `oab` to the `lawyers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN');

-- DropIndex
DROP INDEX "lawyers_oab_hash_key";

-- AlterTable
ALTER TABLE "administrators" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "lawyers" DROP COLUMN "oab_hash",
ADD COLUMN     "birth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "cpf" TEXT NOT NULL,
ADD COLUMN     "informations_accepted" TIMESTAMP(3),
ADD COLUMN     "oab" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lawyers_cpf_key" ON "lawyers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "lawyers_oab_key" ON "lawyers"("oab");
