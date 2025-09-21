import { useState } from "react";
import "./App.css";
import { ToDoListItem } from './ToDoListItem';
import { v1 } from "uuid";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean
}

export type FilterValuesType = "All" | "Completed" | "Active"

function App() {
  //data
  const toDoListTitle: string = "What to learn"

 const [tasks, setTasks] = useState<TaskType[]>([
    {id: v1(), title: "HTML&CSS", isDone:true },
    {id: v1(), title: "JS", isDone: true},
    {id: v1(), title: "React" ,isDone: false  },
  ])

  const [filter, setFilter] = useState<FilterValuesType>('All')

    let taskForToDoList = tasks

    if (filter === "Completed") {
        taskForToDoList = tasks.filter((obj) => obj.isDone === true)
    }
    if (filter === "Active") {
        taskForToDoList = tasks.filter((obj) => obj.isDone === false)
    }

 function changeFilter(value: FilterValuesType ) {
    setFilter(value)
  }


  //delete task
  function removeTask(id:string) {
    let resultTasks = tasks.filter( t => t.id !== id)
    setTasks(resultTasks)
  }

  //add task
  function addTask(title: string) {

    let newTask = {id: v1(), title: title, isDone: false,}
//создаем новый массив, в который кладем нашу созданную таску и + добавляем таски, которые уже были. По правила имьютабельности, мы не можем изменять массив "стартовый"
    let newTasks = [newTask, ...tasks]

    setTasks(newTasks)

  }



//UI
  return (
      <div className="app">
        <ToDoListItem title={toDoListTitle} tasks={taskForToDoList} removeTask={removeTask} changeFilter={changeFilter} addTask = {addTask} />
      </div>
  )
}



export default App;
