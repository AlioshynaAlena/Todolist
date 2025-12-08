import { List } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { FilterValuesType } from "@/features/todolists/model/__tests__/todolists-reducer.test.ts"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { selectTasks } from "@/features/todolists/model/tasks-slice.ts"

export type TasksType = {
  id: string
  filter: FilterValuesType
}
export const Tasks = ({ id, filter }: TasksType) => {
  const tasks = useAppSelector(selectTasks)

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "Completed") {
    filteredTasks = tasks[id].filter((task) => task.isDone === true)
  }
  if (filter === "Active") {
    filteredTasks = tasks[id].filter((task) => task.isDone === false)
  }

  return (
    <>
      {filteredTasks && filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>{filteredTasks && filteredTasks.map((task) => <TaskItem key={task.id} task={task} id={id} />)}</List>
      )}
    </>
  )
}
