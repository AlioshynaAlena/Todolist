import { beforeEach, expect, test } from "vitest"
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  tasksReducer,
  TasksStateType,
} from "../tasks-slice.ts"
import { addTodolistTC, removeTodolistTC } from "@/features/todolists/model/todolists-slice.ts"

let startState: TasksStateType = {}

beforeEach(() => {
  startState = {
    todolistId1: [
      { id: "1", title: "HTML&CSS", isDone: true },
      { id: "2", title: "JS", isDone: true },
      { id: "3", title: "React", isDone: false },
      { id: "4", title: "Rest API", isDone: false },
      { id: "5", title: "GraphQL", isDone: false },
    ],
    todolistId2: [
      { id: "1", title: "Book", isDone: false },
      { id: "2", title: "Milk", isDone: true },
      { id: "3", title: "Eggs", isDone: true },
      { id: "4", title: "Potatoes", isDone: true },
      { id: "5", title: "Oil", isDone: true },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const action = removeTaskAC({ taskId: "2", todolistId: "todolistId2" })
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(5)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBe("1")
  expect(endState["todolistId2"][1].id).toBe("3")
  expect(endState["todolistId2"].every((t) => t.id != "2")).toBeTruthy()
})

test("correct task should be added to a correct array", () => {
  const action = addTaskAC({ title: "juice", todolistId: "todolistId2" })
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(5)
  expect(endState["todolistId2"].length).toBe(6)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juice")
  expect(endState["todolistId2"][0].isDone).toBe(false)
})

test("status of specified task should be changed", () => {
  const action = changeTaskStatusAC({ taskId: "2", isDone: false, todolistId: "todolistId2" })
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][1].isDone).toBeFalsy()
  expect(endState["todolistId1"][1].isDone).toBeTruthy()
})

test("title of specified task should be changed", () => {
  const action = changeTaskTitleAC({ taskId: "2", newValue: "MilkyWay", todolistId: "todolistId2" })
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][1].title).toBe("MilkyWay")
  expect(endState["todolistId1"][1].title).toBe("JS")
})

test("new property with new array should be added when new todolist is added", () => {
  const newTodolist = {
    id: "new-todolist-id",
    title: "New Todolist",
    addedDate: "2024-01-01",
    order: 0,
  }

  const action = addTodolistTC.fulfilled({ todolist: newTodolist }, "requestId", "New Todolist")

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2")

  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
  // Проверяем, что newKey равен id нового todolist
  expect(newKey).toBe("new-todolist-id")
})

test("property with todo list should be deleted", () => {
  const action = removeTodolistTC.fulfilled({ id: "todolistId2" }, "requestId", "todolistId2")

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})
