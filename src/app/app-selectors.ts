import type { RootState } from "../app/store"
import { ThemeMode } from "@/app/app-slice.ts"

export const selectThemeMode = (state: RootState): ThemeMode => state.app.themeMode
