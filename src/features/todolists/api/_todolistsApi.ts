import { instance } from "@/common/instance/instance"
import type { Todolist } from "./todolistsApi.types"
import { BaseResponse } from "@/common/types"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AUTH_TOKEN } from "@/common/constants"
import { DomainTodolists } from "@/features/todolists/model/todolists-slice.ts"

export const todolistsApi = createApi({
  reducerPath: "todolistsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    headers: {
      "API-KEY": import.meta.env.VITE_API_KEY,
    },
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem(AUTH_TOKEN)}`)
    },
  }),
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolists[], void>({
      query: () => {
        return {
          method: "get",
          url: "/todo-lists",
        }
      },
      transformResponse: (todolists: Todolist[]): DomainTodolists[] =>
        todolists.map((todolist) => ({ ...todolist, filter: "All", entityStatus: "idle" })),
    }),
  }),
})

export const { useGetTodolistsQuery } = todolistsApi

export const _todolistsApi = {
  getTodolists() {
    //3
    return instance.get<Todolist[]>("/todo-lists")
  },
  changeTodolistTitle(payload: { id: string; title: string }) {
    const { title, id } = payload
    return instance.put<BaseResponse>(`/todo-lists/${id}`, { title })
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: Todolist }>>("/todo-lists", { title })
  },
  deleteTodolist(id: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${id}`)
  },
}
