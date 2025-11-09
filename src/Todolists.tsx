import {
  changeTodolistFilterAC, changeTodolistTitleAC,
  removeTodolistAC
} from "@/model/todolists-reducer.ts";
import {FilterValuesType} from "@/model/todolists-reducer.test.ts";
import {
  addTaskAC,
  changeTaskStatusAC, changeTaskTitleAC,
  removeTaskAC
} from "@/model/tasks-reducer.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {selectTodolists} from "@/model/todolists-selectors.ts";
import {selectTasks} from "@/model/tasks-selectors.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import { ToDoList } from "./ToDoList";
import { Grid, Paper } from "@mui/material";

export const Todolists = () => {

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
  function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
    const action = changeTaskTitleAC({taskId, newValue, todolistId})
    dispatch(action)
  }

  return (
    <>
      {todolists.map((tl) => {
        let taskForToDoList = tasksObj[tl.id];

        console.log('tasks from tasksObj:', tasksObj[tl.id]);
        console.log('taskForToDoList:', taskForToDoList);

        if (tl.filter === "Completed") {
          taskForToDoList = tasksObj[tl.id].filter((obj) => obj.isDone === true);
        }
        if (tl.filter === "Active") {
          taskForToDoList = tasksObj[tl.id].filter((obj) => obj.isDone === false);
        }

        return (
          <Grid key={tl.id}>
            <Paper sx={{p: '0 20px 20px 20px'}}>
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
    </>
  );
}
