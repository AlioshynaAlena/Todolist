import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  DomainTodolists,
  removeTodolistTC,
  todolistsReducer,
} from "../todolists-slice.ts"
import { beforeEach, expect, test } from "vitest"
import { nanoid } from "@reduxjs/toolkit"

export type FilterValuesType = "All" | "Completed" | "Active"

let todolistId1: string
let todolistId2: string
let startState: DomainTodolists[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    {
      id: todolistId1,
      title: "What to learn",
      filter: "All",
      addedDate: "", // Добавляем обязательные поля
      order: 0,
    },
    {
      id: todolistId2,
      title: "What to buy",
      filter: "All",
      addedDate: "", // Добавляем обязательные поля
      order: 0,
    },
  ]
})

test("correct todolist should be deleted", () => {
  const action = removeTodolistTC.fulfilled({ id: todolistId1 }, "requestId", todolistId1)
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const newTodolist = {
    id: "new-id",
    title: "New todolist",
    addedDate: "2024-01-01",
    order: 0,
  }

  const action = addTodolistTC.fulfilled({ todolist: newTodolist }, "requestId", "New todolist")
  const endState = todolistsReducer(startState, action)

  expect(endState.length).toBe(3)
  expect(endState[0].id).toBe("new-id")
  expect(endState[0].title).toBe("New todolist")
  expect(endState[0].filter).toBe("All")
  expect(endState[0].addedDate).toBe("2024-01-01")
  expect(endState[0].order).toBe(0)
})

test("correct todolist should change its title", () => {
  const args = { id: todolistId2, title: "New title" }
  const action = changeTodolistTitleTC.fulfilled(args, "requestId", args)
  const endState = todolistsReducer(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe("New title")
})

test("correct todolist should change its filter", () => {
  const action = changeTodolistFilterAC({ id: todolistId2, filter: "Completed" })
  const endState = todolistsReducer(startState, action)
  expect(endState[0].filter).toBe("All")
  expect(endState[1].filter).toBe("Completed")
})
