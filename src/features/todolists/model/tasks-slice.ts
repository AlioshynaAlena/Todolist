import { nanoid } from "@reduxjs/toolkit"
import { addTodolistTC, removeTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { createAppSlice } from "@/common/utils"

// //✅state
// const initialState: TasksStateType = {
//   [todolistId1]: [
//     { id: nanoid(), title: "HTML&CSS", isDone: true },
//     { id: nanoid(), title: "JS", isDone: true },
//     { id: nanoid(), title: "React", isDone: false },
//     { id: nanoid(), title: "Rest API", isDone: false },
//     { id: nanoid(), title: "GraphQL", isDone: false },
//   ],
//   [todolistId2]: [
//     { id: nanoid(), title: "Book", isDone: false },
//     { id: nanoid(), title: "Milk", isDone: true },
//     { id: nanoid(), title: "Eggs", isDone: true },
//     { id: nanoid(), title: "Potatoes", isDone: true },
//     { id: nanoid(), title: "Oil", isDone: true },
//   ],
// }

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

export const taskSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => {
    return {
      removeTaskAC: create.reducer<{ taskId: string; todolistId: string }>((state, action) => {
        const index = state[action.payload.todolistId].findIndex((todo) => todo.id === action.payload.taskId)
        if (index !== -1) state[action.payload.todolistId].splice(index, 1)
      }),
      addTaskAC: create.reducer<{ title: string; todolistId: string }>((state, action) => {
        const task = { id: nanoid(), title: action.payload.title, isDone: false }
        state[action.payload.todolistId].unshift(task)
      }),
      changeTaskStatusAC: create.reducer<{ taskId: string; isDone: boolean; todolistId: string }>((state, action) => {
        const index = state[action.payload.todolistId].findIndex((todo) => todo.id === action.payload.taskId)
        if (index !== -1) state[action.payload.todolistId][index].isDone = action.payload.isDone
      }),
      changeTaskTitleAC: create.reducer<{ taskId: string; newValue: string; todolistId: string }>((state, action) => {
        const task = state[action.payload.todolistId].find((todo) => todo.id === action.payload.taskId)
        if (task) task.title = action.payload.newValue
      }),
    }
  },
  //extraReducers используем когда нам нужно сделать dispatch AC, который
  // находится в нескольких slice
  extraReducers: (builder) => {
    builder
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        delete state[action.payload.id]
      })
  },
})

export const tasksReducer = taskSlice.reducer
export const { removeTaskAC, addTaskAC, changeTaskStatusAC, changeTaskTitleAC } = taskSlice.actions
export const { selectTasks } = taskSlice.selectors
