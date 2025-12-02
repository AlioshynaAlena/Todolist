import { createSlice, nanoid } from "@reduxjs/toolkit"
import { FilterValuesType, ToDoListType } from "@/features/todolists/model/__tests__/todolists-reducer.test.ts"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as ToDoListType[],
  reducers: (create) => {
    return {
      removeTodolistAC: create.reducer<{ id: string }>((state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      }),
      changeTodolistTitleAC: create.reducer<{ id: string; title: string }>((state, action) => {
        const todolist = state.find((todo) => todo.id === action.payload.id)
        if (todolist) todolist.title = action.payload.title
      }),
      changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state[index].filter = action.payload.filter
      }),
      addTodolistAC: create.preparedReducer(
        (title: string) => {
          return {
            payload: {
              title,
              filter: "All",
              id: nanoid(),
            } as ToDoListType,
          }
        },
        (state, action) => {
          state.push(action.payload)
        },
      ),
    }
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { removeTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, addTodolistAC } = todolistsSlice.actions

//✅state
export let todolistId1 = nanoid()
export let todolistId2 = nanoid()
// const initialState: ToDoListType[] = [
//   { id: todolistId1, title: "What to learn", filter: "All" },
//   { id: todolistId2, title: "What to buy", filter: "All" },
// ]

//🧩action
// export const removeTodolistAC = createAction<{ id: string }>("todolists/removeTodolist")
// export const addTodolistAC = createAction("todolists/addTodolist", (title: string) => {
//   return { payload: { title, id: nanoid() } }
// })
// export const changeTodolistTitleAC = createAction<{ id: string; title: string }>("todolists/changeTodolistTitle")
// export const changeTodolistFilterAC = createAction<{ id: string; filter: FilterValuesType }>(
//   "todolists/changeTodolistFilter",
// )

//🧠function
// export const todolistsReducer = createReducer(initialState, (builder) => {
//   builder
//     // .addCase(removeTodolistAC, (state, action) => {
//     //   const index = state.findIndex((todo) => todo.id === action.payload.id)
//     //   if (index !== -1) state.splice(index, 1)
//     // })
//     // .addCase(addTodolistAC, (state, action) => {
//     //   state.push({ id: action.payload.id, title: action.payload.title, filter: "All" })
//     // })
//   // .addCase(changeTodolistFilterAC, (state, action) => {
//   //   const index = state.findIndex((todo) => todo.id === action.payload.id)
//   //   if (index !== -1) state[index].filter = action.payload.filter
//   // })
//   // .addCase(changeTodolistTitleAC, (state, action) => {
//   //   const todolist = state.find((todo) => todo.id === action.payload.id)
//   //   if (todolist) todolist.title = action.payload.title
//   // }
//   // )
// })

// addTodolistAC: create.reducer<string>((state, action) => {
//   state.push({ id: action.payload.id, title: action.payload.title, filter: "All" })
// }),
