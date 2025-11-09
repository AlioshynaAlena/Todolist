import {
  addTodolistAC,
removeTodolistAC, todolistId1, todolistId2
} from "./todolists-reducer.ts";
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";



export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type TasksStateType = {
  [key: string]: TaskType[];
};

//✅state
const initialState: TasksStateType = {
  [todolistId1]: [
    {id: nanoid(), title: "HTML&CSS", isDone: true},
    {id: nanoid(), title: "JS", isDone: true},
    {id: nanoid(), title: "React", isDone: false},
    {id: nanoid(), title: "Rest API", isDone: false},
    {id: nanoid(), title: "GraphQL", isDone: false},
  ],
  [todolistId2]: [
    {id: nanoid(), title: "Book", isDone: false},
    {id: nanoid(), title: "Milk", isDone: true},
    {id: nanoid(), title: "Eggs", isDone: true},
    {id: nanoid(), title: "Potatoes", isDone: true},
    {id: nanoid(), title: "Oil", isDone: true},
  ],
}

//🧩action
export const removeTaskAC = createAction<{taskId: string, todolistId: string }>('tasks/removeTask')
export const addTaskAC = createAction<{title: string, todolistId: string }>('tasks/addTask')
export const changeTaskStatusAC = createAction<{taskId: string, isDone: boolean, todolistId: string}>('tasks/changeTaskStatus')
export const changeTaskTitleAC = createAction<{taskId: string, newValue: string, todolistId: string }>('tasks/changeTaskTitle')


//🧠function
export const tasksReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(removeTaskAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(todo => todo.id === action.payload.taskId)
      if (index !== -1) state[action.payload.todolistId].splice(index, 1)
    })
    .addCase(addTaskAC, (state, action) => {
      const task = {id: nanoid(), title: action.payload.title, isDone: false};
      state[action.payload.todolistId].unshift(task)
    })
    .addCase(changeTaskStatusAC, (state, action) => {
      const index = state[action.payload.todolistId].findIndex(todo => todo.id === action.payload.taskId)
      if (index !== -1) state[action.payload.todolistId][index].isDone = action.payload.isDone
    })
    .addCase(changeTaskTitleAC, (state, action) => {
      const task = state[action.payload.todolistId].find(todo => todo.id === action.payload.taskId)
      if (task) task.title = action.payload.newValue
    })
    .addCase(addTodolistAC, (state, action) => {
    state[action.payload.id] = []
  })
    .addCase(removeTodolistAC, (state, action) => {
      delete state[action.payload.id]
    })
})