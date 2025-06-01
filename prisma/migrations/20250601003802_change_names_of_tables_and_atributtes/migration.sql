/*
  Warnings:

  - You are about to drop the `UserDocument` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProcess` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserDocument" DROP CONSTRAINT "UserDocument_requirement_id_fkey";

-- DropForeignKey
ALTER TABLE "UserDocument" DROP CONSTRAINT "UserDocument_user_process_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProcess" DROP CONSTRAINT "UserProcess_sccholarship_process_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProcess" DROP CONSTRAINT "UserProcess_social_worker_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProcess" DROP CONSTRAINT "UserProcess_student_id_fkey";

-- DropTable
DROP TABLE "UserDocument";

-- DropTable
DROP TABLE "UserProcess";

-- CreateTable
CREATE TABLE "StudentProcess" (
    "id" SERIAL NOT NULL,
    "student_id" TEXT NOT NULL,
    "social_worker_id" TEXT NOT NULL,
    "sccholarship_process_id" INTEGER NOT NULL,
    "student_upload_status" "StudentUploadStatus" NOT NULL,
    "social_worker_review_status" "SocialWorkerReviewStatus" NOT NULL,

    CONSTRAINT "StudentProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentDocument" (
    "id" SERIAL NOT NULL,
    "student_process_id" INTEGER NOT NULL,
    "requirement_id" INTEGER NOT NULL,
    "file_url" TEXT NOT NULL,
    "review_status" "ReviewStatus" NOT NULL,

    CONSTRAINT "StudentDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentProcess" ADD CONSTRAINT "StudentProcess_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "Student"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProcess" ADD CONSTRAINT "StudentProcess_sccholarship_process_id_fkey" FOREIGN KEY ("sccholarship_process_id") REFERENCES "ScholarshipProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProcess" ADD CONSTRAINT "StudentProcess_social_worker_id_fkey" FOREIGN KEY ("social_worker_id") REFERENCES "SocialWorker"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentDocument" ADD CONSTRAINT "StudentDocument_student_process_id_fkey" FOREIGN KEY ("student_process_id") REFERENCES "StudentProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentDocument" ADD CONSTRAINT "StudentDocument_requirement_id_fkey" FOREIGN KEY ("requirement_id") REFERENCES "Requirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
