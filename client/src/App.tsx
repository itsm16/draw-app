import Canvas from './components/canvas'
import { IoIosSquareOutline } from "react-icons/io";

function App() {

  return (
    <>
      <nav className='flex bg-white w-full justify-center items-center my-1'>
        <button className='btn btn-primary btn-sm btn-square text-white'><IoIosSquareOutline size={23} /></button>
      </nav>
      <Canvas />
    </>
  )
}

export default App
