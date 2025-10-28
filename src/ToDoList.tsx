import {ChangeEvent} from "react";
import {FilterValuesType, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {ButtonClick} from "./ButtonClick";


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
  changeTaskTitle: (id: string, newValue: string, todolistId: string) => void;
  changeToDoListValue: (id: string, newValue: string) => void;
};

//каждый todolist будет получать свои данные (props)
export const ToDoList = ({
                           tasks,
                           title,
                           removeTask,
                           changeFilter,
                           addTask,
                           changeStatus,
                           removeToDolist,
                           changeTaskTitle,
                           changeToDoListValue,
                           filter,
                           id,
                         }: PropsType) => {
  //‼️Todo: перенести
  // let taskForToDoList = tasksObj[tl.id];
  // if (tl.filter === "Completed") {
  //   taskForToDoList = tasksObj[tl.id].filter((obj) => obj.isDone === true);
  // }
  // if (tl.filter === "Active") {
  //   taskForToDoList = tasksObj[tl.id].filter((obj) => obj.isDone === false);
  // }

  const tasksList =
    tasks.length === 0 ? (
      <span>Ваш список пуск</span>
    ) : (
      <div>
        {tasks.map((task) => {
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeStatus(task.id, e.currentTarget.checked, id);
          };

          const onChangeTitleHandler = (newValue: string) => {
            changeTaskTitle(task.id, newValue, id);
          };

          return (
            <div key={task.id}>
              {/* <input
                type="checkbox"
                onChange={onChangeStatusHandler}
                checked={task.isDone}
              /> */}
              <Checkbox
                onChange={onChangeStatusHandler}
                checked={task.isDone}
              />


              <EditableSpan
                title={task.title}
                onChange={onChangeTitleHandler}
              />

              {/* <button
                onClick={() => {
                  removeTask(task.id, id);
                }}
              >
                x
              </button> */}
              <IconButton aria-label="delete"
                          onClick={() => {
                            removeTask(task.id, id)
                          }}>
                <DeleteIcon />
              </IconButton>
            </div>
          );
        })}
      </div>
    );

  const handleRemoveToDoList = () => {
    removeToDolist(id);
  };

  const addTasks = (title: string) => {
    addTask(title, id);
  };

  const changeToDoListTitle = (newValue: string) => {
    changeToDoListValue(id, newValue);
  };

  return (
    <div>
      <h3>
        {" "}
        <EditableSpan title={title}
                      onChange={changeToDoListTitle} />
        {/* <button onClick={handleRemoveToDoList}>x</button> */}
        <IconButton aria-label="delete"
                    onClick={handleRemoveToDoList}>
          <DeleteIcon />
        </IconButton>
      </h3>

      <AddItemForm addItem={addTasks} />

      {tasksList}

      <div>
        <ButtonClick
          title={"All"}
          changeFilter={() => changeFilter("All", id)}
          filter={filter}
          color={'primary'}

        />
        <ButtonClick
          title={"Active"}
          changeFilter={() => changeFilter("Active", id)}
          filter={filter}
          color={'secondary'}
        />
        <ButtonClick
          title={"Completed"}
          changeFilter={() => changeFilter("Completed", id)}
          filter={filter}
          color={'success'}
        />
      </div>
    </div>
  );
};
