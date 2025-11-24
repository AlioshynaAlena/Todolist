import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { changeTodolistTitleAC, removeTodolistAC } from "@/features/todolists/model/todolists-reducer.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import styles from "./TodolistTitle.module.css"

export type TodolistTitleType = {
  title: string
  id: string
}

export const TodolistTitle = ({ title, id }: TodolistTitleType) => {
  const dispatch = useAppDispatch()

  const changeToDoListTitle = (newValue: string) => {
    dispatch(changeTodolistTitleAC({ id: id, title: newValue }))
  }

  const handleRemoveToDoList = () => {
    dispatch(removeTodolistAC({ id: id }))
  }

  return (
    <div className={styles.container}>
      <h3>
        <EditableSpan title={title} onChange={changeToDoListTitle} />
      </h3>
      <IconButton aria-label="delete" onClick={handleRemoveToDoList}>
        <DeleteIcon />
      </IconButton>
    </div>
  )
}
