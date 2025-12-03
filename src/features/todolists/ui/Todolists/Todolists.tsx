import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectTodolists } from "@/features/todolists/model/todolists-selectors.ts"
import { Grid, Paper } from "@mui/material"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useEffect } from "react"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { fetchTodosTC } from "@/features/todolists/model/todolists-slice.ts"

export const Todolists = () => {
  //6
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    //1
    dispatch(fetchTodosTC())
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
