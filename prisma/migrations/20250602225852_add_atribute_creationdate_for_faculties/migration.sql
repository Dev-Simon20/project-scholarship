/*
  Warnings:

  - Added the required column `creation_date` to the `Faculty` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Faculty" ADD COLUMN     "creation_date" TIMESTAMP(3) NOT NULL;
