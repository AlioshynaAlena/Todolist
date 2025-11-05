import "./App.css";
import {ToDoList} from "../ToDoList.tsx";
import {AddItemForm} from "../AddItemForm.tsx";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Grid from "@mui/material/Grid";
import {
  addTaskAC,
  changeTaskStatusAC, changeTaskTitleAC,
  removeTaskAC,
} from "../model/tasks-reducer.ts";
import {
  addTodolistAC, changeTodolistFilterAC,
  changeTodolistTitleAC, removeTodolistAC,
} from "../model/todolists-reducer.ts";
import {useAppDispatch} from "../common/hooks/useAppDispatch.ts";
import {useAppSelector} from "../common/hooks/useAppSelector.ts";
import {selectTodolists} from "../model/todolists-selectors.ts";
import {selectTasks} from "../model/tasks-selectors.ts";


export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "All" | "Completed" | "Active";

export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

function AppWidthRedux() {
  //data
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(selectTodolists)
  const tasksObj = useAppSelector(selectTasks)


  function removeToDolist(todolistId: string) {
    const action = removeTodolistAC({id: todolistId})
    dispatch(action)
  };

  function changeFilter(value: FilterValuesType, todolistId: string) {
    const action = changeTodolistFilterAC({id: todolistId, filter: value})
    dispatch(action) //передаем
  }

  function removeTask(id: string, todolistId: string ) {
    const action = removeTaskAC({taskId: id, todolistId: todolistId})
    dispatch(action)
  }

  function changeToDoListValue(id: string, newValue: string) {
    const action = changeTodolistTitleAC({id: id, title: newValue})
    dispatch(action)
  }

  function addTask(title: string, todolistId: string) {
    const action = addTaskAC({title: title, todolistId: todolistId})
    dispatch(action)
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    const action = changeTaskStatusAC({taskId: taskId, isDone: isDone, todolistId: todolistId})
    dispatch(action)
  }

  function addToDoList(title: string) {
    const action = addTodolistAC(title)
    dispatch(action);

  }

  function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
    const action = changeTaskTitleAC({taskId, newValue, todolistId})
    dispatch(action)
  }

  //UI
  return (
    <div className="app">
      <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6"
                        component="div"
                        sx={{flexGrow: 1}}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container fixed>
        <Grid container
              style={{padding: '20px'}}>
          <AddItemForm addItem={addToDoList} />
        </Grid>

        <Grid container
              spacing={3}>
          {todolists.map((tl) => {
            let taskForToDoList = tasksObj[tl.id];


            console.log('tasks from tasksObj:', tasksObj[tl.id]);
            console.log('taskForToDoList:', taskForToDoList);

            if (tl.filter === "Completed") {
              taskForToDoList = tasksObj[tl.id].filter(
                (obj) => obj.isDone === true
              );
            }
            if (tl.filter === "Active") {
              taskForToDoList = tasksObj[tl.id].filter(
                (obj) => obj.isDone === false
              );
            }

            return (
              <Grid>
                <Paper style={{padding: '10px'}}>
                  <ToDoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForToDoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeToDolist={removeToDolist}
                    changeTaskTitle={changeTaskTitle}
                    changeToDoListValue={changeToDoListValue}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default AppWidthRedux;
