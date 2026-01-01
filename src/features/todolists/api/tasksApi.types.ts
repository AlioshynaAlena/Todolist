import z from "zod"
import { domainTaskSchema } from "@/features/todolists/model/schemas/schemas.ts"
import { TaskPriority, TaskStatus } from "@/common/enums/enums.ts"

export type DomainTask = z.infer<typeof domainTaskSchema>

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}
