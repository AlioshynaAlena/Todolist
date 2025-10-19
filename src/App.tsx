import { useState } from "react";
import "./App.css";
import { ToDoList } from "./ToDoList";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
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
import { Padding } from "@mui/icons-material";

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

  let [todolists, setTodolists] = useState<Array<ToDoListType>>([
    { id: todolistId1, title: "What to learn ", filter: "All" },
    { id: todolistId2, title: "What to buy ", filter: "All" },
  ]);

  //ассоциативный массив
  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "Eggs", isDone: true },
      { id: v1(), title: "Popatoes", isDone: true },
      { id: v1(), title: "Oil", isDone: true },
    ],
  });

  //delete todolist
  let removeToDolist = (todolistId: string) => {
    setTodolists(todolists.filter((t) => t.id !== todolistId));

    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  };

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((t) => t.id === todolistId);

    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]); //передаем новое состояние, для обновления его визуализации
    }
  }

  //delete task
  function removeTask(id: string, todolistId: string) {
    //Иммутабельно создаем копию
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    // по ключу tasksObj[todolistId] обратиться к свойству объекта и заменить в нем на отфильтрованные таски
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj }); // отдаем копию объекта, чтобы React перересовал
    //‼️короче запись
    // setTasks({...tasksObj, [todolistId]: tasksObj[todolistId].filter((t) => t.id !== id) })
  }

  function changeToDoListValue(id: string, newValue: string) {
    const todolist = todolists.find((t) => t.id === id);
    if (todolist) {
      todolist.title = newValue;
      setTodolists([...todolists]);
    }
  }

  //add task
  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false };
    //сначала достаю нужный массив, куда будем добавлять таску новую
    let tasks = tasksObj[todolistId];
    //создаем новый массив, в который кладем нашу созданную таску и + добавляем таски, которые уже были. По правила имьютабельности, мы не можем изменять массив "стартовый"
    let newTasks = [task, ...tasks];
    //вот тебе новые таски
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });

    // //‼️короче запись
    // setTasks({ ...tasksObj, [todolistId]: [...tasksObj[todolistId], task] });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    //сначала достаем таски
    let tasks = tasksObj[todolistId];
    //иммутабельно создаем новое состояние
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });

      // //‼️короче запись
      // setTasks({
      //   ...tasksObj,
      //   [todolistId]: tasksObj[todolistId].map((t) => t.id === taskId ? { ...t, isDone: isDone } : t),
      // });
    }
    //заполняем копию теми же данными, которые есть в старом массиве tasks (деструктуризация)
    //передаем новое состояние, для обновления его визуализации
  }

  function addToDoList(title: string) {
    let todolist: ToDoListType = {
      id: v1(),
      title: title,
      filter: "All",
    };
    setTodolists([todolist, ...todolists]);
    setTasks({ ...tasksObj, [todolist.id]: [] });
  }

  function changeTaskTitle(
    taskId: string,
    newValue: string,
    todolistId: string
  ) {
    let tasks = tasksObj[todolistId];
    //иммутабельно создаем новое состояние
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newValue;
      setTasks({ ...tasksObj });
    }
  }

  //UI
  return (
    <div className="app">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Container fixed>
        <Grid container style={{padding: '20px'}}>
          <AddItemForm addItem={addToDoList} />
        </Grid>

        <Grid container spacing={3}>
          {todolists.map((tl) => {
            let taskForToDoList = tasksObj[tl.id];

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
