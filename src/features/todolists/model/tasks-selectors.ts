import type { RootState } from '../../../app/store.ts'
import {TasksStateType} from "@/features/todolists/model/tasks-reducer.ts";

export const selectTasks = (state: RootState): TasksStateType => state.tasks