import { formatDistance } from 'date-fns'
import { toast } from 'react-toastify'
import { Circle, CircleCheck, ClockHour4, Star, X } from 'tabler-icons-react'
import { Todo } from '../store/types'
import useAppStore from '../store/useStore'

const TodoItem = ({ todo }: { todo: Todo }) => {
  const deleteTodo = useAppStore((state) => state.deleteTodo)
  const toggleProperty = useAppStore((state) => state.toggleProperty)
  const handleDeleteTodo = (id: number) => {
    deleteTodo(id)
    toast.info('Deleted task')
  }

  const { id, body, completed, favorite } = todo

  const timeAgo = formatDistance(new Date(todo.id), new Date(), { addSuffix: true })

  return (
    <li className='flex list-none justify-between border-b border-zinc-700/50 p-3 transition last:border-none hover:bg-zinc-700 first:hover:rounded-t-md last:hover:rounded-b-md'>
      <div>
        <div className='flex items-center gap-3'>
          <button type='button' title={completed ? 'Unmark completed' : 'Mark completed'}>
            {completed ? (
              <CircleCheck
                className='text-green-600 hover:text-green-500'
                onClick={() => toggleProperty(id, 'completed')}
              />
            ) : (
              <Circle
                className='hover:text-white'
                onClick={() => toggleProperty(id, 'completed')}
              />
            )}
          </button>
          <div>
            <p className={completed ? 'text-zinc-500 line-through' : undefined}>{body}</p>
            <small className='text-zinc-500'>
              <ClockHour4 className='inline' size={16} /> {timeAgo}
            </small>
          </div>
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
    </li>
  )
}

export default TodoItem
