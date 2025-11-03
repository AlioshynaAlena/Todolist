import type { RootState } from '../app/store'
import {TasksStateType} from "../App.tsx";


export const selectTasks = (state: RootState): TasksStateType => state.tasks