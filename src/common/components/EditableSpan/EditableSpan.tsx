import { TextField } from "@mui/material"
import { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
  title: string
  onChange: (newValue: string) => void
  disabled?: boolean
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState("")

  const activateEditMode = () => {
    if (props.disabled) return
    setEditMode(true)
    setTitle(props.title)
  }

  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(title)
  }

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <TextField type="text" value={title} onChange={onChangeTitleHandler} onBlur={activateViewMode} autoFocus />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}
