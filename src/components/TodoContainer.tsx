import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

export interface Todo {
  id: number
  body: string
  completed: boolean
  favorite: boolean
}

const TodoContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: Date.now(),
      body: 'Don\'t forget to complete this task!',
      completed: false,
      favorite: true,
    },
    {
      id: Date.UTC(2022, 10, 0, 0, 0, 0, 0),
      body: 'Check the ⭐ to indicate it\'s an important task',
      completed: true,
      favorite: false,
    },
    {
      id: Date.UTC(2022, 6, 0, 0, 0, 0, 0),
      body: 'You may want to delete completed tasks by clicking the X',
      completed: true,
      favorite: false,
    },
    {
      id: Date.UTC(2022, 0, 0, 0, 0, 0, 0),
      body: '✨ Hey! this task is already completed',
      completed: true,
      favorite: false,
    },
  ])

  const addTodo = (newTodo: Todo) => {
    setTodos((todos) => [newTodo, ...todos])
  }
  const toggleCompleted = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, completed: !todo.completed }
      return todo
    })
    setTodos(updatedTodos)
  }

  const toggleFavorite = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, favorite: !todo.favorite }
      return todo
    })
    setTodos(updatedTodos)
  }

  const deleteTodo = (id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id))
    toast.info('Deleted task')
  }
  return (
    <main className='min-h-screen'>
      <TodoForm addTodo={addTodo} />
      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        toggleCompleted={toggleCompleted}
        toggleFavorite={toggleFavorite}
      />
      <ToastContainer position='bottom-right' theme='dark' />
    </main>
  )
}

export default TodoContainer
