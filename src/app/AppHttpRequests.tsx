import {type ChangeEvent, type CSSProperties, useEffect, useState} from 'react'
import Checkbox from '@mui/material/Checkbox'
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm'
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan'
import axios from "axios";

const token = '199ac75f-d715-4e9b-ba28-53076e624095'
const apiKey = '4130b55a-ac7b-4bb6-8682-c420bbf36899'

export type Todolist = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type FieldError = {
  error: string
  field: string
}
type BaseResponse = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}

type CreateTodolistResponse = BaseResponse &  {
  data: { item: Todolist }
}

type DeleteTodolistResponse = BaseResponse & {
  data: {}
}

type UpdateTodolistResponse = BaseResponse & {
  data: {}
}



export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<any>({})

  useEffect(() => {
    // get todolists
    axios.get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } )
      .then((res) => {
        setTodolists(res.data)
      })
  }, [])

  const createTodolist = (title: string) => {
    axios.post<CreateTodolistResponse>('https://social-network.samuraijs.com/api/1.1/todo-lists', {title},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'API-KEY': apiKey
        },
      })
      .then((res) => {
        const newToodlist= res.data.data.item
        setTodolists([...todolists, newToodlist])
      } )
  }

  const deleteTodolist = (id: string) => {
    axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
      {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
      },
    })
      .then(() => {
        setTodolists(todolists.filter(t => t.id !== id))
      })
  }

  const changeTodolistTitle = (id: string, title: string) => {
    axios.put<UpdateTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title}, {
      headers: {
        Authorization: `Bearer ${token}`,
        'API-KEY': apiKey
      },
    })
      .then(() => {
        setTodolists(todolists.map(t => t.id === id ? {...t, title} : t ))
      })
  }

  const createTask = (todolistId: string, title: string) => {}

  const deleteTask = (todolistId: string, taskId: string) => {}

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: any) => {}

  const changeTaskTitle = (task: any, title: string) => {}

  return (
    <div style={{margin: '20px'}}>
      <CreateItemForm addItem={createTodolist}/>
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan title={todolist.title}
                          onChange={title => changeTodolistTitle(todolist.id, title)}/>
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm addItem={title => createTask(todolist.id, title)}/>
          {tasks[todolist.id]?.map((task: any) => (
            <div key={task.id}>
              <Checkbox checked={task.isDone}
                        onChange={e => changeTaskStatus(e, task)}/>
              <EditableSpan title={task.title}
                            onChange={title => changeTaskTitle(task, title)}/>
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
}
