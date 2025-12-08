import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { Grid, Paper } from "@mui/material"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useEffect } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { fetchTodosTC, selectTodolists } from "@/features/todolists/model/todolists-slice.ts"

export const Todolists = () => {
  const todolists = useAppSelector(selectTodolists) //6
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchTodosTC()) //1
  }, [])

  return (
    <>
      {todolists.map((tl) => {
        return (
          <Grid key={tl.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem key={tl.id} id={tl.id} title={tl.title} filter={tl.filter} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
