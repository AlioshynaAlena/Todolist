import {v1} from 'uuid'
import {
  addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC,
  removeTodolistAC,
  todolistsReducer
} from './todolists-reducer'
import {ToDoListType} from "../App.tsx";
import { beforeEach, expect, test } from 'vitest'

let todolistId1: string
let todolistId2: string
let startState: ToDoListType[] = []

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = [
    { id: todolistId1, title: 'What to learn', filter: 'All' },
    { id: todolistId2, title: 'What to buy', filter: 'All' },
  ]
})

test('correct todolist should be deleted', () => {

  // 2. Действие
  // const action = {
  //   type: 'REMOVE-TODOLIST',
  //   payload: {
  //     id: todolistId1
  //   },
  // } as const

  // const endState = todolistsReducer(startState, action)

  const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

  // 3. Проверка, что действие измененило state соответствующим образом
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, не любой
  expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
// 2. Действие
//   const action = {
//     type: 'ADD-TODOLIST',
//     payload: {
//       title: 'New todolist'
//     },
//   } as const

  const endState = todolistsReducer(startState, addTodolistAC('New todolist'))

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe('New todolist')
})

test('correct todolist should change its title', () => {

  // const action = {
  //   type: 'CHANGE-TODOLIST-TITLE',
  //   payload: {
  //     id: todolistId2,
  //     title: 'New title'
  //   },
  // } as const

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, 'New title' ))

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe('New title')
})

test('correct todolist should change its filter', () => {

  // const action = {
  //   type: 'CHANGE-TODOLIST-FILTER',
  //   payload: {
  //     id: todolistId2,
  //     filter: 'Completed'
  //   }
  // } as const

  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, 'Completed' ))

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe('Completed')
})