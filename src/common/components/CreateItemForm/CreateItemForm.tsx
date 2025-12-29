import ControlPointIcon from "@mui/icons-material/ControlPoint"
import { IconButton, TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
}

export const CreateItemForm = ({ addItem, disabled }: AddItemFormPropsType) => {
  const [newItemTitle, setNewItemTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItemTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null)

    if (e.key === "Enter") {
      addItem(newItemTitle)
      setNewItemTitle("")
    }
    // setError(null) - можно и здесь
  }

  const onClickButtonHandler = () => {
    if (newItemTitle.trim() !== "") {
      addItem(newItemTitle.trim())
      setNewItemTitle("")
    } else {
      setError("Field is reguared")
    }
  }

  return (
    <div>
      <TextField
        value={newItemTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        variant={"outlined"}
        label={"Type value"}
        helperText={error}
        disabled={disabled}
      />
      <IconButton onClick={onClickButtonHandler} color={"info"} disabled={disabled}>
        <ControlPointIcon />
      </IconButton>
    </div>
  )
}
