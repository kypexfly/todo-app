import { Circle, CircleCheck, Star, X } from 'tabler-icons-react'
import { Todo } from './TodoContainer'

interface TodoItemProps {
  todo: Todo
  deleteTodo: (id: number) => void
  toggleCompleted: (id: number) => void
  toggleFavorite: (id: number) => void
}

const TodoItem = ({ todo, deleteTodo, toggleCompleted, toggleFavorite }: TodoItemProps) => {
  const { id, body, completed, favorite } = todo

  return (
    <li className='flex list-none justify-between border-b border-zinc-700/50 p-3 transition last:border-none hover:bg-zinc-700 first:hover:rounded-t-md last:hover:rounded-b-md'>
      <div>
        <div className='flex items-center gap-3'>
          <button type='button'>
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
          </div>
        </div>
      </div>
      <div className='flex items-center gap-3'>
        <button type='button'>
          <X size={22} className='hover:text-red-500' onClick={() => deleteTodo(id)} />
        </button>
        <button type='button'>
          {favorite ? (
            <Star
              onClick={() => toggleFavorite(id)}
              size={22}
              className='fill-yellow-500 text-yellow-500'
            />
          ) : (
            <Star onClick={() => toggleFavorite(id)} size={22} className='hover:text-yellow-500' />
          )}
        </button>
      </div>
    </li>
  )
}

export default TodoItem
