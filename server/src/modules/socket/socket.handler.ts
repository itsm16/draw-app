import {Server, Socket} from 'socket.io'

interface DataItem {
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
}

export const socketHandler = (io: Server) => {
    let canvasData: DataItem[] = [];

    io.on('connection', (socket: Socket) => {
        console.log('a user connected');
        
        // Send initial canvas data to newly connected user
        socket.emit('canvas-data', canvasData);
        
        // Handle drawing updates from clients
        socket.on('drawing-update', (newItem: DataItem) => {
            console.log('Received drawing update:', newItem);
            console.log('Current canvas data length:', canvasData.length);
            
            // Add new item to canvas data
            canvasData.push(newItem);
            console.log('Updated canvas data:', canvasData);
            
            // Broadcast to all other clients
            socket.broadcast.emit('drawing-update', newItem);
        });
        
        // Handle requests for canvas data
        socket.on('get-canvas-data', () => {
            socket.emit('canvas-data', canvasData);
        });
        
        // Handle disconnection
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}