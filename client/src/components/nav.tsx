import { useState } from 'react';
import { IoIosSquareOutline } from 'react-icons/io'
import { IoSquare } from "react-icons/io5";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { PiCursorLight, PiCursorFill, PiCircleFill, PiCircleLight, PiPenFill, PiPenLight, PiArrowBendRightDownLight, PiArrowBendRightDownFill } from "react-icons/pi";
import WrapperDiv from './wrapper-div';

export default function Nav() {
  const [selectedTool, setSelectedTool] = useState("");
  return (
    <nav className='flex w-full justify-center items-center my-4 absolute'>
        <WrapperDiv>
          <button className={`text-white h-9 w-9 flex items-center justify-center  ${selectedTool === "cursor" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${selectedTool === "cursor" ? "bg-[#6861f3]" : ""}`} onClick={() => setSelectedTool("cursor")}>{selectedTool === "cursor" ? <PiCursorFill fillOpacity={0.8} size={20} /> : <PiCursorLight size={20} />}</button>
          <button className={`text-white h-9 w-9 flex items-center justify-center  ${selectedTool === "square" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${selectedTool === "square" ? "bg-[#6861f3]" : ""}`} onClick={() => setSelectedTool("square")}>{selectedTool === "square" ? <IoSquare fillOpacity={0.8} size={17} /> : <IoIosSquareOutline size={20} />}</button>
          <button className={`text-white h-9 w-9 flex items-center justify-center ${selectedTool === "line" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${selectedTool === "line" ? "bg-[#6861f3]" : ""}`} onClick={() => setSelectedTool("line")}><TfiLayoutLineSolid size={20} /></button>
          <button className={`text-white h-9 w-9 flex items-center justify-center ${selectedTool === "circle" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${selectedTool === "circle" ? "bg-[#6861f3]" : ""}`} onClick={() => setSelectedTool("circle")}>{selectedTool === "circle" ? <PiCircleFill fillOpacity={0.8} size={20} /> : <PiCircleLight size={20} />}</button>
          <button className={`text-white h-9 w-9 flex items-center justify-center ${selectedTool === "pen" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${selectedTool === "pen" ? "bg-[#6861f3]" : ""}`} onClick={() => setSelectedTool("pen")}>{selectedTool === "pen" ? <PiPenFill size={20} /> : <PiPenLight size={20} />}</button>
          <button className={`text-white h-9 w-9 flex items-center justify-center ${selectedTool === "eraser" ? "hover: bg-[#6861f3]" : "hover:bg-[#6861f3]/40" } rounded-lg ${selectedTool === "eraser" ? "bg-[#6861f3]" : ""}`} onClick={() => setSelectedTool("eraser")}>{selectedTool === "eraser" ? <PiArrowBendRightDownFill size={20} /> : <PiArrowBendRightDownLight size={20} />}</button>
        </WrapperDiv>
    </nav>
  )
}
