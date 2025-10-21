import ControlPointIcon from '@mui/icons-material/ControlPoint';
import {IconButton, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};


export const AddItemForm = (props: AddItemFormPropsType) => {
  
//local state
  const [newItemTitle, setNewItemTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItemTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.key === "Enter") {
      props.addItem(newItemTitle);
      setNewItemTitle("");
    }
    // setError(null) - можно и здесь
  };

  const onClickButtonHandler = () => {
    if (newItemTitle.trim() !== "") {
      props.addItem(newItemTitle.trim());
      setNewItemTitle("");
    } else {
      setError("Field is reguared");
    }
  };

  return (
    <div>
      {/* <input
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? "error" : ""}
      /> */}
      <TextField
        value={newItemTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        error={!!error}
        variant={'outlined'}
        label={'Type value'}
        helperText={error}
      />
      {/* <Button onClick={onClickButtonHandler} variant={'contained'} color={'info'}>+</Button> */}
      <IconButton onClick={onClickButtonHandler} color={'info'}><ControlPointIcon /> </IconButton>
      {/* {error && <div className={"error-message"}>{error}</div>} */}
    </div>
  );
};
