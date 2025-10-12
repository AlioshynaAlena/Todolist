import { ChangeEvent, useState } from "react";
import { FilterValuesType, TaskType } from "./App";
import { Button } from "./Button";
import { AddItemForm } from "./AddItemForm";

type PropsType = {
  id: string;
  title: string;
  tasks: TaskType[];
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
  filter: FilterValuesType;

  removeToDolist: (todolistId: string) => void;
};

//каждый todolist будет получать свои данные (props)
export const ToDoListItem = ({
  tasks,
  title,
  removeTask,
  changeFilter,
  addTask,
  changeStatus,
  removeToDolist,
  filter,
  id,
}: PropsType) => {


  const tasksList =
    tasks.length === 0 ? (
      <span>Ваш список пуск</span>
    ) : (
      <ul>
        {tasks.map((task) => {
          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(task.id, e.currentTarget.checked, id);
          };

          return (
            <li key={task.id}>
              <input
                type="checkbox"
                onChange={onChangeHandler}
                checked={task.isDone}
              />
              <span>{task.title}</span>
              <button
                onClick={() => {
                  removeTask(task.id, id);
                }}
              >
                x
              </button>
            </li>
          );
        })}
      </ul>
    );

  const handleRemoveToDoList = () => {
    removeToDolist(id);
  };


  const addTasks = (title: string) => {
    addTask(title, id)
  }


  return (
    <div>
      <h3>
        {title} <button onClick={handleRemoveToDoList}>x</button>
      </h3>

      <AddItemForm addItem={addTasks} />

      {tasksList}
      <div>
        <Button
          title={"All"}
          changeFilter={() => changeFilter("All", id)}
          filter={filter}
        />
        <Button
          title={"Active"}
          changeFilter={() => changeFilter("Active", id)}
          filter={filter}
        />
        <Button
          title={"Completed"}
          changeFilter={() => changeFilter("Completed", id)}
          filter={filter}
        />
      </div>
    </div>
  );
};






