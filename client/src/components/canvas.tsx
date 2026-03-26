import rough from 'roughjs'
import { useEffect, useRef, useState } from 'react'

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });
  // dragstart - x, y , lastview port - x,y

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    // Clear previous drawings
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    
    ctx.translate(viewport.x, viewport.y);
    ctx.scale(viewport.zoom, viewport.zoom);
    
    // there will be drawings here / loop through drawings
    // from local storage or database , held by useState / zustand
    const rc = rough.canvas(canvas);
    rc.rectangle(10, 10, 200, 200);

    ctx.restore();
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.overflow = 'hidden';
    
    draw();
  }, [draw])

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSpeed = 0.001;
    const newZoom = Math.max(0.1, Math.min(5, viewport.zoom - e.deltaY * zoomSpeed));
    setViewport(prev => ({ ...prev, zoom: newZoom }));
  };

  return (
    <canvas ref={canvasRef} id="canvas" className="bg-white h-screen w-screen"
    onWheel={handleWheel}
    />
  )
}

export default Canvas
