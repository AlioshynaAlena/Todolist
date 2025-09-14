import "./App.css";
import { ToDoListItem } from './ToDoListItem';

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean
}

function App() {
  //data
  const toDoListTitle: string = "What to learn"
  const tasks: TaskType[] =[
    {id: 1, title: "HTML&CSS", isDone:true },
    {id: 2, title: "JS", isDone: true},
    {id: 3, title: "React" ,isDone: false  },
  ]


//UI
  return (
      <div className="app">
        <ToDoListItem title={toDoListTitle} tasks={tasks} />
      </div>
  )
}



export default App;
