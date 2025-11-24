import { Button } from "@mui/material"
import { FilterValuesType } from "@/features/todolists/model/__tests__/todolists-reducer.test.ts"

export type PropsType = {
  title: FilterValuesType
  changeFilter: () => void
  filter: FilterValuesType
  color: "primary" | "secondary" | "success" | "error" | "warning" | "info"
}

export const ButtonClick = ({ title, changeFilter, filter, color }: PropsType) => {
  return (
    <Button color={color || "primary"} variant={filter === title ? "outlined" : "text"} onClick={changeFilter}>
      {title}
    </Button>
  )
}
