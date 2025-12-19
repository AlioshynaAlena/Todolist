import { CreateItemForm } from "../../../../../common/components/CreateItemForm/CreateItemForm.tsx"
import { addTaskTC } from "@/features/todolists/model/tasks-slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx"
import { DomainTodolists } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: DomainTodolists
}
//каждый todolist будет получать свои данные (props)
export const TodolistItem = ({ todolist }: Props) => {
  const dispatch = useAppDispatch()

  const addTasks = (title: string) => {
    dispatch(addTaskTC({ todolistId: todolist.id, title }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm addItem={addTasks} disabled={todolist.entityStatus === "loading"} />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}
