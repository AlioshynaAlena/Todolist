import {TasksStateType} from "../App.tsx";
import {v1} from "uuid";
import {
  AddTodolistActionType, ChangeTodolistFilterType,
  DeleteTodolistActionType
} from "./todolists-reducer.ts";

//✅state


//⭐️type
type ActionType =
  | RemoveTaskACType
  | AddTaskACType
  | ChangeTaskStatusACType
  | ChangeTaskTitleACType
  | AddTodolistActionType
  | DeleteTodolistActionType
  | ChangeTodolistFilterType

type RemoveTaskACType = {
  type: 'REMOVE-TASK',
  payload: {
    id: string
    todolistId: string
  }
}
type AddTaskACType = {
  type: 'ADD-TASK',
  payload: {
    title: string,
    todolistId: string
  }
}
type ChangeTaskStatusACType = {
  type: 'CHANGE-TASK-STATUS',
  payload: {
    taskId: string
    isDone: boolean
    todolistId: string
  }
}
type ChangeTaskTitleACType = {
  type: 'CHANGE-TASK-TITLE',
  payload: {
    taskId: string
    newValue: string
    todolistId: string
  }
}


//🧠function
export const tasksReducer = (state: TasksStateType = {}, action: ActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
// setTasksObj({...tasksObj, [todolistId]: tasksObj[todolistId].filter((t) => t.id !== id) })
      return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t =>
          t.id !== action.payload.id )}
    }
    case 'ADD-TASK': {
      const task = {id: v1(), title: action.payload.title, isDone: false};
      return {...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]  }
    }
    case 'CHANGE-TASK-STATUS': {
      // setTasksObj({...tasksObj,[todolistId]: tasksObj[todolistId].map((t) => t.id === taskId ? { ...t, isDone: isDone } : t)});
      return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
          t.id === action.payload.taskId ? {...t, isDone: action.payload.isDone } : t )}
    }
    case 'CHANGE-TASK-TITLE': {
      return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t =>
          t.id === action.payload.taskId ? {...t, title: action.payload.newValue} : t)}
    }
    case 'ADD-TODOLIST': {
      // setTasksObj({...tasksObj, [todolist.id]: []});
      return {...state, [action.payload.todolistId]: [] }
    }
    case 'REMOVE-TODOLIST': {
      delete state[action.payload.id]
      // delete tasksObj[todolistId];
      // setTasksObj({...tasksObj});
      delete state[action.payload.id]
      return {...state}
    }
    default:
      return state
  }
}

//🧩action
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskACType => {
  return {
    type: 'REMOVE-TASK',
    payload: {
      id: taskId,
      todolistId: todolistId
    }
  } as const
}
export const addTaskAC = (title: string, todolistId: string): AddTaskACType => {
  return {
    type: 'ADD-TASK',
    payload: {
      title: title,
      todolistId: todolistId
    }
  } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusACType => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {
      taskId: taskId,
      isDone: isDone,
      todolistId: todolistId
    }
  } as const
}
export const changeTaskTitleAC = (taskId: string, newValue: string, todolistId: string): ChangeTaskTitleACType => {
  return {
    type: 'CHANGE-TASK-TITLE',
    payload: {
      taskId: taskId,
      newValue: newValue,
      todolistId: todolistId
    }
  } as const
}
