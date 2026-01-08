import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTodolists } from "@/features/todolists/model/todolists-slice.ts"
import styles from "./TodolistTitle.module.css"
import { useChangeTodolistTitleMutation, useDeleteTodolistMutation } from "@/features/todolists/api/todolistsApi.ts"

type Props = {
  todolist: DomainTodolists
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const [removeTodolist] = useDeleteTodolistMutation()
  const [updateTodolistTitle] = useChangeTodolistTitleMutation()

  const changeToDoListTitle = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  const handleRemoveToDoList = () => {
    removeTodolist(id)
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan title={title} onChange={changeToDoListTitle} />
      </h3>
      <IconButton aria-label="delete" onClick={handleRemoveToDoList} disabled={entityStatus === "loading"}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
