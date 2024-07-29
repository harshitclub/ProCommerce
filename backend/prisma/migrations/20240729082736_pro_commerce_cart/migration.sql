/*
  Warnings:

  - You are about to drop the column `totalPrice` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `totalProductCount` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_productId_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "totalPrice",
DROP COLUMN "totalProductCount",
ADD COLUMN     "productId" TEXT NOT NULL;

-- DropTable
DROP TABLE "CartItem";

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
