import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { RequestStatus } from "@/common/types/types.ts"

export type DomainTodolists = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}

export type FilterValuesType = "All" | "Completed" | "Active"
