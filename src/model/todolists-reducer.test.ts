import {v1} from 'uuid'
import { expect, test } from 'vitest'
import {todolistsReducer} from './todolists-reducer'
import {ToDoListType} from "../App.tsx";

test('correct todolist should be deleted', () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  // 1. Стартовый state
  const startState: ToDoListType[] = [
    {id: todolistId1, title: 'What to learn', filter: 'All'},
    {id: todolistId2, title: 'What to buy', filter: 'All'},
  ]

  // 2. Действие
  const action = {
    type: 'delete_todolist',
    payload: {
      id: todolistId1,
    },
  }
  const endState = todolistsReducer(startState, action)

  // 3. Проверка, что действие измененило state соответствующим образом
  // в массиве останется один тудулист
  expect(endState.length).toBe(1)
  // удалится нужный тудулист, не любой
  expect(endState[0].id).toBe(todolistId2)
})