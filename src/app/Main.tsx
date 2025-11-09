import Grid from "@mui/material/Grid";
import {AddItemForm} from "@/AddItemForm.tsx";
import {Container} from "@mui/material";
import {addTodolistAC} from "@/model/todolists-reducer.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {Todolists} from "@/Todolists.tsx";

export const Main = () => {
  const dispatch = useAppDispatch()

  function addToDoList(title: string) {
    const action = addTodolistAC(title)
    dispatch(action);

  }

  return (
    <Container maxWidth={'lg'}>
      <Grid container sx={{mb: '30px'}}>
        <AddItemForm addItem={addToDoList} />
      </Grid>
      <Grid container spacing={4}>
        <Todolists/>
      </Grid>
    </Container>
  )
}