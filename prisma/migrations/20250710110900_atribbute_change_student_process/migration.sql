-- DropForeignKey
ALTER TABLE "StudentProcess" DROP CONSTRAINT "StudentProcess_social_worker_id_fkey";

-- AlterTable
ALTER TABLE "StudentProcess" ALTER COLUMN "social_worker_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "StudentProcess" ADD CONSTRAINT "StudentProcess_social_worker_id_fkey" FOREIGN KEY ("social_worker_id") REFERENCES "SocialWorker"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;
