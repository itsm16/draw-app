import { IoIosSquareOutline } from 'react-icons/io'
import { IoSquare } from "react-icons/io5";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { PiCursorLight, PiCursorFill, PiCircleFill, PiCircleLight, PiPenFill, PiPenLight, PiArrowBendRightDownLight, PiArrowBendRightDownFill, PiTextAaLight, PiTextAaFill } from "react-icons/pi";
import WrapperDiv from './wrapper-div';
import useToolStore from '../store/toolStore';

export default function Nav() {
  const {tool, setTool} = useToolStore<{tool: string, setTool: (tool: string) => void}>(state => state)

  return (
    <nav className='flex w-full justify-center items-center my-4 absolute z-10'>
        <WrapperDiv>
          <button className={`text-white h-9 w-9 flex items-center justify-center  ${tool === "cursor" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${tool === "cursor" ? "bg-[#6861f3]" : ""}`} onClick={() => setTool("cursor")}>{tool === "cursor" ? <PiCursorFill fillOpacity={0.8} size={20} /> : <PiCursorLight size={20} />}</button>
          <button className={`text-white h-9 w-9 flex items-center justify-center  ${tool === "square" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${tool === "square" ? "bg-[#6861f3]" : ""}`} onClick={() => setTool("square")}>{tool === "square" ? <IoSquare fillOpacity={0.8} size={17} /> : <IoIosSquareOutline size={20} />}</button>
          <button className={`text-white h-9 w-9 flex items-center justify-center ${tool === "line" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${tool === "line" ? "bg-[#6861f3]" : ""}`} onClick={() => setTool("line")}><TfiLayoutLineSolid size={20} /></button>
          <button className={`text-white h-9 w-9 flex items-center justify-center ${tool === "circle" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${tool === "circle" ? "bg-[#6861f3]" : ""}`} onClick={() => setTool("circle")}>{tool === "circle" ? <PiCircleFill fillOpacity={0.8} size={20} /> : <PiCircleLight size={20} />}</button>
          <button className={`text-white h-9 w-9 flex items-center justify-center ${tool === "pen" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${tool === "pen" ? "bg-[#6861f3]" : ""}`} onClick={() => setTool("pen")}>{tool === "pen" ? <PiPenFill size={20} /> : <PiPenLight size={20} />}</button>
          <button className={`text-white h-9 w-9 flex items-center justify-center ${tool === "arrow" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${tool === "arrow" ? "bg-[#6861f3]" : ""}`} onClick={() => setTool("arrow")}>{tool === "arrow" ? <PiArrowBendRightDownFill size={20} /> : <PiArrowBendRightDownLight size={20} />}</button>
          <button className={`text-white h-9 w-9 flex items-center justify-center ${tool === "text" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${tool === "text" ? "bg-[#6861f3]" : ""}`} onClick={() => setTool("text")}>{tool === "text" ? <PiTextAaFill size={20} /> : <PiTextAaLight size={20} />}</button>
        </WrapperDiv>
    </nav>
  )
}
