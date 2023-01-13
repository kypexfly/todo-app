import React, { MouseEvent } from 'react'
import { FilterState } from './TodoList'

interface FilterButtonsProps {
  filter: FilterState
  handleSetFilter: (e: MouseEvent<HTMLButtonElement>) => void
}

const FilterButtons = ({ filter, handleSetFilter }: FilterButtonsProps) => {
  return (
    <>
      <span className='flex gap-3'>
        <button
          name='all'
          onClick={handleSetFilter}
          className={filter === 'all' ? 'active' : undefined}
        >
          All
        </button>
        <button
          name='completed'
          onClick={handleSetFilter}
          className={filter === 'completed' ? 'active' : undefined}
        >
          Completed
        </button>
        <button
          name='active'
          onClick={handleSetFilter}
          className={filter === 'active' ? 'active' : undefined}
        >
          Active
        </button>
        <button
          name='favorite'
          onClick={handleSetFilter}
          className={filter === 'favorite' ? 'active' : undefined}
        >
          Important
        </button>
      </span>
    </>
  )
}

export default FilterButtons