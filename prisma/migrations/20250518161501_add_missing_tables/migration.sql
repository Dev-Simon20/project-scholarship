-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('success', 'error', 'info', 'warning');

-- CreateEnum
CREATE TYPE "UserUploadStatus" AS ENUM ('pending', 'in_progress', 'completed');

-- CreateEnum
CREATE TYPE "AdminReviewStatus" AS ENUM ('pending', 'in_review', 'approved', 'rejected', 'changes_requested');

-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('Pending', 'Approved', 'NeedsChanges');

-- CreateEnum
CREATE TYPE "DocumenType" AS ENUM ('image', 'video', 'document');

-- CreateEnum
CREATE TYPE "AllowedFileTypes" AS ENUM ('jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'pdf', 'doc', 'docx', 'txt', 'mp4', 'mov', 'avi', 'mkv', 'webm');

-- CreateTable
CREATE TABLE "Notification" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "tille" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read" BOOLEAN NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScholarshipProcess" (
    "id" SERIAL NOT NULL,
    "created_by" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "steps_count" INTEGER NOT NULL,
    "open_date" TIMESTAMP(3) NOT NULL,
    "close_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScholarshipProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProcess" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "process_id" INTEGER NOT NULL,
    "user_upload_status" "UserUploadStatus" NOT NULL,
    "admin_review_status" "AdminReviewStatus" NOT NULL,

    CONSTRAINT "UserProcess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Requirement" (
    "id" SERIAL NOT NULL,
    "process_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "step_number" INTEGER NOT NULL,
    "max_size_mb" TEXT NOT NULL,
    "document_type" "DocumenType" NOT NULL,
    "allowed_file_types" "AllowedFileTypes"[],

    CONSTRAINT "Requirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDocument" (
    "id" SERIAL NOT NULL,
    "user_process_id" INTEGER NOT NULL,
    "requirement_id" INTEGER NOT NULL,
    "file_url" TEXT NOT NULL,
    "review_status" "ReviewStatus" NOT NULL,

    CONSTRAINT "UserDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScholarshipProcess" ADD CONSTRAINT "ScholarshipProcess_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProcess" ADD CONSTRAINT "UserProcess_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProcess" ADD CONSTRAINT "UserProcess_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "ScholarshipProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Requirement" ADD CONSTRAINT "Requirement_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "ScholarshipProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDocument" ADD CONSTRAINT "UserDocument_user_process_id_fkey" FOREIGN KEY ("user_process_id") REFERENCES "UserProcess"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDocument" ADD CONSTRAINT "UserDocument_requirement_id_fkey" FOREIGN KEY ("requirement_id") REFERENCES "Requirement"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
