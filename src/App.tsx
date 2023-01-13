import { BrandGithub } from 'tabler-icons-react'
import TodoContainer from './components/TodoContainer'

function App() {
  return (
    <>
      <header className='rounded-md px-2 py-10 text-center'>
        <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl'>
          React To-do App
        </h1>
        <p className='text-xl text-indigo-500'>A quick way to organize your tasks</p>
        <small className='p-2 text-zinc-400'>
          Don&apos;t worry, we don&apos;t save your tasks. Everything is in your local storage.
        </small>
      </header>
      <div className='mx-auto min-h-screen max-w-[740px] p-3 lg:p-0'>
        <TodoContainer />
      </div>
      <footer className='m-auto px-2 py-6 text-center'>
        <a href='https://github.com/kypexfly'>
          <BrandGithub /> Kypexfly
        </a>
      </footer>
    </>
  )
}

export default App
