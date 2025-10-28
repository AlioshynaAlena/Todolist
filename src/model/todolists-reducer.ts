//в этой функции будет находится "мозг"
import {v1} from "uuid";
import {FilterValuesType, ToDoListType} from "../App.tsx";

export type DeleteTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  payload: {
    id: string
  }
}
export type AddTodolistActionType = {
  type: 'ADD-TODOLIST'
  payload: {
    title: string
    todolistId: string
  }
}
export type ChangeTodolistTitleType = {
  type: 'CHANGE-TODOLIST-TITLE'
  payload: {
    id: string
    title: string
  }
}
export type ChangeTodolistFilterType = {
  type: 'CHANGE-TODOLIST-FILTER'
  payload: {
    id: string
    filter: FilterValuesType
  }
}

//собираем в единый  тип
type ActionType =
  | DeleteTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleType
  | ChangeTodolistFilterType


let todolistId1 = v1();
let todolistId2 = v1();

const initialState: ToDoListType[] = [
  {id: todolistId1, title: "What to learn ", filter: "All"},
  {id: todolistId2, title: "What to buy ", filter: "All"},
]

export const todolistsReducer = (state = initialState, action: ActionType): ToDoListType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(t => t.id !== action.payload.id)
    }
    case 'ADD-TODOLIST': {
      const todolist: ToDoListType = {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: "All",
      };
      return [...state, todolist ]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return state.map(t => t.id === action.payload.id ? {...t, title: action.payload.title }: t)
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return state.map(t => t.id === action.payload.id? {...t, filter: action.payload.filter} : t)
    }
    default:
      return state
  }
}

//action
export const removeTodolistAC = (id: string): DeleteTodolistActionType => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {
      id: id
    } as const
  }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return {
    type: 'ADD-TODOLIST',
    payload: {
      title: title,
      todolistId: v1()
    }
  } as const
}

export const changeTodolistTitleAC = (id: string, title: string):ChangeTodolistTitleType => {
  return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
      id: id,
      title: title
    }
  } as const
}

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType ): ChangeTodolistFilterType => {
  return {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
      id: id,
      filter: filter
    }
  } as const
}