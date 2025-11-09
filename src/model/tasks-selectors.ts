import type { RootState } from '../app/store'
import {TasksStateType} from "../app/AppWidthRedux.tsx";



export const selectTasks = (state: RootState): TasksStateType => state.tasks