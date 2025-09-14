import { TaskType } from "./App";
import { Button } from "./Button";

type PropsType = {
  title: string;
  tasks: TaskType[];
};

//каждый todolist будет получать свои данные (props)
export const ToDoListItem = ({tasks: tasks, title: title}: PropsType) => {

    const tasksList = tasks.length === 0
    ? <span>Ваш список пуск</span>
    : <ul>
        {tasks.map((task) => {
    return (
      <li key={task.id}>
        <input type="checkbox" checked={task.isDone} /> 
        <span>{task.title}</span>
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
        <Button title={"All"}/>
        <Button title={"Active"}/>
        <Button title={"Completed"}/>
      </div>
    </div>
  );
};





