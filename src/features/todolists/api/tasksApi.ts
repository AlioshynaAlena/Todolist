import { DomainTask, GetTasksResponse, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { BaseResponse } from "@/common/types"
import { baseApi } from "@/app/baseApi"

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (todolistId) => {
        return {
          method: "get",
          url: `todo-lists/${todolistId}/tasks`,
        }
      },
      providesTags: (res, _err, todolistId) =>
        res
          ? [...res.items.map(({ id }) => ({ type: "Task", id }) as const), { type: "Task", id: todolistId }]
          : ["Task"],
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; title: string }>({
      query: ({ todolistId, title }) => ({
        url: `todo-lists/${todolistId}/tasks`,
        method: "post",
        body: { title },
      }),
      invalidatesTags: (_res, _err, { todolistId }) => [{ type: "Task", id: todolistId }],
    }),
    deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "delete",
      }),
      invalidatesTags: (_res, _err, { taskId }) => [{ type: "Task", id: taskId }],
    }),
    updateTask: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "put",
        body: model,
      }),
      invalidatesTags: (_res, _err, { taskId }) => [{ type: "Task", id: taskId }],
    }),
    changeTaskTitle: build.mutation<
      BaseResponse<{ item: DomainTask }>,
      { todolistId: string; taskId: string; model: UpdateTaskModel }
    >({
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: "put",
        body: model,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useChangeTaskTitleMutation,
} = tasksApi

// export const tasksApi = {
//   getTasks(todolistId: string) {
//     return instance.get<GetTasksResponse>(`/todo-lists/${todolistId}/tasks`)
//   },
//   createTask(payload: { todolistId: string; title: string }) {
//     return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${payload.todolistId}/tasks`, {
//       title: payload.title,
//     })
//   },
//   deleteTask(payload: { todolistId: string; taskId: string }) {
//     return instance.delete<BaseResponse>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
//   },
//   updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
//     const { todolistId, taskId, model } = payload
//     return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
//   },
//   changeTaskTitle(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
//     const { todolistId, taskId, model } = payload
//     return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
//   },
// }
