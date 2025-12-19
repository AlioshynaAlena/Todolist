import { FilterValuesType } from "@/features/todolists/model/__tests__/todolists-reducer.test.ts"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { createAppSlice } from "@/common/utils"
import { setAppStatusAC } from "@/app/app-slice.ts"
import { RequestStatus } from "@/common/types/types.ts"

export const todolistsSlice = createAppSlice({
  name: "todolists",
  initialState: [] as DomainTodolists[],
  selectors: {
    selectTodolists: (state) => state,
  },
  reducers: (create) => {
    return {
      //action creators
      changeTodolistFilterAC: create.reducer<{ id: string; filter: FilterValuesType }>((state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state[index].filter = action.payload.filter
      }),
      changeTodolistEntityStatusAC: create.reducer<{ id: string; entityStatus: RequestStatus }>((state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id)
        if (index !== -1) state[index].entityStatus = action.payload.entityStatus
      }),
      //🛷Thunk creators
      fetchTodosTC: create.asyncThunk(
        async (_, thunkAPI) => {
          try {
            thunkAPI.dispatch(setAppStatusAC({ status: "loading" }))
            const res = await todolistsApi.getTodolists() //2
            thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }))
            return { todolists: res.data } //4
          } catch (e) {
            thunkAPI.dispatch(setAppStatusAC({ status: "failed" }))
            return thunkAPI.rejectWithValue(e)
          }
        },
        {
          fulfilled: (_state, action) => {
            return action.payload.todolists.map((tl) => {
              return { ...tl, filter: "All", entityStatus: "idle" }
            })
          },
        },
      ),
      changeTodolistTitleTC: create.asyncThunk(
        async (args: { id: string; title: string }, thunkAPI) => {
          try {
            await todolistsApi.changeTodolistTitle(args)
            return args
          } catch (e) {
            return thunkAPI.rejectWithValue(e)
          }
        },
        {
          fulfilled: (state, action) => {
            const todolist = state.find((todo) => todo.id === action.payload.id)
            if (todolist) todolist.title = action.payload.title
          },
        },
      ),
      removeTodolistTC: create.asyncThunk(
        async (id: string, thunkAPI) => {
          try {
            thunkAPI.dispatch(setAppStatusAC({ status: "loading" }))
            thunkAPI.dispatch(changeTodolistEntityStatusAC({ id, entityStatus: "loading" }))
            await todolistsApi.deleteTodolist(id) //2
            thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }))
            return { id } //4
          } catch (e) {
            thunkAPI.dispatch(setAppStatusAC({ status: "failed" }))
            return thunkAPI.rejectWithValue(e)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id)
            if (index !== -1) state.splice(index, 1)
          },
        },
      ),
      addTodolistTC: create.asyncThunk(
        async (title: string, thunkAPI) => {
          try {
            const res = await todolistsApi.createTodolist(title) //2
            console.log(res.data.data.item)
            return { todolist: res.data.data.item } //4
          } catch (e) {
            return thunkAPI.rejectWithValue(e)
          }
        },
        {
          fulfilled: (state, action) => {
            state.unshift({ ...action.payload.todolist, filter: "All", entityStatus: "idle" })
          },
        },
      ),
    }
  },
})

export const todolistsReducer = todolistsSlice.reducer
export const {
  changeTodolistFilterAC,
  fetchTodosTC,
  changeTodolistTitleTC,
  removeTodolistTC,
  addTodolistTC,
  changeTodolistEntityStatusAC,
} = todolistsSlice.actions
export const { selectTodolists } = todolistsSlice.selectors

export type ToDoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type DomainTodolists = Todolist & {
  filter: FilterValuesType
  entityStatus: RequestStatus
}
