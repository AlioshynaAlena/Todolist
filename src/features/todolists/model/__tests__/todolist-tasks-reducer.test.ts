import {TasksStateType, ToDoListType} from "../../../../AppEx.tsx";
import {addTodolistAC, todolistsReducer} from "../todolists-reducer.ts";
import {tasksReducer} from "../tasks-reducer.ts";
import { expect, test } from 'vitest'

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<ToDoListType> = []

  const action = addTodolistAC("new todolist")

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodoistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodoistsState[0].id

  expect(idFromTasks).toBe(action.payload.todolistId)
  expect(idFromTodolists).toBe(action.payload.todolistId)
})

