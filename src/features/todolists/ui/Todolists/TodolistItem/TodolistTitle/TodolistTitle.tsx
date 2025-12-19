import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTodolistTitleTC, DomainTodolists, removeTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import styles from "./TodolistTitle.module.css"

type Props = {
  todolist: DomainTodolists
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const changeToDoListTitle = (newValue: string) => {
    dispatch(changeTodolistTitleTC({ id: id, title: newValue }))
  }

  const handleRemoveToDoList = () => {
    dispatch(removeTodolistTC(id))
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
