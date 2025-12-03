import { beforeEach, expect, test } from "vitest"
import { TasksStateType } from "../../../../AppEx.tsx"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "../tasks-slice.ts"
import { addTodolistAC, removeTodolistAC } from "../todolists-slice.ts"

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
  const action = removeTaskAC("2", "todolistId2")
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(5)
  expect(endState["todolistId2"].length).toBe(4)
  expect(endState["todolistId2"][0].id).toBe("1")
  expect(endState["todolistId2"][1].id).toBe("3")
  expect(endState["todolistId2"].every((t) => t.id != "2")).toBeTruthy()
})

test("correct task should be added to a correct array", () => {
  const action = addTaskAC("juice", "todolistId2")
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId1"].length).toBe(5)
  expect(endState["todolistId2"].length).toBe(6)
  expect(endState["todolistId2"][0].id).toBeDefined()
  expect(endState["todolistId2"][0].title).toBe("juice")
  expect(endState["todolistId2"][0].isDone).toBe(false)
})

test("status of specified task should be changed", () => {
  const action = changeTaskStatusAC("2", false, "todolistId2")
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][1].isDone).toBeFalsy()
  expect(endState["todolistId1"][1].isDone).toBeTruthy()
})

test("title of specified task should be changed", () => {
  const action = changeTaskTitleAC("2", "MilkyWay", "todolistId2")
  const endState = tasksReducer(startState, action)

  expect(endState["todolistId2"][1].title).toBe("MilkyWay")
  expect(endState["todolistId1"][1].title).toBe("JS")
})

test("new property with new array should be added when new todolist is added", () => {
  const action = addTodolistAC("no matter")
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }
  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})

test("property with todo list should be deleted", () => {
  const action = removeTodolistAC("todolistId2")
  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState["todolistId2"]).not.toBeDefined()
})
