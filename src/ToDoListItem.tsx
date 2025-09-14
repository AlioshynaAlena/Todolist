import { FilterValuesType, TaskType } from "./App";
import { Button } from "./Button";

type PropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id:number) => void,
  changeFilter: (value: FilterValuesType) => void
};

//каждый todolist будет получать свои данные (props)
export const ToDoListItem = ({tasks: tasks, title: title, removeTask: removeTask, changeFilter: changeFilter}: PropsType) => {




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
        <input />
        <button>+</button>
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





