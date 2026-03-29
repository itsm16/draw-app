import rough from 'roughjs'
import React, { useEffect, useRef, useState } from 'react'

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });
  const [isDragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastViewport, setLastViewport] = useState({ x: 0, y: 0, zoom: 1 });
  const [data, setData] = useState([
    {
      id: 1,
      shape: 'rectangle',
      x: 10,
      y: 10,
      width: 200,
      height: 200,
      fill: '',
    },
    {
      id: 2,
      shape: 'circle',
      x: 300,
      y: 100,
      width: 100,
      height: 100,
    },
    {
      id: 3,
      shape: 'rectangle',
      x: 10,
      y: 300,
      width: 200,
      height: 200,
      fill: 'lightblue',
    },
    {
      id: 4,
      shape: 'circle',
      x: 300,
      y: 300,
      width: 100,
      height: 100,
      fill: 'lightblue',
    },
    
    // {
    //   id: 3,
    //   shape: 'arrow',
    //   x: 500,
    //   y: 300,
    //   width: 100,
    //   height: 100,
    // }
  ]);

  // TODO: implement drawing container (an array storing drawing objects on canvas)
  // TODO: once drawing container is implemented, create "back to drawing" button, that will reset viewport to initial state
  // or take user to the last saved viewport/ or first drawing in the drawing container

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    ctx.save();

    canvas.style.backgroundColor = '#121212';
    ctx.strokeStyle = 'white';
    
    ctx.translate(viewport.x, viewport.y);
    ctx.scale(viewport.zoom, viewport.zoom);
    
    // there will be drawings here / loop through drawings
    // from local storage or database , held by useState / zustand
    
    // data.forEach((item) => {
    //   if(item.shape === 'rectangle') {
    //     ctx.strokeRect(item.x, item.y, item.width, item.height);
    //   }
    // });
    // ctx.roundRect(230, 10, 200, 100, [10, 40, 0, 30]);

    
    // // Start a new path
    // ctx.beginPath();
    // ctx.roundRect(300, 50, 200, 100, 8);
    // ctx.stroke();

    const rc = rough.canvas(canvas);

    data.forEach((item) => {
      let seed = 10;
      let roughness = 1.5;
      if (item.shape === 'rectangle') {
        rc.rectangle(
          item.x,
          item.y,
          item.width,
          item.height,
          {
            stroke: 'white',
            fill: item.fill ? item.fill : "",
            roughness,
            seed
          }
        );
      }
      if (item.shape === 'circle') {
        rc.circle(
          item.x,
          item.y,
          item.width,
          {
            fill: item.fill ? item.fill : "",
            stroke: 'white',
            roughness,
            seed
          }
        );
      }

      
      // if(item.shape === 'arrow') {
      //   rc.line(
      //     item.x,
      //     item.y,
      //     item.x + item.width,
      //     item.y + item.height,
      //     {
      //       stroke: 'white',
      //       seed
      //     }
      //   );
      // }
      
    });

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
    // e.preventDefault();
    const zoomSpeed = 0.001;
    const newZoom = Math.max(0.1, Math.min(5, viewport.zoom - e.deltaY * zoomSpeed));
    setViewport(prev => ({ ...prev, zoom: newZoom }));
    
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    if(e.button === 0) {
      setDragging(true);
      setDragStart({x: e.clientX, y: e.clientY});
      setLastViewport({x: viewport.x, y: viewport.y, zoom: viewport.zoom});
    }
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = 'grabbing';
    }
  };

  const onMouseMove = (e: React.MouseEvent) =>{
    e.preventDefault();
    if(isDragging){
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setViewport({x: lastViewport.x + deltaX, y: lastViewport.y + deltaY, zoom: lastViewport.zoom});
    }
  }

  const onMouseUp = () => {
    setDragging(false);
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.style.cursor = 'grab';
    }
  };

  return (
    <canvas ref={canvasRef} id="canvas" className="bg-white h-screen w-screen"
    onWheel={handleWheel}
    onMouseDown={onMouseDown}
    onMouseMove={onMouseMove}
    onMouseUp={onMouseUp}
    />
  )
}

export default Canvas
