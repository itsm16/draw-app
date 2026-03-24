import rough from 'roughjs'
import { useEffect, useRef } from 'react'

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const rc = rough.canvas(canvasRef.current!);
    rc.rectangle(10, 10, 200, 200); // x, y, width, height
  }, [])


  return (
    <>
      <canvas ref={canvasRef} id="canvas" className="text-orange-500 bg-white">
      {/* running */}
      </canvas>
    </>
  )
}

export default Canvas
