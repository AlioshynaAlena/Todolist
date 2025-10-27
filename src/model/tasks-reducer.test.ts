import { beforeEach, expect, test } from 'vitest'
import {TasksStateType} from '../App'
import {removeTaskAC, tasksReducer} from "./tasks-reducer.ts";


let startState: TasksStateType = {}

beforeEach(() => {

  startState = {
    todolistId1: [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '2', title: "JS", isDone: true},
      {id: '3', title: "React", isDone: false},
      {id: '4', title: "Rest API", isDone: false},
      {id: '5', title: "GraphQL", isDone: false},
    ],
    todolistId2: [
      {id: '1', title: "Book", isDone: false},
      {id: '2', title: "Milk", isDone: true},
      {id: '3', title: "Eggs", isDone: true},
      {id: '4', title: "Potatoes", isDone: true},
      {id: '5', title: "Oil", isDone: true},
    ],
  }
})

// test('array should be created for new todolist', () => {
//   const endState = tasksReducer(startState, createTodolistAC('New todolist'))
//
//   const keys = Object.keys(endState)
//   const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
//   if (!newKey) {
//     throw Error('New key should be added')
//   }
//
//   expect(keys.length).toBe(3)
//   expect(endState[newKey]).toEqual([])
// })

test('property with todolistId should be deleted', () => {
  const endState = tasksReducer(startState, removeTaskAC('todolistId1'))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId1']).not.toBeDefined()
  // or
  expect(endState['todolistId1']).toBeUndefined()
})
test('проверка, что значения не равны ожидаемому', () => {
  // ✅ Тест пройден
  expect(5).not.toBe(10) // 5 не равно 10
  expect('hello').not.toContain('world') // строка 'hello' не содержит 'world'
})