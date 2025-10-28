import {useReducer} from "react";
import "./App.css";
import {ToDoList} from "./ToDoList";
import {AddItemForm} from "./AddItemForm";
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
  tasksReducer
} from "./model/tasks-reducer.ts";
import {
  addTodolistAC, changeTodolistFilterAC,
  changeTodolistTitleAC, removeTodolistAC,
  todolistsReducer
} from "./model/todolists-reducer.ts";
import {v1} from "uuid";


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

function App() {
  //data
  //хранит todolists
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ])

  let [tasksObj, dispatchTasksObj] = useReducer(tasksReducer, {
    [todolistId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "React", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: "Book", isDone: false},
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Eggs", isDone: true},
      {id: v1(), title: "Potatoes", isDone: true},
      {id: v1(), title: "Oil", isDone: true},
    ],
  } );


  function removeToDolist(todolistId: string) {
    dispatchToTodolists(removeTodolistAC(todolistId));
    dispatchTasksObj(removeTodolistAC(todolistId));
  };

  function changeFilter(value: FilterValuesType, todolistId: string) {
      dispatchToTodolists(changeTodolistFilterAC(todolistId, value)); //передаем
  }

  function removeTask(id: string, todolistId: string ) {
    dispatchTasksObj(removeTaskAC(id, todolistId))
  }

  function changeToDoListValue(id: string, newValue: string) {
      dispatchToTodolists(changeTodolistTitleAC(id, newValue));
  }

  function addTask(title: string, todolistId: string) {
    dispatchTasksObj(addTaskAC(title, todolistId));
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
      dispatchTasksObj(changeTaskStatusAC(taskId, isDone, todolistId));
    }

  function addToDoList(title: string) {
    const action = addTodolistAC(title)
    dispatchToTodolists(action);
    dispatchTasksObj(action);
  }

  function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
      dispatchTasksObj(changeTaskTitleAC(taskId, newValue, todolistId));
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

export default App;
