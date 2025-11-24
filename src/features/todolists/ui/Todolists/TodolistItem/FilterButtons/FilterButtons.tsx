import { Box } from "@mui/material"
import { ButtonClick } from "@/common/components/NavButton/ButtonClick.tsx"
import { FilterValuesType } from "@/features/todolists/model/__tests__/todolists-reducer.test.ts"
import { changeTodolistFilterAC } from "@/features/todolists/model/todolists-reducer.ts"
import { useAppDispatch } from "@/common/hooks/useAppDispatch.ts"
import { containerSx } from "@/common/styles/container.styles.ts"

export type FilterButtonsType = {
  id: string
  filter: FilterValuesType
}

export const FilterButtons = ({ id, filter }: FilterButtonsType) => {
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
