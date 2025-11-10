import type { RootState } from '../../../app/store.ts'
import {
  ToDoListType
} from "@/features/todolists/model/__tests__/todolists-reducer.test.ts";


export const selectTodolists = (state: RootState): ToDoListType[] => state.todolists