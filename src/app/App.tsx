import "./App.css"
import { CircularProgress, CssBaseline, ThemeProvider } from "@mui/material"
import { useAppSelector } from "../common/hooks/useAppSelector.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { selectThemeMode } from "@/app/app-slice.ts"
import { ErrorSnackbar, Header } from "@/common/components"
import { Routing } from "@/common/routing/Routing.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { useEffect, useState } from "react"
import { initializeAppTC } from "@/features/auth/model/auth-slice.ts"
import styles from "../app/App.module.css"

function App() {
  const themeMode = useAppSelector(selectThemeMode)
  const theme = getTheme(themeMode)
  const dispatch = useAppDispatch()

  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    dispatch(initializeAppTC())
      .unwrap()
      .finally(() => {
        setIsInitialized(true)
      })
  }, [])

  if (!isInitialized) {
    return (
      <div className={styles.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

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
