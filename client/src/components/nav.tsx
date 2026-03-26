import { IoIosSquareOutline } from 'react-icons/io'

export default function Nav() {
  return (
    <nav className='flex w-full justify-center items-center my-2 absolute'>
        <div className='border border-black px-2 py-1 flex gap-3 bg-white rounded-sm'>
          <button className='text-white'><IoIosSquareOutline size={23} /></button>
        </div>
    </nav>
  )
}
