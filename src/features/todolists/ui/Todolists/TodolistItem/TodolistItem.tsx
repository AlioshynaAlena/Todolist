import { CreateItemForm } from "../../../../../common/components/CreateItemForm/CreateItemForm.tsx"
import { addTaskAC } from "@/features/todolists/model/tasks-slice.ts"
import { FilterValuesType } from "@/features/todolists/model/__tests__/todolists-reducer.test.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { TodolistTitle } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx"
import { Tasks } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx"
import { FilterButtons } from "@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx"

type PropsType = {
  id: string
  title: string
  filter: FilterValuesType
}
//каждый todolist будет получать свои данные (props)
export const TodolistItem = ({ title, filter, id }: PropsType) => {
  const dispatch = useAppDispatch()

  const addTasks = (title: string) => {
    dispatch(addTaskAC({ title: title, todolistId: id }))
  }

  return (
    <div>
      <TodolistTitle id={id} title={title} />
      <CreateItemForm addItem={addTasks} />
      <Tasks id={id} filter={filter} />
      <FilterButtons id={id} filter={filter} />
    </div>
  )
}
