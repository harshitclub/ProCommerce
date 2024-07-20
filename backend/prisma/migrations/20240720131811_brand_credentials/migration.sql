/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "warrantyDescription" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_email_key" ON "Brand"("email");
