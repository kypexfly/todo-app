import React, { MouseEvent, useState } from 'react'
import { Todo } from './TodoContainer'
import FilterButtons from './FilterButtons'
import TodoItem from './TodoItem'

interface TodoListProps {
  todos: Todo[]
  deleteTodo: (id: number) => void
  toggleCompleted: (id: number) => void
  toggleFavorite: (id: number) => void
}

export type FilterState = 'all' | 'completed' | 'active' | 'favorite' | string

const TodoList = ({ todos, deleteTodo, toggleCompleted, toggleFavorite }: TodoListProps) => {
  const [filter, setFilter] = useState<FilterState>('all')
  const completedTodos = todos.filter((todo) => todo.completed)

  const handleSetFilter = (e: MouseEvent<HTMLButtonElement>) => setFilter(e.currentTarget.name)

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed
    if (filter === 'active') return todo.completed === false
    if (filter === 'favorite') return todo.favorite === true
    return todo
  })

  return (
    <div className='my-3 max-h-[85vh] overflow-y-auto rounded-md '>
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
      {filteredTodos.map((todo) => (
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
