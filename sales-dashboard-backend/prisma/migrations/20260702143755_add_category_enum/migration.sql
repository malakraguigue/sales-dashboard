/*
  Warnings:

  - Changed the type of `category` on the `sales` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('Furniture', 'Office Supplies', 'Technology');

-- AlterTable
ALTER TABLE "sales" ALTER COLUMN "category" TYPE "Category" USING ("category"::text::"Category");
