import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

export interface Todo {
  id: number
  title: string
  body: string
  completed: boolean
  favorite: boolean
}

const TodoContainer = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: Date.UTC(2022, 12, 15),
      title: 'Title 1',
      body: '🧹 Buy a new',
      completed: true,
      favorite: false,
    },
    {
      id: Date.UTC(2022, 12, 16),
      title: 'Title 2',
      body: '🧺 Buy groceries',
      completed: false,
      favorite: true,
    },
  ])

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo])
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
    <main>
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
