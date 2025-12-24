import { List } from "@mui/material"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { TaskItem } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx"
import { fetchTasksTC, selectTasks } from "@/features/todolists/model/tasks-slice.ts"
import { useEffect } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { DomainTodolists } from "@/features/todolists/model/todolists-slice.ts"

type Props = {
  todolist: DomainTodolists
}

export const Tasks = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const tasks = useAppSelector(selectTasks)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTasksTC(id)) //1
  }, [])

  const todolistTasks = tasks[id]
  let filteredTasks = todolistTasks
  if (filter === "Completed") {
    filteredTasks = tasks[id].filter((task) => task.status === TaskStatus.Completed)
  }
  if (filter === "Active") {
    filteredTasks = tasks[id].filter((task) => task.status === TaskStatus.New)
  }

  return (
    <>
      {filteredTasks && filteredTasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {filteredTasks && filteredTasks.map((task) => <TaskItem key={task.id} task={task} todolist={todolist} />)}
        </List>
      )}
    </>
  )
}
