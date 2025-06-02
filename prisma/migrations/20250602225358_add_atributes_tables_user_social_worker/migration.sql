/*
  Warnings:

  - Added the required column `social_worker_status` to the `SocialWorker` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SocialWorkerStatus" AS ENUM ('enabled', 'disabled');

-- AlterTable
ALTER TABLE "SocialWorker" ADD COLUMN     "social_worker_status" "SocialWorkerStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dni" TEXT;
