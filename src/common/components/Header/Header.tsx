import { AppBar, Box, Container, IconButton, LinearProgress, Switch, Toolbar, Typography } from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { NavButton } from "@/common/components/NavButton/NavButton.ts"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { getTheme } from "@/common/theme/theme.ts"
import { changeThemeModeAC, selectStatus, selectThemeMode } from "@/app/app-slice.ts"
import { containerSx } from "@/common/styles/container.styles.ts"
import { selectIsLoggedIn, selectUser, setIsLoggedInAC } from "@/features/auth/model/auth-slice.ts"
import { useLogoutMutation } from "@/features/auth/api/authApi.ts"
import { ResultCode } from "@/common/enums/enums.ts"
import { AUTH_TOKEN } from "@/common/constants"
import { clearDataAC } from "@/common/actions"
import { baseApi } from "@/app/baseApi.ts"

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const theme = getTheme(themeMode)
  const status = useAppSelector(selectStatus)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)
  const user = useAppSelector(selectUser)

  const [logout] = useLogoutMutation()

  function changeMode() {
    dispatch(changeThemeModeAC({ themeMode: themeMode === "light" ? "dark" : "light" }))
  }

  function logoutHandler() {
    logout().then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedInAC({ isLoggedIn: false }))
        localStorage.removeItem(AUTH_TOKEN)
        dispatch(baseApi.util.resetApiState())
      }
    })
  }

  return (
    <AppBar position="static" sx={{ mb: "30px" }}>
      <Toolbar>
        <Container maxWidth={"lg"} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Box display="flex" alignItems="center" gap={2} mr={2}>
            {user && <Typography variant="body1">Hello, {user.login}</Typography>}
            {isLoggedIn && <NavButton onClick={logoutHandler}>Sign out</NavButton>}
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={"default"} onChange={changeMode} />
          </Box>
        </Container>
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}
