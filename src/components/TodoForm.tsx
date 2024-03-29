import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Plus } from 'tabler-icons-react'
import { Todo } from '../store/types'
import useAppStore from '../store/useStore'
import Input from './ui/Input'

const TodoForm = () => {
  const addTodo = useAppStore((state) => state.addTodo)
  const [input, setInput] = useState<string>('')

  const handleAddTodo = (e: FormEvent) => {
    e.preventDefault()
    const todo: Todo = {
      id: Date.now(),
      body: input,
      completed: false,
      important: false,
    }
    if (todo.body === '') {
      toast.warn('Empty, please write a task')
      return
    }
    addTodo(todo)
    setInput('')
  }

  return (
    <form onSubmit={(e) => handleAddTodo(e)} className='relative'>
      <Input
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
