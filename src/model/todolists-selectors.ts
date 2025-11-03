
import type { RootState } from '../app/store'
import {ToDoListType} from "../app/AppWidthRedux.tsx";

export const selectTodolists = (state: RootState): ToDoListType[] => state.todolists