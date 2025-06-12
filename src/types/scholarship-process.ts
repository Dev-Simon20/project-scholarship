export interface ScholarshipProcess {
  id: number
  created_by: string
  title: string
  sub_title: string
  comment: string
  steps_count: number
  open_date: string | Date
  close_date: string | Date
  requirements: number
  student_processes: number
}