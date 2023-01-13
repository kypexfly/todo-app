import { Todo } from './TodoContainer'
import { Plus } from 'tabler-icons-react'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface TodoFormProps {
  addTodo: (todo: Todo) => void
}

const TodoForm = ({ addTodo }: TodoFormProps) => {
  const [input, setInput] = useState<string>('')

  const handleAddTodo = (e: FormEvent, todo: Todo) => {
    e.preventDefault()
    if (todo.body === '') {
      toast.warn('Empty, please write a task')
      return
    }
    addTodo(todo)
    setInput('')
  }

  return (
    <form
      onSubmit={(e) =>
        handleAddTodo(e, {
          id: Date.now(),
          body: input,
          completed: false,
          favorite: false,
        })
      }
      className='relative'
    >
      <input
        className='inputsearch'
        placeholder='Add a new task...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type='input'
      />
      <button type='submit' className='absolute right-5 top-4 hover:text-white'>
        <Plus size={26} />
      </button>
    </form>
  )
}

export default TodoForm