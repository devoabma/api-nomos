-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MEMBER';

-- AlterTable
ALTER TABLE "lawyers" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';
