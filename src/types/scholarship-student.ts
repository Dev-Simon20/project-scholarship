import { AllowedFileTypes, DocumenType, ReviewStatus } from "@prisma/client";

export interface ScholarshipProcess {
   id: number;
   title: string;
   subtitle: string;
   comment: string;
   steps_count: number;
}

export interface Requirement {
   id: number;
   title: string;
   sub_title: string;
   step_number: number;
   max_size_mb: string;
   document_type: DocumenType;
   allowed_file_types: AllowedFileTypes[];
   url_file_example: string | null;
}

export interface UserDocument {
   id: number;
   file_url: string;
   requirement_id:number;
   review_status: ReviewStatus;
   student_process_id?:number
}
