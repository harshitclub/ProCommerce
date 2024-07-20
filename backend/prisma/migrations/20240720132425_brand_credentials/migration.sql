/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_phone_key" ON "Brand"("phone");
