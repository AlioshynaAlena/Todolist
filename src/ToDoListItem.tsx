import { ChangeEvent, useState } from "react";
import { FilterValuesType, TaskType } from "./App";
import { Button } from "./Button";

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id:string) => void,
  changeFilter: (value: FilterValuesType) => void,
  addTask: (title: string) => void,
};

//каждый todolist будет получать свои данные (props)
export const ToDoListItem = ({tasks, title, removeTask, changeFilter, addTask}: PropsType) => {

  //local state
  const [newTaskTitle, setNewTaskTitle] = useState('')


  //выносим обработчики
  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value)}
  const onKeyPressHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {    
          if (e.key === 'Enter') {
            addTask(newTaskTitle);
            setNewTaskTitle('')
        }
  }
  const onClickButtonHandler = () => {addTask(newTaskTitle);
        setNewTaskTitle('')}




    const tasksList = tasks.length === 0
    ? <span>Ваш список пуск</span>
    : <ul>
        {tasks.map((task) => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} /> 
        <span>{task.title}</span>
        <button onClick={() => {removeTask(task.id)}}>x</button>
      </li>
    );
  })}
      </ul>



  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={newTaskTitle} onChange={onChangeHandler} onKeyDown={onKeyPressHandler} />
        <button onClick={onClickButtonHandler}>+</button>
      </div>
      {tasksList}
      <div>
        <Button title={"All"} changeFilter={() => changeFilter("All")}/>
        <Button title={"Active"} changeFilter={() => changeFilter("Active")}/>
        <Button title={"Completed"} changeFilter={() => changeFilter("Completed")}/>
      </div>
    </div>
  );
};





