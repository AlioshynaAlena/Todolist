import { addTodolistTC, removeTodolistTC } from "@/features/todolists/model/todolists-slice.ts"
import { createAppSlice } from "@/common/utils"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"
import { RootState } from "@/app/store.ts"

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

export type TasksStateType = {
  [key: string]: DomainTask[]
}

export const taskSlice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksStateType,
  selectors: {
    selectTasks: (state) => state,
  },
  reducers: (create) => {
    return {
      changeTaskTitleAC: create.reducer<{ taskId: string; newValue: string; todolistId: string }>((state, action) => {
        const task = state[action.payload.todolistId].find((todo) => todo.id === action.payload.taskId)
        if (task) task.title = action.payload.newValue
      }),
      //🛷Thunk creators
      fetchTasksTC: create.asyncThunk(
        async (todolistId: string, thunkAPI) => {
          try {
            const res = await tasksApi.getTasks(todolistId) //2
            return { tasks: res.data.items, todolistId } //4
          } catch (e) {
            return thunkAPI.rejectWithValue(e)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
          },
        },
      ),
      addTaskTC: create.asyncThunk(
        async (args: { todolistId: string; title: string }, thunkAPI) => {
          try {
            const res = await tasksApi.createTask(args) //2
            return { tasks: res.data.data.item } //4
          } catch (e) {
            return thunkAPI.rejectWithValue(e)
          }
        },
        {
          fulfilled: (state, action) => {
            state[action.payload.tasks.todoListId].unshift(action.payload.tasks)
          },
        },
      ),
      removeTaskTC: create.asyncThunk(
        async (args: { todolistId: string; taskId: string }, thunkAPI) => {
          try {
            await tasksApi.deleteTask(args)
            return args
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state[action.payload.todolistId].findIndex((todo) => todo.id === action.payload.taskId)
            if (index !== -1) state[action.payload.todolistId].splice(index, 1)
          },
        },
      ),
      changeTaskStatusTC: create.asyncThunk(
        async (payload: { todolistId: string; taskId: string; status: TaskStatus }, thunkAPI) => {
          const { todolistId, taskId, status } = payload

          const allTodolistTasks = (thunkAPI.getState() as RootState).tasks[todolistId]
          const task = allTodolistTasks.find((task) => task.id === taskId)

          if (!task) {
            return thunkAPI.rejectWithValue(null)
          }

          const model: UpdateTaskModel = {
            description: task.description,
            title: task.title,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status,
          }

          try {
            const res = await tasksApi.updateTask({ todolistId, taskId, model })
            return { task: res.data.data.item }
          } catch (error) {
            return thunkAPI.rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const task = state[action.payload.task.todoListId].find((task) => task.id === action.payload.task.id)
            if (task) {
              task.status = action.payload.task.status
            }
          },
        },
      ),
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
export const { removeTaskTC, changeTaskTitleAC, fetchTasksTC, addTaskTC, changeTaskStatusTC } = taskSlice.actions
export const { selectTasks } = taskSlice.selectors
