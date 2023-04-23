import { NavLink, Outlet, To, createBrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import App from './App'
import { Footer, Header } from './components'
import { ComponentPropsWithoutRef } from 'react'
import { clsxm } from './utils/clsxm'
import { Circle, CircleCheck, List, Star } from 'tabler-icons-react'

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
    <>
      <Sidebar />
      <div className='App absolute top-0 right-0 flex min-h-screen w-full flex-col bg-zinc-900 md:w-[calc(100%-300px)]'>
        <Navbar />
        <main className='mx-auto w-full grow p-3 lg:p-6'>
          <Outlet />
        </main>
        <ToastContainer position='bottom-right' theme='dark' />
        <Footer />
      </div>
    </>
  )
}

function Navbar() {
  return (
    <nav className='block bg-zinc-800 md:hidden'>
      <ul className='flex [&>*]:flex-1'>
        <NavItem to='/'>
          <List />
        </NavItem>
        <NavItem to='/important'>
          <Star />
        </NavItem>
        <NavItem to='/uncompleted'>
          <Circle />
        </NavItem>
        <NavItem to='/completed'>
          <CircleCheck />
        </NavItem>
      </ul>
    </nav>
  )
}

function Sidebar() {
  return (
    <nav className='top-0 left-0 hidden h-screen w-[300px] overflow-y-auto border-r border-zinc-800 md:fixed md:block'>
      <Header />
      <ul>
        <NavItem to='/'>
          <List /> All tasks
        </NavItem>
        <NavItem to='/important'>
          <Star /> Important tasks
        </NavItem>
        <NavItem to='/uncompleted'>
          <Circle /> Uncompleted tasks
        </NavItem>
        <NavItem to='/completed'>
          <CircleCheck /> Completed tasks
        </NavItem>
      </ul>
    </nav>
  )
}

function NavItem({ children, to, ...props }: ComponentPropsWithoutRef<'li'> & { to: To }) {
  return (
    <li {...props}>
      <NavLink
        className={({ isActive }) =>
          clsxm(
            'flex items-center justify-center gap-2 px-2 py-3 no-underline md:justify-start',
            isActive && 'bg-indigo-600 text-white ',
          )
        }
        to={to}
      >
        {children}
      </NavLink>
    </li>
  )
}
