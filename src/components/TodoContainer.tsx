import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

const TodoContainer = () => {
  return (
    <main className='min-h-screen'>
      <TodoForm />
      <TodoList />
      <ToastContainer position='bottom-right' theme='dark' />
    </main>
  )
}

export default TodoContainer
