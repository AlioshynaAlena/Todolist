import { useState } from "react";
import "./App.css";
import { ToDoListItem } from './ToDoListItem';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean
}

export type FilterValuesType = "All" | "Completed" | "Active"

function App() {
  //data
  const toDoListTitle: string = "What to learn"

 const [tasks, setTasks] = useState<TaskType[]>([
    {id: 1, title: "HTML&CSS", isDone:true },
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React" ,isDone: false  },
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


  //delet task
  function removeTask(id:number) {
    let resultTasks = tasks.filter( t => t.id !== id)
    setTasks(resultTasks)
  }



//UI
  return (
      <div className="app">
        <ToDoListItem title={toDoListTitle} tasks={taskForToDoList} removeTask={removeTask} changeFilter={changeFilter} />
      </div>
  )
}



export default App;
