const Header = () => {
  return (
    <header className='rounded-md px-2 py-10 text-center'>
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl'>
        React To-do App
      </h1>
      <p className='text-xl text-indigo-500'>A quick way to organize your tasks</p>
      <small className='p-2 text-zinc-400'>
        Don&apos;t worry, we don&apos;t save them. Everything is in your local storage.
      </small>
    </header>
  )
}

export default Header
