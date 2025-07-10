import { SocialWorkerReviewStatus, StudentUploadStatus } from "@prisma/client";

export interface StudentProcess {
   id: number;
   student_id: string;
   social_worker_id: string | null;
   sccholarship_process_id: number;
   student_upload_status: StudentUploadStatus;
   names: string;
   first_lastname: string;
   second_lastname: string;
   dni: string | null;
   social_worker_review_status: SocialWorkerReviewStatus;
   name_process:string,
   social_worker_name:string
}

export interface dataForApllication {
   names: string;
   first_lastname: string;
   second_lastname: string;
   dni: string;
   code_university:string,
   school_name:string,
   student_process_id:number,
   social_worker_review_status:SocialWorkerReviewStatus,
}
