import { NavLink, Outlet, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import { Footer, Header } from './components'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/:filter',
        element: <App />,
        errorElement: <div>ERROR: Wrong route</div>,
      },
    ],
  },
])

export default router

function Layout() {
  return (
    <div className='App flex min-h-screen flex-col'>
      <Header />
      <Sidebar />
      <main className='mx-auto w-full max-w-[740px] grow p-3 lg:p-0'>
        <Outlet />
      </main>
      <ToastContainer position='bottom-right' theme='dark' />
      <Footer />
    </div>
  )
}

function Sidebar() {
  return (
    <nav className='fixed top-0 left-0 h-screen w-[200px] bg-zinc-800'>
      <ul>
        <li>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to='/'>
            All tasks
          </NavLink>
        </li>
        <li>
          <NavLink to='/important'>Important tasks</NavLink>
        </li>
        <li>
          <NavLink to='/uncompleted'>Uncompleted tasks</NavLink>
        </li>
        <li>
          <NavLink to='/completed'>Completed tasks</NavLink>
        </li>
      </ul>
    </nav>
  )
}
