import {AppBar, Container, IconButton, Switch, Toolbar} from "@mui/material";
import {containerSx} from "@/TodolistItem.styles.ts";
import MenuIcon from "@mui/icons-material/Menu";
import {NavButton} from "@/NavButton.ts";
import {useAppSelector} from "@/common/hooks/useAppSelector.ts";
import {useAppDispatch} from "@/common/hooks/useAppDispatch.ts";
import {getTheme} from "@/common/theme/theme.ts";
import {selectThemeMode} from "@/app/app-selectors.ts";
import {changeThemeModeAC} from "@/app/app-reducer.ts";

export const Header = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const dispatch = useAppDispatch()
  const theme = getTheme(themeMode)

  function changeMode () {
    dispatch(changeThemeModeAC({themeMode: themeMode === 'light' ? 'dark' : 'light'}))
  }
  return (
    <AppBar position="static" sx={{mb: '30px'}}>
      <Toolbar>
        <Container maxWidth={'lg'} sx={containerSx}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <NavButton>Sign in</NavButton>
            <NavButton>Sign up</NavButton>
            <NavButton background={theme.palette.primary.dark}>Faq</NavButton>
            <Switch color={'default'} onChange={changeMode} />
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  )
}