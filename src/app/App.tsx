import "./App.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useAppSelector } from "../common/hooks/useAppSelector.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { Main } from "@/app/Main.tsx"
import { selectThemeMode } from "@/app/app-slice.ts"
import { ErrorSnackbar, Header } from "@/common/components"

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
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}

export default App
