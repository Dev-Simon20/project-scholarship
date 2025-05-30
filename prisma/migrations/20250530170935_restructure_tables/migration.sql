/*
  Warnings:

  - You are about to drop the column `code_university` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `admin_review_status` on the `UserProcess` table. All the data in the column will be lost.
  - You are about to drop the column `process_id` on the `UserProcess` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `UserProcess` table. All the data in the column will be lost.
  - You are about to drop the column `user_upload_status` on the `UserProcess` table. All the data in the column will be lost.
  - Added the required column `sccholarship_process_id` to the `UserProcess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social_worker_id` to the `UserProcess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `social_worker_review_status` to the `UserProcess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `UserProcess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_upload_status` to the `UserProcess` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StudentUploadStatus" AS ENUM ('pending', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "SocialWorkerReviewStatus" AS ENUM ('pending', 'in_review', 'to_be_interviewed', 'interviewed', 'approved', 'rejected', 'changes_requested');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'social_worker';

-- DropForeignKey
ALTER TABLE "ScholarshipProcess" DROP CONSTRAINT "ScholarshipProcess_created_by_fkey";

-- DropForeignKey
ALTER TABLE "UserProcess" DROP CONSTRAINT "UserProcess_process_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProcess" DROP CONSTRAINT "UserProcess_user_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "code_university";

-- AlterTable
ALTER TABLE "UserProcess" DROP COLUMN "admin_review_status",
DROP COLUMN "process_id",
DROP COLUMN "user_id",
DROP COLUMN "user_upload_status",
ADD COLUMN     "sccholarship_process_id" INTEGER NOT NULL,
ADD COLUMN     "social_worker_id" TEXT NOT NULL,
ADD COLUMN     "social_worker_review_status" "SocialWorkerReviewStatus" NOT NULL,
ADD COLUMN     "student_id" TEXT NOT NULL,
ADD COLUMN     "student_upload_status" "StudentUploadStatus" NOT NULL;

-- DropEnum
DROP TYPE "AdminReviewStatus";

-- DropEnum
DROP TYPE "UserUploadStatus";

-- CreateTable
CREATE TABLE "Student" (
    "user_id" TEXT NOT NULL,
    "code_university" TEXT NOT NULL,
    "school_id" INTEGER NOT NULL,
    "enrrolled_semesters" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Faculty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Faculty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "School" (
    "id" SERIAL NOT NULL,
    "faculty_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "School_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "user_id" TEXT NOT NULL,
    "management_start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "SocialWorker" (
    "user_id" TEXT NOT NULL,
    "employment_start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SocialWorker_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "_FacultyToSocialWorker" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FacultyToSocialWorker_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FacultyToSocialWorker_B_index" ON "_FacultyToSocialWorker"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_school_id_fkey" FOREIGN KEY ("school_id") REFERENCES "School"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "School" ADD CONSTRAINT "School_faculty_id_fkey" FOREIGN KEY ("faculty_id") REFERENCES "Faculty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialWorker" ADD CONSTRAINT "SocialWorker_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipProcess" ADD CONSTRAINT "ScholarshipProcess_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Admin"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProcess" ADD CONSTRAINT "UserProcess_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProcess" ADD CONSTRAINT "UserProcess_sccholarship_process_id_fkey" FOREIGN KEY ("sccholarship_process_id") REFERENCES "ScholarshipProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProcess" ADD CONSTRAINT "UserProcess_social_worker_id_fkey" FOREIGN KEY ("social_worker_id") REFERENCES "SocialWorker"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacultyToSocialWorker" ADD CONSTRAINT "_FacultyToSocialWorker_A_fkey" FOREIGN KEY ("A") REFERENCES "Faculty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FacultyToSocialWorker" ADD CONSTRAINT "_FacultyToSocialWorker_B_fkey" FOREIGN KEY ("B") REFERENCES "SocialWorker"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
