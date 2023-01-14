import { AnimatePresence, motion } from 'framer-motion'
import { MouseEvent, useState } from 'react'
import Select from 'react-select'
import useAppStore from '../store/useStore'
import FilterButtons from './FilterButtons'
import TodoItem from './TodoItem'

export type FilterState = 'all' | 'completed' | 'active' | 'favorite' | string
export type SortState = 'new' | 'old' | 'completed' | 'active' | string

const TodoList = () => {
  const todos = useAppStore((state) => state.todos)

  // Local states
  const [filter, setFilter] = useState<FilterState>('all')
  const [sort, setSort] = useState<SortState>('new')
  const handleSetFilter = (e: MouseEvent<HTMLButtonElement>) => setFilter(e.currentTarget.name)

  // Computed values
  const completedTodos = todos.filter((todo) => todo.completed)

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
    <div className='todo_list__container'>
      <Select
        className='rs-container'
        classNamePrefix='rs'
        options={sortOptions}
        defaultValue={sortOptions[0]}
        isSearchable={false}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        onChange={(option) => setSort(option!.value)}
      />
      <header className='todo_list__header'>
        <span className='flex-1 basis-40'>
          All tasks {completedTodos.length}/{todos.length}
          <div className='my-2 h-1.5 w-full rounded-full bg-gray-700'>
            <div
              className='h-1.5 rounded-full bg-gradient-to-r from-indigo-700 to-blue-500'
              style={{ width: `${(completedTodos.length / todos.length) * 100}%` }}
            ></div>
          </div>
        </span>

        <FilterButtons filter={filter} handleSetFilter={handleSetFilter} />
      </header>
      <div className='todo_list__body'>
        <AnimatePresence>
          {todos.length === 0 && (
            <motion.li
              layout
              initial={{ transform: 'scale(0)' }}
              animate={{ transform: 'scale(1)' }}
              exit={{ transform: 'scale(0)' }}
              className='todo_item--empty'
            >
              📃 No tasks!
            </motion.li>
          )}
          {sortedTodos.map((todo) => {
            return (
              <motion.li
                key={todo.id}
                layout
                className='todo_item'
                initial={{ transform: 'scale(0)' }}
                animate={{ transform: 'scale(1)' }}
                exit={{ transform: 'scale(0)' }}
              >
                <TodoItem todo={todo} />
              </motion.li>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default TodoList
