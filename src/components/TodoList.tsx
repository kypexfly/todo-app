import { MouseEvent, useState } from 'react'
import Select from 'react-select'
import FilterButtons from './FilterButtons'
import { Todo } from './TodoContainer'
import TodoItem from './TodoItem'
import { AnimatePresence, motion } from 'framer-motion'

interface TodoListProps {
  todos: Todo[]
  deleteTodo: (id: number) => void
  toggleCompleted: (id: number) => void
  toggleFavorite: (id: number) => void
}

export type FilterState = 'all' | 'completed' | 'active' | 'favorite' | string
export type SortState = 'new' | 'old' | 'completed' | 'active' | string

const TodoList = ({ todos, deleteTodo, toggleCompleted, toggleFavorite }: TodoListProps) => {
  const [filter, setFilter] = useState<FilterState>('all')
  const [sort, setSort] = useState<SortState>('new')
  const completedTodos = todos.filter((todo) => todo.completed)

  const handleSetFilter = (e: MouseEvent<HTMLButtonElement>) => setFilter(e.currentTarget.name)

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed
    if (filter === 'active') return todo.completed === false
    if (filter === 'favorite') return todo.favorite === true
    return todo
  })

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sort === 'old') return a.id - b.id
    return b.id - a.id // sort by New
  })

  const sortOptions = [
    { value: 'new', label: 'Sort by', isDisabled: true },
    { value: 'new', label: 'New' },
    { value: 'old', label: 'Old' },
  ]

  return (
    <div className='mt-5 mb-20 rounded-md'>
      <Select
        className='rs-container'
        classNamePrefix='rs'
        options={sortOptions}
        defaultValue={sortOptions[0]}
        isSearchable={false}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        onChange={(option) => setSort(option!.value)}
      />
      <li className='flex list-none flex-wrap justify-between gap-6 border-b border-zinc-700/50 p-3 transition last:border-none first:hover:rounded-t-md last:hover:rounded-b-md'>
        <span className='flex-1 basis-40'>
          All tasks {completedTodos.length}/{todos.length}
          <div className='my-2 h-1.5 w-full rounded-full bg-gray-700'>
            <div
              className='h-1.5 rounded-full bg-indigo-500'
              style={{ width: `${(completedTodos.length / todos.length) * 100}%` }}
            ></div>
          </div>
        </span>

        <FilterButtons filter={filter} handleSetFilter={handleSetFilter} />
      </li>
      {todos.length === 0 ? (
        <li className='flex list-none justify-center border-b border-zinc-700/50 p-3 transition last:border-none first:hover:rounded-t-md last:hover:rounded-b-md'>
          📃 No tasks!
        </li>
      ) : null}
      <AnimatePresence>
        {sortedTodos.map((todo) => (
          <motion.div
            key={todo.id}
            layout
            initial={{ transform: 'scale(0)' }}
            animate={{ transform: 'scale(1)' }}
            exit={{ transform: 'scale(0)' }}
          >
            <TodoItem
              // key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              toggleCompleted={toggleCompleted}
              toggleFavorite={toggleFavorite}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default TodoList
