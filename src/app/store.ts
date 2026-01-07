import { todolistsReducer, todolistsSlice } from "@/features/todolists/model/todolists-slice.ts"
import { taskSlice, tasksReducer } from "@/features/todolists/model/tasks-slice.ts"
import { configureStore } from "@reduxjs/toolkit"
import { appReducer, appSlice } from "./app-slice.ts"
import { authReducer, authSlice } from "@/features/auth/model/auth-slice.ts"
import { todolistsApi } from "@/features/todolists/api/_todolistsApi.ts"
import { setupListeners } from "@reduxjs/toolkit/query"

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [taskSlice.name]: tasksReducer,
    [todolistsSlice.name]: todolistsReducer,
    [authSlice.name]: authReducer,
    [todolistsApi.reducerPath]: todolistsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todolistsApi.middleware),
})

setupListeners(store.dispatch)
// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch

// для возможности обращения к store в консоли браузера
// @ts-ignore
window.store = store
