import {TasksStateType} from "../App.tsx";
import {v1} from "uuid";

//✅state
let todolistId1 = v1();
let todolistId2 = v1();

const initialState = {
  [todolistId1]: [
    {id: v1(), title: "HTML&CSS", isDone: true},
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React", isDone: false},
    {id: v1(), title: "Rest API", isDone: false},
    {id: v1(), title: "GraphQL", isDone: false},
  ],
  [todolistId2]: [
    {id: v1(), title: "Book", isDone: false},
    {id: v1(), title: "Milk", isDone: true},
    {id: v1(), title: "Eggs", isDone: true},
    {id: v1(), title: "Popatoes", isDone: true},
    {id: v1(), title: "Oil", isDone: true},
  ],
}

//⭐️type
type ActionType = RemoveTaskACType

type RemoveTaskACType = {
  type: 'REMOVE-TASK',
  payload: {
    id: string
  }
}



//🧠function
export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const newState = {...state}
      delete newState[action.payload.id]
      return newState

      // return {...state, [action.payload.id]: state[action.payload.id].filter(t => t.id !== action.payload.id )}
    }
    default:
      return state
  }
}


//🧩action
export const removeTaskAC = (taskId: string): RemoveTaskACType => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      id: taskId
    }
  } as const
}