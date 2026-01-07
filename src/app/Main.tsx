import Grid from "@mui/material/Grid"
import { CreateItemForm } from "@/common/components/CreateItemForm/CreateItemForm.tsx"
import { Container } from "@mui/material"
import { Todolists } from "@/features/todolists/ui/Todolists/Todolists.tsx"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectIsLoggedIn } from "@/features/auth/model/auth-slice.ts"
import { Navigate } from "react-router"
import { Path } from "@/common/routing/Routing.tsx"
import { useCreateTodolistMutation } from "@/features/todolists/api/_todolistsApi.ts"

export const Main = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [addTodolist] = useCreateTodolistMutation()

  if (!isLoggedIn) {
    return <Navigate to={Path.Login} />
  }

  return (
    <Container maxWidth={"lg"}>
      <Grid container sx={{ mb: "30px" }}>
        <CreateItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  )
}
