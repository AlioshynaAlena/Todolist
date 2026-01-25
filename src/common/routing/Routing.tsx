import { Main } from "@/app/Main"
import { Login } from "@/features/todolists/ui/Login/Login"
import { Route, Routes } from "react-router"
import { PageNotFound } from "@/common/components/PageNotFound/PageNotFound.tsx"
import { ProtectedRoute } from "@/common/components/ProtectedRoute/ProtectedRoute.tsx"
import { useAppSelector } from "@/common/hooks/useAppSelector.ts"
import { selectIsLoggedIn } from "@/app/app-slice.ts"

export const Path = {
  Main: "/",
  Login: "/login",
  Faq: "/faq",
  NotFound: "*",
} as const

export const Routing = () => {
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path={Path.Faq} element={<h2>Faq</h2>} />
      </Route>

      <Route
        path={Path.Login}
        element={
          <ProtectedRoute isAllowed={!isLoggedIn}>
            <Login />
          </ProtectedRoute>
        }
      />

      <Route path={Path.NotFound} element={<PageNotFound />} />
    </Routes>
  )
}
