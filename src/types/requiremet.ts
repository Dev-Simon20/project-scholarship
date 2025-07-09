import { AllowedFileTypes, DocumenType } from "@prisma/client";

export interface Requirement{
    id:number,
    procces_id:number,
    title:string,
    sub_title:string,
    step_number:number,
    max_zise_mb:string,
    url_file_example:string|null,
    document_type:DocumenType,
    allowed_file_types:AllowedFileTypes[],
}

export interface RequirementWithoutId extends Omit<Requirement, 'id' | 'procces_id'> {}