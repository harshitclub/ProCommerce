/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `niche` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Niche" AS ENUM ('fashion', 'electronics', 'home_garden', 'healthcare', 'pets', 'games_toys', 'baby_Kids', 'food_beverages', 'art_crafts');

-- AlterTable
ALTER TABLE "Brand" ADD COLUMN     "niche" "Niche" NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Brand_slug_key" ON "Brand"("slug");
