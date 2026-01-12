import { List } from "@mui/material"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { TaskStatus } from "@/common/enums/enums.ts"
import { DomainTodolists } from "@/features/todolists/model/todolists-slice.ts"
import { useGetTasksQuery } from "@/features/todolists/api/tasksApi.ts"

type Props = {
  todolist: DomainTodolists
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist

  const { data } = useGetTasksQuery(id)

  console.log("Tasks data:", data?.items)
  console.log("Current filter:", filter)

  let filteredTasks = data?.items
  if (filter === "Completed") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.Completed)
  }
  if (filter === "Active") {
    filteredTasks = filteredTasks?.filter((task) => task.status === TaskStatus.New)
  }

  return (
    <>
      {filteredTasks?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks?.map((task) => (
            <TaskItem key={task.id} task={task} todolist={todolist} />
          ))}
        </List>
      )}
    </>
  )
}
