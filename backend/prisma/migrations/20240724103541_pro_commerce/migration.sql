/*
  Warnings:

  - You are about to alter the column `fullName` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `companyName` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `addressLine1` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `addressLine2` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `city` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `state` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `postalCode` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `country` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `note` on the `Address` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `brandName` on the `Brand` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `Brand` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `country` on the `Brand` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `missionStatement` on the `Brand` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `slogan` on the `Brand` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `description` on the `Brand` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `metaDescription` on the `Brand` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `keywords` on the `Brand` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `title` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `description` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `metaDescription` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `keywords` on the `Category` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `name` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `message` on the `Contact` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `couponCode` on the `DiscoutCoupon` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `description` on the `DiscoutCoupon` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `title` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `description` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `summary` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `metaDescription` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `keywords` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `title` on the `ProductComplain` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `message` on the `ProductComplain` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `comment` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `title` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `description` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `metaDescription` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `keywords` on the `SubCategory` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(250)`.
  - You are about to alter the column `firstName` on the `SuperAdmin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `lastName` on the `SuperAdmin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `SuperAdmin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `firstName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `lastName` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `firstName` on the `Vendor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `lastName` on the `Vendor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `companyName` on the `Vendor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `email` on the `Vendor` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - Added the required column `message` to the `BrandComplain` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `BrandComplain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "fullName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "companyName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "addressLine1" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "addressLine2" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "state" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "postalCode" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "country" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "note" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Brand" ALTER COLUMN "brandName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "country" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "missionStatement" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "slogan" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "metaDescription" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "keywords" SET DATA TYPE VARCHAR(250);

-- AlterTable
ALTER TABLE "BrandComplain" ADD COLUMN     "message" VARCHAR(250) NOT NULL,
ADD COLUMN     "title" VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "metaDescription" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "keywords" SET DATA TYPE VARCHAR(250);

-- AlterTable
ALTER TABLE "Contact" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "message" SET DATA TYPE VARCHAR(250);

-- AlterTable
ALTER TABLE "DiscoutCoupon" ALTER COLUMN "couponCode" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "summary" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "metaDescription" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "keywords" SET DATA TYPE VARCHAR(250);

-- AlterTable
ALTER TABLE "ProductComplain" ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "message" SET DATA TYPE VARCHAR(250);

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "comment" SET DATA TYPE VARCHAR(250);

-- AlterTable
ALTER TABLE "SubCategory" ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "metaDescription" SET DATA TYPE VARCHAR(250),
ALTER COLUMN "keywords" SET DATA TYPE VARCHAR(250);

-- AlterTable
ALTER TABLE "SuperAdmin" ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "Vendor" ALTER COLUMN "firstName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "lastName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "companyName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(100);
