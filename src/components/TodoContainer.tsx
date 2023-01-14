import 'react-toastify/dist/ReactToastify.css'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'

const TodoContainer = () => {
  return (
    <main className='mx-auto min-h-screen max-w-[740px] p-3 lg:p-0'>
      <TodoForm />
      <TodoList />
    </main>
  )
}

export default TodoContainer
