import { addTodolistTC, DomainTodolists, todolistsReducer } from "../todolists-slice.ts"
import { tasksReducer, TasksStateType } from "../tasks-slice.ts"
import { expect, test } from "vitest"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<DomainTodolists> = []

  // Создаем mock todolist
  const newTodolist = {
    id: "new-todolist-id",
    title: "new todolist",
    addedDate: "2024-01-01",
    order: 0,
  }

  // Используем fulfilled action creator
  const action = addTodolistTC.fulfilled(
    { todolist: newTodolist }, // payload
    "requestId", // requestId
    "new todolist", // arg (title)
  )

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodoistsState[0].id

  // Проверяем, что id совпадают
  expect(idFromTasks).toBe(newTodolist.id)
  expect(idFromTodolists).toBe(newTodolist.id)
  expect(idFromTasks).toBe(idFromTodolists)

  // Или можно проверить через payload
  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
