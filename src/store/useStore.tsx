import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Todo } from './types'

interface AppState {
  todos: Todo[]
  addTodo: (newTodo: Todo) => void
  deleteTodo: (id: number) => void
  toggleProperty: (id: number, property: 'favorite' | 'completed') => void
}

const initialState: Todo[] = [
  {
    id: Date.now(),
    body: 'Don\'t forget to complete this task!',
    completed: false,
    favorite: true,
  },
  {
    id: Date.UTC(2022, 10, 0, 0, 0, 0, 0),
    body: 'Check the ⭐ to indicate it\'s an important task',
    completed: true,
    favorite: false,
  },
  {
    id: Date.UTC(2022, 6, 0, 0, 0, 0, 0),
    body: 'You may want to delete completed tasks by clicking the X',
    completed: true,
    favorite: false,
  },
  {
    id: Date.UTC(2022, 0, 0, 0, 0, 0, 0),
    body: '✨ Hey! this task is already completed',
    completed: true,
    favorite: false,
  },
]

const useAppStore = create(
  persist<AppState>(
    (set) => ({
      todos: initialState,
      addTodo: (newTodo: Todo) => set((state) => ({ todos: [newTodo, ...state.todos] })),
      deleteTodo: (id: number) =>
        set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
      toggleProperty: (id: number, property: 'favorite' | 'completed') => {
        const updatedTodos = useAppStore.getState().todos.map((todo) => {
          if (todo.id === id) return { ...todo, [property]: !todo[property] }
          return todo
        })
        set({ todos: updatedTodos })
      },
    }),
    {
      name: 'todos',
    },
  ),
)

export default useAppStore
