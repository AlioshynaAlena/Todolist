import type { Todolist } from "./todolistsApi.types.ts"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi.ts"
import { DomainTodolists } from "@/features/todolists/model/types/types.ts"

export const todolistsApi = baseApi.injectEndpoints({
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
      providesTags: ["Todolist"],
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      query: (title) => ({
        url: "/todo-lists",
        method: "POST",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
    deleteTodolist: build.mutation<BaseResponse, string>({
      query: (id) => ({
        url: `todo-lists/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(id: string, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistsApi.util.updateQueryData("getTodolists", undefined, (state) => {
            const index = state.findIndex((todolist) => todolist.id === id)
            if (index !== -1) {
              state.splice(index, 1)
            }
          }),
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: ["Todolist"],
    }),
    changeTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
      query: ({ id, title }) => ({
        url: `todo-lists/${id}`,
        method: "PUT",
        body: { title },
      }),
      invalidatesTags: ["Todolist"],
    }),
  }),
})

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useDeleteTodolistMutation,
  useChangeTodolistTitleMutation,
} = todolistsApi
