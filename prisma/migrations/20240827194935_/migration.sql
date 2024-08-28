/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `lawyers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `lawyers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lawyers" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lawyers_email_key" ON "lawyers"("email");
