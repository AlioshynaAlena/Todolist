import { Checkbox, IconButton, ListItem } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { ChangeEvent } from "react"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"
import { DomainTodolists } from "@/features/todolists/model/todolists-slice.ts"
import {
  useChangeTaskTitleMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} from "@/features/todolists/api/tasksApi.ts"
import { createTaskModel } from "@/features/auth/lib/utils/createTaskModel.ts"

type Props = {
  task: DomainTask
  todolist: DomainTodolists
}

export const TaskItem = ({ task, todolist }: Props) => {
  const [removeTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [updateTaskTitle] = useChangeTaskTitleMutation()

  const deleteTaskHandler = () => {
    removeTask({ taskId: task.id, todolistId: todolist.id })
  }

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    const model = createTaskModel(task, { status })
    updateTask({ taskId: task.id, model, todolistId: todolist.id })
  }

  const onChangeTitleHandler = (title: string) => {
    const model = createTaskModel(task, { title })
    updateTaskTitle({ taskId: task.id, model, todolistId: todolist.id })
  }

  return (
    <ListItem sx={getListItemSx(task.status === TaskStatus.Completed)}>
      <Checkbox onChange={onChangeStatusHandler} checked={task.status === TaskStatus.Completed} />
      <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
      <IconButton aria-label="delete" onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
