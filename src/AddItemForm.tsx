import { ChangeEvent, useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};


export const AddItemForm = (props: AddItemFormPropsType) => {
  
//local state
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setError(null);

    if (e.key === "Enter") {
      props.addItem(newTaskTitle);
      setNewTaskTitle("");
    }
    // setError(null) - можно и здесь
  };

  const onClickButtonHandler = () => {
    if (newTaskTitle.trim() !== "") {
      props.addItem(newTaskTitle.trim());
      setNewTaskTitle("");
    } else {
      setError("Field is reguared");
    }
  };

  return (
    <div>
      <input
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? "error" : ""}
      />
      <button onClick={onClickButtonHandler}>+</button>
      {error && <div className={"error-message"}>{error}</div>}
    </div>
  );
};
