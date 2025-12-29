import "./App.css"
import { CssBaseline, ThemeProvider } from "@mui/material"
import { useAppSelector } from "../common/hooks/useAppSelector.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { selectThemeMode } from "@/app/app-slice.ts"
import { ErrorSnackbar, Header } from "@/common/components"
import { Routing } from "@/common/routing/Routing.tsx"

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)

  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <CssBaseline />
        <Header />
        <Routing />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}

export default App
