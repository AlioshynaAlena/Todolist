import "./App.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useAppSelector } from "../common/hooks/useAppSelector.ts"
import { Header } from "@/common/components/Header/Header.tsx"

import { getTheme } from "@/common/theme/theme.ts"
import { Main } from "@/app/Main.tsx"
import { selectThemeMode } from "@/app/app-slice.ts"

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  //UI
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  )
}

export default App
