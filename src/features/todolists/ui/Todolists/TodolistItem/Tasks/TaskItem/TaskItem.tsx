import { Checkbox, IconButton, ListItem } from "@mui/material"
import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTaskStatusTC, changeTaskTitleAC, removeTaskTC } from "@/features/todolists/model/tasks-slice.ts"
import { ChangeEvent } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { getListItemSx } from "@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.styles.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { DomainTask } from "@/features/todolists/api/tasksApi.types.ts"

type TaskItemType = {
  task: DomainTask
  id: string
}

export const TaskItem = ({ task, id }: TaskItemType) => {
  const dispatch = useAppDispatch()

  const deleteTaskHandler = () => {
    dispatch(removeTaskTC({ taskId: task.id, todolistId: id }))
  }

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatus = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New
    dispatch(changeTaskStatusTC({ taskId: task.id, status: newStatus, todolistId: id }))
  }

  const onChangeTitleHandler = (newValue: string) => {
    dispatch(changeTaskTitleAC({ taskId: task.id, newValue, todolistId: id }))
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
