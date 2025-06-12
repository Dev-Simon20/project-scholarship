import { SocialWorkerStatus } from "@prisma/client"


export interface SocialWorkerFormData {
  names: string
  first_lastname: string
  second_lastname: string
  phone_number: string
  dni: string
  email: string
  password?: string
  social_worker_status: SocialWorkerStatus
  assigned_faculties: number[]
  employment_start_date: Date
}

export interface SocialWorkerEditData extends Omit<SocialWorkerFormData, "password"> {
  id: string
  user_id: string
}
