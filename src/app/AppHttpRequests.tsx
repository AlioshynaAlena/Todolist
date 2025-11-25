import { type ChangeEvent, type CSSProperties, useEffect, useState } from "react"
import Checkbox from "@mui/material/Checkbox"
import { CreateItemForm, EditableSpan } from "@/common/components"
import { Todolist } from "@/features/todolists/api/todolistsApi.types.ts"
import { todolistsApi } from "@/features/todolists/api/todolistsApi.ts"
import { tasksApi } from "@/features/todolists/api/tasksApi.ts"
import { DomainTask, UpdateTaskModel } from "@/features/todolists/api/tasksApi.types.ts"
import { TaskStatus } from "@/common/enums/enums.ts"

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([])
  const [tasks, setTasks] = useState<Record<string, DomainTask[]>>({})

  // useEffect(() => {
  //   todolistsApi.getTodolists().then((res) => {
  //     const todolists = res.data
  //     setTodolists(todolists)
  //     todolists.forEach((todolist) => {
  //       tasksApi.getTasks(todolist.id).then((res) => setTasks({ ...tasks, [todolist.id]: res.data.items }))
  //     })
  //   })
  // }, [])

  useEffect(() => {
    todolistsApi.getTodolists().then((res) => {
      const todolists = res.data
      setTodolists(todolists)

      todolists.forEach((todolist) => {
        tasksApi.getTasks(todolist.id).then((res) =>
          setTasks((prevTasks) => ({
            ...prevTasks,
            [todolist.id]: res.data.items,
          })),
        )
      })
    })
  }, [])

  const createTodolist = (title: string) => {
    todolistsApi.createTodolist(title).then((res) => {
      const newToodlist = res.data.data.item
      setTodolists([...todolists, newToodlist])
    })
  }

  const deleteTodolist = (id: string) => {
    todolistsApi.deleteTodolist(id).then(() => {
      setTodolists(todolists.filter((t) => t.id !== id))
    })
  }

  const changeTodolistTitle = (id: string, title: string) => {
    todolistsApi.changeTodolistTitle({ id, title }).then(() => {
      setTodolists(todolists.map((t) => (t.id === id ? { ...t, title } : t)))
    })
  }

  const createTask = (todolistId: string, title: string) => {
    tasksApi.createTask({ todolistId, title }).then((res) => {
      console.log(res.data)
      const newTask = res.data.data.item

      setTasks({ ...tasks, [todolistId]: [...(tasks[todolistId] || []), newTask] })
    })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    tasksApi.deleteTask(todolistId, taskId).then((res) => {
      console.log(res.data)
      setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter((t) => t.id !== taskId) })
    })
  }

  const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    const model: UpdateTaskModel = {
      title: task.title,
      description: task.description,
      startDate: task.startDate,
      priority: task.priority,
      deadline: task.deadline,
      status: e.target.checked ? TaskStatus.Completed : TaskStatus.New,
    }
    tasksApi.updateTask({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
      setTasks({
        ...tasks,
        [task.todoListId]: tasks[task.todoListId].map((t) => {
          return t.id === task.id ? res.data.data.item : t
        }),
      })
    })
  }

  const changeTaskTitle = (task: DomainTask, title: string) => {
    const model: UpdateTaskModel = {
      title: title,
      description: task.description,
      startDate: task.startDate,
      priority: task.priority,
      deadline: task.deadline,
      status: task.status,
    }
    tasksApi.changeTaskTitle({ todolistId: task.todoListId, taskId: task.id, model }).then((res) => {
      console.log(res.data)
      setTasks({
        ...tasks,
        [task.todoListId]: tasks[task.todoListId].map((t) => (t.id === task.id ? res.data.data.item : t)),
      })
    })
  }

  return (
    <div style={{ margin: "20px" }}>
      <CreateItemForm addItem={createTodolist} />
      {todolists.map((todolist) => (
        <div key={todolist.id} style={container}>
          <div>
            <EditableSpan title={todolist.title} onChange={(title) => changeTodolistTitle(todolist.id, title)} />
            <button onClick={() => deleteTodolist(todolist.id)}>x</button>
          </div>
          <CreateItemForm addItem={(title) => createTask(todolist.id, title)} />
          {tasks[todolist.id]?.map((task) => (
            <div key={task.id}>
              <Checkbox checked={task.status === TaskStatus.Completed} onChange={(e) => changeTaskStatus(e, task)} />
              <EditableSpan title={task.title} onChange={(title) => changeTaskTitle(task, title)} />
              <button onClick={() => deleteTask(todolist.id, task.id)}>x</button>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

const container: CSSProperties = {
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
}
