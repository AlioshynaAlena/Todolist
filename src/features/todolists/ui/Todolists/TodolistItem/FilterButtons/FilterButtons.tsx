import { Box } from "@mui/material"
import { ButtonClick } from "@/common/components/NavButton/ButtonClick.tsx"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { containerSx } from "@/common/styles/container.styles.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { DomainTodolists, FilterValuesType } from "@/features/todolists/model/types/types.ts"

type Props = {
  todolist: DomainTodolists
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const dispatch = useAppDispatch()

  const changeFilterHandler = (filter: FilterValuesType) => {
    dispatch(
      todolistsApi.util.updateQueryData("getTodolists", undefined, (todolists) => {
        const index = todolists.findIndex((todo) => todo.id === id)
        if (index !== -1) todolists[index].filter = filter
      }),
    )
  }
  return (
    <Box sx={containerSx}>
      <ButtonClick title={"All"} changeFilter={() => changeFilterHandler("All")} filter={filter} color={"primary"} />
      <ButtonClick
        title={"Active"}
        changeFilter={() => changeFilterHandler("Active")}
        filter={filter}
        color={"secondary"}
      />
      <ButtonClick
        title={"Completed"}
        changeFilter={() => changeFilterHandler("Completed")}
        filter={filter}
        color={"success"}
      />
    </Box>
  )
}
