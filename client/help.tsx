import rough from 'roughjs'
import { useEffect, useRef, useState, useCallback } from 'react'

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastViewport, setLastViewport] = useState({ x: 0, y: 0 });

  // Draw function that renders content based on viewport
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Save context state
    ctx.save();
    
    // Apply viewport transformation
    ctx.translate(viewport.x, viewport.y);
    ctx.scale(viewport.zoom, viewport.zoom);
    
    // Draw content (example: grid and shapes)
    const rc = rough.canvas(canvas);
    
    // Draw grid lines for reference
    const gridSize = 50;
    const startX = Math.floor(-viewport.x / viewport.zoom / gridSize) * gridSize;
    const startY = Math.floor(-viewport.y / viewport.zoom / gridSize) * gridSize;
    const endX = startX + (canvas.width / viewport.zoom) + gridSize;
    const endY = startY + (canvas.height / viewport.zoom) + gridSize;
    
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1 / viewport.zoom;
    
    for (let x = startX; x <= endX; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, startY);
      ctx.lineTo(x, endY);
      ctx.stroke();
    }
    
    for (let y = startY; y <= endY; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();
    }
    
    // Draw some example shapes at different positions
    rc.rectangle(10, 10, 200, 200);
    rc.circle(500, 300, 50);
    rc.rectangle(-300, -200, 150, 100);
    rc.rectangle(1000, 500, 300, 200);
    
    // Restore context state
    ctx.restore();
  }, [viewport]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.overflow = 'hidden';
    
    draw();
  }, [draw]);

  // Handle mouse down for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left click
      setIsDragging(true);
      setDragStart({ x: e.clientX, y: e.clientY });
      setLastViewport({ x: viewport.x, y: viewport.y });
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.style.cursor = 'grabbing';
      }
    }
  };

  // Handle mouse move for panning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setViewport(prev => ({
        ...prev,
        x: lastViewport.x + deltaX,
        y: lastViewport.y + deltaY
      }));
    }
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsDragging(false);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = 'grab';
    }
  };

  // Handle wheel for zooming
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSpeed = 0.001;
    const newZoom = Math.max(0.1, Math.min(5, viewport.zoom - e.deltaY * zoomSpeed));
    setViewport(prev => ({ ...prev, zoom: newZoom }));
  };

  return (
    <canvas 
      ref={canvasRef} 
      id="canvas" 
      className="text-orange-500 bg-white h-screen w-screen cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    />
  )
}

export default Canvas
