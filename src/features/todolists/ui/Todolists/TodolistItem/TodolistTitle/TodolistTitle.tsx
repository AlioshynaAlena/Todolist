import { EditableSpan } from "@/common/components/EditableSpan/EditableSpan.tsx"
import { IconButton } from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import { DomainTodolists } from "@/features/todolists/model/todolists-slice.ts"
import styles from "./TodolistTitle.module.css"
import {
  todolistsApi,
  useChangeTodolistTitleMutation,
  useDeleteTodolistMutation,
} from "@/features/todolists/api/todolistsApi.ts"
import { RequestStatus } from "@/common/types/types.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"

type Props = {
  todolist: DomainTodolists
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, title, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const [removeTodolist] = useDeleteTodolistMutation()
  const [updateTodolistTitle] = useChangeTodolistTitleMutation()

  const changeTodolistStatus = (entityStatus: RequestStatus) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
        const todolist = state.find((todolist) => todolist.id === id)
        if (todolist) {
          todolist.entityStatus = entityStatus
        }
      }),
    )
  }

  const changeToDoListTitle = (title: string) => {
    updateTodolistTitle({ id, title })
  }

  const handleRemoveToDoList = () => {
    changeTodolistStatus("loading")
    removeTodolist(id)
      .unwrap()
      .catch(() => {
        changeTodolistStatus("idle")
      })
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
