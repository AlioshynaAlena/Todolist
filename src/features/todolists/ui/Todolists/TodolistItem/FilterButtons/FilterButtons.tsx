import { Box } from "@mui/material"
import { ButtonClick } from "@/common/components/NavButton/ButtonClick.tsx"
import { FilterValuesType } from "@/features/todolists/model/__tests__/todolists-reducer.test.ts"
import { changeTodolistFilterAC, DomainTodolists } from "@/features/todolists/model/todolists-slice.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { containerSx } from "@/common/styles/container.styles.ts"

type Props = {
  todolist: DomainTodolists
}

export const FilterButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist
  const dispatch = useAppDispatch()

  const changeFilterHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({ filter: filter, id: id })) //передаем
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
