import { formatDistance } from 'date-fns'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { Check, Circle, CircleCheck, ClockHour4, PencilOff, Star, X } from 'tabler-icons-react'
import { Todo } from '../store/types'
import useAppStore from '../store/useStore'

const TodoItem = ({ todo }: { todo: Todo }) => {
  const deleteTodo = useAppStore((state) => state.deleteTodo)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [input, setInput] = useState<string>('')
  const toggleProperty = useAppStore((state) => state.toggleProperty)
  const updateProperty = useAppStore((state) => state.updateProperty)
  const handleDeleteTodo = (id: number) => {
    deleteTodo(id)
    toast.info('Deleted task')
  }
  const handleUpdateProperty = (
    e: React.FormEvent<HTMLFormElement>,
    id: number,
    property: 'body',
    newValue: string,
  ) => {
    e.preventDefault()
    updateProperty(id, property, newValue)
    setIsEditing(false)
    toast.info('Task updated successfully')
  }

  const { id, body, completed, favorite } = todo

  const timeAgo = formatDistance(new Date(todo.id), new Date(), { addSuffix: true })

  return (
    <div className='flex justify-between gap-2 border-b border-zinc-700/50  p-3 hover:bg-zinc-700/25'>
      <div className='flex flex-1 items-center gap-3'>
        <button type='button' title={completed ? 'Unmark completed' : 'Mark completed'}>
          {completed ? (
            <CircleCheck
              className='text-green-600 hover:text-green-500'
              onClick={() => toggleProperty(id, 'completed')}
            />
          ) : (
            <Circle
              className='text-zinc-600 hover:text-zinc-500'
              onClick={() => toggleProperty(id, 'completed')}
            />
          )}
        </button>
        <div className='flex-1'>
          {isEditing ? (
            <form onSubmit={(e) => handleUpdateProperty(e, id, 'body', input)}>
              <input
                type='text'
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className='w-full border-b border-blue-500 bg-transparent focus:outline-none'
              />
              {/* Edit buttons */}
              <div className='flex items-center justify-center gap-2'>
                <button
                  className='flex items-center gap-2'
                  type='button'
                  onClick={() => setIsEditing(false)}
                >
                  <PencilOff size={14} /> Cancel
                </button>
                <button className='flex items-center gap-2' type='submit'>
                  <Check size={14} /> Save
                </button>
              </div>
            </form>
          ) : (
            <p
              className={completed ? 'cursor-pointer text-zinc-500 line-through' : 'cursor-pointer'}
              onClick={() => {
                setIsEditing(true)
                setInput(body)
                toast.info('Editing task...')
              }}
            >
              {body}
            </p>
          )}
          <small className='inline-block align-middle text-zinc-500'>
            <ClockHour4 className='inline' size={16} /> {timeAgo}
          </small>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <button type='button' title='Delete'>
          <X size={22} className='hover:text-red-500' onClick={() => handleDeleteTodo(id)} />
        </button>
        <button type='button' title='Important'>
          <Star
            onClick={() => toggleProperty(id, 'favorite')}
            size={22}
            className={favorite ? 'fill-yellow-500 text-yellow-500' : ''}
          />
        </button>
      </div>
    </div>
  )
}

export default TodoItem
