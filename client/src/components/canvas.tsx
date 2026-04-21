import rough from 'roughjs'
import React, { useEffect, useRef, useState } from 'react'
import { writeText } from '../utils/draw.utils';
import useToolStore from '../store/toolStore';
import socket from '../utils/socket.utils';

function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });
  const [isDragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastViewport, setLastViewport] = useState({ x: 0, y: 0, zoom: 1 });
  const [isVisible, setIsVisible] = useState(false);
  const [textInputPosition, setTextInputPosition] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState('');
  const textInputRef = useRef<HTMLInputElement>(null);

  // zustand tools
  const {setTool} = useToolStore(state => state)

  type DataItem = {
    id: number;
    shape: 'rectangle' | 'circle' | 'text' | 'line';
    x: number;
    y: number;
    width?: number;
    height?: number;
    diameter?: number;
    fill?: string;
    text?: string;
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
  };

  const [data, setData] = useState<DataItem[]>([
    {
      id: 1,
      shape: 'rectangle',
      x: 10,
      y: 10,
      width: 300,
      height: 200,
      fill: '',
    },
    {
      id: 2,
      shape: 'circle',
      x: 400,
      y: 100,
      width: 100,
      height: 100,
    },
    {
      id: 3,
      shape: 'rectangle',
      x: 10,
      y: 300,
      width: 300,
      height: 200,
      fill: 'lightblue',
    },
    {
      id: 4,
      shape: 'circle',
      x: 400,
      y: 300,
      width: 100,
      height: 100,
      fill: 'lightblue',
    },
    {
      id: 5,
      shape: 'line',
      x: 30,
      y: 530,
      width: 300,
      height: 200,
      fill: 'lightgreen',
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

    const rc = rough.canvas(canvas);

    rc.polygon([
      [100, 140],  // Top vertex
      [106, 150], // Bottom right
      [94, 150]   // Bottom left
    ], {seed: 10, stroke: 'white'});
    rc.line(100, 148, 100, 200, {seed: 10, stroke: 'white', roughness: 0.7});

    rc.line(650, 150, 650, 250, {seed: 10, stroke: 'white', roughness: 0.9});
    rc.line(650, 150, 660, 160, {seed: 10, stroke: 'white', roughness: 1.3});
    rc.line(650, 150, 640, 160, {seed: 10, stroke: 'white', roughness: 1.3});
    
    writeText({ctx, text: "Give it a sketchy touch", x: 800, y: 100});

    data.forEach((item) => {
      let seed = 10;
      let roughness = 1.5;
      if (item.shape === 'rectangle') {
        rc.rectangle(
          item.x,
          item.y,
          item.width || 100,
          item.height || 100,
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
          item.width || 50,
          {
            fill: item.fill ? item.fill : "",
            stroke: 'white',
            roughness,
            seed
          }
        );
      }

      if (item.shape === 'line') {
        rc.line(
          item.x,
          item.y,
          item.x + (item.width || 100),
          item.y + (item.height || 100),
          {
            stroke: 'white',
            roughness,
            seed
          }
        );
      }
      
      if (item.shape === 'text') {
        writeText({ctx, text: item.text || "", x: item.x, y: item.y});
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
    
    const loadAndDraw = async () => {
      await document.fonts.load('20px "Architects Daughter"');
      draw();
    };

    loadAndDraw();
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
      canvas.style.cursor = '';
    }
  };

  const handleTextSubmit = () => {
    if (!inputValue.trim()) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (!canvas || !ctx) return;
    
    // Transform screen coordinates to canvas coordinates
    const rect = canvas.getBoundingClientRect();
    const canvasX = (textInputPosition.x - 90 - rect.left - viewport.x) / viewport.zoom;
    const canvasY = (textInputPosition.y - rect.top - viewport.y) / viewport.zoom;
    
    // Add text to data array for persistence
    const newTextItem: DataItem = {
      id: Date.now(),
      shape: 'text',
      text: inputValue,
      x: canvasX,
      y: canvasY
    };
    
    setData(prev => [...prev, newTextItem]);
    
    // Hide input and clear value
    setIsVisible(false);
    setInputValue('');
  };

  const handleTextKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTextSubmit();
    } else if (e.key === 'Escape') {
      setIsVisible(false);
      setInputValue('');
    }
  };

  const onDoubleClick = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    e.preventDefault();
    
    if (!canvas || !ctx) return;
    
    // Show text input at click position
    setTextInputPosition({ x: e.clientX + 80, y: e.clientY });
    setIsVisible(true);
    setInputValue('');
    
    // Focus input after it's rendered
    setTimeout(() => {
      textInputRef.current?.focus();
    }, 0);
  };

  return (
    <div className='relative'>
      <canvas ref={canvasRef} id="canvas" className="bg-white h-screen w-screen"
      onWheel={handleWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onDoubleClick={onDoubleClick}
      />
      {isVisible && (
        <input
          ref={textInputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleTextKeyDown}
          onBlur={handleTextSubmit}
          style={{
            position: 'absolute',
            left: textInputPosition.x,
            top: textInputPosition.y,
            transform: 'translate(-50%, -50%)',
            padding: '2px 4px',
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            fontSize: '20px',
            fontFamily: '"Architects Daughter", cursive, sans-serif',
            color: 'white',
            zIndex: 1000
          }}
        />
      )}
    </div>
  )
}

export default Canvas
