import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"
import z from "zod"
import { domainTaskSchema } from "@/features/todolists/model/schemas/schemas.ts"

export type DomainTask = z.infer<typeof domainTaskSchema>

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}
