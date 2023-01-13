import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

const TodoContainer = () => {
  // const [todos, setTodos] = useState<Todo[]>()

  // const addTodo = (newTodo: Todo) => {
  //   setTodos((todos) => [newTodo, ...todos])
  // }

  // const deleteTodo = (id: number) => {
  //   setTodos((todos) => todos.filter((todo) => todo.id !== id))
  //   toast.info('Deleted task')
  // }

  // const toggleCompleted = (id: number) => {
  //   const updatedTodos = todos.map((todo) => {
  //     if (todo.id === id) return { ...todo, completed: !todo.completed }
  //     return todo
  //   })
  //   setTodos(updatedTodos)
  // }

  // const toggleFavorite = (id: number) => {
  //   const updatedTodos = todos.map((todo) => {
  //     if (todo.id === id) return { ...todo, favorite: !todo.favorite }
  //     return todo
  //   })
  //   setTodos(updatedTodos)
  // }

  return (
    <main className='min-h-screen'>
      <TodoForm />
      <TodoList />
      <ToastContainer position='bottom-right' theme='dark' />
    </main>
  )
}

export default TodoContainer
