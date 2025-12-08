import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { FilterValuesType } from "@/features/todolists/model/__tests__/todolists-reducer.test.ts"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
// import { selectTodolists } from "@/features/todolists/model/todolists-selectors.ts"

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState: [] as DomainTodolists[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => {
    return {
      changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state[index].filter = action.payload.filter
      }),
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosTC.fulfilled, (_state, action) => {
        return action.payload.todolists.map((tl) => {
          return { ...tl, filter: "All" }
        })
      })
      .addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
        const todolist = state.find((todo) => todo.id === action.payload.id)
        if (todolist) todolist.title = action.payload.title
      })
      .addCase(removeTodolistTC.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(addTodolistTC.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: "All" })
      })
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const { changeTodolistFilterAC } = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

//🛷Thunk
export const fetchTodosTC = createAsyncThunk(`${todolistsSlice.name}/fetchTodolistsTC`, async (_, thunkAPI) => {
  try {
    const res = await todolistsApi.getTodolists() //2
    return { todolists: res.data } //4
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

export const removeTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/removeTodolistTC`,
  async (id: string, thunkAPI) => {
    try {
      await todolistsApi.deleteTodolist(id) //2
      return { id } //4
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  },
)

export const addTodolistTC = createAsyncThunk(
  `${todolistsSlice.name}/addTodolistTC`,
  async (title: string, thunkAPI) => {
    try {
      const res = await todolistsApi.createTodolist(title) //2
      console.log(res.data.data.item)
      return { todolist: res.data.data.item } //4
    } catch (e) {
      return thunkAPI.rejectWithValue(e)
    }
  },
)

export type ToDoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type DomainTodolists = Todolist & { filter: FilterValuesType }
