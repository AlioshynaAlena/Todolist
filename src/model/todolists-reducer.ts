//в этой функции будет находится "мозг"
import {v1} from "uuid";
import {ToDoListType} from "../App.tsx";

let todolistId1 = v1();
let todolistId2 = v1();

const initialState: ToDoListType[] = [
  {id: todolistId1, title: "What to learn ", filter: "All"},
  {id: todolistId2, title: "What to buy ", filter: "All"},
]

type ActionType = {
  type: string
  payload: any
}

export const todolistsReducer = (state = initialState, action: ActionType): ToDoListType[] => {
switch (action.type) {
  case 'REMOVE-TODOLIST': {
    return state
  }
  case 'ADD-TODOLIST': {
    return state
  }
  default: return state
}
}