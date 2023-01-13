import { Circle, CircleCheck, Star, X, ClockHour4} from 'tabler-icons-react'
import { Todo } from './TodoContainer'
import { formatDistance } from 'date-fns'

interface TodoItemProps {
  todo: Todo
  deleteTodo: (id: number) => void
  toggleCompleted: (id: number) => void
  toggleFavorite: (id: number) => void
}

const TodoItem = ({ todo, deleteTodo, toggleCompleted, toggleFavorite }: TodoItemProps) => {
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
                onClick={() => toggleCompleted(id)}
              />
            ) : (
              <Circle className='hover:text-white' onClick={() => toggleCompleted(id)} />
            )}
          </button>
          <div>
            <p className={completed ? 'text-zinc-500 line-through' : undefined}>{body}</p>
            <small className='text-zinc-500'><ClockHour4 className='inline' size={16} /> {timeAgo}</small>
          </div>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <button type='button'>
          <X size={22} className='hover:text-red-500' onClick={() => deleteTodo(id)} />
        </button>
        <button type='button' title='Important'>
          <Star
            onClick={() => toggleFavorite(id)}
            size={22}
            className={favorite ? 'fill-yellow-500 text-yellow-500' : 'hover:text-yellow-500'}
          />
        </button>
      </div>
    </li>
  )
}

export default TodoItem
