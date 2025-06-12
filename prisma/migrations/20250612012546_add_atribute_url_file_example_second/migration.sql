/*
  Warnings:

  - You are about to drop the column `url_file_expamle` on the `Requirement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Requirement" DROP COLUMN "url_file_expamle",
ADD COLUMN     "url_file_example" TEXT;
