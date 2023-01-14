import { ToastContainer } from 'react-toastify'
import Footer from './components/Footer'
import Header from './components/Header'
import TodoContainer from './components/TodoContainer'

function App() {
  return (
    <>
      <Header />
      <TodoContainer />
      <ToastContainer position='bottom-right' theme='dark' />
      <Footer />
    </>
  )
}

export default App
