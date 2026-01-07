import { Grid, Paper } from "@mui/material"
import { TodolistItem } from "@/features/todolists/ui/Todolists/TodolistItem/TodolistItem.tsx"
import { useGetTodolistsQuery } from "@/features/todolists/api/_todolistsApi.ts"
import { useState } from "react"

export const Todolists = () => {
  const [skip, setSkip] = useState(true)
  const { data: todolists } = useGetTodolistsQuery(undefined, { skip })

  const fetchTodolists = () => {
    setSkip(false)
  }

  return (
    <>
      <div>
        <button onClick={fetchTodolists}>Download todolists</button>
      </div>
      {todolists?.map((todolist) => {
        return (
          <Grid key={todolist.id}>
            <Paper sx={{ p: "0 20px 20px 20px" }}>
              <TodolistItem todolist={todolist} />
            </Paper>
          </Grid>
        )
      })}
    </>
  )
}
