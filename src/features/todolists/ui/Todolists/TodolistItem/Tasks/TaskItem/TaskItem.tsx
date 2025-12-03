import { Checkbox, IconButton, ListItem } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TaskType,
} from "@/features/todolists/model/tasks-slice.ts"
import { ChangeEvent } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts"

type TaskItemType = {
  task: TaskType
  id: string
}

export const TaskItem = ({ task, id }: TaskItemType) => {
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () => {
    dispatch(removeTaskAC({ taskId: task.id, todolistId: id }))
  }

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(changeTaskStatusAC({ taskId: task.id, isDone: newStatusValue, todolistId: id }))
  }

  const onChangeTitleHandler = (newValue: string) => {
    dispatch(changeTaskTitleAC({ taskId: task.id, newValue, todolistId: id }))
  }

  return (
    <ListItem sx={getListItemSx(task.isDone)}>
      <Checkbox onChange={onChangeStatusHandler} checked={task.isDone} />
      <EditableSpan title={task.title} onChange={onChangeTitleHandler} />
      <IconButton aria-label="delete" onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  )
}
