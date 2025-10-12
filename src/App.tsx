import { useState } from "react";
import "./App.css";
import { ToDoListItem } from "./ToDoListItem";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = "All" | "Completed" | "Active";

export type ToDoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: TaskType[]
}

function App() {
  //data
  //хранит todolists
  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<ToDoListType>>([
    { id: todolistId1, title: "What to learn ", filter: "All" },
    { id: todolistId2, title: "What to buy ", filter: "All" },
  ]);

  //delete todolist
  let removeToDolist = (todolistId: string) => {
    let filteredtodolist = todolists.filter((t) => t.id !== todolistId);
    setTodolists(filteredtodolist);

    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  };

  //ассоциативный массив
  let [tasksObj, setTasks] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "React", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true },
    ],
  });

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let todolist = todolists.find((t) => t.id === todolistId);

    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]); //передаем новое состояние, для обновления его визуализации
    }
  }

  //delete task
  function removeTask(id: string, todolistId: string) {
    //Иммутабельно создаем копию
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter((t) => t.id !== id);
    // по ключу tasksObj[todolistId] обратиться к свойству объекта и заменить в нем на отфильтрованные таски
    tasksObj[todolistId] = filteredTasks;

    setTasks({ ...tasksObj }); // отдаем копию объекта, чтобы React перересовал
  }

  function changeToDoListValue (id: string, newValue: string) {
    const todolist = todolists.find(t => t.id === id)
    if (todolist) {
      todolist.title = newValue
      setTodolists([...todolists])
    }
  }

  //add task
  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false };
    //сначала достаю нужный массив, куда будем добавлять таску новую
    let tasks = tasksObj[todolistId];
    //создаем новый массив, в который кладем нашу созданную таску и + добавляем таски, которые уже были. По правила имьютабельности, мы не можем изменять массив "стартовый"
    let newTasks = [task, ...tasks];
    //вот тебе новые таски
    tasksObj[todolistId] = newTasks;

    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    //сначала достаем таски
    let tasks = tasksObj[todolistId];
    //иммутабельно создаем новое состояние
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
    //заполняем копию теми же данными, которые есть в старом массиве tasks (деструктуризация)
    //передаем новое состояние, для обновления его визуализации
  }


const addToDoList = (title: string) => {
  let todolist: ToDoListType = {
    id: v1(),
    title: title,
    filter: 'All'
  }
  setTodolists([todolist, ...todolists])
  setTasks({...tasksObj, [todolist.id]: []})
}

const changeTaskTitle = (taskId: string, newValue: string, todolistId: string) => {
  let tasks = tasksObj[todolistId];
    //иммутабельно создаем новое состояние
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.title = newValue
      setTasks({ ...tasksObj });
    }
}


  //UI
  return (
    <div className="app">

      <AddItemForm addItem={addToDoList} />

      {todolists.map((tl) => {
        let taskForToDoList = tasksObj[tl.id];

        if (tl.filter === "Completed") {
          taskForToDoList = tasksObj[tl.id].filter(
            (obj) => obj.isDone === true
          );
        }
        if (tl.filter === "Active") {
          taskForToDoList = tasksObj[tl.id].filter(
            (obj) => obj.isDone === false
          );
        }

        return (
          <ToDoListItem
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={taskForToDoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={tl.filter}
            removeToDolist={removeToDolist}
            changeTaskTitle={changeTaskTitle} changeToDoListValue={changeToDoListValue}          
            />
        );
      })}
    </div>
  );
}

export default App;
