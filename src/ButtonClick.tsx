import {Button} from "@mui/material";
import {FilterValuesType} from "./app/AppWidthRedux.tsx";


export type PropsType = {
  title: FilterValuesType;
  changeFilter: () => void;
  filter: FilterValuesType,
  color: "primary" | "secondary" | "success" | "error" | "warning" | "info"
}

export const ButtonClick = ({
                              title,
                              changeFilter,
                              filter,
                              color
                            }: PropsType) => {
  return (
    <Button color={color || 'primary'}
            variant={filter === title ? 'outlined' : 'text'}
            onClick={changeFilter}>{title}</Button>
  )
}
