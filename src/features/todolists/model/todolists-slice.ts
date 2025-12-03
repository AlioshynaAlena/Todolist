import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { FilterValuesType } from "@/features/todolists/model/__tests__/todolists-reducer.test.ts"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolists[],
  reducers: (create) => {
    return {
      removeTodolistAC: create.reducer<{ id: string }>((state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
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
            } as DomainTodolists,
          }
        },
        (state, action) => {
          state.push(action.payload)
        },
      ),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosTC.fulfilled, (_state, action) => {
        return action.payload.todolists.map((tl) => {
          return { ...tl, filter: "ALL" }
        })
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const todolist = state.find((todo) => todo.id === action.payload.id)
        if (todolist) todolist.title = action.payload.title
      })
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { removeTodolistAC, changeTodolistTitleAC, changeTodolistFilterAC, addTodolistAC } = todolistsSlice.actions

export type ToDoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type DomainTodolists = Todolist & { filter: FilterValuesType }

//🛷Thunk
export const fetchTodosTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_, thunkAPI) => {
  try {
    const res = await todolistsApi.getTodolists()
    return { todolists: res.data }
  } catch (e) {
    return thunkAPI.rejectWithValue(e)
  }
})

export const changeTodolistTitleTC = createAsyncThunk(
  `${todolistsSlice.name}/changeTodolistTitleTC`,
  async (args: { id: string; title: string }, thunkAPI) => {
    try {
      await todolistsApi.changeTodolistTitle(args)
      return args
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  },
)

//✅state
// export let todolistId1 = nanoid()
// export let todolistId2 = nanoid()
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
