import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Footer, Header, TodoForm, TodoList } from './components'

function App() {
  return (
    <div className='App flex min-h-screen flex-col'>
      <Header />
      <main className='mx-auto w-full max-w-[740px] grow p-3 lg:p-0'>
        <TodoForm />
        <TodoList />
      </main>
      <ToastContainer position='bottom-right' theme='dark' />
      <Footer />
    </div>
  )
}

export default App
