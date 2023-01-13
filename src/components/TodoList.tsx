import { MouseEvent, useState } from 'react'
import { Todo } from './TodoContainer'
import FilterButtons from './FilterButtons'
import TodoItem from './TodoItem'
import Select from 'react-select'

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
    { value: 'completed', label: 'Completed first' },
    { value: 'active', label: 'Active first' },
  ]

  return (
    <div className='my-3 h-[85vh] overflow-y-auto rounded-md'>
      <Select
        className='rs-container'
        classNamePrefix='rs'
        options={sortOptions}
        defaultValue={sortOptions[0]}
        isSearchable={false}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        onChange={(option) => setSort(option!.value)}
      />
      <li className='flex list-none justify-between border-b border-zinc-700/50 p-3 transition last:border-none first:hover:rounded-t-md last:hover:rounded-b-md'>
        <strong>
          All tasks {completedTodos.length}/{todos.length}
        </strong>
        <FilterButtons filter={filter} handleSetFilter={handleSetFilter} />
      </li>
      {todos.length === 0 ? (
        <li className='flex list-none justify-center border-b border-zinc-700/50 p-3 transition last:border-none first:hover:rounded-t-md last:hover:rounded-b-md'>
          📃 No tasks!
        </li>
      ) : null}
      {sortedTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleCompleted={toggleCompleted}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  )
}

export default TodoList
