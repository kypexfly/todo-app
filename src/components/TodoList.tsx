import { AnimatePresence, motion } from 'framer-motion'
import { useParams } from 'react-router-dom'
import useAppStore from '../store/useStore'
import Select from 'react-select'
import TodoItem from './TodoItem'
import { useState } from 'react'

export type FilterState = 'all' | 'completed' | 'uncompleted' | 'important' | string
export type SortState = 'new' | 'old' | 'completed' | 'active' | string

const TodoList = () => {
  const todos = useAppStore((state) => state.todos)
  const { filter } = useParams()

  if (![undefined, 'completed', 'uncompleted', 'important'].includes(filter as string)) {
    throw new Error('Invalid filter')
  }

  // Local states
  const [sort, setSort] = useState<SortState>('new')

  // Computed values
  const completedTodos = todos.filter((todo) => todo.completed)

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed
    if (filter === 'uncompleted') return !todo.completed
    if (filter === 'important') return todo.important
    return todo
  })

  const sortedTodos = filteredTodos.sort((a, b) => {
    if (sort === 'old') return a.id - b.id
    return b.id - a.id // sort by New
  })

  const sortOptions = [
    { value: 'new', label: 'New', default: true },
    { value: 'old', label: 'Old' },
  ]

  return (
    <div className='mt-5 mb-20 list-none rounded-md grow'>
      <Select
        className='rs-container'
        classNamePrefix='rs'
        options={sortOptions}
        defaultValue={sortOptions[0]}
        isSearchable={false}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        onChange={(option) => setSort(option!.value)}
      />
      <header className='flex flex-wrap justify-between gap-6 border-b border-zinc-700/50 p-3 transition first:hover:rounded-t-md last:hover:rounded-b-md'>
        <span className='flex-1 basis-40'>
          All tasks {completedTodos.length}/{todos.length}
          <div className='my-2 h-1.5 w-full rounded-full bg-gray-700 overflow-hidden'>
            <motion.div
              className='h-1.5 rounded-full bg-gradient-to-r from-indigo-700 to-blue-500'
              initial={{ width: `${(completedTodos.length / todos.length) * 100}%` }}
              animate={{ width: `${(completedTodos.length / todos.length) * 100}%` }}
              transition={{ bounce: 0.3, type: 'spring', duration: 0.1, stiffness: 100 }}
            ></motion.div>
          </div>
        </span>
      </header>
      <div>
        <AnimatePresence>
          {todos.length === 0 && (
            <motion.li
              layout
              key='empty'
              initial={{ transform: 'scale(0)' }}
              animate={{ transform: 'scale(1)' }}
              exit={{ opacity: 0 }}
            >
              <div className='flex list-none justify-center border-b border-zinc-700/50 p-3 last:border-none first:hover:rounded-t-md last:hover:rounded-b-md'>
                📃 No tasks!
              </div>
            </motion.li>
          )}
          {sortedTodos.map((todo) => {
            return (
              <motion.li
                key={todo.id}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
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
