-- CreateTable
CREATE TABLE "administrator" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "code" INTEGER NOT NULL DEFAULT 5412,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "administrator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lawyer" (
    "id" TEXT NOT NULL,
    "oab_hash" TEXT NOT NULL,
    "registered" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lawyer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "administrator_email_key" ON "administrator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lawyer_oab_hash_key" ON "lawyer"("oab_hash");
