import { ChangeEvent, useState } from "react";
import { FilterValuesType, TaskType } from "./App";
import { Button } from "./Button";

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id:string) => void,
  changeFilter: (value: FilterValuesType) => void,
  addTask: (title: string) => void,
  changeStatus: (taskId:string, isDone:boolean) => void,
  filter: FilterValuesType,
};

//каждый todolist будет получать свои данные (props)
export const ToDoListItem = ({tasks, title, removeTask, changeFilter, addTask, changeStatus, filter}: PropsType) => {

  //local state
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)


  //выносим обработчики
  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {setNewTaskTitle(e.currentTarget.value)}
  const onKeyPressHandler = (e:React.KeyboardEvent<HTMLInputElement>) => {  

    setError(null) 

          if (e.key === 'Enter') {
            addTask(newTaskTitle);
            setNewTaskTitle('')
        }
        // setError(null) - можно и здесь
  }
  const onClickButtonHandler = () => {
    if (newTaskTitle.trim() !== '') {
      addTask(newTaskTitle.trim());
      setNewTaskTitle('')
    } else {
      setError('Field is reguared')
    }
    }

    const tasksList = tasks.length === 0
    ? <span>Ваш список пуск</span>
    : <ul>
        {tasks.map((task) => {

  const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
    changeStatus(task.id, e.currentTarget.checked)
  }

    return (
      <li key={task.id}>
        <input type="checkbox" onChange={onChangeHandler} checked={task.isDone} /> 
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
        <input value={newTaskTitle} onChange={onChangeHandler} onKeyDown={onKeyPressHandler} className={error ? 'error' : ''} />
        <button onClick={onClickButtonHandler}>+</button>
        {error && <div className={'error-message'}>{error}</div>}


      </div>
      {tasksList}
      <div>
        <Button title={"All"} changeFilter={() => changeFilter("All")} filter={filter} />
        <Button title={"Active"} changeFilter={() => changeFilter("Active")} filter={filter} />
        <Button title={"Completed"} changeFilter={() => changeFilter("Completed")} filter={filter} />
      </div>
    </div>
  );
};





