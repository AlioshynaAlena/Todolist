import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer,
} from "../todolists-slice.ts"
import { beforeEach, expect, test } from "vitest"
import { nanoid } from "@reduxjs/toolkit"

export type FilterValuesType = "All" | "Completed" | "Active"
export type ToDoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

let todolistId1: string
let todolistId2: string
let startState: ToDoListType[] = []

beforeEach(() => {
  todolistId1 = nanoid()
  todolistId2 = nanoid()

  startState = [
    { id: todolistId1, title: "What to learn", filter: "All" },
    { id: todolistId2, title: "What to buy", filter: "All" },
  ]
})

test("correct todolist should be deleted", () => {
  const endState = todolistsReducer(startState, removeTodolistAC({ id: todolistId1 }))
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})

test("correct todolist should be added", () => {
  const endState = todolistsReducer(startState, addTodolistAC("New todolist"))
  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe("New todolist")
})

test("correct todolist should change its title", () => {
  const endState = todolistsReducer(startState, changeTodolistTitleAC({ id: todolistId2, title: "New title" }))
  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe("New title")
})

test("correct todolist should change its filter", () => {
  const endState = todolistsReducer(startState, changeTodolistFilterAC({ id: todolistId2, filter: "Completed" }))
  expect(endState[0].filter).toBe("All")
  expect(endState[1].filter).toBe("Completed")
})
