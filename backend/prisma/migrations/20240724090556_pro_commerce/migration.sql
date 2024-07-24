/*
  Warnings:

  - You are about to drop the column `productId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `SubCategory` table. All the data in the column will be lost.
  - Added the required column `subCategoryId` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_productId_fkey";

-- DropForeignKey
ALTER TABLE "SubCategory" DROP CONSTRAINT "SubCategory_productId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "productId";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "subCategoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "productId";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subCategoryId_fkey" FOREIGN KEY ("subCategoryId") REFERENCES "SubCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
